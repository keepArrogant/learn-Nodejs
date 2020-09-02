const fs = require('fs');

fs.writeFile('./demo.txt', '我已经刻在你的脑子里啦', err => {
    if (err) {
        console.log('文件内容写入失败');

    } else {
        console.log('文件内容写入成功');
    }
});