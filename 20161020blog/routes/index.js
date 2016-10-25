var express = require('express');
var router = express.Router();
var modules = require('../modul')

/* GET home page. */
router.get('/', function(req, res, next) {
	// 如果 login (登录用户了) 存在，就是有值，不存在 就是undefined
	modules.Atico.find({}).populate('user').exec(function(err,atico){
		res.render('index',{atico:atico,title:'首页'})
	})
  
});

module.exports = router;
