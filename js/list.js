/**
 * Created by Wyj on 1/11/17.
 */

// $("#goBack").click(function () {
//     // window.history.back();
//     window.history.go(-1);
// });


function distance(lat, lng, goalLat, goalLng) {
    //传入位置纬度，经度和目标纬度，经度，返回距离值，单位米，对地理感兴趣的童鞋可以去研究下计算公式
    var EARTH_RADIUS = 6378.137;//地球赤道半径
    if (lat != '' && lng != '' && goalLat != '' && goalLng != '') {
        var radLat1 = rad(goalLat);
        var radLat2 = rad(lat);
        var a = radLat1 - radLat2;
        var b = rad(goalLng) - rad(lng);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return formatDistance(s * 1000);
    } else {
        return 0;
    }
    function rad(d) {
        return d * Math.PI / 180.0;
    }
}

//  返回的数据格式 JSON
//  [
//     {
//         id: 0,
//         value: "Demo",
//         completed: false
//     }
//  ]


// <li>
// <div class="fl avatar">
//     <img src="http://wyj.im/images/avatar.jpg" alt="" width="50" height="50">
//     </div>
//     <div class="fl info">
//     <p>
//     <span class="nickname">admln52sss</span>
//     <span class="icon-sex"><i class="fa fa-venus" aria-hidden="true"></i></span>
//     <span class="distance">距离1000米</span>
//     <span class="time">1小时前</span>
// </p>
// <p>
// 要去:<span class="target">杭州</span>
//     </p>
//     </div>
//     <a class="fr action" href="tel:13764567708">
//     <div class="icon-action">
//     <i class="fa fa-umbrella" aria-hidden="true"></i>
//     </div>
//     <p>求帮助</p>
//     </a>
//     </li>


var locations = null; // 获取当前经纬度

/**
 * 时间戳转字符串格式
 * @param  {[type]} date [传入时间戳]
 */
function dateStr(date) {
    //获取js 时间戳
    var time = new Date().getTime();
    //去掉 js 时间戳后三位，与php 时间戳保持一致
    time = parseInt((time - date * 1000) / 1000);

    //存储转换值
    var s;
    if (time < 60 * 10) {//十分钟内
        return '刚刚';
    } else if ((time < 60 * 60) && (time >= 60 * 10)) {
        //超过十分钟少于1小时
        s = Math.floor(time / 60);
        return s + "分钟前";
    } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
        //超过1小时少于24小时
        s = Math.floor(time / 60 / 60);
        return s + "小时前";
    } else if ((time < 60 * 60 * 24 * 3) && (time >= 60 * 60 * 24)) {
        //超过1天少于3天内
        s = Math.floor(time / 60 / 60 / 24);
        return s + "天前";
    } else {
        //超过3天
        var _date = new Date(parseInt(date) * 1000);
        return _date.getFullYear() + "/" + (_date.getMonth() + 1) + "/" + _date.getDate();
    }
}
/**
 * 距离格式化
 * @param distance 传入距离
 */
function formatDistance(distance) {
    if (distance < 1000) {
        return distance + "米";
    } else if (distance > 1000) {
        return (Math.round(distance / 100) / 10).toPrecision(2) + "公里";
    }
}

// function geoFindMe() {
//
//     if (!navigator.geolocation) {
//         alert("您的浏览器不支持地理位置");
//         return;
//     }
//     function success(position) {
//         var latitude = position.coords.latitude;
//         var longitude = position.coords.longitude;
//         //纬度 , 经度
//         locations = {
//             "latitude": latitude,
//             "longitude": longitude
//         };
//         console.log(locations);
//         getData();
//     }
//
//     function error() {
//         alert("无法获取您的位置");
//     }
//
//     console.log("Locating…");
//     navigator.geolocation.getCurrentPosition(success, error);
// }

