package com.hnjca.wechat.controller;
import com.alibaba.fastjson.JSON;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.hnjca.wechat.service.impl.WXAuthServiceImpl;
import com.hnjca.wechat.util.DateUtil;
import com.hnjca.wechat.util.MyConfig;
import com.hnjca.wechat.util.httpPostJson;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringEscapeUtils;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;
import static com.hnjca.wechat.util.Ascii.*;

/**
 * Description: 订餐
 * User: Ellison
 * Date: 2019-09-17
 * Time: 08:43
 * Modified:
 */
@RestController
@RequestMapping(value = "/meal",produces = "application/json;charset=utf-8",method = RequestMethod.POST)
public class DingcController {
   // private static Logger logger = Logger.getLogger(DingcController.class);
    /**
     * 订餐
     * @param paraData
     * @throws
     */
    @GetMapping(value = "/mealOrder")
    public String mealOrder(@RequestBody String paraData)  {
        JSONObject signMap = new JSONObject();
        JSONObject jsonObject  = JSONObject.fromObject(paraData);
        String beginDate = jsonObject.get("paraData").toString();
        JSONArray paramData = JSONArray.fromObject(beginDate);

        String openid= jsonObject.get("openid").toString();//微信openid
        String appId=MyConfig.APPID;//微信appId

        String thrOrderId = UUID.randomUUID().toString().replaceAll("-",""); //下单订单号
       // System.out.println("下单订单号："+thrOrderId);
        String tradeType=("1");//1:订餐，2:退餐
        //
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String requestTimestamp=sdf.format(new Date());//请求时间
        signMap.put("openid",openid);
        signMap.put("appId",appId);
        signMap.put("thrOrderId",thrOrderId);
        signMap.put("tradeType",tradeType);
        signMap.put("requestTimestamp",requestTimestamp);
        String  asciiParam= putPairsSequenceAndTogether(signMap);//签名
        //System.out.println("sign"+asciiParam);//得到签名数据
        signMap.put("sign",asciiParam);
        signMap.put("data",paramData);
        //System.out.println("JSON:"+signMap);
        String  jsonString= JSON.toJSONString(signMap);
       // System.out.println("jsonString:"+jsonString);
        String url = MyConfig.ICARD_URL +"/bookMeal.action";
       String result= httpPostJson.doPost(url,jsonString);

     //消息推送 开始
        JsonParser jp = new JsonParser();
        //将json字符串转化成json对象
        JsonObject jo = jp.parse(result).getAsJsonObject();
        //获取message对应的值
        String rcode = jo.get("rcode").getAsString();//获取返回代码是否成功1：成功。0：失败

        if("1".equals(rcode)){
            String requestTimest = jo.get("responseTimestamp").getAsString();//获取返回 时间
            String empname = jo.get("empname").getAsString();//获取返回 用户名
            String reg = "(\\d{4})(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})";
            String  requestTime = requestTimest.replaceAll(reg, "$1-$2-$3 $4:$5:$6");
            String info= WXAuthServiceImpl. pushMsgDingC(openid,empname,requestTime);//消息发送
            if(info=="SUCCESS"){
                System.out.println("msg结果："+result);
                return result;
            }else {
                System.out.println("failed结果："+result);
                return result;
            }

        }

        System.out.println("结果："+result);
        return result;
    }


