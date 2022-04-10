exports.isUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("danger", "Please login");
    return res.redirect("/login");
  }
};

exports.isAdmin = function (req, res, next) {
  if (req.isAuthenticated() && req.user.role == "admin") {
    next();
  } else {
    req.flash("danger", "Access denied");
    return res.redirect("/login");
  }
};

exports.isQAM = function (req, res, next) {
  if (req.isAuthenticated() && req.user.role == "qam") {
    next();
  } else {
    req.flash("danger", "Access denied");
    return res.redirect("/login");
  }
};
