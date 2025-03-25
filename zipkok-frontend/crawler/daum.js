// 필요 패키지 설치: axios, cheerio
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const TARGET_URL = 'https://m.cafe.daum.net/ourvancouver/4Nd0';
const OUTPUT_PATH = path.resolve('data', 'raw_daum.json');

async function crawlDaum() {
  try {
    const { data: html } = await axios.get(TARGET_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
      },
    });

    const $ = cheerio.load(html);
    const rawPosts = [];

    $('ul.list_post > li').each((_, el) => {
      const isNotice = $(el).find('.ico_notice').length > 0;
      if (isNotice) return; // 공지/광고 제거

      const title = $(el).find('.tit_post').text().trim();
      const href = $(el).find('a.link_post').attr('href');
      const link = href ? 'https://m.cafe.daum.net' + href : null;

      if (title && link) {
        rawPosts.push({
          title,
          link,
          crawledAt: new Date().toISOString(),
        });
      }
    });

    if (!fs.existsSync('data')) fs.mkdirSync('data');
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(rawPosts, null, 2), 'utf-8');

    console.log(`✅ ${rawPosts.length}개 게시글 저장 완료! → ${OUTPUT_PATH}`);
  } catch (err) {
    console.error('❌ 크롤링 중 오류 발생:', err.message);
  }
}

crawlDaum();
