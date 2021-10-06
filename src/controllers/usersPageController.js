let handleUsers = async (req, res) => {
    return res.render("user-list.ejs");
};

module.exports = {
    handleUsers: handleUsers,
};
