// this file allows the db to be synced with petfinder results in our location at all times. Every time this is run, will check if token is expired and refreshes db if so.

const axios = require("axios");
const Cats = require("../models/Cats");
const { getToken } = require("./petfinderINIT");

// master function for syncing db with petfinder results
async function syncCats(req, res) {
  try {
    const access = await getToken();
    const { data } = await axios.get(
      "https://api.petfinder.com/v2/animals",
      {
        headers: { Authorization: "Bearer " + access },
        params: {
          type: "cat",
          status: "adoptable",
          limit: 50,
          location: "32701",
          gender: "male,female,unknown",
          age: "baby,young,adult,senior"
        }
      }
    );

    // for each cat, create an object with the relevant data and params to be saved to the db
    const cats = data.animals.map(c => ({
      pfID: c.id,
      name: c.name,
      age: c.age,
      status: c.status,
      gender: c.gender,
      city: c.contact?.address?.city ?? "",
      state: c.contact?.address?.state ?? "",
      imageURL: c.photos?.[0]?.medium ?? ""
    }));

    // check if the cat already exists in the db, if so, update it, if not, create it
    await Promise.all(
      cats.map(c =>
        Cats.findOneAndUpdate(
          { pfID: c.pfID },
          c,
          { upsert: true, new: true }
        )
      )
    );

    // check if the sync was successful
    res.json({ saved: cats.length });
  } catch (e) {
    console.error(e.response?.data || e);
    res.status(500).json({ error: "Sync failed" });
  }
}

module.exports = { syncCats };
