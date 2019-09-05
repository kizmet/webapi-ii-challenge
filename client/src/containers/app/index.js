import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "../home";
import Post from "../post";

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/:id" component={Post} />
    </main>
  </div>
);

export default App;
