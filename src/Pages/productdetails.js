import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Carousel } from "react-bootstrap";
import {
  changeWishlistAction,
  deleteFromWishlistAction,
} from "../Store/Actions/changeWishlistAction.js";
import { Button, Form, Alert } from "react-bootstrap";
import { changeCartAction } from "../Store/Actions/changeCartAction";
import ReactStars from "react-rating-stars-component";

function ProductDetails() {
  const param = useParams();
  const id = param.id;
  const [product, setProduct] = useState({});

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };
  const [quantity, setQuantity] = useState(1);
  const [addToCartClicked, setAddToCartClicked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  const [mainImage, setMainImage] = useState(product.thumbnail);

  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  const changeCartlist = () => {
    if (isLoggedIn) {
      dispatch(changeCartAction(product.id, parseInt(quantity)));
      setShowSuccess(true);
      setAddToCartClicked(true);
    } else {
      history.push("/login");
    }
  };

  const myWishlist = useSelector((state) => state.wishlistR.cartItems);
  const wishlistDispatch = useDispatch();

  const changeWishlist = (id) => {
    wishlistDispatch(changeWishlistAction(id));
  };

  const deleteFromWishlist = (id) => {
    dispatch(deleteFromWishlistAction(id));
  };

  return (
    <div className="container mt-5 py-4 px-xl-5 mt-5">
      {product && Object.keys(product).length > 0 && (
        <div className="row mb-4">
          <div className="col-lg-6">
            <Carousel>
              {product.images.map((image, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`Slide ${idx}`}
                    width="450"
                    height="500"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="row mt-2">
              <div className="col-12">
                <div className="d-flex flex-nowrap">
                  {product.images.slice(1).map((image, idx) => (
                    <a
                      key={idx}
                      className="me-2"
                      onClick={() => handleThumbnailClick(image)}
                    >
                      <img
                        onClick={() => handleThumbnailClick(image)}
                        className="cover rounded mb-2"
                        width="70"
                        height="70"
                        alt={`Thumbnail ${idx}`}
                        src={image}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mt-5">
            <div className="d-flex flex-column h-100 mb-5">
              <h2 className="mb-4">{product.title}</h2>
              <ReactStars
                count={5}
                value={product.rating}
                size={24}
                activeColor="#ffd700"
                isHalf={true}
                edit={false}
              />
              <dd className="col-sm-8">
                <div
                  className="d-flex align-items-center mb-4"
                  style={{ fontSize: "1.2rem" }}
                >
                  <del className="text-dark me-2">${product.price}</del>
                  <span className="text-muted me-2">
                    $
                    {product.price -
                      (product.price * product.discountPercentage) / 100}
                  </span>
                  <span className="text-danger">
                    ({product.discountPercentage}% off)
                  </span>
                </div>
              </dd>

              <div className="row g-3 mb-4 align-items-center mt-4 mb-4">
                
                  <div className="col">
                    <Form.Control
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-dark w-100 mt-2"
                      onClick={changeCartlist}
                    >
                      Add to Cart
                    </button>
                </div>

                <div className="col">
                  {myWishlist.includes(product.id) ? (
                    <span
                      onClick={() => deleteFromWishlist(product.id)}
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
                      onClick={() => changeWishlist(product.id)}
                      style={{ fontSize: "1.5rem", cursor: "pointer" }}
                    >
                      &#x1F90D;
                    </span>
                  )}
                </div>
              </div>
              <h4 className="mb-0 mt-5">Details</h4>
              <hr />
              <dl className="row">
                <dt className="col-sm-4">Category</dt>
                <dd className="col-sm-8">
                  <p className="lead">{product.category}</p>
                </dd>
                <dt className="col-sm-4">Brand</dt>
                <dd className="col-sm-8">
                  <p className="lead">{product.brand}</p>
                </dd>
                <dt className="col-sm-4">Stock</dt>
                <dd className="col-sm-8">
                  <p className="lead">{product.stock}</p>
                </dd>
                <dt className="col-sm-4">Description</dt>
                <dd className="col-sm-8">
                  <p className="lead">{product.description}</p>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
