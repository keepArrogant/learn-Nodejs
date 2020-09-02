## Node

### 1.1Node是什么

- Node是一个基于Chrome V8引擎的JavaScript代码运行环境。

**运行环境**

- 浏览器(软件)能够运行JavaScript代码，浏览器就是JavaScript代码的运行环境。
- Node(软件)能够运行JavaScript代码，Node就是JavaScript代码的运行环境。

### 1.2 Node.js运行环境安装

- 官网： http://nodejs.org/en/
  + LTS = Long Term Support 长期支持版 稳定版
  + Current 拥有最新特性 实验版

### 1.3 Node.js 的组成

- JavaScript 由三部分组成，ECMAScript，DOM，BOM。
- Node.js是由 ECMAScript及Node环境提供的一些附加API组成的，包括文件、网络、路径等等一些更加强大的API。

### 1.4 JavaScript 开发弊端

- JavaScript在使用时存在两大问题，**文件依赖**和**命名冲突**。

### 1.5 软件中的模块化开发

- 一个功能就是一个模块，多个模块可以组成完整应用，抽离一个模块不会影响其他功能的运行。

### 1.6 Node.js中模块化开发规范

- Node.js规定一个**JavaScript文件**就是一个模块，模块**内部定义的变量和函数**默认情况下在**外部无法得到**
- 模块内部可以使用**exports对象进行成员导出**，使用**require方法**导入其他模块

### 1.7 模块成员导出

```javascript
//a.js
//在模块内部定义变量
let version = 1.0;
//在模块内部定义方法
const sayHi = name => `您好，${name}`;
//向模块外部导出数据
exports.version = version;
exports.sayHi = sayHi;
```

### 1.8 模块成员导入

```javascript
//b.js
//在b.js模块中导入模块a  本代码的 a.js 和 b.js 属于同一个文件夹下
let a = require('./a.js');
//输出a模块中的version变量
console.log(a.version); //1.0
//调用a模块中的sayHi方法 并输出其返回值
console.log(a.sayHi(`nodejs`)); //您好，nodejs
```

- 导入模块时 后缀可以省略 :如上代码 `let a = require('./a');`

### 1.9 模块成员导出的另一种方式

```javascript
module.exports.version = version;
module.exports.sayHi = sayHi;
```

- **exports**是**module.exports**的别名 (**地址引用关系**) ，**导出对象最终以module.exports为准**

## 2 系统模块

### 2.1 什么是系统模块

- Node运行环境提供的API。因为这些API都是以模块化的方式进行开发的，所以我们又称Node运行环境提供的API为系统模块。

### 2.2 系统模块 fs 文件操作

- f：file 文件 ， s：system 系统， 文件操作系统

  ```javascript
  const fs = require('fs');
  ```

- #### 读取文件内容  （ []代表可选参数）

  ```javascript
  fs.readFile('文件路径/文件名称',['文件编码'],callback);
  ```

- 读取文件语法示例

  ```javascript
  //读取上一级css目录下中的base.css
  fs.readFile('../css/base.css', 'utf-8', (err,doc) => {
      //如果文件读取发生错误 参数err的值为错误对象 否则err的值为null
      //doc参数为文件内容
      if(err == null) {
          //在控制台中输出文件内容
          console.log(doc);
      }else{
          console.log('文件读取失败');
      }
  });
  ```

- #### 写入文件内容

  ```javascript
  fs.writeFile('文件路径/文件名称', '数据', callback);
  ```

  ```javascript
  fs.writeFile('./demo.txt', '我已经刻在你的脑子里啦', err => {
      if (err) {
          console.log('文件内容写入失败');
      } else {
          console.log('文件内容写入成功');
      }
  });
  ```

### 2.3 系统模块path 路径操作

####  为什么要进行路径拼接

- 不同操作系统的路径分隔符不统一
- /public/uploads/avatar
- Windows 上是 \ /
- Linux 上是 /

### 2.4 路径拼接语法

