"use client";

import { useTranslation } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { useState, useEffect } from 'react';
import Header from '../components/Header'; // ✅ 헤더 컴포넌트 불러오기

// 다국어 리소스
const resources = {
  en: {
    translation: {
      title: "Zipkok",
      slogan: "Stop searching everywhere.\nDiscover Canadian room listings all in one place.",
      description: "Search rental listings from multiple Canadian websites in one place.",
      placeholder: "Search by city or neighborhood...",
      search: "Search",
      resultTitle: "Search Results for",
      noResult: "No listings found."
    }
  },
  kr: {
    translation: {
      title: "집콕",
      slogan: "더 이상 힘들게 찾지 마세요.\n캐나다의 쉐어하우스, 홈스테이 정보를 한 곳에서!",
      description: "캐나다 여러 웹사이트의 렌트 리스트를 한곳에서 검색하세요.",
      placeholder: "도시 또는 지역으로 검색...",
      search: "검색",
      resultTitle: '"{{query}}"의 검색 결과',
      noResult: "검색 결과가 없습니다."
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
      noResult: "検索結果がありません。"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: { escapeValue: false },
});

export default function Home() {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  const langClass = {
    en: 'font-inter',
    kr: 'font-noto-kr',
    jp: 'font-noto-jp'
  }[i18n.language] || 'font-inter';

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const dummyData = [
    { id: 1, title: "Toronto Downtown 쉐어하우스", location: "Toronto", price: "$700" },
    { id: 2, title: "Burnaby 넓은 하우스", location: "Burnaby", price: "$850" },
    { id: 3, title: "Vancouver Homestay", location: "Vancouver", price: "$950" }
  ];

  useEffect(() => {
    if (query) {
      const filtered = dummyData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  const handleSearch = () => {
    if (input.trim() === "") return;
    setQuery(input.trim());
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
    setInput("");
    setQuery("");
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${langClass}`}>
      
      {/* ✅ 헤더 컴포넌트 */}
      <Header changeLanguage={changeLanguage} langClass={langClass} />

      <main className="container mx-auto py-12">
        {!showResults ? (
          <section className="text-center px-4">
            <h2 className="whitespace-pre-line text-2xl md:text-3xl font-semibold text-gray-800 mb-4 tracking-tight" style={{ lineHeight: '2' }}>
              {t('slogan')}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t('description')}
            </p>
            <div className="max-w-xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('placeholder')}
                className="w-full rounded-lg border-2 border-gray-200 p-3 shadow-sm text-base md:text-lg"
              />
              <button
                onClick={handleSearch}
                className="mt-4 w-full rounded-lg bg-indigo-500 p-3 text-white font-semibold hover:bg-indigo-600 text-base md:text-lg"
              >
                {t('search')}
              </button>
            </div>
          </section>
        ) : (
          <section className="px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{t('resultTitle', { query })}</h2>
              <button onClick={handleBack} className="text-sm text-indigo-600 underline">← Back</button>
            </div>
            {results.length === 0 ? (
              <p className="text-gray-500">{t('noResult')}</p>
            ) : (
              <div className="grid gap-4">
                {results.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">{item.location}</p>
                    <p className="text-indigo-500 font-medium">{item.price}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="bg-white py-4 text-center shadow-inner">
        <p className="text-gray-500">&copy; 2025 Zipkok. All rights reserved.</p>
      </footer>
    </div>
  );
}
