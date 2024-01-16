import { Color, Product } from "@/types";
import React, { useEffect, useState } from "react";

interface ColorSelectorProps {
  product: Product | undefined;
  selectImage: (image: string) => void;
}

export default function ColorSelector({
  product,
  selectImage,
}: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState<Color | undefined>(
    undefined
  );
  useEffect(() => {
    if (!product) return;
    else {
      setSelectedColor(product.colors.map((color) => color)[0]);
    }
  }, [product]);

  if (!product?.colors) return null;

  const selectColorHandler = (color: Color, index: number) => {
    setSelectedColor(color);
    const selectedImage = product?.images.map((image) => image)[index];
    if (selectedImage) {
      selectImage(selectedImage);
    }
  };
  return (
    <>
      {product?.colors.length ? (
        <div className='flex items-center p-3 justify-between  border-b border-b-gray-300'>
          <span>Cor</span>
          <div className='flex gap-3'>
            {product?.colors.map((color, index) => (
              <div
                onClick={() => selectColorHandler(color, index)}
                key={color}
                className={`w-7 h-7 rounded-full border p-[2px] cursor-pointer ${
                  selectedColor === color ? "border-gray-400" : ""
                }`}
              >
                <div className={`bg-${color} rounded-full w-full h-full`} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
