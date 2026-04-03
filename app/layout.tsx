import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import NotificationPrompt from "./components/NotificationPrompt";

export const metadata: Metadata = {
  title: "Uganda Martyrs Parish",
  description: "Welcome to Uganda Martyrs Parish, Umlazi G, South Africa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <NotificationPrompt />
      </body>
    </html>
  );
}