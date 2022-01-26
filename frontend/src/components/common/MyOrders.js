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

const MyOrder = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [details, setDetails] = useState([]);
    const [orderdetails, setOrderDetails] = useState([]);
    const [auth_email, setAuthEmail] = useState("");

    const navigate = useNavigate();

    const addItems = (event) => {
        //console.log("Hi")
        navigate("/additems")
    };

    console.log(auth_email);
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
                    .post("http://localhost:4000/food/orderdetails", { email: auth_email })
                    .then((response) => {
                        setOrderDetails(response.data);
                        console.log(response.data);
                        console.log(orderdetails);
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
        <div>
            <Grid item xs={12} md={9} lg={9}>
                <Paper>
                    <Grid item xs={12} align={"center"}>
                        <h2>My Orders</h2>
                    </Grid>
                </Paper>

                {orderdetails.map((order) =>
                    <Grid sx={{ margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>

                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            Order Id: {order.id}
                                            {order.foodname} &emsp;  &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;
                                            &emsp; &emsp; ₹{order.cost}
                                            <br></br>
                                            Quantity: {order.quantity}
                                            <br></br>
                                            Vendor Details: {order.vendoremail}
                                            <br></br>
                                            Rating: {order.rating}
                                            <br></br>
                                            &emsp;
                                            Status: {order.status}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default MyOrder;
