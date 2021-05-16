const router = require("express").Router();
const UserList = require("../controllers/Admin/UserAdminController"); 
const Categories = require('../controllers/Admin/CategoriesAdminController');

router.get("/users", UserList.get_users);
// only main admin
router.get("/users/admin/:userId", UserList.make_admin);
router.delete("users/ad,om/:userId", UserList.remove_admin); 
// only admin - user, mainadmin - user, admin
router.delete("/users/:userId", UserList.remove_user);

router.get("/categories", Categories.add_approved_category)
router.get("categories/approve/:categoryId", Categories.add_approved_category); 
router.delete("categories/:categoryId", Categories.delete_category); 



module.exports = router;
