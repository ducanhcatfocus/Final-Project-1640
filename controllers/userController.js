const passport = require("passport");

const userController = {
  getLogin: async (req, res) => {
    if (res.locals.user) return res.redirect("/home");

    res.render("login", { title: "login" });
  },
  login: (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/home",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  },

  logout: (req, res) => {
    req.logout();
    res.redirect("/login");
  },
};

module.exports = userController;