    /**
     * 退餐
     * @param paraData
     * @throws
     */
    @GetMapping(value = "/tuiOrder")
    public String tuiOrder(@RequestBody String paraData)  {
        JSONObject signMap = new JSONObject();
        JSONObject jsonObject  = JSONObject.fromObject(paraData);
        String beginDate = jsonObject.get("paraData").toString();
        JSONArray paramData = JSONArray.fromObject(beginDate);
        //System.out.println("数组："+paramData);
        // Map<String, String> signMap = new LinkedHashMap<String, String>();//定义map接收处理的数据
        // Map<String, JSONArray> signMapList = new LinkedHashMap<>();//定义map JSONArray接收处理的数据
        //  signMapList.put("data",paramData);
        String openid= jsonObject.get("openid").toString();//微信openid
        String appId=MyConfig.APPID;//微信appId
        String thrOrderId = UUID.randomUUID().toString().replaceAll("-",""); //下单订单号
        //System.out.println("下单订单号："+thrOrderId);
        String tradeType=("2");//1:订餐，2:退餐
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String requestTimestamp=sdf.format(new Date());//请求时间
        //System.out.println("请求时间："+requestTimestamp);

        signMap.put("openid",openid);
        signMap.put("appId",appId);
        signMap.put("thrOrderId",thrOrderId);
        signMap.put("tradeType",tradeType);
        signMap.put("requestTimestamp",requestTimestamp);
        String  asciiParam= putPairsSequenceAndTogether(signMap);//签名
        //System.out.println("sign"+asciiParam);//得到签名数据
        signMap.put("sign",asciiParam);
        signMap.put("data",paramData);
      //  System.out.println("JSON:"+signMap);
        String  jsonString= JSON.toJSONString(signMap);

        String url = MyConfig.ICARD_URL +"/bookMeal.action";
        String result= httpPostJson.doPost(url,jsonString);

        //消息推送 开始
        JsonParser jp = new JsonParser();
        //将json字符串转化成json对象
        JsonObject jo = jp.parse(result).getAsJsonObject();
        //获取message对应的值
        String rcode = jo.get("rcode").getAsString();//获取返回代码是否成功1：成功。0：失败
        if(rcode.equals("1")){
            WXAuthServiceImpl. pushMsgTuiC(openid);//消息发送
        }
        System.out.println("退餐结果："+result);
        return result;
    }

    /**
     * 查询订餐
     * @param paraData
     * @throws
     */
    @GetMapping(value = "/selectmealOrder")
    public String selectmealOrder(@RequestBody String paraData)  {
        JSONObject jsonObject  = JSONObject.fromObject(paraData);
        String beginDate = jsonObject.get("beginDate").toString();
       // System.out.println("开始时间："+beginDate);
        String endDate = jsonObject.get("endDate").toString();
        //System.out.println("结束时间："+endDate);
        Map<String, String> signMap = new LinkedHashMap<String, String>();//定义map接收处理的数据
        String openid=jsonObject.get("openid").toString();//微信openid
        String appId=MyConfig.APPID;//微信appId
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String requestTimestamp=sdf.format(new Date());//请求时间
       // System.out.println("请求时间："+requestTimestamp);

        signMap.put("openid",openid);
        signMap.put("appId",appId);
        signMap.put("beginDate",beginDate);
        signMap.put("endDate",endDate);
        signMap.put("requestTimestamp",requestTimestamp);
        String  asciiParam= putPairsSequenceAndTogether(signMap);//签名
        //System.out.println("sign"+asciiParam);//得到签名数据
        signMap.put("sign",asciiParam);

       // System.out.println("JSON:"+signMap);
        String  jsonString= JSON.toJSONString(signMap);

       System.out.println("jsonString:"+jsonString);
        String url = MyConfig.ICARD_URL +"/queryBookMealByDate.action";
        String result= httpPostJson.doPost(url,jsonString);
        System.out.println("订餐结果："+result);

        //处理餐次[{20191010，早},{20191010，中},{20191010，晚},{20191010，夜},]改为{20191010，早中晚夜}
        JSONObject jObject  = JSONObject.fromObject(result);//将字符串转成json对象
        String data = jObject.get("data").toString();//获取data
        JSONArray json = JSONArray.fromObject(data);//将字符串转成json数组
        Map<String,String> map = new LinkedHashMap<String, String>();//定义map接收处理的数据
        for (Object object : json) {
            JSONObject jsonObj = (JSONObject) object;
            String riqi = (String)jsonObj.get("DATE");
            String num = String.valueOf(jsonObj.get("MEAL_ID"));
            if (map.containsKey(riqi)) {
                //todo 判断是否用餐
                String bookState=String.valueOf(jsonObj.get("BOOK_STATE"));//1:已定餐，2：已取餐:4：未订餐

                if(bookState.equals("1")||bookState.equals("2")){
                    String integer = map.get(riqi);
                    map.put(riqi, integer+"-"+num);//加-隔开
                }else {
                    String integer = map.get(riqi);
                    map.put(riqi, integer+","+num);//加,隔开
                }

            }else{
                map.put(riqi, num);
            }
        }
        System.out.println("map输出:"+map);

        return result;
    }

