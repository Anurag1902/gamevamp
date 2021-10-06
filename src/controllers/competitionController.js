let handleCompetition = async (req, res) => {
    return res.render("competitions.ejs");
};

module.exports = {
    handleCompetition: handleCompetition,
};
