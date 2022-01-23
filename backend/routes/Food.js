var express = require("express");
const { type } = require("express/lib/response");
var router = express.Router();

// Load User model
const Food = require("../models/Food");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Vendor.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/additems", (req, res) => {
    console.log(req.body);

    const newFood = new Food({
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

router.post("/profile", (req, res) => {
    const email = req.body.email;
    console.log(req.body)
    // Find user by email
    Vendor.findOne({ email }).then(vendor => {
        console.log(email);
        // Check if user email exists
        if (!vendor) {
            Buyer.findOne({ email }).then(buyer => {
                if (!buyer) {
                    return res.status(400).json({
                        error: "Account not found",
                    });
                }
                else {
                    return res.status(200).json(buyer);
                }
            })

        }
        else {
            return res.status(200).json(vendor);
        }
    });
});

module.exports = router;

