<?php

//echo time();

session_start();

require './common/db_connect.php';

$route = $_GET['action'];
$userid = isset($_POST['user_id']) ? $_POST['user_id'] : -1;
//echo $route;

if($route == 'get') {

    $conn = db_connect();
    $query = "select * from users "
        . "where users.user_id = '" . $userid . "'";
    //    echo $query;
    $result = $conn->query($query);
    if (!$result) {
        echo '不能执行SQL语句';
        exit();
    }
    $jsonData = array("data" => array(), "status" => array());
    if ($result->num_rows > 0) {
        $i = 0;
        while ($row = $result->fetch_assoc()) {

            $jsonData['data'][$i] = array('username' => $row['username'], 'telephone' => $row['telephone'], 'sex' => $row['sex'], 'school' => $row['school'], 'location' => $row['user_location'], 'slogan' => $row['slogan'], 'allowed' => $row['allowed']);
            // var_dump($jsonData);
            $i++;
        }
        $conn->close();
        $jsonData['status'] = 'success';
        echo json_encode($jsonData);
    } else {
        $jsonData['status'] = 'failed';
        echo json_encode($jsonData);
    }

}

if($route == 'update') {


    $tel = $_POST['tel'];
    $slogan = $_POST['slogan'];
    $school = $_POST['school'];
    $addr = $_POST['addr'];
    $allowed = $_POST['allowed'];


    $conn = db_connect();

    // 如果有记录,则更新原来的记录,没有,则新增一条
        $query = "update users SET telephone='" . $tel . "', school = '" . $school . "', slogan = '" . $slogan . "', user_location = '" . $addr . "', allowed = '" . $allowed . "' where user_id='" . $userid . "'";
        $result = $conn->query($query);
        if (!$result) {
            echo '不能执行SQL语句';
            exit();
        }
        $conn->close();
        echo '{"status":"success"}';
}