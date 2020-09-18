import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useStyles } from "../Navs/UseStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "../Navs/Navbar";
import Sidebar from "../Navs/Sidebar";
import Footer from "../Navs/Footer";
import Movies from "../Contents/Movies/Movies";
import Detailmovies from "../Contents/Movies/Detailmovies";
import Games from "../Contents/Games/Games";
import Detailgames from "../Contents/Games/Detailgames";
import Tablemovies from "../Contents/Movies/Tablemovies";
import Formmovies from "../Contents/Movies/Formmovies";
import Tablegames from "../Contents/Games/Tablegames";
import Formgames from "../Contents/Games/Formgames";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import Profile from "../Contents/Profile/Profile";
import Home from "./Home";
import NotFound from "./NotFound";
import { Authcontext } from "../Context/Authcontext";

const Routes = () => {
  const classes = useStyles();
  const { user } = useContext(Authcontext);

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
            <Route path="/movie-list/:id?" component={Detailmovies} />
            <Route exact path="/game-list" component={Games} />
            <Route path="/game-list/:id?" component={Detailgames} />
            <PrivateRoute
              exact
              path="/movies"
              user={user}
              component={Tablemovies}
            />
            <PrivateRoute
              path="/movies/create"
              user={user}
              component={Formmovies}
            />
            <PrivateRoute
              path="/movies/edit/:id?"
              user={user}
              component={Formmovies}
            />
            <PrivateRoute
              exact
              path="/games"
              user={user}
              component={Tablegames}
            />
            <PrivateRoute
              path="/games/create"
              user={user}
              component={Formgames}
            />
            <PrivateRoute
              path="/games/edit/:id?"
              user={user}
              component={Formgames}
            />
            <PrivateRoute path="/profile" user={user} component={Profile} />
            <LoginRoute path="/signup" user={user} component={Signup} />
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
