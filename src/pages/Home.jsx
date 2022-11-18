import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pizza } from "../components/Pizza";
import { Sort } from "../components/Sort";
import { Categories } from "../components/Categories";
import Skeleton from "../components/Pizza/Skeleton";
export const Home = () => {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchdata() {
      const PizzasData = await axios.get(
        "https://6375ff1eb5f0e1eb85ff4f3c.mockapi.io/Pizzas"
      );
      setPizzaItems(PizzasData.data);
      setIsLoading(false)
    }
    fetchdata();
    window.scrollTo(0,0)
  }, []);
  return (
    <div className="container">
      <div className="content__top">
    
        <Categories /> <Sort />
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
