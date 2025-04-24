// browse (all cats)
export async function fetchAllCats() {
  const res = await fetch("http://localhost:5000/api/cats", { method: "GET" });
  if (!res.ok) throw new Error("Failed to fetch cats");
  return res.json();               // returns [ { _id, name, ... }, ... ]
}

// trigger a new Petfinder search/cache 
// src/api/cats.js
export async function cacheSearch({
  zip,
  city,
  state,
  gender,
  age,
  limit = 40
}: any) {
  const params = new URLSearchParams({ gender, age, limit: String(limit) });

  if (zip) {
    params.set("zip", zip);
  } else if (city && state) {
    params.set("city", city);
    params.set("state", state);
  }

  const res = await fetch(
    `http://localhost:5000/api/cats/search-cats?${params.toString()}`,
    { method: "POST" }
  );

  if (!res.ok) throw new Error("Search failed");
  return res.json();            // { cached: N }
}


// fetch one cat by Mongo _id  
export async function fetchCatById(id: any) {
  const res = await fetch(`http://localhost:5000/api/cats/${id}`);
  if (!res.ok) throw new Error("Cat not found");
  return res.json();               // { _id, name, ... }
}

// add a manual cat (requires auth token)
export async function createCat(catData: any, token: any) {
  const res = await fetch("http://localhost:5000/api/cats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(catData)
  });
  if (!res.ok) throw new Error((await res.json()).message || "Create failed");
  return res.json();               // created cat
}

// delete own manual cat
export async function deleteCat(id: any, token: any) {
  const res = await fetch(`http://localhost:5000/api/cats/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Delete failed");
  return res.json();               // { message: "Cat deleted" }
}
