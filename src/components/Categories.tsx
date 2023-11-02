//import styles from "./Categories.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

function Categories() {
  const activeCategory = useSelector(
    (state: RootState) => state.filter.categoryId
  );
  const dispatch = useDispatch();

  const mock: string[] = [
      "All",
      "Meat",
      "Vegetarian",
      "Grilled",
      "Spicy",
      "Closed"
  ];

  const categoryHandler = (index: number) => {
    dispatch(setActiveCategory(index));
  };

  return (
    <div className="categories">
      <ul>
        {mock.map((item, i) => {
          return (
            <li
              key={i}
              onClick={() => categoryHandler(i)}
              className={activeCategory === i ? "active" : ""}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
