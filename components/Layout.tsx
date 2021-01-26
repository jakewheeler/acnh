import {
  Box,
  Link,
  VStack,
  Text,
  Flex,
  BoxProps,
  Heading,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { forwardRef } from 'react';

type Props = {
  children?: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <Box position='relative' minH='100vh' className='container'>
      {children}
    </Box>
  );
}

export function Header({ children }: Props) {
  return (
    <Box as='header' className='header'>
      <VStack
        as='header'
        bgColor='gray.700'
        spacing={2}
        padding={2}
        alignItems='flex-start'
      >
        <NextLink href='/'>
          <Link color='white'>
            <Heading as='h1' color='white'>
              Animal Crossing Villagers
            </Heading>
          </Link>
        </NextLink>
        {children}
      </VStack>
    </Box>
  );
}

type MainProps = Props & BoxProps;

export const Main = forwardRef<HTMLDivElement, MainProps>((props, ref) => {
  return (
    <Box as='main' {...props} ref={ref} p={20} paddingBottom='3rem'>
      {props.children}
    </Box>
  );
});

export function Footer({ children }: Props) {
  return (
    <Box
      as='footer'
      position='absolute'
      bottom={0}
      width='100%'
      bgColor='gray.400'
      height='2.5rem'
    >
      <Flex justifyContent='center' alignItems='center' height='inherit'>
        🐱🐶🦉🐵🐷🐸🐴
      </Flex>
      {children}
    </Box>
  );
}
