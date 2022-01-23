import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      password: password,

    };

    axios
      .post("http://localhost:4000/user/login", newUser)
      .then((response) => {
        alert("Logged in as " + newUser.email);
        console.log(newUser);
        localStorage.setItem('Authentication', newUser.email);
        navigate("/")
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
