import React, { useContext, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { toast, Slide } from "react-toastify";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Authcontext } from "../../Context/Authcontext";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: "100%",
      width: "40%",
      margin: "auto",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    cardMedia: {
      borderRadius: "50%",
      height: "200px",
      width: "200px",
    },
    genre: {
      marginBottom: "5px",
      alignContent: "center",
    },
  }));
  
  const Profile = () => {
    const classes = useStyles();
    const { user, setUser } = useContext(Authcontext);
    const [editMode, setEditMode] = useState(false);
    const [input, setInput] = useState({ password: "", oldPassword: "" });
    const [error, setError] = useState({ password: "", oldPassword: "" });
  
    const handleChange = (event) => {
      const newInput = { ...input };
      const newError = { ...error };
      const name = event.target.name;
      const value = event.target.value;
  
      switch (name) {
        case "password":
          if (!value) {
            newError[name] = "Password required!";
          } else {
            newError[name] = "";
          }
          break;
        case "oldPassword":
          if (!value) {
            newError[name] = "Old password required!";
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
  
    const handleChangePassword = (event) => {
      event.preventDefault();
      const userId = user.id;
      const { password, oldPassword } = input;
  
      if (!password && !oldPassword) {
        return setError({
          password: "Password required!",
          oldPassword: "Old password required!",
        });
      }
  
      if (!password) {
        return setError({
          password: "Password required!",
        });
      }
  
      if (!oldPassword) {
        return setError({
          oldPassword: "Old password required!",
        });
      }
  
      if (password && oldPassword) {
        if (oldPassword !== user.password) {
          return toast.error("Wrong old password!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        }
        axios
          .put(`https://backendexample.sanbersy.com/api/change-password/${userId}`, {
            password,
          })
          .then((res) => {
            setUser(res.data);
            setInput({ password: "", oldPassword: "" });
            setError({ password: "", oldPassword: "" });
            setEditMode(false);
  
            localStorage.setItem("user", JSON.stringify(res.data));
  
            toast.success("Change password success!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Slide,
            });
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
    };
  
    const handleEdit = () => {
      setEditMode(true);
    };
  
    const handleCancel = () => {
      setEditMode(false);
      setInput({ password: "", oldPassword: "" });
      setError({ password: "", oldPassword: "" });
    };
  
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://media3.giphy.com/media/10qsjYmYy6nl9m/200w.webp?cid=ecf05e47w7wouqt6admbfmtqwvaal1hxqiitszz1uf5jn64f&rid=200w.webp"
          title={user.name}
          alt={user.name}
        />
        <CardContent className={classes.cardContent}>
          <Grid
            container
            spacing={2}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item style={{ marginBottom: "10px" }}>
              <Typography variant="h4">{user.username}</Typography>
            </Grid>
            {editMode ? (
              <form onSubmit={handleChangePassword}>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <TextField
                      name="oldPassword"
                      variant="outlined"
                      label="Old Password"
                      type="password"
                      value={input.oldPassword}
                      helperText={error.oldPassword}
                      error={error.oldPassword ? true : false}
                      fullWidth
                      autoFocus
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      name="password"
                      variant="outlined"
                      label="New Password"
                      type="password"
                      value={input.password}
                      helperText={error.password}
                      error={error.password ? true : false}
                      fullWidth
                      autoFocus
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={6}>
                        <Button onClick={handleCancel}>Cancel</Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button variant="contained" color="primary" type="submit">
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            ) : (
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleEdit}>
                  Change Password
                </Button>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    );
  };
  
  export default Profile;
  