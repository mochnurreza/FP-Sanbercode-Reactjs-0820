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
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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
    gridRadio: {
      paddingTop: "24px !important",
    },
  }));
  
  const Formgames = (props) => {
    const classes = useStyles();
    const gameId = props.match.params.id ? props.match.params.id : null;
    const titleForm = gameId ? "Edit Game" : "Create Game";
    const [input, setInput] = useState({
      name: "",
      genre: "",
      singlePlayer: "",
      multiplayer: "",
      platform: "",
      release: "",
      image_url: "",
      created_at: new Date(),
      updated_at: new Date(),
    });
    const [error, setError] = useState({
      name: "",
      genre: "",
      singlePlayer: "",
      multiplayer: "",
      platform: "",
      release: "",
      image_url: "",
    });
    const defaultInput = {
      name: "",
      genre: "",
      singlePlayer: "",
      multiplayer: "",
      platform: "",
      release: "",
      image_url: "",
      created_at: new Date(),
      updated_at: new Date(),
    };
    const defaultError = {
      name: "",
      genre: "",
      singlePlayer: "",
      multiplayer: "",
      platform: "",
      release: "",
      image_url: "",
    };
  
    useEffect(() => {
      if (gameId) {
        axios
          .get(`https://backendexample.sanbersy.com/api/data-game/${gameId}`)
          .then((res) => {
            let data = res.data;
            data["singlePlayer"] = data["singlePlayer"]
              ? data["singlePlayer"].toString()
              : "0";
            data["multiplayer"] = data["multiplayer"]
              ? data["multiplayer"].toString()
              : "0";
            setInput(data);
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
    }, [gameId]);
  
    const handleChange = (event) => {
      const newInput = { ...input };
      const newError = { ...error };
      const name = event.target.name;
      let value = event.target.value;
  
      switch (name) {
        case "name":
          if (!value) {
            newError[name] = "Name required!";
          } else {
            newError[name] = "";
          }
          break;
        case "genre":
          if (!value) {
            newError[name] = "Genre required!";
          } else {
            newError[name] = "";
          }
          break;
        case "singlePlayer":
          if (!value) {
            newError[name] = "Single player required!";
          } else {
            newError[name] = "";
          }
          break;
        case "multiplayer":
          if (!value) {
            newError[name] = "Multi player required!";
          } else {
            newError[name] = "";
          }
          break;
        case "platform":
          if (!value) {
            newError[name] = "Platform required!";
          } else {
            newError[name] = "";
          }
          break;
        case "release":
          if (!value) {
            newError[name] = "Release required!";
          } else if (!parseInt(value)) {
            newError[name] = "Number only!";
          } else {
            newError[name] = "";
            value = parseInt(value);
          }
          break;
        case "image_url":
          if (!value) {
            newError[name] = "Image url required!";
          } else {
            newError[name] = "";
          }
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
        name,
        genre,
        singlePlayer,
        multiplayer,
        platform,
        release,
        image_url,
      } = input;
      const errors = {
        name: "Name required!",
        genre: "Genre required!",
        singlePlayer: "Single player required!",
        multiplayer: "Multi player required!",
        platform: "platform required!",
        release: "Release required!",
        image_url: "Image url required!",
      };
  
      if (
        name &&
        genre &&
        singlePlayer &&
        multiplayer &&
        platform &&
        release &&
        image_url
      ) {
        axios
          .post("https://backendexample.sanbersy.com/api/data-game", input)
          .then((res) => {
            toast.success("Game created!", {
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
        name,
        genre,
        singlePlayer,
        multiplayer,
        platform,
        release,
        image_url,
      } = input;
      const errors = {
        name: "Name required!",
        genre: "Genre required!",
        singlePlayer: "Single player required!",
        multiplayer: "Multi player required!",
        platform: "platform required!",
        release: "Release required!",
        image_url: "Image url required!",
      };
  
      if (
        name &&
        genre &&
        singlePlayer &&
        multiplayer &&
        platform &&
        release &&
        image_url
      ) {
        let newInput = { ...input };
        newInput["updated_at"] = new Date();
  
        axios
          .put(
            `https://backendexample.sanbersy.com/api/data-game/${gameId}`,
            newInput
          )
          .then((res) => {
            toast.success("Game successfully edited!", {
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
      props.history.push("/games");
    };
  
    return (
      <>
        <Container maxWidth="sm">
          <Card className={classes.card}>
            <Typography variant="h6" gutterBottom>
              {titleForm}
            </Typography>
            <form onSubmit={gameId ? handleEdit : handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    name="name"
                    value={input.name}
                    label="Name *"
                    helperText={error.name}
                    fullWidth
                    onChange={handleChange}
                    error={error.name.length ? true : false}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="release"
                    name="release"
                    value={input.release}
                    label="Release *"
                    helperText={error.release}
                    fullWidth
                    onChange={handleChange}
                    error={error.release.length ? true : false}
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
                <Grid item className={classes.gridRadio} xs={12} md={6}>
                  <FormControl>
                    <FormLabel>Single Player *</FormLabel>
                    <RadioGroup
                      aria-label="singlePlayer"
                      name="singlePlayer"
                      value={input.singlePlayer}
                      onChange={handleChange}
                    >
                      <Grid container>
                        <Grid item>
                          <FormControlLabel
                            value="1"
                            control={<Radio color="primary" />}
                            label="Yes"
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            value="0"
                            control={<Radio color="primary" />}
                            label="No"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item className={classes.gridRadio} xs={12} md={6}>
                  <FormControl>
                    <FormLabel>Multi Player *</FormLabel>
                    <RadioGroup
                      aria-label="multiplayer"
                      name="multiplayer"
                      value={input.multiplayer}
                      onChange={handleChange}
                    >
                      <Grid container>
                        <Grid item>
                          <FormControlLabel
                            value="1"
                            control={<Radio color="primary" />}
                            label="Yes"
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            value="0"
                            control={<Radio color="primary" />}
                            label="No"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="platform"
                    name="platform"
                    value={input.platform}
                    label="Platform *"
                    helperText={error.platform}
                    fullWidth
                    onChange={handleChange}
                    error={error.platform.length ? true : false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="image_url"
                    name="image_url"
                    value={input.image_url}
                    label="Image Url *"
                    helperText={error.image_url}
                    fullWidth
                    onChange={handleChange}
                    error={error.image_url.length ? true : false}
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
                      {gameId ? "Edit" : "Create"}
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
  
  export default withRouter(Formgames);
  