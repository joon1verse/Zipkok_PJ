// 📄 sourceMap.js — 크롤링 출처 매핑 유틸

export const SOURCE_MAP = [
    {
      tag: 'vancouver',
      urlPattern: 'ourvancouver',
      source: 'Daum Cafe - UvanU',
    },
    {
      tag: 'toronto',
      urlPattern: 'torontohome',
      source: 'Daum Cafe - TorontoHome',
    },
    {
      tag: 'montreal',
      urlPattern: 'montrealcafe',
      source: 'Daum Cafe - MontrealLife',
    },
    // ✅ 필요 시 확장 가능
  ];
  
  // 🔎 URL을 기반으로 tag + source 자동 매핑
  export function getSourceInfo(url) {
    for (const entry of SOURCE_MAP) {
      if (url.includes(entry.urlPattern)) {
        return {
          tag: entry.tag,
          source: entry.source,
        };
      }
    }
    return {
      tag: 'unknown',
      source: 'Unknown Source',
    };
  }
  