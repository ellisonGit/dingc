package com.hnjca.wechat.util;

import java.security.MessageDigest;

public class DesUtil {
    public static void main(String[] args) {
        String string = "测试加密";
        System.out.println("原文:"+string);
        String fun1 = fun1(string);
        System.out.println("加密:" + fun1);
        //加密一次要解密两次
        String string2 = fun2(fun2(string));
        System.out.println("解密后:" + string2);
    }
    //MD5加密
    public static String fun1(String str) {
        if (str==null) {
            return null;
        }
        try {
            //获取MessageDigest对象
            MessageDigest md = MessageDigest.getInstance("MD5");
            char[] array = str.toCharArray();
            //将获取的char字符数组转换成byte型数组
            byte by[] = new byte[array.length];
            for (int i = 0; i < array.length; i++) {
                by[i] = (byte) array[i];
            }
            //获取密文，再将其转换成16进制的数
            byte mdByte[] = md.digest(by);
            StringBuffer mdvalue = new StringBuffer();

            for (int i = 0; i < mdByte.length; i++) {
                int val = ((int) mdByte[i] & 0xff);
                if (val < 16) {
                    mdvalue.append("0");
                }
                mdvalue.append(Integer.toHexString(val));
            }
            return mdvalue.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    //MD5解密
    public static String fun2(String str) {
        if (null == str) {
            return null;
        }
        char[] array = str.toCharArray();
        for (int i = 0; i < array.length; i++) {
            array[i] = (char) (array[i] ^ 't');
        }
        String res = new String(array);
        return res;
    }
}
