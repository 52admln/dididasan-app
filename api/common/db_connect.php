<?php

/**
 * @return mysqli 数据库连接
 */
function db_connect()
{
    $LOCALHOST = 'localhost';
    $USERNAME = 'root';
    $PASSWORD = '123456';
    $DATABASE = 'didi_dasan';
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

