import axios from 'axios';
import scrapeAnimeByGenre from '@/lib/scrapeAnimeByGenre';

const BASEURL = process.env.BASEURL || 'https://otakudesu.best/';

const animeByGenre = async (genre: string, page: number | string = 1) => {
  try {
    const targetUrl = `${BASEURL.replace(/\/$/, '')}/genres/${genre}/page/${page}`;

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

    const result = scrapeAnimeByGenre(data);
    return result;

  } catch (error: any) {
    console.error(`Error Scraping Genre [${genre}] Page [${page}]:`, error.message);

    if (error.response?.status === 403) {
      console.error("DIBLOKIR: IP Vercel ditolak oleh Cloudflare Otakudesu.");
    }

   
    return {
      anime: [],
      pagination: null
    };
  }
};

export default animeByGenre;