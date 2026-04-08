import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import NotificationPrompt from "../components/NotificationPrompt";
import LoadingScreen from "../components/LoadingScreen";

export const metadata: Metadata = {
  title: "Uganda Martyrs Parish",
  description: "Uganda Martyrs Parish — Umlazi G, South Africa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b0e0e" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="UMP Parish" />
        <link rel="apple-touch-icon" href="/logo.webp" />
      </head>
      <body>
        <LoadingScreen />
        <Navbar />
        {children}
        <NotificationPrompt />
      </body>
    </html>
  );
}