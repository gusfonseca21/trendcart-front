"use client";
import { useState, useEffect } from "react";
import FilterOptions from "@/components/first-page/filter-options";
import HeroCarousel from "@/components/first-page/hero-carousel";
import { FilterOptType, Product, filterToParam } from "@/types";
import axios from "axios";
import ProductsDisplay from "@/components/first-page/products-display";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<FilterOptType>("Todos");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loadingFilProducts, setLoadingFilProducts] = useState(true);

  console.log(filteredProducts);

  useEffect(() => {
    fetchProducts(selectedFilter);
  }, [selectedFilter]);

  async function fetchProducts(filterOption: FilterOptType) {
    setLoadingFilProducts(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.get(
        backendUrl + "/products?filter=" + filterToParam[filterOption]
      );
      setFilteredProducts(response.data.data);
      setLoadingFilProducts(false);
    } catch (err) {
      console.log(err);
      setLoadingFilProducts(false);
    }
  }

  return (
    <div className='w-full h-full flex flex-col justify-center'>
      <HeroCarousel />
      <FilterOptions
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <ProductsDisplay
        filteredProducts={filteredProducts}
        loading={loadingFilProducts}
      />
    </div>
  );
}
