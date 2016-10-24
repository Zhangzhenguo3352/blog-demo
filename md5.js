//  
	var md = require('crypto').createHash('md5').update('1').digest('hex')
	console.log(md) // c4ca4238a0b923820dcc509a6f75849b


//上面的 只是 简介了点，结果一样
	var crypto = require('crypto');

	var md5 = crypto.createHash('md5')
	// md5.update('xx') 是要传入要转化的 md5 的值
	// digest('hex') 调用了才会转化 成 md5, 16进制输出的值
	var result = md5.update('1').digest('hex')
	console.log(result) // c4ca4238a0b923820dcc509a6f75849b
