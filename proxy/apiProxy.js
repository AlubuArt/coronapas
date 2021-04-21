const express = require('express')
const app = express()
const axios = require('axios');
const router = express.Router();

const port = process.env.PORT || 8080;


router.get("/people", async (req, res) => {

    let config = {
        method: 'get',
        url: `https://swapi.dev/api/people/${req}`,
    }

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  console.log(response.data)
  res.send(response.data)
  
})
.catch((error) => {
  console.log(error);
});

})


app.listen(port, () => {
    console.log(`helloworld: listening on port ${port}!`)
})
