// fetch all cats from the petfinder API and save them to the database
async function fetchAllCats() {
    const res = await fetch("/api/cats?limit=0");
    if (!res.ok) {
      const { message } = await res.json().catch(() => ({}));
      throw new Error(message || "Failed to fetch cats");
    }
    return res.json();
  }
  
// fetch a cat by its pfID from the petfinder API and save it to the database
  async function fetchCatByPfID(pfID) {
    const res = await fetch(`/api/cats/pfid/${pfID}`);
    if (!res.ok) {
      const { message } = await res.json().catch(() => ({}));
      throw new Error(message || `Cat ${pfID} not found`);
    }
    return res.json();
  }
  
  // export the functions to be used in other files
  module.exports = {
    fetchAllCats,
    fetchCatByPfID
  };
  
