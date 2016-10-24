var express = require('express');
//处理路径的 path.join  、path.resolve
var path = require('path');
// 处理 收藏夹图标的
var favicon = require('serve-favicon');
// 写日志用的
var logger = require('morgan');
// 解析cookie ,  req.cookie.xxx
// req.cookie('key','value')  写入cookie
var cookieParser = require('cookie-parser');
// 处理请求体的 req.body  属性 存放着请求体的对象
var bodyParser = require('body-parser');
// 主页路由
var routes = require('./routes/index');
// 用户路由
var signOut = require('./routes/signOut');
//登录
var login = require('./routes/login');
//注册
var user_req = require('./routes/user_req');
// 发表文章
var atico = require('./routes/atico');
// 中间件 session , 用时 要 在 cookieParser 后面
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require('./config');
// 页面通知，如：登录成功有个提示，登录失败有个提示
var flash = require('connect-flash');
// 得到 app
var app = express();

// 设置模板的 存放路径，当前下面的 views 模板
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎
app.set('view engine', 'ejs');
// 修改默认模板引擎的的后缀 ，这里我改变了 默认ejs ,变成了 .html
// app.engine('html',require('ejs').__express)

// 在你把 favicon 图标放置在 public 目录之后取消注释
// 必须是 .ico 后缀的 图标，没有可以 百度搜索，"favicon.ico制作"
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 日志记录中间件， dev 日志的格式
app.use(logger('dev'));
//
app.use(bodyParser.json()); // 处理 json 的请求
app.use(bodyParser.urlencoded({ extended: false }));// 处理content-type=urlencoded 的形式



app.use(cookieParser());
app.use(session({ // session 依赖 cookieParser 要放在它的后面
    secret:'aa', //加密的字符串
    resvae:true, //是否每次响应后，都保持数据
    saveUnintialized:true, //保存新创建但 未初始化的 session
    store:new MongoStore({
      url:config.dbUrl
    })   // 指定 session 存放的位置
}))
//页面通知，依赖session 所以要放在 session的后面
app.use(flash())
app.use(function(req,res,next){
  // res.locals 才是真正的渲染模板的对象
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})
// 开启了一个 静态文件 打我路径，在public 目录下，开了一个服务，就可以访问下面的文件了
app.use(express.static(path.join(__dirname, 'public')));

//指定我们的路由
app.use('/', routes);
app.use('/signOut', signOut);
app.use('/login', login);
app.use('/user_req', user_req)
app.use('/atico', atico)


// 捕获404 错误，并转发到 错误中间件
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理

// 开发时的错误处理
// 如果它是开发环境的话，走这个，
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    // 设置状态码
    res.status(err.status || 500);
    // 渲染模板
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// 生产环境下的 错误处理
// 不向用户暴露错误信息，没有如果 === 'development'
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}  // 看这，是一个空对象
  });
});


module.exports = app;
