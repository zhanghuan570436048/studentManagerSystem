//连接框架express
let express = require("express");
let svgCaptcha = require('svg-captcha');

let path = require("path");
//创建对象
let app = express();
//设置托管静态资源
app.use(express.static('static'));
//get 方式直接返回静态页面
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'/static/views/login.html'));
})
//生成图片的功能
//把这个地址设置给登录页的图片 的src属性
app.get('/login/captchaImg',(req,res)=>{
    var captcha = svgCaptcha.create();
    //打印验证码
    console.log(captcha.text);
    res.type('svg');
    res.status(200).send(captcha.data);
})


//监听端口
app.listen(88,'127.0.0.1',()=>{
    console.log("success");
})