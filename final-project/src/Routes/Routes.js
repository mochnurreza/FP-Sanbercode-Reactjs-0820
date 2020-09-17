import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useStyles } from "../Navs/UseStyles.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import SignUp from "../Auth/SignUp";
import Login from "../Auth/Login";
import Home from "./Home";
import NotFound from "./NotFound";
import { AuthContext } from "../Context/AuthContext";

const Routes = () => {
    const classes = useStyles();
    const { user } = useContext(AuthContext);
  
    const PrivateRoute = ({ user, ...props }) => {
      if (user) {
        return <Route {...props} />;
      } else {
        return <Redirect to="/login" />;
      }
    };
  
    const LoginRoute = ({ user, ...props }) => {
      if (user) {
        return <Redirect to="/" />;
      } else {
        return <Route {...props} />;
      }
    };
  
    return (
      <>
        <div className={classes.root}>
          <CssBaseline />
          <Navbar />
          {user && <Sidebar />}
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/movie-list" component={Movies} />
              <Route path="/movie-list/:id?" component={DetailMovies} />
              <Route exact path="/game-list" component={Games} />
              <Route path="/game-list/:id?" component={DetailGames} />
              <PrivateRoute
                exact
                path="/movies"
                user={user}
                component={TableMovies}
              />
              <PrivateRoute
                path="/movies/create"
                user={user}
                component={FormMovies}
              />
              <PrivateRoute
                path="/movies/edit/:id?"
                user={user}
                component={FormMovies}
              />
              <PrivateRoute
                exact
                path="/games"
                user={user}
                component={TableGames}
              />
              <PrivateRoute
                path="/games/create"
                user={user}
                component={FormGames}
              />
              <PrivateRoute
                path="/games/edit/:id?"
                user={user}
                component={FormGames}
              />
              <PrivateRoute path="/profile" user={user} component={Profile} />
              <LoginRoute path="/signup" user={user} component={SignUp} />
              <LoginRoute path="/login" user={user} component={Login} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
        <Footer />
      </>
    );
  };
  
  export default Routes;
  