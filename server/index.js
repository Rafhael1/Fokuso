const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const pool = require("./db");
const quotes = require("./api/quotes")

//middleware

app.use(cors());
app.use(express.json()); //req body


//Routes
app.use('/auth', require('./routes/jwtAuth'))


// dashboard

app.use('/dashboard', require("./routes/dashboard"))

// quotes api

app.get('/quotes', (req, res) => {
    try {
       const response =  quotes[Math.floor(Math.random() * 4)];
       res.json(response)
    } catch (error) {
        console.log(error.message)
    }
})



app.listen(port, () => {
    console.log("Server has started on http://localhost:5000")
});