    /**
     * 查询 个人信息
     * @param
     * @throws
     */
    @GetMapping(value = "/selectUserInfo")
    public String selectUserInfo(@RequestBody String openid)  {
        Map<String, String> signMap = new LinkedHashMap<String, String>();//定义map接收处理的数据
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String requestTimestamp=sdf.format(new Date());//请求时间
        signMap.put("openid",openid);
        signMap.put("requestTimestamp",requestTimestamp);
        String  asciiParam= putPairsSequenceAndTogether(signMap);//签名
        signMap.put("sign",asciiParam);
        String  jsonString= JSON.toJSONString(signMap);
        String url = MyConfig.ICARD_URL +"/queryEcardInfo.action";
        String result= httpPostJson.doPost(url,jsonString);
        System.out.println("个人信息结果："+result);

        return result;
    }



    /**
     * 查询： 每周每天每餐的菜单
     * @param
     * @throws
     */
    @GetMapping(value = "/selectMenuInfo")
    public String selectMenuInfo( @RequestBody String paraData)  {
        Map<String, String> signMap = new LinkedHashMap<String, String>();//定义map接收处理的数据
        //String openid="o5hcr6K994hNS8U9z-ACua6y4q0c";//微信openid
        String appId=MyConfig.APPID;//微信appId
        JSONObject jsonObject  = JSONObject.fromObject(paraData);
        String openid = jsonObject.get("openid").toString();
        Date d = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        String beginDate = format.format(d);
        // System.out.println("开始时间："+beginDate);
        String endDate = DateUtil.plusDay(7);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String requestTimestamp=sdf.format(new Date());//请求时间
        System.out.println("请求时间："+requestTimestamp);
        signMap.put("openid",openid);
        signMap.put("appId",appId);
        signMap.put("beginDate",beginDate);
        signMap.put("endDate",endDate);
        signMap.put("requestTimestamp",requestTimestamp);
        String  asciiParam= putPairsSequenceAndTogether(signMap);//签名
        System.out.println("sign"+asciiParam);//得到签名数据
        signMap.put("sign",asciiParam);
        System.out.println("JSON:"+signMap);
        String  jsonString= JSON.toJSONString(signMap);
        System.out.println("jsonString:"+jsonString);
        String url = MyConfig.ICARD_URL +"/queryMenu.action";
        String result= httpPostJson.doPost(url,jsonString);
        System.out.println("菜单结果："+result);
        return result;
    }




    /**
     * 查询： 每天每餐的菜单列表
     * @param
     * @throws
     */
    @GetMapping(value = "/selectMenuInfoList")
    public String selectMenuInfoList( @RequestBody String paraData)  {
        Map<String, String> signMap = new LinkedHashMap<String, String>();//定义map接收处理的数据
        //String openid="o5hcr6K994hNS8U9z-ACua6y4q0c";//微信openid
        String appId=MyConfig.APPID;//微信appId
        JSONObject jsonObject  = JSONObject.fromObject(paraData);
        String openid = jsonObject.get("openid").toString();
        Date d = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        String beginDate = format.format(d);
        // System.out.println("开始时间："+beginDate);
        String endDate = DateUtil.plusDay(7);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String requestTimestamp=sdf.format(new Date());//请求时间
        System.out.println("请求时间："+requestTimestamp);
        signMap.put("openid",openid);
        signMap.put("appId",appId);
        signMap.put("beginDate",beginDate);
        signMap.put("endDate",endDate);
        signMap.put("requestTimestamp",requestTimestamp);
        String  asciiParam= putPairsSequenceAndTogether(signMap);//签名
        System.out.println("sign"+asciiParam);//得到签名数据
        signMap.put("sign",asciiParam);
        System.out.println("JSON:"+signMap);
        String  jsonString= JSON.toJSONString(signMap);
        System.out.println("jsonString:"+jsonString);
        String url = MyConfig.ICARD_URL +"/queryMenuList.action";
        String result= httpPostJson.doPost(url,jsonString);
        System.out.println("菜单结果："+result);
        return result;
    }





