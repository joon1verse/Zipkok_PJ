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
        // ✅ User-Agent를 더 강력하게 설정
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });

    // ✅ HTML 저장 디버깅용
    fs.writeFileSync('./data/daum_raw.html', html, 'utf-8');
    console.log('[DEBUG] HTML 내용 저장 완료 → data/daum_raw.html');

    // ✅ [1] HTML 내용 확인
    console.log('[DEBUG] HTML 길이:', html.length);
    // console.log(html); // ← 주석 해제 시 HTML 전체 출력 가능

    const $ = cheerio.load(html);

    // ✅ [2] 셀렉터 확인
    console.log('[DEBUG] ul 태그 개수:', $('ul').length);
    console.log('[DEBUG] .tit_post 개수:', $('.tit_post').length);

    const rawPosts = [];

    $('ul.list_post > li').each((_, el) => {
      const isNotice = $(el).find('.ico_notice').length > 0;
      if (isNotice) return;

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
