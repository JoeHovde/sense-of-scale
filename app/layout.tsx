import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

export const metadata: Metadata = {
  title: "Sense of Scale",
  description: "How well do you know the scale of things?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
