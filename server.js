const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: 'tocken123', //  secret key
    resave: false,
    saveUninitialized: false
}));

// Sample data store 
const users = [
    { id: 1, email: 'yadup123@gmail.com', password: 'yadu123' }
];


// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // authentication logic
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid user' });
    }

    // Set user session 
    req.session.user = user;

    res.status(200).json({ message: 'Login successful', user });
});

// Logout endpoint
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });
});

// handle registration
app.post('/register', (req, res) => {
    const { email, name, password } = req.body;

    // database or storage logic
   // just pushing to an array
    users.push({ email, name, password });

    console.log('New user registered:', { email, name });

    res.status(200).json({ message: 'Registration successful' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
