import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "../home";
import Home2 from "../home/home2";
import About from "../about";
import Post from "../post";

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
    </header>

    <main>
      {/* <Route exact path="/" component={Home} /> */}
      <Route exact path="/" component={Home2} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/:id" component={Post} />
    </main>
  </div>
);

export default App;
