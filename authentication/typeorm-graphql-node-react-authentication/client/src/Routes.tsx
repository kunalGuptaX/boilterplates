import React from "react";
import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthenticatedRoute from "./pages/AuthenticatedRoute";
import Header from "./Header";

export function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/authenticated-route" element={<AuthenticatedRoute />} />
      </Switch>
    </BrowserRouter>
  );
}
