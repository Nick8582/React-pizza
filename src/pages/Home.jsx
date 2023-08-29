import React, {useContext, useEffect, useRef, useState} from 'react';
import qs from 'qs'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"

import Categories from "../component/Categories";
import Sort, {sortList} from "../component/Sort";
import Placeholder from "../component/PizzaBlock/Placeholder";
import PizzaBlock from "../component/PizzaBlock";
import Pagination from "../component/Pagination";
import {SearchContext} from "../App";
import {setCurrentPage, setFilters} from "../redux/slices/filterSlice"
import {fetchPizzas} from "../redux/slices/pizzaSlice";

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const {items, status} = useSelector(state => state.pizza)
  const {categoryId, sort, sortByTo, currentPage} = useSelector(state => state.filter)

  const {searchValue} = useContext(SearchContext)

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const getPizzas = async () => {

    const categoryIdURL = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortTypeURL = sort.sortProperty;
    const sortByToURL = sortByTo ? 'desc' : 'asc';
    const searchValueURL = searchValue !== '' ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({categoryIdURL, sortTypeURL, sortByToURL, searchValueURL, currentPage}))

    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        currentPage,
        sortProperty: sort.sortProperty,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
      dispatch(
        setFilters({
          ...params,
          sort
        })
      )
      isSearch.current = true
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
  }, [categoryId, sort, sortByTo, searchValue, currentPage]);


  const pizzas = (items.map((item) => (<PizzaBlock key={item.id} {...item} />)))
  const skeletons = ([...new Array(10)].map((_, index) => <Placeholder key={index}/>))

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ?
        (<div className="content__error-info">
          <h2>Произошла ошибка <span>😕</span></h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже
          </p>
        </div>) :
        (<div className="content__items">
          {(status === 'loading' ? skeletons : pizzas)}
        </div>)}

      <Pagination currentPage={currentPage} onChange={onChangePage}/>
    </div>
  );
}

export default Home;
