import React from "react";

interface Props {
  openSignIn: boolean;
  closeModalHandler: () => void;
  children: React.ReactNode;
}

export default function Backdrop({
  openSignIn,
  closeModalHandler,
  children,
}: Props) {
  function closeOnBackDropClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (e.target === e.currentTarget) {
      closeModalHandler();
      return;
    }
    return;
  }

  return (
    <div
      onClick={(e) => closeOnBackDropClick(e)}
      className={
        openSignIn
          ? "w-full bg-black bg-opacity-20 fixed top-0 left-0 bottom-0 z-50 flex justify-center items-center"
          : "hidden"
      }
    >
      {children}
    </div>
  );
}
