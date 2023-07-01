import React, { useState } from "react";

export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [1, 2, 3, 4, 5];

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
      <div className="heading-title">
        <h2>This is the title</h2>
      </div>
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
          Prev
        </button>
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </>
  );
}
