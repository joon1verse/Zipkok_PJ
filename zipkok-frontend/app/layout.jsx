// zipkok-frontend/app/layout.jsx
export const metadata = {
  title: 'Zipkok',
  description: 'Your multilingual room rental platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
