import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePages from "./pages/HomePages";
import ProductDetails from "./pages/ProductDetails";
import UserList from "./pages/UserList";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/product" replace />} />
            <Route default path="product" element={<HomePages />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
