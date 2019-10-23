var riqiValue;
var gMonths=new Array("1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月");
var WeekDay=new Array("日","一","二","三","四","五","六");  
var strToday="今天";  
var strYear="年";  
var strMonth="月";  
var strDay="日";  
var splitChar="-";  
var startYear=1900;  
var endYear=2050;  
var dayTdHeight=20;  
var dayTdTextSize=12;  
var gcNotCurMonth="#E0E0E0";  
var gcRestDay="#FF0000";  
var gcWorkDay="#444444";  
var gcMouseOver="#79D0FF";  
var gcMouseOut="#F4F4F4";  
var gcToday="#444444";  
var gcTodayMouseOver="#6699FF";  
var gcTodayMouseOut="#79D0FF";  
var gdCtrl=new Object();  
var goSelectTag=new Array();  
var gdCurDate=new Date();  
var giYear=gdCurDate.getFullYear();  
var giMonth=gdCurDate.getMonth()+1;  
var giDay=gdCurDate.getDate();
var s;
var openid;
var currentDateStart;
var dateEnd;
openid = getOpenIdFromCookie();//获取openid
var riqiw=getNowFormatDate();
currentDateStart= addDate(riqiw,1);
//默认加载当天日期yymmdd

function $$(){var elements=new Array();for(var i=0;i<arguments.length;i++) {var element=arguments[i];if(typeof(arguments[i])=='string'){element=document.getElementById(arguments[i]);}if(arguments.length==1){return element;}elements.Push(element);}return elements;}  
Array.prototype.Push=function(){var startLength=this.length;for(var i=0;i<arguments.length;i++){this[startLength+i]=arguments[i];}return this.length;}  
String.prototype.HexToDec=function(){return parseInt(this,16);}
String.prototype.cleanBlank=function(){return this.isEmpty()?"":this.replace(/\s/g,"");}
function checkColor(){var color_tmp=(arguments[0]+"").replace(/\s/g,"").toUpperCase();var model_tmp1=arguments[1].toUpperCase();var model_tmp2="rgb("+arguments[1].substring(1,3).HexToDec()+","+arguments[1].substring(1,3).HexToDec()+","+arguments[1].substring(5).HexToDec()+")";model_tmp2=model_tmp2.toUpperCase();if(color_tmp==model_tmp1 ||color_tmp==model_tmp2){return true;}return false;}  
function $V(){return $$(arguments[0]).value;}  
function fPopCalendar(evt,popCtrl,dateCtrl){  
    evt.cancelBubble=true;  
    gdCtrl=dateCtrl;  
    if(gdCtrl.value == ''){  
        fSetYearMon(giYear,giMonth);
       // alert("a:"+fSetYearMon(giYear,giMonth));
    }else{  
        var aDates = gdCtrl.value.split('-')  
        fSetYearMon(aDates[0],aDates[1]);

    }  
      
    var point=fGetXY(popCtrl);  
    with($$("calendardiv").style){
        //left=point.x+"px";
        left=160+"px";
        top=(point.y+popCtrl.offsetHeight+1)+"px";  
        visibility='visible';  
        //zindex='99999';  
        position='absolute';

    }  
    $$("calendardiv").focus();

}
function fSetDate(iYear,iMonth,iDay){
    var iMonthNew=new String(iMonth);  
    var iDayNew=new String(iDay);  
    if(iMonthNew.length<2){  
        iMonthNew="0"+iMonthNew;  
    }  
    if(iDayNew.length<2){  
        iDayNew="0"+iDayNew;  
    }

    //ellison s
    riqiValue= gdCtrl.value=iYear+splitChar+iMonthNew+splitChar+iDayNew;

  //alert("sdf:"+riqiValue );

     s=riqi.value;//开始时间
    var e=riqitwo.value;//结束时间
    dateEnd=e;
    var subD=getDateByTimeStr(s);//字符转日期类型
    var subE=getDateByTimeStr(e);//字符转日期类型
    if(subD<new Date(currentDateStart.replace(/-/g, '/'))){
        alert("选择不能小于当前日期哦！");
        return;
    }if(subE<new Date(currentDateStart.replace(/-/g, '/'))){
        alert("选择不能小于当前日期哦！");
        return;
    }
    else{
    var zs=getDateByTimeStr(s);
    var ze=getDateByTimeStr(e);
    var date=(ze.getTime()-zs.getTime())/(1000*60*60*24);/*开始时间和结束时间之差*/
    fHideCalendar();
    //alert("s"+s);
    //alert("时间差："+date);
    subSum=date+1;
    if(e!=""){
        ctb(s);
    }else{
        riqitwo.value="";
      //  alert("rqiqo:"+riqitwo.value);
        inputdate.value=riqiValue;
    }






}
}
function ctb(s) {
    $("#tableFor").find("tr").remove();
    $("#tableFor").find("table").remove();
    for(var i=0;i < subSum;i++) {
       // var date;

        //s = new Date(currentDateStart.replace(/-/g, '/'));
        var subDate=getDateByTimeStr(s);//字符转日期类型
       // alert("shijian:"+subDate);
        var timest = subDate.getTime();

        newDate = new Date(timest + i* 24 * 3600 * 1000);
        //alert("shijian:"+newDate);
        var month = newDate.getMonth() + 1;
        month = month.toString().length == 1 ? '0' + month : month;
        var day = newDate.getDate().toString().length == 1 ? '0' + newDate.getDate() : newDate.getDate();
        current=[newDate.getFullYear(), month, day].join('-');
//alert("jian:"+current);
        var xingqi=week(current);//根据日期获取星期几
        var mal="male";
        var a="zzw";
        var b="zwy"
        var d="inputdate";
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

    findWeek2(openid);
}


function fHideCalendar(){$$("calendardiv").style.visibility="hidden";for(var i=0;i<goSelectTag.length;i++){goSelectTag[i].style.visibility="visible";}goSelectTag.length=0;}  
function fSetSelected(){
    var iOffset=0;  
    var iYear=parseInt($$("tbSelYear").value);  
    var iMonth=parseInt($$("tbSelMonth").value);  
    var aCell=$$("cellText"+arguments[0]);  
    aCell.bgColor=gcMouseOut;  
    with(aCell){  
        var iDay=parseInt(innerHTML);  
        if(checkColor(style.color,gcNotCurMonth)){  
            iOffset=(innerHTML>10)?-1:1;  
        }  
        iMonth+=iOffset;  
        if(iMonth<1){iYear--;iMonth=12;}  
        else if(iMonth>12){iYear++;iMonth=1;}  
    }  
    fSetDate(iYear,iMonth,iDay);

}  
function Point(iX,iY){this.x=iX;this.y=iY;}  
function clearDate(){gdCtrl.value = '';fHideCalendar();}  
function fBuildCal(iYear,iMonth){var aMonth=new Array();for(var i=1;i<7;i++){aMonth[i]=new Array(i);}var dCalDate=new Date(iYear,iMonth-1,1);var iDayOfFirst=dCalDate.getDay();var iDaysInMonth=new Date(iYear,iMonth,0).getDate();var iOffsetLast=new Date(iYear,iMonth-1,0).getDate()-iDayOfFirst+1;var iDate=1;var iNext=1;for(var d=0;d<7;d++){aMonth[1][d]=(d<iDayOfFirst)?(iOffsetLast+d)*(-1):iDate++;}for(var w=2;w<7;w++){for(var d=0;d<7;d++){aMonth[w][d]=(iDate<=iDaysInMonth)?iDate++:(iNext++)*(-1);}}return aMonth;}  
function fDrawCal(iYear,iMonth,iCellHeight,iDateTextSize){  
    var colorTD=" bgcolor='"+gcMouseOut+"' bordercolor='"+gcMouseOut+"'";  
    var styleTD=" valign='middle' align='center' style='height:"+iCellHeight+"px !important;font-weight:bolder;font-size:"+iDateTextSize+"px;";  
    var dateCal="";  
    dateCal+="<tr>";  
    for(var i=0;i<7;i++){  
        dateCal+="<td "+colorTD+styleTD+"color:#990099'>"+WeekDay[i]+"</td>";  
    }  
    dateCal+="</tr>";  
    for(var w=1;w<7;w++){  
        dateCal+="<tr>";  
        for(var d=0;d<7;d++){  
            var tmpid=w+""+d;  
            dateCal+="<td"+styleTD+"cursor:pointer;' onclick='fSetSelected("+tmpid+")'>";
            dateCal+="<span id='cellText"+tmpid+"'></span>";  
            dateCal+="</td>";  
        }  
        dateCal+="</tr>";  
    }
    return dateCal;

}  
function fUpdateCal(iYear,iMonth){  
    var myMonth=fBuildCal(iYear,iMonth);  
    var i=0;  
    var aDates = gdCtrl.value.split('-')  
    for(var w=1;w<7;w++){  
        for(var d=0;d<7;d++){  
            with($$("cellText"+w+""+d)){  
                parentNode.bgColor=gcMouseOut;  
                parentNode.borderColor=gcMouseOut;  
                parentNode.onmouseover=function(){  
                    this.bgColor=gcMouseOver;  
                };  
                parentNode.onmouseout=function(){  
                    this.bgColor=gcMouseOut;  
                };  
                if(myMonth[w][d]<0){  
                    style.color=gcNotCurMonth;  
                    innerHTML=Math.abs(myMonth[w][d]);  
                }else{  
                    style.color=((d==0)||(d==6))?gcRestDay:gcWorkDay;  
                    innerHTML=myMonth[w][d];  
                      
                    if(iYear==giYear && iMonth==giMonth && myMonth[w][d]==giDay){  
                        style.color=gcToday;  
                        parentNode.bgColor=gcTodayMouseOut;  
                        parentNode.onmouseover=function(){  
                            this.bgColor=gcTodayMouseOver;  
                        };  
                        parentNode.onmouseout=function(){  
                            this.bgColor=gcTodayMouseOut;  
                        };  
                    }  
                    if(aDates.length == 3 && iYear==aDates[0] && iMonth==aDates[1] && myMonth[w][d]==aDates[2]){  
                        style.color=gcToday;  
                        parentNode.bgColor='#ffdd66';
                        parentNode.onmouseover=function(){  
                            this.bgColor='#ffdd66';  
                        };  
                        parentNode.onmouseout=function(){  
                            this.bgColor='#ffdd66';  
                        };  
                    }  
  
                }  
            }  
        }  
    }  
}  
function fSetYearMon(iYear,iMon){$$("tbSelMonth").options[iMon-1].selected=true;for(var i=0;i<$$("tbSelYear").length;i++){if($$("tbSelYear").options[i].value==iYear){$$("tbSelYear").options[i].selected=true;}}fUpdateCal(iYear,iMon);}  
function fPrevMonth(){var iMon=$$("tbSelMonth").value;var iYear=$$("tbSelYear").value;if(--iMon<1){iMon=12;iYear--;}fSetYearMon(iYear,iMon);}  
function fNextMonth(){var iMon=$$("tbSelMonth").value;var iYear=$$("tbSelYear").value;if(++iMon>12){iMon=1;iYear++;}fSetYearMon(iYear,iMon);}  
function fGetXY(aTag){  
    var oTmp=aTag;  
    var pt=new Point(0,0);  
    do{  
        pt.x+=oTmp.offsetLeft;  
        pt.y+=oTmp.offsetTop;  
        if(oTmp.offsetParent){  
            oTmp=oTmp.offsetParent;  
        }else{  
            break;  
        }  
    }while(oTmp.tagName.toUpperCase()!="BODY");  
    return pt;  
}  
function getDateDiv(){  
    var noSelectForIE="";  
    var noSelectForFireFox="";  
    if(document.all){  
        noSelectForIE="onselectstart='return false;'";  
    }else{  
        noSelectForFireFox="-moz-user-select:none;";  
    }  
    var dateDiv="";  
    dateDiv += "<div id='calendardiv'  onclick='event.cancelBubble=true' " + noSelectForIE + " style='" + noSelectForFireFox + "position:absolute;z-index:99999;visibility:hidden;border:1px solid #999999;width:174px;'>";
    dateDiv += "<table border='0' bgcolor='#E0E0E0' cellpadding='1' cellspacing='1' width='100%'  >";  
    dateDiv+="<tr>";  
    dateDiv+="<td><input type='button' id='PrevMonth' value='<' style='height:20px;width:20px;font-weight:bolder;' onclick='fPrevMonth()'>";  
    dateDiv+="</td><td><select id='tbSelYear' style='border:1px solid;' onchange='fUpdateCal($V(\"tbSelYear\"),$V(\"tbSelMonth\"))'>";  
    for(var i=startYear;i<endYear;i++){  
        dateDiv+="<option value='"+i+"'>"+i+strYear+"</option>";  
    }  
    dateDiv+="</select></td><td>";  
    dateDiv+="<select id='tbSelMonth' style='border:1px solid;' onchange='fUpdateCal($V(\"tbSelYear\"),$V(\"tbSelMonth\"))'>";  
    for(var i=0;i<12;i++){  
        dateDiv+="<option value='"+(i+1)+"'>"+gMonths[i]+"</option>";  
    }  
    dateDiv+="</select></td><td>";  
    dateDiv+="<input type='button' id='NextMonth' value='>' style='height:20px;width:20px;font-weight:bolder;' onclick='fNextMonth()'>";  
    dateDiv+="</td>";dateDiv+="</tr><tr>";  
    dateDiv+="<td align='center' colspan='4'>";  
    dateDiv+="<div style='background-color:#cccccc'><table width='100%' border='0' cellpadding='3' cellspacing='1'>";  
    dateDiv+=fDrawCal(giYear,giMonth,dayTdHeight,dayTdTextSize);  
    dateDiv+="</table></div>";  
    dateDiv+="</td>";  
    dateDiv+="</tr><tr><td align='center' colspan='4' nowrap>";  
    dateDiv+="<span onclick=\"clearDate();\" style=\"font-size:12px;cursor:pointer;\"  onmouseover='this.style.color=\""+gcMouseOver+"\"' onmouseout='this.style.color=\"#000000\"'>清空</span>      <span style='cursor:pointer; font-size:12px' onclick='fSetDate(giYear,giMonth,giDay)' onmouseover='this.style.color=\""+gcMouseOver+"\"' onmouseout='this.style.color=\"#000000\"'>"+strToday+":"+giYear+strYear+giMonth+strMonth+giDay+strDay+"</span>";  
    dateDiv+="</tr></tr>";  
    dateDiv+="</table><iframe style='position:absolute; left:0px;top:0px;width:174px;height:190px;z-index:-1;' frameborder='0'></iframe></div>";  
    return dateDiv;  
}  
with(document){onclick=fHideCalendar;write(getDateDiv());}  
  
  
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.42
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt){  
    var o = {   
        "M+" : this.getMonth()+1, //月份   
        "d+" : this.getDate(), //日   
        "h+" : this.getHours(), //小时   
        "m+" : this.getMinutes(), //分   
        "s+" : this.getSeconds(), //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S" : this.getMilliseconds() //毫秒   
    };   
    if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
        for(var k in o)   
            if(new RegExp("("+ k +")").test(fmt))   
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return fmt;

      
}
function getDateByTimeStr(timeStr) {
    var timeArr = timeStr.split(" ");
    var d = timeArr[0].split("-");
    return new Date(d[0], (d[1] - 1), d[2]);
}
//根据日期计算去星期几
function week(dtime) {
    var arys1 = new Array();
    arys1 = dtime.split('-');     //日期为输入日期，格式为 2013-3-10
    var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
    var week1 = String(ssdate.getDay()).replace("0", "日").replace("1", "一").replace("2", "二").replace("3", "三").replace("4", "四").replace("5", "五").replace("6", "六")//就是你要的星期几
    var week = "星期" + week1; //就是你要的星期几
    return week;
}

function findWeek2(openid) { //查询周订餐信息
    var tadate=currentDateStart;
    //alert(tadate);
    var tadatetwo= dateEnd;
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

function getOpenIdFromCookie(){
    //测试值
    //return "123"
    var cookieStr = decodeURIComponent(getCookie("wx_user_info"));
    if(cookieStr != null && cookieStr != "undefined" && cookieStr !=""){
        cookieStr = JSON.parse(cookieStr);
        return cookieStr.openid;
    }else{
        return "";
    }
}
//获取url后面参数的值
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURIComponent(r[2]);
    return null; //返回参数值
}
function getCookie(name){
    var strcookie = document.cookie;//获取cookie字符串
    var arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for ( var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name){
            return arr[1];
        }
    }
    return "";
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

//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate2() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;//date.getMonth()得到的月份从0开始
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

