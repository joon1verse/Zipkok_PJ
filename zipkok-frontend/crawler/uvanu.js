// 📄 uvanu.js — Daum Cafe - UvanU 크롤러
// 🔢 기능별 주석 포맷: (uvanu-번호)

import axios from 'axios'; // (uvanu-1) HTTP 요청 모듈
import * as cheerio from 'cheerio'; // (uvanu-2) HTML 파싱 모듈
import fs from 'fs'; // (uvanu-3) 파일 시스템 접근
import path from 'path'; // (uvanu-4) 경로 처리
import { getSourceInfo } from './sourceMap.js'; // (uvanu-5) 출처 자동 추출 유틸

// (uvanu-6) 크롤링 대상 URL 및 저장 경로
const TARGET_URL = 'https://m.cafe.daum.net/ourvancouver/4Nd0';
const OUTPUT_PATH = path.resolve('data', 'raw_daum_uvan.json');

// (uvanu-7) 크롤링 메인 함수
async function crawluvanu() {
  try {
    // (uvanu-8) HTML 요청
    const { data: html } = await axios.get(TARGET_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    // (uvanu-9) HTML 파싱
    const $ = cheerio.load(html);
    const rawPosts = [];

    // (uvanu-10) 게시글 순회
    $('li').each((_, el) => {
      const li = $(el);
      const liText = li.text();

      // (uvanu-11) 공지글 필터링
      const isNotice = liText.includes('공지') || liText.includes('필독');
      if (isNotice) return;

      // (uvanu-12) 제목/링크 추출
      const title = li.find('.txt_detail').text().trim();
      const href = li.find('a').attr('href');
      const link = href ? 'https://m.cafe.daum.net' + href : null;

      if (title && link) {
        // (uvanu-13) 출처 자동 추출
        const { tag, source } = getSourceInfo(link);

        // (uvanu-14) 게시글 구조 생성
        rawPosts.push({
          title: `[${tag.charAt(0).toUpperCase() + tag.slice(1)}] ${title}`,
          link,
          tag,
          source,
          crawledAt: new Date().toISOString(),
        });
      }
    });

    // (uvanu-15) JSON 저장
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(rawPosts, null, 2), 'utf-8');
    console.log(`✅ ${rawPosts.length}개 게시글 저장 완료 → ${OUTPUT_PATH}`);
  } catch (err) {
    // (uvanu-16) 오류 처리
    console.error('❌ 크롤링 중 오류 발생:', err.message);
  }
}

// (uvanu-17) 실행
crawluvanu();
