import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { Menu, MenuItem, MenuList } from "@mui/material";
import { SystemSecurityUpdateRounded, TagFaces } from "@mui/icons-material";
import InputAdornment from '@mui/material/InputAdornment';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { v4 as uuid } from "uuid";
import { Box } from "@mui/system";

const BuyItems = (props) => {
    const [details, setDetails] = useState("");
    const [profile, setProfile] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [addons, setAddons] = useState([]);
    const [currentaddon, setCurrentAddon] = useState("");
    const [addonprice, setAddonPrice] = useState("");
    const [tags, setTags] = useState([]);
    const [currenttag, setCurrentTag] = useState("");
    const [toadd, settoAdd] = useState("");
    const [toaddtags, settoAddTags] = useState("");
    const [auth_id, setAuthId] = useState("");
    const [auth_email, setAuthEmail] = useState("");
    const [addonscost, setAddonsCost] = useState(0);
    console.log(auth_id);

    const navigate = useNavigate();
    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };

    const onChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const onChangeTags = (event) => {
        setTags(event.target.value);
    };

    const onChangeAddonName = (event) => {
        setCurrentAddon(event.target.value);
    };

    const onChangeQuantity = (event) => {
        setQuantity(event.target.value);
    };

    const onChangeAddonPrice = (event) => {
        setAddonPrice(event.target.value);
    };

    const onChangeCurrenTag = (event) => {
        setCurrentTag(event.target.value);
    };

    // const useEffect = (event) => { // passed variable, change later

    function refreshPage() {
        window.location.reload(false);
    }
    if (!auth_email)
        setAuthEmail(localStorage.getItem('Authentication'));
    useEffect(() => {
        let temp = localStorage.getItem('FoodId');
        console.log(localStorage.getItem('FoodId'));
        setAuthId(temp);
        console.log(temp);
        axios
            .post("http://localhost:4000/user/profile", { email: auth_email })
            .then((response) => {
                //  console.log("Repeat?");
                setProfile(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .post("http://localhost:4000/food/itemdetails", { id: temp })
            .then((response) => {
                //  console.log("Repeat?");
                setDetails(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const onAddCurrent = (addon) => {
        const newAddOn = {
            name: addon.name,
            price: addon.price
        }

        let temp = addons;
        temp.push(newAddOn);
        console.log(temp);
        setAddons(temp);
        setAddonsCost(parseInt(addonscost) + parseInt(addon.price));
        console.log(addonscost);
        alert("Added Food Addon " + newAddOn.name);
    };
    console.log(profile);
    console.log(details);
    const onSave = (event) => {
        //console.log("Hi")
        event.preventDefault();

        const newOrder = {
            id: uuid(),
            foodid: details.id,
            foodname: details.name,
            shop: details.shop,
            buyeremail: auth_email,
            cost: (details.price + parseInt(addonscost)) * quantity,
            quantity: quantity,
            rating: 0,
            addons: details.addons,
            status: 0,
            statusstring: "",
        }

        console.log(addonscost);
        console.log(newOrder.cost);
        console.log(details.price);
        const newFood = {
            id: details.id,
            itemssold: details.itemssold + 1,
        }

        console.log((details.price + addonscost) * quantity);
        axios
            .post("http://localhost:4000/food/orderadd", newOrder)
            .then((response) => {
                alert("Placed order for " + quantity + " items of " + details.name);
                let temp = -((details.price + addonscost) * quantity);
                axios
                    .post("http://localhost:4000/user/profileupdate", {email: auth_email, wallet: temp})
                    .then((response) => {
                        console.log(response.data);
                        navigate("/")
                    });

                // console.log(response.data);
                console.log(temp);
                navigate("/")
            });

        axios
            .post("http://localhost:4000/food/itemupdate", newFood)
            .then((response) => {
                setDetails(response.data)
                // console.log(response.data);
                navigate("/")
            });

        console.log(details.itemssold);
    };
    // };
    if (details)
        return (
            <Grid container align={"center"} spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <Grid item xs={12}>
                                <TextField
                                    id="filled-read-only-input"
                                    label="Item Name"
                                    defaultValue={details.name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                />
                            </Grid>
                            <br></br>
                            <Grid item xs={12}>
                                <TextField
                                    id="filled-read-only-input"
                                    label="Vendor Shop"
                                    defaultValue={details.shop}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                />
                            </Grid>

                            {(details.category === "Veg" ? (
                                <Grid item xs={12} padding={2}>
                                    <TextField
                                        id="filled-read-only-input"
                                        label="Category"
                                        defaultValue={"Vegetarian"}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="filled"
                                    />
                                </Grid>

                            ) : <Grid item xs={12} padding={2}>
                                <TextField
                                    id="filled-read-only-input"
                                    label="Category"
                                    defaultValue={"Non-Vegetarian"}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                />
                            </Grid>
                            )}
                            <Grid item xs={12} padding={2}>
                                <TextField
                                    id="filled-read-only-input"
                                    label="Price"
                                    defaultValue={details.price}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                />
                            </Grid>

                        </FormControl>
                    </Box>
                </Grid >
                {details.addons.map((addon) =>
                    <Grid item xs={12}>
                        <Grid item xs={12} padding={2}>
                            <TextField
                                id="filled-read-only-input"
                                label="Addon Name"
                                defaultValue={addon.name}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={12} padding={2}>
                            <TextField
                                id="filled-read-only-input"
                                label="Addon Price"
                                defaultValue={addon.price}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={() => onAddCurrent(addon)}>
                                Add Addon
                            </Button>
                        </Grid >
                    </Grid>
                )}
                {details.tags.map((tag) =>
                    <Grid item xs={12}>
                        <Grid item xs={12} padding={2}>
                            <TextField
                                id="filled-read-only-input"
                                label="Tag Name"
                                defaultValue={tag.name}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                        </Grid>
                    </Grid>
                )}


                <Grid item xs={12}>
                    <Grid item xs={12} padding={2}>
                        <TextField
                            label="Quantity"
                            value={quantity}
                            variant="outlined"
                            onChange={onChangeQuantity}
                        />
                    </Grid>
                </Grid >

                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSave}>
                        {/* Edit button, save later */}
                        Order Item
                    </Button>
                </Grid >
            </Grid>
        );
    else return "";
};

export default BuyItems;

//Implement Wallet, Profile Editting, Fix constant requests and stuff
//do in afternoon