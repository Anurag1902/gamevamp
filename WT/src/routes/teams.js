import loginController from "../controllers/loginController";

var express = require('express');
var router = express.Router();
var db=require('./../configs/DBConnection');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/team-list',loginController.checkLoggedIn, function(req, res, next) {
  // console.log(req.user.id);
  // console.log(process.env.USER);
  let y = process.env.USER;
  y = parseInt(y);
  db.query('SELECT teams.id,teams.teamname,teams.member1,teams.member2,teams.member3,teams.member4,teams.member5 FROM users INNER JOIN teams on users.id =teams.team_id WHERE teams.team_id='+y,
    function (err, rows) {
       res.render('team-list', {
      userData: rows,
    });
    }
  );
//   var sql='SELECT * FROM teams where team_id='+y;
//   db.query(sql, function (err, data, fields) {
//     // console.log(err);
//     console.log(data);
   
   
// });
});
router.get('/edit/:id', function(req, res, next) {
  var UserId= req.params.id;
  var sql=`SELECT * FROM teams WHERE id=${UserId}`;
  db.query(sql, function (err, data) {
    if (err) throw err;
   
    res.render('teams-form', { title: 'Team List', editData: data[0]});
  });
});
router.post('/edit/:id', function(req, res, next) {
var id= req.params.id;
var updateData=req.body;
var sql = `UPDATE teams SET ? WHERE id= ?`;
db.query(sql, [updateData, id], function (err, data) {
if (err) throw err;
// console.log(data.affectedRows + " record(s) updated");
});
res.redirect('/teams/team-list');
});
router.get('/delete/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'DELETE FROM teams WHERE id = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    // console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/teams/team-list');
  
});
module.exports = router;