import React, { useEffect, useState } from "react";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

export const Home = () => {
  const searchValue = useSelector((state) => state.search.searchValue);

  const navigate = useNavigate();

  const { categoryId, activeSort } = useSelector((state) => state.filter);
  const category = categoryId > 0 ? `category=${categoryId}` : "";

  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPizzas = async () => {
    try {
      const data = await axios.get(
        `https://637a7c2b10a6f23f7f94e973.mockapi.io/item?${category}&sortBy=${activeSort.PropType}&order=asc`
      );
      if (data.status === 200) {
        setPizzas(data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPizzas();
    console.log(pizzas);
    const queryString = qs.stringify({
      activeSort: activeSort.PropType,
      categoryId,
    });
    navigate(`?${queryString}`);
  }, [activeSort, categoryId, category, loading]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {loading ? (
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
