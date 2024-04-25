import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BannerTwo from "./banner-2.jpg";
import BannerOne from "./banner-1.jpg";


function BannerIndicator(props) {
  return (
    <button
      type="button"
      data-bs-target="#bannerIndicators"
      data-bs-slide-to={props.index}
      className={props.active ? "active" : ""}
      aria-current={props.active ? "true" : "false"}
    />
  );
}

function BannerImage(props) {
  return (
    <div
      className={"carousel-item" + (props.active ? " active" : "")}
      data-bs-interval="5000"
    >
      <img
        src={props.image}
        className="d-block w-100"
        alt={`Slide ${props.index}`}
      />
      {/* <div className="carousel-caption d-none d-md-block">
        <h5 style={{ fontSize: "2rem" }}>Hello in Our Shop</h5>
        <p style={{ fontSize: "1.5rem" }}>
          Some representative placeholder content for the first slide.
        </p>
        <Link to="/products" className="btn btn-dark" replace style={{ fontSize: "1.2rem" }}>
          Browse products
        </Link>
      </div> */}
    </div>
  );
}

function Banner() {
  return (
    <div
      id="bannerIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-indicators">
        <BannerIndicator index={0} active={true} />
        <BannerIndicator index={1} active={false} />
      </div>
      <div className="carousel-inner">
        <BannerImage image={BannerOne} active={true} />
        <BannerImage image={BannerTwo} active={false} />
      </div>
    </div>
  );
}

export default Banner;
