import teamService from "./../services/teamService";
import loginController from "../controllers/loginController";



let getPageteams = (req, res) => {
    return res.render("team-list.ejs", {
        errors: req.flash("errors")
    });
};

let createNewteam = async (req, res) => {
    //create a new user
    // console.log("hello"+process.env.USER);
    let newteam = {
        teamname: req.body.teamname,
        member1: req.body.member1,
        member2: req.body.member2,
        member3: req.body.member3,
        member4: req.body.member4,
        member5: req.body.member5,
        team_id: process.env.USER
    };
    try {
        await teamService.createNewteam(newteam);
        return res.redirect("/teams/team-list");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/teams/team-list");
    }

};
module.exports = {
    getPageteams: getPageteams,
    createNewteam: createNewteam,
};
