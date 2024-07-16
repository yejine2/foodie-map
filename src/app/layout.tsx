import "@/styles/globals.css";
import { NextLayout, NextProvider } from "./providers";
import type { Metadata } from "next";
import GoogleAnalytics from "./googleAnalytics";

export const metadata: Metadata = {
  title: "푸디맵",
  description: "푸디맵으로 쉽게 찾는 나의 맛집",
  openGraph: {
    title: "푸디맵",
    description: "푸디맵으로 쉽게 찾는 나의 맛집",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID} />
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
