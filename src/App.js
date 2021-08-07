import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Product from "./Components/ProductPage/Product";
import About from "./Components/AboutPage/About";
import Try from "./try";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Product} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/about" component={About} />
        <Route exact path="/try" component={Try} />
      </Switch>
    </Router>
  );
}

export default App;
