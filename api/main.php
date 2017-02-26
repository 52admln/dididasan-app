<?php
session_start();

require './common/db_connect.php';
require './common/data_validate.php';

$userid = $_POST['user_id'];
$target = urlencode($_POST['target']); // 中文乱码解决
$location = $_POST['location'];
$usertype = $_POST['usertype'];
$time = time();
// 转码
//echo urldecode($target);

add($userid, $target, $location, $usertype, $time);

// db name  helper
function add($userid, $target, $location, $usertype, $time)
{
    $conn = db_connect();
    $query = "select * from helper where user_id = '" . $userid . "' and itemtype = '" . $usertype . "'";
    $result = $conn->query($query);

    if (!$result) {
        echo '不能执行SQL语句';
        exit();
    }
    // 如果有记录,则更新原来的记录,没有,则新增一条
    if ($result->num_rows > 0) {
        $query = "update helper SET location='" . $location . "', target = '" . $target . "', time = '" . $time . "' where user_id='" . $userid . "' and itemtype='" . $usertype . "'";
        $result = $conn->query($query);
        if (!$result) {
            echo '不能执行SQL语句';
            exit();
        }
        $conn->close();
        echo 0;
    } else {
        $query = "insert into helper (location, target, user_id, time, itemtype) values ('" . $location . "','" . $target . "','" . $userid . "','" . $time . "','" . $usertype . "')";
        $result = $conn->query($query);
        if (!$result) {
            echo '不能执行SQL语句';
            exit();
        }
        $conn->close();
        echo 0;
    }
}