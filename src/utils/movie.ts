import axios from "axios";
import { load } from "cheerio";

const BASEURL = process.env.BASEURL || 'https://otakudesu.best/';

const movie = async (slug: string): Promise<any> => {

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
 
    const firstUrl = `${BASEURL}episode/${slug}`;
    const { data } = await axios.get(firstUrl, axiosConfig);
    const $ = load(data);

    const checkUrl = $(".episodelist ul li span a").attr("href");
  
    const fixedUrl = checkUrl ? checkUrl.split("/")[4] : slug;

    const secondUrl = `${BASEURL}episode/${fixedUrl}`;
    const { data: movieData } = await axios.get(secondUrl, axiosConfig);
    const $$ = load(movieData);

    const title = $(".posttl").text().trim() || $$(".posttl").text().trim();
    const iframeSrc = $("iframe").attr("src") ?? $$("iframe").attr("src");
    const downloadLinks: { quality: string; links: { name: string; url: string }[] }[] = [];

    $$(".yondarkness-title").each((index, element) => {
      const quality = $$(element).text().trim();
      const links: { name: string; url: string }[] = [];
      $$(element)
        .next(".yondarkness-item")
        .find("a")
        .each((i, el) => {
          const name = $$(el).text().trim();
          const url = $$(el).attr("href") ?? "";
          links.push({ name, url });
        });
      if (quality) downloadLinks.push({ quality, links });
    });

    if (downloadLinks.length === 0) {
      $$(".yondarkness-item").each((index, element) => {
        const quality = $$(element).find("strong").text().trim() || "Unknown";
        const links: { name: string; url: string }[] = [];
        $$(element)
          .find("a")
          .each((i, el) => {
            const name = $$(el).text().trim();
            const url = $$(el).attr("href") ?? "";
            links.push({ name, url });
          });
        if (links.length > 0) downloadLinks.push({ quality, links });
      });
    }

    return { 
      success: true,
      title, 
      iframeSrc, 
      downloadLinks 
    };

  } catch (error: any) {
    console.error(`Error Scraping Movie (${slug}):`, error.message);
    
    return {
      success: false,
      message: error.response?.status === 403 ? "Blocked by Bot Protection(403)" : error.message,
      title: null,
      iframeSrc: null,
      downloadLinks: []
    };
  }
};

export default movie;