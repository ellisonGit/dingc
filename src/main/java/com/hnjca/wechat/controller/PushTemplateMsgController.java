package com.hnjca.wechat.controller;

import com.hnjca.wechat.enums.InfoEnum;
import com.hnjca.wechat.pojo.TemplateJson;
import com.hnjca.wechat.util.MyConfig;
import com.hnjca.wechat.util.TemplateMsgUtil;
import com.hnjca.wechat.vo.ResponseInfo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Description: 推送模板消息
 * User: Ellison
 * Date: 2019-09-28
 * Time: 15:21
 * Modified:
 */
@RestController
@RequestMapping(value = "/",produces = "application/json;charset=utf-8")
public class PushTemplateMsgController {

    /**
     * 推送订餐消息
     * @param openid
     * @return
     */
  /*  @GetMapping(value = "msgDingC")
    public ResponseInfo pushMsgDingC(String openid){

        if(openid == null || ("").equals(openid)){
            return new ResponseInfo(InfoEnum.NO_OPENID,-1);
        }

        TemplateJson templateJson = new TemplateJson();
        templateJson.setTouser(openid);
        templateJson.setTemplate_id("8dKVz7DNyN9X2wsXXY0uC6jywGtHZXHNURT09bSG8Ro");
        templateJson.setUrl(MyConfig.comUrl+"/dingcindex.html");
        templateJson.setDataFirstValue("您好，您的订餐成功！");
        templateJson.setDataKeyWord1Value("");
        templateJson.setDataKeyWord2Value("");
        templateJson.setDataKeyWord3Value("");
        templateJson.setDataKeyWord4Value("");
        templateJson.setDataRemarkValue("点击详情可查看更多信息");

        boolean result = TemplateMsgUtil.sendTemplateMsg(templateJson);
        if(result){
            return new ResponseInfo(InfoEnum.SUCCESS,"template message send success !");
        }else{
            return new ResponseInfo(InfoEnum.TEMPLATE_MSG_FAILED,"template message send failed !");
        }
    }
*/
    /**
     * 推送退餐的消息
     * @param openId
     * @param money
     * @param zdname
     * @param remainMoney
     * @param time
     * @return
     */
    @GetMapping(value = "msgTuiC")
    public ResponseInfo pushMsgTuiC(String openId,String name,String money,String zdname,String remainMoney,String time){

        if(openId == null || ("").equals(openId)){
            return new ResponseInfo(InfoEnum.NO_OPENID,-1);
        }

        if(name == null || ("").equals(name)){
            return new ResponseInfo(InfoEnum.NO_STUNAME,-1);
        }

        if(money == null || ("").equals(money)){
            return new ResponseInfo(InfoEnum.NO_MONEY,-1);
        }

        if(zdname == null || ("").equals(zdname)){
            return new ResponseInfo(InfoEnum.NO_REASON,-1);
        }

        if(remainMoney == null || ("").equals(remainMoney)){
            return new ResponseInfo(InfoEnum.NO_REMAIN_MONEY,-1);
        }

        if(time == null || ("").equals(time)){
            return new ResponseInfo(InfoEnum.NO_TIMESTR,-1);
        }

        TemplateJson templateJson = new TemplateJson();
        templateJson.setTouser(openId);
        templateJson.setTemplate_id("usuiSNnSjbVXr3eqcCYC81G0bXMSYG587gE1Ri6gv5U");
        templateJson.setUrl("http://www.130xxxx5088.com/test/info_1.html?t=2");
        templateJson.setDataFirstValue("您好，"+name+"的校园卡刚进行了一笔消费");
        templateJson.setDataKeyWord1Value(money);
        templateJson.setDataKeyWord2Value(zdname);
        templateJson.setDataKeyWord3Value(time);
        templateJson.setDataKeyWord4Value(remainMoney);
        templateJson.setDataRemarkValue("点击详情可查看更多信息");

        boolean result = TemplateMsgUtil.sendTemplateMsg(templateJson);
        if(result){
            return new ResponseInfo(InfoEnum.SUCCESS,"template message send success !");
        }else{
            return new ResponseInfo(InfoEnum.TEMPLATE_MSG_FAILED,"template message send failed !");
        }
    }


}
