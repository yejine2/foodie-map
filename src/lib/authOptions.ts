import { type NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 2,
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/users/login",
  },
  callbacks: {
    // 세션 관리, 사용자 정보 유지 및 업데이트
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    // jwt 생성 및 사용자 정보 포함
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};
