import React, {useEffect, useState} from "react";
import './scss/app.scss';
import Header from "./component/Header";
import Categories from "./component/Categories";
import Sort from "./component/Sort";
import PizzaBlock from "./component/PizzaBlock";
import Placeholder from "./component/PizzaBlock/Placeholder";

function App() {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('https://rhgia6ncee.mockify.ru/api/items').then(res => {
      return res.json()
    }).then(json => {
      setItems(json.data)
      setLoading(false)
    })
  }, []);


  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
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
      </div>
    </div>
  );
}

export default App;
