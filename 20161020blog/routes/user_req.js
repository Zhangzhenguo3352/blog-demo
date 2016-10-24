var express = require('express');
var router = express.Router();
var modules = require('../modul')
var md5_pass = require('../md5');
var auth = require('../midwar/auto');  // 校验是否登录，调用不同的情况

// 这是注册页面
/* GET users listing. */
router.get('/',auth.checkNoLogin, function(req, res, next) {
  res.render('user_req',{title:'注册'});

});
router.post('/',auth.checkNoLogin,function(req,res){
	// 添加 md5 加密
	req.body.password = md5_pass.md5(req.body.password)
	req.body.avatar = 'http://60.205.187.149:4000/server/dataAll/image/home_list_img/c0.jpg'
	
	var user = req.body
	modules.User.create(user,function(err,doc){
		if(err){
			console.log(err)
			req.flash('error','用户注册失败')
		}else{
			console.log(doc+'=====================')
			// 写入数据库成功了后，页面跳转 到首页
			req.flash('success','用户注册成功')
			res.redirect('/')
			
		}
	})
})

module.exports = router;
