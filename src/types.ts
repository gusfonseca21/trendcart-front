export type FilterOptType =
  | "Todos"
  | "Bolsas e Mochilas"
  | "Decoração"
  | "Essenciais"
  | "Interior";

export type Color =
  | "Preto"
  | "Bege"
  | "Marrom"
  | "Cinza"
  | "Branco"
  | "Verde"
  | "Laranja"
  | "Azul"
  | "Amarelo";

export const colorToHex: Record<Color, string> = {
  Preto: "#000000",
  Bege: "#F5F5DC",
  Marrom: "#A52A2A",
  Cinza: "#c0c0c0",
  Branco: "#FFFFFF",
  Verde: "#04ad92",
  Laranja: "#dd9815",
  Azul: "#1f72be",
  Amarelo: "#edb807",
};

type Review = {
  user: { id: string; photo: string };
  rating: number;
  date: Date;
  comment: string;
};

export interface Product {
  _id: string;
  name: string;
  category: "Bolsas e Mochilas" | "Decoração" | "Essenciais" | "Interior";
  price: number;
  description: string;
  images: string[];
  hero?: {
    image: string;
    title: string;
  };
  colors: Color[];
  ratingsAverage: number;
  reviews: Review[];
}

export type HeroProduct = {
  _id: string;
  name: string;
  category: string;
  hero: {
    image: string;
    title: string;
  };
};
