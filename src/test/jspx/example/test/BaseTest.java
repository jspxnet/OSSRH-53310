package jspx.example.test;

import com.github.jspxnet.json.JSONArray;
import com.github.jspxnet.json.JSONObject;
import jspx.example.pqo.DemoParamReq;
import org.testng.annotations.Test;

/**
 * Created by jspx.net
 *
 * @author: chenYuan
 * @date: 2020/10/18 14:41
 * @description: jspbox
 **/
public class BaseTest {
    @Test
    public static void classToJson() throws Exception {
        JSONArray json =   new JSONArray(DemoParamReq.class);
        System.out.println(json.toString(4));
    }

    @Test
    public void testJson() throws Exception {
        String str = " {\"request\": null,\"data\": null,\"action\": \"get_route\",\"id\": \"2xaysamd1gmtx638oyrw9gem\",\"type\": \"json\"}";
        JSONObject json = new JSONObject(str);
        System.out.println(json);
        System.out.println(json.toString(4));
    }
}
