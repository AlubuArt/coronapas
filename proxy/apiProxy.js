const express = require('express')
const app = express()
const axios = require('axios');
const router = express.Router();

const port = process.env.PORT || 8080;


router.get("/", async (req, res) => {
    const name = process.env.NAME || "World";
    res.send(`Hello World ${name}!`);

})


app.listen(port, () => {
    console.log(`helloworld: listening on port ${port}!`)
})
