// scrapeSearchResult.ts
import { load } from 'cheerio';
import mapGenres from './mapGenres';
import type { searchResultAnime } from '@/types/types.js';

const scrapeSearchResult = (html: string): searchResultAnime[] => {
  const $ = load(html);
  const searchResult: searchResultAnime[] = [];

  // Cari semua item dalam daftar pencarian
  $('ul.chivsrc li').each((_, el) => {
    const $li = $(el);

    // Ambil judul dan URL
    const $titleLink = $li.find('h2 a');
    const title = $titleLink.text().trim();
    const url = $titleLink.attr('href')?.trim() || '';

    // Ambil poster
    const poster = $li.find('img').attr('src')?.trim() || '';

    // Ambil semua blok .set
    const sets = $li.find('.set').map((_, setEl) => $(setEl).text().trim()).get();

    // Parsing genre, status, rating dari array sets
    let genresRaw = '';
    let status = '';
    let rating = '';

    sets.forEach(set => {
      if (set.startsWith('Genres')) {
        // Contoh: "Genres : Comedy, Romance, School"
        genresRaw = set.replace(/^Genres\s*:\s*/, '').trim();
      } else if (set.startsWith('Status')) {
        status = set.replace(/^Status\s*:\s*/, '').trim();
      } else if (set.startsWith('Rating')) {
        rating = set.replace(/^Rating\s*:\s*/, '').trim();
      }
    });

    // Ekstrak slug dari URL
    const slugMatch = url.match(/\/anime\/([^\/]+)\/?$/);
    const slug = slugMatch ? slugMatch[1] : '';

    searchResult.push({
      title,
      slug,
      poster,
      genres: mapGenres(genresRaw),
      status,
      rating,
      url
    });
  });

  return searchResult;
};

export default scrapeSearchResult;
