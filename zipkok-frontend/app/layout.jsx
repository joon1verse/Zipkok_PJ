
import '../styles/globals.css'; // ✅ Tailwind CSS 및 폰트 정의 불러오기

export const metadata = {
  title: 'Zipkok - Find Your Perfect Room',
  description: 'A multilingual room rental platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-black">
        {children}
      </body>
    </html>
  )
}
