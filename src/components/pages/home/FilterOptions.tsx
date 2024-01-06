import React, { useRef } from "react";
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

const slash = <span className='text-light select-none'>/</span>;

export default function FilterOptions({
  setFilCategory,
  filCategory,
  setSort,
}: FilterOptionsProps) {
  const filterRef = useRef<HTMLDivElement | null>(null);

  const clickOnFilter = (option: FilterOptType) => {
    setFilCategory(option);
    if (filterRef.current) scrollIntoViewWithOffset(filterRef.current, 20);
  };

  const scrollIntoViewWithOffset = (
    targetElement: HTMLDivElement,
    offset: number
  ) => {
    window.scrollTo({
      behavior: "smooth",
      top:
        targetElement.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top -
        offset,
    });
  };

  return (
    <div className='h-36 w-full flex justify-around font-medium'>
      <div
        ref={filterRef}
        className='h-full flex justify-center items-center gap-5 '
      >
        {filterOptions.map((option, index) => (
          <React.Fragment key={option}>
            <button
              key={option}
              className={`h-max text-light hover:text-main transition-text ${
                filCategory === option && "text-main"
              }`}
              onClick={() => clickOnFilter(option)}
            >
              {option}
            </button>
            {index < filterOptions.length - 1 && slash}
          </React.Fragment>
        ))}
      </div>
      {/* <div className='h-full flex justify-end items-center gap-5'>
        <label htmlFor='order' className='text-light'>
          Ordernar:
        </label>
        <select
          id='order'
          className='text-light text-main'
          onChange={(event) => setSort(event.target.value)}
        >
          <option value='_id'>Escolher</option>
          <option value='price'>Preço crescente</option>
          <option value='-price'>Preço decrescente</option>
        </select>
      </div> */}
    </div>
  );
}
