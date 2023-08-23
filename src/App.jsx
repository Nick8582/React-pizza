import React, {useEffect, useState} from "react";
import './scss/app.scss';
import Header from "./component/Header";
import Categories from "./component/Categories";
import Sort from "./component/Sort";
import PizzaBlock from "./component/PizzaBlock";

function App() {

  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('https://rhgia6ncee.mockify.ru/api/items').then(res => {
      res.json()
    }).then(json => {
      setItems(json.data)
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
            {items.map((item) => (
              <PizzaBlock key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
