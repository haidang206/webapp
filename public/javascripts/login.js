$(document).ready(function() {
    $('#login').click(function() {
           
            //lấy giá trị thuộc tính href - chính là phần tử "#login-box"
            var loginBox = $(this).attr('href');
    
            //cho hiện hộp đăng nhập trong 300ms
            $(loginBox).fadeIn(300);
    
            // thêm phần tử id="over" vào sau body
            $('body').append('<div id="over">');
            $('#over').fadeIn(300);
            $('#dangnhap').click(function(){
                var username = $('#username').val();
                var password = $('#password').val();
                alert(username)
                $.post("http://localhost:3000/dangnhap", {
                        username : username,
                        password : password
                },function(data){
                        if(data==1){
                                alert("Đăng nhập thành công")
                                $('#login').html(username)
                                $('.vietbai').removeAttr("style")
                                $("a").remove("#regis")
                                $('#over, .login').fadeOut(300 , function() {
                                $('#over').remove();
                                });
                        }
                        else{
                                alert("Đăng nhập thất bại, vui lòng thử lại")
                        }
                })
                
                   
                return false;
        })
    });
    
    // khi click đóng hộp thoại
    $(document).on('click', "a.close, #over", function() {
    $('#over, .login').fadeOut(300 , function() {
            $('#over').remove();
    });
    return false;
    });
});
