let conResult = null;
window.onload = () => {
    requestPage1();
    requestPage2();
    requestPage3();
};
//请求当前配置
let requestPage1 = () => {
    $(function () {
        $.ajax({
            //请求方式
            type: "get",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: "http://39.106.201.50:8080/getList",
            //请求成功
            success: function (result) {
                for (let i = 0; i < result.length; i++) {
                    document.getElementById('now-lib').innerHTML +=
                        `
                    <tr>
                <td>
                    ${result[i].id}
                </td>
                <td>
                    ${result[i].name}
                </td>
                <td>
                     ${result[i].probability}
                </td>
                <td>
                    ${result[i].count}
                </td>
                <td>
                    ${result[i].outOfStock}
                </td>
            </tr>
                    `;
                }
                console.log(result);
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
                alert('请求错误，请联系管理员。');
            }
        });
    });
};


//请求抽奖记录
let requestPage2 = () => {
    $(function () {
        $.ajax({
            //请求方式
            type: "get",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: "http://39.106.201.50:8080/getRecordList",
            //请求成功
            success: function (result) {
                for (let i = result.length - 1; i >= 0; i--) {
                    let date = new Date(result[i].createTime);
                    document.getElementById('record').innerHTML +=
                        `
                    <tr>
                    <td>
                    ${result[i].id}
                </td>
                <td>
                    ${date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()}
                </td>
                <td>
                     ${date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}
                </td>
                <td>
                    ${result[i].name}
                </td>
             
            </tr>
                    `;
                }
                console.log(result);
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
                alert('请求错误，请联系管理员。');
            }
        });
    });
};
//请求配置
let requestPage3 = () => {
    $(function () {
        $.ajax({
            //请求方式
            type: "get",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: "http://39.106.201.50:8080/getList",
            //请求成功
            success: function (result) {
                conResult = result;
                for (let i = 0; i < result.length; i++) {
                    let date = new Date(result[i].createTime);
                    document.getElementById('adjust').innerHTML +=
                        `
                     <tr>
                <td>
                    ${result[i].id}
                </td>
                <td>
                    ${result[i].name}
                </td>
               
                <td>
                    <input type="number" class="form-control" id="inputWeight" data-id="${result[i].id}" placeholder="输入权重" value="${result[i].weight}" 
                    onchange="weightChange(this)">
                </td>
                <td>
                <input type="number" class="form-control" id="inputCount" data-id="${result[i].id}" placeholder="输入库存" value='${result[i].count}'
                    onchange="countChange(this)"
                >
                   
                </td>
            </tr>
                    `;
                }
                console.log(result);
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
                alert('请求错误，请联系管理员。');
            }
        });
    });
};

/**
 * 发布配置按钮
 */
let buttonAction = () => {
    console.log(conResult);
    $(function () {
        //
        $.ajax({
            //请求方式
            type: "POST",
            // //请求的媒体类型
            contentType: "application/json",
            //请求地址
            url: "http://39.106.201.50:8080/updateList",
            //数据，json字符串
            data: JSON.stringify(conResult),
            //请求成功
            success: function (result) {
                alert('发布成功！');
                console.log(result);
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                alert('发布失败！');
                console.log(e.status);
                console.log(JSON.parse(e.responseText));
            }
        });
    });


};

/**
 * 权重改变
 * a是input元素
 */
let weightChange = (a) => {
    conResult[a.dataset.id - 1].weight = a.value;
};

/**
 * 库存改变
 * a是input元素
 */
let countChange = (a) => {
    conResult[a.dataset.id - 1].count = a.value;
};
