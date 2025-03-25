// (daum-1) 필요한 모듈 import
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

// (daum-2) 크롤링 대상 URL 및 출력 경로 설정
const TARGET_URL = 'https://m.cafe.daum.net/ourvancouver/4Nd0';
const OUTPUT_PATH = path.resolve('data', 'raw_daum.json');

async function crawlDaum() {
  try {
    // (daum-3) HTML 요청 with User-Agent (봇 차단 우회용)
    const { data: html } = await axios.get(TARGET_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });

    // (daum-4) 디버깅용: HTML 원본 저장
    fs.writeFileSync('./data/daum_raw.html', html, 'utf-8');
    console.log('[DEBUG] HTML 내용 저장 완료 → data/daum_raw.html');

    // (daum-5) cheerio 로드 및 기본 정보 출력
    const $ = cheerio.load(html);
    console.log('[DEBUG] HTML 길이:', html.length);
    console.log('[DEBUG] ul 태그 개수:', $('ul').length);
    console.log('[DEBUG] .txt_detail 개수:', $('.txt_detail').length);

    const rawPosts = [];

    // (daum-6) 게시글 제목과 링크 추출
    $('.article_info').each((_, el) => {
      const title = $(el).find('.txt_detail').text().trim();
      const href = $(el).closest('a').attr('href');
      const link = href ? 'https://m.cafe.daum.net' + href : null;

      if (title && link) {
        rawPosts.push({
          title,
          link,
          crawledAt: new Date().toISOString(),
        });
      }
    });

    // (daum-7) JSON 저장 처리
    if (!fs.existsSync('data')) fs.mkdirSync('data');
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(rawPosts, null, 2), 'utf-8');

    console.log(`✅ ${rawPosts.length}개 게시글 저장 완료! → ${OUTPUT_PATH}`);
  } catch (err) {
    // (daum-8) 에러 처리
    console.error('❌ 크롤링 중 오류 발생:', err.message);
  }
}

// (daum-9) 실행
crawlDaum();
