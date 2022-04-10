// const Category = require("../models/category.model");
// const Campaign = require("../models/campaign.model");

// const categoryController = {
//   getCategory: async (req, res) => {
//     try {
//       const categories = await Category.find({});
//       const campaign = await Campaign.find({});
//       res.render("index", {
//         title: "home",
//         categories,
//         allCampaigns: campaign.length,
//       });
//     } catch (error) {
//       return res.status(500).send({ msg: error.message });
//     }
//   },

//   createCategory: async (req, res) => {
//     try {
//       //only qam can create, delete category
//       const { name } = req.body;
//       const category = await Category.findOne({ name });
//       if (category)
//         return res.status(400).json({ msg: "this category is already exists" });

//       const newCategory = new Category({ name });
//       await newCategory.save();
//       res.json({ msg: "Create a category" });
//     } catch (error) {
//       return res.status(500).json({ msg: error.message });
//     }
//   },

//   deleteCategory: async (req, res) => {
//     try {
//       const category = await Category.findById(req.params.id);
//       if (category.number_campaign != 0)
//         return res.json({ msg: "Cannot delete category" });

//       await category.delete();
//       res.json({ msg: "Deleted a category" });
//     } catch (error) {
//       return res.status(500).json({ msg: error.message });
//     }
//   },

//   updateCategory: async (req, res) => {
//     try {
//       const { name } = req.body;
//       await Category.findOneAndUpdate({ _id: req.params.id }, { name });
//       res.json({ msg: "Updated a category" });
//     } catch (error) {
//       return res.status(500).json({ msg: error.message });
//     }
//   },
// };

// module.exports = categoryController;
