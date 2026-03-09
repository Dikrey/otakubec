import axios from 'axios';
import scrapeAnimeEpisodes from '@/lib/scrapeAnimeEpisodes';
import type { episode_list } from '@/types/types';

const BASEURL = process.env.BASEURL || 'https://otakudesu.best/';

const episodes = async (slug: string): Promise<episode_list[] | undefined> => {
  try {
    const targetUrl = `${BASEURL.replace(/\/$/, '')}/anime/${slug}`;

    const { data } = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': BASEURL,
        'Cache-Control': 'no-cache',
      },
      timeout: 10000,
    });

    if (!data) {
      throw new Error("Empty response from Otakudesu");
    }

    const result = scrapeAnimeEpisodes(data);
    return result;

  } catch (error: any) {
    console.error(`Error fetching episodes for slug [${slug}]:`, error.message);

    if (error.response?.status === 403) {
      console.error("DIBLOKIR: IP terkena limit/ban oleh Cloudflare Otakudesu.");
    }

    return undefined;
  }
};

export default episodes;