import { useState } from "react";

import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";

import axios from "axios";
import { StoreType } from "@/interface";

export default function Home({ stores }: { stores: StoreType[] }) {
  return (
    <>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
    </>
  );
}

export async function getStaticProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

  return {
    props: { stores: stores.data },
    revalidate: 60 * 60,
  };
}
