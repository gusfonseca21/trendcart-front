import React from "react";

interface Props {
  setOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const linkListStyle =
  "h-full w-full flex flex-row justify-center items-center gap-5 ";
const hoverText = "hover:text-main transition-text";

export const NAVBAR_HEIGHT = 20;

export default function Navbar({ setOpenSignIn }: Props) {
  return (
    <nav
      className={`w-full h-${NAVBAR_HEIGHT} sticky top-0 left-0 right-0 z-40 grid grid-cols-3 grid-flow-row px-8 text-light bg-white`}
    >
      <div>
        <ul className={`${linkListStyle} !justify-start`}>
          <li>
            <a className={hoverText}>Shop</a>
          </li>
          <li>
            <a className={hoverText}>Categories</a>
          </li>
          <li>
            <a className={hoverText}>Pages</a>
          </li>
          <li>
            <a className={hoverText}>Elements</a>
          </li>
        </ul>
      </div>
      <div>
        <div className={linkListStyle}>
          <a
            href='/'
            className='font-semibold text-2xl tracking-wide text-black'
          >
            T R E N D C A R T
          </a>
        </div>
      </div>
      <div>
        <ul className={`${linkListStyle} !justify-end`}>
          <a
            className={hoverText}
            onClick={() => setOpenSignIn((prevState) => !prevState)}
          >
            Sign In
          </a>
          <a className={hoverText}>Cart</a>
        </ul>
      </div>
    </nav>
  );
}
