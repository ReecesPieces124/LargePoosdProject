// browse (all cats)
export async function fetchAllCats() {
  const res = await fetch("/api/cats");
  if (!res.ok) throw new Error("Failed to fetch cats");
  return res.json();               // returns [ { _id, name, ... }, ... ]
}

// trigger a new Petfinder search/cache 
export async function cacheSearch({ location, gender, age, limit = 40 }) {
  const qs = new URLSearchParams({ location, gender, age, limit }).toString();
  const res = await fetch(`/api/search-cats?${qs}`, { method: "POST" });
  if (!res.ok) throw new Error("Search failed");
  return res.json();               // { cached: N }
}

// fetch one cat by Mongo _id  
export async function fetchCatById(id) {
  const res = await fetch(`/api/cats/${id}`);
  if (!res.ok) throw new Error("Cat not found");
  return res.json();               // { _id, name, ... }
}

// add a manual cat (requires auth token)
export async function createCat(catData, token) {
  const res = await fetch("/api/cats", {
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
export async function deleteCat(id, token) {
  const res = await fetch(`/api/cats/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Delete failed");
  return res.json();               // { message: "Cat deleted" }
}
