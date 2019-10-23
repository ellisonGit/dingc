var currentDateEnd;
var monthDate;
var currentDateStart;
var subcurrentDateEnd;//截取最后日期
var subcurrentDateStart;//截取开始日期
var subSum;
var xqi;
var openid;

$(function () {

    riqitwo.value = getLastSevenDays(riqi.value);//结束时间7天



//默认加载当天日期yymmdd
    currentDateStart = riqi.value = getNowFormatDate();

    $("#datetime").val(riqi.value);
    openid = getOpenIdFromCookie();//获取openid
    if(openid==""){
        window.location.href=icardUrl+"/hnjca/auth?returnUrl="+icardUrl+"/banding.html";
    }
    findTongji(openid);
    //获取今天日期yymmdd
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;

        return currentdate;
    }

    //获取当前日期至7天
    function getLastSevenDays(date) {
        var date = date || new Date(), timestamp, newDate;
        if (!(date instanceof Date)) {
            date = new Date(date.replace(/-/g, '/'));
        }
        timestamp = date.getTime();
        newDate = new Date(timestamp  -6 * 24 * 3600 * 1000);
        var month = newDate.getMonth() + 1;
        month = month.toString().length == 1 ? '0' + month : month;
        var day = newDate.getDate().toString().length == 1 ? '0' + newDate.getDate() : newDate.getDate();
        currentDateEnd = [newDate.getFullYear(), month, day].join('-');
        return [newDate.getFullYear(), month, day].join('-');
    }

    // 获取当前日期至月尾
    var oneDayLong = 24 * 60 * 60 * 1000;
    //每天的总毫秒书
    var now = new Date();
    //当前时间
    var sign1 = "-";
    var sign2 = ":";
    var year = now.getFullYear();
    //当前年份
    var monthStartDate = new Date(year, now.getMonth() + 1, 1);
    //当前月1号
    var nextMonthStartDate = new Date(year, now.getMonth() + 2, 1);
    //下个月1号
    var days = (nextMonthStartDate.getTime() - monthStartDate.getTime()) / oneDayLong;
    //计算当前月份的天数
    var monthEndDate = new Date(year, now.getMonth() + 1, days);
    var monthRange = [monthStartDate, monthEndDate];

    monthDate = monthRange[1].getFullYear() + '-' + (monthRange[1].getMonth() < 10 ? "0" + monthRange[1].getMonth() : monthRange[1].getMonth()) + '-' + (monthRange[1].getDate() < 10 ? "0" + monthRange[1].getDate() : monthRange[1].getDate());
    //end
    //根据时间段来选择订餐
    //console.log($("#zaocan").prop("checked"))  //打印出false

});



function week(dtime) {
    var arys1 = new Array();
    arys1 =dtime.split('-');     //日期为输入日期，格式为 2013-3-10
    var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
    var  week1=String(ssdate.getDay()).replace("0","日").replace("1","一").replace("2","二").replace("3","三").replace("4","四").replace("5","五").replace("6","六")//就是你要的星期几
    var week="星期"+week1; //星期几
    return week;
}

function findTongji(openid) { //查询订餐及用餐统计
    // var a=$("#riqi").val();
    // alert(a);
    // riqi.value = currentDateStart;
    // currentDateEnd=getLastSevenDays(currentDateStart);
    // riqitwo.value=currentDateEnd;
    var tadate=$("#riqi").val();
    var tadatetwo=$("#riqitwo").val();
    var reg = /-| |:/g;
    var beginDate= tadate.replace(reg,'');
    var endDate=tadatetwo.replace(reg,'');
    $.ajax({
        type: "post",
        url: "/api/meal/selectmealTongji",
        data: JSON.stringify({"beginDate":endDate,"endDate":beginDate,"openid":openid}),
        dataType:"json",
        contentType: "application/json",
        async: true,
        success: function (data) {
           //订餐
            document.getElementById("dzao").innerText = data.BREAKFAST;
            document.getElementById("dzhong").innerText = data.LUNCH;
            document.getElementById("dwan").innerText = data.DINNER;
            document.getElementById("dye").innerText = data.SUPPER;

            //用餐
            document.getElementById("yzao").innerText = data.HAVE_BREAKFAST;
            document.getElementById("yzhong").innerText = data.HAVE_LUNCH;
            document.getElementById("ywan").innerText = data.HAVE_DINNER;
            document.getElementById("yye").innerText = data.HAVE_SUPPER;


        }
    });
}