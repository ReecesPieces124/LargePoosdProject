// this file allows the petfinder token to be created for use within our API at numerous parts
const axios = require("axios");

let token;
let tokenExpiration = 0;

// allows us to receive the token from petfinder API and store it in a variable
async function getTokenPF() {
  if (Date.now() < tokenExpiration) return token;

  const { data } = await axios.post(
    "https://api.petfinder.com/v2/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: meta.import.env.PFAPI,
      client_secret: meta.import.env.PFSECRET
    })
  );

  token = data.access_token;
  // set the token expiration to 1 hour from now
  tokenExpiration = Date.now() + 3600 * 1000;
  return token;
}

module.exports = { getTokenPF };
