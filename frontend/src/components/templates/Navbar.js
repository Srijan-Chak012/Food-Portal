import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);

  const auth_email = localStorage.getItem('Authentication');
  const logout = () => {
    localStorage.clear();
    navigate("/")
  };


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

  console.log(details.type);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>

          {(details.type === 'Buyer' ? (
            <Box sx={{ flexGrow: 1 }} />
          ) : " "
          )}

          {(details.type === 'Buyer' ? (
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Wallet: {details.wallet}
            </Typography>
          ) : " "
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Button color="inherit" onClick={() => navigate("/users")}>
            Users
          </Button>

          {(!auth_email ? (
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          ) : "")}

          {(!auth_email ? (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : "")}

          {(auth_email ? (
            <Button color="inherit" onClick={() => navigate("/myorders")}>
              My Orders
            </Button>
          ) : "")}

          {(auth_email ? (
            <Button color="inherit" onClick={() => navigate("/profile")}>
              My Profile
            </Button>
          ) : "")}


          {(auth_email ? (
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          ) : "")}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
