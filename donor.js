
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const donors = [];


// Register Donor
app.post("/donor/register", async (req, res) => {

    const {
        name,
        email,
        password,
        phone
    } = req.body;

    const existingDonor =
        donors.find((d) => d.email === email);

    if (existingDonor) {

        return res.status(400).send(
            "Donor already exists");

    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    donors.push({

        name,
        email,
        password: hashedPassword,
        phone

    });

    res.send("Donor registered");

});



// Login Donor
app.post("/donor/login", async (req, res) => {

    const { email, password } = req.body;

    const donor =
        donors.find((d) => d.email === email);

    if (!donor) {

        return res.status(400).send(
            "Invalid email");

    }

    const match =
        await bcrypt.compare(
            password,
            donor.password
        );

    if (!match) {

        return res.status(400).send(
            "Wrong password");

    }

    res.json({

        message: "Login successful",

        donor: {

            name: donor.name,
            email: donor.email,
            phone: donor.phone

        }

    });

});


app.listen(4000, () => {

    console.log(
        "Donor server running on port 4000");

});
