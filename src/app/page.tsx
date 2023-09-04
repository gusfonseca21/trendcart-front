"use client";
import { useState, useEffect } from "react";
import FilterOptions from "@/components/first-page/filter-options";
import HeroCarousel from "@/components/first-page/hero-carousel";
import { FilterOptType } from "@/types";
import axios from "axios";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<FilterOptType>("Todos");

  useEffect(() => {
    fetchProducts(selectedFilter);
  }, [selectedFilter]);

  async function fetchProducts(filterOption: FilterOptType) {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.get(backendUrl + "/products");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <HeroCarousel />
      <FilterOptions
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </>
  );
}
