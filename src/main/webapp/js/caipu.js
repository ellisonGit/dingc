var openid;

$(function () {
    openid = getOpenIdFromCookie();//获取openid
    if(openid==""){
        window.location.href=icardUrl+"/hnjca/auth?returnUrl="+icardUrl+"/banding.html";
    }
    findCaipu(openid);

});
function bt(){
    window.open ("asd.html", "newwindow", "height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
}


function findCaipu(openid) { //查询菜谱

    /*var tadate=$("#riqi").val();
    var tadatetwo=$("#riqitwo").val();
    var reg = /-| |:/g;
    var beginDate= tadate.replace(reg,'');
    var endDate=tadatetwo.replace(reg,'');*/
    $.ajax({
        type: "post",
        url: "/api/meal/selectMenuInfo",
        data: JSON.stringify({"beginDate":"20191022","endDate":"20191022","openid":openid}),
        dataType:"json",
        contentType: "application/json",
        async: true,
        success: function (data) {
           var list=data.data.length;
           var result=data.data;
           var val;
            for(var i=0;i < list;i++) {//循环星期几日期
                var data1 = result[i];
               val= data1.WEEK;
             var shijian=   updateDate(data1.DATE);
                $("#tableFor").append(
                    "   <li class=\"mui-table-view-cell mui-collapse\">" +
                    " <a class=\"mui-navigate-right\" href=\"#\">"+data1.WEEK+" &nbsp;&nbsp;&nbsp;<span>"+shijian+"</span></a>" +
                    " <div class=\"mui-collapse-content\">" +
                    "  <form id='"+"f"+ i +"' class=\"mui-input-group\">" );
                var Meals=data1.MEALS.length;
                var result2=data1.MEALS;
                        for(var j=0;j< Meals;j++) {//循环每日早中晚夜
                            var data2 = result2[j];
                            var menus = data2.MENUS.length;
                            talbeidf="#f"+i;

                            $(talbeidf).append(
                                "  <div  id='"+"c"+ j+"' class=\"mui-input-row\">" +
                                " <label >" + data2.MEAL_NAME + "</label>" );

                            for(var k=0;k< menus;k++) {//循环菜名

                                var data3=data2.MENUS[k];
                                tableidc="#c"+j
                                tablemax="#f"+i+" "+"#c"+j
                                var ur=data3.PIC_URL;
                                $(tablemax).append(
                                "   <label class='labelcan'  ><a href=\"javascript:showSign();\" onclick='tu(\""+data3.PIC_URL+"\")';>" + data3.DISH_NAME + "</a></label>   </div>" +
                                "  </div>  </form>\n" +
                                "                </div>\n" +
                                "            </li>");
                                $("#imageId").attr("src",data3.PIC_URL);
                            }
                        }


                // console.log(p);//   取得是key值
                //console.log(data[p]);//取得是value值
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