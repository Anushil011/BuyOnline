const User = require("./users");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports =  (passport)=> {
  passport.use(
    new localStrategy({usernameField:"email"},(email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        name: user.name,
        isAdmin: user.isAdmin,
        email: user.email,
        id:user._id,
        watchlist: user.watchlist,
        cart: user.cart,
        purchased: user.purchased
      };
      cb(err, userInformation);
    });
  });
};