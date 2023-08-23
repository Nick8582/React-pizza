import React from "react";
import {Route, Routes} from "react-router-dom";

import './scss/app.scss';

import Header from "./component/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <Routes>
            <Route  path="/" element={<Home/>} />
            <Route  path="/cart" element={<Cart />} />
            <Route  path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
