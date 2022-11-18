import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pizza } from "../components/Pizza";
import { Sort } from "../components/Sort";
import { Categories } from "../components/Categories";
import Skeleton from "../components/Pizza/Skeleton";
export const Home = () => {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [categoryId, setCategoryId] = React.useState(0);

  useEffect(() => {
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc'
    const replacing = sort.sortProperty.replace('-','')
    const category = categoryId > 0 ? `category=${categoryId}` : " "
    setIsLoading(true);
    async function fetchdata() {
      const PizzasData = await axios.get(
        `https://6375ff1eb5f0e1eb85ff4f3c.mockapi.io/Pizzas?${
          category
        }&sortBy=${replacing}&order=${order}`
      );
      setPizzaItems(PizzasData.data);
      setIsLoading(false);
    }
    fetchdata();
    window.scrollTo(0, 0);
  }, [categoryId, sort]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(index) => setCategoryId(index)}
        />
        <Sort value={sort} onClickSort={(index) => setSort(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzaItems.map((obj) => <Pizza key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};
