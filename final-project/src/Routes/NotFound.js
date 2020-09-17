import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
}));

const Home = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h1" align="center">
          404
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5" color="textSecondary" align="center">
          Page not found!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
