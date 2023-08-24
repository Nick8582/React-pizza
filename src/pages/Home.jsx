import React, {useEffect, useState} from 'react';
import Categories from "../component/Categories";
import Sort from "../component/Sort";
import Placeholder from "../component/PizzaBlock/Placeholder";
import PizzaBlock from "../component/PizzaBlock";

function Home(props) {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({name: 'популярности', sortProperty: 'rating'},)
  const [sortByTo, setSortByTo] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`https://64e767c8b0fd9648b78fe8b4.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=${sortByTo ? 'desc' : 'asc'}`).then(res => {
      return res.json()
    }).then(json => {
      setItems(json)
      setLoading(false)
    })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, sortByTo]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)}/>
        <Sort value={sortType} onchangeSort={(i) => setSortType(i)} sortByTo={sortByTo}
              onChangeSortByTo={(i) => setSortByTo(i)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {(loading
            ? ([...new Array(10)].map((_, index) => <Placeholder key={index}/>))
            : (items.map((item) => (<PizzaBlock key={item.id} {...item} />)))
        )}
      </div>
    </div>
  );
}

export default Home;
