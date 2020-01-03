var openid;

$(function () {
    openid = getOpenIdFromCookie();//获取openid
    if(openid==""){
        //window.location.href=icardUrl+"/hnjca/auth?returnUrl="+icardUrl+"/banding.html";
        init();
    }
    finUserInfo(openid);
    findCaipu(openid);

});
function bt(){
    window.open ("asd.html", "newwindow", "height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
}


function findCaipu(openid) { //查询菜谱

    $.ajax({
        type: "post",
        url: "/api/meal/selectMenuInfoList",
        data: JSON.stringify({"openid":openid}),
        dataType:"json",
        contentType: "application/json",
        async: true,
        success: function (data) {
           var list=data.data.length;
           var result=data.data;
           var val;
           if(list>0){
               for(var j=0;j < list;j++) { //循环星期几日期
                   var data1 = result[j];
                   val= data1.WEEK;
                   var shijian=   updateDate(data1.M_DAY);
                   $("#tableFor").append(
                       "   <li class=\"mui-table-view-cell mui-collapse\">" +
                       " <a class=\"mui-navigate-right\" href=\"#\">"+data1.WEEK+" &nbsp;&nbsp;&nbsp;<span>"+shijian+"</span></a>" +
                       " <div class=\"mui-collapse-content\">" +
                       "  <form id='"+"f"+ j +"' class=\"mui-input-group\">" );
               }

                   for(var i=0;i < list;i++) { //循环星期几日期
                       var data1 = result[i];
                       talbeidf="#f"+i;
                       $(talbeidf).append(
                           "  <div  id='"+"c"+ i+"' class=\"mui-input-row\">" +
                           " <label class='labelCanBie' >早餐</label>" +
                           "<p></p>"+
                           " <label><a>&nbsp;&nbsp;"+data1.ZCAN+"</a></label>"+
                           "<p></p>"+
                           " <label class='labelQcck' >&nbsp;&nbsp;取餐窗口：</label>" +
                           " <label class='labelQcck' >"+data1.ZCAN_CK+"</label>"+
                           "<hr/>"+
                           "<p></p>"+
                           " <label class='labelCanBie' >中餐</label>" +
                           "<p></p>"+
                           " <label class='labelyue' >&nbsp;&nbsp;粤菜：</label>"+
                           " <label><a>"+data1.ZHCAN_Y+"</a></label>"+
                           "<p></p>"+
                           " <label class='labelQcck' >&nbsp;&nbsp;取餐窗口：</label>" +
                           " <label class='labelQcck' >"+data1.ZHCAN_Y_CK+"</label>"+
                           "<p></p>"+
                           " <label class='labelQxiang' >&nbsp;&nbsp;川湘菜：</label>"+
                           " <label><a>"+data1.ZHCAN_X+"</a></label>"+
                           "<p></p>"+
                           " <label class='labelQcck' >&nbsp;&nbsp;取餐窗口：</label>" +
                           " <label class='labelQcck' >"+data1.ZHCAN_X_CK+"</label>"+
                           "<hr/>"+
                           "<p></p>"+
                           " <label class='labelCanBie' >晚餐</label>" +
                           "<p></p>"+
                           " <label class='labelyue' >&nbsp;&nbsp;粤菜：</label>"+
                           " <label><a>"+data1.WCAN_Y+"</a></label>"+
                           "<p></p>"+
                           " <label class='labelQcck' >&nbsp;&nbsp;取餐窗口：</label>" +
                           " <label class='labelQcck' >"+data1.WCAN_Y_CK+"</label>"+
                           "<p></p>"+
                           " <label class='labelQxiang' >&nbsp;&nbsp;川湘菜：</label>"+
                           " <label><a>"+data1.WCAN_X+"</a></label>"+
                           "<p></p>"+
                           " <label class='labelQcck' >&nbsp;&nbsp;取餐窗口：</label>" +
                           " <label class='labelQcck' >"+data1.WCAN_X_CK+"</label>"+
                           "<hr/>"+
                           "<p></p>"+
                           " <label class='labelCanBie' >宵夜</label>" +
                           "<p></p>"+
                           " <label><a>&nbsp;&nbsp;"+data1.YXIAO+"</a></label>"+
                           "<p></p>"+
                           " <label class='labelQcck' >&nbsp;&nbsp;取餐窗口：</label>" +
                           " <label class='labelQcck' >"+data1.YXIAO_CK+"</label>"+

                           "  </div>  </form>\n"
                       );
                   }







           }else{
               $("#tableFor").append(
                   " <label > 暂无数据！</label>" );
           }

        }
    });
}

function tu(obj){
    $("#imageId").attr("src",obj);

}

//将日期yyyymmdd改为yyyy-mm-dd
function  updateDate(d) {
    var dd= d.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
    return dd;
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
                window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe91c161506160ef7&redirect_uri=http://pay.modernjj.com/ecard_weixin/binding&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";

            }


        }

    });
}