import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/Pizza/Skeleton";

import qs from "qs";

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchPizza, selectPizzaProperties } from "../redux/slices/pizzaSlice";

import { NotFound } from "../pages/NotFound"
import { Pizza } from "../components/Pizza";
import { Sort, sorts } from "../components/Sort";
import { Categories } from "../components/Categories";
import { Pagination } from "../components/Pagination.jsx";



export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const { status, items } = useSelector(selectPizzaProperties);
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    selectFilter
  );
  console.log(searchValue + 'sыыd')
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
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

    async function pizzaFetch() {
      setIsLoading(true);
      const order = sort.sortProperty.includes("-") ? "desc" : "asc";
      const replacing = sort.sortProperty.replace("-", "");
      const category = categoryId.categoryId > 0 ? `category=${categoryId}` : " ";
      const search = searchValue ? `title=${searchValue}` : " ";

      dispatch(fetchPizza({
        order, replacing, category, search, currentPage
      }));


    } pizzaFetch()
    isSearch.current = false
  }, [searchValue]);


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

 
  const pizzas = items.map((obj) => <Pizza {...obj} />);
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
      {status === 'error' ? <NotFound /> : (<div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>)}

      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </div>
  );
};
