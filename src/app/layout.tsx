import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.scss";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Japan Manga Explorer",
    template: "%s | Japan Manga Explorer",
  },
  description:
    "Explorez un catalogue de mangas et des lieux incontournables du Japon.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Japan Manga Explorer",
    description:
      "Explorez un catalogue de mangas et des lieux incontournables du Japon.",
    type: "website",
    locale: "fr_FR",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr" className={poppins.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}