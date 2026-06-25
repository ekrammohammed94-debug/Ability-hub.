
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/devicesDB")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));


// Device Schema
const deviceSchema = new mongoose.Schema({
    name: String,
    condition: String,
    price: String,
    image: String
});

const Device = mongoose.model("Device", deviceSchema);


// Get All Devices
app.get("/devices", async (req, res) => {
    const devices = await Device.find();
    res.json(devices);
});


// Add Device
app.post("/devices", async (req, res) => {

    const newDevice = new Device({
        name: req.body.name,
        condition: req.body.condition,
        price: req.body.price,
        image: req.body.image
    });

    await newDevice.save();

    res.json({
        message: "Device Added Successfully"
    });
});


// Request Device
app.post("/request/:id", async (req, res) => {

    const device = await Device.findById(req.params.id);

    if (!device) {
        return res.status(404).json({
            message: "Device Not Found"
        });
    }

    res.json({
        message: `Request sent for ${device.name}`
    });
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
