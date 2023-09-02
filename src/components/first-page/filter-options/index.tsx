import { FilterOptType } from "@/types";
import React from "react";

const filterOptions: FilterOptType[] = [
  "Todos",
  "Bolsas e Mochilas",
  "Decoração",
  "Essenciais",
  "Interior",
];

function FilterButton({ filter }: { filter: FilterOptType }) {
  return <button onClick={() => console.log(filter)}>{filter}</button>;
}

filterOptions.forEach((t) => console.log(t));

export default function FilterOptions() {
  return (
    <div className='h-36 w-full bg-red-100 px-40'>
      <div className='h-full bg-blue-200'>
        {filterOptions.map((option) => (
          <FilterButton key={option} filter={option} />
        ))}
      </div>
      <div className='h-full bg-green-200'></div>
    </div>
  );
}
