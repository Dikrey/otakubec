import axios from 'axios';
import { load } from 'cheerio';
import scrapeOngoingAnime from '@/lib/scapeOngoingAnime';
import scrapeCompleteAnime from '@/lib/scrapeCompleteAnime';
import { ongoingAnime as ongoingAnimeType, completeAnime as completeAnimeType } from '@/types/types';


const BASEURL = process.env.BASEURL || 'https://otakudesu.best/';

const home = async (): Promise<{ ongoing_anime: ongoingAnimeType[], complete_anime: completeAnimeType[] }> => {
  try {
    const { data } = await axios.get(BASEURL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': BASEURL,
        'Cache-Control': 'no-cache',
      },
      timeout: 10000,
    });

    const $ = load(data);

    const ongoingAnimeEls = $('.venutama .rseries .rapi').first().find('.venz ul li').toString();
    const completeAnimeEls = $('.venutama .rseries .rapi').last().find('.venz ul li').toString();

    const ongoing_anime = scrapeOngoingAnime(ongoingAnimeEls);
    const complete_anime = scrapeCompleteAnime(completeAnimeEls);

    return {
      ongoing_anime,
      complete_anime
    };

  } catch (error: any) {
    console.error("Home Scraping Error:", error.message);

    if (error.response?.status === 403) {
       console.error("Status 403: Kena blokir Cloudflare atau bot protection. Coba ganti User-Agent atau gunakan Proxy.");
    }

    return {
      ongoing_anime: [],
      complete_anime: []
    };
  }
};

export default home;