import React, { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  console.log(reviews);
  return (
    <div>
      <header>
        <h1 className="text-center mt-3  mb-5">Reviews</h1>
      </header>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
          {reviews.map((review) => (
            <div className="col-lg-3 g-4">
              <div class="card h-100 border-primary mb-3 ">
                <div class="card-header text-center">{review.Name}</div>
                <div class="card-body text-primary">
                  <p class="card-text">{review.review}</p>
                  <Rating name="read-only" value={parseInt(review.rating)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
