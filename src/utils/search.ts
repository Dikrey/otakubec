// utils/search.ts
import axios from 'axios';
import scrapeSearchResult from '@/lib/scrapeSearchResult';
import { searchResultAnime } from '@/types/types';

export default async function search(keyword: string): Promise<searchResultAnime[]> {
  if (!keyword || typeof keyword !== 'string') return [];

  const BASEURL = process.env.BASEURL;
  if (!BASEURL) {
    console.error('❌ BASEURL is missing in environment variables!');
    return [];
  }

  try {
    const url = `${BASEURL}/?s=${encodeURIComponent(keyword.trim())}&post_type=anime`;
    console.log('🔍 Fetching URL:', url);
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    console.log('✅ Got response, status:', response.status);
    const html = response.data;

    if (html.includes('cloudflare') || html.includes('Checking your browser')) {
      console.error('🚨 Blocked by Cloudflare or bot protection');
      return [];
    }

    return scrapeSearchResult(html);
  } catch (error: any) {
    console.error('💥 Scraping error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      url: `${BASEURL}/?s=...`,
    });
    return [];
  }
}
