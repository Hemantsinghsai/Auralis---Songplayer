import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auralis — Feel Every Frequency",
  description: "Auralis is a premium music streaming and discovery platform (frontend prototype).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
