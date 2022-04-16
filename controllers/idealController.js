const Idea = require("../models/ideal.model");
const Category = require("../models/category.model");

const ideaController = {
  getList: async (req, res, next) => {
    try {
      let perPage = 5;
      let page = req.params.page || 1;
      var sort = req.query.sort;
      var a;
      switch (sort) {
        case "mostviews":
          a = { numberOfViews: -1 };
          sort = "?sort=mostviews";
          break;
        case "mostlikes":
          a = { numberOfLikes: -1 };
          sort = "?sort=mostlikes";
          break;
        case "mostcomments":
          a = { numberOfComments: -1 };
          sort = "?sort=mostcomments";
          break;
        case "mostdislikes":
          a = { numberOfDislikes: -1 };
          sort = "?sort=mostdislikes";
          break;
        case "recentidea":
          a = { _id: -1 };
          sort = "?sort=recentidea";
          break;
        default:
          a = { title: 1 };
          sort = "";
      }
      const categories = await Category.find({});
      Idea.find()
        .skip(perPage * page - perPage)
        .sort(a)
        .limit(perPage)
        .exec((err, ideas) => {
          Idea.countDocuments((err, count) => {
            if (err) return next(err);
            res.render("list-ideas", {
              categories,
              ideas,
              current: page,
              pages: Math.ceil(count / perPage),
              title: "List of Ideas",
              sort,
            });
          });
        });
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },
};

module.exports = ideaController;
