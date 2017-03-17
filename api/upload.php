<?php

require './common/db_connect.php';

//var_dump($_POST);

header('Content-Type: text/plain; charset=utf-8');

const DEFAULT_IMG_PATH = "img/noavatar_big.gif";

function random_string($length) {
    $key = '';
    $keys = array_merge(range(0, 9), range('a', 'z'));

    for ($i = 0; $i < $length; $i++) {
        $key .= $keys[array_rand($keys)];
    }

    return $key;
}
// 采用 md5(时间戳+随机字符串) 生成文件名
$output = md5(time() + random_string(4));

$fileName = $_FILES['file']['name'];
$fileType = $_FILES['file']['type'];
$fileContent = file_get_contents($_FILES['file']['tmp_name']);
$base64_img = base64_encode($fileContent);
$dataUrl = 'data:' . $fileType . ';base64,' . $base64_img; // 转为 base64 编码

$fullPath = "uploads/".$output.".jpg";
$userid = $_POST['user_id'];

if(file_put_contents( "../uploads/".$output.".jpg", base64_decode($base64_img)) && savePath($fullPath, $userid) ) {

    $json = json_encode(array(
        'name' => $fileName,
        'type' => $fileType,
        'dataUrl' => $dataUrl,
        'status' => "success"
    ));
    echo $json;
} else {
    $json = json_encode(array(
        'name' => $fileName,
        'type' => $fileType,
        'dataUrl' => $dataUrl,
        'status' => "failed"
    ));
    echo $json;
}



// 存储图片路径到数据库
function savePath($fullPath, $userid){
    // 增加图片上传替换路径,并删除原图片

    $conn = db_connect();
    $selectQuery = "select avatar from users where user_id = {$userid}";
    $selectResult = $conn->query($selectQuery);
    if (!$selectResult) {
        echo '不能执行SQL语句';
        exit();
    }
    if ($selectResult->num_rows) {
        $row = $selectResult->fetch_assoc();
//        判断如果是默认头像,直接替换
        if($row['avatar'] == DEFAULT_IMG_PATH) {
            $query = "update users SET avatar='{$fullPath}' where user_id='{$userid}'";
            $result = $conn->query($query);
            if (!$result) {
                echo '不能执行SQL语句';
                exit();
            }
//            如果是已经上传过头像的,则将原头像路径提取出来,替换为新路径
        } else {
            $oldPath = $row['avatar']; // 旧路径
            $query = "update users SET avatar='{$fullPath}' where user_id='{$userid}'";
            $result = $conn->query($query);
            if (!$result) {
                echo '不能执行SQL语句';
                exit();
            }
//            删除文件
            unlink("../".$oldPath);
        }
    }


    $conn->close();
//     delete avatar
    return true;
}





