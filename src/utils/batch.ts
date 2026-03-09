import axios from 'axios';
import getBatch from '@/lib/getBatch';
import scrapeBatch from '@/lib/scrapeBatch';

const BASEURL = process.env.BASEURL || 'https://otakudesu.best/';

const batch = async ({ batchSlug, animeSlug }: {
  batchSlug?: string, 
  animeSlug?: string
}) => {
  let batchUrl: string | undefined = batchSlug;
  const axiosConfig = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      'Referer': BASEURL,
      'Cache-Control': 'no-cache',
    },
    timeout: 15000,
  };

  try {
    const cleanBaseUrl = BASEURL.replace(/\/$/, '');

    
    if (animeSlug) {
      const animeUrl = `${cleanBaseUrl}/anime/${animeSlug}`;
      const { data: animeHtml } = await axios.get(animeUrl, axiosConfig);
      const batchData = getBatch(animeHtml);
      batchUrl = batchData?.slug;
    }

    if (!batchUrl) {
      console.warn(`Batch slug not found for: ${animeSlug || batchSlug}`);
      return false;
    }

    const finalBatchUrl = `${cleanBaseUrl}/batch/${batchUrl}`;
    const { data: batchHtml } = await axios.get(finalBatchUrl, axiosConfig);
    const result = scrapeBatch(batchHtml);

    return result;

  } catch (error: any) {
    console.error(`Error Scraping Batch:`, error.message);

    if (error.response?.status === 403) {
      console.error("403 Forbidden: Akses batch diblokir Cloudflare.");
    }

    return false;
  }
};

export default batch;