import React from "react";
import { FilterOptType } from "@/types";

export const filterOptions: FilterOptType[] = [
  "Todos",
  "Bolsas e Mochilas",
  "Decoração",
  "Essenciais",
  "Interior",
];

interface FilterOptionsProps {
  filCategory: FilterOptType;
  setFilCategory: React.Dispatch<React.SetStateAction<FilterOptType>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

const slash = <span className='text-gray-300'>/</span>;

export default function FilterOptions({
  setFilCategory,
  filCategory,
  setSort,
}: FilterOptionsProps) {
  return (
    <div className='h-36 w-full flex justify-around font-medium'>
      <div className='h-full flex justify-center items-center gap-5 '>
        {filterOptions.map((option, index) => (
          <React.Fragment key={option}>
            <button
              key={option}
              className={`h-max hover:text-main transition-text ${
                filCategory === option ? "text-main" : "text-gray-400"
              }`}
              onClick={() => setFilCategory(option)}
            >
              {option}
            </button>
            {index < filterOptions.length - 1 && slash}
          </React.Fragment>
        ))}
      </div>
      <div className='h-full flex justify-end items-center gap-5'>
        <label htmlFor='order' className='text-gray-400'>
          Ordernar:
        </label>
        <select
          id='order'
          className='text-main'
          onChange={(event) => setSort(event.target.value)}
        >
          <option value='_id'>Escolher</option>
          <option value='price'>Preço crescente</option>
          <option value='-price'>Preço decrescente</option>
        </select>
      </div>
    </div>
  );
}
