const express = require("express");
const google = express.Router();
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const  GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

/* passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser((user,done)) */
google.use(
	session({
		secret: process.env.GOOGLE_CLIENT_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

google.use(passport.initialize());
google.use(passport.session());

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		(accessToken, refreshToken, profile, done) => {
			return done(null, profile);
		}
	)
);

google.get(
	"/auth/google",
	passport.authenticate("google", { scope: [ 'email', 'profile' ] }),
	(req, res) => {
		const redirectUrl = `http://localhost:3000/success?user=${encodeURIComponent(
			JSON.stringify(req.user)
		)}`;
		res.redirect(redirectUrl);
	}
);

google.get(
	"/auth/google/callback",
	passport.authenticate("github", { failureRedirect: "/" }),
	(req, res) => {
		const { user } = req;
		console.log(req.user);

		const token = jwt.sign(user, process.env.JWT_SECRET);
		const redirectUrl = `http://localhost:3000/success/${encodeURIComponent(
			token
		)}`;
		res.redirect(redirectUrl);
	}
);

google.get("/success", (req, res) => {
	res.redirect("http://localhost:3000");
});


module.exports = github;