    /**
     * 查询订餐明细报表
     * @param paraData
     * @throws
     */
    @GetMapping(value = "/selectmealInfo")
    public  Map<String,String> selectmealInfo(@RequestBody String paraData)  {
        JSONObject jsonObject  = JSONObject.fromObject(paraData);
        String beginDate = jsonObject.get("beginDate").toString();
        String endDate = jsonObject.get("endDate").toString();
        Map<String, String> signMap = new LinkedHashMap<String, String>();//定义map接收处理的数据
        String openid=jsonObject.get("openid").toString();//微信openid
        String appId=MyConfig.APPID;//微信appId
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String requestTimestamp=sdf.format(new Date());//请求时间
        signMap.put("openid",openid);
        signMap.put("appId",appId);
        signMap.put("beginDate",beginDate);
        signMap.put("endDate",endDate);
        signMap.put("requestTimestamp",requestTimestamp);
        String  asciiParam= putPairsSequenceAndTogether(signMap);//签名
        signMap.put("sign",asciiParam);
        String  param= JSON.toJSONString(signMap);
        String jsonString= StringEscapeUtils.unescapeJavaScript(param);
        String url = MyConfig.ICARD_URL +"/queryBookMealByDate.action";
        String result= httpPostJson.doPost(url,jsonString);
        System.out.println("明细报表结果："+result);

        //处理餐次[{20191010，早},{20191010，中},{20191010，晚},{20191010，夜},]改为{20191010，早中晚夜}
        JSONObject jObject  = JSONObject.fromObject(result);//将字符串转成json对象
        String data = jObject.get("data").toString();//获取data
        JSONArray json = JSONArray.fromObject(data);//将字符串转成json数组
        Map<String,String> map = new LinkedHashMap<String, String>();//定义map接收处理的数据
        String shuzi="";
        for (Object object : json) {
            JSONObject jsonObj = (JSONObject) object;
            String DATE = (String)jsonObj.get("DATE");
            String  riqi = StringToDate(DATE);


            String num = String.valueOf(jsonObj.get("MEAL_ID"));
            String qunum = String.valueOf(jsonObj.get("MEAL_ID"));
            String BOOKID=String.valueOf(jsonObj.get("BOOKID"));
            String bookState=String.valueOf(jsonObj.get("BOOK_STATE"));//1:已定餐，2：已取餐:4：未订餐
            String integer = map.get(riqi);

            if (map.containsKey(riqi)) {
                //todo 判断是否用餐

                if(BOOKID!=null&&BOOKID!="null"||bookState.equals("2")){
                    if(integer==null){

                    }else{
                        if(bookState.equals("2")){
                            map.put(riqi, shuzi+",("+qunum+")");
                            shuzi+="("+qunum+")";
                        }else {
                            map.put(riqi, shuzi+","+num);
                            shuzi+=num;
                        }


                    }
                }

            }else{
                shuzi="";
                if(BOOKID!=null &&BOOKID!="null"||bookState.equals("2")){
                    if(BOOKID==null){
                        map.put(riqi, "("+qunum+")");
                    }
                    /*if(bookState.equals("2")&&BOOKID!=null){
                        map.put(riqi, num+"("+qunum+")");
                    }*/
                    if(bookState.equals("2")){
                        map.put(riqi, "("+qunum+")");
                        shuzi+="("+qunum+")";
                    }
                    else {
                        map.put(riqi, num);
                        shuzi+=num;
                    }

                }else {

                }
            }
        }
        System.out.println("map输出:"+map);

        return map;
    }

    /**
     * 查询订餐及用餐统计报表
     * @param paraData
     * @throws
     */
    @GetMapping(value = "/selectmealTongji")
    public String selectmealTongji(@RequestBody String paraData)  {
        JSONObject jsonObject  = JSONObject.fromObject(paraData);
        String beginDate = jsonObject.get("beginDate").toString();
        String endDate = jsonObject.get("endDate").toString();
        Map<String, String> signMap = new LinkedHashMap<String, String>();//定义map接收处理的数据
        String openid=jsonObject.get("openid").toString();//微信openid
        String appId=MyConfig.APPID;//微信appId
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String requestTimestamp=sdf.format(new Date());//请求时间
        signMap.put("openid",openid);
        signMap.put("appId",appId);
        signMap.put("beginDate",beginDate);
        signMap.put("endDate",endDate);
        signMap.put("requestTimestamp",requestTimestamp);
        String  asciiParam= putPairsSequenceAndTogether(signMap);//签名
        signMap.put("sign",asciiParam);
        String  param= JSON.toJSONString(signMap);
        String jsonString= StringEscapeUtils.unescapeJavaScript(param);
        String url = MyConfig.ICARD_URL +"/sumBookMealByDate.action";
        String result= httpPostJson.doPost(url,jsonString);
        System.out.println("统计报表结果："+result);
        return result;
    }


    private static String StringToDate(String str) {
        Date parse = null;
        String dateString = "";
        try {
            parse=new SimpleDateFormat("yyyyMMdd").parse(str);
            dateString = new SimpleDateFormat("yyyy-MM-dd").format(parse);
        } catch (ParseException e) {
            dateString=null;
        }
        return dateString;
    }

}
