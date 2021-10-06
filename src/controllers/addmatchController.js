import addmatchService from "./../services/addmatchService";


let getPageaddmatch = (req, res) => {
    return res.render("add_match.ejs", {
        errors: req.flash("errors")
    });
};

let createNewUser = async (req, res) => {

    //create a new user
    let newmatch = {
        title: req.body.title,
        date: req.body.date,
        team1: req.body.team1,
        team2: req.body.team2,
        winner: req.body.winner,
        reward: req.body.reward
    };
    try {
        await addmatchService.createNewUser(newmatch);
        return res.redirect("/add_match");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/add_match");
    }
};
module.exports = {
    getPageaddmatch: getPageaddmatch,
    createNewUser: createNewUser
};
