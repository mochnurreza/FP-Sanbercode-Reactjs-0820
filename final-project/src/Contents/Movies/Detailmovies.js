import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { toast, Slide } from "react-toastify";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    margin: "15px auto",
    borderRadius: "4px",
    height: "400px",
    width: "300px",
  },
  cardContent: {
    flexGrow: 1,
  },
  genre: {
    marginBottom: "5px",
    alignContent: "center",
  },
}));

const Detailmovies = (props) => {
    const classes = useStyles();
    const [detailMovies, setDetailMovies] = useState({});
    const movieId = props.match.params.id;
  
    useEffect(() => {
      axios
        .get(`https://backendexample.sanbersy.com/api/data-movie/${movieId}`)
        .then((res) => {
          setDetailMovies(res.data);
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
    }, [movieId]);
  
    const handleBack = () => {
      props.history.push("/movie-list");
    };
  
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={
            detailMovies.image_url
              ? detailMovies.image_url.slice(0, 4) === "http" ||
                detailMovies.image_url.slice(0, 5) === "https"
                ? detailMovies.image_url
                : "https://dummyimage.com/600x400/f2f2f2/f2f2f2"
              : "https://dummyimage.com/600x400/f2f2f2/f2f2f2"
          }
          title={detailMovies.title}
          alt={detailMovies.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h6">
            {detailMovies.title} ({detailMovies.year})
          </Typography>
          <Rating
            name="read-only"
            value={detailMovies.rating ? detailMovies.rating : 0}
            max={10}
            readOnly
          />
          <br />
          <Typography className={classes.genre} component="span">
            <b>Genre :</b> <Chip size="small" label={detailMovies.genre} />
          </Typography>
          <Typography>
            <b>Duration :</b>{" "}
            {`${Math.floor(detailMovies.duration / 60)}h ${
              detailMovies.duration % 60
            }m`}
          </Typography>
          <Typography>{detailMovies.description}</Typography>
          <br />
          <Divider />
          <br />
          <Typography>
            <b>Review : </b> <i>{detailMovies.review}</i>
          </Typography>
          <Grid container justify="flex-end" style={{ marginTop: "15px" }}>
            <Grid item>
              <Button onClick={handleBack}>Back to movie list</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  
  export default withRouter(Detailmovies);
  