getCats(req, res) - Returns all cats from our mongoDB, as JSON objects for bulk retrieval. (USE fetchAllCats instead for frontend use)
createCat(req, res) - sending req.body as a json object is an alternative method of creating a cat in Mongo manually, in case we want to add offline cats.
getCatByPfID(req, res) - Uses pfID to return a specific cat as a JSON object
deleteCat(req, res) - Deletes a cat by returning its mongo _id field (can be changed to pfID field if you want but this way is more direct)
syncCats(req, res) - authenticates to petfinder by grabbing a token, and then syncing our MonogDB with what the petfinder API can provide
fetchAllCats() - calls /api/cats?limit=0 to fetch all cats as a JSON array
fetchCatByPfID(pfID) - fetches a single cat by their petfinder ID
getTokenPF() - grabs a token from petfinder service API

Frontend should only use:
fetchAllCats()
fetchCatByPfID(pfID)

To test our DB:
we can use createCat route and post a sample cat for testing with frontend 

TODO:
implement syncCats in our lightsail instance to run periodically to keep our db updated
implement env variables and place them into our instance
create a way to use the deleteCat function whenever a cat is adopted or no longer available
merge both me and Adam's router files into one because we should be able to access all routes via one export statement.
