// app/layout.tsx
import Header from "./components/Header";
import { Providers } from "./providers";
import Footer from "./components/Footer";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
