var express = require('express');

var multer  = require('multer');
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var uploadModel = require('../model/upload');
var user = require('../model/user')
var router = express.Router();
// var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
// app.use(cookieParser())
// app.set('trust proxy', 1)
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: 1000*60*60*24 }
// }))
mongoose.connect('mongodb://localhost/vnex');
var anhs = [];
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './anhsanpham')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage })
/* GET home page. */
router.get('/thembai', function(req, res, next) {
  if(req.session.username){
    console.log("Đúng rồi ")
    res.render('thembai', { title: 'Express' });
  }
  else{
    console.log("Sai rồi")
  }
});
//Đăng nhập
router.post('/dangnhap', function(req, res, done){
  var username = req.body.username
  var password = req.body.password
  var kt = true
  user.find({}, function(err, data){
    data.forEach(function(motdn){
      if(motdn.username==username && motdn.password==password){
        req.session.username = username
        kt = true
        return true
      }
      else{
        kt = false
      }
    })
    if(kt==true){
      //req.session.username = username
      var err = 1
      res.json(err)
    }
    else{
      var err = 2
      res.json(err)
    }
  })

})
//Đăng ký
router.post('/dangky', function(req, res,done){
  var username = req.body.username
  var password = req.body.password
  console.log(username)
  var userName = []
  var kt = true
  user.find({}, function(req, data){
    data.forEach(function(mottk){
      if(mottk.username == username){
        kt = false
        return false
      }
      else {
        kt=true
      }
    })
    if(kt==false){
      console.log("Username đã tồn tại")
      var err = 1
      res.json(err)
    }
    else{
      var err = 2
        var data = new user();
        data.username = username;
        data.password = password;
        data.save()
        res.json(err)
    }
   
   
  })
})
router.get('/ketqua',function(req, res){
  res.render('ketqua')
})
 router.get('/kquadangnhap', function(req,res){
   res.render('kquadangnhap')
 })   //
 
 //Like
 router.get('/like.:idsanpham', function(req, res){
   var id1 = req.params.idsanpham;
   console.log(id1)
   uploadModel.findById( id1, function(err, dulieu){
    if (err) return handleError(err);
    dulieu.like = dulieu.like + 1
    dulieu.save()
    var data = dulieu.like 
    var data1 = dulieu.title
    console.log(data)
    res.json(data)
   })
  })
 router.get('/comment.:idsanpham', function(req, res){
   var id1 = req.params.idsanpham;
   console.log(id1)
   uploadModel.findById( id1, function(err, dulieu){
    if (err) return handleError(err); 
    var data1 = dulieu.title
    res.json(data1)
   })
  })

//Up bài viết
router.post('/uploadanh',upload.any(), function(req, res, next) {
  var tenanh = req.files[0].path;
  anhs.push(tenanh);
  res.status(200).send(req.files);
});
router.post('/upnd', function(req, res, next) {
  var like = 0
  var title = req.body.title;
  var subtitle = req.body.subtitle;
  var content = req.body.content;
  var tag = req.body.tag;
  var motdoituong = {
    "like" : like,
    "title" : title,
    "subtitle" : subtitle,
    "content" : content,
    "tag" : tag,
    "anh" : anhs
  }
  var dulieu = new uploadModel(motdoituong);
  dulieu.save();
  res.render('thanhcong');
});

router.get('/', function(req, res, next) {
  uploadModel.find({}, function(req,dulieu){
    res.render('trangchu', { data: dulieu });
  })
  
});

router.get('/chitiet.:idsanpham', function(req, res, next) {
  var id2 = req.params.idsanpham
  uploadModel.find({}, function(req, dulieu){
    res.render('chitiet', { data: dulieu, idsanpham : id2  })
  })
});

module.exports = router;
