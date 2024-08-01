import Rating from "@/components/ui/Rating";
import { Product } from "@/types";
import ColorSelector from "./info-components/ColorSelector";
import QuantitySelector from "./info-components/QuantitySelector";
import BlackButton from "@/components/ui/BlackButton";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { toast } from "react-toastify";

interface InfoProps {
  product: Product | undefined;
  selectImage: (image: string) => void;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Info({ product, selectImage }: InfoProps) {
  const [quantity, setQuantity] = useState(1);

  const { loggedUser } = useContext(UserContext);

  async function addToCart() {
    if (!loggedUser) {
      toast.error("É preciso estar logado para adicionar um item ao carrinho!");
      return;
    }

    console.log("productid", product?._id);

    const response = await axios.post(
      `${backendUrl}/users/${loggedUser.id}/cart`,
      { productId: product?._id, quantity }
    );

    if (response.status !== 201) {
      toast.error("Houve um erro ao tentar adicionar este produto no carrinho");
      return;
    }

    toast("Produto adicionado ao carrinho com sucesso!");
    setQuantity(1);
  }

  return (
    <div className="w-[41%] flex flex-col gap-5 py-5 justify-center">
      <h3 className="text-3xl">{product?.name}</h3>
      <span className="text-main text-xl">R${product?.price},00</span>
      <p className="text-lg text-light">{product?.description}</p>
      {/* <Rating avg={product?.ratingsAverage} /> */}
      <div>
        <div className="border border-gray-300">
          <ColorSelector product={product} selectImage={selectImage} />
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </div>
        <BlackButton
          text="Adicionar ao carrinho"
          action={() => addToCart()}
          style="!border-none"
        />
      </div>
    </div>
  );
}
