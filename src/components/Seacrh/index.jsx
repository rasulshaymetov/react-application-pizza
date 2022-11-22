import React from "react";
import debounce from "lodash.debounce";
import styles from "../Seacrh/Search.module.scss";

export const Search = ({ setSearchValue }) => {
  const [value, setValue] = React.useState('')
  const onChangeInput = event => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    []
  );

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
  };
  return (
    <div className={styles.root}>
      <input
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы..."
      />
      <svg
        className={styles.icon}
        onClick={onClickClear}
        height="48"
        viewBox="0 0 48 48"
        width="48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
        <path d="M0 0h48v48H0z" fill="none" />
      </svg>
    </div>
  );
};
