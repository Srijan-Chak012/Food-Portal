import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { Menu, MenuItem, MenuList } from "@mui/material";
import { SystemSecurityUpdateRounded } from "@mui/icons-material";
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Box } from "@mui/system";
const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [shop, setShop] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [wallet, setWallet] = useState("");
  console.log(batch);

  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const onChangeShop = (event) => {
    setShop(event.target.value);
  };

  const onChangeStart = (event) => {
    setStarttime(event.target.value);
  };

  const onChangeEnd = (event) => {
    setEndtime(event.target.value);
  };
  
  const refreshPage = () => {
    window.location.reload();
  }
  const resetInputs = () => {
    setName("");
    setEmail("");
    setType("");
    setContact("");
    setPassword("");
    setAge("");
    setBatch("");
    setShop("");
    setStarttime("");
    setEndtime("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    refreshPage();
    const newUser = {
      name: name,
      email: email,
      type: type,
      contact: contact,
      password: password,
      age: age,
      batch: batch,
      shop: shop,
      starttime: starttime,
      endtime: endtime,
      wallet: 0
    }

    console.log(newUser);
    axios
      .post("http://localhost:4000/user/signup", newUser)
      .then((response) => {
        alert("Created " + response.data.name);
        console.log(response.data);
        navigate("/login")
      });

    resetInputs();
  };
  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeUsername}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              autoWidth
              onChange={onChangeType}
            >
              <MenuItem value={"Buyer"}>Buyer</MenuItem>
              <MenuItem value={"Vendor"}>Vendor</MenuItem>
            </Select>
            {(type === 'Buyer' ? (
              <Grid item xs={12} padding={2}>
                <TextField
                  label="Contact"
                  variant="outlined"
                  value={contact}
                  onChange={onChangeContact}
                />
              </Grid>
            ) : "")}

            {(type === 'Buyer' ? (
              <Grid item xs={12} padding={2}>
                <TextField
                  label="Age"
                  variant="outlined"
                  value={age}
                  onChange={onChangeAge}
                />
              </Grid>
            ) : "")}

            {(type === 'Buyer' ? (
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={batch}
                  label="Batch"
                  autoWidth
                  onChange={onChangeBatch}
                >
                  <MenuItem value={"UG1"}>UG1</MenuItem>
                  <MenuItem value={"UG2"}>UG2</MenuItem>
                  <MenuItem value={"UG3"}>UG3</MenuItem>
                  <MenuItem value={"UG4"}>UG4</MenuItem>
                  <MenuItem value={"UG5"}>UG5</MenuItem>
                </Select>
              </FormControl>
            ) : "")}

            {(type === 'Buyer' ? (
              <Grid item xs={12} padding={2}>
                <TextField
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={onChangePassword}
                />
              </Grid>
            ) : "")}

            {(type === 'Vendor' ? (
              <Grid item xs={12} padding={2}>
                <TextField
                  label="Contact"
                  variant="outlined"
                  value={contact}
                  onChange={onChangeContact}
                />
              </Grid>
            ) : "")}

            {(type === 'Vendor' ? (
              <Grid item xs={12} padding={2}>
                <TextField
                  label="Shop Name"
                  variant="outlined"
                  value={shop}
                  onChange={onChangeShop}
                />
              </Grid>
            ) : "")}

            {(type === 'Vendor' ? (
              <p>Start Time</p>
            ) : "")}
            {(type === 'Vendor' ? (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="time"
                  value={starttime}
                  onChange={onChangeStart}
                />
              </Grid>
            ) : "")}

            {(type === 'Vendor' ? (
              <p>End Time</p>
            ) : "")}
            {(type === 'Vendor' ? (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="time"
                  value={endtime}
                  onChange={onChangeEnd}
                />
              </Grid>
            ) : "")}

            {(type === 'Vendor' ? (
              <Grid item xs={12} padding={2}>
                <TextField
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={onChangePassword}
                />
              </Grid>
            ) : "")}

          </FormControl>
        </Box>
      </Grid >
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Sign Up
        </Button>
      </Grid>
    </Grid >
  );
};



export default Signup;