```javascript
path.join('路径','路径'，...);
```

```javascript
//导入path模块
const path = require('path');
//路径拼接
let finialPath = path.join('itcast', 'a', 'b', 'c.css');
//输出结果 itcast\a\b\c.css
console.log(finialPath);
```

### 2.5 相对路径VS绝对路径

- 大多数情况下使用绝对路径，因为相对路径有时候相对的是命令行工具的当前工作目录
- 在读取文件或者设置文件路径时都会选择绝对路径
- 使用__dirname获取当前文件所在的绝对路径

## 3. 第三方模块

### 3.1 什么是第三方模块

- 别人写好的、具有特定功能的、我们能直接使用的模块即第三方模块，由于第三方模块通常都是由多个文件组成并且被放置在一个文件夹中，所以又名 包。

####  第三方模块有两种存在形式：

- 以js文件的形式存在，提供实现项目具体功能的API接口。
- 以命令行工具形式存在，辅助项目开发。

### 3.2 获取第三方模块

- npm(node package manager)： node的第三方模块管理工具
  + 下载：npm install 模块名称
  + 卸载：npm uninstall 模块名称
- 全局安装与本地安装
  - 全局安装就是安装到整个系统下
  - 本地安装就是安装到本项目下
    + 命令行工具： 全局安装
    + 库文件： 本地安装

### 3.3 第三方模块 nodemon

- **nodemon 是一个命令行工具，用以辅助项目开发。**

- **在Node.js中，每次修改文件都要在命令行工具中重新执行该文件，非常繁琐**。

  #### 使用步骤

  - 使用npm install nodemon -g            下载它
  - 在命令行工具中使用nodemon 命令替代 node 命令执行文件

### 3.4 第三方模块 nrm

- nrm(npm registry manager)： npm下载地址切换工具

- npm默认的下载地址在国外，国内下载速度慢

  #### 使用步骤

  - 使用npm install nrm -g   下载它
  - 查询可用下载地址列表 nrm ls
  - 切换npm下载地址 nrm use 下载地址名称



## 其他知识

### 1. cookie与session

**cookie：浏览器在电脑硬盘中开辟的一块空间，主要供服务器端存储数据**

- cookie中的数据是以域名的形式进行区分的。
- cookie中的数据是有过期时间的，超过时间数据会被浏览器自动删除。
- cookie中的数据会随着请求被自动发送到服务器端。



**session：实际上就是一个对象，存储在服务器端的内存中，在session对象中也可以存储多条数据，每一条数据都有一个sessionId做为唯一标识。**

![1595214787144](F:\ma_NodeJs\cookie和session.png)

- 在node.js 中需要借助express-session 实现session功能

  ```javascript
  const session = require('express-session');
  app.use(session({ secret: 'secret key' }));
  ```

  

### 2. Joi

- JavaScript对象的规则描述语言和验证器。  `npm install joi`

  ```javascript
  const Joi = require('joi');
  const schema = {
      username: Joi.string().alphanum().min(3).max(30).required().error(new 	Error('错误信息')),
  	password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),                         access_token: [Joi.string(), Joi.number()],
  	birthyear: Joi.number().integer().min(1990).max(2020),
  	email: Joi.string().email()    
  };
  Joi.validate({ username: 'abc', birthyear: 1994}, schema);
  ```

### 3. @hapi/joi  

- JavaScript对象的规则描述语言和验证器。  `npm install @hapi/joi`

```javascript
//引入@hapi/joi模块 用来验证提交表单数据是否符合规则
const Joi = require('@hapi/joi');
// 定义对象的验证规则
const schema = Joi.object({
    username: Joi.string().min(2).max(5).required().error(new Error('请输入正确规则的username')),
    birth: Joi.number().min(1998).max(2020).error(new Error('请输入正确规则的birth'))
});

async function run() {
    try {
        // 实施验证
        await schema.validateAsync({
            username: '123456',
            birth: 2000
        });
    } catch (e) {
        console.log(e.message);
        return;
    }
    console.log('验证通过');
}

run();
```

