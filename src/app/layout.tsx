import "@/styles/globals.css";
import { NextLayout, NextProvider } from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "푸디맵",
  description: "푸디맵으로 쉽게 찾는 나의 맛집",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
