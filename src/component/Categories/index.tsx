import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC<CategoriesProps> = ({value, onChangeCategory}) => {

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
