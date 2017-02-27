<?php
session_start();
//echo session_id();
//unset($_SESSION['views']);
//echo $_SESSION['username'];
// 用户登录后自动跳转
if(isset($_SESSION['username'])) {
    echo "<script>window.location.href = './main.php'</script>";
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>首页</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no">
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
        <h2 id="title">注册</h2>
        <form class="form" method="post" id="registForm">
<!--            <input type="text" name="username" placeholder="用户名" data-validation="required,minSize[2],maxSize[10],onlyLetterNumber" data-validation-message='{"required":"用户名不能为空","minSize":"用户名长度为2-10个字母数字"}'>-->
<!--            <input type="password" name="password" placeholder="密码" data-validation="required,minSize[6],maxSize[25],call[vaildPassword]" data-validation-message='{"required":"密码不能为空","minSize":"密码安全性太低，不能少于{{0}}位"}'>-->
<!--            <input type="password" name="confirm_password" placeholder="重复密码" data-validation="required,minSize[6],maxSize[25]" data-validation-message='{"required":"密码不能为空","minSize":"密码安全性太低，不能少于{{0}}位","call":"密码不一致"}'>-->
<!--            <input type="tel" name="telephone" placeholder="手机号码" data-validation="required,phone" data-validation-message='{"required":"手机号不能为空","phone":"手机号有误"}'>-->
<!--            <select name="sex" data-validation="required">-->
<!--                <option value="0" selected>男生</option>-->
<!--                <option value="1">女生</option>-->
<!--            </select>-->

            <input type="text" name="username" placeholder="用户名" data-required="true" data-descriptions="username" data-validate="username">
            <input type="password" name="password" placeholder="密码" id="pwd" data-required="true" data-descriptions="password" data-conditional="password">
            <input type="password" name="confirm_password" placeholder="重复密码" id="confirmpwd" data-required="true" data-descriptions="confirmpwd"  data-conditional="confirmpwd">
            <input type="tel" name="telephone" placeholder="手机号码" id="phoneyzm" data-descriptions="telphone" data-validate="phone">
            <select name="sex">
                <option value="0" selected>男生</option>
                <option value="1">女生</option>
            </select>



        <div class="btns">
            <button type="submit" class="btn btn-solid">立即注册</button>
            <a href="index.php" class="btn btn-opacity">返回首页</a>
        </div>
        </form>
    </div>
</div>
<footer>
    Timu蜗壳工作室
</footer>
<script src="libs/zepto/zepto.min.js"></script>
<script src="libs/mobileValidate/js/zepto-mvalidate.js"></script>
<script src="js/regist.js"></script>
</body>
</html>