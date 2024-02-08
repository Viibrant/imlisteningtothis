// app/layout.tsx
import Navbar from "./components/Navbar";
import { Providers } from "./providers";
import Footer from "./components/Footer";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
