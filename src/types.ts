export type FilterOptType =
  | "Todos"
  | "Bolsas e Mochilas"
  | "Decoração"
  | "Essenciais"
  | "Interior";

export const filterToParam: Record<FilterOptType, string> = {
  Todos: "all",
  "Bolsas e Mochilas": "bags",
  Decoração: "decoration",
  Essenciais: "essentials",
  Interior: "interior",
};

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
  Cinza: "#808080",
  Branco: "#FFFFFF",
  Verde: "#008000",
  Laranja: "#FFA500",
  Azul: "#0000FF",
  Amarelo: "#FFFF00",
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
  price: string;
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
