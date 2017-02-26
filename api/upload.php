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
$imgData = addslashes (file_get_contents($_FILES['file']['tmp_name']));
//echo(base64_encode($imgData));


$fileName = $_FILES['file']['name'];
$fileType = $_FILES['file']['type'];
$fileContent = file_get_contents($_FILES['file']['tmp_name']);
$dataUrl = 'data:' . $fileType . ';base64,' . base64_encode($fileContent);
$json = json_encode(array(
    'name' => $fileName,
    'type' => $fileType,
    'dataUrl' => $dataUrl
));
echo $json;
$img = base64_encode($fileContent);
file_put_contents( "img.jpeg", $img);

// todo  存储文件后将路径存入数据库


