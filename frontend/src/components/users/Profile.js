import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { Menu, MenuItem, MenuList } from "@mui/material";
import { SystemSecurityUpdateRounded } from "@mui/icons-material";
import InputAdornment from '@mui/material/InputAdornment';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Box } from "@mui/system";

const Profile = (props) => {
  const [details, setDetails] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [shop, setShop] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [wallet, setWallet] = useState("");
  const [auth_email, setAuthEmail] = useState("");

  const onChangeUsername = (event) => {
    setName(event.target.value);
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

  const onChangeWallet = (event) => {
    setWallet(event.target.value);
  };

  // const useEffect = (event) => { // passed variable, change later
  console.log(auth_email);
  if (!auth_email)
    setAuthEmail(localStorage.getItem('Authentication'));
  function refreshPage() {
    window.location.reload(false);
  }
  useEffect(() => {

    axios
      .post("http://localhost:4000/user/profile", { email: auth_email })
      .then((response) => {
        //  console.log("Repeat?");
        setDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  const onSave = (event) => {
    //console.log("Hi")
    event.preventDefault();

    const newUser = {
      name: name,
      email: details.email,
      type: details.type,
      contact: contact,
      password: password,
      age: age,
      batch: batch,
      shop: shop,
      starttime: starttime,
      endtime: endtime,
      wallet: wallet
    }

    axios
      .post("http://localhost:4000/user/profileupdate", newUser)
      .then((response) => {
        alert("Updated " + response.data.email);
        // console.log(response.data);
        refreshPage();
      });
  };
  // };
  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <Grid item xs={12}>
              <TextField
                label={details.name}
                variant="outlined"
                value={name}
                helperText="Name"
                onChange={onChangeUsername}
              // InputProps={{
              //   readOnly: true,
              // }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={details.email}
                variant="outlined"
                helperText="Email"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            {(details.type === 'Buyer' ? (
              <Grid item xs={12} padding={2}>
                <TextField
                  label={details.contact}
                  variant="outlined"
                  value={contact}
                  helperText="Contact"
                  onChange={onChangeContact}
                // InputProps={{
                //   readOnly: true,
                // }}
                />
              </Grid>
            ) : "")}


            {(details.type === 'Buyer' ? (
              <Grid item xs={12} padding={2}>
                <TextField
                  label={details.age}
                  variant="outlined"
                  value={age}
                  helperText="Age"
                  onChange={onChangeAge}

                // InputProps={{
                //   readOnly: true,
                // }}
                />
              </Grid>
            ) : "")}

            {(details.type === 'Buyer' ? (
              <Grid item xs={12} padding={2}>
                <TextField
                  label={details.batch}
                  variant="outlined"
                  value={batch}
                  helperText="Batch"
                  onChange={onChangeBatch}
                // InputProps={{
                //   readOnly: true,
                // }}
                />
              </Grid>
            ) : "")}

            {(details.type === 'Buyer' ? (
              <Grid item xs={12} padding={2}>
                <TextField
                  label={details.password}
                  variant="outlined"
                  value={password}
                  helperText="Password"
                  onChange={onChangePassword}
                // InputProps={{
                //   readOnly: true,
                // }}
                />
              </Grid>
            ) : "")}


            {(details.type === 'Buyer' ? (
              <Grid item xs={12} padding={2}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        Wallet Status: {details.wallet}
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  value={wallet}
                  helperText="Add money to wallet"
                  onChange={onChangeWallet}
                // InputProps={{
                //   readOnly: true,
                // }}
                />
              </Grid>
            ) : "")}

            {(details.type === 'Vendor' ? (
              <Grid item xs={12} padding={2}>
                <TextField
                  label={details.contact}
                  variant="outlined"
                  value={contact}
                  helperText="Contact"
                  onChange={onChangeContact}
                // InputProps={{
                //   readOnly: true,
                // }}
                />
              </Grid>
            ) : "")}

            {(details.type === 'Vendor' ? (
              <Grid item xs={12} padding={2}>
                <TextField
                  label={details.shop}
                  variant="outlined"
                  value={shop}
                  helperText="Shop Name"
                  onChange={onChangeShop}
                // InputProps={{
                //   readOnly: true,
                // }}
                />
              </Grid>
            ) : "")}
            {/* 
            {(details.type === 'Vendor' ? (
              <p>{details.starttime}</p>
            ) : "")} */}
            {(details.type === 'Vendor' ? (
              <Grid item xs={12}>
                <TextField
                  // label={details.starttime}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        Start Time
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  type="time"
                  value={starttime}
                  helperText="Start Time"
                  helperText={details.starttime}
                  onChange={onChangeStart}
                // InputProps={{
                //   readOnly: true,
                // }}
                />
              </Grid>
            ) : "")}
            {/* 
            {(details.type === 'Vendor' ? (
              <p>{details.endtime}</p>
            ) : "")} */}
            {(details.type === 'Vendor' ? (
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        End Time
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  type="time"
                  value={endtime}
                  helperText="End Time"
                  helperText={details.endtime}
                  onChange={onChangeEnd}
                // InputProps={{
                //   readOnly: true,
                // }}
                />
              </Grid>
            ) : "")}

            {(details.type === 'Vendor' ? (
              <Grid item xs={12} padding={2}>
                <TextField
                  label={details.password}
                  variant="outlined"
                  value={password}
                  helperText="Password"
                  onChange={onChangePassword}
                // InputProps={{
                //   readOnly: true,
                // }}
                />
              </Grid>
            ) : "")}

          </FormControl>
        </Box>
      </Grid >
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSave}>
          {/* Edit button, save later */}
          Save Changes
        </Button>
      </Grid>
    </Grid >
  );
  ;
};

export default Profile;

//Implement Wallet, Profile Editting, Fix constant requests and stuff
//do in afternoon