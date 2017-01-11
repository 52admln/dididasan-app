/**
 * Created by Wyj on 1/11/17.
 */

(function() {


    $("button").click(function () {
        if(cxValidation($("#loginForm"))) {
            $.ajax({
                type: 'POST',
                url: 'models/login.php',
                data: $('#loginForm').serialize(),
                dataType: 'json',
                timeout: 3000,
                success: function(data){
                    if(data == 0) {
                        var message = "登录成功!正在跳转...";
                    }
                    $("#messageList").html('<div class="text">[提示]'+message+'</div>');
                    window.location.href = "./main.php";
                },
                error: function(xhr, type){
                    $("#messageList").html('<div class="text">[错误]'+xhr.responseText+'</div>');
                    console.log(xhr.responseText);
                }
            });
            return false;
        }
        cxValidation.attach($("#loginForm"));
    });
    
})();