let handleadminlogin = async (req, res) => {
    return res.render("admin_login.ejs",{
        user: req.user
    });
};

module.exports = {
    handleadminlogin: handleadminlogin,
};