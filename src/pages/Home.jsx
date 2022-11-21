import React, { useState, useEffect, useContext } from "react";
import ReactPaginate from "react-paginate";
import Skeleton from "../components/Pizza/Skeleton";
import axios from "axios";
import { setCategoryId } from "../redux/slices/filterSlice";
import { useSelector, useDispatch } from "react-redux";

import { Pizza } from "../components/Pizza";
import { Sort } from "../components/Sort";
import { Categories } from "../components/Categories";
import { Pagination } from "../components/Pagination.jsx";

import AppContext from "../context";

export const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);

  function onClickCategory(id) {
    dispatch(setCategoryId(id));
  }

  const { searchValue } = useContext(AppContext);
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
 
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setIsLoading(true);
    const order = sort.sortProperty.includes("-") ? "desc" : "asc";
    const replacing = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : " ";
    const search = searchValue ? `title=${searchValue}` : " ";

    async function fetchdata() {
      const PizzasData = await axios.get(
        `https://6375ff1eb5f0e1eb85ff4f3c.mockapi.io/Pizzas?page=${currentPage}&limit=4&${search}&${category}&sortBy=${replacing}&order=${order}`
      );
      setPizzaItems(PizzasData.data);
      setIsLoading(false);
    }
    fetchdata();
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = pizzaItems.map((obj) => <Pizza key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={onClickCategory}
        />
        <Sort value={sort} onClickSort={(index) => setSort(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
