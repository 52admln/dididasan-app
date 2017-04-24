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
    <title>个人中心</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no">
    <link rel="stylesheet" href="//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="wrapper-main">

    <div class="container-main">
        <div class="title">
            <a href="javascript:history.go(-1)"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
            <h3>身边有伞的好心人</h3>
        </div>
        <ul class="list-content hidden" id="list">
            <li>
                <div class="fl avatar">
                    <img src="img/noavatar_big.gif" alt="" width="50" height="50">
                </div>
                <div class="fl info">
                    <p>
                        <span class="nickname">admln52sss</span>
                        <span class="icon-sex"><i class="fa fa-mars" aria-hidden="true"></i></span>
                        <span class="distance">距离1000米</span>
                        <span class="time">1小时前</span>
                    </p>
                    <p>
                        要去:<span class="target">杭州</span>
                    </p>
                </div>
                <a class="fr action" href="tel:13764567708">
                    <div class="icon-action">
                        <i class="fa fa-umbrella" aria-hidden="true"></i>
                    </div>
                    <p>求帮助</p>
                </a>
            </li>
        </ul>
        <div class="no-item hidden">
            <p>似乎还没有人哦...</p>
        </div>
        <div class="loader">加载中...</div>
    </div>
</div>
<footer class="main-footer">
    Timu蜗壳工作室
</footer>
<script src="https://cdn.bootcss.com/zepto/1.0rc1/zepto.min.js"></script>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.3&key=8b14f837460ac8da096b0964f8feb168"></script>
<script src="js/list.js"></script>
</body>
</html>