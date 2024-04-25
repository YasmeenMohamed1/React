import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { changeLanguageAction } from "../Store/Actions/changeLangAction";
// import { changeThemAction } from "../Store/Actions/changeThemeAction";
// import { changeWishlistAction } from "../Store/Actions/changeWishlistAction";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";
import {
  faUserAlt,
  faShoppingCart,
  faCog,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faUserAlt, faShoppingCart, faCog, faHeart);

function Navbar() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [openedDrawer, setOpenedDrawer] = useState(false);

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }

  // const changeLanguage = () => {
  //   dispatch(changeLanguageAction(myLanguage === "En" ? "Ar" : "En"));
  // };

  // const myTheme = useSelector((state) => state.themeR.theme);
  // const changeTheme = () => {
  //   dispatch(changeThemAction(myTheme === "Light" ? "Dark" : "Light"));
  // };

  const myWishlist = useSelector((state) => state.wishlistR.cartItems);
  const myCart = useSelector((state) => state.myCartR.cartListItems);
  const totalQuantity = myCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom mb-5">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span className="ms-2 h5">Shop</span>
        </Link>

        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Explore
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">
                Sign Up
              </Link>
            </li>
          </ul>

          <div className="d-lg-none"> 
            <Link to="/favourits" className="btn me-3 btn-outline-danger">
              <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
              <span className="ms-2 badge rounded-pill bg-danger">{myWishlist.length}</span>
            </Link>

            <Link to="/carts" className="btn btn-outline-dark me-3">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="ms-2 badge rounded-pill bg-dark">{totalQuantity}</span>
            </Link>
          </div>
        </div>

        <div className="d-none d-lg-flex"> 
          <Link to="/favourits" className="btn me-3 btn-outline-danger">
            <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
            <span className="ms-2 badge rounded-pill bg-danger">{myWishlist.length}</span>
          </Link>

          <Link to="/carts" className="btn btn-outline-dark me-3">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="ms-2 badge rounded-pill bg-dark">{totalQuantity}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
