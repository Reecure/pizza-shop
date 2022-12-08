export interface IPizza {
  id?: number;
  imageUrl: string;
  name: string;
  price: number;
  sizes: [];
  types: [];
}

export interface IFilter {
  category: string;
  activeSort: string;
}

export type listType = {
  name: string;
  PropType: "rating" | "price" | "title";
};
