<?php
/**
 * Created by PhpStorm.
 * User: Wyj
 * Date: 1/11/17
 * Time: 5:26 PM
 */

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
                <div class="text">[提示] 已登出。 点击<a href="index.php" style="text-decoration: underline">返回首页</a></div>
            </div>
        </div>
    </div>
</div>
<footer>
    Timu蜗壳工作室
</footer>
</body>
</html>

