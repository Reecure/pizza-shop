//import styles from "./Categories.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../redux/slices/filterSlice";

function Categories() {
  const activeCategory = useSelector((state: any) => state.filter.categoryId);
  const dispatch = useDispatch();

  const mock = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
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
