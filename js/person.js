var sex = {
    '1': '  <span class="icon-sex"><i class="fa fa-venus" aria-hidden="true"></i></span>', // 女
    '0': '  <span class="icon-sex"><i class="fa fa-mars" aria-hidden="true"></i></span>' // 男
};

function getData() {
    $.ajax({
        type: 'POST',
        url: 'models/userInfo.php?action=get',
        data: {
            "user_id": window.localStorage.getItem("userid"),
        },
        dataType: 'json',
        timeout: 3000,
        success: function (data) {
            console.log(data);
            renderData(data);
        },
        error: function (xhr, type) {
            alert(xhr.responseText);
        }
    });
}

function renderData(source) {
    $('.js-username').html(source.data[0]['username'] + sex[source.data[0]['sex']]);
    $('.js-tel').val(source.data[0]['telephone']);
    $('.js-slogan').val(source.data[0]['slogan']);
    $('.js-school').val(source.data[0]['school']);
    $('.js-addr').val(source.data[0]['location']);
    $('.js-allowed').val(source.data[0]['allowed']);
}

function init() {
    getData();
}

function updateInfo() {

    console.log($('.js-tel').val(),
        $('.js-slogan').val(),
        $('.js-school').val(),
        $('.js-addr').val(),
        $('.js-allowed').val());

    $.ajax({
        type: 'POST',
        url: 'models/userInfo.php?action=update',
        data: {
            "user_id": window.localStorage.getItem("userid"),
            "tel": $('.js-tel').val().trim(),
            "slogan": $('.js-slogan').val().trim(),
            "school": $('.js-school').val().trim(),
            "addr": $('.js-addr').val().trim(),
            "allowed": $('.js-allowed').val().trim()
        },
        dataType: 'json',
        timeout: 3000,
        success: function (data) {
            console.log(data);
            if (data.status === "success") {
                alert('修改成功!');
            }
        },
        error: function (xhr, type) {
            alert(xhr.responseText);
        }
    });
}

$('.js-update').on('click', function () {
    updateInfo();

});

$('.js-upload-avatar').on('click', function () {
    //alert('clicking...');
    $('#file-input').trigger('click');
});
//$('#filechooser').on('change', function () {
//    var files = this.files;
//    var file = files[0];
//
//    // 接受 jpeg, jpg, png 类型的图片
//    if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) {
//        alert('请选择图片文件!');
//        return;
//    }
//
//    var reader = new FileReader();
//
//    reader.onload = function() {
//        var result = this.result;
//
//        $('#previewer').attr('src',result);
//
//        // 清空图片上传框的值
//        $('#filechooser').val('');
//        $.ajax({
//
//        })
//    };
//
//    reader.readAsDataURL(file);
//});

