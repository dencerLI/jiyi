var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
res.render('login', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
res.render('register', { title: 'Express' });
});
router.get('/adminIndex', function(req, res, next) {
res.render('adminIndex', { title: 'Express' });
});
router.get('/file', function(req, res, next) {
res.render('file', { title: 'Express' });
});
router.get('/sidebar', function(req, res, next) {
res.render('sidebar', { title: 'Express' });
});
module.exports = router;
