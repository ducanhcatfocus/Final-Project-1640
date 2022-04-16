const User = require("../models/user.model");
const Campaign = require("../models/campaign.model");
const Department = require("../models/department.model");
const Category = require("../models/category.model");
const bcrypt = require("bcrypt");
const backup = require("../config/backup");

const adminController = {
  createAccount: async (req, res) => {
    try {
      const { email, password, role, confirmedPassword, department } = req.body;
      const user = await User.findOne({ email });
      const emailRegexp =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (user) {
        req.flash("danger", "Email is already existed");
        return res.redirect("back");
      }
      if (!emailRegexp.test(email)) {
        req.flash("danger", "Email is not valid");
        return res.redirect("back");
      }
      if (password.length < 6) {
        req.flash("danger", "Password is at least 6 characters long");
        return res.redirect("back");
      }

      if (password != confirmedPassword) {
        req.flash("danger", "Confirm Password is not match");
        return res.redirect("back");
      }

      //password encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        role,
        password: passwordHash,
        department,
      });

      await newUser.save();
      req.flash("success", "Account Created");
      res.redirect("/admin/accounts");
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },
  getCreateAccount: async (req, res) => {
    try {
      const departments = await Department.find({});
      res.render("admin/create-account", {
        title: "Create Account",
        departments,
      });
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },

  viewAllAccounts: async (req, res) => {
    try {
      const users = await User.find({});
      res.render("admin/view-accounts", { users, title: "all accounts" });
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },
  getAccountById: async (req, res) => {
    try {
      const departments = await Department.find({});
      const user = await User.findById(req.params.id);
      if (!user) {
        req.flash("danger", "Account is not exist");
        return res.redirect("back");
      }
      res.render("admin/update-account", { user, departments });
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },

  updateAccount: async (req, res) => {
    try {
      const { email, role, department } = req.body;
      const user = await User.findOne({
        email,
        _id: { $ne: req.params.id },
      });
      if (user) {
        req.flash("danger", "Email is already existed");
        return res.redirect("/admin/edit_account/" + req.params.id);
      }

      await User.findOneAndUpdate(
        { _id: req.params.id },
        { email, role, department }
      );

      req.flash("success", "Account updated");
      res.redirect("/admin/accounts");
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },

  deleteAccount: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        req.flash("danger", "Account invalid");
        return res.redirect("/admin/accounts");
      }

      if (user.email == "admin@gmail.com") {
        req.flash("danger", "Account invalid");
        return res.redirect("/admin/accounts");
      }

      await user.delete();
      req.flash("success", "Account deleted");
      res.redirect("/admin/accounts");
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },

  //Department

  viewAllDepartments: async (req, res) => {
    try {
      const departments = await Department.find({});
      res.render("admin/create-department", {
        departments,
        title: "Departments",
      });
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },

  createDepartment: async (req, res) => {
    try {
      const { name } = req.body;
      const department = await Department.findOne({ department_name: name });
      if (department) {
        req.flash("danger", "Department is exist");
        return res.redirect("back");
      }
      const newDepartment = new Department({
        department_name: name,
      });
      await newDepartment.save();
      res.redirect("/admin/create_department");
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },

  deleteDepartment: async (req, res) => {
    try {
      const department = await Department.findById(req.params.id);
      if (!department) {
        req.flash("danger", "Department invalid");
        return res.redirect("back");
      }
      await department.delete();
      req.flash("success", "Department deleted");
      res.redirect("back");
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },

  ///Campaign

  viewAllCampaigns: async (req, res) => {
    try {
      const current = new Date();
      const campaigns = await Campaign.find({});
      res.render("admin/view-campaigns", {
        campaigns,
        current,
        title: "Campaign",
      });
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },
  getCreateCampaign: async (req, res) => {
    try {
      const categories = await Category.find({});
      res.render("admin/create-campaign", { categories });
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },

  createCampaign: async (req, res) => {
    try {
      //only qam can create, delete category
      const { title, category, content, first_closure, final_closure } =
        req.body;

      if (final_closure <= first_closure) {
        req.flash(
          "danger",
          "Final closure date must be set after first closure date"
        );
        return res.redirect("/admin/create_campaign");
      }

      const newCampaign = new Campaign({
        title,
        category,
        name: content,
        first_closure,
        final_closure,
      });
      await Category.updateOne(
        { _id: category },
        { $push: { campaign: { campaign_id: newCampaign._id } } }
      );
      await newCampaign.save();
      req.flash("success", "Campaign created");
      return res.redirect("/admin/campaigns");
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },

  updateCampaign: async (req, res) => {
    try {
      const { title, category, content, first_closure, final_closure } =
        req.body;
      if (final_closure <= first_closure) {
        req.flash(
          "danger",
          "Final closure date must be set after first closure date"
        );
        return res.redirect("/admin/campaign/" + req.params.id);
      }
      const campaign = await Campaign.findById(req.params.id);
      if (category != campaign.category) {
        await Category.updateOne(
          { _id: category },
          { $push: { campaign: { campaign_id: req.params.id } } }
        );
        await Category.updateOne(
          { _id: campaign.category },
          { $pull: { campaign: { campaign_id: req.params.id } } }
        );
      }

      await Campaign.findOneAndUpdate(
        { _id: req.params.id },
        { title, category, name: content, first_closure, final_closure }
      );
      req.flash("success", "Campaigns updated");
      res.redirect("/admin/campaigns");
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },
  getCampaignById: async (req, res) => {
    try {
      const categories = await Category.find({});
      const campaign = await Campaign.findById(req.params.id);
      date1st = campaign.first_closure.toISOString().slice(0, -5);
      date2rd = campaign.final_closure.toISOString().slice(0, -5);
      if (!campaign) {
        req.flash("danger", "Topic is not exist");
        return res.redirect("admin/campaigns");
      }
      return res.render("admin/update-campaign", {
        campaign,
        categories,
        date1st,
        date2rd,
      });
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },

  deleteCampaign: async (req, res) => {
    try {
      const campaign = await Campaign.findById(req.params.id);
      if (!campaign) {
        req.flash("danger", "Campaign invalid");
        return res.redirect("/admin/campaigns");
      }

      await Category.updateOne(
        { _id: campaign.category },
        { $pull: { campaign: { campaign_id: req.params.id } } }
      );
      await campaign.delete();
      req.flash("success", "Campaign deleted");
      res.redirect("/admin/campaigns");
    } catch (error) {
      req.flash("danger", " 500 INTERNAL SERVER ERROR: " + error.message);
      return res.redirect("back");
    }
  },

  //getBackup
  getMaintain: async (req, res) => {
    res.render("admin/maintain", { title: "Maintain" });
  },

  getBackup: async (req, res) => {
    backup();
    res.render("admin/maintain");
  },
};

module.exports = adminController;
