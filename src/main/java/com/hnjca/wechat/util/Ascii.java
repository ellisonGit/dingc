package com.hnjca.wechat.util;

import org.apache.commons.codec.digest.DigestUtils;

import java.util.*;

/**
 * Description:
 * User: Ellison
 * Date: 2019-09-17
 * Time: 15:50
 * Modified:
 */
public class Ascii {
    public static String getSign(Map<String, String> map) {

        String result = "";
        try {
            List<Map.Entry<String, String>> infoIds = new ArrayList<Map.Entry<String, String>>(map.entrySet());
            // 对所有传入参数按照字段名的 ASCII 码从小到大排序（字典序）
            Collections.sort(infoIds, new Comparator<Map.Entry<String, String>>() {

                public int compare(Map.Entry<String, String> o1, Map.Entry<String, String> o2) {
                  //  System.out.println("输出key:"+ (o1.getKey()).toString().compareTo(o2.getKey()));
                    return (o1.getKey()).toString().compareTo(o2.getKey());

                }
            });

            // 构造签名键值对的格式
            StringBuilder sb = new StringBuilder();
            for (Map.Entry<String, String> item : infoIds) {
                if (item.getKey() != null || item.getKey() != "") {
                    String key = item.getKey();
                    String val = item.getValue();
                    if (!(val == "" || val == null)) {
                        sb.append(key + ":" + val + ":");
                    }
                }

            }
//			sb.append(PropertyManager.getProperty("SIGNKEY"));
            result = sb.toString();

            //进行MD5加密
            result = DigestUtils.md5Hex(result).toUpperCase();
        } catch (Exception e) {
            return null;
        }
        return result;
    }

    /**
     * 生成签名，根据字段名ascii码，从小大到大
     * @param info
     * @return
     */
    public static String putPairsSequenceAndTogether(Map<String, String> info) {
        List<Map.Entry<String, String>> infoIds = new ArrayList<Map.Entry<String, String>>(info.entrySet());
        Collections.sort(infoIds, new Comparator<Map.Entry<String, String>>() {
            @Override
            public int compare(Map.Entry<String, String> arg0, Map.Entry<String, String> arg1) {
                return (arg0.getKey()).compareTo(arg1.getKey());
            }
        });
        String ret = "";
        for (Map.Entry<String, String> entry : infoIds) {
            ret += entry.getKey();
            ret += "=";
            ret += entry.getValue();
            ret += "&";
        }
        String key="key=5f61d7f65b184d19a1e006bc9bfb6b2f";
        ret=ret+key;
        //System.out.println("ret:"+ret);
       // ret = ret.substring(0, ret.length() - 1);

       // System.out.println("ret222:"+ret);
        //进行MD5加密
      ret = DigestUtils.md5Hex(ret).toUpperCase();

        return ret;

    }

}
