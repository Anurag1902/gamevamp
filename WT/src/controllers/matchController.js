let handlematches = async (req, res) => {
    return res.render("match.ejs",{
        user: req.user
    });
};

module.exports = {
    handlematches: handlematches,
};