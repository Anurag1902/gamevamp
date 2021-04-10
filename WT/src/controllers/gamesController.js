let handlegames = async (req, res) => {
    return res.render("games.ejs",{
        user: req.user
    });
};

module.exports = {
    handlegames: handlegames,
};