// also a controller, just large enough for its own module !
const axios = require("axios");
const Cats = require("../models/Cats");
const { getTokenPF } = require("../middleware/petfinderINIT");

async function searchCats(req, res) {
  try {
    const access = await getTokenPF();

    //const location = req.query.location;
    // choosing location by either city,state combo OR zip code:
/* -------- 1.  normalise location input -------- */
let { zip, city, state, location } = req.query;

// accept ?location=Orlando,FL or ?location=32801
if (location) {
  const m = location.match(/^(\d{5})$/);               // zip
  if (m) zip = m[1];
  else {
    const parts = location.split(",");
    if (parts.length === 2) {
      city  = parts[0].trim();
      state = parts[1].trim();
    }
  }
}

if (zip)       location = zip;
else if (city && state) location = `${city}, ${state}`;

if (!location) {
  return res
    .status(400)
    .json({ error: "Provide ?zip=xxxx OR ?city=City&state=ST OR ?location=City,ST" });
}

    const gender = req.query.gender;
    const age = req.query.age;
    const limit = 40; // find the most relevant 40 cats

    const { data } = await axios.get("https://api.petfinder.com/v2/animals", {
      headers: { Authorization: "Bearer " + access },
      params: {
        type: "cat",
        status: "adoptable",
        distance: 30,
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
