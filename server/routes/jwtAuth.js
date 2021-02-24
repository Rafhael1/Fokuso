const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require('../middleware/validInfo');
const authorization = require("../middleware/authorization")

router.post("/register", validInfo, async(req,res) => {
    const { name, email, password } = req.body;
    try {


        // Check if user exists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        
        if(user.rows.length > 0) {
            console.log("User already exist")
            return res.status(401).send("User already exist");
        }

        // Bcrypt user's password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const bcryptPassword = await bcrypt.hash(password, salt)
       
        // insert new user into db

        let newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING user_name, user_email", [
            name, email, bcryptPassword
        ])


        const token = jwtGenerator(newUser.rows[0].user_id);

        return res.json({ token })


    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
});

router.post("/login", validInfo, async(req,res) => {

    const { email, password } = req.body;

    try {

        // check if user exist

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if(user.rowCount.length === 0) {
            return res.status(401).json("Password or email is incorrect")
        }

        //check if incoming password is the same 

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword){
            return res.status(401).json(
                "Password or Email is incorrect"
            )
        }

        const jwtToken = jwtGenerator(user.rows[0].user_id);
        return res.json({ jwtToken });

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

router.post("/verify", authorization, async(req, res) => {
    try {

        res.json(true);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router;