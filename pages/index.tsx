import {
  Input,
  VStack,
  SimpleGrid,
  Link,
  Text,
  Flex,
  Box,
  HStack,
  Select,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { ChangeEvent, useState } from 'react';
import { Layout, Header, Main, Footer } from '../components/Layout';
import { Villager } from '../types/villager';
import { fetchVillagers } from '../utils/data';
import Image from 'next/image';
import Head from 'next/head';

type Props = {
  data: {
    villagers: Villager[];
    speciesTypes: string[];
  };
};

interface Filter {
  name: string;
  species: string;
}

export default function Home({ data }: Props) {
  const { villagers, speciesTypes } = data;
  const [filteredVillagers, setFilteredVillagers] = useState(villagers);

  const [filter, setFilter] = useState<Filter>({ name: '', species: '' });

  const onSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, name: e.target.value });
    applyFilter(villagers, { ...filter, name: e.target.value });
  };

  const onSpeciesSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, species: e.target.value });
    applyFilter(villagers, { ...filter, species: e.target.value });
  };

  const applyFilter = (data: Villager[], filter: Filter) => {
    let initialData = data;
    if (filter.name !== '') {
      initialData = initialData.filter((villager) =>
        villager.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }
    if (filter.species !== '') {
      initialData = initialData.filter(
        (villager) =>
          villager.species.toLowerCase() === filter.species.toLowerCase()
      );
    }

    setFilteredVillagers(initialData);
  };

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
            _placeholder={{ color: 'gray.200' }}
            id='searchBox'
            size='lg'
            maxW={700}
            focusBorderColor='gray.100'
            color='white'
            onChange={(e) => onSearchTextChange(e)}
          />
          <HStack>
            <Select
              placeholder='Any'
              size='lg'
              focusBorderColor='gray.100'
              onChange={onSpeciesSelect}
              aria-label='Select species type'
            >
              {speciesTypes.map((species) => (
                <option key={species} value={species}>
                  {species}
                </option>
              ))}
            </Select>
          </HStack>
        </Header>
        <Main>
          {filteredVillagers.length ? (
            <SimpleGrid minChildWidth='200px' spacing={3} justifyItems='center'>
              {filteredVillagers.map((villager) => {
                const key = `${villager.name}_${villager.species}`;

                return (
                  <VStack
                    key={key}
                    border='dashed'
                    borderColor='gray.100'
                    borderRadius='3%'
                    borderWidth={3}
                    w={200}
                    h={200}
                    justifyContent='center'
                    bgColor='gray.600'
                    p={5}
                  >
                    <Image
                      width='100%'
                      height='auto'
                      src={villager.image_url}
                      alt={`Image of ${villager.name}`}
                    />
                    <NextLink href={`/villagers/${encodeURIComponent(key)}`}>
                      <Link color='white'>{villager.name}</Link>
                    </NextLink>
                  </VStack>
                );
              })}
            </SimpleGrid>
          ) : (
            <Flex justifyContent='center'>
              <Text color='black' fontSize='2xl'>
                No results
              </Text>
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
  const villagers: Villager[] = await fetchVillagers();
  const uniqueSpecies = new Set<string>(
    villagers.map((villager) => villager.species)
  );
  const speciesTypes = Array.from(uniqueSpecies).sort();
  return {
    props: {
      data: {
        villagers,
        speciesTypes,
      },
    },
  };
};
