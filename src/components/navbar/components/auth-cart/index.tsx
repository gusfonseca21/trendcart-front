import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import React, { useContext, useRef, useState } from "react";
import defaultAvatar from "../../../../../public/images/avatar-default.jpg";
import UserMenu from "./components/UserMenu";

interface AuthCartProps {
  linkListStyle: string;
  hoverText: string;
  setOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthCart({
  linkListStyle,
  hoverText,
  setOpenSignIn,
}: AuthCartProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { loggedUser } = useContext(UserContext);

  const avatarRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <ul className={`${linkListStyle} !justify-end`}>
        {loggedUser ? (
          <div className="relative">
            <div
              className="h-12 w-12 rounded-full overflow-hidden cursor-pointer"
              onClick={openMenu}
              ref={avatarRef}
            >
              <Image
                src={loggedUser.photo ?? defaultAvatar}
                alt="nome"
                height={50}
                width={50}
              />
            </div>
            {menuOpen ? (
              <UserMenu
                loggedUser={loggedUser}
                closeMenu={closeMenu}
                avatarRef={avatarRef}
              />
            ) : null}
          </div>
        ) : (
          <span
            className={`${hoverText} cursor-pointer`}
            onClick={() => setOpenSignIn((prevState) => !prevState)}
          >
            Entrar
          </span>
        )}
        {/* <a className={hoverText}>Carrinho</a> */}
      </ul>
    </div>
  );
}
