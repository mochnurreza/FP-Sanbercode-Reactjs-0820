import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { toast, Slide } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "40px",
  },
  rating: {
    color: "#757575",
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

const Formmovies = (props) => {
  const classes = useStyles();
  const movieId = props.match.params.id ? props.match.params.id : null;
  const titleForm = movieId ? "Edit Movie" : "Create Movie";
  const [input, setInput] = useState({
    title: "",
    description: "",
    year: "",
    duration: "",
    genre: "",
    image_url: "",
    review: "",
    rating: 1,
    created_at: new Date(),
    updated_at: new Date(),
  });
  const [error, setError] = useState({
    title: "",
    description: "",
    year: "",
    duration: "",
    genre: "",
    image_url: "",
    review: "",
  });
  const defaultInput = {
    title: "",
    description: "",
    year: "",
    duration: "",
    genre: "",
    image_url: "",
    review: "",
    rating: 1,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const defaultError = {
    title: "",
    description: "",
    year: "",
    duration: "",
    genre: "",
    image_url: "",
    review: "",
  };

  useEffect(() => {
    if (movieId) {
      axios
        .get(`https://backendexample.sanbersy.com/api/data-movie/${movieId}`)
        .then((res) => {
          setInput(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something wrong!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        });
    }
  }, [movieId]);

  const handleChange = (event) => {
    const newInput = { ...input };
    const newError = { ...error };
    const name = event.target.name;
    let value = event.target.value;

    switch (name) {
      case "title":
        if (!value) {
          newError[name] = "Title required!";
        } else {
          newError[name] = "";
        }
        break;
      case "description":
        if (!value) {
          newError[name] = "Description required!";
        } else {
          newError[name] = "";
        }
        break;
      case "year":
        if (!value) {
          newError[name] = "Year required!";
        } else if (!parseInt(value)) {
          newError[name] = "Number only!";
        } else {
          newError[name] = "";
          value = parseInt(value);
        }
        break;
      case "duration":
        if (!value) {
          newError[name] = "Duration required!";
        } else if (!parseInt(value)) {
          newError[name] = "Number only!";
        } else {
          newError[name] = "";
          value = parseInt(value);
        }
        break;
      case "genre":
        if (!value) {
          newError[name] = "Genre required!";
        } else {
          newError[name] = "";
        }
        break;
      case "image_url":
        if (!value) {
          newError[name] = "Image url required!";
        } else {
          newError[name] = "";
        }
        break;
      case "review":
        if (!value) {
          newError[name] = "Review required!";
        } else {
          newError[name] = "";
        }
        break;
      case "rating":
        value = parseInt(value);
        break;
      default:
        break;
    }

    newInput[name] = value;
    setInput(newInput);
    setError(newError);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      year,
      duration,
      genre,
      image_url,
      review,
      rating,
    } = input;
    const errors = {
      title: "Title required!",
      description: "Description required!",
      year: "Year required!",
      duration: "Duration required!",
      genre: "Genre required!",
      image_url: "Image url required!",
      review: "Review required!",
    };

    if (
      title &&
      description &&
      year &&
      duration &&
      genre &&
      image_url &&
      review &&
      rating
    ) {
      axios
        .post("https://backendexample.sanbersy.com/api/data-movie", input)
        .then((res) => {
          toast.success("Movie created!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });

          setInput(defaultInput);
          setError(defaultError);
          handleBack();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something wrong!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        });
    } else {
      setError(errors);
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      year,
      duration,
      genre,
      image_url,
      review,
      rating,
    } = input;
    const errors = {
      title: "Title required!",
      description: "Description required!",
      year: "Year required!",
      duration: "Duration required!",
      genre: "Genre required!",
      image_url: "Image url required!",
      review: "Review required!",
    };

    if (
      title &&
      description &&
      year &&
      duration &&
      genre &&
      image_url &&
      review &&
      rating
    ) {
      let newInput = { ...input };
      newInput["updated_at"] = new Date();

      axios
        .put(
          `https://backendexample.sanbersy.com/api/data-movie/${movieId}`,
          newInput
        )
        .then((res) => {
          toast.success("Movie successfully edited!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });

          setInput(defaultInput);
          setError(defaultError);
          handleBack();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something wrong!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        });
    } else {
      setError(errors);
    }
  };

  const handleBack = () => {
    props.history.push("/movies");
  };

  return (
    <>
      <Container maxWidth="sm">
        <Card className={classes.card}>
          <Typography variant="h6" gutterBottom>
            {titleForm}
          </Typography>
          <form onSubmit={movieId ? handleEdit : handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="title"
                  name="title"
                  value={input.title}
                  label="Title *"
                  helperText={error.title}
                  fullWidth
                  onChange={handleChange}
                  error={error.title.length ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  value={input.description}
                  label="Description *"
                  helperText={error.description}
                  multiline
                  fullWidth
                  onChange={handleChange}
                  error={error.description.length ? true : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="year"
                  name="year"
                  value={input.year}
                  label="Year *"
                  helperText={error.year}
                  fullWidth
                  onChange={handleChange}
                  error={error.year.length ? true : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="duration"
                  name="duration"
                  value={input.duration}
                  label="Duration *"
                  helperText={error.duration}
                  fullWidth
                  onChange={handleChange}
                  error={error.duration.length ? true : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="genre"
                  name="genre"
                  value={input.genre}
                  label="Genre *"
                  helperText={error.genre}
                  fullWidth
                  onChange={handleChange}
                  error={error.genre.length ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="image_url"
                  name="image_url"
                  value={input.image_url}
                  label="Image url *"
                  helperText={error.image_url}
                  fullWidth
                  onChange={handleChange}
                  error={error.image_url.length ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="review"
                  name="review"
                  value={input.review}
                  label="Review *"
                  helperText={error.review}
                  multiline
                  fullWidth
                  onChange={handleChange}
                  error={error.review.length ? true : false}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <Typography className={classes.rating} component="legend">
                  Rating *
                </Typography>
                <Rating
                  id="rating"
                  name="rating"
                  value={input.rating > 10 ? 10 : input.rating}
                  max={10}
                  onChange={handleChange}
                />
              </Grid>
              <Grid container justify="flex-end" style={{ padding: "0 12px" }}>
                <Grid item>
                  <Button className={classes.button} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    {movieId ? "Edit" : "Create"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default withRouter(Formmovies);
