import React from "react";

interface Props {
  setOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const navbarSecStyle =
  "h-full w-full flex flex-row justify-center items-center gap-5 ";

export default function Navbar({ setOpenSignIn }: Props) {
  return (
    <nav className='w-full h-20 sticky top-0 left-0 right-0 z-10 grid grid-cols-3 grid-flow-row'>
      <div className='h-full bg-red-500 pl-8'>
        <ul className={`${navbarSecStyle} !justify-start`}>
          <li>
            <a>Shop</a>
          </li>
          <li>
            <a>Categories</a>
          </li>
          <li>
            <a>Pages</a>
          </li>
          <li>
            <a>Elements</a>
          </li>
        </ul>
      </div>
      <div className='h-full bg-green-500'>
        <div className={navbarSecStyle}>
          <h2>TESTE</h2>
        </div>
      </div>
      <div className='h-full bg-blue-500 pr-8'>
        <ul className={`${navbarSecStyle} !justify-end`}>
          <li onClick={() => setOpenSignIn((prevState) => !prevState)}>
            Sign In
          </li>
          <li>Cart</li>
        </ul>
      </div>
    </nav>
  );
}
