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
import { Box } from "@mui/system";

const EditItems = (props) => {
    const [details, setDetails] = useState("");
    const [name, setName] = useState("");
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
    useEffect(() => {
        let temp = localStorage.getItem('FoodId');
        console.log(localStorage.getItem('FoodId'));
        setAuthId(temp);
        console.log(temp);
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

    const onAdding = (details) => {
        details.addons = [];
        settoAdd(1);
    };

    const onAddingTags = (fooditem) => {
        details.tags = [];
        settoAddTags(1);
    };

    const resetAddon = () => {
        setCurrentAddon("");
        setAddonPrice("");
        settoAdd("");
    };

    const resetTag = () => {
        setCurrentTag("");
        settoAddTags("");
    };

    const onAddCurrent = (event) => {
        const newAddOn = {
            name: currentaddon,
            price: addonprice
        }

        let temp = addons;
        temp.push(newAddOn);
        console.log(temp);
        setAddons(temp);
        details.addons = addons;
        alert("Added Food Addon " + newAddOn.name);
        resetAddon();
    };

    const onAddTag = (event) => {
        const newTag = {
            name: currenttag
        }

        let temp2 = tags;
        temp2.push(newTag);
        setTags(temp2);
        details.tags = tags;
        alert("Added Food Tag " + newTag.name);
        resetTag();
    };
    console.log(details);
    const onSave = (event) => {
        //console.log("Hi")
        event.preventDefault();

        const newFood = {
            id: details.id,
            name: name,
            email: details.email,
            price: price,
            rating: details.rating,
            category: category,
            addons: details.addons,
            tags: details.tags
        }

        console.log(newFood);
        axios
            .post("http://localhost:4000/food/itemupdate", newFood)
            .then((response) => {
                alert("Updated " + response.data.name);
                // console.log(response.data);
                navigate("/")
            });
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
                                    label={details.name}
                                    variant="outlined"
                                    value={name}
                                    helperText="Name"
                                    onChange={onChangeName}
                                // InputProps={{
                                //   readOnly: true,
                                // }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={details.email}
                                    variant="filled"
                                    helperText="Email"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} padding={2}>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Type"
                                    autoWidth
                                    onChange={onChangeCategory}
                                >
                                    <MenuItem value={"Veg"}>Vegetarian</MenuItem>
                                    <MenuItem value={"NonVeg"}>Non-Vegetarian</MenuItem>
                                </Select>
                            </Grid>

                            <Grid item xs={12} padding={2}>
                                <TextField
                                    label={details.price}
                                    variant="outlined"
                                    value={price}
                                    helperText="Price"
                                    onChange={onChangePrice}

                                // InputProps={{
                                //   readOnly: true,
                                // }}
                                />
                            </Grid>
                        </FormControl>
                    </Box>
                </Grid >
                <Grid item xs={12}>
                    <Button variant="contained" onClick={() => onAdding(details)}>
                        {/* Edit button, save later */}
                        Reset Addons
                    </Button>
                </Grid >
                {(toadd ? (
                    <Grid item xs={12}>
                        <TextField
                            label="Addon Name"
                            variant="outlined"
                            value={currentaddon}
                            onChange={onChangeAddonName}
                        />
                    </Grid>
                ) : "")}
                {(toadd ? (
                    <Grid item xs={12}>
                        <TextField
                            label="Addon Price"
                            variant="outlined"
                            value={addonprice}
                            onChange={onChangeAddonPrice}
                        />
                    </Grid>
                ) : "")}
                {(toadd ? (
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={onAddCurrent}>
                            Add Current Addon
                        </Button>
                    </Grid>
                ) : "")}
                <Grid item xs={12}>
                    <Button variant="contained" onClick={() => onAddingTags(details)}>
                        {/* Edit button, save later */}
                        Reset Tags
                    </Button>
                </Grid >
                {(toaddtags ? (
                    <Grid item xs={12}>
                        <TextField
                            label="Tag"
                            variant="outlined"
                            value={currenttag}
                            onChange={onChangeCurrenTag}
                        />
                    </Grid>
                ) : "")}
                {(toaddtags ? (
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={onAddTag}>
                            Add Current Tag
                        </Button>
                    </Grid>
                ) : "")}
                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSave}>
                        {/* Edit button, save later */}
                        Save Changes
                    </Button>
                </Grid >
            </Grid>
        );
    else return "";
};

export default EditItems;

//Implement Wallet, Profile Editting, Fix constant requests and stuff
//do in afternoon