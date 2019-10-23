package com.hnjca.wechat.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Description:
 * User: Ellison
 * Date: 2019-04-08
 * Time: 14:18
 * Modified:
 */
public class DateUtil {


    public static String getMonthStr(){
        Calendar c = Calendar.getInstance();
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH)+1;
        String riqi = "";
        if(month >= 10){
            riqi = String.valueOf(year)+String.valueOf(month);
        }else{
            riqi = String.valueOf(year)+"0"+String.valueOf(month);
        }

        return riqi;
    }


    public static String dateToStr(Date date, String formatStr) {
        String str = "";
        SimpleDateFormat format = null;
        if (formatStr == null || "".equals(formatStr)) {
            format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        } else {
            format = new SimpleDateFormat(formatStr);
        }
        try {
            str = format.format(date);
        } catch (Exception e) {
            System.out.print(e.toString());
        }
        return str;
    }

    /**
     * 字符串转换成Date 类型
     *
     * @param str
     * @param formatStr
     * @return
     */
    public static Date strToDate(String str, String formatStr) {
        Date date = null;
        SimpleDateFormat format = null;
        if (formatStr == null || "".equals(formatStr)) {
            format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        } else {
            format = new SimpleDateFormat(formatStr);
        }
        try {
            date = format.parse(str);
        } catch (Exception e) {
            System.out.print(e.toString());
        }
        return date;
    }

    /**
     * 是否在今天之后
     *
     * @param dateStr
     * @return
     */
    public static Boolean isDateAfter(String dateStr) {
        try {
            Date date = strToDate(dateStr, "yyyy-MM-dd HH");
            Date nowDate = new Date();
            return nowDate.after(date);
        } catch (Exception e) {
            return false;
        }
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
      /*  System.out.println("现在的日期是：" + currdate);
*/
        Calendar ca = Calendar.getInstance();
        ca.add(Calendar.DATE, num);// num为增加的天数，可以改变的
        d = ca.getTime();
        String enddate = format.format(d);
      /*  System.out.println("增加天数以后的日期：" + enddate);*/
        return enddate;
    }


    public static void main(String[] args) {
        System.out.println(getMonthStr());
    }
}
