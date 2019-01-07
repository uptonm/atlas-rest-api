const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/spotify",
    passport.authenticate("spotify", {
      scope: [
        "user-read-email",
        "user-read-private",
        "user-read-recently-played"
      ],
      showDialog: true
    }),
    (req, res) => {
      // The request will be redirected to spotify for authentication, so this
      // function will not be called.
    }
  );

  app.get(
    "/auth/spotify/callback",
    passport.authenticate("spotify", { failureRedirect: "/login" }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );
};
