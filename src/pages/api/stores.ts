import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "@/interface";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[]>
) {
  const { page = "" }: { page?: string } = req.query;
  const prisma = new PrismaClient();

  if (page) {
    const count = await prisma.store.count(); // 총 레코드 갯수
    const skipPage = parseInt(page) - 1;
    const pageSize = 10; // 페이지당 데이터 수

    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      take: pageSize, // 가져올 데이터 수
      skip: skipPage * pageSize, // 건너뛸
    });

    res.status(200).json({
      page: parseInt(page),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } else {
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
    });

    return res.status(200).json(stores);
  }
}
