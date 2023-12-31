import React, {useCallback, useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"

import Categories from "../component/Categories";
import Sort from "../component/Sort";
import Placeholder from "../component/PizzaBlock/Placeholder";
import PizzaBlock from "../component/PizzaBlock";
import Pagination from "../component/Pagination";
import {setCategoryId, setCurrentPage} from "../redux/filter/slice"
import {selectFilter} from "../redux/filter/selectors";
import {fetchPizzas} from "../redux/pizza/asyncAction";
import {selectPizzaData} from "../redux/pizza/selectors";
import {useAppDispatch} from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const {items, status} = useSelector(selectPizzaData)
  const {categoryId, sort, sortByTo, currentPage, searchValue} = useSelector(selectFilter)

  const onChangeCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index))
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }


  const getPizzas = async () => {
    const categoryIdURL = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortTypeURL = sort.sortProperty;
    const sortByToURL = sortByTo ? 'desc' : 'asc';
    const searchValueURL = searchValue !== '' ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        categoryIdURL,
        sortTypeURL,
        sortByToURL,
        searchValueURL,
        currentPage: String(currentPage)
      })
    )

    window.scrollTo(0, 0)
  }

  useEffect(() => {
    getPizzas()
  }, [categoryId, sort.sortProperty, sortByTo, searchValue, currentPage]);

  const pizzas = (items.map((item: any) => (<PizzaBlock {...item} key={item.id}/>)))
  const skeletons = ([...new Array(10)].map((_, index) => <Placeholder key={index}/>))

  return (
    <div className="container">
      <div className="content__top">
        <Categories onChangeCategory={onChangeCategory} value={categoryId}/>
        <Sort sort={sort} />
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
