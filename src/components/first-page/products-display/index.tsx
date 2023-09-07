import { Color, Product, colorToHex } from "@/types";
import Image from "next/image";
import React, { useState } from "react";

interface ProductsDisplayProps {
  filteredProducts: Product[];
  loading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  lastPage: boolean;
}

interface ProductProps {
  productData: Product;
  lastPage: boolean;
}

const subTextStyle =
  "text-sm font-light text-black hover:cursor-pointer absolute top-0 left-0";

export default function ProductsDisplay({
  filteredProducts,
  loading,
  setPage,
  lastPage,
}: ProductsDisplayProps) {
  return (
    <div className='max-w-[1300px] h-max self-center px-8 flex flex-row flex-wrap justify-around gap-5'>
      {loading && <h1>Carregando...</h1>}
      {!loading &&
        filteredProducts.map((product) => (
          <Product
            productData={product}
            lastPage={lastPage}
            key={product._id}
          />
        ))}
      <div
        className={`w-full p-5 flex justify-center border-gray-300 border-2 duration-150 ${
          !lastPage ? "cursor-pointer hover:text-gray-400" : "cursor-default"
        }`}
        onClick={() => {
          if (lastPage) return;
          setPage((prevState) => {
            if (prevState) {
              return prevState + 1;
            }
            return prevState;
          });
        }}
      >
        <span className='font-light'>
          {!lastPage ? "Carregar Mais" : "Todos os produtos foram carregados"}
        </span>
      </div>
    </div>
  );
}

function Product({ productData }: ProductProps) {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isSubTextHovered, setIsSubTextHovered] = useState(false);

  const colors = productData.colors.map((color) => colorToHex[color]);

  return (
    <div className='w-[270px] h-[400px] flex flex-col'>
      <div
        className='w-full h-[340px] relative hover:cursor-pointer'
        onMouseEnter={() => {
          setIsSubTextHovered(true);
          setIsImageHovered(true);
        }}
        onMouseLeave={() => {
          setIsSubTextHovered(false);
          setIsImageHovered(false);
        }}
      >
        <div className='absolute top-5 left-3 z-20 flex flex-row items-start gap-2'>
          {productData.colors.length > 1 &&
            colors.map((color) => (
              <div
                key={color}
                style={{
                  backgroundColor: color,
                  border:
                    color === "#FFFFFF" || color === "#F5F5DC"
                      ? "1px solid #aaa"
                      : "",
                }}
                className={`h-3 w-3 rounded-full`}
              />
            ))}
        </div>

        <Image
          src={`/products/${productData.images[0]}.jpg`}
          alt={productData.name}
          className='absolute top-0 left-0 opacity-1'
          fill
          sizes='auto'
        />
        <Image
          src={`/products/${productData.images[1]}.jpg`}
          alt={productData.name}
          className={`absolute top-0 left-0 z-10 ${
            isImageHovered ? "opacity-1" : "opacity-0"
          } transition-opacity duration-300`}
          fill
          sizes='auto'
        />
      </div>
      <div
        className='w-full z-10 flex flex-col'
        onMouseEnter={() => setIsSubTextHovered(true)}
        onMouseLeave={() => setIsSubTextHovered(false)}
      >
        <span className='max-w-max-content text-base font-light text-gray-500 hover:cursor-pointer'>
          {productData.name}
        </span>
        <div className='relative w-full h-7'>
          <span className={`${subTextStyle}`}>{`R$${productData.price}`}</span>
          <span
            className={`${subTextStyle} bg-white z-10 w-max border-b-2 border-gray-300 hover:text-main duration-150 ${
              isSubTextHovered ? "opacity-1" : "opacity-0"
            } transition-opacity duration-300`}
          >
            Mostrar mais
          </span>
        </div>
      </div>
    </div>
  );
}
