

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
    $('.js-username').html(source.data[0]['username'] + sex[source. data[0]['sex']]);
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
            if(data.status === "success") {
                alert('修改成功!');
            }
        },
        error: function (xhr, type) {
            alert(xhr.responseText);
        }
    });
}

$('.js-update').on('click', function () {
    //alert('clicking...')
    updateInfo();

});

init();