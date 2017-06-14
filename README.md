# DiDiDaSan
校园 Web APP 滴滴打伞

# 配置

## 数据库配置

使用前请先修改配置文件 `api/common/db_connect.php` 文件当中的数据库连接信息。

## 使用说明


## 遇到问题

1. 问题内容:

```
Uncaught SecurityError:
Failed to execute 'toDataURL' on 'HTMLCanvasElement':
tainted canvases may not be exported.
```

解决方案: 

http://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror

2. 问题内容: 

移动端图片上传裁剪

解决方案: 

https://qiutc.me/post/uploading-image-file-in-mobile-fe.html


3. 问题内容:
```
file_get_contents() expects parameter 1 to be string, array given
```
http://stackoverflow.com/questions/14433637/file-get-contents-expects-parameter-1-to-be-string


4. 问题内容:

上传文件权限问题

解决方案: 

http://stackoverflow.com/questions/23540083/failed-to-open-stream-permission-denied-error-laravel

5. 问题内容: 

base64 存为图片无法显示

解决方案:

http://bbs.csdn.net/topics/391038262
http://blog.libnav.com/php/169.html

6. 问题内容:

iOS Safari 上传提示 `Cross-origin image load denied by Cross-Origin Resource Sharing policy`

解决方案: 

https://github.com/alexk111/ngImgCrop/issues/28

7. 问题内容:
 
数据库读取写入中文字符乱码

解决方案:

数据库字符集更改为utf8_general_ci, 并将字段排序规则修改为utf8_general_ci
php连接数据库的mysqli设置字符集 utf8

设置如下:

1: 语言设置为 chinese (zh-utf-8)

2: MySQL 字符集: UTF-8 Unicode (utf8)

3: MySQL 连接校对: utf8_general_ci

4: 新增数据库和数据表的时候，整理项选择 utf8_general_ci

通过以上设置，在phpMyAdmin中操作和查询的时候，中文字符都不会乱码了。

参考连接:http://www.lai18.com/content/318578.html

但是从后台读取的时候还是会乱码,这就是连接层有问题,需要设置PHP连接数据库时的编码,
`$mysqli->set_charset("utf8")`

参考连接: http://php.net/manual/zh/mysqli.set-charset.php


8. 在 Safari 当中，window.history.back() 无法使用

解决方法： 

使用：onclick="javascript:history.go(-1)"

参考连接：

http://stackoverflow.com/questions/1873290/using-javascript-history-back-fails-in-safari-how-do-i-make-it-cross-browse

