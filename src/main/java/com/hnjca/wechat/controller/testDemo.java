package com.hnjca.wechat.controller;


import org.apache.log4j.Logger;
import org.slf4j.LoggerFactory;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.FileNotFoundException;
import java.io.PrintStream;
import java.security.Key;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Description:
 * User: Ellison
 * Date: 2019-10-08
 * Time: 9:59
 * Modified:
 */
public class testDemo {
    private static final Logger logger = Logger.getLogger(testDemo.class);

        public static final String KEY_ALGORITHM = "RSA";
        private static final String PUBLIC_KEY = "RSAPublicKey";
        private static final String PRIVATE_KEY = "RSAPrivateKey";

        public static void main(String[] args) {
            Map<String, Object> keyMap;
            try {
                keyMap = initKey();
                String publicKey = getPublicKey(keyMap);
                String privateKey = getPrivateKey(keyMap);

                System.out.println("生成的公钥=>" + publicKey);
                System.out.println("生成的私钥=>" + privateKey);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        public static String getPublicKey(Map<String, Object> keyMap) throws Exception {
            Key key = (Key) keyMap.get(PUBLIC_KEY);
            return encryptBASE64(key.getEncoded());
        }

        public static String getPrivateKey(Map<String, Object> keyMap) throws Exception {
            Key key = (Key) keyMap.get(PRIVATE_KEY);
            return encryptBASE64(key.getEncoded());
        }

        public static String encryptBASE64(byte[] key) throws Exception {
            return (new BASE64Encoder()).encodeBuffer(key);
        }

        public static byte[] decryptBASE64(String key) throws Exception {
            return (new BASE64Decoder()).decodeBuffer(key);
        }

    public static Map<String, Object> initKey() throws Exception {
        KeyPairGenerator keyPairGen = KeyPairGenerator.getInstance(KEY_ALGORITHM);
        // 密钥位数
        keyPairGen.initialize(1024);
        KeyPair keyPair = keyPairGen.generateKeyPair();

        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();

        Map<String, Object> keyMap = new HashMap<>(4);
        keyMap.put(PUBLIC_KEY, publicKey);
        keyMap.put(PRIVATE_KEY, privateKey);

        return keyMap;
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

    public static void TestLog() {
            PrintStream old = System.out;
        PrintStream ps = null;
        try {
            ps = new PrintStream(System.getProperty("user.dir")+"/src/main/resources/log.text");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        System.setOut(ps);
            System.out.println("System.out.printlnfijadiofjoidjfoidjasfiojdaoifaijfo");

            System.out.println("hello");
        System.setOut(old);
    }


}
