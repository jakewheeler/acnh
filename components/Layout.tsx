import { Box, Link, VStack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

type Props = {
  children?: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <Box className='container' h='100vh'>
      {children}
    </Box>
  );
}

export function Header({ children }: Props) {
  return (
    <Box className='container'>
      <VStack
        as='header'
        h={100}
        bgColor='green.700'
        spacing={2}
        padding={2}
        alignItems='flex-start'
      >
        <NextLink href='/'>
          <Link color='white'>Animal Crossing Villagers</Link>
        </NextLink>
        {children}
      </VStack>
    </Box>
  );
}

export function Main({ children }: Props) {
  return (
    <Box as='main' bgColor='green.100' p={5}>
      {children}
    </Box>
  );
}

export function Footer({ children }: Props) {
  return (
    <Box as='footer' bgColor='green.700'>
      {children}
    </Box>
  );
}
