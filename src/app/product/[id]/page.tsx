"use client";

import { Product } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

import ImageSelector from "./components/ImageSelector";
import MainImage from "./components/MainImage";
import Info from "./components/Info";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | undefined>();
  const [imageShowing, setSelectedImage] = useState<string | undefined>();

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
      setSelectedImage(result.data.data.images[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const selectImage = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div
      className={`bg-main-grey flex flex-column center h-full w-full left-10`}
    >
      <div className='w-1/2 h-full flex flex-row'>
        <ImageSelector
          images={product?.images}
          selectedImage={imageShowing}
          selectImage={selectImage}
        />
        <MainImage
          images={product?.images}
          imageShowing={imageShowing}
          selectImage={selectImage}
        />
        <Info product={product} selectImage={selectImage} />
      </div>
    </div>
  );
}
