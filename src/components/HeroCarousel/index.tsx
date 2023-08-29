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
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  console.log(instanceRef);

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
        {heroProducts.length && (
          <div ref={sliderRef} className='keen-slider'>
            <div className='keen-slider__slide number-slide1'>
              <Image
                src={`/products/${heroProducts[0].bannerImage}.jpg`}
                className='object-cover'
                fill
                alt={heroProducts[0].bannerImage}
              />
            </div>
            <div className='keen-slider__slide number-slide2'>
              <Image
                src={`/products/${heroProducts[1].bannerImage}.jpg`}
                className='object-cover'
                fill
                alt={heroProducts[1].bannerImage}
              />
            </div>
            <div className='keen-slider__slide number-slide3'>
              {" "}
              <Image
                src={`/products/${heroProducts[2].bannerImage}.jpg`}
                className='object-cover'
                fill
                alt={heroProducts[2].bannerImage}
              />
            </div>
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
