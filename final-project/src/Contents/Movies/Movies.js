import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { toast, Slide } from "react-toastify";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  contentTitle: {
    fontSize: "1.4rem",
    fontWeight: 500,
    borderBottom: "2px solid rgb(234, 234, 234)",
    marginBottom: "10px",
    paddingBottom: "10px",
  },
  card: {
    height: "480px",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    margin: "15px",
    borderRadius: "4px",
    height: "280px",
  },
  cardContent: {
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
  },
  genre: {
    marginBottom: "5px",
    alignContent: "center",
  },
}));

const Movies = (props) => {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const movieSkeleton = [1, 2, 3, 4];

  const DetailMovies = (id) => {
    props.history.push(`/movie-list/${id}`);
  };

  useEffect(() => {
    axios
      .get("https://backendexample.sanbersy.com/api/data-movie")
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
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
  }, []);

  return (
    <>
      <Typography className={classes.contentTitle}>Movie List</Typography>
      <Grid container spacing={3}>
        {loading
          ? movieSkeleton.map((movie) => {
              return (
                <Grid item key={movie} xs={12} sm={6} md={3}>
                  <Card className={classes.card}>
                    <Skeleton
                      className={classes.cardMedia}
                      variant="rect"
                      animation="wave"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography className={classes.cardTitle}>
                        <Skeleton variant="text" width="80%" animation="wave" />
                      </Typography>
                      <Skeleton variant="text" width="60%" animation="wave" />
                      <br />
                      <Typography className={classes.genre} component="span">
                        <Skeleton
                          variant="rect"
                          height="20%"
                          width="30%"
                          style={{ borderRadius: "16px" }}
                          animation="wave"
                        />
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          : movies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={3}>
                <CardActionArea onClick={() => DetailMovies(movie.id)}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={
                        movie.image_url
                          ? movie.image_url.slice(0, 4) === "http" ||
                            movie.image_url.slice(0, 5) === "https"
                            ? movie.image_url
                            : "https://dummyimage.com/600x400/f2f2f2/f2f2f2"
                          : "https://dummyimage.com/600x400/f2f2f2/f2f2f2"
                      }
                      title={movie.title}
                      alt={movie.title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography className={classes.cardTitle}>
                        {movie.title} ({movie.year})
                      </Typography>
                      <Rating
                        name="read-only"
                        value={movie.rating ? movie.rating : 0}
                        max={10}
                        readOnly
                      />
                      <br />
                      <Typography className={classes.genre} component="span">
                        Genre : <Chip size="small" label={movie.genre} />
                      </Typography>
                      <Typography>
                        Duration :{" "}
                        {`${Math.floor(movie.duration / 60)}h ${
                          movie.duration % 60
                        }m`}
                      </Typography>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
      </Grid>
    </>
  );
};

export default withRouter(Movies);
