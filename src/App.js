import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import React, { Component } from "react";
import PlaceOrder from "./components/PlaceOrder";
import StatusOfIngredients from "./components/StatusOfIngredients";
import FillIngredients from "./components/FillIngredients";
import ProfitLoss from "./components/ProfitLoss";
import Header from "./components/Header";

export default class App extends Component {
  componentDidMount() {
    const storeIngridients = {
      coffee_powder: "0",
      water: "0",
      milk: "0",
      sugar: "0",
      tea: "0",
    };
    localStorage.setItem("storeIngredients", JSON.stringify(storeIngridients));
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/status" element={<StatusOfIngredients />} />
          <Route path="/fill" element={<FillIngredients />} />{" "}
          <Route path="/profit" element={<ProfitLoss />} />
        </Routes>
      </div>
    );
  }
}
