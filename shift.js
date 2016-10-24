var arr = [1,2,3]
// shift()  	方法用于把第一个元素删除，并返回删除掉的元素的值
arr.push(4)
console.log(arr) //[ 1, 2, 3, 4 ]  // 结尾增加一个数组

console.log(arr.shift()) // 1   // 拿出第一个

console.log(arr) // shift()  删掉了第一个元素，所以 [ 2, 3, 4 ]