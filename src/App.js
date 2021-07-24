import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Product from "./Components/ProductPage/Product";
import About from "./Components/AboutPage/About";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Product} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App;
