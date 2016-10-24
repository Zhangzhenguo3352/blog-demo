var express = require('express');
var router = express.Router();
var modules = require('../modul');
var auth = require('../midwar/auto');

router.get('/',auth.checkLogin,function(req,res){
	res.render('atico',{title:'发表留言'})
})
router.post('/',auth.checkLogin,function(req,res){
	var user_submit = req.body; // 用户发表的留言

	user_submit.user = req.session.user._id //把当前用户的 id 放到，一个变量上
	//准备放到发表文章的数据库
	// 写入数据库的 第四部
	modules.Atico.create(user_submit,function(err,doc){
		if(err){
			req.flash('error','发表文章失败')
		}else{
			req.flash('success','发表文章成功')
			res.redirect('/')
		}
	})

})
module.exports = router