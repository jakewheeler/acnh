import {
  Box,
  Text,
  Input,
  VStack,
  Avatar,
  SimpleGrid,
  Link,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { Layout, Header, Main, Footer } from '../components/Layout';
import { Villager } from '../types/villager';
import { fetchVillagers } from '../utils/data';

type HomeProps = {
  data: Villager[];
};

export default function Home({ data }: HomeProps) {
  return (
    <Layout>
      <Header>
        <Input
          placeholder='Find a villager'
          size='lg'
          maxW={700}
          color='white'
        />
      </Header>
      <Main>
        <SimpleGrid minChildWidth='200px' spacing={3} justifyItems='center'>
          {data.map((villager) => {
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
                <Avatar src={villager.image_url} />
                <NextLink href={`/villagers/${encodeURIComponent(key)}`}>
                  <Link>{villager.name}</Link>
                </NextLink>
              </VStack>
            );
          })}
        </SimpleGrid>
      </Main>
      <Footer>some footer content</Footer>
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
