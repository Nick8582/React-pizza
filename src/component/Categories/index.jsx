import {setCategoryId} from "../../redux/slices/filterSlice";
import {useDispatch, useSelector} from "react-redux";

function Categories() {
  const categories = [
    'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'
  ]
  const dispatch = useDispatch()
  const categoryId = useSelector(state => state.filter.categoryId)

  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index))
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            onClick={() => onChangeCategory(index)}
            className={categoryId === index ? 'active' : ''}
            key={index}>{categoryName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
