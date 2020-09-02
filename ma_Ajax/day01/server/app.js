// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// bodyParser第三方模块可以接收post请求参数
const bodyParser = require('body-parser');
// 引入fs模块
const fs = require('fs');
// 创建web服务器
const app = express();

//配置要解析传统的get post请求来的数据
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// 配置要解析的json数据
app.use(bodyParser.json());

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

// 对应01html
app.get('/first', (req, res) => {
    res.status(400).send('hello Ajax');
})
// 对应02html
app.get('/responseData', (req, res) => {
    res.send({
        'name': '古力娜扎'
    });
});

// 对应03html
app.get('/get', (req, res) => {
    res.send(req.query);
})

// 对应04html
app.post('/post', (req, res) => {
    res.send(req.body);
})

// 对应05html
app.post('/json', (req, res) => {
    res.send(req.body);
});

// 对应06html
app.get('/readystate', (req, res) => {
    res.send('hello');
});

// 对应07html
app.get('/error', (req, res) => {
    res.status(400).send('not ok');
});

// 对应08html
app.get('/cache', (req, res) => {
    fs.readFile('./test.txt', (err, result) => {
        res.send(result);
    });
});

// 对应09html
app.get('/async', (req, res) => {
    res.send('hello ajax');
});
// 对应10html
app.post('/first', (req, res) => {
    res.send('hello Ajax');
})
// 监听端口
app.listen(3000);
// 控制台提示成功
console.log('服务器启动成功');