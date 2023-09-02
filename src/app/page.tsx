"use client";
import FilterOptions from "@/components/first-page/filter-options";
import HeroCarousel from "@/components/first-page/hero-carousel";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <FilterOptions />
    </>
  );
}
