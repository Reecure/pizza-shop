export interface IPizza {
  id?: number;
  imageUrl: string;
  name: string;
  price: number;
  sizes: [];
  types: [];
}

export type listType = {
  name: string;
  PropType: "rating" | "price" | "title";
};
