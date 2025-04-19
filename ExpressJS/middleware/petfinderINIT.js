// Init for the petfinder API in order to get everything loaded in.
import axios from "axios";

// token information
let token, tokenExpiration = 0;

// getToken should be called before any other API calls to ensure a valid token is used
// function establishes a token in order to use petfinder API !
export async function getToken() {
    // give token if it hasn't expired
    if (Date.now() < tokenExpiration) return token;

    const { data } = await axios.post(
    'https://api.petfinder.com/v2/oauth2/token',
    new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'OUR_PF_KEY_ENV',
        client_secret: 'OUR_PF_SECRET_ENV'
    })
    );

    // receives a token and sets expiration time
    token = data.access_token;
    tokenExpiration = Date.now() + 3600 * 1000; // 1 hour until expiration
    // returns new token
    return token;
}
