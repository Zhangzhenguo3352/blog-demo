var express = require('express');
var router = express.Router();
var auth = require('../midwar/auto');

/* GET users listing. */
router.get('/',auth.checkLogin, function(req, res, next) {
	//用户提出提醒
	req.flash('success','用户退出成功 !')	
	// 删除会话
  req.session.user = null;
  res.redirect('/')

});

module.exports = router;
