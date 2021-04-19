const axios = require('axios');

export const getPersonSwapi = async (req) => {

    var config = {
        method: 'get',
        url: `https://swapi.dev/api/people/${req}/`,
        headers: { }
      };

const data = await axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  return response.data;
})
.catch(function (error) {
  console.log(error);
});

return data;
   
}


