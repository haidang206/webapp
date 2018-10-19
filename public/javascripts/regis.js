$(document).ready(function() {
    $('#regis').click(function() {

            //lấy giá trị thuộc tính href - chính là phần tử "#regis-box"
            var regisBox = $(this).attr('href');
            
            //cho hiện hộp đăng nhập trong 300ms
            $(regisBox).fadeIn(300);
    
            // thêm phần tử id="over" vào sau body
            $('body').append('<div id="over1">');
            $('#over1').fadeIn(300);
            $('#dangky').click(function(){
                    var username = $('#username1').val();
                    var password = $('#password1').val();
                    $.post("http://localhost:3000/dangky", {
                            username : username,
                            password : password
                    },function(data){
                            if(data==2){
                                    alert("Đăng ký thành công")
                                    $('#over1, .regis').fadeOut(300 , function() {
                                             $('#over1').remove();
                                    })
                            }
                            else{
                                    alert("Đăng ký thất bại, vui lòng thử lại")
                            }
                    })
                    
                       
                    return false;
            })
            // khi click đóng hộp thoại
            $(document).on('click', "a.close, #over1", function() {
                    $('#over1, .regis').fadeOut(300 , function() {
                            $('#over1').remove();
                    });
                    return false;
            })
     }) 
}) 