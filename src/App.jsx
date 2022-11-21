import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

import AppContext from "./context";
function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          searchValue,
          setSearchValue,
        }}
      >
        {" "}
        <div className="wrapper">
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
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
