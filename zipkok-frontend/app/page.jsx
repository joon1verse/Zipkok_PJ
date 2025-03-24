"use client";
import { useTranslation } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      title: "Zipkok",
      slogan: "Stop searching everywhere.\nDiscover Canadian room listings all in one place.",
      description: "Search rental listings from multiple Canadian websites in one place.",
      placeholder: "Search by city or neighborhood...",
      search: "Search"
    }
  },
  kr: {
    translation: {
      title: "집콕",
      slogan: "더 이상 힘들게 찾지 마세요.\n캐나다의 쉐어하우스, 홈스테이 정보를 한 곳에서!",
      description: "캐나다 여러 웹사이트의 렌트 리스트를 한곳에서 검색하세요.",
      placeholder: "도시 또는 지역으로 검색...",
      search: "검색"
    }
  },
  jp: {
    translation: {
      title: "ジプコク",
      slogan: "面倒な部屋探しは、もう終わり。\nカナダのルームシェア情報を一箇所で確認！",
      description: "複数のカナダのウェブサイトから賃貸情報を一括検索。",
      placeholder: "都市または地域で検索...",
      search: "検索"
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

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const langClass = {
    en: 'font-inter',
    kr: 'font-noto-kr',
    jp: 'font-noto-jp'
  }[i18n.language] || 'font-inter';

  return (
    <div className={`min-h-screen bg-gray-50 ${langClass}`}>
      <header className="bg-white shadow-sm py-4">
        <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4 gap-4">
          <div className="w-full flex justify-between items-center">
            <h1 className={`text-left text-3xl font-semibold text-indigo-700 tracking-tight ${langClass}`}>
              {t('title')}
            </h1>

              <div className="flex gap-2 items-center text-sm md:text-base">
  <button
    className="flex items-center gap-1 px-2"
    onClick={() => changeLanguage('kr')}
  >
    <img
      src="https://twemoji.maxcdn.com/v/latest/72x72/1f1f0-1f1f7.png"
      alt="kr"
      className="w-5 h-5"
    />
    한국어
  </button>

  <span className="text-gray-300">|</span>

  <button
    className="flex items-center gap-1 px-2"
    onClick={() => changeLanguage('jp')}
  >
    <img
      src="https://twemoji.maxcdn.com/v/latest/72x72/1f1ef-1f1f5.png"
      alt="jp"
      className="w-5 h-5"
    />
    日本語
  </button>

  <span className="text-gray-300">|</span>

  <button
    className="flex items-center gap-1 px-2"
    onClick={() => changeLanguage('en')}
  >
    <img
      src="https://twemoji.maxcdn.com/v/latest/72x72/1f1ec-1f1e7.png"
      alt="en"
      className="w-5 h-5"
    />
    English
  </button>
</div>
            
          </div>
        </nav>

        <div className="container mx-auto py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-24 bg-gray-200 rounded-lg flex items-center justify-center">광고 영역 #1</div>
          <div className="h-24 bg-gray-200 rounded-lg flex items-center justify-center">광고 영역 #2</div>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <section className="text-center px-4">
          <h2 className="whitespace-pre-line text-3xl md:text-4xl font-semibold text-gray-800 mb-4 mt-4">
            {t('slogan')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('description')}
          </p>
          <div className="max-w-xl mx-auto">
            <input
              type="text"
              placeholder={t('placeholder')}
              className="w-full rounded-lg border-2 border-gray-200 p-3 shadow-sm text-base md:text-lg"
            />
            <button className="mt-4 w-full rounded-lg bg-indigo-500 p-3 text-white font-semibold hover:bg-indigo-600 text-base md:text-lg">
              {t('search')}
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white py-4 text-center shadow-inner">
        <p className="text-gray-500">&copy; 2025 Zipkok. All rights reserved.</p>
      </footer>
    </div>
  );
}
