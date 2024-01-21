import { UserContext } from "@/context/UserContext";
import { User } from "@/types";
import React, { useContext, useEffect, useRef } from "react";

interface UserMenuProps {
  loggedUser: User;
  closeMenu: () => void;
  avatarRef: React.RefObject<HTMLDivElement>;
}

const optionStyle =
  "cursor-pointer w-full h-full p-2 flex justify-center hover:bg-gray-100 duration-150";

export default function UserMenu({
  loggedUser,
  closeMenu,
  avatarRef,
}: UserMenuProps) {
  const { updateLoggedUser } = useContext(UserContext);

  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleOutsideClick = (e: MouseEvent) => {
    const targetNode = e.target as Node;

    if (
      menuRef.current &&
      !menuRef.current.contains(targetNode) &&
      !(avatarRef.current?.contains(targetNode) ?? false)
    ) {
      closeMenu();
    }
  };

  const logoutUser = () => {
    updateLoggedUser(null);
    closeMenu();
  };

  return (
    <ul
      className={`w-40 absolute bg-white top-full right-0 flex flex-col border border-[bg-Cinza]`}
      ref={menuRef}
    >
      <li className={`${optionStyle}  `}>{loggedUser.name}</li>
      <li
        className={`${optionStyle} font-normal text-red-500`}
        onClick={logoutUser}
      >
        Sair
      </li>
    </ul>
  );
}
