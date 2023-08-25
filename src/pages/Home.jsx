import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {setCategoryId, setSortByTo, setSortType} from "../redux/slices/filterSlice";
import Categories from "../component/Categories";
import Sort from "../component/Sort";
import Placeholder from "../component/PizzaBlock/Placeholder";
import PizzaBlock from "../component/PizzaBlock";
import Pagination from "../component/Pagination";
import {SearchContext} from "../App";

function Home() {
  const dispatch = useDispatch()
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sort)
  const sortByTo = useSelector(state => state.filter.sortByTo)

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const {searchValue} = useContext(SearchContext)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onchangeSort = (item) => {
    dispatch(setSortType(item))
  }

  const onChangeSortByTo = (item) => {
    dispatch(setSortByTo(item))
  }


  useEffect(() => {
    setLoading(true)
    fetch(`https://64e767c8b0fd9648b78fe8b4.mockapi.io/items?limit=4&page=${currentPage}${categoryId > 0 ? `&category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=${sortByTo ? 'desc' : 'asc'}${searchValue !== '' ? `&search=${searchValue}` : ''}`)
      .then(res => {
        return res.json()
      }).then(json => {
      setItems(json)
      setLoading(false)
    })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, sortByTo, searchValue, currentPage]);

  const pizzas = (items.map((item) => (<PizzaBlock key={item.id} {...item} />)))
  const skeletons = ([...new Array(10)].map((_, index) => <Placeholder key={index}/>))

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort value={sortType} onchangeSort={onchangeSort} sortByTo={sortByTo}
              onChangeSortByTo={onChangeSortByTo}/>
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
