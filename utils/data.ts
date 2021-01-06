import { Villager } from '../types/villager';

function getHeaders(): HeadersInit {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('X-API-KEY', process.env.NOOKIPEDIA_KEY);
  requestHeaders.set('Accept-Version', '1.0.0');

  return requestHeaders;
}

export async function fetchVillagers() {
  const villagers = await fetch('https://api.nookipedia.com/villagers', {
    headers: getHeaders(),
  });
  const data: Villager[] = await villagers.json();
  return data;
}

export async function fetchVillager(name: string, species: string) {
  // villager key is the last part of the url
  const url = new URL(
    `https://api.nookipedia.com/villagers?name=${name}&species=${species}`
  );

  const villager = await fetch(url.toString(), { headers: getHeaders() });
  const data: Villager[] = await villager.json(); // API always returns an array

  return data[0];
}
