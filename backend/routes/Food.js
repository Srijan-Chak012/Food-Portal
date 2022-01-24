var express = require("express");
const { type } = require("express/lib/response");
var router = express.Router();

// Load User model
const Food = require("../models/Food");

router.post("/", (req, res) => {
    // Find user by email
    Food.find().then(food => {
        console.log(req.body);
        // Check if user email exists
        if (!food) {

            return res.status(400).json({
                error: "Food Registry Blank",
            });
        }
        else {
            console.log(food);
            return res.status(200).json(food);
        }
    });
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/additems", (req, res) => {
    console.log(req.body);

    const newFood = new Food({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        price: req.body.price,
        rating: req.body.rating,
        category: req.body.category,
        addons: req.body.addons,
        tags: req.body.tags
    });

    console.log(newFood);
    newFood.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(401).send(err);
        });
});

// POST request 
// Login
router.post("/details", (req, res) => {
    const email = req.body.email;
    // Find user by email
    Food.find({ email }).then(food => {
        console.log(req.body);
        // Check if user email exists
        if (!food) {

            return res.status(400).json({
                error: "No food item registered with this email",
            });
        }
        else {
            console.log(food);
            return res.status(200).json(food);
        }
    });
});


router.post("/itemdetails", (req, res) => {
    const id = req.body.id;
    console.log(req.body)
    // Find user by email
    Food.findOne({ id }).then(food => {
        console.log(id);
        // Check if user email exists
        if (!food) {
            return res.status(401).json({
                error: "Item not found",
            });
        }
        else {
            return res.status(200).json(food);
        }
    });
});

router.post("/deleteitem", (req, res) => {
    const id = req.body.id;
    console.log(req.body);
    console.log(id);
    // Find user by email
    Food.deleteOne({ id })
        .then((result) => {
            res.status(200).json({
                message: "Item Deleted",
                result,
            });
        })

        .catch((err) => {
            res.status(402).json({
                message: "Error occurred, could not be deleted",
                error: err,
            })
        });
});

router.post("/itemupdate", (req, res) => {
    const id = req.body.id;
    // Find user by email
    console.log(id);
    console.log(req.body);
    Food.findOne({ id }).then(food => {
        console.log(req.email);
        // Check if user email exists
        if (!food) {
            return res.status(401).json({
                error: "Account not found",
            });

        }
        else {
            if (req.body.name) {
                food.name = req.body.name;
            }
            if (req.body.price) {
                food.price = req.body.price;
            }
            if (req.body.category) {
                food.category = req.body.category;
            }
            if (req.body.addons) {
                food.addons = req.body.addons;
            }
            if (req.body.tags) {
                food.tags = req.body.tags;
            }

            food.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
    });
});

module.exports = router;

