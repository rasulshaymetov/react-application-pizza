import React from "react";

export const Categories = ({ value, onClickCategory }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={`${value === index ? "active" : null}`}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
