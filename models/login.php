<?php
session_start();

require '../functions/db_connect.php';
require '../functions/data_validate.php';

$username = $_POST['username'];
$password = $_POST['password'];


if (!filled_out($_POST)) {
    echo '未填写表单，请重新填写';
    exit();
}
if (!valid_username($username)) {
    echo '用户名不符合要求，请重新填写';
    exit();
}
if ((strlen($password) < 6) || (strlen($password) > 25)) {
    echo '密码长度不符合要求，请重新输入';
    exit();
}

login($username, $password);

/**
 * @param $username 用户名
 * @param $password 密码
 *
 */
function login($username, $password)
{
    $conn = db_connect();
    $query = 'select * from users'
        . " where username='" . $username . "' "
        . "and password=sha1('" . $password . "')";
    $result = $conn->query($query);
//    获取用户id,放在cookie中
    $userid = $conn->query('select user_id from users'
        . " where username='" . $username . "' ");
    if (!$result) {
        echo '不能执行SQL语句';
        exit();
    }
    if ($result->num_rows) {
        $_SESSION['username'] = $username;
        $row = $userid->fetch_assoc();
//    获取用户id,放在cookie中
        setcookie("userid", $row["user_id"]);
        $conn->close();
        echo 0;
    } else {
        echo '用户名或密码错误';
    }


}
