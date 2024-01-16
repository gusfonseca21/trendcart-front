import Image from "next/image";
import React, { useState } from "react";
import leftArrow from "../../../../../../public/icons/arrow-left.svg";
import rightArrow from "../../../../../../public/icons/arrow-right.svg";

const ICON_WIDTH = 25;

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (variation: 1 | -1) => {
    if (variation === 1) {
      setQuantity((prevState) => {
        if (prevState <= 99) {
          return ++prevState;
        }
        return 99;
      });
    }
    if (variation === -1) {
      setQuantity((prevState) => {
        if (prevState === 1) return 1;
        return --prevState;
      });
    }
  };

  return (
    <div className='flex items-center p-3 justify-between'>
      <span>Quantidade</span>
      <div className='flex'>
        <Image
          onClick={() => handleQuantity(-1)}
          className='cursor-pointer'
          alt='Flecha esquerda'
          src={leftArrow}
          width={ICON_WIDTH}
        />
        <span className='w-7 flex justify-center'>{quantity}</span>
        <Image
          onClick={() => handleQuantity(1)}
          className='cursor-pointer'
          alt='Flecha direita'
          src={rightArrow}
          width={ICON_WIDTH}
        />
      </div>
    </div>
  );
}
