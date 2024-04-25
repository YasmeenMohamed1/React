import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Card} from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  changeWishlistAction,
  deleteFromWishlistAction,
} from "../Store/Actions/changeWishlistAction.js";
import { changeCartAction } from "../Store/Actions/changeCartAction.js";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ReactStars from "react-rating-stars-component";

function Products() {
  const [products, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [isMinPriceCleared, setIsMinPriceCleared] = useState(false);
  const [isMaxPriceCleared, setIsMaxPriceCleared] = useState(false);

  const handleNextClick = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePrevClick = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
 

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleMinPriceChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      setIsMinPriceCleared(true);
      setMinPrice(0);
    } else {
      setIsMinPriceCleared(false);
      setMinPrice(parseFloat(value));
    }
  };

  const handleMaxPriceChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      setIsMaxPriceCleared(true);
      setMaxPrice(0);
    } else {
      setIsMaxPriceCleared(false);
      setMaxPrice(parseFloat(value));
    }
  };

//   useEffect(()=>{
//    
//     console.log(limit,skip);
//     axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip})`
//     .then(res =>{ 
//         setMovies(res.data.products)

//         setTotalItems(res.data.total)
//     })
//     .catch(err => console.log(err))

// },[limit,skip])
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/search?q=${searchQuery}`)
      .then((res) => {
        let filteredProducts = res.data.products;

        const categories = filteredProducts.map((product) => product.category);
        const uniqueCategories = [...new Set(categories)];
        setCategories(uniqueCategories);
        if (selectedCategories.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            selectedCategories.includes(product.category)
          );
        }
        if (minPrice !== 0 || maxPrice !== 0) {
          filteredProducts = filteredProducts.filter(
            (product) => product.price >= minPrice && product.price <= maxPrice
          );
        }
        setMovies(filteredProducts);

        const totalPagesCount = Math.ceil(filteredProducts.length / 30);
        setTotalPages(totalPagesCount);
      })
      .catch((err) => console.log(err));
  }, [currentPage, searchQuery, selectedCategories, minPrice, maxPrice]);

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const myWishlist = useSelector((state) => state.wishlistR.cartItems);
  const wishlistDispatch = useDispatch();

  const changeWishlist = (id) => {
    wishlistDispatch(changeWishlistAction(id));
  };
  const dispatch = useDispatch();
  const deleteFromWishlist = (id) => {
    dispatch(deleteFromWishlistAction(id));
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const [limit, setLimit] = useState(16);
  const [skip, setSkip] = useState(0);

const handlePageChange = (page) => {
      const newSkip = (page - 1) * limit;
      setSkip(newSkip);
      setCurrentPage(page);
    };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-3 mt-5">
          <ul className="list-group list-group-flush rounded">
            <li className="list-group-item">
              <h5 className="mt-1 mb-1">Category</h5>
              <div className="d-flex flex-column">
                {categories.map((v, i) => (
                  <div key={i} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={() => handleCategoryChange(v)}
                      checked={selectedCategories.includes(v)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {v}
                    </label>
                  </div>
                ))}
              </div>
            </li>
            <li className="list-group-item">
              <h5 className="mt-1 mb-2">Price Range</h5>
              <div className="d-grid d-block mb-3">
                <div className="form-floating mb-2">
                  <input
                    id="minPrice"
                    type="text"
                    className="form-control"
                    placeholder="Min price"
                    value={isMinPriceCleared ? "" : minPrice}
                    onChange={handleMinPriceChange}
                  />
                  <label htmlFor="floatingInput">Min</label>
                </div>
                <div className="form-floating mb-2">
                  <input
                    id="maxPrice"
                    type="text"
                    className="form-control"
                    placeholder="Max price"
                    value={isMaxPriceCleared ? "" : maxPrice}
                    onChange={handleMaxPriceChange}
                  />
                  <label htmlFor="floatingInput">Max</label>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-md-9 mt-4 ">
          <div className="d-flex justify-content-end mb-1">
            <div className="input-group w-50">
              <input
                className="form-control"
                type="text"
                placeholder="Search products..."
                aria-label="search input"
                onChange={handleSearch}
              />
              <button className="btn btn-outline-dark ">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

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
          {/* <div className="d-flex justify-content-center">
       
       <Pagination size="lg">
             <Pagination.Item className="fw-bold fs-5 p-3 " onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
               Previous
             </Pagination.Item>
             <Pagination.Item className="fw-bold fs-5 p-3" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(totalItems / limit)}>
               Next
             </Pagination.Item>
         </Pagination>

       </div> */}
        </div>
      </div>
    </section>
  );
}

export default Products;
