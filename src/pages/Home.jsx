import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from "axios";
import qs from 'qs'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"

import Categories from "../component/Categories";
import Sort, {sortList} from "../component/Sort";
import Placeholder from "../component/PizzaBlock/Placeholder";
import PizzaBlock from "../component/PizzaBlock";
import Pagination from "../component/Pagination";
import {SearchContext} from "../App";
import {setCurrentPage, setFilters} from "../redux/slices/filterSlice";

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const {categoryId, sort, sortByTo, currentPage} = useSelector(state => state.filter)

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const {searchValue} = useContext(SearchContext)

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const fetchPizzas = () => {
    setLoading(true)
    const categoryIdURL = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortTypeURL = sort.sortProperty;
    const sortByToURL = sortByTo ? 'desc' : 'asc';
    const searchValueURL = searchValue !== '' ? `&search=${searchValue}` : '';

    axios
      .get(`https://64e767c8b0fd9648b78fe8b4.mockapi.io/items?limit=4&page=${currentPage}${categoryIdURL}&sortBy=${sortTypeURL}&order=${sortByToURL}${searchValueURL}`)
      .then(res => {
        setItems(res.data)
        setLoading(false)
      })
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
      fetchPizzas()
    }
    isSearch.current = false
    window.scrollTo(0, 0)
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
      <div className="content__items">
        {(loading ? skeletons : pizzas)}
      </div>
      <Pagination currentPage={currentPage} onChange={onChangePage}/>
    </div>
  );
}

export default Home;
