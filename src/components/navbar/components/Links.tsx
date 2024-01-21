import React from "react";

interface LinksProps {
  hoverText: string;
  linkListStyle: string;
}

export default function Links({ hoverText, linkListStyle }: LinksProps) {
  return (
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
  );
}
