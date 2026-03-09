import axios from 'axios';
import episodes from './episodes';
import scrapeEpisode from '@/lib/scrapeEpisode';

const BASEURL = process.env.BASEURL || 'https://otakudesu.best/';

const episode = async ({ episodeSlug, animeSlug, episodeNumber }: {
  episodeSlug?: string | undefined, 
  animeSlug?: string | undefined, 
  episodeNumber?: number | undefined
}) => {
  let slug = '';

  const axiosConfig = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      'Referer': BASEURL,
    },
    timeout: 15000,
  };

  try {
    if (episodeSlug) {
      slug = episodeSlug;
    } else if (animeSlug && episodeNumber) {
      const episodeLists = await episodes(animeSlug);
      if (!episodeLists || episodeLists.length === 0) return undefined;

      const firstEpisodeSlug = episodeLists[0].slug;
      if (!firstEpisodeSlug) return undefined;

      const splittedEpisodeSlug = firstEpisodeSlug.split('-episode-');
      const prefixEpisodeSlug = splittedEpisodeSlug[0];
   
      const firstEpisodeNumberStr = splittedEpisodeSlug[1]?.replace('-sub-indo', '') || "1";
      const firstEpisodeNumber = parseInt(firstEpisodeNumberStr);

      slug = `${prefixEpisodeSlug}-episode-${episodeNumber - (firstEpisodeNumber === 0 ? 1 : 0)}-sub-indo`;
    }

    if (!slug) throw new Error("Episode slug could not be determined.");


    const { data } = await axios.get(`${BASEURL}/episode/${slug}`, axiosConfig);
    const result = scrapeEpisode(data);

    return result;

  } catch (error: any) {
    console.error(`Error Scraping Episode (${slug}):`, error.message);
    
    if (error.response?.status === 403) {
      console.error("403 Forbidden: IP Vercel diblokir Cloudflare.");
    }
    
    return null; 
  }
};

export default episode;