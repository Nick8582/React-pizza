import React, {useEffect, useState} from 'react';
import Categories from "../component/Categories";
import Sort from "../component/Sort";
import Placeholder from "../component/PizzaBlock/Placeholder";
import PizzaBlock from "../component/PizzaBlock";

function Home(props) {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('https://rhgia6ncee.mockify.ru/api/items').then(res => {
      return res.json()
    }).then(json => {
      setItems(json.data)
      setLoading(false)
    })
    window.scrollTo(0, 0)
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
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
