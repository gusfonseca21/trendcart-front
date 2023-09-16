"use client";
import { useState, useEffect } from "react";
import { FilterOptType, Product } from "@/types";
import axios from "axios";
import FilterOptions from "@/components/pages/home/FilterOptions";
import ProductsDisplay from "@/components/pages/home/ProductsDisplay";
import HeroCarousel from "@/components/pages/home/HeroCarousel";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filCategory, setFilCategory] = useState<FilterOptType>("Todos");
  const [sort, setSort] = useState<string>("_id");
  const [productPage, setProductPage] = useState<number>(1);
  const [lastProdPage, setLastProdPage] = useState(false);
  const [loadingFilProducts, setLoadingFilProducts] = useState(true);

  useEffect(() => {
    (async function () {
      const { data } = await fetchProducts();
      setFilteredProducts(data);
    })();
  }, []);

  useEffect(() => {
    updateProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filCategory, sort]);

  async function updateProducts() {
    try {
      const { data, isLastPage } = await fetchProducts(filCategory, 1, sort);

      setFilteredProducts(data);
      setLastProdPage(isLastPage);
      setProductPage(1);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchMore() {
    try {
      const { data, isLastPage } = await fetchProducts(
        filCategory,
        productPage + 1,
        sort
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
    page: number = 1,
    sort: string = "_id"
  ) {
    setLoadingFilProducts(true);
    try {
      const response = await axios.get(
        backendUrl +
          "/products?filter=" +
          filter +
          `&page=${page}` +
          `&sort=${sort}`
      );
      setLoadingFilProducts(false);
      return response.data;
    } catch (err) {
      console.log(err);
      setLoadingFilProducts(false);
    }
  }

  return (
    <div className='flex flex-col pb-5 w-full h-full'>
      <HeroCarousel />
      <FilterOptions
        filCategory={filCategory}
        setFilCategory={setFilCategory}
        setSort={setSort}
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
