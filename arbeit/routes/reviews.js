var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection(require('../config/dbconfig.js'));


/* GET reviews listing. */
router.get('/', function(req, res, next) {
  var sql = 'SELECT * FROM review';
  console.log(sql);

  var query = connection.query(sql, function(err,rows){
    if (err) {
      console.error(err);
    }
    console.log(rows);
    res.json(rows);
  });
});

/*Get review lists*/
router.get('/reviewlist', function(req, res, next) {
  var sql = 'select u.companyname as companyname, AVG(r.ratingpoint) as rates, r.reviewid from Review r join contract c on r.contractid = c.contractid join  user u on c.ownerid = u.companyid group by u.companyname  order by AVG(r.ratingpoint) desc';
  console.log(sql);

  var query = connection.query(sql, function(err,rows){
    if (err) {
      console.error(err);
    }
    console.log(rows);
    res.json(rows);
  });
});

/*Get specific reviews*/
  router.get('/specific', function(req, res, next) {
  var sql = "select r.userid as id, u.companyname as companyname, r.ratingpoint as rate"+
    " , r.content as content, date_format(r.date, '%Y-%m-%d') as date"+
"  from Review r join contract c on r.contractid = c.contractid join  user u on c.ownerid = u.companyid  "+
" group by u.companyname   order by r.date desc"
  console.log(sql);

  var query = connection.query(sql, function(err,rows){
    if (err) {
      console.error(err);
    }
    console.log(rows);
    res.json(rows);
  });
});

/* POST review. */
router.post('/', function(req, res, next) {
  var review = {
              'reviewid':req.body.reviewid,
              'contractid':req.body.contractid,
              'content':req.body.content,
              'reviewstate':req.body.reviewstate,
              'date':req.body.date,
              'ratingpoint':req.body.ratingpoint,
              'userid':req.body.userid
             };
    var query = connection.query('insert into review set ?',review,function(err,result){
    if (err) {
    console.error(err);
    throw err;
    }
    console.log(query);
    res.send(200,'success');
    });

});


module.exports = router;
