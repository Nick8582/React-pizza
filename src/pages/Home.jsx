import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";

import Categories from "../component/Categories";
import Sort from "../component/Sort";
import Placeholder from "../component/PizzaBlock/Placeholder";
import PizzaBlock from "../component/PizzaBlock";
import Pagination from "../component/Pagination";
import {SearchContext} from "../App";

function Home() {
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sort)
  const sortByTo = useSelector(state => state.filter.sortByTo)

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const {searchValue} = useContext(SearchContext)

  useEffect(() => {
    setLoading(true)
    const categoryIdURL = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortTypeURL = sortType.sortProperty;
    const sortByToURL = sortByTo ? 'desc' : 'asc';
    const searchValueURL = searchValue !== '' ? `&search=${searchValue}` : '';

    axios
      .get(`https://64e767c8b0fd9648b78fe8b4.mockapi.io/items?limit=4&page=${currentPage}${categoryIdURL}&sortBy=${sortTypeURL}&order=${sortByToURL}${searchValueURL}`)
      .then(res => {
        setItems(res.data)
        setLoading(false)
      })

    window.scrollTo(0, 0)
  }, [categoryId, sortType, sortByTo, searchValue, currentPage]);

  const pizzas = (items.map((item) => (<PizzaBlock key={item.id} {...item} />)))
  const skeletons = ([...new Array(10)].map((_, index) => <Placeholder key={index}/>))

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {(loading ? skeletons : pizzas)}
      </div>
      <Pagination onChange={number => setCurrentPage(number)}/>
    </div>
  );
}

export default Home;
