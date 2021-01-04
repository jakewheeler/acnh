import {
  VStack,
  Badge,
  Image,
  Heading,
  HStack,
  Text,
  Stack,
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout, Header, Main } from '../../components/Layout';
import { Villager } from '../../types/villager';
import { fetchVillager, fetchVillagers } from '../../utils/data';

type Props = {
  villager: Villager;
};

function getGameName(games: string[]): string[] {
  const map = {
    DBM: 'Dōbutsu no Mori',
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
    <Layout>
      <Header />
      <Main>
        <VStack>
          <Heading as='h1' mb={5}>
            {villager.name}
          </Heading>
          <Image src={villager.image_url} w={200} h={200} mb={5} />
          <VStack alignItems='flex-start'>
            <HStack>
              <Badge>Species</Badge>
              <Text>{villager.species}</Text>
            </HStack>
            <HStack>
              <Badge>Gender</Badge>
              <Text>{villager.gender}</Text>
            </HStack>
            <HStack>
              <Badge>Personality</Badge>
              <Text>{villager.personality}</Text>
            </HStack>
            <HStack>
              <Badge>Birthday</Badge>
              <Text>
                {villager.birthday_month} {villager.birthday_day}
              </Text>
            </HStack>
            <HStack>
              <Badge>Sign</Badge>
              <Text>{villager.sign}</Text>
            </HStack>
            <HStack>
              <Badge>Quote</Badge>
              <Text>"{villager.quote}"</Text>
            </HStack>
            <HStack>
              <Badge>Phrase</Badge>
              <Text>"{villager.phrase}"</Text>
            </HStack>
            <HStack alignItems='flex-start'>
              <Badge>Found in</Badge>
              <VStack alignItems='left'>
                {getGameName(villager.appearances).map((game, i) => (
                  <Text key={i}>{game}</Text>
                ))}
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Main>
    </Layout>
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
