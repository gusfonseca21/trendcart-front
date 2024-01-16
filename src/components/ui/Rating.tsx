import React from "react";
import starIcon from "../../../public/icons/star.svg";
import dotIcon from "../../../public/icons/dot.svg";
import Image from "next/image";

interface RatingProps {
  avg: number | undefined;
}

const ICON_WIDTH = 20;

export default function Rating({ avg }: RatingProps) {
  const floorAvg = (avg: number | undefined): number => {
    if (!avg) return 4;
    else return Math.floor(avg);
  };

  const star = (indexKey: number) => (
    <Image
      alt='Ícone de estrela'
      src={starIcon}
      width={ICON_WIDTH}
      key={indexKey}
    />
  );
  const dot = (indexKey: number) => (
    <Image
      alt='Ícone de estrela'
      src={dotIcon}
      width={ICON_WIDTH}
      key={indexKey}
    />
  );

  const avgElement = () => {
    const elements = [];
    for (let i = 0; i < 5; ++i) {
      if (i + 1 <= floorAvg(avg)) elements.push(star(i));
      else elements.push(dot(i));
    }
    return elements;
  };

  return (
    <div key={avg} className='flex flex-row'>
      {avgElement()}
    </div>
  );
}
