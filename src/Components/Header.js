import React, { useEffect, useState } from "react";
import Products from "./Products";

export default function Header({ setIsNavOpen }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [1, 2, 3, 4, 5];

  useEffect(() => {
    setIsNavOpen(false);
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

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
              ></label>
            );
          })}
        </div>
      </div>
      <div className="buttons">
        <button className="prev-button" onClick={handlePrevClick}>
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button className="next-button" onClick={handleNextClick}>
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <Products />
    </>
  );
}
