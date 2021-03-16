const express = require('express');
const app = express();
const cors = require('cors');
const quotes = require("./api/quotes")

//middleware

app.use(cors());
app.use(express.json()); //req body


//Routes
app.use('/api/auth', require('./routes/jwtAuth'))


// dashboard

app.use('/api/dashboard', require("./routes/dashboard"))

// quotes api

app.get('/api/quotes', (req, res) => {
    try {
       const response =  quotes[Math.floor(Math.random() * 22)];
       res.json(response)
    } catch (error) {
        console.log(error.message)
    }
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server has started on http://localhost:5000")
});
