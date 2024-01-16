import Image from "next/image";
import React from "react";

interface ImageSelectorProps {
  images: string[] | undefined;
  selectedImage: string | undefined;
  selectImage: (image: string) => void;
}

export default function ImageSelector({
  images,
  selectedImage,
  selectImage,
}: ImageSelectorProps) {
  return (
    <div className='min-w-[7%] max-w-[7%] h-full flex flex-col'>
      {images?.map((image) => {
        return (
          <Image
            src={`/products/${image}.jpg`}
            alt={image}
            className={`w-full cursor-pointer ${
              selectedImage === image ? "" : "opacity-50"
            }`}
            sizes='auto'
            width={1}
            height={1}
            quality={0}
            key={image}
            onClick={() => selectImage(image)}
            draggable={false}
          />
        );
      })}
    </div>
  );
}
