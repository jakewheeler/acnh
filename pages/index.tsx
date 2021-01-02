import { Box } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

export default function Home({ data }) {
  return (
    <Box>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('X-API-KEY', process.env.NOOKIPEDIA_KEY);
  requestHeaders.set('Accept-Version', '1.0.0');

  const f = await fetch('https://api.nookipedia.com/nh/bugs/grasshopper', {
    headers: requestHeaders,
  });
  const data = await f.json();
  console.log(data);
  return {
    props: { data },
  };
};
