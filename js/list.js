/**
 * Created by Wyj on 1/11/17.
 */

$("#goBack").click(function () {
    window.history.back();
});

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
        return s * 1000;
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


var curTime = new Date().getTime(); // 获取当前的毫秒数
var locations = null; // 获取当前经纬度

// function timeFomat2(target) {
//     var date3 = new Date().getTime() - target;
//     var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
//     //计算相差分钟数
//     var leave2 = leave1 % (3600 * 1000);
//     //计算小时数后剩余的毫秒数
//     var minutes = Math.floor(leave2 / (60 * 1000));
//     return minutes + "分";
// }
// console.log(timeFomat(curTime, 1484191835227));
/**
 * [Datestr 时间戳转字符串格式]
 * @author 邱先生
 * @copyright 烟火里的尘埃
 * @version [V1.0版本]
 * @date 2016-06-26
 * @param  {[type]} date [传入php 时间戳]
 */
function dateStr(date){
    //获取js 时间戳
    var time=new Date().getTime();
    //去掉 js 时间戳后三位，与php 时间戳保持一致
    time=parseInt((time-date*1000)/1000);

    //存储转换值
    var s;
    if(time<60*10){//十分钟内
        return '刚刚';
    }else if((time<60*60)&&(time>=60*10)){
        //超过十分钟少于1小时
        s = Math.floor(time/60);
        return  s+"分钟前";
    }else if((time<60*60*24)&&(time>=60*60)){
        //超过1小时少于24小时
        s = Math.floor(time/60/60);
        return  s+"小时前";
    }else if((time<60*60*24*3)&&(time>=60*60*24)){
        //超过1天少于3天内
        s = Math.floor(time/60/60/24);
        return s+"天前";
    }else{
        //超过3天
        var date= new Date(parseInt(date) * 1000);
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    }
}

function geoFindMe() {

    if (!navigator.geolocation) {
        alert("您的浏览器不支持地理位置");
        return;
    }
    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        //纬度 , 经度
        locations = {
            "latitude": latitude,
            "longitude": longitude
        };
        console.log(locations);
        getData();
    }

    function error() {
        alert("无法获取您的位置");
    }

    console.log("Locating…");
    navigator.geolocation.getCurrentPosition(success, error);
}

function getData() {
    $.ajax({
        type: 'POST',
        url: 'models/getData.php',
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
    if (allowed == "0") {
        source.data.forEach(function (item, index) {

            var target_location = item['location'].split(",");
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
                    + '<img src="http://wyj.im/images/avatar.jpg" alt="" width="50" height="50">'
                    + '</div>'
                    + '<div class="fl info">'
                    + '<p>'
                    + '<span class="nickname">' + item["username"] + '</span>'
                    + '<span class="icon-sex">' + sex_show + '</span>'
                    + '<span class="distance">' + parseInt(distance(locations.latitude, locations.longitude, target_location[0], target_location[1])) + '米</span>'
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
            console.log(target_location[0], target_location[1]);
        });

        $("#list").html(optString);
    } else {
        source.data.forEach(function (item, index) {

            var target_location = item['location'].split(",");
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
                + '<img src="http://wyj.im/images/avatar.jpg" alt="" width="50" height="50">'
                + '</div>'
                + '<div class="fl info">'
                + '<p>'
                + '<span class="nickname">' + item["username"] + '</span>'
                + '<span class="icon-sex">' + sex_show + '</span>'
                + '<span class="distance">' + parseInt(distance(locations.latitude, locations.longitude, target_location[0], target_location[1])) + '米</span>'
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
        console.log(target_location[0], target_location[1]);
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
    geoFindMe();
}

init();
