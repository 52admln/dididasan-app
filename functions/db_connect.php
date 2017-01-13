<?php

require "../config/config.php";
/**
 * @return mysqli 数据库连接
 */
function db_connect() {
    $result = new mysqli($LOCALHOST, $USERNAME, $PASSWORD, $DATABASE);
    if(!$result) {
        echo '不能连接到数据库';
        exit();
    } else {
        return $result;
    }
}
