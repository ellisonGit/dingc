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
    findInfo(openid);
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

function findInfo(openid) { //查询订餐明细
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
        url: "/api/meal/selectmealInfo",
        data: JSON.stringify({"beginDate":endDate,"endDate":beginDate,"openid":openid}),
        dataType:"json",
        contentType: "application/json",
        async: true,
        success: function (data) {
            for(var p in data){

                var  valueData= qudiao(data[p]);
              var  valueData2= valueData.replace(/,/g,'');
             // alert(valueData2);
                var valueData3=f(data[p]);
                if(valueData3==null){
                    valueData3="";
                }
               // alert(valueData3);
                var qf=quk(valueData3).toString();
              var valueData4=  qf.replace(/,/g,'');
                //alert(valueData4);
                $("#tableFor").append("<tr>" +
                    "  <td width=\"25%\">"+p+"</td>\n" +
                    "  <td width=\"25%\">"+week(p)+"</td>\n" +
                    "  <td width=\"25%\">"+shuzi(valueData2)+"</td>\n" +
                    "  <td width=\"25%\">"+shuzi(valueData4)+"</td>\n" +
                    "</tr>");

               // console.log(p);//   取得是key值
                //console.log(data[p]);//取得是value值
            }
            }
    });
}

function week(dtime) {
    var arys1 = new Array();
    arys1 =dtime.split('-');     //日期为输入日期，格式为 2013-3-10
    var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
    var  week1=String(ssdate.getDay()).replace("0","日").replace("1","一").replace("2","二").replace("3","三").replace("4","四").replace("5","五").replace("6","六")//就是你要的星期几
    var week="星期"+week1; //星期几
    return week;
}
function shuzi(shu) {
    if(shu==1){
        zhongwen="早";
    }
    if(shu==2){
        zhongwen="中";
    }
    if(shu==3){
        zhongwen="晚";
    }
    if(shu==4){
        zhongwen="夜";
    }
    if(shu==12){
        zhongwen="早中";
    }
    if(shu==13){
        zhongwen="早晚";
    }
    if(shu==14){
        zhongwen="中夜";
    }

    if(shu==23){
        zhongwen="中晚";
    }
    if(shu==24){
        zhongwen="中夜";
    }
    if(shu==34){
        zhongwen="晚夜";
    }
    if(shu==123){
        zhongwen="早中晚";
    }
    if(shu==124){
        zhongwen="早中夜";
    }
    if(shu==134){
        zhongwen="早晚夜";
    }
    if(shu==234){
        zhongwen="中晚夜";
    }
    if(shu==1234){
        zhongwen="早中晚夜";
    }if(shu==""){
        zhongwen="";
    }
    return zhongwen;
}

//js 截取多个带括号的数据
function f(str) {

    pattern =new RegExp("\\((.| )+?\\)","igm");

    return(str.match(pattern));
}


//js 去掉小括号里面的数据
function qudiao(qstr) {
    var nstr = qstr.replace(/\([^\)]*\)/g,"");
    return nstr;
}

//去掉所有小括号
function quk(st) {

    var nstr =(st.toString().replace(/\(|/g,''));
    var nstr2 =(nstr.replace(/\)|/g,''));
return nstr2;
}