<?php

require './common/db_connect.php';

//if( isset( $_REQUEST['file']) ){
//    var_dump($_REQUEST);
//    var_dump($_FILES);
//    die();
//}

//var_dump($_REQUEST);
//var_dump($_FILES);
header('Content-Type: text/plain; charset=utf-8');

//var_dump($_FILES['file']);
//echo("===========================");
//$imgData = addslashes (file_get_contents($_FILES['file']['tmp_name']));
//echo(base64_encode($imgData));

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

if(file_put_contents( "../uploads/".$output.".jpg", base64_decode($base64_img))) {
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

// todo  存储文件后将路径存入数据库


