import { Input, VStack, SimpleGrid, Link, Text, Flex } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Layout, Header, Main, Footer } from '../components/Layout';
import { Villager } from '../types/villager';
import { fetchVillagers } from '../utils/data';
import { debounce } from 'lodash';
import Image from 'next/image';

type HomeProps = {
  data: Villager[];
};

export default function Home({ data }: HomeProps) {
  const [filteredData, setFilteredData] = useState(data);
  const [searchName, setSearchName] = useState('');

  const search = () => {
    if (searchName !== '') {
      const filtered = data.filter((villager) =>
        villager.name.toLowerCase().includes(searchName.toLowerCase())
      );
      console.log(searchName);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const idk = useCallback(debounce(search, 300), [searchName]);

  useEffect(() => {
    idk();
    return idk.cancel;
  }, [searchName, idk]);

  return (
    <Layout>
      <Header>
        <Input
          placeholder='Find a villager'
          size='lg'
          maxW={700}
          color='white'
          onChange={(e) => onChange(e)}
        />
      </Header>
      <Main>
        {filteredData.length ? (
          <SimpleGrid minChildWidth='200px' spacing={3} justifyItems='center'>
            {filteredData.map((villager) => {
              const key = `${villager.name}_${villager.species}`;

              return (
                <VStack
                  key={key}
                  border='dashed'
                  borderColor='green.200'
                  borderWidth={3}
                  w={200}
                  h={200}
                  justifyContent='center'
                >
                  <Image width={100} height={100} src={villager.image_url} />
                  <NextLink href={`/villagers/${encodeURIComponent(key)}`}>
                    <Link>{villager.name}</Link>
                  </NextLink>
                </VStack>
              );
            })}
          </SimpleGrid>
        ) : (
          <Flex justifyContent='center'>
            <Text>No results</Text>
          </Flex>
        )}
      </Main>
      <Footer />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  // filter by name, species, personality type

  const data: Villager[] = await fetchVillagers();
  return {
    props: { data },
  };
};