/*
 // 图片裁剪 功能模块
 var tmp = $('<div class="resizer">' +
 '<div class="inner">' +
 '<img>' +
 '<div class="frames"></div>' +
 '</div>' +
 //'<button>&#10007;</button>'+
 '<button class="ok">确认</button>' +
 '</div>');
 var resizedImage;
 $.imageResizer = function () {
 if (Uint8Array && HTMLCanvasElement && atob && Blob) {

 } else {
 return false;
 }
 var resizer = tmp.clone();

 resizer.image = resizer.find('img')[0];
 resizer.frames = resizer.find('.frames');
 resizer.okButton = resizer.find('button.ok');
 resizer.frames.offset = {
 top: 0,
 left: 0
 };

 resizer.okButton.click(function () {
 resizer.clipImage();
 });
 resizer.clipImage = function () {
 var nh = this.image.naturalHeight,
 nw = this.image.naturalWidth,
 size = nw > nh ? nh : nw;

 size = size > 1000 ? 1000 : size;

 var canvas = $('<canvas width="' + size + '" height="' + size + '"></canvas>')[0],
 ctx = canvas.getContext('2d'),
 scale = nw / this.offset.width,
 x = this.frames.offset.left * scale,
 y = this.frames.offset.top * scale,
 w = this.frames.offset.size * scale,
 h = this.frames.offset.size * scale;

 ctx.drawImage(this.image, x, y, w, h, 0, 0, size, size);
 var src = canvas.toDataURL();
 //this.canvas=canvas;
 //this.append(canvas);
 this.addClass('uploading');
 this.removeClass('have-img');
 $('#previewer').attr('src', src);


 // do some ajax request
 var url=$('#filechooser').val();
 console.log(url,resizedImage);
 if(!url||!resizedImage)return;
 var fd=new FormData();
 fd.append('file',resizedImage);
 $.ajax({
 type:'POST',
 url:url,
 data:fd
 });






 src = src.split(',')[1];
 if (!src)return this.doneCallback(null);
 src = window.atob(src);

 var ia = new Uint8Array(src.length);
 for (var i = 0; i < src.length; i++) {
 ia[i] = src.charCodeAt(i);
 }

 this.doneCallback(new Blob([ia], {type: "image/png"}));
 };

 resizer.resize = function (file, done) {
 this.reset();
 this.doneCallback = done;
 this.setFrameSize(0);
 this.frames.css({
 top: 0,
 left: 0
 });
 var reader = new FileReader();
 reader.onload = function () {
 resizer.image.src = reader.result;
 reader = null;
 resizer.addClass('have-img');
 resizer.setFrames();
 };
 reader.readAsDataURL(file);
 };

 resizer.reset = function () {
 this.image.src = '';
 this.removeClass('have-img');
 this.removeClass('uploading');
 this.find('canvas').detach();
 };

 resizer.setFrameSize = function (size) {
 this.frames.offset.size = size;
 return this.frames.css({
 width: size + 'px',
 height: size + 'px'
 });
 };

 resizer.getDefaultSize = function () {
 var width = this.find(".inner").width(),
 height = this.find(".inner").height();
 this.offset = {
 width: width,
 height: height
 };
 console.log(this.offset);
 return width > height ? height : width;
 };

 resizer.moveFrames = function (offset) {
 var x = offset.x,
 y = offset.y,
 top = this.frames.offset.top,
 left = this.frames.offset.left,
 size = this.frames.offset.size,
 width = this.offset.width,
 height = this.offset.height;

 if (x + size + left > width) {
 x = width - size;
 } else {
 x = x + left;
 }

 if (y + size + top > height) {
 y = height - size;
 } else {
 y = y + top;
 }
 x = x < 0 ? 0 : x;
 y = y < 0 ? 0 : y;
 this.frames.css({
 top: y + 'px',
 left: x + 'px'
 });

 this.frames.offset.top = y;
 this.frames.offset.left = x;
 };
 (function () {
 var time;

 function setFrames() {
 var size = resizer.getDefaultSize();
 resizer.setFrameSize(size);
 }

 window.onresize = function () {
 clearTimeout(time);
 time = setTimeout(function () {
 setFrames();
 }, 1000);
 };

 resizer.setFrames = setFrames;
 })();

 (function () {
 var lastPoint = null;

 function getOffset(event) {
 event = event.originalEvent;
 var x, y;
 if (event.touches) {
 var touch = event.touches[0];
 x = touch.clientX;
 y = touch.clientY;
 } else {
 x = event.clientX;
 y = event.clientY;
 }

 if (!lastPoint) {
 lastPoint = {
 x: x,
 y: y
 };
 }

 var offset = {
 x: x - lastPoint.x,
 y: y - lastPoint.y
 };
 lastPoint = {
 x: x,
 y: y
 };
 return offset;
 }
 resizer.frames.on('touchstart mousedown', function (event) {
 getOffset(event);
 });
 resizer.frames.on('touchmove mousemove', function (event) {
 if (!lastPoint)return;
 var offset = getOffset(event);
 resizer.moveFrames(offset);
 });
 resizer.frames.on('touchend mouseup', function (event) {
 lastPoint = null;
 });
 })();
 return resizer;
 };
 var resizer = $.imageResizer();
 if (!resizer) {
 resizer = $("<p>Your browser doesn't support these feature:</p><ul><li>canvas</li><li>Blob</li><li>Uint8Array</li><li>FormData</li><li>atob</li></ul>")
 }

 $('.frame-container').append(resizer);

 $('#filechooser').change(function (event) {
 var file = this.files[0];
 resizer.resize(file, function (file) {
 resizedImage = file;
 });
 });
 */
// Android上的AppleWebKit 534以前的内核存在一个Bug，
// 导致FormData加入一个Blob对象后，上传的文件是0字节
// QQ X5浏览器也有这个BUG
var needsFormDataShim = (function () {
    var bCheck = ~navigator.userAgent.indexOf('Android') && ~navigator.vendor.indexOf('Google') && !~navigator.userAgent.indexOf('Chrome');

    return bCheck && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534 || /MQQBrowser/g.test(navigator.userAgent);
})();

// 重写 Blob 构造函数，在 XMLHttpRequest.prototype.send 中会使用到
var BlobConstructor = ((function () {
    try {
        new Blob();
        return true;
    } catch (e) {
        return false;
    }
})()) ? window.Blob : function (parts, opts) {
    let bb = new (
        window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MSBlobBuilder ||
        window.MozBlobBuilder
    );
    parts.forEach(function (p) {
        bb.append(p);
    });
    return bb.getBlob(opts ? opts.type : undefined);
};

