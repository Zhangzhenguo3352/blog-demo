//1,
var mongoose = require('mongoose');
// 2,
var config = require('../config');

var db = mongoose.connect(config.dbUrl)
db.connection.on('error',function(error){console.log('数据库链接成功')})
db.connection.on('open',function(){console.log('数据库链接成功')})

//3,
// 用户信息 数据库
exports.User = db.model('user',new mongoose.Schema({
	username:String,
	password:String,
	avatar:String
}))

// 显示文章列表数据库，这个库是 20161020blog  的  aticos  
exports.Atico = db.model('atico',new mongoose.Schema({
	user:{type:mongoose.Schema.Types.ObjectId,ref:'user'}, // 用户的类型一定是 合法的 用户ID，ref:user2 它的值一定是一个合法的user2 
	title:String,   // 发表留言的 标题
	centent:String,  // 发表留言 的内容
	poster:String, // 上传图片
	createAt:{type:Date,default:Date.now()} //发表留言的 时间
}))














