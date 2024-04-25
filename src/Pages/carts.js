import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Table, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCartAction } from "../Store/Actions/changeCartAction";
import MyTitle from "../Components/mytitle";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Carts() {
  const myCart = useSelector((state) => state.myCartR.cartListItems);
  const dispatch = useDispatch();
  const [products, setMovies] = useState([]);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const promises = myCart.map(({ id }) =>
        axios.get(`https://dummyjson.com/products/${id}`)
      );

      try {
        const responses = await Promise.all(promises);
        const moviesData = responses.map((res) => res.data);
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [myCart]);

  //   const handleRemoveFromCart = (movieId) => {
  //     dispatch(deleteFromCartAction(movieId));
  //   };
  const handleRemoveFromCart = (id) => {
    if (
      window.confirm("Are you sure you want to remove this item from the cart?")
    ) {
      dispatch(deleteFromCartAction(id));
    }
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, product, index) => {
      const item = myCart[index];
      if (item && item.quantity) {
        return total + item.quantity * product.price;
      }
      return total;
    }, 0);
  };

  const calculateSubtotal = () => {
    return calculateTotalPrice();
  };

  const calculateTax = () => {
    const taxRate = 0.1;
    return calculateSubtotal() * taxRate;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <section className="container mt-5">
      {myCart.length === 0 ? (
        <MyTitle color="danger" content="Your cart is empty" />
      ) : (
        <>
          <Row className="mt-5">
            <Col md={9}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                    const cartItems = myCart.filter(
                      (item) => item.id === product.id
                    );
                    const totalQuantity = cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    );
                    const totalPrice = totalQuantity * product.price;
                    return (
                      <tr key={product.id}>
                        <td>
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>{product.title}</td>
                        <td>{totalQuantity}</td>
                        <td>{product.stock}</td>
                        <td>${product.price}</td>
                        <td>${totalPrice}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveFromCart(product.id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <div className="d-flex justify-content-between mt-5">
                <Link className="btn" to="/products">
                  <FaArrowLeft className="me-2" /> Continue Shopping
                </Link>
                <Button variant="outline-dark">
                  Proceed to checkout <FaArrowRight className="ms-2" />
                </Button>
              </div>
            </Col>
            <Col md={3}>
              <Card className="mt-3 mx-5">
                <Card.Body>
                  <Card.Title className="fw-bold fs-4">Cart Total</Card.Title>
                  <div className="py-1">
                    <p className="mb-3">Subtotal: ${calculateSubtotal()}</p>
                    <p className="mb-3">Tax: ${calculateTax()}</p>
                    <p className="mb-3">Total: ${calculateTotal()}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </section>
  );
}

export default Carts;
