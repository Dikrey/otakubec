import axios from 'axios';
import { load } from 'cheerio';
import pagination from '@/lib/pagination';
import scrapeCompleteAnime from '@/lib/scrapeCompleteAnime';

const BASEURL = process.env.BASEURL || 'https://otakudesu.best/';

const completeAnime = async (page: number | string = 1) => {
  try {
    const targetUrl = `${BASEURL.replace(/\/$/, '')}/complete-anime/page/${page}`;

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

    const $ = load(data);

  
    const completeAnimeEls = $('.venutama .rseries .rapi .venz ul li').toString();
    const completeAnimeData = scrapeCompleteAnime(completeAnimeEls);
    const paginationData = pagination(data);

    return { 
      paginationData,
      completeAnimeData
    };

  } catch (error: any) {
    console.error(`Error Scraping Complete Anime (Page ${page}):`, error.message);

    if (error.response?.status === 403) {
      console.error("403 Forbidden: Akses ke daftar Complete Anime diblokir Cloudflare.");
    }

  
    return {
      paginationData: null,
      completeAnimeData: []
    };
  }
};

export default completeAnime;