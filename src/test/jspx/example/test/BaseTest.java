package jspx.example.test;

import com.github.jspxnet.json.JSONArray;
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
}
