<?php

/**
 * @return mysqli 数据库连接
 */
function db_connect()
{
    $LOCALHOST = '127.0.0.1';
    $USERNAME = 'root';
    $PASSWORD = '';
    $DATABASE = 'dididasan';
    $mysqli = new mysqli($LOCALHOST, $USERNAME, $PASSWORD, $DATABASE);
    // 设置字符集,避免乱码
    $mysqli->set_charset("utf8");
    if (!$mysqli) {
        echo '不能连接到数据库';
        exit();
    } else {
        return $mysqli;
    }
}
