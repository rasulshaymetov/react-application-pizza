import React, { useState, useEffect } from "react";
import { Categories } from "./components/Categories";
import { Header } from "./components/Header";
import { Pizza } from "./components/Pizza";
import Skeleton from "./components/Pizza/Skeleton";
import axios from "axios";
import ContentLoader from "react-content-loader";

function App() {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchdata() {
      const PizzasData = await axios.get(
        "https://6375ff1eb5f0e1eb85ff4f3c.mockapi.io/Pizzas"
      );
      setPizzaItems(PizzasData.data);
    }
    fetchdata();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <div className="App">
      <div className="wrapper">
        <Header />

        <Categories />

        <div className="content">
          <div className="container">
            <div className="content__top"></div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {isLoading
                ? [...new Array(6)].map((_,index) => <Skeleton key={index} />)
                : pizzaItems.map((obj) => <Pizza key={obj.id} {...obj} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
