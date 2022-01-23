var express = require("express");
var router = express.Router();

// Load User model
const Vendor = require("../models/Vendors");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    Vendor.find(function(err, vendors) {
		if (err) {
			console.log(err);
		} else {
			res.json(vendors);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newVendor = new Vendor({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date
    });

    newVendor.save()
        .then(vendor => {
            res.status(200).json(vendor);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
	const email = req.body.email;
	// Find user by email
	Vendor.findOne({ email }).then(vendor => {
		// Check if user email exists
		if (!vendor) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            res.send("Email Found");
            return vendor;
        }
	});
});

module.exports = router;

