import React, { useEffect } from "react";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { IPizza } from "../types/types";

export const Home = () => {
  const searchValue = useSelector((state) => state.search.searchValue);
  const { categoryId, activeSort } = useSelector((state) => state.filter);
  const { status, pizzas } = useSelector((state) => state.pizza);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const category = categoryId > 0 ? `category=${categoryId}` : "";

  useEffect(() => {
    dispatch(fetchPizzas({ category, activeSort }));
    const queryString = qs.stringify({
      activeSort: activeSort.PropType,
      categoryId,
    });
    navigate(`?${queryString}`);
  }, [activeSort, categoryId, category]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {status === "loading" ? (
            <div>Loading</div>
          ) : (
            pizzas
              .filter((item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((pizza) => {
                return <PizzaBlock key={pizza.id} {...pizza} />;
              })
          )}
        </div>
      </div>
    </>
  );
};
