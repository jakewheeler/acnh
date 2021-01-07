import {
  Input,
  VStack,
  SimpleGrid,
  Link,
  Text,
  Flex,
  Box,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Layout, Header, Main, Footer } from '../components/Layout';
import { Villager } from '../types/villager';
import { fetchVillagers } from '../utils/data';
import { debounce } from 'lodash';
import Image from 'next/image';
import Head from 'next/head';

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
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const debounceCb = useCallback(debounce(search, 100), [searchName]);

  useEffect(() => {
    debounceCb();
    return debounceCb.cancel;
  }, [searchName, debounceCb]);

  return (
    <Box>
      <Head>
        <title>Animal Crossing Villagers</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='All villagers page' />
      </Head>
      <Layout>
        <Header>
          <Input
            aria-label='Search for a villager'
            placeholder='Search by name'
            id='searchBox'
            size='lg'
            maxW={700}
            focusBorderColor='green.700'
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
                    <Image width={50} height={50} src={villager.image_url} />
                    <NextLink href={`/villagers/${encodeURIComponent(key)}`}>
                      <Link color='green.900'>{villager.name}</Link>
                    </NextLink>
                  </VStack>
                );
              })}
            </SimpleGrid>
          ) : (
            <Flex justifyContent='center'>
              <Text color='green.900'>No results</Text>
            </Flex>
          )}
        </Main>
        <Footer />
      </Layout>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  // filter by name, species, personality type

  const data: Villager[] = await fetchVillagers();
  return {
    props: { data },
  };
};
