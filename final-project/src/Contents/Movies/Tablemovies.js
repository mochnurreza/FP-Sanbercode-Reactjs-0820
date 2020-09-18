import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { toast, Slide } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Rating from "@material-ui/lab/Rating";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "20px",
  },
  gridButton: {
    padding: "0 24px",
  },
  gridButton2: {
    padding: "0 36px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "400px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: "4px",
    padding: theme.spacing(2, 4, 3),
  },
  modalContainer: {
    marginTop: "20px",
  },
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  buttonFilter: {
    padding: "16px 12px",
  },
}));

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: "#AAF",
        },
        paper: {
          boxShadow: "none",
        },
      },
    },
  });

const Tablemovies = (props) => {
  const [movies, setMovies] = useState([]);
  const [storeMovies, setStoreMovies] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    year: [],
    genre: [],
    rating: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  });
  const [inputFilter, setInputFilter] = useState({
    year: "",
    genre: "",
    rating: "",
  });
  const classes = useStyles();

  const field = [
    "title",
    "description",
    "year",
    "duration",
    "genre",
    "image_url",
    "review",
    "rating",
  ];

  const columns = [
    {
      name: "",
      options: {
        empty: true,
        filter: false,
        sort: false,
      },
    },
    {
      name: "No.",
      options: {
        sort: true,
        customBodyRenderLite: (rowIndex) => {
          return <>{rowIndex + 1}</>;
        },
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        sort: true,
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        sort: true,
      },
    },
    {
      name: "year",
      label: "Year",
      options: {
        sort: true,
      },
    },
    {
      name: "genre",
      label: "Genre",
      options: {
        sort: true,
      },
    },
    {
      name: "rating",
      label: "Rating",
      options: {
        sort: true,
      },
    },
    {
      name: "review",
      label: "Review",
      options: {
        sort: true,
      },
    },
    {
      name: "image_url",
      label: "Image Url",
      options: {
        sort: true,
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <>
              <Grid container justify="flex-start">
                <Grid item>
                  <IconButton
                    variant="contained"
                    component="span"
                    style={{
                      color: "#28a745",
                      margin: "3px",
                    }}
                    title="Edit"
                    onClick={() => handleEdit(dataIndex)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    variant="contained"
                    component="span"
                    style={{
                      color: "#dc3545",
                      margin: "3px",
                    }}
                    title="Delete"
                    onClick={() => handleDelete(dataIndex)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </>
          );
        },
      },
    },
  ];

  const options = {
    filter: false,
    selectableRows: "none",
    download: false,
    print: false,
    responsive: "standard",
    viewColumns: false,
  };

  useEffect(() => {
    let year = [];
    let genre = [];
    let newFilter = { ...filter };

    axios
      .get("https://backendexample.sanbersy.com/api/data-movie")
      .then((res) => {
        let newMovies = res.data;
        // eslint-disable-next-line
        let count = "";

        for (let i = 0; i < newMovies.length; i++) {
          for (let j = 0; j < field.length; j++) {
            if (newMovies[i][field[j]] && newMovies[i][field[j]].length > 15) {
              newMovies[i][field[j]] =
                newMovies[i][field[j]].slice(0, 15) + "...";
            }
            if (field[j] === "year") {
              count = year.push(newMovies[i][field[j]]);
            } else if (field[j] === "genre") {
              count = genre.push(newMovies[i][field[j]]);
            }
          }
        }

        year = year.filter((item, index) => {
          return year.indexOf(item) === index;
        });
        genre = genre.filter((item, index) => {
          return genre.indexOf(item) === index;
        });

        newFilter["year"] = year.sort((a, b) => {
          return a - b;
        });
        newFilter["genre"] = genre.sort((a, b) => {
          return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
        });

        setFilter(newFilter);
        setMovies(newMovies);
        setStoreMovies(newMovies);
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

  useEffect(() => {
    let year = [];
    let genre = [];
    let newFilter = { ...filter };

    if (isUpdate) {
      axios
        .get("https://backendexample.sanbersy.com/api/data-movie")
        .then((res) => {
          let newMovies = res.data;
          // eslint-disable-next-line
          let count = "";

          setMovies(newMovies);
          setStoreMovies(newMovies);

          for (let i = 0; i < newMovies.length; i++) {
            for (let j = 0; j < field.length; j++) {
              if (
                newMovies[i][field[j]] &&
                newMovies[i][field[j]].length > 15
              ) {
                newMovies[i][field[j]] =
                  newMovies[i][field[j]].slice(0, 15) + "...";
              }
              if (field[j] === "year") {
                count = year.push(newMovies[i][field[j]]);
              } else if (field[j] === "genre") {
                count = genre.push(newMovies[i][field[j]]);
              }
            }
          }
          year = year.filter((item, index) => {
            return year.indexOf(item) === index;
          });
          genre = genre.filter((item, index) => {
            return genre.indexOf(item) === index;
          });

          newFilter["year"] = year.sort((a, b) => {
            return a - b;
          });
          newFilter["genre"] = genre.sort((a, b) => {
            return String(a)
              .toLowerCase()
              .localeCompare(String(b).toLowerCase());
          });

          setFilter(newFilter);
          setIsUpdate(false);
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
    }
    
  }, [isUpdate]);

  const handleChange = (event) => {
    const newInputFilter = { ...inputFilter };
    const name = event.target.name;
    let value = event.target.value;

    switch (name) {
      case "year":
        value = parseInt(value);
        if (isNaN(value)) {
          value = "";
        }
        break;
      case "rating":
        value = parseInt(value);
        if (isNaN(value)) {
          value = "";
        }
        break;
      default:
        break;
    }

    newInputFilter[name] = value;
    setInputFilter(newInputFilter);
  };

  const handleCreate = () => {
    props.history.push("/movies/create");
  };

  const handleEdit = (idx) => {
    const movieId = movies[idx].id;
    props.history.push(`/movies/edit/${movieId}`);
  };

  const handleDelete = (idx) => {
    const movieId = movies[idx].id;
    axios
      .delete(`https://backendexample.sanbersy.com/api/data-movie/${movieId}`)
      .then((res) => {
        setIsUpdate(true);

        toast.success("Movie successfully deleted!", {
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
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleApplyFilter = () => {
    let newData = storeMovies.filter((movie) => {
      if (inputFilter.year && inputFilter.genre && inputFilter.rating) {
        return (
          movie.year === inputFilter.year &&
          movie.genre === inputFilter.genre &&
          movie.rating === inputFilter.rating
        );
      }
      if (inputFilter.genre && inputFilter.rating) {
        return (
          movie.genre === inputFilter.genre &&
          movie.rating === inputFilter.rating
        );
      }
      if (inputFilter.year && inputFilter.rating) {
        return (
          movie.year === inputFilter.year && movie.rating === inputFilter.rating
        );
      }
      if (inputFilter.genre && inputFilter.year) {
        return (
          movie.genre === inputFilter.genre && movie.year === inputFilter.year
        );
      }
      if (inputFilter.year) {
        return movie.year === inputFilter.year;
      }
      if (inputFilter.genre) {
        return movie.genre === inputFilter.genre;
      }
      if (inputFilter.rating) {
        return movie.rating === inputFilter.rating;
      }

      return true;
    });

    setMovies(newData);
    handleCloseFilter();
  };

  const handleResetFilter = () => {
    setInputFilter({ year: "", genre: "", rating: "" });
  };

  return (
    <>
      <Modal
        className={classes.modal}
        open={openFilter}
        onClose={handleCloseFilter}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openFilter}>
          <div className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <Typography variant="h6">Filter Table</Typography>
              </Grid>
              <Grid item>
                <Button onClick={handleResetFilter}>Reset</Button>
              </Grid>
            </Grid>
            <Grid container className={classes.modalContainer} spacing={3}>
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink id="year">
                    Year
                  </InputLabel>
                  <Select
                    labelId="year"
                    name="year"
                    value={inputFilter.year}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {filter.year.map((year) => {
                      return (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink id="genre">
                    Genre
                  </InputLabel>
                  <Select
                    labelId="genre"
                    name="genre"
                    value={inputFilter.genre}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {filter.genre.map((genre) => {
                      return (
                        <MenuItem key={genre} value={genre}>
                          {genre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink id="rating">
                    Rating
                  </InputLabel>
                  <Select
                    labelId="rating"
                    name="rating"
                    value={inputFilter.rating}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {filter.rating.map((rating) => {
                      return (
                        <MenuItem key={rating} value={rating}>
                          {rating}
                          <Rating
                            name="read-only"
                            value={1}
                            max={1}
                            size="small"
                            readOnly
                          />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                container
                className={classes.buttonFilter}
                justify="flex-end"
                spacing={2}
              >
                <Grid item>
                  <Button onClick={handleCloseFilter}>Cancel</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleApplyFilter}>
                    Apply
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
      <Card className={classes.card}>
        <Grid container>
          <Grid container className={classes.gridButton} spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleCreate}
              >
                Create Movie
              </Button>
            </Grid>
            <Grid item>
              <Button startIcon={<FilterListIcon />} onClick={handleOpenFilter}>
                Filter
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            style={
              loading
                ? {
                    height: "400px",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                : null
            }
          >
            {loading ? (
              <Grid item>
                <CircularProgress color="primary" />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <MuiThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable
                    title={"Movie Table"}
                    data={movies}
                    columns={columns}
                    options={options}
                  />
                </MuiThemeProvider>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default withRouter(Tablemovies);
