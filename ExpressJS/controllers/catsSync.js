// THIS ENDPOINT IS NOT YET FINISHED AND NEEDS TO BE TESTED!@!!!!!!!!! - JP
// this endpoint is to obtain tokens and manage receiving cats from petfinder API
const access = await getToken(); // get token from petfinder

import axios from "axios";
import Cats from "../models/cats.js";
import {getToken} from "./petfinderINIT.js"; // import getToken function to get token from petfinder API

export async function syncCats(req, res) {
    try {
        const access = await getToken(); // get token from petfinder
        const { data } = await axios.get(
            "https://api.petfinder.com/v2/animals",
            {
                headers: { Authorization: 'Bearer ' + access },
                params: {
                    type: "cat",
                    status: "adoptable",
                    limit: 50,
                    location: "32701",
                    gender: "male, female, unknown",
                    age: "baby, young, adult, senior"
            }
        }
    );

    // after the API is called and retrieves data, will pull this data and place it in the cats schema as a Cat.
    const cats = data.cats.map( c => ({
        pfID: c.id, // NEED TO ADD THIS TO SCHEMA FOR UPDATING ENTRIES IN DB!!!!!!!!!!
        name: c.name,
        age: c.age,
        status: c.status,
        gender: c.gender,
        city: c.contact.address.city ? c.contact.address.city : "",
        state: c.contact.address.state ? c.contact.address.state : "",
        description: c.description ?? "",
        imageURL: c.photos[0]?.medium ?? ""
    }));

    // update all in the schema via petfinder ID 
    await Promise.all(
        cats.map(c =>
            Cats.findOneAndUpdate(
                { pfID: c.pfID }, // find the cat by pfID
                c, // update the cat with the new data
                { upsert: true, new: true } // create a new entry if it doesn't exist
            ))
        );
        res.json({ saved: docs.length });
    } catch (e) {
      console.error(e.response?.data || e);
      res.status(500).json({ error: "Sync failed" });
    }
  }
    
