import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { increment, decrement } from "./redux/slices/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "./components/Header";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { useContext } from "react";
import AppContext from "./context";
function App() {
  const [searchValue, setSearchValue] = useState("");
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
    
    <AppContext.Provider
    value={{
      searchValue,
      setSearchValue,
      
    }}>   <div className="wrapper">
        <Header />

        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div></AppContext.Provider>
    </div>
  );
}

export default App;
