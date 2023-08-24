function Categories({value, onChangeCategory}) {

  const categories = [
    'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'
  ]

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}
            key={index}>{categoryName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
