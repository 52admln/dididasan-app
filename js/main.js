$("#neederTarget").val("");
$("#helperTarget").val("");

$('input[type=text]').bind('input propertychange', function () {
    if ($(this).val().length > 0) {
        $("button").removeAttr("disabled");
        $("button").removeClass("disabled");
    } else {
        $("button").attr({"disabled": "disabled"});
        $("button").addClass("disabled");
    }
    //console.log($(this).val().length + ' characters');
});


// 更换为高德地图API 定位

var map, geolocation, locations;
//加载地图，调用浏览器定位服务
map = new AMap.Map('container', {
    resizeEnable: true
});
map.plugin('AMap.Geolocation', function () {
    geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: 'RB'
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
});
//解析定位结果
function onComplete(data) {
    //var str = ['定位成功'];
    //str.push('经度：' + data.position.getLng());
    //str.push('纬度：' + data.position.getLat());
    //if (data.accuracy) {
    //    str.push('精度：' + data.accuracy + ' 米');
    //}//如为IP精确定位结果则没有精度信息

    var latitude = data.position.getLng();
    var longitude = data.position.getLat();
    //纬度 , 经度
    locations = latitude + "," + longitude;
    console.log('定位成功');
    console.log(data);
    console.log(data.formattedAddress);
    document.querySelector(".locating-status").innerHTML = data.formattedAddress;
}
//解析定位错误信息
function onError(data) {
    document.querySelector(".locating-status").innerHTML = "无法获取您的定位。";
    console.log('定位失败');
}


//function geoFindMe() {

//if (!navigator.geolocation) {
//    alert("您的浏览器不支持地理位置");
//    return;
//}
//
//function success(position) {
//    var latitude = position.coords.latitude;
//    var longitude = position.coords.longitude;
//    //纬度 , 经度
//    locations = latitude + "," + longitude;
//    console.log(locations);
//    document.querySelector(".locating-status").innerHTML = "定位成功!";
//}
//
//function error() {
//    document.querySelector(".locating-status").innerHTML = "无法获取您的定位。";
//}
//
//console.log("Locating…");
//navigator.geolocation.getCurrentPosition(success, error);
//}
//geoFindMe();

$("#neederBtn").click(function () {
    if ($("#neederTarget").val().length > 0) {
        if (locations == null) {
            document.querySelector(".locating-status").innerHTML = "未获取到地理位置,请稍候再试";
        } else {
            $.ajax({
                type: 'POST',
                url: 'api/main.php',
                data: {
                    "user_id": window.localStorage.getItem("userid"),
                    "target": $("#neederTarget").val(),
                    "location": locations,
                    "usertype": "needer"
                },
                dataType: 'json',
                timeout: 3000,
                success: function (data) {
                    if (data == 0) {
                        window.location.href = "./list.php";
                    }
                },
                error: function (xhr, type) {
                    alert(xhr.responseText);
                }
            });
        }
    }
    window.localStorage.setItem("usertype", "needer")
});


$("#helperBtn").click(function () {
    if ($("#helperTarget").val().length > 0) {
        if (locations == null) {
            document.querySelector(".locating-status").innerHTML = "未获取到地理位置,请稍候再试";
        } else {
            $.ajax({
                type: 'POST',
                url: 'api/main.php',
                data: {
                    "user_id": window.localStorage.getItem("userid"),
                    "target": $("#helperTarget").val(),
                    "location": locations,
                    "usertype": "helper"
                },
                dataType: 'json',
                timeout: 3000,
                success: function (data) {
                    if (data == 0) {
                        window.location.href = "./list.php";
                    }
                },
                error: function (xhr, type) {
                    alert(xhr.responseText);
                }
            });
        }
    }
    window.localStorage.setItem("usertype", "helper")
});


