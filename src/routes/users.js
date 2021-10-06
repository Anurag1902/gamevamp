var express = require('express');
var router = express.Router();
var db=require('../configs/DBConnection');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/user-list', function(req, res, next) {
    var sql='SELECT * FROM users';
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      // console.log(data);
    res.render('user-list', { title: 'User List', userData: data});
  });
});

router.get('/edit/:id', function(req, res, next) {
      var UserId= req.params.id;
      var sql=`SELECT * FROM users WHERE id=${UserId}`;
      db.query(sql, function (err, data) {
        if (err) throw err;
       
        res.render('users-form', { title: 'User List', editData: data[0]});
      });
});
router.post('/edit/:id', function(req, res, next) {
  var id= req.params.id;
    var updateData=req.body;
    var sql = `UPDATE users SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/users/user-list');
});

router.get('/delete/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/users/user-list');
  
});

module.exports = router;