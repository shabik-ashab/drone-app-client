import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import useAuth from "../../../hooks/useAuth";

const UserReview = () => {
  const { user } = useAuth();

  const [ratingError, setRatingError] = useState(false);
  const [reviewSucsess, setReviewSucsess] = useState(false);
  const initialInfo = { Name: user.displayName, review: "", rating: "" };
  const [newData, setNewData] = useState(initialInfo);

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newFormData = { ...newData };
    newFormData[field] = value;
    setNewData(newFormData);
  };

  const handleSubmit = (e) => {
    // collect data
    const ratingData = parseInt(newData.rating);
    if (ratingData < 6 && ratingData > 0) {
      setRatingError(false);
      axios
        .post("https://hidden-mountain-15974.herokuapp.com/reviews", newData)
        .then((res) => {
          if (res.data.insertedId) {
            setReviewSucsess(true);
          }
          // history.push(redirect_uri);
        });
    } else {
      setReviewSucsess(false);
      setRatingError(true);
    }

    e.preventDefault();
  };

  return (
    <div>
      <header>
        <h1 className="text-center mt-3  mb-5">Give a Review</h1>
      </header>
      <div className="container ms-5">
        {reviewSucsess && (
          <Alert severity="success">Review Given sucessfully</Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            required
            id="outlined-required"
            label="Name"
            name="name"
            sx={{ mb: 2 }}
            defaultValue={user.displayName}
          />
          <br />
          <TextField
            id="outlined-multiline-static"
            label="Write a review"
            multiline
            rows={4}
            onBlur={handleOnBlur}
            sx={{ mb: 2 }}
            name="review"
          />
          <br />
          <TextField
            id="outlined-number"
            label="Rating(1-5)"
            type="number"
            onBlur={handleOnBlur}
            name="rating"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
          {ratingError && (
            <Alert severity="error">Rating should be between (1-5)</Alert>
          )}
          <br />
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserReview;
