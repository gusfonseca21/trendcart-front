"use client";
import { NAVBAR_HEIGHT } from "@/components/Navbar";
import Arrow from "@/components/ui/Arrow";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Product } from "@/types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactImageZoom from "react-image-zoom";

type PageParams = {
  params: {
    id: string;
  };
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Page({ params }: PageParams) {
  const [product, setProduct] = useState<Product | null>(null);
  const [imageShowing, setImageShowing] = useState<string | null>(null);

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
      setProduct(result.data.data);
      setImageShowing(result.data.data.images[0]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className={`bg-main-grey flex flex-column center h-full w-full left-10`}
    >
      <div className='w-1/2 h-full flex flex-row'>
        <div className='min-w-[7%] max-w-[7%] h-full flex flex-col'>
          {product?.images.map((image) => {
            return (
              <Image
                src={`/products/${image}.jpg`}
                alt={image}
                className={`w-full cursor-pointer ${
                  imageShowing === image ? "" : "opacity-50"
                }`}
                sizes='auto'
                width={1}
                height={1}
                quality={0}
                key={image}
                onClick={() => setImageShowing(image)}
                draggable={false}
              />
            );
          })}
        </div>
        <div className='min-w-[52%] h-full relative flex justify-center items-center'>
          {product
            ? product.images.map((image, index) => {
                if (index !== 0) return null;
                return (
                  <ReactImageZoom
                    img={`/products/${imageShowing}.jpg`}
                    zoomImg={`/products/${imageShowing}.jpg`}
                    key={image}
                    height={890}
                  />
                );
              })
            : null}
        </div>
        <div className='w-[41%]'></div>
      </div>
    </div>
  );
}
