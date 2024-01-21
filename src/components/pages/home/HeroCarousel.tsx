import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./HeroCarousel.css";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { HeroProduct } from "@/types";
import Arrow from "@/components/ui/Arrow";
import Link from "next/link";

interface HeroCaouselProps {
  heroProducts: HeroProduct[];
}
export default function HeroCarousel({ heroProducts }: HeroCaouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
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

  // Mudança de direção para o carrosel
  useEffect(() => {
    if (currentSlide === 1) {
      setDirection((prevState) => (prevState === "next" ? "prev" : "next"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  // carrosel automático
  useEffect(() => {
    const timer = setInterval(() => {
      if (direction === "next") {
        instanceRef.current?.next();
      }
      if (direction === "prev") {
        instanceRef.current?.prev();
      }
    }, 6000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  return (
    <>
      <div className='navigation-wrapper'>
        {!!heroProducts.length ? (
          <div ref={sliderRef} className='keen-slider'>
            {heroProducts.map((product, index) => {
              return (
                <CarouselImage
                  product={product}
                  key={product._id}
                  isActive={index === instanceRef.current?.track.details.rel}
                />
              );
            })}
          </div>
        ) : (
          <div className='w-full h-144 flex justify-center items-center'>
            <LoadingSpinner width={50} height={50} />
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

interface CarouselImageProps {
  product: HeroProduct;
  isActive: boolean;
}

function CarouselImage({ product, isActive }: CarouselImageProps) {
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
    <div className='keen-slider__slide number-slide relative !bg-white !w-full'>
      <div
        className={`absolute z-10 top:50 left-52 max-w-sm flex flex-col gap-4 duration-1000 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2
          className={`text-3xl font-normal m-0 ${
            product.hero?.image === "slider-pendant-lighting"
              ? "text-zinc-50"
              : "text-zinc-700"
          }`}
        >
          {product.hero?.title}
        </h2>
        <Link
          href={`/product/${product._id}`}
          className={`text-xl font-normal text-light pb-1 w-fit cursor-pointer hover:text-main  ease-in-out duration-200 border-b border-[#888] ${
            product.hero?.image === "slider-pendant-lighting" &&
            "text-gray-400 "
          }`}
        >
          {product.category}
        </Link>
      </div>
      <Image
        src={`/products/${product.hero?.image}.jpg`}
        className='object-cover w-full'
        fill
        alt={product._id}
        priority
        quality={100}
        loading='eager'
        unoptimized
      />
    </div>
  );
}
