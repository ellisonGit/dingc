var icardUrl = "http://food.gdeastriver.com/api";
//var icardUrl = "http://lllison.viphk.ngrok.org/api";
var currentDateEnd;
var monthDate;
var currentDateStart;
var subcurrentDateEnd;//截取最后日期
var subcurrentDateStart;//截取开始日期
var subSum=0;
var xqi;
var tableid;
var openid;
$(function () {

    $("#riqi").prop("onclick",null);
    $(document).ready(function(){
        $('input:radio').click(function () {
            //Code  点击触发radio时调用的方法
        });
    });
    var riqiw=getNowFormatDate();
    currentDateStart= addDate(riqiw,1);
    dayriqi.value=currentDateStart;
    /*   xqi=week(currentDateStart);//根据日期获取星期几*/
    //默认加载当天日期yymmdd
    riqi.value = currentDateStart;
    $("#datetime").val(riqi.value);
    document.getElementById("weekmeal").style.background="#DDDDDD";
     openid = getOpenIdFromCookie();//获取openid
    if(openid==""){
        window.location.href=icardUrl+"/hnjca/auth?returnUrl="+icardUrl+"/banding.html";
    }
    tbday(openid);
    finUserInfo(openid);
    $(".thtext").text(xqi);
    $("#riqi,#riqitwo,#z").hide();




    //按天
    $("#daymeal").click(function () {
        riqi.onclick = function() {
            fPopCalendar(event,this,this);
        };
        $("#labid,#dayriqi").show();
        $("#riqi,#riqitwo,#z").hide();
        riqi.value = currentDateStart;
        $("#datetime").html(riqi.value);
        $("#tableFor").find("tr").remove();
        $("#tableFor").find("table").remove();
        riqitwo.value="";
        tbday(openid);
        document.getElementById("weekmeal").style.background="#DDDDDD";
        document.getElementById("daymeal").style.background="#44B549";

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
    //按周
    $("#weekmeal").click(function () {
        document.getElementById("daymeal").style.background="#DDDDDD";
        document.getElementById("weekmeal").style.background="#44B549";
        riqi.onclick = function() {
            fPopCalendar(event,this,this);
        };
        riqitwo.onclick = function() {
            fPopCalendar(event,this,this);
        };
        $("#dayriqi,#labid").hide();
        $("#riqi,#riqitwo,#z").show();
        $("#tableFor").find("tr").remove();
        $("#tableFor").find("table").remove();
        riqitwo.value="";

        currentDateEnd = riqitwo.value = getLastSevenDays(currentDateStart);
        subcurrentDateStart = currentDateStart.substring(8, 10);
        subcurrentDateEnd = currentDateEnd.substring(8, 10);
        subSum = subcurrentDateEnd - subcurrentDateStart + 1;
        if (subSum < 0) {
            subSum = 7;
        }
        tb(openid);

        //radio点击选中，再次点击取消选中
        $('input:radio').click(function(){
            var domName = $(this).attr('name');
            var $radio = $(this);
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
    //按月
    $("#monthmeal").click(function () {
        $("#riqi,#riqitwo").prop("onclick",null);//使用jq的方法移除点击事件
        $("#riqitwo,#z").show();
        $("#tableFor").find("tr").remove();

        riqitwo.value="";
        riqitwo.value = monthDate;
        subcurrentDateStart = currentDateStart.substring(8, 10);
        subcurrentDateEnd = monthDate.substring(8, 10);
        subSum = subcurrentDateEnd - subcurrentDateStart + 1;
        tb();
    });

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

function jqchk() { //提交订餐
    var chk_value = [];
    //var jffs = [];
    //var canvar=[];
    var zhi=0;
    if(subSum==0){

        var tadate=$("#riqi").val();
        var reg = /-| |:/g;

      var shijian= tadate.replace(reg,'');
        $(' #'+0+' input[name="can"]:checked').each(function () {//根据table id 遍历checkbox选中的值
            var tr = $(this).closest("table");
            jffs = $(tr).find("tr").eq(0).children().val();
            zhi=$(this).val();
            valuezhi=parseInt(zhi);
            chk_value.push({ DATE: shijian,MEAL_ID:valuezhi})
        });
        zhi=0;
    }else {
    for(var i=0;i < subSum;i++) {
        var tadate   =$('#inputdate'+i).text();
        var reg = /-| |:/g;
        var shijian= tadate.replace(reg,'');
       // alert("shijian:"+shijian);

    $(' #'+i+' input[name="can"]:checked').each(function () {//根据table id 遍历checkbox选中的值
        var tr = $(this).closest("table");
        jffs = $(tr).find("tr").eq(0).children().val();
       zhi=$(this).val();
        valuezhi=parseInt(zhi);//字符串转int
        chk_value.push({ DATE: shijian,MEAL_ID:valuezhi})
    });
        zhi=0;
    }
    }
    //chk_value.push({ value:zhi})
    var strify = JSON.stringify(chk_value);
    if(strify!="[]"){
        console.log(strify);
        $.ajax({
            type: "post",
            url: "/api/meal/mealOrder",
            //data:strify,"openid":openid,
            data: JSON.stringify({"paraData":strify,"openid":openid}),
            dataType: "json",
            contentType: "application/json",
            async: false,
            success: function (data) {
                    alert(data.desc);
                $('#weekmeal').click();
                finUserInfo(openid);
            }
        });
    }else {
        alert("你还没选择订餐哦！");
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
        var a="zzw";
        var b="zwy";
        var d="inputdate";
        var e="can";
        $("#tableFor").append("<table  id="+ i +" style=\"\n" +
            "    width: 100%;border-collapse:collapse;\n" +
            "\"><tr><td id=" + d + i + " class=\"inp\" width=\"20%\"> " + current + "</td><td class='tdc' width=\"15%\">"+xingqi+"</td> " +
            "</tr>"+
            "<tr>" +
            "<td class='cu'>快速订餐</td> " +
            "<td></td> " +
            "</tr>" +
            "<tr>" +
            "<td><label><input  type=\"radio\"  onclick=\"bt("+ i +")\"  name=" + a + i + " value=" + a + "><span></span>早中晚</label> </td>" +
            "<td> <label><input type=\"radio\"  onclick=\"bty("+ i +")\" name=" + a + i + "  value=" + b + "><span></span>中晚夜</label></td>" +
            "</tr>" +
            "<tr>" +
            "<td class='cu'>自选餐别</td> " +
            "<td></td></tr>" +
            "<tr>" +
            "  <td width=\"20%\"><input type=\"checkbox\" class=\"zao\"  name=\"can\"  value=\"1\" id=" + mal + parseInt(1 + i * 4) + " />\n" +
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
function tbday(openid) {

    for(var i=0;i < 1;i++) {
        var date;
        date = new Date(currentDateStart.replace(/-/g, '/'));
        var timestamp = date.getTime();
        newDate = new Date(timestamp + i* 24 * 3600 * 1000);
        var month = newDate.getMonth() + 1;
        month = month.toString().length == 1 ? '0' + month : month;
        var day = newDate.getDate().toString().length == 1 ? '0' + newDate.getDate() : newDate.getDate();
        current=[newDate.getFullYear(), month, day].join('-');
        var  we=week(current);//根据日期获取星期几
        var mal="male";
        var a="zzw";
        var b="zwy"
        var d="inputdate";
        $("#tableFor").append("<table id="+ i +" style=\"\n" +
            "    width: 100%;border-collapse:collapse;\n" +
            "\"><tr><td id=" + d + i + " class=\"inp\" width=\"20%\"> " + current + "</td><td class='tdc' width=\"15%\">"+we+"</td> " +
            "</tr>"+
            "<tr>" +
            "<td class='cu'>快速订餐</td> " +
            "<td></td> " +
            "</tr>" +
            "<tr>" +
            "<td><label><input type=\"radio\"  onclick=\"bt("+ i +")\"  name=" + a + i + " value=" + a + "><span></span>早中晚</label> </td>" +
            "<td> <label><input type=\"radio\"  onclick=\"bty("+ i +")\" name=" + a + i + "  value=" + b + "><span></span>中晚夜</label></td>" +
            "</tr>" +
            "<tr>" +
            "<td class='cu'>自选餐别</td> " +
            "<td></td></tr>" +
            "<tr>" +
            "  <td width=\"20%\"><input type=\"checkbox\"   name=\"can\"  value=\"1\" id=" + mal + parseInt(1 + i * 4) + " class=\"zao\"/>\n" +
            "<label for=" + mal + parseInt(1 + i * 4) + " class=\"choose-label\"></label></td>\n" +
            "<td width=\"15%\">早餐</td>\n" +
            "</tr>" +
            "<tr>" +
            "<td width=\"30%\"><input type=\"checkbox\" name=\"can\" value=\"2\" id=" + mal + parseInt(2 + i * 4) + " class=\"zhong\"/>\n" +
            "<label for=" + mal + parseInt(2 + i * 4) + " class=\"choose-label\"></label></td>\n" +
            "<td width=\"30%\" >午餐</td>\n" +
            "</tr>" +
            "<tr>" +
            "<td width=\"20%\"><input type=\"checkbox\" name=\"can\" value=\"3\" id=" + mal + parseInt(3 + i * 4) + " class=\"wan\"/>\n" +
            "<label for=" + mal + parseInt(3 + i * 4) + " class=\"choose-label\"></label></td>\n" +
            "<td width=\"15%\">晚餐</td>\n" +
            "</tr>" +
            "<tr>" +
            "<td width=\"30%\"><input type=\"checkbox\" name=\"can\" value=\"4\" id=" + mal + parseInt(4 + i * 4) + " class=\"chooseBtn\"/>\n" +
            "<label for=" + mal + parseInt(4 + i * 4) + " class=\"choose-label\"></label></td>\n" +
            "<td width=\"30%\">夜宵</td>\n" +
            "</tr></table>"   );
    }
    findDay(openid);

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


function findDay(openid) { //查询天订餐信息
    var tadate=$("#riqi").val();
    //alert(tadate);
    var reg = /-| |:/g;
    var beginDate= tadate.replace(reg,'');
    var endDate=beginDate;
        $.ajax({
            type: "post",
            url: "/api/meal/selectmealOrder",
            data: JSON.stringify({"beginDate":beginDate,"endDate":endDate,"openid":openid}),
            dataType: "json",
            contentType: "application/json",
            async: false,
            success: function (data) {
                var res=data.data;
                if(res.rcode==0){
                    alert(res.desc);
                }
                if(res.length>0){
                    for(var i=0;i < res.length;i++) {
                        var data1 = res[i];
                        if(data1.BOOKID!=null||data1.BOOKID>0){
                            $("#0 input[value="+data1.MEAL_ID+"]").attr('checked',"checked");
                            $("#0 input[value="+data1.MEAL_ID+"]").attr('disabled',"disabled");
                            $("#0 input[value="+data1.MEAL_ID+"]").attr('class',"type"+data1.MEAL_ID);//修改class名称
                            $("#0 input[value="+data1.MEAL_ID+"]").attr('name',"yidingcan");//修改name名称
                        }
                    }
                    //alert(data.desc);
                }
            }
        });
}

function findWeek(openid) { //查询周订餐信息
    riqi.value = currentDateStart;
    currentDateEnd=getLastSevenDays(currentDateStart);
    riqitwo.value=currentDateEnd;
    var tadate=$("#riqi").val();
    var tadatetwo=$("#riqitwo").val();
    var reg = /-| |:/g;
    var beginDate= tadate.replace(reg,'');
    var endDate=tadatetwo.replace(reg,'');
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
                            $(""+ tableid +"  input[value="+data1.MEAL_ID+"]").attr('disabled',"disabled");
                            $(""+ tableid +"  input[value="+data1.MEAL_ID+"]").attr('class',"type"+data1.MEAL_ID);//修改class名称
                            $(""+ tableid +" input[value="+data1.MEAL_ID+"]").attr('name',"yidingcan");//修改name名称
                        }
                    }else{
                        tableid="#"+j++;//tableid
                        if(data1.BOOKID!=null||data1.BOOKID>0){
                            $(""+ tableid +" input[value="+data1.MEAL_ID+"]").attr('checked',"checked");
                            $(""+ tableid +"  input[value="+data1.MEAL_ID+"]").attr('disabled',"disabled");
                            $(""+ tableid +"  input[value="+data1.MEAL_ID+"]").attr('class',"type"+data1.MEAL_ID);//修改class名称
                            $(""+ tableid +" input[value="+data1.MEAL_ID+"]").attr('name',"yidingcan");//修改name名称

                        }

                    }

                    riqiTime = thisTime;

                }

            }
        }
    });
}

//查询个人信息
    function finUserInfo(openid) {
        $.ajax({
            type: "post",
            url: "/api/meal/selectUserInfo",
            data: openid,
            contentType: "application/json",
            async: false,
            success: function (data) {
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
/*
function yueyanse() {
    var yu=document.getElementById('numBox');
    var num = parseInt(yu.innerHTML,10);

    if(num<20){yu.style.color='GoldenRod';}//直接改变样式属性
    if(num<1){yu.style.color='red';}//直接改变样式属性
}
*/
