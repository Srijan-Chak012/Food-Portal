import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Box } from "@mui/system";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState([]);
  const [fooddetails, setFoodDetails] = useState([]);
  const [auth_email, setAuthEmail] = useState("");

  const navigate = useNavigate();

  const addItems = (event) => {
    //console.log("Hi")
    navigate("/additems")
  };

  console.log(auth_email);
  console.log(window.localStorage.length);
  if (window.localStorage.length === 0) {
    navigate("/signup")
  }

  else {
    if (!auth_email)
      setAuthEmail(localStorage.getItem('Authentication'));
  }

  const refreshPage = () => {
    window.location.reload();
  }

  useEffect(() => {
    axios
      .post("http://localhost:4000/user/profile", { email: auth_email })
      .then((response) => {
        //  console.log("Repeat?");
        setDetails(response.data);
        axios
          .post("http://localhost:4000/food/details", { shop: response.data.shop })
          .then((response2) => {
            setFoodDetails(response2.data);
            console.log(response.data);
            console.log(response.data.shop);
            console.log(fooddetails);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  console.log(details);
  if (details.type === 'Buyer') {
    navigate("/users")
  }

  const delItems = (fooditem) => {
    //console.log("Hi")
    axios
      .post("http://localhost:4000/food/deleteitem", fooditem)
      .then((response) => {
        alert("Deleted " + fooditem.name);
        // console.log(response.data);
      });
  };

  const editItems = (fooditem) => {
    //console.log("Hi")
    localStorage.setItem('FoodId', fooditem.id);
    navigate("/edititems")
  };

  console.log(fooddetails);
  return (
    <div>
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          {(details.type === 'Vendor' ? (
            <Grid item xs={12} padding={2}>

              <Button variant="contained" onClick={addItems}>
                Add Items
              </Button>
            </Grid>
          ) : "")}
        </Grid >
      </Grid >

      {(auth_email ? (
        <Grid item xs={12} padding={2}>
          <h2 align={"center"}>Items offered</h2>
        </Grid>
      ) : "")}

      {(!auth_email ? (
        <Grid item xs={12} padding={2}>
          <h2 align={"center"}>Happy Shopping</h2>
        </Grid>
      ) : "")}

      {fooddetails.map((fooditem) =>
        <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>

                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {fooditem.name} &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; ₹{fooditem.price}
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
                    <Button variant="contained" onClick={() => editItems(fooditem)}>
                      Edit Item
                    </Button>
                    &emsp;
                    <Button variant="contained" onClick={() => delItems(fooditem)}>
                      Delete Item
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
};

export default Home;
