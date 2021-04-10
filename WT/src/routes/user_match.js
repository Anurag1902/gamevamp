var express = require('express');
var router = express.Router();
var db=require('./../configs/DBConnection');

router.get('/match', function(req, res, next) {
    var sql='SELECT * FROM match_details';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('match', { title: 'Matches', userData: data});
  });
});

module.exports = router;