"use client";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Header({ changeLanguage, langClass }) {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm py-4">
      <nav className="container mx-auto flex items-center justify-between px-4 md:px-8">

        {/* ✅ 링크 + a 태그 구조로 변경 */}
        <Link href="/" passHref legacyBehavior>
          <a className={`text-3xl font-semibold text-indigo-700 tracking-tight ${langClass} cursor-pointer`}>
            {t('title')}
          </a>
        </Link>

        {/* 언어 버튼 영역 */}
        <div className="flex items-center gap-3">
          {["kr", "jp", "en"].map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded-md bg-white hover:bg-gray-100 text-sm md:text-base font-medium transition focus:outline-none focus:ring-1 focus:ring-indigo-300"
            >
              <span className="text-xl leading-none">
                {lang === "kr" ? "🇰🇷" : lang === "jp" ? "🇯🇵" : "🇬🇧"}
              </span>
              <span>{lang === "kr" ? "한국어" : lang === "jp" ? "日本語" : "English"}</span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
