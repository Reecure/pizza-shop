import React, { useEffect } from "react";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { IPizza } from "../types/types";
import { RootState } from "../redux/store";

export const Home = () => {
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const { categoryId, activeSort } = useSelector(
    (state: RootState) => state.filter
  );

  const { status, pizzas } = useSelector((state: RootState) => state.pizza);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const category = categoryId > 0 ? `category=${categoryId}` : "";

  useEffect(() => {
      const fetchData = async () => {
          try {
              //@ts-ignore
              await dispatch(fetchPizzas({ category, activeSort }));
              const queryString = qs.stringify({
                  activeSort: activeSort.PropType,
                  categoryId,
              });
              navigate(`?${queryString}`);
          } catch (error) {
              console.error("Error fetching pizzas:", error);
          }
      };
      fetchData();
  }, [activeSort, categoryId, category]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">All pizzas</h2>
        <div className="content__items">
          {status === "loading" ? (
            <div>Loading...</div>
          ) : (
            pizzas
              .filter((item: IPizza) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((pizza: IPizza) => {
                return <PizzaBlock key={pizza.id} {...pizza} />;
              })
          )}
        </div>
      </div>
    </>
  );
};
