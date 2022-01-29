var express = require("express");
const { type } = require("express/lib/response");
var router = express.Router();

// Load User model
const Food = require("../models/Food");
const Order = require("../models/Orders");
const Vendor = require("../models/Vendors");
const Buyer = require("../models/Users");
const nodemailer = require("nodemailer");

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
        shop: req.body.shop,
        price: req.body.price,
        rating: req.body.rating,
        category: req.body.category,
        addons: req.body.addons,
        tags: req.body.tags,
        itemssold: req.body.itemssold,
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
    const shop = req.body.shop;
    // Find user by email
    Food.find({ shop }).then(food => {
        console.log(req.body);
        console.log("Moron");
        console.log(shop);
        // Check if user email exists
        if (!food) {

            return res.status(400).json({
                error: "No food item registered with this shop",
            });
        }
        else {
            console.log(food);
            return res.status(200).json(food);
        }
    });
});

router.post("/orderdetails", (req, res) => {
    const buyeremail = req.body.buyeremail;
    const shop = req.body.shop;
    console.log(buyeremail);
    console.log(shop);
    // Find user by email
    Order.find({ buyeremail }).then(order => {
        console.log("Sleepy");
        // Check if user email exists
        if (!order.length) {
            Order.find({ shop }).then(orderitem => {
                if (!orderitem) {
                    return res.status(401).json({
                        error: "No Order registered with this email",
                    });
                }
                else {
                    console.log("Vendor Order Details");
                    console.log(orderitem);
                    return res.status(200).json(orderitem);
                }
            });
        }
        else {
            console.log("Order Details");
            console.log(order);
            return res.status(200).json(order);
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

router.post("/shopname", (req, res) => {
    const email = req.body.email;
    console.log(req.body)
    // Find user by email
    Vendor.aggregate([
        {
            $lookup: {
                from: "foods",
                localField: "shop",
                foreignField: "shop",
                as: "foods"
            },
        },
    ])
        .then((products) => {
            console.log(products);
            console.log("Right here")
            return res.status(200).json(products);
        })
        .catch(err => {
            console.log(err);
            console.log("Right here")
            res.status(401).send(err);
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

            if (req.body.itemssold) {
                food.itemssold = req.body.itemssold;
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

router.post("/orderupdate", (req, res) => {
    const id = req.body.orderid;
    // Find user by email
    console.log(id);
    console.log(req.body);
    Order.findOne({ id }).then(order => {
        // Check if user email exists
        if (!order) {
            return res.status(401).json({
                error: "Order not found",
            });

        }
        else {
            let temp = order.status;
            if (temp < 4) {
                temp = temp + 1;
            }
            console.log(temp);
            let temp2 = order.statusstring;
            console.log(temp2);
            switch (parseInt(temp)) {
                case 0: temp2 = "Placed";
                    break;
                case 1: temp2 = "Accepted";
                    break;
                case 2: temp2 = "Cooking";
                    break;
                case 3: temp2 = "Ready For Pickup"
                    break;
                case 4: temp2 = "Completed"
                    break;
                case 5: temp2 = "Rejected"
                    break;
            }
            console.log(order.status);
            order.status = temp;
            order.statusstring = temp2;

            order.save()
                .then(user => {
                    res.status(200).json(user);
                    console.log(temp);
                    console.log(temp2);
                })
                .catch(err => {
                    res.status(401).send(err);
                });
        }
    });
});

router.post("/ordernumbers", (req, res) => {
    const shop = req.body.shop;
    let completedorder = 0;
    let pendingorder = 0;
    let totalorder = 0;
    // Find user by email
    console.log("Yo mamma");
    console.log(shop);
    console.log(req.body);
    Order.find({ shop }).then(order => {
        // Check if user email exists
        console.log("Your mom");
        console.log(order);
        console.log(order.length);
        if (!order) {
            return res.status(401).json({
                error: "Order not found",
            });

        }
        else {
            let orderitem;
            totalorder = order.length;
            for (i = 0; i < order.length; i++) {
                orderitem = order[i];
                let temp = orderitem.status;
                if (temp < 4) {
                    pendingorder = pendingorder + 1;
                }

                else if (temp == 4) {
                    completedorder = completedorder + 1;
                }
                console.log(orderitem.status);
            }

            let newObject = {
                pendingorder: pendingorder,
                completedorder: completedorder,
                totalorder: totalorder
            }

            return res.status(200).json(newObject);
        }
    });
});

router.post("/orderrating", (req, res) => {
    const id = req.body.orderid;
    const rating = req.body.orderrating;
    const foodid = req.body.foodid;
    // Find user by email
    console.log(id);
    console.log(rating);
    console.log(req.body);
    Order.findOne({ id }).then(order => {
        // Check if user email exists
        if (!order) {
            return res.status(401).json({
                error: "Order not found",
            });

        }
        else {
            console.log(order.status);
            order.rating = rating;

            Food.findOne({ id: foodid }).then(food => {
                // Check if user email exists
                if (!food) {
                    return res.status(401).json({
                        error: "Food not found",
                    });

                }
                else {
                    console.log(food);

                    food.rating = ((food.rating * (food.itemssold - 1)) + rating) / (food.itemssold);

                    food.save()
                        .then(user => {
                            //    res.status(200).json(user);
                            console.log(rating);


                            order.save()
                                .then(user2 => {
                                    res.status(200).json(user2);
                                    console.log(rating);
                                })
                                .catch(err => {
                                    res.status(401).send(err);
                                });
                        })
                        .catch(err => {
                            res.status(401).send(err);
                        });
                }
            });
        }

    });
});

router.post("/orderreject", (req, res) => {
    const id = req.body.orderid;
    const temp = req.body.setstatus;
    // Find user by email
    console.log(id);
    console.log(temp);
    console.log(req.body);
    Order.findOne({ id }).then(order => {
        // Check if user email exists
        if (!order) {
            return res.status(401).json({
                error: "Order not found",
            });

        }
        else {
            if (temp < 4) {
                temp = temp + 1;
            }
            console.log(temp);
            let temp2 = order.statusstring;
            console.log(temp2);
            switch (parseInt(temp)) {
                case 0: temp2 = "Placed";
                    break;
                case 1: temp2 = "Accepted";
                    break;
                case 2: temp2 = "Cooking";
                    break;
                case 3: temp2 = "Ready For Pickup"
                    break;
                case 4: temp2 = "Completed"
                    break;
                case 5: temp2 = "Rejected"
                    break;
            }
            console.log(order.status);
            order.status = temp;
            order.statusstring = temp2;

            order.save()
                .then(user => {
                    res.status(200).json(user);
                    console.log(temp);
                    console.log(temp2);
                })
                .catch(err => {
                    res.status(401).send(err);
                });
        }
    });
});

router.post("/orderadd", (req, res) => {
    console.log("Mummy");

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "canteenportal.vendor@gmail.com",
            pass: "Srijan12",
            clientId: "286999355505-ub6cailg5g7nc9l605md0hn3rq98mv6v.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "1//043M8gT9wqE2zCgYIARAAGAQSNwF-L9IrLMQ5aWxsZOFotKH2yhy-8Fuel9g-PlYj5kfP-J1g4kBG90WEHPSc7cIk9VQHbr_Mavw",
        },
    });

    transporter.verify((err, success) => {
        err
            ? console.log(err)
            : console.log(`=== Server is ready to take messages: ${success} ===`);
    });

    let mailOptions = {
        from: "canteenportal.vendor@gmail.com",
        to: req.body.buyeremail,
        subject: "Nodemailer API",
        text: "Your order has been placed, please wait!",
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    });

    console.log(req.body);
    let temp = req.body.status;
    let temp2 = req.body.statusstring;

    switch (temp) {
        case 0: temp2 = "Placed"
    }
    const newOrder = new Order({
        id: req.body.id,
        foodid: req.body.foodid,
        foodname: req.body.foodname,
        shop: req.body.shop,
        buyeremail: req.body.buyeremail,
        cost: req.body.cost,
        rating: req.body.rating,
        addons: req.body.addons,
        status: req.body.status,
        quantity: req.body.quantity,
        statusstring: temp2,
    });

    console.log(newOrder);
    console.log("Hi");
    newOrder.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(401).send(err);
        });
});

router.post("/returntags", (req, res) => {
    console.log(req.body);

    const newOrder = new Order({
        id: req.body.id,
        foodid: req.body.foodid,
        foodname: req.body.foodname,
        vendoremail: req.body.vendoremail,
        buyeremail: req.body.buyeremail,
        cost: req.body.cost,
        rating: req.body.rating,
        addons: req.body.addons,
        status: req.body.status,
        quantity: req.body.quantity
    });

    console.log(newOrder);
    console.log("Hi");
    newOrder.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(401).send(err);
        });
});

module.exports = router;

