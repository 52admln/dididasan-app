/**
 * Created by Wyj on 1/11/17.
 */

$("button").click(function () {
    if(cxValidation($("#loginForm"))) {
        $.ajax({
            type: 'POST',
            url: 'models/login.php',
            data: $('#loginForm').serialize(),
            dataType: 'json',
            timeout: 3000,
            success: function(data){
                // data = JSON.parse(data);
                console.log(data);
                if(data.status == "success") {
                    var message = "登录成功!正在跳转...";
                }
                $("#messageList").html('<div class="text">[提示]'+message+'</div>');
                window.localStorage.setItem("userid", data["user_id"]);
                window.location.href = "./main.php";
            },
            error: function(xhr, type){
                $("#messageList").html('<div class="text">[错误]'+xhr.responseText+'</div>');
                console.error(xhr.responseText);
            }
        });
        return false;
    }
    cxValidation.attach($("#loginForm"));
});