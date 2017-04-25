<?php

session_start();
if(!isset($_SESSION['username'])) {
    echo "<script>window.location.href = './index.php'</script>";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>伸援手</title>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no">
    <link rel="stylesheet" href="//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="wrapper-main">
    <div class="container-main">
        <div class="user">
            <a href="person.php"><i class="fa fa-user-o" aria-hidden="true"></i>个人中心</a>
            <a href="main.php" class="type-change">切换身份</a>
        </div>
        <div class="content">
            <h3>您好,您现在要去哪里?</h3>
            <div class="locating"><i class="fa fa-map-marker" aria-hidden="true"></i><span class="locating-status">正在定位中...</span></div>
                <div class="input-place">
                    <input type="text" id="helperTarget" placeholder="请输入目的地">
                </div>
        </div>
        <div class="btns">
            <button type="button" id="helperBtn" class="btn btn-main-solid btn-solid disabled" disabled>看谁没伞</button>
        </div>

    </div>
</div>
<script src="https://cdn.bootcss.com/zepto/1.0rc1/zepto.min.js"></script>
<script src="https://cdn.bootcss.com/axios/0.16.1/axios.min.js"></script>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.3&key=8b14f837460ac8da096b0964f8feb168"></script>
<script src="js/main.js"></script>
</body>
</html>
