import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { Menu, MenuItem, MenuList } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Box } from "@mui/system";

const MyOrder = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState("");
    const [details, setDetails] = useState([]);
    const [orderdetails, setOrderDetails] = useState([]);
    const [orders, setOrders] = useState([]);
    const [auth_email, setAuthEmail] = useState("");

    const navigate = useNavigate();

    const addItems = (event) => {
        //console.log("Hi")
        navigate("/additems")
    };

    const onChangeRating = (event) => {
        setRating(event.target.value);
    };

    if (!auth_email)
        setAuthEmail(localStorage.getItem('Authentication'));

    const refreshPage = () => {
        window.location.reload();
    }
    useEffect(() => {
        axios
            .post("http://localhost:4000/user/profile", { email: auth_email })
            .then((response) => {
                //  console.log("Repeat?");
                setDetails(response.data);
                console.log(details);
                axios
                    .post("http://localhost:4000/food/orderdetails", { buyeremail: auth_email, shop: response.data.shop })
                    .then((response2) => {
                        setOrders(response2.data);
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const nextStage = (order) => {
        axios
            .post("http://localhost:4000/food/orderupdate", { orderid: order.id })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const saveRating = (order) => {
        axios
            .post("http://localhost:4000/food/orderrating", { orderid: order.id, orderrating: rating, foodid: order.foodid })
            .then((response) => {
                alert("Thank you for rating");
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const rejectOrder = (order) => {
        axios
            .post("http://localhost:4000/food/orderreject", { orderid: order.id, setstatus: 5 })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    console.log(orders);
    return (
        <div>
            <Grid item xs={12} md={9} lg={9}>
                <Paper>
                    <Grid item xs={12} align={"center"}>
                        <h2>My Orders</h2>
                    </Grid>
                </Paper>

                {orders.map((order) =>
                    <Grid sx={{ margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" component="div">

                                            Order Item: {order.foodname}
                                            <br></br>
                                            ₹{order.cost}
                                            <br></br>
                                            Quantity: {order.quantity}
                                            <br></br>
                                            Vendor Details: {order.vendoremail}
                                            <br></br>
                                            Rating: {order.rating}
                                            <br></br>
                                            Status: {order.statusstring}
                                            {(details.type === 'Vendor' && order.status < 3 ? (
                                                <Grid item xs={12} padding={2}>
                                                    <Button variant="contained" onClick={() => nextStage(order)}>
                                                        Move to next stage
                                                    </Button>
                                                </Grid>
                                            ) : "")}
                                            {(details.type === 'Vendor' && order.status == '0' ? (
                                                <Grid item xs={12} padding={2}>
                                                    <Button variant="contained" onClick={() => rejectOrder(order)}>
                                                        Reject Order
                                                    </Button>
                                                </Grid>
                                            ) : "")}
                                            {(details.type === 'Buyer' && order.status == '3' ? (
                                                <Grid item xs={12} padding={2}>
                                                    <Button variant="contained" onClick={() => nextStage(order)}>
                                                        Picked Up
                                                    </Button>
                                                </Grid>
                                            ) : "")}
                                            {(details.type === 'Buyer' && order.status == '4' ? (
                                                <Grid item xs={12} padding={2}>
                                                    <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={rating}
                                                        label="Rating"
                                                        autoWidth
                                                        onChange={onChangeRating}
                                                    >
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                        <MenuItem value={5}>5</MenuItem>
                                                    </Select>
                                                </Grid>
                                            ) : "")}
                                            {(details.type === 'Buyer' && order.status == '4' ? (
                                                <Grid item xs={12} padding={2}>
                                                    <Button variant="contained" onClick={() => saveRating(order)}>
                                                        Save Rating
                                                    </Button>
                                                </Grid>
                                            ) : "")}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br></br><br></br>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default MyOrder;
