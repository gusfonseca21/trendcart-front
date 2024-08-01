import Image from "next/image";
import React, { useState } from "react";
import leftChevron from "../../../../../public/icons/chevron-left.svg";
import rightChevron from "../../../../../public/icons/chevron-right.svg";

interface MainImageProps {
  images: string[] | undefined;
  imageShowing: string | undefined;
  selectImage: (image: string) => void;
}

const ICON_WIDTH = 40;

export default function MainImage({
  images,
  imageShowing,
  selectImage,
}: MainImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleChangeImage = (direction: "left" | "right") => {
    let currentImageIndex: number | undefined;
    images?.forEach((image, index) => {
      if (image === imageShowing) currentImageIndex = index;
    });
    if (!images || currentImageIndex === undefined) return;
    if (direction === "left") {
      if (currentImageIndex === 0) selectImage(images[images.length - 1]);
      else selectImage(images[currentImageIndex - 1]);
    }
    if (direction === "right") {
      if (currentImageIndex === images.length - 1) selectImage(images[0]);
      else selectImage(images[currentImageIndex + 1]);
    }
  };

  return (
    <div className='min-w-[52%] h-full relative flex justify-center items-center'>
      {images?.map((image, index) => {
        if (index !== 0) return null;
        return (
          <div
            key={image}
            className='relative w-full'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              onClick={() => handleChangeImage("left")}
              className={`cursor-pointer z-10 absolute left-10 top-1/2 transition ${
                isHovered ? "opacity-1" : "opacity-0"
              }`}
              alt='Chevron esquerda'
              src={leftChevron}
              width={ICON_WIDTH}
            />
            <Image
              src={`/products/${imageShowing}.jpg`}
              alt={image}
              className={`w-full object-cover`}
              sizes='auto'
              width={1}
              height={1}
              quality={100}
              draggable={false}
              priority
            />
            <Image
              onClick={() => handleChangeImage("right")}
              className={`transition cursor-pointer z-10 absolute top-1/2 right-10 ${
                isHovered ? "opacity-1" : "opacity-0"
              }`}
              alt='Chevron direita'
              src={rightChevron}
              width={ICON_WIDTH}
            />
          </div>
        );
      })}
    </div>
  );
}
