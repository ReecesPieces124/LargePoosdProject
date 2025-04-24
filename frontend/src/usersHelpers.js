

// register a new user  – POST /api/users/register 
export async function registerUser({ firstname, lastname, email, password }) {
    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, email, password })
    });
    if (!res.ok) throw new Error((await res.json()).error || "Registration failed");
    return res.json();            // { message, user }
  }
  
  // log in  – POST /api/users/login
   //  Returns { token, user }  
  export async function loginUser({ email, password }) {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error((await res.json()).error || "Login failed");
    return res.json();            // { message, token, user }
  }
  
  // auth protected routes :(
  
  // get my profile  – GET /api/users/me */
  export async function fetchMe(token) {
    const res = await fetch("/api/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Unauthorized");
    return res.json();            // { _id, firstname, ... }
  }
  
  // delete my account  – DELETE /api/users/:id  (id = me) */
  export async function deleteUser(id, token) {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error((await res.json()).error || "Delete failed");
    return res.json();            // { message: "User deleted" }
  }
  
  