var sex = {
    '1': '  <span class="icon-sex"><i class="fa fa-venus" aria-hidden="true"></i></span>', // 女
    '0': '  <span class="icon-sex"><i class="fa fa-mars" aria-hidden="true"></i></span>' // 男
};

function getData() {
    $.ajax({
        type: 'POST',
        url: 'api/userInfo.php?action=get',
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
    $('#previewer').attr('src', source.data[0]['avatar']);
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
        url: 'api/userInfo.php?action=update',
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
    // 触发上传图片
    $('#file-input').trigger('click');
});

var
// Android native browser uploads blobs as 0 bytes, so we need a test for that
    needsFormDataShim = (function () {
        var bCheck = ~navigator.userAgent.indexOf('Android')
            && ~navigator.vendor.indexOf('Google')
            && !~navigator.userAgent.indexOf('Chrome');

        return bCheck && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
    })(),

// Test for constructing of blobs using new Blob()
    blobConstruct = !!(function () {
        try { return new Blob(); } catch (e) {}
    })(),

// Fallback to BlobBuilder (deprecated)
    XBlob = blobConstruct ? window.Blob : function (parts, opts) {
        var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
        parts.forEach(function (p) {
            bb.append(p);
        });

        return bb.getBlob(opts ? opts.type : undefined);
    };

function FormDataShim () {
    var
    // Store a reference to this
        o = this,

    // Data to be sent
        parts = [],

    // Boundary parameter for separating the multipart values
        boundary = Array(21).join('-') + (+new Date() * (1e16*Math.random())).toString(36),

    // Store the current XHR send method so we can safely override it
        oldSend = XMLHttpRequest.prototype.send;

    this.append = function (name, value, filename) {
        parts.push('--' + boundary + '\nContent-Disposition: form-data; name="' + name + '"');

        if (value instanceof Blob) {
            parts.push('; filename="'+ (filename || 'blob') +'"\nContent-Type: ' + value.type + '\n\n');
            parts.push(value);
        }
        else {
            parts.push('\n\n' + value);
        }
        parts.push('\n');
    };

    // Override XHR send()
    XMLHttpRequest.prototype.send = function (val) {
        var fr,
            data,
            oXHR = this;

        if (val === o) {
            // Append the final boundary string
            parts.push('--' + boundary + '--');

            // Create the blob
            data = new XBlob(parts);

            // Set up and read the blob into an array to be sent
            fr = new FileReader();
            fr.onload = function () { oldSend.call(oXHR, fr.result); };
            fr.onerror = function (err) { throw err; };
            fr.readAsArrayBuffer(data);

            // Set the multipart content type and boudary
            this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
            XMLHttpRequest.prototype.send = oldSend;
        }
        else {
            oldSend.call(this, val);
        }
    };
}


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
                    // 
                    console.log(results.dataUrl);
                    $("#previewer").attr("src", results.dataUrl);
                }
            } else {
                // 上传失败
                // alert("上传失败");
                // todo 增加错误提示
                console.log(xhr.responseText);
            }
        };
        // todo 待解决 cross origin 错误
        xhr.open('POST', 'api/upload.php', true);
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
    img.setAttribute('crossOrigin', 'anonymous')
    // onload
    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100 * ratio[0];
        canvas.height = 100 * ratio[1];
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
        const ndata = canvas.toDataURL('image/jpeg', ctx);
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
            let NFormData = needsFormDataShim ? FormDataShim : window.FormData;

            const oData = new NFormData();
            oData.append('file', newBlob);
            oData.append("user_id", window.localStorage.getItem("userid"));
            console.log("oData", oData);
            callback(oData);
        });
    });
}
init();