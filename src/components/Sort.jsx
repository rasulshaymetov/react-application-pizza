import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";
export const sorts = [
  { name: "популярности (по возрастанию)", sortProperty: "rating" , id: 1},
  { name: "популярности (по убыванию)", sortProperty: "-rating", id: 2 },
  { name: "цене (по возрастанию)", sortProperty: "price", id: 3 },
  { name: "цене (по убыванию)", sortProperty: "-price", id: 4 },
  { name: "алфавиту (по возрастанию)", sortProperty: "title" , id: 5},
  { name: "алфавиту (по убыванию)", sortProperty: "-title" , id: 6},
];
export const Sort = () => {
  const dispatch = useDispatch();
  const sortName = useSelector((state) => state.filter.sort.name);
  const [isActive, setIsActive] = React.useState(false);
  function showPopup() {
    setIsActive((prev) => !prev);
  }
  function selectSort(obj) {
    dispatch(setSort(obj))
    setIsActive(false);
  }
  const sortRef = React.useRef()
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (!event.path.includes(sortRef.current)) {
          setIsActive(false)
          console.log('Click outside')
        }
  
      
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])


  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={`${isActive ? "opened" : ""}`}
          style={{ cursor: "pointer" }}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={showPopup}>{sortName}</span>
      </div>
      {isActive && (
        <div className="sort__popup">
          <ul>
            {sorts.map((sort, i) => (
              <li
                key={sort.id}
                className={`${sort.sortProperty === '' ? "active" : null
                  }`}
                onClick={() => selectSort(sort)}
                name={sort.name }
              >
                {sort.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
