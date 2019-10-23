package com.hnjca.wechat.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * Description:
 * User: Ellison
 * Date: 2019-10-08
 * Time: 9:59
 * Modified:
 */
public class testDemo {
    public static void main(String[] args){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String beginDate=sdf.format(new Date());//请求时间
        Date begin = new Date();
       String a= plusDay(6);
        System.out.println("增加天数以后的日期：" + a);
        JunitImage.testImage();
    }



    /**
     * 当前日期加上天数后的日期
     * @param num 为增加的天数
     * @return
     */
    public static String plusDay(int num){
        Date d = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        String currdate = format.format(d);
        System.out.println("现在的日期是：" + currdate);

        Calendar ca = Calendar.getInstance();
        ca.add(Calendar.DATE, num);// num为增加的天数，可以改变的
        d = ca.getTime();
        String enddate = format.format(d);
        System.out.println("增加天数以后的日期：" + enddate);
        return enddate;
    }


}
