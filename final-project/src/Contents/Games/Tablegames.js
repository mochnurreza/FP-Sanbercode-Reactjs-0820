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

const Tablegames = (props) => {
  const [games, setGames] = useState([]);
  const [storeGames, setStoreGames] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    release: [],
    genre: [],
    platform: [],
  });
  const [inputFilter, setInputFilter] = useState({
    release: "",
    genre: "",
    platform: "",
  });
  const classes = useStyles();

  const field = [
    "name",
    "genre",
    "singlePlayer",
    "multiplayer",
    "platform",
    "release",
    "image_url",
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
        empty: true,
        filter: false,
        sort: false,
        customBodyRenderLite: (rowIndex) => {
          return <>{rowIndex + 1}</>;
        },
      },
    },
    {
      name: "name",
      label: "Name",
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
      name: "singlePlayer",
      label: "Single Player",
      options: {
        sort: true,
      },
    },
    {
      name: "multiplayer",
      label: "Multi Player",
      options: {
        sort: true,
      },
    },
    {
      name: "platform",
      label: "Platform",
      options: {
        sort: true,
      },
    },
    {
      name: "release",
      label: "Release",
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
    let release = [];
    let genre = [];
    let platform = [];
    let newFilter = { ...filter };

    axios
      .get("https://backendexample.sanbersy.com/api/data-game")
      .then((res) => {
        let newGames = res.data;
         // eslint-disable-next-line
        let count = "";

        for (let i = 0; i < newGames.length; i++) {
          for (let j = 0; j < field.length; j++) {
            if (newGames[i][field[j]] && newGames[i][field[j]].length > 15) {
              newGames[i][field[j]] =
                newGames[i][field[j]].slice(0, 15) + "...";
            }
            if (field[j] === "release") {
              if (newGames[i][field[j]]) {
                count = release.push(newGames[i][field[j]]);
              }
            } else if (field[j] === "genre") {
              if (newGames[i][field[j]]) {
                count = genre.push(newGames[i][field[j]]);
              }
            } else if (field[j] === "platform") {
              if (newGames[i][field[j]]) {
                count = platform.push(newGames[i][field[j]]);
              }
            }
          }
        }

        release = release.filter((item, index) => {
          return release.indexOf(item) === index;
        });
        genre = genre.filter((item, index) => {
          return genre.indexOf(item) === index;
        });
        platform = platform.filter((item, index) => {
          return platform.indexOf(item) === index;
        });

        newFilter["release"] = release.sort((a, b) => {
          return a - b;
        });

        newFilter["genre"] = genre.sort((a, b) => {
          return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
        });
        newFilter["platform"] = platform.sort((a, b) => {
          return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
        });

        setFilter(newFilter);
        setGames(newGames);
        setStoreGames(newGames);
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
    let release = [];
    let genre = [];
    let platform = [];
    let newFilter = { ...filter };

    if (isUpdate) {
      axios
        .get("https://backendexample.sanbersy.com/api/data-game")
        .then((res) => {
          let newGames = res.data;
          // eslint-disable-next-line
          let count = "";

          setGames(newGames);
          setStoreGames(newGames);

          for (let i = 0; i < newGames.length; i++) {
            for (let j = 0; j < field.length; j++) {
              if (newGames[i][field[j]] && newGames[i][field[j]].length > 15) {
                newGames[i][field[j]] =
                  newGames[i][field[j]].slice(0, 15) + "...";
              }
              if (field[j] === "release") {
                count = release.push(newGames[i][field[j]]);
              } else if (field[j] === "genre") {
                count = genre.push(newGames[i][field[j]]);
              } else if (field[j] === "platform") {
                count = platform.push(newGames[i][field[j]]);
              }
            }
          }

          release = release.filter((item, index) => {
            return release.indexOf(item) === index;
          });
          genre = genre.filter((item, index) => {
            return genre.indexOf(item) === index;
          });
          platform = platform.filter((item, index) => {
            return platform.indexOf(item) === index;
          });

          newFilter["release"] = release.sort((a, b) => {
            return a - b;
          });

          newFilter["genre"] = genre.sort((a, b) => {
            return String(a)
              .toLowerCase()
              .localeCompare(String(b).toLowerCase());
          });
          newFilter["platform"] = platform.sort((a, b) => {
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
      case "release":
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
    props.history.push("/games/create");
  };

  const handleEdit = (idx) => {
    const gameId = games[idx].id;
    props.history.push(`/games/edit/${gameId}`);
  };

  const handleDelete = (idx) => {
    const gameId = games[idx].id;
    axios
      .delete(`https://backendexample.sanbersy.com/api/data-game/${gameId}`)
      .then((res) => {
        setIsUpdate(true);

        toast.success("Game successfully deleted!", {
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
    let newData = storeGames.filter((game) => {
      if (inputFilter.release && inputFilter.genre && inputFilter.platform) {
        return (
          game.release === inputFilter.release &&
          game.genre === inputFilter.genre &&
          game.platform === inputFilter.platform
        );
      }
      if (inputFilter.genre && inputFilter.platform) {
        return (
          game.genre === inputFilter.genre &&
          game.platform === inputFilter.platform
        );
      }
      if (inputFilter.release && inputFilter.platform) {
        return (
          game.release === inputFilter.release &&
          game.platform === inputFilter.platform
        );
      }
      if (inputFilter.genre && inputFilter.release) {
        return (
          game.genre === inputFilter.genre &&
          game.release === inputFilter.release
        );
      }
      if (inputFilter.release) {
        return game.release === inputFilter.release;
      }
      if (inputFilter.genre) {
        return game.genre === inputFilter.genre;
      }
      if (inputFilter.platform) {
        return game.platform === inputFilter.platform;
      }

      return true;
    });

    setGames(newData);
    handleCloseFilter();
  };

  const handleResetFilter = () => {
    setInputFilter({ release: "", genre: "", platform: "" });
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
                  <InputLabel shrink id="release">
                    Release
                  </InputLabel>
                  <Select
                    labelId="release"
                    name="release"
                    value={inputFilter.release}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {filter.release.map((release) => {
                      return (
                        <MenuItem key={release} value={release}>
                          {release}
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
                  <InputLabel shrink id="platform">
                    Platform
                  </InputLabel>
                  <Select
                    labelId="platform"
                    name="platform"
                    value={inputFilter.platform}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {filter.platform.map((platform) => {
                      return (
                        <MenuItem key={platform} value={platform}>
                          {platform}
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
                Create Game
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
                    title={"Game Table"}
                    data={games}
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

export default withRouter(Tablegames);
