// 1️⃣ 다국어 및 초기 세팅
"use client";

import { useTranslation } from "react-i18next";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { useState, useEffect } from "react";
import Header from "../components/header.jsx";

const resources = {
  en: { translation: { title: "Zipkok", slogan: "Stop searching everywhere.\nDiscover Canadian room listings all in one place.", description: "Search rental listings from multiple Canadian websites in one place.", placeholder: "Search by city or neighborhood...", search: "Search", resultTitle: "Search Results for", noResult: "No listings found." } },
  kr: { translation: { title: "집콕", slogan: "더 이상 힘들게 찾지 마세요.\n캐나다의 쉐어하우스, 홈스테이 정보를 한 곳에서!", description: "캐나다 여러 웹사이트의 렌트 리스트를 한곳에서 검색하세요.", placeholder: "도시 또는 지역으로 검색...", search: "검색", resultTitle: "\"{{query}}\"의 검색 결과", noResult: "검색 결과가 없습니다." } },
  jp: { translation: { title: "ジプコク", slogan: "面倒な部屋探しは、もう終わり。\nカナダのルームシェア情報を一箇所で確認！", description: "複数のカナダのウェブサイトから賃貸情報を一括検索。", placeholder: "都市または地域で検索...", search: "検索", resultTitle: "「{{query}}」の検索結果", noResult: "検索結果がありません。" } }
};

i18n.use(initReactI18next).init({ resources, lng: "en", interpolation: { escapeValue: false } });

export default function Home() {
  const { t, i18n } = useTranslation();

  // 2️⃣ 상태 변수 정의
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

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

  const langClass = { en: "font-inter", kr: "font-noto-kr", jp: "font-noto-jp" }[i18n.language] || "font-inter";
  const changeLanguage = (lang) => i18n.changeLanguage(lang);

  // 4️⃣ 게시물 더미 데이터 (이미지 포함)
  const dummyData = [
    { id: 1, title: "Toronto Downtown 쉐어하우스", location: "Toronto", price: "$700", priceValue: 700, type: "House", image: "/images/toronto.jpg" },
    { id: 2, title: "Burnaby 넓은 하우스", location: "Burnaby", price: "$850", priceValue: 850, type: "Apartment", image: "/images/vancouver.jpg" },
    { id: 3, title: "Vancouver Homestay", location: "Vancouver", price: "$950", priceValue: 950, type: "Condo", image: "/images/default.jpg" }
  ];

  // 5️⃣ 필터 포함 검색 결과 필터링
  useEffect(() => {
    if (query) {
      let filtered = dummyData.filter(
        (item) => item.title.toLowerCase().includes(query.toLowerCase()) || item.location.toLowerCase().includes(query.toLowerCase())
      );
      if (minPrice) filtered = filtered.filter((item) => item.priceValue >= parseInt(minPrice));
      if (maxPrice) filtered = filtered.filter((item) => item.priceValue <= parseInt(maxPrice));
      if (selectedTypes.length > 0) filtered = filtered.filter((item) => selectedTypes.includes(item.type));
      setResults(filtered);
    }
  }, [query, minPrice, maxPrice, selectedTypes]);

  // 6️⃣ 검색 실행 핸들러
  const handleSearch = () => {
    const trimmed = input.trim();
    setQuery(trimmed);
    setShowResults(true);
    setSuggestions([]);
  };

  // 7️⃣ 검색 결과 초기화 핸들러
  const handleBack = () => {
    setShowResults(false);
    setInput("");
    setQuery("");
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${langClass}`}>
      <Header changeLanguage={changeLanguage} langClass={langClass} />

      <main className="container mx-auto py-12">
        {!showResults ? (
          <section className="text-center px-4">
            {/* 8️⃣ 검색 소개 문구 */}
            <h2 className="whitespace-pre-line text-2xl md:text-3xl font-semibold text-gray-800 mb-4 tracking-tight" style={{ lineHeight: "2" }}>{t("slogan")}</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">{t("description")}</p>

            {/* 9️⃣ 검색창 + 자동완성 드롭다운 */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  const value = e.target.value;
                  setInput(value);
                  const filtered = cityList.filter((city) => city.name.toLowerCase().startsWith(value.toLowerCase()));
                  setSuggestions(filtered);
                }}
                onFocus={() => setSuggestions(cityList)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                placeholder={t("placeholder")}
                className="w-full rounded-lg border-2 border-gray-200 p-3 shadow-sm text-base md:text-lg"
              />

              {suggestions.length > 0 && (
                <ul className="border border-gray-300 rounded-md mt-1 bg-white shadow absolute w-full z-10 max-h-48 overflow-y-auto">
                  {suggestions.map((city, index) => (
                    <li
                      key={city.name}
                      onClick={() => {
                        setInput(city.name);
                        setSuggestions([]);
                      }}
                      className={`px-4 py-2 text-left hover:bg-indigo-100 cursor-pointer ${index < suggestions.length - 1 ? "border-b border-gray-200" : ""}`}
                    >
                      {city.name}, {city.province}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 🔟 필터 UI */}
            <div className="mt-6 text-left max-w-xl mx-auto bg-white p-4 rounded-md shadow border border-gray-200">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Min Price</label>
                  <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" placeholder="ex) 600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Max Price</label>
                  <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" placeholder="ex) 1000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="flex gap-4 flex-wrap">
                  {["House", "Apartment", "Condo"].map((type) => (
                    <label key={type} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        value={type}
                        checked={selectedTypes.includes(type)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setSelectedTypes((prev) => checked ? [...prev, type] : prev.filter((t) => t !== type));
                        }}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 1️⃣1️⃣ 검색 버튼 */}
            <button onClick={handleSearch} className="mt-6 w-full max-w-xl mx-auto rounded-lg bg-indigo-500 p-3 text-white font-semibold hover:bg-indigo-600 text-base md:text-lg">
              {t("search")}
            </button>
          </section>
        ) : (
          <section className="px-4">
            {/* 1️⃣2️⃣ 결과 헤더 및 뒤로가기 */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{t("resultTitle", { query })}</h2>
              <button onClick={handleBack} className="text-sm text-indigo-600 underline">← Back</button>
            </div>

            {/* 1️⃣3️⃣ 검색 결과 */}
            {results.length === 0 ? (
              <p className="text-gray-500">{t("noResult")}</p>
            ) : (
              <div className="grid gap-4">
                {results.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow p-4 flex gap-4">
                    <img src={item.image} alt={item.title} className="w-32 h-24 object-cover rounded-md border border-gray-200" />
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-600">{item.location}</p>
                      <p className="text-indigo-500 font-medium">{item.price}</p>
                      <p className="text-sm text-gray-400">{item.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* 1️⃣4️⃣ 푸터 */}
      <footer className="bg-white py-4 text-center shadow-inner">
        <p className="text-gray-500">&copy; 2025 Zipkok. All rights reserved.</p>
      </footer>
    </div>
  );
}
