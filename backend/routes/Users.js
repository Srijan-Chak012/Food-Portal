var express = require("express");
const { type } = require("express/lib/response");
var router = express.Router();

// Load User model
const Buyer = require("../models/Users");
const Vendor = require("../models/Vendors");

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
router.post("/signup", (req, res) => {
    console.log(req.body);
    if (req.body.type == "Buyer") {
        const newBuyer = new Buyer({
            name: req.body.name,
            email: req.body.email,
            type: req.body.type,
            contact: req.body.contact,
            age: req.body.age,
            batch: req.body.batch,
            password: req.body.password,
            wallet: req.body.wallet
        });

        newBuyer.save()
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    }

    else if (req.body.type == "Vendor") {
        const newVendor = new Vendor({
            name: req.body.name,
            email: req.body.email,
            type: req.body.type,
            contact: req.body.contact,
            shop: req.body.shop,
            starttime: req.body.starttime,
            endtime: req.body.endtime,
            password: req.body.password
        });

        newVendor.save()
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    }

    else {
        res.status(400).send("Incorrect Type");
    }
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    // Find user by email
    Vendor.findOne({ email }).then(vendor => {
        console.log(req.body);
        // Check if user email exists
        if (!vendor) {
            Buyer.findOne({ email }).then(buyer => {
                if (!buyer) {
                    return res.status(400).json({
                        error: "Email not found",
                    });
                }
                else {
                    if (req.body.password == buyer.password) {
                        // console.log(buyer)
                        return res.status(200).json(buyer.email);
                    }
                    else {
                        // console.log(buyer.password);
                        return res.status(401).json({
                            error: "Incorrect Password",
                        });
                    }
                }
            })

        }
        else {
            if (req.body.password == vendor.password) {
                // console.log(vendor)
                return res.status(200).json(vendor.email);
            }
            else {
                // console.log(vendor.password);
                return res.status(401).json({
                    error: "Incorrect Password",
                });
            }
        }
    });
});

router.post("/profile", (req, res) => {
    const email = req.body.email;
    console.log(req.body);
    // Find user by email
    Vendor.findOne({ email }).then(vendor => {
        console.log("Hello");
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

router.post("/profileupdate", (req, res) => {
    const email = req.body.email;
    console.log("repeat?");
    // Find user by email
    Vendor.findOne({ email }).then(vendor => {
        console.log(email);
        // Check if user email exists
        if (!vendor) {
            Buyer.findOne({ email }).then(buyer => {
                if (!buyer) {
                    return res.status(401).json({
                        error: "Account not found",
                    });
                }
                else {
                    if (req.body.name) {
                        buyer.name = req.body.name;
                    }
                    if (req.body.contact) {
                        buyer.contact = req.body.contact;
                    }
                    if (req.body.age) {
                        buyer.age = req.body.age;
                    }
                    if (req.body.batch) {
                        buyer.batch = req.body.batch;
                    }
                    if (req.body.password) {
                        buyer.password = req.body.password;
                    }
                    if (req.body.wallet) {
                        buyer.wallet = parseInt(req.body.wallet) + parseInt(buyer.wallet);
                    }
                    if (req.body.favorites) {
                        buyer.favorites = req.body.favorites;
                    }


                    buyer.save()
                        .then(user => {
                            return res.status(200).json(user);
                        })
                        .catch(err => {
                            return res.status(400).send(err);
                        });
                }
            })

        }
        else {
            if (req.body.name) {
                vendor.name = req.body.name;
            }
            if (req.body.contact) {
                vendor.contact = req.body.contact;
            }
            if (req.body.shop) {
                vendor.shop = req.body.shop;
            }
            if (req.body.starttime) {
                vendor.starttime = req.body.starttime;
            }
            if (req.body.endtime) {
                vendor.endtime = req.body.endtime;
            }
            if (req.body.password) {
                vendor.password = req.body.password;
            }


            vendor.save()
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

