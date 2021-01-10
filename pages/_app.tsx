import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'gray.200',
      },
    },
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
