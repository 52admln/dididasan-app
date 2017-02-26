<?php
session_start();

require './common/db_connect.php';
require './common/data_validate.php';

$username = $_POST['username'];
$password = $_POST['password'];
$password2 = $_POST['confirm_password'];
$telephone = $_POST['telephone'];
$sex = $_POST['sex'];


if (!filled_out($_POST)) {
    echo '未填写表单，请重新填写';
    exit();
}
if (!valid_username($username)) {
    echo '用户名不符合要求，请重新填写';
    exit();
}
if ($password != $password2) {
    echo '两次输入的密码不匹配，请检查后重试';
    exit();
}
if ((strlen($password) < 6) || (strlen($password) > 25)) {
    echo '密码长度不符合要求，请重新输入';
    exit();
}

register($username, $password, $sex, $telephone);


function register($username, $password, $sex, $telephone)
{
    $conn = db_connect();
    $result = $conn->query("select * from users where username='" . $username . "'");

    if (!$result) {
        echo '不能执行SQL语句';
        exit();
    }
    if ($result->num_rows > 0) {
        echo '用户名已被注册，请输入其他用户名。';
        exit();
    }
    // 男 0  女 1
    $sql = "insert into users(username, password, telephone, sex) values ('" . $username . "', sha1('" . $password . "'), '" . $telephone . "','" . $sex . "')";
//    echo $sql;
    $result = $conn->query($sql);

    if (!$result) {
        echo '注册时发生错误。';
        exit();
    } else {
        $userid = $conn->query('select user_id from users'
            . " where username='" . $username . "' ");
        //    获取用户id
        $row = $userid->fetch_assoc();
        $conn->close();
        $_SESSION['username'] = $username;
        echo '{"status":"success","user_id":"'.$row['user_id'].'"}';
    }
}
