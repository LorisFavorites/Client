import React, { useEffect, useState } from "react";
import Products from "./Products";
import Loading from "./Loading";
import axios from "axios";

export default function Header({ setIsNavOpen }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    setIsNavOpen(false);
    fetchData(1);
  }, []);

  useEffect(() => {
    console.log("Data:", data);
    if (data) {
      setIsLoading(false);
      setTestimonials(data.slice(0, 5));
    }
  }, [data]);

  const fetchData = async (page) => {
    try {
      const response = await axios.get("https://api.pokemontcg.io/v2/cards", {
        params: { page },
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handleTestimonialClick = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="slider">
        <div className="testimonials">
          {testimonials.map((testimonial, index) => {
            const isActive = index === currentIndex;
            const classNames = `item ${isActive ? "active" : ""}`;

            return (
              <label
                key={index}
                className={classNames}
                htmlFor={`t-${testimonial}`}
                style={{ backgroundImage: `url(${testimonial.images.small})` }}
                onClick={() => handleTestimonialClick(index)} // Add onClick handler
              ></label>
            );
          })}
        </div>
      </div>
      <div className="buttons">
        <button className="prev-button" onClick={handlePrevClick}>
          {/* <i className="fa-solid fa-chevron-left"></i> */}
        </button>
        <button className="next-button" onClick={handleNextClick}>
          {/* <i className="fa-solid fa-chevron-right"></i> */}
        </button>
      </div>

      <Products data={data} />
    </>
  );
};
