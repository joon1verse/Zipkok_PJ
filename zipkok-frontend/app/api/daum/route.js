// 1️⃣7️⃣ Daum 크롤링 API
export const runtime = 'nodejs'; // 👈 이 줄 추가 (Edge → Node.js 전환)

import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET() {
  const url = "https://m.cafe.daum.net/ourvancouver/4Nd0";

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Referer: "https://m.cafe.daum.net/"
      }
    });

    const $ = cheerio.load(data);
    const results = [];

    $("ul.cmt_list li").each((_, el) => {
      const title = $(el).find(".tit").text().trim();
      const href = $(el).find("a").attr("href");
      const fullUrl = `https://m.cafe.daum.net${href}`;

      // 지역명 및 가격 추출
      const locationMatch = title.match(/(밴쿠버|버나비|코퀴틀람|리치먼드|써리|노스밴)/i);
      const priceMatch = title.match(/\$?\s?(\d{3,5})/);

      results.push({
        id: fullUrl.split("/").pop(),
        title,
        location: locationMatch ? locationMatch[0] : "Unknown",
        price: priceMatch ? `$${priceMatch[1]}` : "N/A",
        priceValue: priceMatch ? parseInt(priceMatch[1]) : null,
        image: "/images/icon_daum.png", // 출처별 아이콘
        type: "Unknown",
        link: fullUrl
      });
    });

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: "크롤링 실패" }, { status: 500 });
  }
}
