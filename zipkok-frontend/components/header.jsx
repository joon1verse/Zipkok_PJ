"use client";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Header({ changeLanguage, langClass }) {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm py-4">
      <nav className="container mx-auto flex justify-between items-center px-4 md:px-8">

        {/* 좌측: 타이틀 (클릭 시 메인 이동) */}
        <Link href="/">
          <h1
            className={`cursor-pointer text-3xl font-semibold text-indigo-700 tracking-tight ${langClass}`}
          >
            {t('title')}
          </h1>
        </Link>

        {/* 우측: 언어 변경 버튼 */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => changeLanguage('kr')}
            className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded-md bg-white hover:bg-gray-100 text-sm md:text-base font-medium transition focus:outline-none focus:ring-1 focus:ring-indigo-300"
          >
            <span className="text-xl leading-none">🇰🇷</span>
            <span>한국어</span>
          </button>
          <button
            onClick={() => changeLanguage('jp')}
            className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded-md bg-white hover:bg-gray-100 text-sm md:text-base font-medium transition focus:outline-none focus:ring-1 focus:ring-indigo-300"
          >
            <span className="text-xl leading-none">🇯🇵</span>
            <span>日本語</span>
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded-md bg-white hover:bg-gray-100 text-sm md:text-base font-medium transition focus:outline-none focus:ring-1 focus:ring-indigo-300"
          >
            <span className="text-xl leading-none">🇬🇧</span>
            <span>English</span>
          </button>
        </div>

      </nav>
    </header>
  );
}
