<?php
session_start();

if(isset($_SESSION['username'])) {
    echo "<script>window.location.href = './main.php'</script>";
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>首页</title>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no">
    <link rel="stylesheet" href="css/style.css">
    <!-- 表单验证 -->
    <link rel="stylesheet" href="libs/mobileValidate/css/validate.css">
</head>
<body>
<div class="wrapper">
    <div class="container">
        <div class="message">
            <div id="messageList">
                <!--<div class="text">[提示] 请输入学号 </div>-->
            </div>
        </div>
        <h2 id="title">登录</h2>
        <form class="form" method="post" id="loginForm">
            <input type="text" name="username" placeholder="用户名" data-required="true" data-descriptions="username" data-validate="username">
            <input type="password" name="password" placeholder="密码" data-required="true" data-descriptions="password" data-conditional="password">
            <div class="btns">
                <button type="submit" class="btn btn-solid">登录</button>
                <a href="index.php" class="btn btn-opacity">返回首页</a>
            </div>
        </form>
    </div>
</div>
<script src="libs/zepto/zepto.min.js"></script>
<script src="libs/mobileValidate/js/zepto-mvalidate.js"></script>
<script src="js/login.js"></script>
</body>
</html>