### 4. formidable

- 作用：解析表单，支持get请求参数，post请求参数、文件上传 `npm install formidable`

  ```javascript
  //引入formidable
  const formidable = require('formidable');
  //创建表单解析对象
  const form = new formidable.IncomingForm();
  //设置文件上传路径
  form.uploadDir = "/my/dir";
  //是否保留表单上传文件的扩展名
  form.keepExtensions = false;
  //对表单进行解析
  form.parse(req, (err,fields, files) => {
     //fields 存储普通请求参数
     //files 存储上传的文件信息
  });
  ```

### 5.文件读取FileReader

```javascript
var reader = new FileReader();
reader.readAsDataURL('文件');
reader.onload = function () {
    console.log(reader.result);
}
```

### 6. 数据分页 mongoose-sex-page 

`npm install mongoose-sex-page`

```javascript
const pagination = require('mongoose-sex-page');
pagination(集合构造函数).page(1).size(20).display(8).exec();

{
    "page": 1, //当前页
    "size": 2, //每页显示数据条数
    "total": 8, //总共的数据条数
    "records": [
        //查询出来的具体数据
        {
            "_id": "5c3ef9bb284e4714a4a1cf79"
            "title": "测试文章"
        }
    ],
        "pages": 4, //总共的页数
        "display": [1,2,3,4]  //客户端显示的页码
}
```

### 7. 开发环境与生产环境

- ##### 什么是开发环境与生产环境

  - 环境，就是指项目运行的地方，当项目处于开发阶段，项目运行在开发人员的电脑上，项目所处的环境就是开发环境。当项目开发完成以后，要将项目放到真实的网站服务器电脑中运行，项目所处的环境就是生产环境。

- ##### 为什么要区分开发环境与生产环境

  - 因为在不同的环境中，项目的配置是不一样的，需要在项目代码中判断当前项目运行的环境，根据不同的环境应用不同的项目配置。

- ##### 如何区分开发环境与生产环境

  - 通过电脑操作系统中的系统环境变量区分当前是开发环境还是生产环境
    - 如果是开发环境： 新建系统变量-> 变量名：`NODE_ENV` 变量值：`development`
    - 如果是生产环境： 新建系统变量-> 变量名：`NODE_ENV` 变量值：`production`

### 8. 第三方模块 morgan  

- 将客户端发送到服务器端的请求信息打印倒控制台中

- 下载： `npm install morgan`

  ```javascript
  const morgan = require('morgan');
  app.use(morgan('dev'));
  ```

### 9. 第三方模块 config

 作用：允许开发人员将不同运行环境下的应用配置信息抽离到单独的文件中，模块内部自动判断当前应用的运行环境，并读取对应的配置信息，极大提供应用配置信息的维护成本，避免了当运行环境重复的多次切换时，手动到项目代码中修改配置信息

##### 使用步骤

- 使用 `npm install config`命令下载模块

- 在项目的根目录下新建config文件夹

- 在config文件夹下面新建default.json 、development.json 、production.json文件

- 在项目中通过require方法，将模块进行导入

- 使用模块内部提供的get方法获取配置信息

  - 例：当前是开发环境development

    ```json
    {
        "title": "博客管理系统 ---- 开发环境"
    }
    ```

    ```javascript
    // 导入config第三方模块
    const config = require('config');
    //获取当前环境的title
    console.log(config.get('title'));
    ```

##### 将敏感配置信息存储在环境变量中

- 在config文件夹中建立custom-environment-variables.json文件

- 配置项属性的值填写系统环境变量的名字   新建系统变量-> 变量名：`APP_PASSWORD`变量值：`xhx`

  ```json
  //例如： 在development.json文件中 "db"对象下的"pwd"属性值就配置在这个文件中,而最终的密码又配置在系统的环境变量中，变量名为APP_PASSWORD 
  {
      "db": {
          "pwd": "APP_PASSWORD"
      }
  }
  ```

  

