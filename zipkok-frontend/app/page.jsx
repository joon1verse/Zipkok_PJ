// 1️⃣ 다국어 및 초기 세팅
"use client";

import { useTranslation } from "react-i18next";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../components/header.jsx";

const resources = {
  en: {
    translation: {
      title: "Zipkok",
      slogan: "Stop searching everywhere.\nDiscover Canadian room listings all in one place.",
      description: "Search rental listings from multiple Canadian websites in one place.",
      placeholder: "Search by city or neighborhood...",
      search: "Search",
      resultTitle: "Search Results for",
      noResult: "No listings found.",
      sort: "Sort"
    }
  },
  kr: {
    translation: {
      title: "집콕",
      slogan: "더 이상 힘들게 찾지 마세요.\n캐나다의 쉐어하우스, 홈스테이 정보를 한 곳에서!",
      description: "캐나다 여러 웹사이트의 렌트 리스트를 한곳에서 검색하세요.",
      placeholder: "도시 또는 지역으로 검색...",
      search: "검색",
      resultTitle: "\"{{query}}\"의 검색 결과",
      noResult: "검색 결과가 없습니다.",
      sort: "정렬"
    }
  },
  jp: {
    translation: {
      title: "ジプコク",
      slogan: "面倒な部屋探しは、もう終わり。\nカナダのルームシェア情報を一箇所で確認！",
      description: "複数のカナダのウェブサイトから賃貸情報を一括検索。",
      placeholder: "都市または地域で検索...",
      search: "検索",
      resultTitle: "「{{query}}」の検索結果",
      noResult: "検索結果がありません。",
      sort: "並び替え"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false }
});

export default function Home() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 2️⃣ 상태 변수 정의
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [minPrice, setMinPrice] = useState(searchParams.get("min") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") || "");
  const [selectedTypes, setSelectedTypes] = useState(searchParams.getAll("type") || []);
  const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "default");

  // 3️⃣ 도시 리스트 (자동완성용)
  const cityList = [
    { name: "Toronto", province: "ON" },
    { name: "Vancouver", province: "BC" },
    { name: "Montreal", province: "QC" },
    { name: "Calgary", province: "AB" },
    { name: "Ottawa", province: "ON" },
    { name: "Edmonton", province: "AB" },
    { name: "Winnipeg", province: "MB" },
    { name: "Quebec City", province: "QC" },
    { name: "Hamilton", province: "ON" },
    { name: "Kitchener", province: "ON" }
  ];

  const langClass = {
    en: "font-inter",
    kr: "font-noto-kr",
    jp: "font-noto-jp"
  }[i18n.language] || "font-inter";

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  // 4️⃣ 게시물 더미 데이터 (이미지 포함)
  const dummyData = [
    {
      id: 1,
      title: "Toronto Downtown 쉐어하우스",
      location: "Toronto",
      price: "$700",
      priceValue: 700,
      type: "House",
      image: "/images/toronto.jpg"
    },
    {
      id: 2,
      title: "Burnaby 넓은 하우스",
      location: "Burnaby",
      price: "$850",
      priceValue: 850,
      type: "Apartment",
      image: "/images/vancouver.jpg"
    },
    {
      id: 3,
      title: "Vancouver Homestay",
      location: "Vancouver",
      price: "$950",
      priceValue: 950,
      type: "Condo",
      image: "/images/default.jpg"
    }
  ];

  // 5️⃣ 검색 결과 필터링 및 정렬
  useEffect(() => {
    if (query) {
      let filtered = dummyData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase())
      );
      if (minPrice) filtered = filtered.filter((item) => item.priceValue >= parseInt(minPrice));
      if (maxPrice) filtered = filtered.filter((item) => item.priceValue <= parseInt(maxPrice));
      if (selectedTypes.length > 0) filtered = filtered.filter((item) => selectedTypes.includes(item.type));
      if (sortOrder === "price-asc") filtered.sort((a, b) => a.priceValue - b.priceValue);
      if (sortOrder === "price-desc") filtered.sort((a, b) => b.priceValue - a.priceValue);
      setResults(filtered);
    }
  }, [query, minPrice, maxPrice, selectedTypes, sortOrder]);

  // 6️⃣ 검색 실행 핸들러 (쿼리스트링 반영)
  const handleSearch = () => {
    const trimmed = input.trim();
    const params = new URLSearchParams();
    params.set("q", trimmed);
    if (minPrice) params.set("min", minPrice);
    if (maxPrice) params.set("max", maxPrice);
    selectedTypes.forEach((type) => params.append("type", type));
    if (sortOrder && sortOrder !== "default") params.set("sort", sortOrder);
    router.push("/?" + params.toString());
    setQuery(trimmed);
    setShowResults(true);
    setSuggestions([]);
    setCurrentPage(1);
  };

  // 7️⃣ 검색 초기화 핸들러
  const handleBack = () => {
    setShowResults(false);
    setInput("");
    setQuery("");
    setCurrentPage(1);
  };

  // 8️⃣ 정렬 옵션
  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" }
  ];

  // 9️⃣ 클립보드 공유 링크 복사
  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert("✅ 링크가 복사되었습니다!");
    });
  };

  // 🔟 페이징 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const pagedResults = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  // 👉 나머지 UI는 동일하게 유지됨 (입력창, 필터 UI, 결과 표시, 공유 버튼, 정렬 셀렉트박스, 페이지네이션 등)
}
