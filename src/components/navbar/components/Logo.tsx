import Link from "next/link";
import React from "react";

interface LogoProps {
  linkListStyle: string;
}

export default function Logo({ linkListStyle }: LogoProps) {
  return (
    <div className={linkListStyle}>
      <Link
        href='/'
        className='font-semibold text-2xl tracking-wide text-black'
      >
        T R E N D C A R T
      </Link>
    </div>
  );
}
