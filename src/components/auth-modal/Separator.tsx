import React from "react";

export default function Separator() {
  return (
    <div className="flex w-full relative justify-center before:content-[' '] before:h-px before:w-full before:absolute before:top-1/2 before:-translate-y-1/2 before:bg-black before:-z-1 before:opacity-20">
      <div className='bg-white px-5 z-10'>ou</div>
    </div>
  );
}
