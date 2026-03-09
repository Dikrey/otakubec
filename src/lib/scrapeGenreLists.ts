import { load } from 'cheerio';
import type { genre as genreType } from '@/types/types';

const BASEURL = process.env.BASEURL || 'https://otakudesu.best/';

const scrapeGenreLists = (html: string): genreType[] => {
  const $ = load(html);
  const result: genreType[] = [];

  $('#venkonten .vezone ul.genres li a').each((_, element) => {
    const $el = $(element);
    const href = $el.attr('href');
    const name = $el.text().trim();

    if (href) {
      result.push({
        name: name,
        slug: href.replace('/genres/', '').replace(/\//g, ''),
        otakudesu_url: `${BASEURL.replace(/\/$/, '')}${href}`
      });
    }
  });

  return result;
};

export default scrapeGenreLists;