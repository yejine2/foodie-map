import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { storeId }: { storeId: number } = await req.json();

    // Like 데이터가 있는지 확인
    let like = await prisma.like.findFirst({
      where: {
        storeId,
        userId: session?.user?.id,
      },
    });

    // 만약 이미 찜을 했다면, 해당 like 데이터 삭제. 아니라면, 데이터 생성
    if (like) {
      // 이미 찜을 한 상황
      like = await prisma.like.delete({
        where: {
          id: like.id,
        },
      });
      return new NextResponse(null, { status: 204 });
    } else {
      // 찜을 하지 않은 상황
      like = await prisma.like.create({
        data: {
          storeId,
          userId: session?.user?.id,
        },
      });

      return NextResponse.json(like, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const skipPage = parseInt(page) - 1;

    const count = await prisma.like.count({
      where: {
        userId: session.user.id,
      },
    });

    const likes = await prisma.like.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        userId: session.user.id,
      },
      include: {
        store: true,
      },
      skip: skipPage * parseInt(limit),
      take: parseInt(limit),
    });

    return NextResponse.json({
      data: likes,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
