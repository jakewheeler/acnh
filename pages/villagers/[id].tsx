import {
  VStack,
  Badge,
  Heading,
  HStack,
  Text,
  Box,
  List,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout, Header, Main, Footer } from '../../components/Layout';
import { Villager } from '../../types/villager';
import { fetchVillager, fetchVillagers } from '../../utils/data';
import Head from 'next/head';
import Image from 'next/image';

type Props = {
  villager: Villager;
};

function getGameName(games: string[]): string[] {
  const map = {
    DNM: 'Dōbutsu no Mori',
    E_PLUS: 'Dōbutsu no Mori e+',
    WW: 'Wild World',
    AC: 'Animal Crossing Gamecube',
    CF: 'City Folk',
    NL: 'New Leaf',
    WA: 'Welcome Amiibo',
    NH: 'New Horizons',
    HHD: 'Happy Home Designer',
    PC: 'Pocket Camp',
  };

  return games.map((game) => map[game]);
}

export default function VillagerPage({ villager }: Props) {
  return (
    <Box>
      <Head>
        <title>{villager.name}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='Individual villager page' />
      </Head>

      <Layout>
        <Header />
        <Main>
          <VStack spacing={5}>
            <Heading as='h1' mb={5} color='green.800'>
              {villager.name}
            </Heading>
            <Image src={villager.image_url} width='100%' height='auto' />
            <VStack spacing={5}>
              <HStack
                spacing={5}
                className='top'
                justifyContent='space-between'
                alignItems='start'
              >
                <VStack>
                  <Badge>Species</Badge>
                  <Text>{villager.species}</Text>
                </VStack>
                <VStack>
                  <Badge>Gender</Badge>
                  <Text>{villager.gender}</Text>
                </VStack>
                <VStack>
                  <Badge>Personality</Badge>
                  <Text>{villager.personality}</Text>
                </VStack>
                <VStack>
                  <Badge>Birthday</Badge>
                  <Text>
                    {villager.birthday_month} {villager.birthday_day}
                  </Text>
                </VStack>
              </HStack>
              <HStack
                className='bottom'
                justifyContent='space-between'
                alignItems='start'
              >
                <VStack>
                  <Badge>Sign</Badge>
                  <Text>{villager.sign}</Text>
                </VStack>
                <VStack>
                  <Badge>Phrase</Badge>
                  <Text>"{villager.phrase}"</Text>
                </VStack>
              </HStack>
              <VStack>
                <Badge>Quote</Badge>
                <Text>"{villager.quote}"</Text>
              </VStack>
              <HStack justifyContent='space-between' alignItems='start'>
                <VStack>
                  <Badge>Featured in</Badge>
                  <UnorderedList>
                    {getGameName(villager.appearances).map((game, i) => (
                      <ListItem key={i}>{game}</ListItem>
                    ))}
                  </UnorderedList>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </Main>
        <Footer />
      </Layout>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // name_species
  const underscoreIndex = params.id.indexOf('_');
  const name = params.id.slice(0, underscoreIndex).toString();
  const species = params.id.slice(underscoreIndex + 1).toString();

  const villager: Villager = await fetchVillager(name, species);

  return { props: { villager } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await fetchVillagers()).map((villager) => ({
    params: { id: `${villager.name}_${villager.species}` },
  }));

  return {
    paths,
    fallback: false,
  };
};
