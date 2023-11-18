import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IPizza, listType } from "../../types/types";

type fetchPizzaState = {
    category: string;
    activeSort: listType;
};

export const fetchPizzas = createAsyncThunk<IPizza[], fetchPizzaState>(
    "pizza/fetchPizza",
    async (params) => {
        const { category, activeSort } = params;
        const data = await axios.get(
            `https://6543de5401b5e279de21140c.mockapi.io/pizzas?${category}&sortBy=${activeSort.PropType}&order=desc`
        );
        return data.data;
    }
);

type pizzaState = {
    pizzas: IPizza[];
    status: "loading" | "error" | "success";
};

const initialState: pizzaState = {
    pizzas: [],
    status: "loading",
};

const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<IPizza[]>) {
            state.pizzas = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.pizzas = [];
                state.status = "loading";
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.pizzas = action.payload;
                state.status = "success";
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.pizzas = [];
                state.status = "error";
            });
    },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
