import React from "react";

interface Props {
  setOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const linkListStyle =
  "h-full w-full flex flex-row justify-center items-center gap-5 ";

export const NAVBAR_HEIGHT = 20;

export default function Navbar({ setOpenSignIn }: Props) {
  return (
    <nav
      className={`w-full h-${NAVBAR_HEIGHT} sticky top-0 left-0 right-0 z-40 grid grid-cols-3 grid-flow-row px-8 font-light bg-white`}
    >
      <div>
        <ul className={`${linkListStyle} !justify-start`}>
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
      <div>
        <div className={linkListStyle}>
          <a href='/' className='font-medium text-2xl tracking-widest'>
            TrendCart
          </a>
        </div>
      </div>
      <div>
        <ul className={`${linkListStyle} !justify-end`}>
          <a onClick={() => setOpenSignIn((prevState) => !prevState)}>
            Sign In
          </a>
          <a>Cart</a>
        </ul>
      </div>
    </nav>
  );
}
