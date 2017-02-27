$.mvalidateExtend({
    username:{
        required : true,
        pattern : /[a-zA-Z0-9_]{2,10}$/,
        each:function(){

        },
        descriptions:{
            required : '必填字段',
            pattern : '用户名长度2-10位字母数字,且字母开头'
        }
    }
});

$("button").click(function (e) {
    $("#loginForm").mvalidate({
        type:1,
        onKeyup:false,
        sendForm:false,
        validateInSubmit: true,
        firstInvalidFocus:true,
        valid:function(event,options){
            //点击提交按钮时,表单通过验证触发函数
            
            $.ajax({
                type: 'POST',
                url: 'api/login.php',
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

            event.preventDefault();
        },
        invalid:function(event, status, options){
            // alert("invalid");
            //点击提交按钮时,表单未通过验证触发函数
        },
        eachField:function(event,status,options){
            //点击提交按钮时,表单每个输入域触发这个函数 this 执向当前表单输入域，是jquery对象
        },
        eachValidField:function(val){},
        eachInvalidField:function(event, status, options){},
        conditional:{
            password:function(val){
                return (val.length >= 6 && val.length <= 25);
            }
        },
        descriptions:{
            username:{
                required : '请输入用户名',
                pattern: '用户名长度2-10位字母数字,且字母开头'
            },
            password:{
                required : '请输入密码',
                conditional: '密码长度6-25个字符'
            }
        }
    });


});