var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// 如果 login (登录用户了) 存在，就是有值，不存在 就是undefined
	var user = req.session.user; 
  res.render('index', { title: '首页' ,user:user});
});

module.exports = router;