function getData() {
    $.ajax({
        type: 'POST',
        url: 'api/getData.php',
        data: {
            "user_id": window.localStorage.getItem("userid"),
            "usertype": window.localStorage.getItem("usertype")
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
    var optString = "";
    var allowed = source.setting[0]['user_allowed'];
    var user_sex = source.setting[0]['user_sex'];
    var sex_show = "";
    var target_location;

    if (allowed == "0") {
        source.data.forEach(function (item, index) {

            target_location = item['location'].split(",");
            //为“0” 则不允许搜索异性,为1 则允许为异性,做性别判断
            // sex 0 为男 1 为女

            // 同性则渲染
            if (item['sex'] == user_sex) {
                if (item['sex'] == "1") {
                    sex_show = '<i class="fa fa-venus" aria-hidden="true"></i>';
                } else {
                    sex_show = '<i class="fa fa-mars" aria-hidden="true"></i>';
                }
                optString += '<li>'
                    + '<div class="fl avatar">'
                    + '<img src="' + item["avatar"] + '" alt="" width="50" height="50">'
                    + '</div>'
                    + '<div class="fl info">'
                    + '<p>'
                    + '<span class="nickname">' + item["username"] + '</span>'
                    + '<span class="icon-sex">' + sex_show + '</span>'
                    + '<span class="distance">' + distance(locations.latitude, locations.longitude, target_location[0], target_location[1]) + '</span>'
                    + '<span class="time">' + dateStr(item['time']) + '</span>'
                    + '</p>'
                    + '<p>'
                    + '要去:<span class="target">' + item['target'] + '</span>'
                    + '</p>'
                    + '</div>'
                    + '<a class="fr action" href="tel:' + item['telephone'] + '">'
                    + '<div class="icon-action">'
                    + '<i class="fa fa-umbrella" aria-hidden="true"></i>'
                    + '</div>'
                    + '<p>求帮助</p>'
                    + '</a>'
                    + '</li>';
            }
            console.log(locations.latitude, locations.longitude);
            //console.log(target_location[0], target_location[1]);
        });

        $("#list").html(optString);
    } else {
        source.data.forEach(function (item, index) {
            target_location = item['location'].split(",");
            //为“0” 则不允许搜索异性,为1 则允许为异性,做性别判断
            // sex 0 为男 1 为女
            if (item['sex'] == "1") {
                sex_show = '<i class="fa fa-venus" aria-hidden="true"></i>';
            } else {
                sex_show = '<i class="fa fa-mars" aria-hidden="true"></i>';
            }


            // 所有性别渲染
            optString += '<li>'
                + '<div class="fl avatar">'
                + '<img src="' + item["avatar"] + '" alt="" width="50" height="50">'
                + '</div>'
                + '<div class="fl info">'
                + '<p>'
                + '<span class="nickname">' + item["username"] + '</span>'
                + '<span class="icon-sex">' + sex_show + '</span>'
                + '<span class="distance">' + distance(locations.latitude, locations.longitude, target_location[0], target_location[1]) + '</span>'
                + '<span class="time">' + dateStr(item['time']) + '</span>'
                + '</p>'
                + '<p>'
                + '要去:<span class="target">' + item['target'] + '</span>'
                + '</p>'
                + '</div>'
                + '<a class="fr action" href="tel:' + item['telephone'] + '">'
                + '<div class="icon-action">'
                + '<i class="fa fa-umbrella" aria-hidden="true"></i>'
                + '</div>'
                + '<p>求帮助</p>'
                + '</a>'
                + '</li>';
        });
        console.log(locations.latitude, locations.longitude);
        //console.log(target_location[0], target_location[1]);
        $("#list").html(optString);
    }
    if (source.data.length > 0) {
        $(".list-content").removeClass("hidden");
    } else {
        $(".no-item").removeClass("hidden");

    }
    $(".loader").addClass("hidden");

}

function init() {
//     geoFindMe();
}


var map, geolocation;
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
    locations = {
        "latitude": latitude,
        "longitude": longitude
    };
    console.log('定位成功');
    console.log(data);
    console.log(data.formattedAddress);
    getData();
}
//解析定位错误信息
function onError(data) {
    alert("无法获取您的位置");
    console.log('定位失败');
}

init();
