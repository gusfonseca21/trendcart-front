import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./style.css";
import axios from "axios";
import Image from "next/image";

type HeroProduct = {
  _id: string;
  name: string;
  category: string;
  bannerImage: string;
};

export default function HeroCarousel() {
  const [heroProducts, setHeroProducts] = useState<HeroProduct[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    rubberband: false,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    (async function () {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const result = await axios.get(backendUrl + "/products/hero");

        setHeroProducts(result.data.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <div className='navigation-wrapper'>
        {!!heroProducts.length && (
          <div ref={sliderRef} className='keen-slider'>
            {heroProducts.map((product, index) => {
              return (
                <CasrouselImage
                  key={product._id}
                  imagePath={product.bannerImage}
                  isActive={index === instanceRef.current?.track.details.rel}
                />
              );
            })}
          </div>
        )}
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />
            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
        {loaded && instanceRef.current && (
          <div className='dots'>
            {[
              ...Array(
                instanceRef?.current?.track.details.slides.length
              ).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                ></button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld} h-20`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      {props.left && (
        <path d='M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z' />
      )}
      {!props.left && (
        <path d='M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z' />
      )}
    </svg>
  );
}

interface CarouselImageProps {
  imagePath: string;
  isActive: boolean;
}

function CasrouselImage({ imagePath, isActive }: CarouselImageProps) {
  const [showContent, setShowContent] = useState(isActive);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isActive) {
        setShowContent(true);
      }
    }, 300);

    if (!isActive) {
      setShowContent(false);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isActive]);

  return (
    <div className='keen-slider__slide number-slide relative'>
      <div
        className={`absolute z-10 top:50 left-64 max-w-sm flex flex-col gap-4 duration-1000 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2
          className={`text-3xl font-normal m-0 ${
            imagePath === "slider-pendant-lighting"
              ? "text-white"
              : "text-black"
          }`}
        >
          Contemporary Pendant Lighting
        </h2>
        <span className='text-xl font-normal text-[#888] pb-2 border-b border-[#888] w-fit cursor-pointer hover:text-main  ease-in-out duration-200'>
          Interior
        </span>
      </div>
      <Image
        src={`/products/${imagePath}.jpg`}
        className='object-cover'
        fill
        alt={imagePath}
        priority
        unoptimized
      />
    </div>
  );
}
