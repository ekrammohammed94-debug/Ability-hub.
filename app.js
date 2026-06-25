import express from "express";
import bcrypt from "bcrypt";
const app = express();
const PORT = 3000;
// in memory user store
const users = [];

app.use(express.json());


app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        //find user
        const findUser = users.find((data) => email == data.email);
        if (findUser) {
            res.status(400).send("User already exists!");
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ email, password: hashedPassword });
        console.log(users);
        res.status(201).send("User registered successfully!");
    } catch (err) {
        res.status(500).send("Error registering user");
    }
});
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        //find user
        const findUser = users.find((data) => email == data.email);
        if (!findUser) {
            res.status(400).send("wrong email or password !");
        }
        // Compare password
        const passwordMatch = await bcrypt.compare(password, findUser.password);
        if (passwordMatch) {
            res.status(200).json({
                message: "Login successful",
                user: {
                    name: findUser.name,
                    email: findUser.email
                }
            });

        } else {
            res.status(400).send("wrong email or password !");
        }

    } catch (err) {
        res.status(500).send("Error logging in");
    }
});
app.listen(PORT, () => {
    console.log("Server is started on port 3000");
});

