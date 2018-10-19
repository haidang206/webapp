var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/user');

passport.serializeUser(function(user, done) {
    done(null, user.username);
  });//hàm được gọi bởi passport.session .Giúp ta lấy dữ liệu user dựa vào thông tin lưu trên session và gắn vào req.user
  
  passport.deserializeUser(function(id, done) {
    User.findById(username, function(err, user) {
      done(err, user);
    }).catch(function(err){
        console.log(err);
    })
  });//hàm được gọi khi xác thực thành công để lưu thông tin user vào session

  //Passport register

  passport.use('local.register', new LocalStrategy(
   function(req, username, password, done){
       console.log("helo")
     User.find(user => user.username = username)
     .then(
        function(err, user){
            if(err){
                return done(err)
            }
            if(user){
              console.log('email đã tồn tại')
                return done(null, false, {
                    message : 'Email đã được sử dụng, vui lòng chọn email khác'    
                })
            }
      
            var newUser = new User();
            newUser.username = username;
            newUser.password = password;
      
            newUser.save(function(err, result) {
                if (err) {
                    return done(err);
                } else {                    
                  return done(null, newUser);            
                }
            });
        }
     )
    
}));
/* Passport login */
passport.use('local.login', new LocalStrategy(
    
  function(req, username, password, done) {
    console.log("aaaa")
    User.find(user => user.username = username)
    .then(
        function(err, user) {
            if (err) {
                return done(err);
            }
    
            if (!user) {
                return done(null, false, {
                    message: 'Tài khoản này không tồn tại, vui lòng kiểm tra lại.'
                });
            }
            
            return done(null, user);
        });
    
     
}));
module.exports = passport