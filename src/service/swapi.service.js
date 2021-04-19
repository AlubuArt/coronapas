const axios = require('axios');

export const getPersonSwapi = async (req) => {

    var config = {
        method: 'get',
        url: `https://swapi.dev/api/people/${req}/`,
        headers: { }
      };

const data = await axios(config)
.then(function (response) {
  return response.data;
})
.catch(function (error) {
  console.log(error);
});

return data;
   
}


export const getHomeWorldFromSwapi = async (req) => {

  let param = req.homeworld
  var config = {
    method: 'get',
    url: `${param}`,
    headers: { }
  };

const data = await axios(config)
  .then(function (response) {
    return response.data
})
.catch(function (error) {
    console.log(error);
});

  return data.name;
}
 

