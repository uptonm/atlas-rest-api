const actions = require("../controllers/user");
module.exports = app => {
  app.get("/api/users", actions.get);
  app.get("/api/users/:id", actions.getOne);
  app.post("/api/users", actions.post);
  app.put("/api/users/:id", actions.put);
  app.delete("/api/users/:id", actions.delete);
  app.get("/api/users/:id/spotify/playlists", actions.getPlaylists);
  app.get("/api/users/:id/spotify/recentlyPlayed", actions.getRecentlyPlayed);
};
