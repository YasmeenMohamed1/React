import { useDispatch, useSelector } from "react-redux";
import MyTitle from "../Components/mytitle";
import { Link } from "react-router-dom";
import { changeWishlistAction, deleteFromWishlistAction } from "../Store/Actions/changeWishlistAction";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button, Table, Row, Col } from "react-bootstrap";


function Favorites()
{
    const myWishlist = useSelector((state) => state.wishlistR.cartItems);

    const dispatch = useDispatch()
    const [products, setMovies] = useState([]);


    useEffect(() => {
        const fetchMovies = async () => {
            const promises = myWishlist.map(id =>
                axios.get(`https://dummyjson.com/products/${id}`)
            );

            try {
                const responses = await Promise.all(promises);
                const moviesData = responses.map(res => res.data);
                setMovies(moviesData);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [myWishlist]);


    const deleteFromWishlist = (id)=>{

       dispatch(deleteFromWishlistAction(id))

        
      }



    return (
        <section className="container">
            {myWishlist.length === 0 ? (
  <MyTitle color="danger" content="Your WishList is empty" />
) : (
  <>
        
                            
                            <Row className="mt-5">
                            <Col>
                              <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Stock</th>
                                    <th>Price</th>
                                    <th>Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {products.map((product, index) => (
                                    <tr key={product.id}>
                                      <td>
                                        <img
                                          src={product.images[0]}
                                          alt={product.title}
                                          style={{ width: "100px" }}
                                        />
                                      </td>
                                      <td>{product.title}</td>
                                      <td>{product.stock}</td>
                                      <td>${product.price}</td>
                                      <td>
                                        <Button
                                          variant="danger"
                                          onClick={() => deleteFromWishlist(product.id)}
                                        >
                                          Remove
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                              <div className="d-flex justify-content-between mt-5">
                                <Link className="btn" to="/products">
                                  <FaArrowLeft className="me-2" /> Continue Shopping
                                </Link>
                              
                              </div>
                            </Col>
                          </Row>
                     

     </>
        )}


        </section>
 );
   

}


export default Favorites;