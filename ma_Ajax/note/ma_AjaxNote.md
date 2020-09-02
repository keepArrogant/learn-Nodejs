## Ajax 基础

### 传统网站中存在的问题

- 网速慢的情况下，页面加载时间长，用户只能等待。
- 表单提交后，如果一项内容不合格，需要重新填写所有表单内容。
- 页面跳转，重新加载页面，造成资源浪费，增加用户等待事件。

### Ajax 概述

Ajax：标准读音[`'eidʒæks`] ，中文音译：阿贾克斯

它是浏览器提供的一套方法，可以实现页面无刷新更新数据，提高用户浏览网站应用的体验。

### Ajax 的应用场景

- 页面上拉加载更多数据
- 列表数据无刷新分页
- 表单离开焦点数据验证
- 搜索框提示文字下拉列表

### Ajax 的运行环境

Ajax技术`需要运行在网站环境中才能生效`，当前课程会使用Node创建的服务器作为网站服务器。 

### Ajax 运行原理

Ajax相当于浏览器发送请求与接收响应的代理人，以实现在不影响用户浏览页面的情况下，局部更新页面数据，从而提高用户体验。

### 请求参数传递

- GET请求方式

  ```javascript
  xhr.open('get', 'http://localhost:3000/get?username=xhx&age=18');
  ```

- POST请求方式

  ```javascript
  // 设置请求参数格式的类型（post请求必须要设置）
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  // 发送请求
  xhr.send('name=zhangsan&age=20');
  ```

  - 在服务器上需要多设置几个参数  

    - 引入第三方模块   配置解析什么格式类型的数据

      ```javascript
      // bodyParser第三方模块可以接收post请求参数
      const bodyParser = require('body-parser');
      //配置要解析什么格式的数据
      app.use(bodyParser.urlencoded({
          extended: true
      }));
      ```

### 请求报文

- 在HTTP请求和响应的过程中传递的数据块就叫报文，包括要传递的数据和一些附加信息，这些数据和信息要遵守规定好的格式。

### 请求参数的格式

- `application/x-www-form-urlencoded`

  ```javascript
  // 通过请求头告诉服务器端客户端向服务器端传递的请求参数的格式是什么
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  //name=zhangsan&age=20&sex=男
  ```

- `application/json`

  ```javascript
  // 通过请求头告诉服务器端客户端向服务器端传递的请求参数的格式是什么
  xhr.setRequestHeader('Content-Type', 'application/json');
  //{name: 'zhangsan', age: '20', sex: '男'};
  JSON.stringify(); //将json对象转换为json字符串
  ```

**注意：get请求是不能提交`json`对象数据格式的，传统网站的表单提交也是不支持json对象数据格式的。**

### 获取服务器端的响应

####  Ajax状态码

- 在创建a`ajax`对象，配置`ajax`对象，发送请求，以及接收完服务器端响应数据，这个过程中的每一个步骤都会对应一个数值，这个数值就是`ajax`状态码。

  - 0：请求未初始化(还没有调用open())
  - 1：请求已经建立，但是还没有发送(还没有调用send())
  - 2：请求已经发送
  - 3：请求正在处理中，通常响应中已经有部分数据可以用了
  - 4：响应已经完成，可以获取并使用服务器的响应了

  ```javascript
  xhr.readyState  //获取Ajax状态码
  ```

#### `onreadystatechange`事件

- 当Ajax状态码发送变化时将自动触发该事件。

|        区别描述        | `onload`事件 | `onreadystatechange`事件 |
| :--------------------: | :----------: | :----------------------: |
|    是否兼容IE低版本    |    不兼容    |           兼容           |
| 是否需要判断Ajax状态码 |    不需要    |           需要           |
|       被调用次数       |     一次     |           多次           |

### `Ajax`错误处理

- 网络畅通，服务器端能够接收到请求，服务器端返回的结果不是预期结果。
  - **可以判断服务器端返回的状态码，分别进行处理。`xhr.status`获取`http`状态码。**

- 网络畅通，服务器端没有接收到请求，返回404状态码。
  - 检查请求地址是否错误。
