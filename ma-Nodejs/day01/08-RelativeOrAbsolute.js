const fs = require('fs');
const path = require('path');

// 相对路径不安全
// 相比较绝对路径不容易出问题

// __dirname 获取的是当前文件下的绝对路径
console.log(__dirname); // F:\ma_NodeJs\day01
// 使用路径join方法拼接路径
console.log(path.join(__dirname, '01-helloworld.js')); //F:\ma_NodeJs\day01\01-helloworld.js

fs.readFile(path.join(__dirname, '01-helloworld.js'), 'utf-8', (err, doc) => {
    console.log(err);
    console.log(doc);
})