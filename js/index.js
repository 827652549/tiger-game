'use strict';
let isPlay = false;
let isLight = false;//跑马灯交替标识
let light = document.getElementById('light');
let drawCnt = 0; // 计数器，每抽一次奖自增1
let u = 188; // 每个数字图片的高度，整张长图的高度是337px
let AlertWindow = document.getElementById('alert-window');
let lightInterval = null;
let result = null;
let datas = [
    {'id': 1, 'url': 'images/2弹窗/iPhone11pro%20Max.png', 'name': 'iPhone11Pro Max'},
    {'id': 2, 'url': 'images/2弹窗/HUAWEI%20Mate%2030%20Pro.png', 'name': 'HUAWEI Mate 30 Pro'},
    {'id': 3, 'url': 'images/2弹窗/金条.png', 'name': '金条'},
    {'id': 4, 'url': 'images/2弹窗/暖手袋.png', 'name': '暖手袋'},
    {'id': 5, 'url': 'images/2弹窗/花如玉对碗.png', 'name': '花如玉对碗'},
    {'id': 6, 'url': 'images/2弹窗/电动牙刷.png', 'name': '电动牙刷'},
    {'id': 7, 'url': 'images/2弹窗/欧姆龙按摩器.png', 'name': '欧姆龙按摩器'},
    {'id': 8, 'url': 'images/2弹窗/挂烫机.png', 'name': '挂烫机'},
    {'id': 9, 'url': 'images/2弹窗/黄油饼干.png', 'name': '黄油饼干'},
    {'id': 10, 'url': 'images/2弹窗/焖烧杯.png', 'name': '焖烧杯'},
    {'id': 11, 'url': 'images/2弹窗/雪平锅.png', 'name': '雪平锅'},
    {'id': 12, 'url': 'images/2弹窗/松下吹风机.png', 'name': '松下吹风机'},
    {'id': 13, 'url': 'images/2弹窗/象印电饭煲.png', 'name': '象印电饭煲'},
    {'id': 14, 'url': 'images/2弹窗/旅行收纳套装.png', 'name': '旅行收纳套装'},
    {'id': 15, 'url': 'images/2弹窗/保温箱.png', 'name': '保温箱'},
    {'id': 16, 'url': 'images/2弹窗/12元现金券.png', 'name': '12元现金券'}
];
window.onload = () => {
    //speed是调节横向滚动速度的，数字越小，速度越快
    $('#Marquee_x').jcMarquee({'marquee': 'x', 'margin': '10px', 'speed': 15});
};

let getPosition = (number) => {
    // 每次抽奖默认先滚动完整的17圈
    return 188 * 17 * (drawCnt + 1) + u * (17 - number)
};

let draw = () => {
    if (!isPlay) {
        isPlay = !isPlay;//将状态设为抽奖中，不可重新点击
        BlinklLight();
        // 生成的数组表示的是图片的下标0表示第一章图片
        //const result = getArrayUpDown(4, 3);
        const result = requestPrice();


        setTimeout(() => {
            //关闭灯条
            clearInterval(lightInterval);
            //展示弹窗
            showAlert();
            document.getElementsByClassName('num')[0].style.backgroundPositionY = '0px';
            document.getElementsByClassName('num')[1].style.backgroundPositionY = '0px';
            document.getElementsByClassName('num')[2].style.backgroundPositionY = '0px';

        }, 7000)

    } else {
        console.log('正在抽奖，请勿重复点击。')
    }
};

/**
 * 展示弹窗
 */
let showAlert = () => {
    AlertWindow.style.display = 'block';
    fiveSecond();

};

/**
 * 5秒倒计时
 */
let fiveSecond = () => {
    //总等待时长5s
    let secondNum = 4;
    let interval = setInterval(
        () => {
            document.getElementById('span2').innerHTML = '(' + (secondNum--) + 's)';
            if (secondNum < 0) {
                //将倒计时字删除
                document.getElementById('span2').innerHTML = '';
                document.getElementById('button-ikonw').src = 'images/2弹窗/按钮tab.png';
                clearInterval(interval);
                //延长点击时间，与动画保持一致
                setTimeout(() => {
                    document.getElementById('font-iknow').onclick = buttonIKnow
                }, 500);

            }
        }
        , 1000);

};

/**
 * 点击"我知道了"按钮后的行为
 */
let buttonIKnow = () => {
    AlertWindow.style.display = 'none';
    //将状态重新设置到待抽奖状态
    isPlay = !isPlay;
    document.getElementById('span2').innerHTML = '(5s)';
    document.getElementById('font-iknow').onclick = null;
    document.getElementById('button-ikonw').src = 'images/2弹窗/按钮tab-灰色.png';
};

/*
跑马灯
 */
let BlinklLight = () => {
    lightInterval = setInterval(
        () => {
            lightChange()
        }
        , 1000);
};

//灯条转换
let lightChange = () => {
    light.src = isLight ? "images/1首页_slices/跑马灯1.png" : "images/1首页_slices/跑马灯2.png";
    isLight = !isLight;
};

//请求抽奖
let requestPrice = () => {
    $(function () {
        //请求参数
        var list = {};
        //
        $.ajax({
            //请求方式
            type: "get",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: "http://10.85.16.65:8080/getPrize",
            //请求成功
            success: function (result) {
                //更改弹窗图片
                document.getElementById('real-prize').src = datas[result.id - 1].url;
                //更改弹窗文字
                document.getElementById('prize-name').innerText = datas[result.id - 1].name;
                console.log(result);

                const arrResult = [result.id, result.id, result.id];

                document.getElementsByClassName('num')[0].style.backgroundPositionY = getPosition(arrResult[0]) + 'px';
                document.getElementsByClassName('num')[1].style.backgroundPositionY = getPosition(arrResult[1]) + 'px';
                document.getElementsByClassName('num')[2].style.backgroundPositionY = getPosition(arrResult[2]) + 'px';
                drawCnt++;


                return arrResult;
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
                return [15, 15, 15];
                alert('请求错误，请联系管理员。');
            }
        });
    });
};
