import { useState, useEffect } from "react";
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
import { v4 as uuid } from "uuid";
import { Box } from "@mui/system";

const AddItems = (props) => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [category, setCategory] = useState("");
    const [details, setDetails] = useState([]);
    const [addons, setAddons] = useState([]);
    const [currentaddon, setCurrentAddon] = useState("")
    const [addonprice, setAddonPrice] = useState("")
    const [tags, setTags] = useState([]);
    const [currenttag, setCurrentTag] = useState("")
    const [toadd, settoAdd] = useState("");
    const [toaddtags, settoAddTags] = useState("");
    const [auth_email, setAuthEmail] = useState("");

    const navigate = useNavigate();

    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };

    const onChangeRating = (event) => {
        setRating(event.target.value);
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

    const resetInputs = () => {
        setName("");
        setEmail("");
        setPrice("");
        setRating("");
        setCategory("");
        setAddons([]);
        setTags([]);
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

    if (!auth_email)
        setAuthEmail(localStorage.getItem('Authentication'));

    const onSubmit = (event) => {
        event.preventDefault();

        const newFood = {
            id: uuid(),
            name: name,
            shop: details.shop,
            price: price,
            rating: 0,
            category: category,
            addons: addons,
            tags: tags,
            itemssold: 0,
        }

        console.log(newFood);
        axios
            .post("http://localhost:4000/food/additems", newFood)
            .then((response) => {
                alert("Added food item " + response.data.name);
                console.log(response.data);
                navigate("/")
            });

        resetInputs();
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

    const onAdding = (event) => {
        settoAdd(1);
    };

    const onAddingTags = (event) => {
        settoAddTags(1);
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
        alert("Added Food Tag " + newTag.name);
        resetTag();
    };
    console.log(toadd);
    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={onChangeName}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="filled"
                    value={auth_email}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Price"
                    variant="outlined"
                    value={price}
                    onChange={onChangePrice}
                />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
                <Button variant="contained" onClick={onAdding}>
                    Add Addons
                </Button>
            </Grid>
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
                <Button variant="contained" onClick={onAddingTags}>
                    Add Tags
                </Button>
            </Grid>
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
                <Button variant="contained" onClick={onSubmit}>
                    Add Item
                </Button>
            </Grid>

        </Grid >
    );
};



export default AddItems;
