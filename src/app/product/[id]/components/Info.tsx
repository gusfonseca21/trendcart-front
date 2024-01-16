import Rating from "@/components/ui/Rating";
import { Product } from "@/types";
import ColorSelector from "./info-components/ColorSelector";
import QuantitySelector from "./info-components/QuantitySelector";
import BlackButton from "@/components/ui/BlackButton";

interface InfoProps {
  product: Product | undefined;
  selectImage: (image: string) => void;
}

export default function Info({ product, selectImage }: InfoProps) {
  return (
    <div className='w-[41%] flex flex-col gap-5 py-5 justify-center'>
      <h3 className='text-3xl'>{product?.name}</h3>
      <span className='text-main text-xl'>R${product?.price},00</span>
      <p className='text-lg text-light'>{product?.description}</p>
      <Rating avg={product?.ratingsAverage} />
      <div>
        <div className='border border-gray-300'>
          <ColorSelector product={product} selectImage={selectImage} />
          <QuantitySelector />
        </div>
        <BlackButton
          text='Adicionar ao carrinho'
          action={() => console.log("pica")}
          style='!border-none'
        />
      </div>
    </div>
  );
}
