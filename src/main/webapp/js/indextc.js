//var icardUrl = "http://food.gdeastriver.com/api";
var currentDateEnd;
var monthDate;
var currentDateStart;
var subcurrentDateEnd;//截取最后日期
var subcurrentDateStart;//截取开始日期
var subSum=7;
var xqi;
var tableid;
var openid;
$(function () {
    openid = getOpenIdFromCookie();//获取openid
    if(openid==""){
        init();
    }
    finUserInfo(openid);
    var riqiw=getNowFormatDate();
     currentDateStart= addDate(riqiw,1);
    currentDateEnd=getLastSevenDays(currentDateStart);
    tb(openid);
    $(".thtext").text(xqi);
    $("#riqitwo,#z").hide();
//默认加载当天日期yymmdd
    currentDateStart =  getNowFormatDate();
    $("#datetime").val(currentDateStart);
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
        newDate = new Date(timestamp + 6 * 24 * 3600 * 1000);
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

    //radio点击选中，再次点击取消选中
    $('input:radio').click(function(){
        var domName = $(this).attr('name');
        var $radio = $(this);
        // if this was previously checked
        if ($radio.data('waschecked') == true){
            $radio.prop('checked', false);
            $("input:radio[name='" + domName + "']").data('waschecked',false);
            //$radio.data('waschecked', false);
        } else {
            $radio.prop('checked', true);
            $("input:radio[name='" + domName + "']").data('waschecked',false);
            $radio.data('waschecked', true);
        }
    });
    //end

});

function tui() { //jquery获取复选框值
    var chk_value = [];
    var chk_news = [];
    var reg = /-| |:/g;

    var zhi=0;
        for(var i=0;i < subSum;i++) {
            var tadate   =$('#inputdate'+i).text();
            var tuiDate= tadate.replace(reg,'');
            $(' #'+i+' input[name="yidingcan"]:not(:checked)').each(function () { //根据table id 遍历checkbox没选中的值
                var tr = $(this).closest("table");
                jffs = $(tr).find("tr").eq(0).children().val();
                zhi=$(this).val();
                valuezhi=parseInt(zhi);
                if(valuezhi==1){
                    chk_news.push({ 日期: tadate,餐别:"早餐"});
                }
                if(valuezhi==2){
                    chk_news.push({ 日期: tadate,餐别:"午餐"});
                }
                if(valuezhi==3){
                    chk_news.push({ 日期: tadate,餐别:"晚餐"});
                }
                if(valuezhi==4){
                    chk_news.push({ 日期: tadate,餐别:"夜宵"});
                }
                chk_value.push({ DATE: tuiDate,MEAL_ID:valuezhi})
            });
            zhi=0;
        }

    //chk_value.push({ value:zhi})
    var strify = JSON.stringify(chk_value);
    var strify2 = JSON.stringify(chk_news);

    var msg = "亲，您确定要退餐吗？\n"+strify2.replace(/\[|]/g,'');
   /* if (confirm(msg)==true){
        return true;
    }else{
        return false;
    }*/
    if(strify!="[]"){
        if (confirm(msg)==true) {
            //alert(strify);
            console.log(strify);
            $.ajax({
                type: "post",
                url: "/api/meal/tuiOrder",
                data: JSON.stringify({"paraData":strify,"openid":openid}),
                dataType: "json",
                contentType: "application/json",
                async: false,
                success: function (data) {
                    alert(data.desc);
                    location.reload();
                }
            });
        }else {
            location.reload();
            return false;
        }
    }else {
        alert("你还没选择退餐哦！");
    }




}
function tb(openid) {
    for(var i=0;i < subSum;i++) {
        var date;
        date = new Date(currentDateStart.replace(/-/g, '/'));
        var timestamp = date.getTime();
        newDate = new Date(timestamp + i* 24 * 3600 * 1000);

        var month = newDate.getMonth() + 1;
        month = month.toString().length == 1 ? '0' + month : month;
        var day = newDate.getDate().toString().length == 1 ? '0' + newDate.getDate() : newDate.getDate();
        current=[newDate.getFullYear(), month, day].join('-');
        var xingqi=week(current);//根据日期获取星期几
        var mal="male";
        var d="inputdate";
        $("#tableFor").append("<table  id="+ i +" style=\"\n" +
            "    width: 100%;border-collapse:collapse;\n" +
            "\"><tr><td id=" + d + i + " class=\"inp\" width=\"20%\"> " + current + "</td><td class='tdc' width=\"15%\">"+xingqi+"</td> " +
            "</tr>"+
            "<tr>" +
            "  <td width=\"20%\"><input type=\"checkbox\"  class=\"zao\"  name=\"can\"  value=\"1\" id=" + mal + parseInt(1 + i * 4) + " />\n" +
            "<label for=" + mal + parseInt(1 + i * 4) + " class=\"choose-label\"></label></td>\n" +
            "<td width=\"15%\">早餐</td>\n" +
            "</tr>" +
            "<tr>" +
            "<td width=\"30%\"><input type=\"checkbox\" class=\"zhong\" name=\"can\" value=\"2\" id=" + mal + parseInt(2 + i * 4) + " />\n" +
            "<label for=" + mal + parseInt(2 + i * 4) + " class=\"choose-label\"></label></td>\n" +
            "<td width=\"30%\" >午餐</td>\n" +
            "</tr>" +
            "<tr>" +
            "<td width=\"20%\"><input type=\"checkbox\" class=\"wan\" name=\"can\" value=\"3\" id=" + mal + parseInt(3 + i * 4) + " />\n" +
            "<label for=" + mal + parseInt(3 + i * 4) + " class=\"choose-label\"></label></td>\n" +
            "<td width=\"15%\">晚餐</td>\n" +
            "</tr>" +
            "<tr>" +
            "<td width=\"30%\"><input type=\"checkbox\" name=\"can\" value=\"4\" id=" + mal + parseInt(4 + i * 4) + " class=\"chooseBtn\"/>\n" +
            "<label for=" + mal + parseInt(4 + i * 4) + " class=\"choose-label\"></label></td>\n" +
            "<td width=\"30%\">夜宵</td>\n" +
            "</tr></table>");

    }

    findWeek(openid);
}


