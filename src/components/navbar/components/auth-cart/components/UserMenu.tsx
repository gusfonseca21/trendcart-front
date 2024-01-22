import { UserContext } from "@/context/UserContext";
import { User } from "@/types";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";

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

  const router = useRouter();
  const path = usePathname();

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
    if (path.startsWith("/user/")) router.replace("/");
    toast("O usuário saiu com sucesso");
  };

  return (
    <ul
      className={`w-40 absolute bg-white top-full right-0 flex flex-col border border-[bg-Cinza]`}
      ref={menuRef}
    >
      <Link
        href={`/user/${loggedUser.id}`}
        onClick={closeMenu}
        className={`${optionStyle} border border-t-0 border-x-0 border-b-[bg-Cinza] w-40 h-10 truncate`}
      >
        {loggedUser.name}
      </Link>
      <li
        className={`${optionStyle} font-normal text-red-500`}
        onClick={logoutUser}
      >
        Sair
      </li>
    </ul>
  );
}
