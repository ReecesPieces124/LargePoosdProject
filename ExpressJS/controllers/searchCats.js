// also a controller, just large enough for its own module !
const axios = require("axios");
const Cats = require("../models/Cats");
const { getTokenPF } = require("../middleware/petfinderINIT");

async function searchCats(req, res) {
  try {
    const access = await getTokenPF();

    const location = req.query.location;
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
      age: c.age,
      status: c.status,
      gender: c.gender,
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
