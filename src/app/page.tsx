"use client";
import { useState, useEffect } from "react";
import FilterOptions from "@/components/first-page/filter-options";
import HeroCarousel from "@/components/first-page/hero-carousel";
import { FilterOptType, Product } from "@/types";
import axios from "axios";
import ProductsDisplay from "@/components/first-page/products-display";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filCategory, setFilCategory] = useState<FilterOptType>("Todos");
  const [productPage, setProductPage] = useState<number>(1);
  const [lastProdPage, setLastProdPage] = useState(false);
  const [loadingFilProducts, setLoadingFilProducts] = useState(false);

  useEffect(() => {
    (async function () {
      const { data } = await fetchProducts();
      setFilteredProducts(data);
    })();
  }, []);

  useEffect(() => {
    changeFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filCategory]);

  async function changeFilter() {
    try {
      const { data, isLastPage } = await fetchProducts(filCategory, 1);

      setFilteredProducts(data);
      setLastProdPage(isLastPage);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchMore() {
    try {
      const { data, isLastPage } = await fetchProducts(
        filCategory,
        productPage + 1
      );

      setFilteredProducts((prevState) => {
        const newProdArr = prevState;
        newProdArr.push(...data);
        return newProdArr;
      });
      setProductPage((prevState) => prevState + 1);
      setLastProdPage(isLastPage);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchProducts(
    filter: FilterOptType = "Todos",
    page: number = 1
  ) {
    try {
      const response = await axios.get(
        backendUrl + "/products?filter=" + filter + `&page=${page}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  return (
    <div className='w-full h-full flex flex-col justify-center pb-5'>
      <HeroCarousel />
      <FilterOptions
        filCategory={filCategory}
        setFilCategory={setFilCategory}
      />
      <ProductsDisplay
        filteredProducts={filteredProducts}
        loading={loadingFilProducts}
        showMoreFunc={fetchMore}
        lastPage={lastProdPage}
      />
    </div>
  );
}
