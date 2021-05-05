const Category = require("../modules/Category");
const User = require('../modules/User');
class CategoryController {
  async add(req, res) {
    const { name } = req.body;
    const categoryExists = await Category.findOne({ name: name });
    const { _id } = await User.findOne({email: req.user.email});
    if (categoryExists) {
      return res.json({ err: "Category already exists" });
    }

    const category = new Category({
      name: name,
      approved: false,
      createdByUser: _id,
    });
    try {
      await category.save();
    } catch (err) {
      return res.json({ err: err });
    }
    return res.json({ msg: "Category uploaded" });
  }
  async get(req, res) {
    const categories = await Category.find();
    return res.send(categories);
  }
}
module.exports = CategoryController;