- 网络畅通。服务器端能接收到请求，服务器端返回500状态码。
  - 服务器端错误，找后端程序员进行沟通。
- 网络中断，请求无法发送到服务器端。
  - 会触发`xhr`对象下面的`onerror`事件，在`onerror`事件处理函数中对错误进行处理。

### 低版本IE 浏览器的缓存问题

 **问题：**在低版本的IE浏览器中，Ajax请求有严重的缓存问题，即在请求地址不发生变化的情况下，只有第一次请求会真正发送到服务器端，后续的请求都会从浏览器的缓存中获取结果，即使服务器端的数据更新了，客户端依然拿到的是缓存中的旧数据。

**解决方案**：在请求地址的后面加请求参数，保证每一次请求中的请求参数的值不相同。

```javascript
xhr.open('get', 'http://localhost:3000/cache?t=' + Math.random());
```

### 同步异步概述

#### 同步

- 一个人同一时间只能做一件事件，只有一件事件做完，才能做另外一件事件。

- 落实到代码中，就是上一行代码执行完成后，才能执行下一行代码，即代码逐行执行。

  ```javascript
  console.log('before');
  console.log('after');
  ```

#### 异步

- 一个人一件事件做了一半，转而去做其他事件，当其他事件做完以后，再回过头继续做之前未完成的事情。

- 落实到代码上，就是异步代码虽然需要花费时间去执行，但程序不会等待异步代码执行完成后再继续执行后续代码，而是直接执行后续代码，当后续代码执行完成后再回头看异步代码是否返回结果，如果已有返回结果，再调用事先准备好的回调函数处理异步代码执行的结果。

  ```javascript
  console.log('before');
  setTimeout(
      () => {console.log('last');
   },2000);
  console.log('after');   //依次输出before和after然后再是last，before输出了之后不会等待中间last输出完在输出after
  ```

### `Ajax`封装

问题：发送一次请求代码过多，发送多次请求代码冗余且重复。

解决方案：将请求代码封装到函数中，发请求时调用函数即可。

```javascript
function ajax(options) {
    // 创建ajax对象
    var xhr = new XMLHttpRequest();
    // 配置ajax对象
    xhr.open(options.type, options.url);
    // 发送请求
    xhr.send();
    // 监听xhr对象下面的onload事件
    // 当xhr对象接收完响应数据后触发
    xhr.onload = function () {
        options.success(xhr.responseText);
    }
}

ajax({
    // 请求方式
    type: 'get',
    //请求地址
    url: 'http://localhost:3000/first',
    //自定义函数
    success: function (data) {
        console.log('这是success函数 ' + data);
    }
});
```

**更详细的封装，并且有默认配置**

```javascript
 function ajax(options) {
            // 存储的是默认值
            var defaults = {
                type: 'get',
                url: '',
                data: {},
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function () {},
                error: function () {}
            };

            // 使用options对象中的属性覆盖defaults对象中的属性
            Object.assign(defaults, options);

            // 创建ajax对象
            var xhr = new XMLHttpRequest();
            // 拼接请求参数的变量
            var params = '';
            // 循环用户传递进来的对象格式参数
            for (var attr in defaults.data) {
                // 将参数转换为字符串格式
                params += attr + '=' + defaults.data[attr] + '&';
            }
            // 将参数最后面的&截取掉
            // 将截取的结果重新赋值给params变量
            params = params.substr(0, params.length - 1);

            // 判断请求方式
            if (defaults.type == 'get') {
                defaults.url = defaults.url + '?' + params;
            }
            // 配置ajax对象
            xhr.open(defaults.type, defaults.url);
            // 如果请求方式为post 
            if (defaults.type == 'post') {
                // 用户希望的向服务器端传递的请求参数的类型
                var contentType = defaults.header['Content-Type'];
                // 设置请求参数格式的类型
                xhr.setRequestHeader('Content-Type', contentType);
                // 判断用户希望的请求参数格式的类型
                // 如果类型为json
                if (contentType == 'application/json') {
                    // 向服务器端传递json数据格式的参数
                    xhr.send(JSON.stringify(defaults.data))
                } else {
                    // post请求参数需要通过xhr.send()方法去传递
                    xhr.send(params);
                }
            } else {
                // 那么就是get请求， 直接发送请求
                xhr.send();
            }
            // 监听xhr对象下面的onload事件
            // 当xhr对象接收完响应数据后触发
            xhr.onload = function () {

                // xhr.getResponseHeader()
                // 获取响应头中的数据
                var contentType = xhr.getResponseHeader('Content-Type');
                // 服务器端返回的数据
                var responseText = xhr.responseText;

                // 如果响应类型中包含application/json
                if (contentType.includes('application/json')) {
                    // 将json字符串转换为json对象
                    responseText = JSON.parse(responseText);
                }

                // 当http状态码等于200的时候
                if (xhr.status == 200) {
                    defaults.success(responseText, xhr);
                } else {
                    // 请求失败 调用处理失败情况的函数
                    defaults.error(responseText, xhr)
                }
            }
        }

        ajax({
            type: 'post',  //type可以删除，也可自行设置
            url: 'http://localhost:3000/responseData',
            success: function (data) {
                console.log('这是success函数 ' + data);
                console.log(data);
            }
        });
```

