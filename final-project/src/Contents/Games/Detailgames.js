import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { toast, Slide } from "react-toastify";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    cardGrid:{
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

const Detailgames = (props) => {
    const classes = useStyles();
    const [detailGames, setDetailGames] = useState({});
    const gameId = props.match.params.id;
  
    useEffect(() => {
      axios
        .get(`https://backendexample.sanbersy.com/api/data-game/${gameId}`)
        .then((res) => {
          setDetailGames(res.data);
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
    }, [gameId]);
  
    const handleBack = () => {
      props.history.push("/game-list");
    };
  
    return (
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={
              detailGames.image_url
                ? detailGames.image_url.slice(0, 4) === "http" ||
                  detailGames.image_url.slice(0, 5) === "https"
                  ? detailGames.image_url
                  : "https://dummyimage.com/600x400/f2f2f2/f2f2f2"
                : "https://dummyimage.com/600x400/f2f2f2/f2f2f2"
            }
            title={detailGames.name}
            alt={detailGames.name}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h6">{detailGames.name}</Typography>
            <br />
            <Typography className={classes.genre} component="span">
              <b>Genre :</b> <Chip size="small" label={detailGames.genre} />
            </Typography>
            <Typography>
              <b>Release :</b> {detailGames.release}
            </Typography>
            <Typography>
              <b>Platform :</b> {detailGames.platform}
            </Typography>
            <Typography>
              <b>Game Mode :</b>{" "}
              {detailGames.singlePlayer === 1 ? (
                <Chip size="small" label="Single Player" />
              ) : null}{" "}
              {detailGames.multiplayer ? (
                <Chip size="small" label="Multi Player" />
              ) : null}
            </Typography>
            <Grid container justify="flex-end" style={{ marginTop: "15px" }}>
              <Grid item>
                <Button onClick={handleBack}>Back to game list</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
    };
    
    export default Detailgames;
    
