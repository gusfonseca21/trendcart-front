import { FilterOptType } from "@/types";
import React, { useState } from "react";

export const filterOptions: FilterOptType[] = [
  "Todos",
  "Bolsas e Mochilas",
  "Decoração",
  "Essenciais",
  "Interior",
];

interface FilterOptionsProps {
  selectedFilter: FilterOptType;
  setSelectedFilter: React.Dispatch<React.SetStateAction<FilterOptType>>;
}

const slash = <span className='text-gray-300'>/</span>;

export default function FilterOptions({
  setSelectedFilter,
  selectedFilter,
}: FilterOptionsProps) {
  const [filterOrSearchMode, setFilterOrSearchMode] = useState<
    null | "filter" | "search"
  >(null);

  return (
    <div className='h-36 w-full flex justify-around font-medium'>
      <div className='h-full flex justify-center items-center gap-5 '>
        {filterOptions.map((option, index) => (
          <>
            <button
              key={option}
              className={`h-max hover:text-main transition-text ${
                selectedFilter === option ? "text-main" : "text-gray-400"
              }`}
              onClick={() => setSelectedFilter(option)}
            >
              {option}
            </button>
            {index < filterOptions.length - 1 && slash}
          </>
        ))}
      </div>
      <div className='h-full flex justify-end items-center gap-5'>
        <button
          className={`h-max w-max hover:text-main ${
            filterOrSearchMode === "filter" ? "text-main" : "text-gray-400"
          }`}
          onClick={() => {
            if (filterOrSearchMode === "filter") setFilterOrSearchMode(null);
            else setFilterOrSearchMode("filter");
          }}
        >
          Filtros
        </button>
        {slash}
        <button
          className={`h-max w-max hover:text-main ${
            filterOrSearchMode === "search" ? "text-main" : "text-gray-400"
          }`}
          onClick={() => {
            if (filterOrSearchMode === "search") setFilterOrSearchMode(null);
            else setFilterOrSearchMode("search");
          }}
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
