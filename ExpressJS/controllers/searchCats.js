// also a controller, just large enough for its own module !
const axios = require("axios");
const Cats = require("../models/Cats");
const { getTokenPF } = require("../middleware/petfinderINIT");

async function searchCats(req, res) {
  try {
    const access = await getTokenPF();

    //const location = req.query.location;
    // choosing location by either city,state combo OR zip code:
    let location = req.query.zip;
    if (!location) {
      const {city,state} = req.query;
      if (city && state) location = `${city},${state}`; 
    }

    if (!location) {
      return res.status(400).json({ error: "Please provide a city and state OR a zip code." });
    }


    const gender = req.query.gender;
    const age = req.query.age;
    const limit = 40; // find the most relevant 40 cats

    const { data } = await axios.get("https://api.petfinder.com/v2/animals", {
      headers: { Authorization: "Bearer " + access },
      params: {
        type: "cat",
        status: "adoptable",
        limit,
        location,
        gender,
        age
      }
    });

    // remove old Petfinder results in all of DB (search cache !)
    await Cats.deleteMany({ source: "petfinder" });

    // Format incoming data
    const cats = data.animals.map(c => ({
      pfID: c.id,
      name: c.name,
      pfURL: c.url,
      age: c.age,
      status: c.status,
      gender: c.gender,
      description: c.description ?? "",
      city: c.contact?.address?.city ?? "",
      state: c.contact?.address?.state ?? "",
      imageURL: c.photos?.[0]?.medium ?? "",
      source: "petfinder"
    }));

    // Insert new results
    await Cats.insertMany(cats);

    res.json({ cached: cats.length });
  } catch (e) {
    console.error(e.response?.data || e);
    res.status(500).json({ error: "Search failed" });
  }
}

module.exports = { searchCats };
