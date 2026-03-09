import axios from 'axios';
import 'dotenv/config';
import scrapeGenreLists from '../lib/scrapeGenreLists';
import type { genre as genreType } from '../types/types';

const { BASEURL } = process.env;

const genreLists = async (): Promise<genreType[]> => {
  try {
    const targetUrl = `${BASEURL || 'https://otakudesu.best/'}/genre-list`;

    const response = await axios.get(targetUrl, {
      headers: {
     
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': BASEURL || 'https://otakudesu.best/',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },

      timeout: 10000, 
    });

    if (!response.data) {
      throw new Error('No data received from target server');
    }


    const result = scrapeGenreLists(response.data);
    return result;

  } catch (error: any) {

    if (error.response) {
  
      console.error(`Scraping Error [${error.response.status}]: ${error.response.statusText}`);
      if (error.response.status === 403) {
        throw new Error('Access Forbidden (403): Target site is blocking the request. Consider using a Proxy.');
      }
    } else if (error.request) {
     
      console.error('Scraping Error: No response received from target server.');
    } else {
      console.error('Scraping Error:', error.message);
    }
 
    throw error;
  }
};

export default genreLists;