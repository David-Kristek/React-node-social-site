const isAdmin = (req, res, next) => {
    console.log(req.user.admin.isAdmin);
    if(!req.user.admin.isAdmin) return res.json({err : "you are not admin"}); 
    next(); 
}
module.exports = isAdmin;
