import Links from "./components/Links";
import Logo from "./components/Logo";
import AuthCart from "./components/auth-cart";

interface NavbarProps {
  setOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const linkListStyle =
  "h-20 w-full flex flex-row justify-center items-center gap-5 ";
const hoverText = "hover:text-main transition-text";

export const NAVBAR_HEIGHT = 20;

export default function Navbar({ setOpenSignIn }: NavbarProps) {
  return (
    <nav
      // className={`w-full min-h-${NAVBAR_HEIGHT} sticky top-0 left-0 right-0 z-40 grid grid-cols-3 grid-flow-row px-8 text-light bg-white`}
      className={`w-full min-h-${NAVBAR_HEIGHT} sticky top-0 left-0 right-0 z-40 flex justify-center items-center  px-8 text-light bg-white`}
    >
      {/* <Links linkListStyle={linkListStyle} hoverText={hoverText} /> */}
      <Logo linkListStyle={linkListStyle} />
      <AuthCart
        linkListStyle={linkListStyle}
        hoverText={hoverText}
        setOpenSignIn={setOpenSignIn}
      />
    </nav>
  );
}
