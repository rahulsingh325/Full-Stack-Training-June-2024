import "bootstrap/dist/css/bootstrap.min.css";
import "../style/main.scss";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
