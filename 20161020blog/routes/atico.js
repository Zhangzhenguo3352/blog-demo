var express = require('express');
var router = express.Router();
var modules = require('../modul');
var auth = require('../midwar/auto');

var multer  = require('multer');
//指定存储的目录和文件名
var storage = multer.diskStorage({
	//目标路径

	destination:function(req,file,cb){
		console.log('sds')
		cb(null,'../public/uploads')
	},
	//文件名
	filename:function(req,file,cb){
		console.log('00000000000000000000')
		cb(null,file)
	}
})

var upload = multer({storage:storage})

router.get('/',auth.checkLogin,function(req,res){
	res.render('atico',{title:'发表留言'})
})
// upload.single('file') 这个 file 是 input="file" 的 name
router.post('/',auth.checkLogin,upload.single('file'),function(req,res){
	var user_submit = req.body; // 用户发表的留言
	console.log('================'+req.file+'===================')
	user_submit.user = req.session.user._id //把当前用户的 id 放到，一个变量上
	//准备放到发表文章的数据库
	// 写入数据库的 第四部
	console.log(user_submit)
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




















