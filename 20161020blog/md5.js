exports.md5 = function(data){
	return require('crypto').createHash('md5').update(data).digest('hex')
}