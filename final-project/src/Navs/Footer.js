import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useStyles } from "./UseStyles.js";

export default function Footer(props) {
    const classes = useStyles();
  
    return (
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            {new Date().getFullYear()}
            {" "}
            by{" "}
            <Link color="inherit" href="https://material-ui.com/">
              Azernr
            </Link>{" "}
          </Typography>
        </Container>
      </footer>
    );
  }
  