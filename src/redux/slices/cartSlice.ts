import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartPizza {
    id?: number;
    imageUrl: string;
    name: string;
    price: number;
    size: string;
    type: number;
    counter?: number;
}
interface itemState {
  items: CartPizza[];
}

const initialState: itemState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
      addItem(state, action: PayloadAction<CartPizza>) {
          const existingPizza = state.items.find(
              (pizza) =>
                  pizza.id === action.payload.id &&
                  pizza.type === action.payload.type &&
                  pizza.size === action.payload.size
          );

          if (existingPizza) {
              existingPizza.counter = (existingPizza.counter || 0) + 1;
          } else {
              state.items.push({ ...action.payload, counter: 1 });
          }
      },
      removeItem(state, action: PayloadAction<CartPizza>) {
          state.items = state.items.filter(
              (pizza) =>
                    !(pizza.id === action.payload.id &&
                      pizza.type === action.payload.type &&
                      pizza.size === action.payload.size)
          );
      },
      decreaseItem(state, action: PayloadAction<CartPizza>) {
          const existingPizzaIndex = state.items.findIndex(
              (pizza) =>
                  pizza.id === action.payload.id &&
                  pizza.type === action.payload.type &&
                  pizza.size === action.payload.size
          );

          if (existingPizzaIndex !== -1) {
              const existingPizza = state.items[existingPizzaIndex];
              if (existingPizza.counter && existingPizza.counter > 1) {
                  existingPizza.counter -= 1;
              } else {
                  state.items.splice(existingPizzaIndex, 1);
              }
          }
      },
      clearCart(state) {
          state.items = [];
      }
  },
});

export const { addItem, clearCart, decreaseItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
