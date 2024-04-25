import logo from "./logo.svg";
import "./App.css";
import LoginDetails from "./Pages/login";
import RegisterDetails from "./Pages/register";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Pages/home";
import Navbar from "./Components/navbar";
import Footer from "./Components/Footer";
import NotFound from "./Pages/notfound";
import Products from "./Pages/product";
import ProductDetails from "./Pages/productdetails";
import { useSelector } from "react-redux";
import Favorites from "./Pages/favorits";
import Carts from "./Pages/carts";

function App() {
 

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Products} path="/products" exact />
          <Route component={LoginDetails} path="/login" exact />
          <Route component={RegisterDetails} path="/register" exact />
          <Route component={ProductDetails} path="/productDetails/:id" exact />
          <Route component={Favorites} path="/favourits" exact />
          <Route component={Carts} path="/carts" exact />
          <Route component={NotFound} path="*" />
        </Switch> 
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
