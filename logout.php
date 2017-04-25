<?php

session_start();
unset($_SESSION['username']);
setcookie("userid", "", time()-3600);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>首页</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no">
    <link rel="stylesheet" href="//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="wrapper">
    <div class="container">
        <div class="message">
            <div id="messageList">
                <div class="text">[提示] 已登出。 1秒后将自动跳转,如未自动跳转,请点击<a href="index.php" style="text-decoration: underline">返回首页</a></div>
            </div>
        </div>
    </div>
</div>
<script>
    window.localStorage.removeItem("usertype");
    window.localStorage.removeItem("userid");
    setTimeout(function (){
        window.location.href = "./index.php";
    },1000);
</script>
</body>
</html>

