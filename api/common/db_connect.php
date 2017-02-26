<?php

/**
 * @return mysqli 数据库连接
 */
function db_connect() {
    $LOCALHOST = '127.0.0.1';
    $USERNAME = 'root';
    $PASSWORD =  '';
    $DATABASE = 'dididasan';
    $result = new mysqli($LOCALHOST, $USERNAME, $PASSWORD, $DATABASE);
    if(!$result) {
        echo '不能连接到数据库';
        exit();
    } else {
        return $result;
    }
}
