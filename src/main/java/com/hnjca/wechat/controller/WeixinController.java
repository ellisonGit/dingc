package com.hnjca.wechat.controller;

import com.alibaba.fastjson.JSON;
import com.hnjca.wechat.util.DateUtil;
import com.hnjca.wechat.util.MyConfig;
import com.hnjca.wechat.util.MyRequestUtil;
import com.hnjca.wechat.util.httpPostJson;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringEscapeUtils;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import static com.hnjca.wechat.util.Ascii.putPairsSequenceAndTogether;

/**
 * Description: weixin
 * User: Ellison
 * Date: 2019-10-1
 * Time: 08:43
 * Modified:
 */
@RestController
@RequestMapping(value = "/wx",produces = "application/json;charset=utf-8",method = RequestMethod.POST)
public class WeixinController {
    /**
     * bangding
     * @param
     * @throws
     */
    @GetMapping(value = "/banding")
    public String binding( String openid,String empno,String empname) {
        Map<String, String> signMap = new LinkedHashMap<String, String>();//定义map接收处理的数据
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String requestTimestamp=sdf.format(new Date());//请求时间
        signMap.put("openid",openid);
        signMap.put("empno",empno);
        signMap.put("empname",empname);
        signMap.put("requestTimestamp",requestTimestamp);
        String  asciiParam= putPairsSequenceAndTogether(signMap);//签名
        //System.out.println("sign"+asciiParam);//得到签名数据
        signMap.put("sign",asciiParam);
        // System.out.println("JSON:"+signMap);
        String  param= JSON.toJSONString(signMap);
        // System.out.println("json:"+param);
        String jsonString= StringEscapeUtils.unescapeJavaScript(param);
        System.out.println("jsonString:"+jsonString);
        String url = MyConfig.ICARD_URL +"/empBind.action";
        String result = httpPostJson.doPost(url,jsonString);
        System.out.println("结果："+result);
        return result;
    }


    /**
     *  验证是否绑定
     * @param openid
     * @throws
     */
    @GetMapping(value = "/validateBind")
    public String validateBind( String openid)  {
        //JSONObject jsonObject  = JSONObject.fromObject(paraData);
      //  String openid = jsonObject.get("openid").toString();
      //  System.out.println("用户标识："+openid);

        Map<String, String> signMap = new LinkedHashMap<String, String>();//定义map接收处理的数据
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String requestTimestamp=sdf.format(new Date());//请求时间
        System.out.println("请求时间："+requestTimestamp);

        signMap.put("openid",openid);
        signMap.put("requestTimestamp",requestTimestamp);
        String  asciiParam= putPairsSequenceAndTogether(signMap);//签名
        System.out.println("sign"+asciiParam);//得到签名数据
        signMap.put("sign",asciiParam);

        System.out.println("JSON:"+signMap);
        String  param= JSON.toJSONString(signMap);
        System.out.println("json:"+param);
        String jsonString= StringEscapeUtils.unescapeJavaScript(param);
        System.out.println("jsonString:"+jsonString);
        String url = MyConfig.ICARD_URL +"/validateBind.action";
        String result= httpPostJson.doPost(url,jsonString);
        System.out.println("结果："+result);

        return result;
    }




}
