// This is the Main Functional Component
import React from "react";
import "./Styles/App.css";

// Import BrowserRouter to wrap the app with, and Route to different components
import { BrowserRouter, Route } from "react-router-dom";

// Context Provider to wrap all the app with
import ContextProvider from "./context/context";

// Import Components
import Header from "./components/shared/Header";
import Login from "./components/shared/Login";
import Register from "./components/shared/Register";
import Home from "./components/shared/Home";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Header />

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
