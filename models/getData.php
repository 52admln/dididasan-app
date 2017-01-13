<?php

//echo time();

session_start();

require '../functions/db_connect.php';
require '../functions/data_validate.php';

$userid = $_POST['user_id'];
$usertype = $_POST['usertype'];
$time = time();
if ($usertype == "helper") {
    $type = "needer";
} else {
    $type = "helper";
}


// 转码
//echo urldecode($target);

getData($userid, $type);

// db name  helper
function getData($userid, $type)
{

    $conn = db_connect();
    $query = "select users.username,users.telephone,users.sex,users.allowed,helper.location,helper.target,helper.time from helper left join users on helper.user_id = users.user_id "
        . "where helper.itemtype = '" . $type . "'";
//    echo $query;
    $result = $conn->query($query);
    if (!$result) {
        echo '不能执行SQL语句';
        exit();
    }
    $jsonData = array("data" => array(), "setting" => array());
    $i = 0;
    while ($row = $result->fetch_assoc()) {

        $jsonData["data"][$i] = array('username' => $row['username'], 'telephone' => $row['telephone'], 'sex' => $row['sex'], 'location' => $row['location'], 'target' => urldecode($row['target']), 'time' => $row['time']);
        // var_dump($jsonData);
        $i++;
    }
    $query = "SELECT * "
        . "FROM users WHERE "
        . "users.user_id = '" . $userid . "'";
    $result = $conn->query($query);
    if (!$result) {
        echo '不能执行SQL语句';
        exit();
    }
    $row = $result->fetch_assoc();
    array_push($jsonData["setting"], array('user_allowed' => $row['allowed'], 'user_sex' => $row['sex']));
    $conn->close();

    echo json_encode($jsonData);

}
