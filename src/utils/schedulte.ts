import axios from "axios";
import scrapSchedule from "@/lib/scrapeSchedule";

const { BASEURL } = process.env;

const schedule = async () => {
  try {

    const targetUrl = `${BASEURL || 'https://otakudesu.best'}/jadwal-rilis`;

    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': BASEURL || 'https://otakudesu.best/',
        'Cache-Control': 'no-cache',
      },
      timeout: 10000, 
    });

    if (!response.data) {
      throw new Error("Empty response from target server");
    }


    const result = scrapSchedule(response.data);

    return result;

  } catch (error: any) {

    console.error("Schedule Scraping Error:", error.response?.status || error.message);

    if (error.response?.status === 403) {
      console.error("Blokir Terdeteksi: IP Vercel atau User-Agent ditolak oleh Cloudflare.");
    }

    return []; 
  }
};

export default schedule;