import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from 'fuse.js'
import axios from "axios";
import Paper from "@mui/material/Paper";
import { useTheme } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from '@mui/material/Checkbox';

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const UsersList = (props) => {
  const [items, setItems] = useState([]);
  const [fooditems, setFoodItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [shopnames, setShopNames] = useState([]);
  const [selectshops, setSelectShops] = useState([]);
  const [selecttags, setSelectTags] = useState([]);
  const [fooddetails, setFoodDetails] = useState([]);
  const [details, setDetails] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [vegchecked, setVegChecked] = useState(true);
  const [nonvegchecked, setNonVegChecked] = useState(true);
  const [sorttype, setSortType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [auth_email, setAuthEmail] = useState("");
  const [favoriteids, setFavoriteIds] = useState("");
  const [minprice, setMinPrice] = useState("");
  const [maxprice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  console.log(favorites);
  const navigate = useNavigate();
  const theme = useTheme();

  if (window.localStorage.length === 0) {
    navigate("/signup")
  }

  else {
    if (!auth_email)
      setAuthEmail(localStorage.getItem('Authentication'));
  }


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  function getStyles(name, selectshops, theme) {
    return {
      fontWeight:
        selectshops.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const checkVegChanged = (event) => {
    setVegChecked(event.target.checked);
  };

  const onChangeMinPrice = (event) => {
    setMinPrice(event.target.value);
  };

  const onChangeMaxPrice = (event) => {
    setMaxPrice(event.target.value);
  };

  const checkNonVegChanged = (event) => {
    setNonVegChecked(event.target.checked);
  };

  const onChangeSortType = (event) => {
    setSortType(event.target.value);
  };

  const shopChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectShops(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const tagChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  console.log(auth_email);

  useEffect(() => {
    axios
      .post("http://localhost:4000/user/profile", { email: auth_email })
      .then((response) => {
        //  console.log("Repeat?");
        setDetails(response.data);
        setFavoriteIds(details.favorites);
        axios
          .post("http://localhost:4000/food")
          .then((response) => {
            setItems(response.data);
            setFoodItems(response.data);
            setSortedUsers(response.data);
            setSearch("");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });

  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:4000/food/shopname", { email: auth_email })
      .then((response) => {
        //  console.log("Repeat?");
        setShopNames(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, []);

  useEffect(() => {
    let temp = fooditems;
    temp = fooditems.filter(fooditem => (fooditem.category == "Veg" && vegchecked == true) || (fooditem.category == "NonVeg" && nonvegchecked == true));

    if (minprice && maxprice)
      temp = temp.filter(fooditem => (parseInt(fooditem.price) >= parseInt(minprice)) && (parseInt(fooditem.price) <= parseInt(maxprice)));

    temp = temp.filter(fooditem =>
      selectshops.some((selectedshop) =>
        fooditem.shop == selectedshop)

    );

    temp = temp.filter(fooditem =>
      fooditem.tags.some((itemtag) =>
        selecttags.some((selectedtags) =>
          itemtag.name == selectedtags)
      )
    );
    setItems(temp);
    console.log(temp)
  }, [vegchecked, nonvegchecked, minprice, maxprice, selecttags, selectshops]);

  const calculatetime = () => {
    axios
      .post("http://localhost:4000/user/gettime", { email: auth_email })
      .then((response) => {
        //  console.log("Repeat?");
        setShopNames(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSearch = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  const fuse = new Fuse(fooditems, {
    keys: ["name"],
    includeScore: true,
  })

  console.log(fooditems);

  useEffect(() => {
    let temp;
    temp = fuse.search(searchText).map((fooditem) => fooditem.item);
    console.log(searchText);
    console.log(temp);
    setItems(temp);
  }, [searchText])

  console.log(shopnames);
  console.log(items);
  console.log(fooditems);
  const AddFav = (fooditem) => {
    //console.log("Hi"
    //  alert("Favorited Food " + fooditem.name);
    setFavorites([...favorites, fooditem]);
    details.favorites.push(fooditem.id);
    console.log(favorites);
    console.log(details.favorites);
    axios
      .post("http://localhost:4000/user/profileupdate", { email: auth_email, favorites: details.favorites })
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("Favorite added");
  };
  const RemoveFav = (fooditem) => {
    //console.log("Hi")
    let temp = details.favorites.filter(id => id != fooditem.id);
    console.log(temp);
    details.favorites = temp;
    console.log(details.favorites);
    axios
      .post("http://localhost:4000/user/profileupdate", { email: auth_email, favorites: details.favorites })
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("Removed Favorite");
  };

  function checkExisting(arr, val) {
    return arr.some(function (arrVal) {
      return val === arrVal;
    });
  }

  const buyItems = (fooditem) => {
    //console.log("Hi")
    localStorage.setItem('FoodId', fooditem.id);
    navigate("/buyitems")
  };

  const sortrd = () => {
    //console.log("Hi")
    const mydata = [].concat(items).sort((a, b) => (a.rating < b.rating ? 1 : -1));
    setItems(mydata);
  };
  const sortra = () => {
    //console.log("Hi")
    const mydata = [].concat(items).sort((a, b) => (a.rating > b.rating ? 1 : -1));
    setItems(mydata);
  };
  const sortpa = () => {
    //console.log("Hi")
    const mydata = [].concat(items).sort((a, b) => (a.price > b.price ? 1 : -1));
    setItems(mydata);
  };
  const sortpd = () => {
    //console.log("Hi")
    const mydata = [].concat(items).sort((a, b) => (a.price < b.price ? 1 : -1));
    setItems(mydata);
  };

  console.log(shopnames);
  // console.log(shopnames.shop);   

  console.log(selecttags);
  console.log(selectshops);
  console.log(items);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              placeholder="Search"
              fullWidth={true}
              value={searchText}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={onSearch}
            // onChange={customFunction}
            />
          </List>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                Price
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-basic"
                  label="Enter Min"
                  value={minprice}
                  onChange={onChangeMinPrice}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-basic"
                  label="Enter Max"
                  value={maxprice}
                  onChange={onChangeMaxPrice}
                />
              </Grid>
            </Grid>
            <Divider />
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Shop(s)</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={selectshops}
                onChange={shopChange}
                input={<OutlinedInput label="Shop" />}
                MenuProps={MenuProps}
              > {shopnames ?
                shopnames.map((items) => (
                  <MenuItem
                    key={items.shop}
                    value={items.shop}
                    style={getStyles(items.shop, selectshops, theme)}
                  >
                    {items.shop}
                  </MenuItem>
                ))
                : ""}

              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Tag(s)</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={selecttags}
                onChange={tagChange}
                input={<OutlinedInput label="Tags" />}
                MenuProps={MenuProps}
              > {shopnames ?
                shopnames.map((item) => (
                  item.foods.map((food) => (
                    // (food.tags.length === 0 ? (

                    // ))
                    food.tags.map((tag) => (
                      <MenuItem
                        key={tag.name}
                        value={tag.name}
                        style={getStyles(tag.name, selectshops, theme)}
                      >
                        {tag.name}
                      </MenuItem>
                    ))
                  ))
                ))
                :
                ""
                }
              </Select>
            </FormControl>
            <Divider />
            <FormControlLabel
              value="Veg"
              control={
                <Checkbox
                  defaultChecked
                  checked={vegchecked}
                  onChange={checkVegChanged}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Veg"
              labelPlacement="start"
            />

            <FormControlLabel
              value="Non-Veg"
              control={
                <Checkbox
                  checked={nonvegchecked}
                  onChange={checkNonVegChanged}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="NonVeg"
              labelPlacement="start"
            />
            <h2>Sort By:</h2>
            <Button variant="contained" onClick={() => sortrd()}>
              Rating, Descending
            </Button>
            <p></p>
            <Button variant="contained" onClick={() => sortpd()}>
              Price, Descending
            </Button>
            <p></p>
            <Button variant="contained" onClick={() => sortra()}>
              Rating, Ascending
            </Button>
            <p></p>
            <Button variant="contained" onClick={() => sortpa()}>
              Price, Ascending
            </Button>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Grid item xs={12} align={"center"}>
              <h2>Favorites</h2>
            </Grid>
          </Paper>

          <Paper>
            <Grid item xs={12} align={"center"}>
              <h2>Items Offered</h2>
            </Grid>
          </Paper>
          <h2>Open shops</h2>
          {items.map((fooditem) =>
            <Grid sx={{ margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>

                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        {fooditem.name} &emsp;  &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; ₹{fooditem.price}
                        <br></br>
                        {fooditem.category}
                        <br></br>
                        Vendor Details: {fooditem.shop}
                        <br></br>
                        <Typography gutterBottom variant="subtitle1" component="div">
                          <br></br>
                          Addons:
                          {fooditem.addons.map((addon) =>
                            <Typography variant="body2" color="text.secondary">
                              {addon.name}, {addon.price}
                            </Typography>
                          )}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" component="div">
                          Tags:
                          {fooditem.tags.map((tagname) =>
                            <Typography variant="body2" color="text.secondary">
                              {tagname.name}
                            </Typography>
                          )}
                        </Typography>
                        <br></br>
                        Rating: {fooditem.rating}
                        <br></br>
                        {(checkExisting(favorites, fooditem.id) ? (
                          <Button variant="contained" onClick={() => RemoveFav(fooditem)}>
                            Remove Favorites
                          </Button>
                        ) : <Button variant="contained" onClick={() => AddFav(fooditem)}>
                          Add Favorites
                        </Button>)}
                        &emsp;
                        <Button variant="contained" onClick={() => buyItems(fooditem)}>
                          Buy Item
                        </Button>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}

        </Grid>
      </Grid>
    </div>
  );
};

export default UsersList;