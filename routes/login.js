var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


/* GET login page. */
router.get('/home', function (req, res, next) {
    res.render('home', { title: 'Express' });
});
//封装函数
function showMessage(message,res){
    var result=`<script>alert('${message}');history.back()</script>`;
    return res.send(result);
}

router.post('/login', function (req, res, next) {
    if(req.body.username == "admin" && req.body.password == "1"){
        // showMessage("登录成功",res)
        return res.redirect('/home');
    }else{
        //调用
        showMessage("登录失败，请检查用户名密码是否正确",res)
        console.log("密码输入错误");
    }
});
router.post('/upload', function (req, res, next) {

        // showMessage("上传完成",res)
    console.log("上传完成");

});

module.exports = router;
