import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function FullPizza() {
  const [pizza, setPizza] = useState()
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get('https://64e767c8b0fd9648b78fe8b4.mockapi.io/items/' + id)
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пиццы')
        navigate('/')
      }
    }
    fetchPizza()
  }, []);

  if(!pizza) {
    return 'Загрузка...'
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt=""/>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
}

export default FullPizza;