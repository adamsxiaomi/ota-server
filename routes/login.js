var express = require('express');
var router = express.Router();
var multer = require('multer')
var fs = require('fs');


// MQTT

var mosca = require('mosca');
var mqtt = require('mqtt')

//mqtt server
var ascoltatore = {
    //using ascoltatore
    //type: 'mongo',
    //url: 'mongodb://localhost:27017/mqtt',
    //pubsubCollection: 'ascoltatori',
    //mongo: {}
};

var settings = {
    port: 18886,
    backend: ascoltatore
};

//client
var client = mqtt.connect('tcp://172.16.0.224:18886')

var fs = require('fs');
var path = require('path');

function displayFile(param) {
    //转换为绝对路径
    var param = path.resolve(param);
    fs.stat(param, function (err, stats) {
        //如果是目录的话，遍历目录下的文件信息
        if (stats.isDirectory()) {
            fs.readdir(param, function (err, file) {
                file.forEach((e) => {
                    //遍历之后递归调用查看文件函数
                    //遍历目录得到的文件名称是不含路径的，需要将前面的绝对路径拼接
                    var absolutePath = path.resolve(path.join(param, e));
                    displayFile(absolutePath)
                })
            })
        } else {
            //如果不是目录，打印文件信息
            console.log(param)
        }
    })
}

router.post('/update', function (req, res, next) {
    console.log("updateing");
    client.publish('/ROUTING/3/0100124B0013A4BE48/ota/sub', '升级可以开始了！');
    return res.status(200).send("操作成功");
    // return res.end();
});


/* GET login page. */
router.get('/home', function (req, res, next) {
    res.render('home', { title: 'Express' });
});

router.get('/firewareManage', function (req, res, next) {
    displayFile('../')
    res.end();
    // res.render('firewareManage', { title: 'firewareManage' });
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
