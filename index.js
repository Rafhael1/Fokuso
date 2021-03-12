const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const quotes = require("./api/quotes")
const path = require("path");
const send = require('send');

//middleware

app.use(cors());
app.use(express.json()); //req body

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./client/build")))
}

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

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

app.listen(port, () => {
    console.log(`Server has started on ${port}`)
});