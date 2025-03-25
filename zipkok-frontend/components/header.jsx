"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Header({ changeLanguage, langClass }) {
  const { t, i18n } = useTranslation();
  const [showLangModal, setShowLangModal] = useState(false);

  return (
    <header className="bg-white shadow-sm py-4 z-50 relative" tabIndex={-1}>
      <nav className="container mx-auto flex justify-between items-center px-4 md:px-8">
        {/* 🔤 로고 링크 */}
        <Link href="/" legacyBehavior>
          <a className={`text-3xl font-semibold text-indigo-700 tracking-tight ${langClass} cursor-pointer`}>
            {t("title")}
          </a>
        </Link>

        {/* 🔤 언어 선택 버튼 */}
        <div className="relative">
          <button
            onClick={() => setShowLangModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
          >
            🌐 Language
          </button>

          {/* 🔤 언어 모달 */}
          {showLangModal && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-md border z-50">
              <button
                onClick={() => changeLanguage("en")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => changeLanguage("kr")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                🇰🇷 한국어
              </button>
              <button
                onClick={() => changeLanguage("jp")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                🇯🇵 日本語
              </button>
              <button
                onClick={() => setShowLangModal(false)}
                className="block w-full px-4 py-2 text-center text-gray-500 text-xs hover:underline"
              >
                닫기 / Close
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
