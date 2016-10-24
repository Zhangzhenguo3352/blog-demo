var express = require('express');
var router = express.Router();
var modules = require('../modul')
var md5_pass = require('../md5');
var auth = require('../midwar/auto'); 
/* GET users listing. */
router.get('/',auth.checkNoLogin, function(req, res, next) {
  res.render('login',{
  	title:'登录'
  });
});

// 登录表单 post 请求
router.post('/',auth.checkNoLogin,function(req,res){
	//md5 加密 解读密码
	req.body.password = md5_pass.md5(req.body.password)

	modules.User.findOne({
		username:req.body.username,
		password:req.body.password
	},function(err,doc){
		if(err){ // 数据库 查找的 语句有问题
			// 在这个 登录页面，不跳转 继续登录
			res.redirect('/login')
			req.flash('error','用户登录失败')
		}else{ // 找到了用户，说明登录成功
			// 数据库里有这个 数据
			console.log(doc)
			if(doc){ // doc 返回的是 找到的用户，如果找到用户
				// 如果登录成功后把查询到的用户赋给session的 user属性
				req.session.user = doc
				req.flash('success','用户登录成功')
				res.redirect('/')
			}else{ // 没有找到用户信息
				req.flash('error','用户登录失败')
				res.redirect('/login')
			}
		}
	})
})
module.exports = router;
