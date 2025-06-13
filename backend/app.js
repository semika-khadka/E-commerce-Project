import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 3001;
const uri = "mongodb+srv://enigmadts:aA4g2SPaujutURP1@aspire-ledger-cluster.w1fm4.mongodb.net/?retryWrites=true&w=majority";
import User from './model/user_model.js';


mongoose.connect(uri)
    .then(() => {
        console.log("Database Connected Successfully");
    }).catch((err) => {
        console.log('Error connecting to database', err);
    });


app.post("/register",

    async (req, res) => {
        try {
            // Extract fields from request body
            const { name, email, password, phoneNumber } = req.body;

            // Validate required fields
            if (!name || !email || !password || !phoneNumber) {
                return res.status(400).json({ message: 'Name, Email, password, and phone number are required' });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
            if (existingUser) {
                return res.status(409).json({ message: 'Email or phone number already registered' });
            }

            // Create new user
            const newUser = new User({
                name,
                email,
                password,
                phoneNumber
            });

            // Save user to MongoDB
            await newUser.save();

            // Send success response
            res.status(201).json({
                message: 'User registered successfully',
                user: { email, phoneNumber }
            });

        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ message: error.message });
        }
    }
)


//login
app.post('/login', async (req, res) => {
    try {
        // Extract fields from request body
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }


        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords (plain text comparison - not secure for production)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Send success response
        res.status(200).json({
            message: 'Login successful',
            user: { email: user.email, phoneNumber: user.phoneNumber }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Oops! Something Went Wrong' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});