function week(dtime) {
    var arys1 = new Array();
    arys1 =dtime.split('-');     //日期为输入日期，格式为 2013-3-10
    var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
    var  week1=String(ssdate.getDay()).replace("0","日").replace("1","一").replace("2","二").replace("3","三").replace("4","四").replace("5","五").replace("6","六")//就是你要的星期几
    var week="星期"+week1; //星期几
    return week;
}
function bt(i) {
    tableid="#"+i;
    $(""+ tableid +" input[class=\"zao\"]").attr("checked", "checked");
    $(""+ tableid +" input[class=\"zhong\"]").attr('checked',"checked");
    $(""+ tableid +" input[class=\"wan\"]").attr('checked',"checked");
    $(""+ tableid +" input[class=\"chooseBtn\"]").attr('checked',null);


}
function bty(i) {
    tableid="#"+i;
    $(""+ tableid +" input[class=\"zao\"]").attr("checked", null);
    $(""+ tableid +" input[class=\"zhong\"]").attr('checked',"checked");
    $(""+ tableid +" input[class=\"wan\"]").attr('checked',"checked");
    $(""+ tableid +" input[class=\"chooseBtn\"]").attr('checked',"checked");
    // alert("hi2");
}


function findWeek(openid) { //查询订餐信息

    var reg = /-| |:/g;
    var beginDate= currentDateStart.replace(reg,'');
    var endDate=currentDateEnd.replace(reg,'');
    $.ajax({
        type: "post",
        url: "/api/meal/selectmealOrder",
        data: JSON.stringify({"beginDate":beginDate,"endDate":endDate,"openid":openid}),
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (data) {
            var res=data.data;
            var riqiTime = "";//存在日期
            var j=0;
            var tableid="#0";
            if(res.length>0){
                for(var i=0;i < res.length;i++) {
                    var data1 = res[i];
                    var thisTime = data1.DATE;
                    if(thisTime ==riqiTime){//判断当前日期是不是等于存在日期
                        if(data1.BOOKID!=null||data1.BOOKID>0){//是否已订餐
                            $(""+ tableid +" input[value="+data1.MEAL_ID+"]").attr('checked',"checked");
                            //$(""+ tableid +"  input[value="+data1.MEAL_ID+"]").attr('disabled',"disabled");
                            $(""+ tableid +"  input[value="+data1.MEAL_ID+"]").attr('class',"tui");//修改class名称
                            $(""+ tableid +" input[value="+data1.MEAL_ID+"]").attr('name',"yidingcan");//修改name名称
                        }
                    }else{
                        tableid="#"+j++;//tableid
                        var mal="mal";
                        if(data1.BOOKID!=null||data1.BOOKID>0){
                            $(""+ tableid +" input[value="+data1.MEAL_ID+"]").attr('checked',"checked");
                           // $(""+ tableid +"  input[value="+data1.MEAL_ID+"]").attr('disabled',"disabled");
                            $(""+ tableid +"  input[value="+data1.MEAL_ID+"]").attr('class',"tui");//修改class名称
                            $(""+ tableid +" input[value="+data1.MEAL_ID+"]").attr('name',"yidingcan");//修改name名称
                        }

                    }

                    riqiTime = thisTime;

                }

            }
        }
    });

    xuan();
}
function xuan(){//将没选中的checkbox,锁定不给选择
    $('input[name="can"]:not(:checked)').each(function () {
        $("input[name=\"can\"]").attr('disabled',"disabled");

    });

}


function addDate(date, days) {
    if (days == undefined || days == '') {
        days = 1;
    }
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
}

// 日期月份/天的显示，如果是1位数，则在前面加上'0'
function getFormatDate(arg) {
    if (arg == undefined || arg == '') {
        return '';
    }

    var re = arg + '';
    if (re.length < 2) {
        re = '0' + re;
    }

    return re;
}

//查询个人信息
function finUserInfo(openid) {

    $.ajax({
        type: "post",
        url: "/api/meal/selectUserInfo",
           data: openid,
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (data) {
            if(data.rcode=="没有查询到人员信息"){
               // window.location.href=icardUrl+"/hnjca/auth?returnUrl="+icardUrl+"/banding.html";
                window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe91c161506160ef7&redirect_uri=http://pay.modernjj.com/ecard_weixin/binding&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";

            }
            document.getElementById("empcode").innerText = data.empcode;
            document.getElementById("empname").innerText = data.empname;
            $(".my_yue span").html(data.balance);//余额
            numRunFun(0,data.balance);//动态金额

        }

    });
}

function numRunFun(num, maxNum){
    var numBox = document.getElementById("numBox");
    var num = num;
    var maxNum = maxNum;
    var timer = setInterval(function(){
        num++; // 调节速度
        if(num >= maxNum){
            numBox.innerHTML = maxNum;
            clearInterval(timer);
        } else {
            numBox.innerHTML = ~~(num);
        }
    },1); // 也可以调节速度
}
/*function yueyanse() {
    var yu=document.getElementById('numBox');
    var num = parseInt(yu.innerHTML,10);

    if(num<20){yu.style.color='GoldenRod';}//直接改变样式属性
    if(num<1){yu.style.color='red';}//直接改变样式属性
}*/
