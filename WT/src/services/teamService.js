import { Cookie } from "express-session";
import DBConnection from "./../configs/DBConnection";
import loginController from "../controllers/loginController";

let createNewteam = (data) => {
    console.log(process.env.USER);
    // var cookie_name=JSON.parse(req.cookies.name1);
    let userItem = {
        teamname: data.teamname,
        member1: data.member1,
        member2: data.member2,
        member3: data.member3,
        member4: data.member4,
        member5: data.member5,
        team_id:process.env.USER,
    };
    console.log(userItem);
    // console.log("heloo"+data.req.user.id);
    DBConnection.query(
        ' INSERT INTO teams set ?',userItem,
          function(err, rows) {
           
              console.log(rows);
          }
      );
           
};
module.exports = {
    createNewteam: createNewteam
};
