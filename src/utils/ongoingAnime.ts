import axios from 'axios';
import { load } from 'cheerio';
import pagination from '@/lib/pagination';
import scrapeOngoingAnime from '@/lib/scapeOngoingAnime';

const { BASEURL } = process.env;

const ongoingAnime = async (page: number | string = 1) => {
  try {

    const targetUrl = `${BASEURL || 'https://otakudesu.best'}/ongoing-anime/page/${page}`;

    const { data } = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': BASEURL || 'https://otakudesu.best/',
        'Cache-Control': 'no-cache',
      },
      timeout: 10000,
    });

    const $ = load(data);

    const ongoingAnimeEls = $('.venutama .rseries .rapi .venz ul li').toString();
    const ongoingAnimeData = scrapeOngoingAnime(ongoingAnimeEls);
    
    const paginationData = pagination(data);

    return { 
      paginationData,
      ongoingAnimeData
    };

  } catch (error: any) {
    console.error(`Error Scraping Ongoing (Page ${page}):`, error.message);

    if (error.response?.status === 403) {
        console.error("Akses Ditolak (403): IP Server Vercel mungkin diblokir Cloudflare.");
    }

  
    return {
      paginationData: null,
      ongoingAnimeData: []
    };
  }
};

export default ongoingAnime;