### 模板引擎概述

作用： 使用模板引擎提供的模板语法，可以将数据和HTML拼接起来  `百度：art-template`

#### 使用步骤

```html
<!-- 1. 将模板引擎的库文件引入到当前页面 -->
<script src="../js/template-web.js"></script>
```

```javascript
// 2. 准备art-template 模板
<script type="text/html" id="tpl">
    <h1>{{username}} {{age}}</h1>
</script>
```

```javascript
// 3. 告诉模板引擎将哪个数据和哪个模板进行拼接
        // 参数分别是: 模板id  数据(对象类型)
<script type="text/javascript">
        var html = template('tpl', {
            username: '古力娜扎',
            age: 28
        });
//4. 把拼接好的html字符串添加到页面上
document.querySelector('#container').innerHTML = html;
```

```html
<!-- 5. 接收上面字符串的块元素 -->
<div id="container"></div>
```

## 同源政策

### Ajax 请求限制

Ajax只能向自己的服务器发送请求。比如现在有一个A网站，有一个B网站，A网站中的HTML文件只能向A网站服务器中发送Ajax请求；B网站中的HTML文件只能向B网站中发送Ajax请求，但是A网站是不能向B网站发送Ajax请求的，同理，B网站也不能向A网站发送Ajax请求。

### 什么是同源

如果两个页面拥有相同的协议、域名和端口，那么这两个页面就属于同一个源，其中只要有一个不相同，就是不同源。

### 同源政策的目的

同源政策是为了保证用户信息的安全，防止恶意的网站窃取数据。最初的同源政策是指A网站在客户端设置的Cookie，B网站是不能访问的。

随着互联网的发展，同源政策也越来越严格，在不同源的情况下，其中有一项规定就是无法向非同源地址发送Ajax请求，如果请求，浏览器就会报错。

### 使用`JSONP`解决同源限制问题

- `jsonp` 是`json with padding`的缩写，它不属于Ajax请求，但它可以模拟Ajax请求。

  - 1.将不同源的服务器端请求地址写在script标签的src属性中

    ```javascript
    <script src="www.baidu.com"></script>
    ```

  - 2.服务器端响应数据必须是一个函数的调用，真正要发送给客户端的数据需要作为函数调用的参数。

    ```javascript
    const data = 'fn({name: "张三", age: "20"})';
    res.send(data);
    ```

  - 3.在客户端全局作用域下定义函数fn

    ```javascript
    function fn(data){}
    ```

  - 4.在fn函数内部对服务器端返回的数据进行处理

    ```javascript
    function fn(data) { console.log(data)};
    ```

### `withCredentials`属性

- 在使用`Ajax`技术发送跨域请求时，默认情况下不会在请求中携带cookie信息。
- `withCredentials`指定在涉及到跨域请求时，是否携带cookie信息，默认值为false
- `Access-Control-Allow-Credentials`: true 允许客户端发送请求时携带cookie

