import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Card} from "react-bootstrap";
import { Link } from "react-router-dom";
import Banner from "../landing/Banner.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { changeWishlistAction ,deleteFromWishlistAction} from "../Store/Actions/changeWishlistAction.js";
library.add(faFacebook, faInstagram, faTwitter);

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=3")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, [searchQuery, currentPage]);

  const myWishlist = useSelector((state) => state.wishlistR.cartItems);
  const wishlistDispatch = useDispatch();

  const changeWishlist = (id) => {
    wishlistDispatch(changeWishlistAction(id));
  };
  const dispatch = useDispatch();
  const deleteFromWishlist = (id) => {
    dispatch(deleteFromWishlistAction(id));
  };

  return (
    <>
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <div className="d-flex justify-content-center">
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-5">New Arrival</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row">
          {products.map((v, i) => (
            <div key={i} className="col-md-4 d-flex mb-4 mx-auto">
              <Card
                className="mt-3"
                style={{ width: "20rem", height: "20rem" }}
              >
                <div className="position-relative">
                  {myWishlist.includes(v.id) ? (
                    <span
                      className="position-absolute top-0 end-0"
                      onClick={() => deleteFromWishlist(v.id)}
                      style={{
                        fontSize: "2.7rem",
                        color: "red",
                        cursor: "pointer",
                      }}
                    >
                      &hearts;
                    </span>
                  ) : (
                    <span
                      className="position-absolute top-0 end-0"
                      onClick={() => changeWishlist(v.id)}
                      style={{ fontSize: "1.5rem", cursor: "pointer" }}
                    >
                      &#x1F90D;
                    </span>
                  )}
                </div>
                <Card.Img
                  variant="top"
                  src={v.images[1]}
                  style={{ width: "100%", height: "50%" }}
                />
                <Card.Body>
                  <Card.Title
                    className="mb-3"
                    style={{
                      color: "black",
                      cursor: "pointer",
                      ":hover": {
                        color: "red",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Link
                      to={`/productDetails/${v.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {v.title}
                    </Link>
                  </Card.Title>
                  <ReactStars
                    count={5}
                    value={v.rating}
                    size={24}
                    activeColor="#ffd700"
                    isHalf={true}
                    edit={false}
                  />
                  <Card.Text>
                    <del
                      className="text-muted me-2"
                      style={{ fontSize: "1.2rem" }}
                    >
                      ${v.price}
                    </del>
                    <span
                      className="text-dark me-2"
                      style={{ fontSize: "1.2rem" }}
                    >
                      ${v.price - (v.price * v.discountPercentage) / 100}
                    </span>
                    <span
                      className="text-danger"
                      style={{ fontSize: "1.2rem" }}
                    >
                      ({v.discountPercentage}% off)
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="#" className="me-3 text-dark">
            <FontAwesomeIcon icon={faFacebook} size="3x" />
          </a>
          <a href="#" className="text-dark">
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </a>
          <a href="#" className="ms-3 text-dark">
            <FontAwesomeIcon icon={faTwitter} size="3x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
