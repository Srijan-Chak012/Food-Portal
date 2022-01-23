import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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

  useEffect(() => {
    axios
      .post("http://localhost:4000/user/profile", { email: auth_email })
      .then((response) => {
        //  console.log("Repeat?");
        setDetails(response.data);
        axios
          .post("http://localhost:4000/food/details", { email: auth_email })
          .then((response) => {
            setFoodDetails(response.data);
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
  return (
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
  );
};

export default Home;
