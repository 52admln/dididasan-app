# DiDiDaSan
校园 Web APP 滴滴打伞

# 配置
## 数据库配置

使用前请先修改配置文件 `config/config.php` 文件当中的数据库连接信息。

## 使用说明


## 遇到问题

1. 问题内容:
```
Uncaught SecurityError:
Failed to execute 'toDataURL' on 'HTMLCanvasElement':
tainted canvases may not be exported.
```
解决方案: http://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror

2. 问题内容: 移动端图片上传裁剪
解决方案: https://qiutc.me/post/uploading-image-file-in-mobile-fe.html


3. 问题内容:
```
file_get_contents() expects parameter 1 to be string, array given
```
http://stackoverflow.com/questions/14433637/file-get-contents-expects-parameter-1-to-be-string


4. 问题内容:上传文件权限问题
解决方案: http://stackoverflow.com/questions/23540083/failed-to-open-stream-permission-denied-error-laravel

5. 问题内容: base64 存为图片无法显示
解决方案:
http://bbs.csdn.net/topics/391038262
http://blog.libnav.com/php/169.html

