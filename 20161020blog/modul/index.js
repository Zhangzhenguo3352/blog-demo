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

// 显示文章列表数据库
exports.Atico = db.model('atico',new mongoose.Schema({
	User:{type:mongoose.Types.ObjectID,ref:'users'}, // 用户的类型一定是 合法的 用户ID，ref:user2 它的值一定是一个合法的user2 
	title:String,
	content:String,
	createAt:{type:Date,default:Date.now()} 
}))














