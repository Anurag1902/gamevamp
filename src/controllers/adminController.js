let handleadmin = async (req, res) => {
    return res.render("admin.ejs",{
        user: req.user
    });
};

module.exports = {
    handleadmin: handleadmin,
};