"use client";
import { useState, useEffect } from "react";
import FilterOptions from "@/components/first-page/filter-options";
import HeroCarousel from "@/components/first-page/hero-carousel";
import { FilterOptType, Product } from "@/types";
import axios from "axios";
import ProductsDisplay from "@/components/first-page/products-display";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<FilterOptType>("Todos");
  const [productPage, setProductPage] = useState<number>(1);
  const [lastProdPage, setLastProdPage] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loadingFilProducts, setLoadingFilProducts] = useState(true);

  useEffect(() => {
    fetchProducts(selectedFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter, productPage]);

  async function fetchProducts(filterOption: FilterOptType) {
    setLoadingFilProducts(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.get(
        backendUrl +
          "/products?filter=" +
          selectedFilter +
          `&page=${productPage}`
      );

      setLastProdPage(response.data.lastPage);

      setFilteredProducts((prevState) => {
        const newProdArr = prevState;
        newProdArr.push(...response.data.data);
        return newProdArr;
      });

      setLoadingFilProducts(false);
    } catch (err) {
      console.log(err);
      setLoadingFilProducts(false);
    }
  }

  return (
    <div className='w-full h-full flex flex-col justify-center pb-5'>
      <HeroCarousel />
      <FilterOptions
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <ProductsDisplay
        filteredProducts={filteredProducts}
        loading={loadingFilProducts}
        setPage={setProductPage}
        lastPage={lastProdPage}
      />
    </div>
  );
}
