const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const githubStrategy = require("passport-github").Strategy;
const spotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLECLIENT,
      clientSecret: process.env.GOOGLESECRET,
      callbackURL: "/auth/google/callback", // This is the route the user takes after OAuth from Google
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value
      });
      if (existingUser) {
        // Check if user previously logged-in with another o-auth provider
        if (!existingUser.googleId) {
          existingUser.googleId = profile.id;
          await existingUser.save();
        }
        return done(null, existingUser);
      }
      const user = await new User({
        first: profile.name.givenName,
        last: profile.name.familyName,
        googleId: profile.id,
        email: profile.emails[0].value
      }).save();

      done(null, user);
    }
  )
);

passport.use(
  new githubStrategy(
    {
      clientID: process.env.GITHUBCLIENT,
      clientSecret: process.env.GITHUBSECRET,
      callbackURL: "/auth/github/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, cb) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value
      });
      if (existingUser) {
        // Check if user previously logged-in with other o-auth provider
        if (!existingUser.githubId) {
          existingUser.githubId = profile.id;
          await existingUser.save();
        }
        return cb(null, existingUser);
      }
      const user = await new User({
        first: profile.displayName.split(" ")[0],
        last: profile.displayName.split(" ")[1],
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        githubId: profile.id
      }).save();

      cb(null, user);
    }
  )
);

passport.use(
  new spotifyStrategy(
    {
      clientID: process.env.SPOTIFYCLIENT,
      clientSecret: process.env.SPOTIFYSECRET,
      callbackURL: "http://localhost:8000/auth/spotify/callback"
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value
      });
      if (existingUser) {
        if (!existingUser.spotifyId) {
          existingUser.spotifyId = profile.id;
          await existingUser.save();
        }
        return done(null, existingUser);
      }
      const user = await new User({
        spotifyId: profile.id,
        email: profile.emails[0].value,
        first: profile.displayName.split(" ")[0],
        last: profile.displayName.split(" ")[1],
        avatar: profile.photos[0]
      }).save();
      done(null, user);
    }
  )
);
