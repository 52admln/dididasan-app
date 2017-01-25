
// 密码二次确认
var vaildPassword = function (el, arg1) {
    return (el.value == el.previousElementSibling.value) ? true : false;
};

$("button").click(function () {
    if(cxValidation($("#registForm"))) {

        $.ajax({
            type: 'POST',
            url: 'models/regist.php',
            data: $('#registForm').serialize(),
            dataType: 'json',
            timeout: 3000,
            success: function(data){
                if(data.status == "success") {
                    $("#messageList").html('<div class="text">[提示]注册成功!正在跳转...</div>');
                    window.localStorage.setItem("userid", data["user_id"]);
                    // window.location.href = "./main.php";
                }

            },
            error: function(xhr, type){
                $("#messageList").html('<div class="text">[错误]'+xhr.responseText+'</div>');
                console.error(xhr.responseText);
            }
        });
        return false;
    }
    cxValidation.attach($("#registForm"));
});