const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/charityDB")
    .then(() => console.log("MongoDB Connected"));

// الجمعية Schema
const charitySchema = new mongoose.Schema({

    name: String,
    email: String,
    password: String,
    phone: String,
    address: String

});

const Charity = mongoose.model("Charity", charitySchema);


// Register جمعية
app.post("/charity/register", async (req, res) => {

    const { name, email, password, phone, address } = req.body;

    const existingCharity = await Charity.findOne({ email });

    if (existingCharity) {
        return res.status(400).send("Charity already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCharity = new Charity({
        name,
        email,
        password: hashedPassword,
        phone,
        address
    });

    await newCharity.save();

    res.send("Charity registered successfully");

});


// Login جمعية
app.post("/charity/login", async (req, res) => {

    const { email, password } = req.body;

    const charity = await Charity.findOne({ email });

    if (!charity) {
        return res.status(400).send("Invalid email");
    }

    const match = await bcrypt.compare(password, charity.password);

    if (!match) {
        return res.status(400).send("Wrong password");
    }

    res.json({
        message: "Login successful",
        charity: {
            name: charity.name,
            email: charity.email,
            phone: charity.phone,
            address: charity.address
        }
    });

});


// إضافة جهاز
const deviceSchema = new mongoose.Schema({

    name: String,
    condition: String,
    price: String,
    image: String

});

const Device = mongoose.model("Device", deviceSchema);


app.post("/devices", async (req, res) => {

    const newDevice = new Device(req.body);

    await newDevice.save();

    res.send("Device added");

});


// عرض الأجهزة
app.get("/devices", async (req, res) => {

    const devices = await Device.find();

    res.json(devices);

});


app.listen(3000, () => {

    console.log("Server running on port 3000");

});
