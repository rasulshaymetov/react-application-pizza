import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />

        <div className="content">
          <div className="container">
      
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="*" element={<NotFound/>} />
              </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
