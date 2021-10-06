import express, { response } from "express";
import homePageController from "../controllers/homePageController";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";
import usersPageController from "../controllers/usersPageController";
import apiController from "../controllers/apiController";
import competitionController from "../controllers/competitionController";
import newsController from "../controllers/newsController";
import newslikeController from "../controllers/newslikeController";
import DBConnection from "../configs/DBConnection";
import gamesController from "../controllers/gamesController";
import adminController, { handleadmin } from "../controllers/adminController";
import adminloginController from "../controllers/adminloginController";
import addmatchController from "../controllers/addmatchController";
import teamsController from "../controllers/teamsController";
import matchController from "../controllers/matchController";
import aboutController from "../controllers/aboutController";
import reportController from "../controllers/reportController";
import reg_teamsController from "../controllers/reg_teamsController";

// Init all passport
initPassportLocal();

let router = express.Router();



let initWebRoutes = (app) => {
   
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    
  router.get("/admin", adminController.handleadmin);
  router.get("/admin_login", adminloginController.handleadminlogin)
    router.post("/admin_login",loginController.handleadminLogin);
    router.get("/add_match", addmatchController.getPageaddmatch);
    router.post("/add_match", addmatchController.createNewUser);
    router.get("/games", loginController.checkLoggedIn, gamesController.handlegames);
    router.get("/match", loginController.checkLoggedIn, matchController.handlematches);
    router.get("/teams", loginController.checkLoggedIn,teamsController.getPageteams);
    router.post("/teams", teamsController.createNewteam);
    router.get("/aboutus", loginController.checkLoggedIn, aboutController.handleabout);
    router.get("/report", loginController.checkLoggedIn, reportController.handlereport);
  
    router.get("/login", loginController.checkLoggedOut, loginController.getPageLogin);
    router.get("/api", apiController.handleAPI);
    router.get("/api/lol", apiController.handlelolAPI);
    router.get("/api/dota2",apiController.handledotaAPI);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    // router.get("/user-list", loginController.checkLoggedIn, usersPageController.handleUsers);
    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.post("/logout", loginController.postLogOut);
    router.get('/competitions', competitionController.handleCompetition);
    router.get('/news', loginController.checkLoggedIn, newsController.handlenews);
    router.get('/news/delete/:id', newsController.handleLikeDelete,loginController.checkLoggedIn, newsController.handlenews);
    router.post('/news/:title', newsController.handleLike);
    router.get('/newslike', newslikeController.handlealllikes);

    
    router.get("/reg_teams", reg_teamsController.handleAPI);
    router.get("/reg_teams/reg_teams_lol", reg_teamsController.handlelolAPI);
    router.get("/reg_teams/reg_teams_dota2",reg_teamsController.handledotaAPI);
  
  router.get('/playerinfo/:id', function (req, res, next) {
    var playerid = req.params.id;
    playerid = parseInt(playerid);
    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://api.gamescorekeeper.com/v1/players/'+playerid,
      'headers': {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYXNpbmdoNHZpbkBnbWFpbC5jb20iLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOjQ0NjAwNTAxMjQ3MTI5NjU2NzksImN1c3RvbWVyIjp0cnVlfQ.BKGqf59iXBrQMkMKqvmDviM-1Cwj0jW3E_ttXcRK1fI'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      // console.log(response.body);
      let data1 = response.body ? JSON.parse(response.body) : {}
      console.log(data1);
      return res.render("playerinfo.ejs", {
        data:data1,
      });
    });

  });
  
  
  
  router.get('/teams/select/:id1/:id2', function (req, res, next) {
    var teamId = req.params.id1;
    teamId = parseInt(teamId);
    var compId = req.params.id2;
    compId = parseInt(compId);
    let userid = process.env.USER;
    userid = parseInt(userid);
    // console.log("teamId" + teamId);
    // console.log("compId" + compId);
   
    var sql = `SELECT *FROM compreg WHERE compid= ? AND userid = ?`;
    DBConnection.query(sql,[compId,userid],
      function (err, rows) {

        if (rows.length == 0) {
          DBConnection.query('INSERT INTO compreg (teamid,compid,userid) VALUES ('+teamId +',' +compId +','+userid +')',
            function (err, rows) {
              // console.log(err);
              // console.log(rows);
                }
            );
          }

      }
    );
   
    return res.redirect('/api');
  });
  
  
  

  router.get('/compreg/dispay', function (req, res, next) {
      
    let y = process.env.USER;
    y = parseInt(y);
    // console.log(y);

    DBConnection.query("SELECT competitions.name,competitions.startDate,competitions.endDate,competitions.prizePoolUSD,teams.teamname,teams.member1,teams.member2,teams.member3,teams.member4,teams.member5 FROM ((compreg INNER JOIN teams ON compreg.teamid = teams.id) INNER JOIN competitions ON compreg.compid = competitions.id) WHERE userid=" + y,
      function (err, rows) {
        
        return res.render('comreg-list.ejs', {
             data:rows,
        });

      }
    );

    // let b;
    // let data = [];
    // let data1 = {};
    // var i = 0;
    // DBConnection.query('SELECT *FROM compreg WHERE userid =' + y,
    //   function (err, rows) {
    //     b = rows.length;
    //     if (rows.length != 0) {
    //       rows.forEach(id1 => {
    //             // console.log(id1.teamid);
    //             // console.log(id1.compid);
                
    //         DBConnection.query('SELECT *FROM competitions WHERE id=' + id1.compid,
    //           function (err, rows) {
    //             // console.log(rows);

    //             DBConnection.query('SELECT *FROM teams WHERE id=' + id1.teamid,
    //               function (err, rows1) {
    //                 // console.log(rows);
    //                 rows1.forEach(id3 => {
    //                   // console.log(id3.teamname);
                   
    //             rows.forEach(id2 => {
                 
    //               data1 = {
    //                 name: id2.name,
    //                 startDate: id2.startDate,
    //                 endDate: id2.endDate,
    //                 prizePoolUSD: id2.prizePoolUSD,
    //                 teamname:id3.teamname,
    //                 member1: id3.member1,
    //                 member2: id3.member2,
    //                 member3:id3.member3,
    //                 member4:id3.member4,
    //                 member5:id3.member5,
    //               };
    //               data.push(data1);
    //               i++;
    //             });

    //                   if (b == i) {
    //               console.log(b);
    //               console.log(data);
    //               return res.render('comreg-list.ejs', {
    //                 data:data,
    //               });
    //             }

    //                    });
    //               }
    //             );
                
    //           }
    //         );
            
    //           });
    //       }
    //     else {
    //       return res.render('comreg-list.ejs', {
    //         data:data,
    //       });
    //       }
    //   }
    // );

    
  });

  

    router.get('/competitions/:id', function (req, res, next) {
      var CompId = req.params.id;
      let name = process.env.NAMEE;
      var request = require('request');
        var options = {
        'method': 'GET',
        'url': 'https://api.gamescorekeeper.com/v1/competitions/'+CompId,
        'headers': {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYXNpbmdoNHZpbkBnbWFpbC5jb20iLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOjQ0NjAwNTAxMjQ3MTI5NjU2NzksImN1c3RvbWVyIjp0cnVlfQ.BKGqf59iXBrQMkMKqvmDviM-1Cwj0jW3E_ttXcRK1fI'
        }
        };
request(options, function (error, response) {
  if (error) throw new Error(error);
  let data1 = response.body ? JSON.parse(response.body) : {}


  let y = process.env.USER;
  y = parseInt(y);
  var sql='SELECT * FROM teams where team_id='+y;
  DBConnection.query(sql, function (err, data, fields) {
    // console.log(err);
    // console.log(data);
    



    // new stuffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    var sql = `SELECT *FROM compreg WHERE compid= ? AND userid = ?`;
    DBConnection.query(sql, [CompId, process.env.USER],
      function (err, rows) {
      // console.log(rows.length);
    return res.render("competitions.ejs", {
      data: data1,
      userData: data,
      error: rows,
      name:name,
      // data1 : data,
    });
    });
  });
}); 
    });

      router.get('/participants/:id', function (req, res, next) {
      var ParticipantsId= req.params.id;
      var request = require('request');
        var options = {
        'method': 'GET',
        'url': 'https://api.gamescorekeeper.com/v1/competitions/'+ParticipantsId +'/participants',
        'headers': {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYXNpbmdoNHZpbkBnbWFpbC5jb20iLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOjQ0NjAwNTAxMjQ3MTI5NjU2NzksImN1c3RvbWVyIjp0cnVlfQ.BKGqf59iXBrQMkMKqvmDviM-1Cwj0jW3E_ttXcRK1fI'
        }
        };
request(options, function (error, response) {
  if (error) throw new Error(error);
  let data = response.body ? JSON.parse(response.body) : {}
  let data2 = [];
  let data3 = {};
  let data4 = {};
  var i = 0;
  var b;
  // console.log(data);
  // new stuffffffffffffffffffffffff
  DBConnection.query('SELECT *FROM compreg where compid=' + ParticipantsId, 
    function(err, rows) {
      // console.log(rows.length);
      b = rows.length;
      if (rows.length != 0) {
        rows.forEach(id1 => {
          // console.log(id1.teamid);
          DBConnection.query('SELECT *FROM teams where id=' + id1.teamid,
            function (err, rows) {
              // console.log(rows);
              rows.forEach(id2 => {
                // console.log(id2.teamname);
                data3 = {
                  id: id2.id,
                  name: id2.teamname,
                };
                data2.push(data3);
                i++;
              });
              if (i == b) {
                data.participants.forEach(id3 => {
                  data4 = {
                    id: id3.id,
                    name: id3.name,
                  };
                  data2.push(data4);
                });
                
                // console.log(data2);
                return res.render("participants.ejs", {
                  data: data2,
                  // data1 : data,
                });
              }
            }
          );
        });
      }
      else {
         res.render("participants.ejs", {
        data: data.participants,
        // data1 : data,
    });
      }
    }
  );
 
    }); 
    });
    
  
  
  router.get('/teamsinfo/:id', function (req, res, next) {
    var teamID = req.params.id;
    // console.log(teamID);
    var q;
    let data10 = [];
    let data1 = {};
    let data3 = {};
    let data4 = {};
    let data5 = {};
    let data6 = {};
    let data7 = {};
    let data2 = [];
    DBConnection.query('SELECT *FROM teams where id=' + teamID,
      function (err, rows) {
        // console.log(rows);
        // console.log(rows.length);
        q = rows.length;
        // console.log(q);
        rows.forEach(element => {
          data1 = {
            id: '23',
            name: element.member1
          };          
          data2.push(data1);

          data3 = {
            id: '24',
            name: element.member2,
          };
          data2.push(data3);

          data4 = {
            id: '25',
            name: element.member3,
          };
          data2.push(data4);

          data6 = {
            id: '26',
            name: element.member4,
          };
          data2.push(data6);

          data7 = {
            id: '27',
            name: element.member5,
          };
          data2.push(data7);
          
          return res.render("teaminfo.ejs", {
              data1:data2,
              data: data10,
            });
        });
        // console.log(rows.member1);
        // data1 = {
        //   id: '23',
        //   name: rows.member1,
        // };
        if (q != 1) {

           var request = require('request');
            var options = {
              'method': 'GET',
              'url': 'https://api.gamescorekeeper.com/v1/teams/'+teamID,
              'headers': {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYXNpbmdoNHZpbkBnbWFpbC5jb20iLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOjQ0NjAwNTAxMjQ3MTI5NjU2NzksImN1c3RvbWVyIjp0cnVlfQ.BKGqf59iXBrQMkMKqvmDviM-1Cwj0jW3E_ttXcRK1fI'
              }
            };
            request(options, function (error, response) {
              if (error) throw new Error(error);
              let data = response.body ? JSON.parse(response.body) : {}
              // console.log(data);
              
              return res.render("teaminfo.ejs", {
                data: data,
                data1: data10,
            });
          });

        }
        else {
          
        }
      }
      
    );
    
   

    
  });
  
 
    return app.use("/", router);
};
module.exports = initWebRoutes;
