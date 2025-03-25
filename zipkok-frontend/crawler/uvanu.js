// 📄 uvanu.js — Daum Cafe - UvanU 크롤러
// 🔢 기능별 주석 포맷: (uvanu-번호)

import axios from 'axios'; // (uvanu-1) HTTP 요청 모듈
import * as cheerio from 'cheerio'; // (uvanu-2) HTML 파싱 모듈
import fs from 'fs'; // (uvanu-3) 파일 시스템 모듈
import path from 'path'; // (uvanu-4) 경로 처리
import { getSourceInfo } from './sourceMap.js'; // (uvanu-5) 출처 자동 추출 함수

// (uvanu-6) 대상 URL 및 저장 경로
const TARGET_URL = 'https://m.cafe.daum.net/ourvancouver/4Nd0';
const OUTPUT_PATH = path.resolve('data', 'raw_uvanu.json'); // ← 파일명 통일 형식

// (uvanu-7) 크롤링 메인 함수
async function crawlUvanU() {
  try {
    // (uvanu-8) HTML 요청
    const { data: html } = await axios.get(TARGET_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    // (uvanu-9) cheerio 로드
    const $ = cheerio.load(html);
    const rawPosts = [];

    // (uvanu-10) 게시글 루프
    $('li').each((_, el) => {
      const li = $(el);
      const liText = li.text();

      // (uvanu-11) 공지글 필터링
      const isNotice = liText.includes('공지') || liText.includes('필독');
      if (isNotice) return;

      // (uvanu-12) 제목 및 링크 추출
      const title = li.find('.txt_detail').text().trim();
      const href = li.find('a').attr('href');
      const link = href ? 'https://m.cafe.daum.net' + href : null;

      if (title && link) {
        const { tag, source } = getSourceInfo(link); // (uvanu-13) 출처 추출
        rawPosts.push({
          title: `[${tag.charAt(0).toUpperCase() + tag.slice(1)}] ${title}`,
          link,
          tag,
          source,
          crawledAt: new Date().toISOString(),
        });
      }
    });

    // (uvanu-14) 기존 데이터 로드
    let existingPosts = [];
    if (fs.existsSync(OUTPUT_PATH)) {
      const fileData = fs.readFileSync(OUTPUT_PATH, 'utf-8');
      existingPosts = JSON.parse(fileData);
    }

    // (uvanu-15) 중복 제거
    const existingLinks = new Set(existingPosts.map(post => post.link));
    const newUniquePosts = rawPosts.filter(post => !existingLinks.has(post.link));

    // (uvanu-16) 병합 후 저장
    const mergedPosts = [...newUniquePosts, ...existingPosts];
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(mergedPosts, null, 2), 'utf-8');

    console.log(`✅ 신규 ${newUniquePosts.length}개 / 총 ${mergedPosts.length}개 저장 완료 → ${OUTPUT_PATH}`);
  } catch (err) {
    // (uvanu-17) 오류 처리
    console.error('❌ 크롤링 중 오류 발생:', err.message);
  }
}

// (uvanu-18) 실행
crawlUvanU();
