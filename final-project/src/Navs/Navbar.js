import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { useStyles } from "./UseStyles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MovieIcon from "@material-ui/icons/Movie";
import VideogameIcon from "@material-ui/icons/VideogameAsset";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Navcontext } from "../Context/Navcontext";
import { Authcontext } from "../Context/Authcontext";

const Navbar = (props) => {
    const classes = useStyles();
    const { open, setOpen } = useContext(Navcontext);
    const { user, setUser } = useContext(Authcontext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openProfileIcon = Boolean(anchorEl);

    const handleProfileIcon = (event) => {
        setAnchorEl(event.currentTarget);
        };
        const handleCloseProfileIcon = () => {
            setAnchorEl(null);
          };
        
          const handleProfile = () => {
            props.history.push("/profile");
            handleCloseProfileIcon();
          };
        
          const handleDrawer = () => {
            setOpen(!open);
          };
        
          const handleLogOut = () => {
            localStorage.clear("user");
            setUser(null);
            handleCloseProfileIcon();
          };
        
          const home = () => {
            props.history.push("/");
          };
        
          const ListMovies = () => {
            props.history.push("/movie-list");
          };
        
          const ListGames = () => {
            props.history.push("/game-list");
          };
        
          const Login = () => {
            props.history.push("/login");
          };
        
          const SignUp = () => {
            props.history.push("/signup");
          };

    return(
        <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <Grid container spacing={1} justify="space-between" alignItems="center">
          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                {user && (
                  <IconButton
                    color="default"
                    aria-label="open drawer"
                    onClick={handleDrawer}
                    edge="start"
                    className={clsx(classes.menuButton, {
                      [classes.hide]: open,
                    })}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              </Grid>
              <Grid item>
                <Link
                  component="button"
                  variant="h6"
                  underline="none"
                  color="inherit"
                  onClick={home}
                >
                  Movie & Games
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              spacing={3}
              alignItems="center"
              justify="center"
              alignContent="center"
            >
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <MovieIcon />
                  </Grid>
                  <Grid item>
                    <Link
                      component="button"
                      variant="body1"
                      underline="none"
                      color="inherit"
                      onClick={ListMovies}
                    >
                      Movie List
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <VideogameIcon />
                  </Grid>
                  <Grid item>
                    <Link
                      component="button"
                      variant="body1"
                      underline="none"
                      color="inherit"
                      onClick={ListGames}
                    >
                      Game List
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1} alignItems="center">
              {user ? (
                <>
                  <Grid item>
                    <Button
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleProfileIcon}
                      color="default"
                      startIcon={<AccountCircle />}
                    >
                      {user.username}
                    </Button>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={openProfileIcon}
                      onClose={handleCloseProfileIcon}
                    >
                      <MenuItem onClick={handleProfile}>Profile</MenuItem>
                      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Menu>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item>
                    <Button color="default" onClick={Login}>
                      Login
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={SignUp}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    )

}
export default withRouter(Navbar);
