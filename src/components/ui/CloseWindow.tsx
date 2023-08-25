import { AiOutlineClose } from "react-icons/ai";

interface Props {
  closeFunction: () => void;
}

export default function CloseWindow({ closeFunction }: Props) {
  return (
    <div
      onClick={closeFunction}
      className='absolute top-3 right-3 cursor-pointer transition-black-opacity'
    >
      <AiOutlineClose size={25} />
    </div>
  );
}
