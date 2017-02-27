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
var locations = null;
function geoFindMe() {

    if (!navigator.geolocation) {
        alert("您的浏览器不支持地理位置");
        return;
    }
    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        //纬度 , 经度
        locations = latitude + "," + longitude;
        console.log(locations);
        document.querySelector(".locating-status").innerHTML = "定位成功!";
    }

    function error() {
        document.querySelector(".locating-status").innerHTML = "无法获取您的定位。";
    }

    console.log("Locating…");
    navigator.geolocation.getCurrentPosition(success, error);
}
geoFindMe();

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


