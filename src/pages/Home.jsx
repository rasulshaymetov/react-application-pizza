import React, { useState, useEffect, useContext, useRef } from "react";

import { useNavigate } from "react-router-dom";
import Skeleton from "../components/Pizza/Skeleton";
import axios from "axios";
import qs from "qs";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { useSelector, useDispatch } from "react-redux";

import { Pizza } from "../components/Pizza";
import { Sort, sorts } from "../components/Sort";
import { Categories } from "../components/Categories";
import { Pagination } from "../components/Pagination.jsx";

import AppContext from "../context";

export const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  function onClickCategory(id) {
    dispatch(setCategoryId(id));
  }
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);
  const { searchValue } = useContext(AppContext);
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      pizzaFetch()
    }
    async function pizzaFetch() {
      setIsLoading(true);
      const order = sort.sortProperty.includes("-") ? "desc" : "asc";
      const replacing = sort.sortProperty.replace("-", "");
      const category = categoryId.categoryId > 0 ? `category=${categoryId}` : " ";
      const search = searchValue ? `title=${searchValue}` : " ";

      const PizzasData = await axios.get(
        `https://6375ff1eb5f0e1eb85ff4f3c.mockapi.io/Pizzas?page=${currentPage}&limit=4&${search}&${category}&sortBy=${replacing}&order=${order}`
      );

      setPizzaItems(PizzasData.data);
      setIsLoading(false);
    }


    isSearch.current = false
  }, [categoryId, sort, searchValue, currentPage]);


  React.useEffect(() => {

    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sorts.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          sort,
          ...params,
          
        }),
      );
      isSearch.current = true
    }
  }, []);


  const pizzas = pizzaItems.map((obj) => <Pizza key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </div>
  );
};
