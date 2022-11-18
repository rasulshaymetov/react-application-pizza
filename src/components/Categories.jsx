import React from "react";
import { Sort } from "./Sort";
export const Categories = () => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const [isActive, setIsActive] = React.useState(0);
  const selectCategory = (index) => {
    setIsActive(index);
  };
  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => {
          return (
            <li
              key={index}
              onClick={() => selectCategory(index)}
              className={`${isActive === index ? "active" : null  }`}
            >
              {value}
            </li>
          );
        })}
        
      </ul>
    </div>
  );
};
