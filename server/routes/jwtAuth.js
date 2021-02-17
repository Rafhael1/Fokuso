const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator")

router.post("/register", async(req,res) => {
    try {

        // destructure req.body
        const { name, email, password } = req.body;

        // Check if user exists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        
        if(user.rows.length !== 0) {
            console.log("User already exist")
            return res.status(401).send("User already exist");
        }

        // Bcrypt user's password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const bcryptPassword = bcrypt.hash(password, salt)
       
        // insert new user into db

        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *", [
            name, email, bcryptPassword
        ])

       // res.json(newUser.rows[0])

        // generate jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token })


    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router;