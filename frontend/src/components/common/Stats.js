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

const Stats = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState("");
    const [details, setDetails] = useState([]);
    const [orderdetails, setOrderDetails] = useState([]);
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);
    const [stats, setStats] = useState([]);
    const [fooditems, setFoodItems] = useState([]);
    const [auth_email, setAuthEmail] = useState("");
    const [completedorder, setCompletedOrder] = useState(0);
    const [pendingorder, setPendingOrder] = useState(0);
    const [totalorder, setTotalOrder] = useState(0);

    const navigate = useNavigate();

    const onChangeRating = (event) => {
        setRating(event.target.value);
    };

    if (!auth_email)
        setAuthEmail(localStorage.getItem('Authentication'));

    const refreshPage = () => {
        window.location.reload();
    }


    const sortitemssold = () => {
        //console.log("Hi")
        const mydata = [].concat(items).sort((a, b) => (a.itemssold < b.itemssold ? 1 : -1));
        const result = mydata.filter(item => item.shop == details.shop);
        console.log(result);
        setItems(result);
    };

    const countorders = (fooditem) => {
        if (details.shop == fooditem.shop && fooditem.status < 4) {
            let temp = pendingorder;
            temp = temp + 1;
            setPendingOrder(temp);
        }

        else if (details.shop == fooditem.shop && fooditem.status == 4) {
            let temp2 = completedorder;
            temp2 = temp2 + 1;
            setCompletedOrder(temp2);
        }
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
                    .then((response) => {
                        setOrders(response.data);
                        setTotalOrder(response.data.length);
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });



                axios
                    .post("http://localhost:4000/food/ordernumbers", { shop: response.data.shop })
                    .then((response) => {
                        setStats(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });


                let temp;
                axios
                    .post("http://localhost:4000/food")
                    .then((response2) => {
                        temp = response2.data.filter(fooditem => (fooditem.shop == response.data.shop));
                        const mydata = [].concat(temp).sort((a, b) => (a.itemssold < b.itemssold ? 1 : -1));
                        mydata.length = 5;
                        setItems(mydata);
                        setFoodItems(mydata);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });


        sortitemssold();
    }, [])

    useEffect(() => {
        sortitemssold();
    }, [])

    console.log(orders);
    console.log(items);
    console.log(fooditems);
    console.log(details);
    console.log(stats);
    return (
        <div>
            <Grid item xs={12} md={9} lg={9}>
                <Paper>
                    <Grid item xs={12} align={"center"}>
                        <h2>Statistics</h2>
                    </Grid>
                </Paper>
            </Grid>

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
                                        <Typography gutterBottom variant="subtitle1" component="div">
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
                                        Rating: {fooditem.rating}
                                        <br></br>
                                    </Typography>
                                    <br></br>
                                </Grid>
                                <br></br>
                            </Grid>
                            <br></br>
                        </Grid>
                        <br></br>
                    </Grid>
                    <br></br>
                </Grid>
            )}

            <Grid item xs={12} md={9} lg={9}>
                <Paper>
                    <Grid item xs={12}>
                        <h4>Number of Total Orders: {stats.totalorder}</h4>
                    </Grid>
                    <Grid item xs={12}>
                        <h4>Number of Pending Orders: {stats.pendingorder}</h4>
                    </Grid>
                    <Grid item xs={12}>
                        <h4>Number of Completed Orders: {stats.completedorder}</h4>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
};

export default Stats;
