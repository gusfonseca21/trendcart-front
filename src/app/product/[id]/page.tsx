"use client";
import { Product } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

type PageParams = {
  params: {
    id: string;
  };
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Page({ params }: PageParams) {
  const [product, setProduct] = useState<Product | null>(null);
  const productId = params.id;
  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchProduct() {
    try {
      const result = await axios.get(`${backendUrl}/products/${productId}`);

      console.log(result.data.data);
      setProduct(product);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='bg-main-grey flex center h-full w-screen left-10'>
      <div>{params.id}</div>
    </div>
  );
}
