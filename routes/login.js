var express = require('express');
var router = express.Router();
var multer = require('multer')
var fs = require('fs');

// var bodyParser = require('body-parser');


/* GET login page. */
router.get('/home', function (req, res, next) {
    res.render('home', { title: 'Express' });
});

router.get('/firewareManage', function (req, res, next) {
    res.render('firewareManage', { title: 'firewareManage' });
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
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    console.log("上传完成");
    console.log(req.files); // the uploaded file object
    console.log(req.files.firewareupload); // the uploaded file object
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let firewareupload = req.files.firewareupload;

  // Use the mv() method to place the file somewhere on your server
  firewareupload.mv('./tmp/' + req.files.firewareupload.name, function(err) {
    if (err)
      return res.status(500).send(err);
      return res.json("｛2：1}");
  });


});

module.exports = router;