// 手动包装 FormData 同时重写 XMLHttpRequest.prototype.send
var FormDataShim = (function () {
    var formDataShimNums = 0;
    return function FormDataShim() {
        var o = this;

        // Data to be sent
        let parts = [];

        // Boundary parameter for separating the multipart values
        let boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36);

        // Store the current XHR send method so we can safely override it
        let oldSend = XMLHttpRequest.prototype.send;
        this.getParts = function () {
            return parts.toString();
        };
        this.append = function (name, value, filename) {
            parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');

            if (value instanceof Blob) {
                parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
                parts.push(value);
            } else {
                parts.push('\r\n\r\n' + value);
            }
            parts.push('\r\n');
        };

        formDataShimNums++;
        XMLHttpRequest.prototype.send = function (val) {
            let fr;
            let data;
            let oXHR = this;
            if (val === o) {
                // Append the final boundary string
                parts.push('--' + boundary + '--\r\n');
                // Create the blob
                data = new BlobConstructor(parts);

                // Set up and read the blob into an array to be sent
                fr = new FileReader();
                fr.onload = function () {
                    oldSend.call(oXHR, fr.result);
                };
                fr.onerror = function (err) {
                    throw err;
                };
                fr.readAsArrayBuffer(data);

                // Set the multipart content type and boudary
                this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                formDataShimNums--;
                if (formDataShimNums === 0) {
                    XMLHttpRequest.prototype.send = oldSend;
                }
            } else {
                oldSend.call(this, val);
            }
        };
    };
})();




document.getElementById('file-input').onchange = function (event) {
    // 通过 event.target 回去 input 元素对象，然后拿到 files list，取第一个 file
    let file = event.target.files[0];
    console.log(file);

    // 接受三个参数，文件、裁剪的长宽比例，回调函数（回调函数获得一个 FormData 对象，文件已经存在里面了）；
    compressImage(file, [1, 1], (targetFormData) => {

        let xhr = new XMLHttpRequest();

        // 进度监听
        // xhr.upload.addEventListener('progress', progFoo, false);
        // 加载监听
        // xhr.addEventListener('load', loadFoo, false);
        // 错误监听
        // xhr.addEventListener('error', errorFoo, false);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // 上传成功，获取到结果 results
                    let results = JSON.parse(xhr.responseText);
                    // ......
                }
            } else {
                // 上传失败
            }
        };
        xhr.open('POST', '/api/upload', true);
        xhr.send(targetFormData);
    });
};
/**
 * file 转成 dataURL
 * @param file 文件
 * @param callback 回调函数
 */
function fileToDataURL(file, callback) {
    const reader = new window.FileReader();
    reader.onload = function (e) {
        callback(e.target.result);
    };
    reader.readAsDataURL(file);
}

/**
 * 使用 canvas 压缩 dataURL
 * @param dataURL
 * @param ratio
 * @param callback
 */
function compressDataURL(dataURL, ratio, callback) {
    const img = new window.Image();
    img.src = dataURL;
    // onload
    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100 * ratio.width;
        canvas.height = 100 * ratio.height;
        const RATIO = canvas.width / canvas.height;
        let cutx = 0;
        let cuty = 0;
        let cutw = img.width;
        let cuth = img.height;
        if (cutw / cuth > RATIO) {
            // 宽超过比例了]]
            let realw = cuth * RATIO;
            cutx = (cutw - realw) / 2;
            cutw = realw;
        } else if (cutw / cuth < RATIO) {
            // 长超过比例了]]
            let realh = cutw / RATIO;
            cuty = (cuth - realh) / 2;
            cuth = realh;
        }
        ctx.drawImage(img, cutx, cuty, cutw, cuth, 0, 0, canvas.width, canvas.height);
        const ndata = canvas.toDataURL('image/jpeg', 1);
        console.log(ndata);
        callback(ndata);
    };
}

/**
 * dataURL 转成 blob
 * @param dataURL
 * @return blob
 */
function dataURLtoBlob(dataURL) {
    let binaryString = atob(dataURL.split(',')[1]);
    let arrayBuffer = new ArrayBuffer(binaryString.length);
    let intArray = new Uint8Array(arrayBuffer);
    let mime = dataURL.split(',')[0].match(/:(.*?);/)[1];

    for (let i = 0, j = binaryString.length; i < j; i++) {
        intArray[i] = binaryString.charCodeAt(i);
    }

    let data = [intArray];

    let result;

    try {
        result = new Blob(data, {type: mime});
    } catch (error) {
        window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;
        if (error.name === 'TypeError' && window.BlobBuilder) {
            var builder = new BlobBuilder();
            builder.append(arrayBuffer);
            result = builder.getBlob(type);
        } else {
            throw new Error('没救了');
        }
    }

    return result;
}

/**
 * 压缩图片
 * @param file 图片文件
 * @param ratio 比例
 * @param callback 回调，得到一个 包含文件的 FormData 实例
 */
function compressImage(file, ratio, callback) {
    fileToDataURL(file, (dataURL) => {
        compressDataURL(dataURL, ratio, (newDataURL) => {
            const newBlob = dataURLtoBlob(newDataURL);

            // 判断是否需要我们之前的重写
            let NFormData = needsFormDataShim() ? FormDataShim : window.FormData;

            const oData = new NFormData();
            oData.append('file', newBlob);

            callback(oData);
        });
    });
}
init();