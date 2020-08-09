package jspx.example.test;


import com.github.jspxnet.json.JSONObject;
import com.github.jspxnet.json.XML;
import com.github.jspxnet.network.http.HttpClient;
import com.github.jspxnet.network.http.HttpClientFactory;
import com.github.jspxnet.txweb.result.RocException;
import com.github.jspxnet.txweb.result.RocResponse;
import com.github.jspxnet.txweb.service.HessianClient;
import com.github.jspxnet.txweb.service.client.HessianClientFactory;
import com.github.jspxnet.util.TypeReference;
import jspx.example.conf.Persion;
import jspx.example.controller.SpringPersionInterface;
import jspx.example.dto.DemoDto;
import jspx.example.pqo.DemoParamReq;
import jspx.example.table.Employee;
import jspx.example.table.VoteItem;
import jspx.example.table.VoteTopic;
import org.testng.Assert;
import org.testng.annotations.Test;
import java.util.ArrayList;
import java.util.List;

public class TestCallDemoMain {
    @Test
    public void testHttpPersionJSON() throws Exception {


        String jsonStr = "{\n" +
                "        \"params\":\n" +
                "        {\n" +
                "            \"id\": 2\n" +
                "        }\n" +
                "        };";
        JSONObject json = new JSONObject(jsonStr);
        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/get.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        System.out.println(out);
        JSONObject outJson = new JSONObject(out);
        Assert.assertEquals(outJson.getInt("age"), 18);
    }

    @Test(threadPoolSize = 4, invocationCount = 4)
    public void testHttpgetPathId() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/path.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post();
        System.out.println(out);
        JSONObject json = new JSONObject(out);
        Assert.assertEquals(json.getInt("age"), 18);

    }

    //路径作为参数
    @Test
    public void testHttpgetPathValue() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/pname/cy/2343.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post();
        System.out.println(out);
        JSONObject json = new JSONObject(out);
        JSONObject data = json.getJSONObject("data");
        Assert.assertEquals(data.getString("name"), "cy");
        Assert.assertEquals(data.getString("id"), "2343");
    }

    @Test
    public void testHttpgetPathValue2() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/pname/chenyuan/23243.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post();
        System.out.println(out);
        JSONObject json = new JSONObject(out);
        JSONObject data = json.getJSONObject("data");
        Assert.assertEquals(data.getString("name"), "chenyuan");
        Assert.assertEquals(data.getString("id"), "23243");
    }



    @Test(threadPoolSize = 4, invocationCount = 4)
    public void testAllPath() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/all/xyza/aab.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post();
        JSONObject json = new JSONObject(out);
        Assert.assertEquals(json.getString("data"), "ok");
        System.out.println(out);

    }


    @Test(threadPoolSize = 4, invocationCount = 4)
    public void testHttpPersionObject() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/getPersion.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post();
        System.out.println(out);
        JSONObject json = new JSONObject(out);
        JSONObject data = json.getJSONObject("data");
        Assert.assertEquals(data.getInt("age"), 18);

    }

    @Test(threadPoolSize = 4, invocationCount = 4)
    public void testHttpgetPersion2() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/persion2.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post();
        JSONObject json = new JSONObject(out);
        RocResponse<Persion> response = json.parseObject(new TypeReference<RocResponse<Persion>>() {
        });
        Persion persion = response.getData();
        Assert.assertEquals(persion.getAge().intValue(), 101);
        Assert.assertEquals(persion.getName(), "name");
    }

    @Test(threadPoolSize = 4, invocationCount = 4)
    public void testHttpRocPersion() throws Exception {

        String url = "http://127.0.0.1:8080/demo/persion/getRocPersion.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post();
        System.out.println(out);
        JSONObject json = new JSONObject(out);
        JSONObject data = json.getJSONObject("data");
        Assert.assertEquals(data.getString("name"), "张三");
        Assert.assertEquals(data.getInt("age"), 18);

    }

    /**
     * 故意的返回一个错误，错误里边讲话包含  code  和  error
     *
     * @throws Exception
     */
    @Test(threadPoolSize = 4, invocationCount = 4)
    public void testHttpgetRocError() throws Exception {
        String jsonStr = "{\n" +
                "             \"version\": \"3.0\",\n" +
                "        \"params\":\n" +
                "        {\n" +
                "            \"id\": 1\n" +
                "        }\n" +
                "        };";
        JSONObject json = new JSONObject(jsonStr);
        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/getRocError.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        JSONObject outJson = new JSONObject(out);

        Assert.assertEquals(outJson.getBoolean("success"), false);
        System.out.println(out);
    }

    /*
请求：
 {
    "method": {
        "name": "update",
        "params": [3,6,"小明同学"]
    }
 }

返回:
{
    "protocol": "jspx.net-roc",
    "data": "小明同学9",
    "success": 1,
    "version": "3.0"
}

实际场景中没必要，建议不用同名函数，因为看API会有点晕
     */
    @Test(threadPoolSize = 4, invocationCount = 4)
    public void testHttpRocUpdate() throws Exception {
        String jsonStr = " {\n" +
                "    \"method\": {\n" +
                "        \"name\": \"update\",\n" +
                "        \"params\": [3,6,\"小明同学\"]\n" +
                "    }\n" +
                " }";
        JSONObject json = new JSONObject(jsonStr);
        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/update.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        System.out.println(out);
        JSONObject outJson = new JSONObject(out);
        Assert.assertEquals(outJson.getBoolean("success"), true);
        Assert.assertEquals(outJson.getString("data"), "小明同学9");

    }

    /**
     * 调用:
     *
     * @throws Exception
     * @Operate(caption = "演示参数进入")
     * public RocResponse update(int var1,int var2)
     * {
     * //返回对象 DTO
     * return RocResponse.success(var1 + var2);
     * }
     */
    @Test(threadPoolSize = 4, invocationCount = 4)
    public void testHttpRocUpdate2() throws Exception {
        String jsonStr = "{\n" +
                "   \"method\": {\n" +
                "         \"name\": \"update\",\n" +
                "         \"params\":[3,6]\n" +
                "    }\n" +
                "}";
        JSONObject json = new JSONObject(jsonStr);
        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/update.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        System.out.println(out);
        JSONObject jsonResult = new JSONObject(out);
        //计算 3+6
        Assert.assertEquals(jsonResult.getInt("data"), 9);
    }


    @Test//(threadPoolSize = 10, invocationCount = 4)
    public void testHttpRocUpdate3() throws Exception {
        String jsonStr = "{\n" +
                "   \"method\": {\n" +
                "         \"name\": \"update\",\n" +
                "         \"params\":[3,6,'my']\n" +
                "    }\n" +
                "}";
        JSONObject json = new JSONObject(jsonStr);
        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/update.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        System.out.println(out);
        JSONObject jsonResult = new JSONObject(out);
        //计算 3+6
        Assert.assertEquals(jsonResult.getString("data"), "my9");
    }


    /*

    请求-不满足验证条件的参数:验证配置看，demo.validator.xml 看 <validator formId="jspx.example.pqo.DemoParamReq">  部分

    {
    "method": {
        "name": "validUpdate",
        "params": [0,3,6]
    },
    "params": {
    "old": 18,
    "name": "小明同学",
    "sumOld": 3
    }}

    返回:
    {
        "protocol": "jspx.net-remote",
        "code": -32602,
        "success": 0,
        "error": {"sumOld": "大小10-30错误"},
        "version": "3.0"
    }

   */
    @Test//(threadPoolSize = 10, invocationCount = 4)
    public void tesValidUpdate() throws Exception {
        String jsonStr = "{\n" +
                "         \"method\": {\n" +
                "             \"name\": \"validUpdate\",\n" +
                "             \"params\": {\"demoParam\":{ \"old\": 18, \"name\": \"小明同学\", \"sumOld\":3 },\"var2\":3,\"var3\":6}\n" +
                "         }\n" +
                "     }";
        JSONObject json = new JSONObject(jsonStr);
        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/validUpdate.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        System.out.println(out);
        JSONObject jsonResult = new JSONObject(out);

      //  Assert.assertEquals(jsonResult.getBoolean("success"), true);

    }

    /*

    注释限制值范围
    @Safety(min = 5,max = 10) int var1, @Safety(min = 10,max = 20)

    {
        "method": {
            "name": "validUpdate",
            "params": [5,30]
        }
   }
   */
    @Test(threadPoolSize = 4, invocationCount = 4)
    public void tesValidUpdate2() throws Exception {
        String jsonStr = "{\n" +
                "        \"method\": {\n" +
                "            \"name\": \"validUpdate\",\n" +
                "            \"params\": [5,30]\n" +
                "        }\n" +
                "   }";
        JSONObject json = new JSONObject(jsonStr);
        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/validUpdate.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        JSONObject jsonResult = new JSONObject(out);
        Assert.assertEquals(jsonResult.getBoolean("success"), false);
        System.out.println(out);

    }

    /**
     * 调用后演示测试 参数异常
     *
     * @throws Exception
     */
    @Test
    public void testMessage() throws Exception {

        String jsonStr = "{\n" +
                "        \"method\": {\n" +
                "            \"name\": \"testMessage\",\n" +
                "            \"params\": []\n" +
                "        }\n" +
                "   }";
        JSONObject json = new JSONObject(jsonStr);
        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/testMessage.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        System.out.println(out);
        JSONObject jsonResult = new JSONObject(out);
        Assert.assertEquals(jsonResult.getBoolean("success"), false);
        Assert.assertEquals(jsonResult.getString("message"), "参数不允许为空");
        System.out.println(out);
    }

    /**
     * 调用后演示测试 参数异常
     *
     * @throws Exception
     */
    @Test
    public void testMessage2() throws Exception {

        String jsonStr = "{\n" +
                "        \"method\": {\n" +
                "            \"name\": \"testMessage2\",\n" +
                "            \"params\": [\"11\"]\n" +
                "        }\n" +
                "   }";
        JSONObject json = new JSONObject(jsonStr);
        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/testMessage2.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        System.out.println(out);
        JSONObject jsonResult = new JSONObject(out);
        Assert.assertEquals(jsonResult.getInt("data"), 11);
        Assert.assertEquals(jsonResult.getBoolean("success"), true);

    }

    /**
     * 测试 RocResponse 的序列化转换到JSON
     */
    @Test//(threadPoolSize = 10, invocationCount = 4)
    public void testRocResponse() {

        Employee employee = new Employee();
        employee.setName("信息测试");
        employee.setSex("男");
        employee.setOld(40);
        JSONObject json = new JSONObject(RocResponse.success(employee));
        System.out.println(json.toString(4));
        Assert.assertEquals(json.getBoolean("success"), true);
    }


    /**
     * 测试 RocResponse 的序列化转换到JSON
     */
    @Test//(threadPoolSize = 10, invocationCount = 4)
    public void testRocResponse2() {

        VoteTopic voteTopic = new VoteTopic();
        voteTopic.setId(100);
        voteTopic.setNamespace("demo");
        voteTopic.setPutName("aaa");
        List<VoteItem> list = new ArrayList<VoteItem>();
        voteTopic.setVoteItemList(list);
        for (int i = 0; i < 10; i++) {
            VoteItem voteItem = new VoteItem();
            voteItem.setId(i + 1);
            voteItem.setTitle("测试数据" + i);
            voteItem.setTopicId(100);
            voteItem.setPutName("aaa");
            list.add(voteItem);
        }

        JSONObject json = new JSONObject(RocResponse.success(list));
        System.out.println(json.toString(4));

        //支持XML方式输出
        System.out.println(XML.toString(json, VoteTopic.class.getSimpleName()));
        Assert.assertEquals(json.getBoolean("success"), true);
    }

    /**
     * 测试使用远程协议调用接口,返回一个对象
     *
     * @throws Exception
     */
    @Test
    public void testHessianClientFactory() throws Exception {
        ///URL 是入口点 就可用，能够调用那些接口方式取决于 SpringPersionInterface.class 的提供
        String url = "http://127.0.0.1:8080/demo/persion/getPersion.jhtml";
        //这里

        HessianClient hessianClient = HessianClientFactory.getInstance();
        //token
        hessianClient.setToken("12345679xxxxxx");
        SpringPersionInterface springPersionInterface = hessianClient.getInterface(SpringPersionInterface.class, url);
        //简单的返回对象
        Persion persion = springPersionInterface.getPersion();
        JSONObject json = new JSONObject(persion);
        System.out.println(json.toString(4));
        Assert.assertEquals(persion.getName(), "张三");
    }

    /**
     * 测试使用远程协议调用接口，代参数
     *
     * @throws Exception
     */
    @Test
    public void testHessianClientFactory2() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/index.jhtml";
        //token
        HessianClient hessianClient = HessianClientFactory.getInstance();
        hessianClient.setToken("12345679xxxxxx99999999999999"); //认证token  Auth 2.0
        SpringPersionInterface springPersionInterface = hessianClient.getInterface(SpringPersionInterface.class, url);
        //简单的返回对象
        DemoParamReq demoParamReq = new DemoParamReq();
        demoParamReq.setName("中文");
        demoParamReq.setOld(10);
        demoParamReq.setSumOld(4);
        DemoDto demoDto = springPersionInterface.update(demoParamReq);

        Assert.assertEquals(demoDto.getName(), "中文");
        JSONObject json = new JSONObject(demoDto);
        System.out.println(json.toString(4));
    }


    /**
     * 演示通过标签实现事务 演示事务
     *
     * @throws Exception
     */
    @Test
    public void testsave1() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/save.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(new JSONObject());
        JSONObject json = new JSONObject(out);
        Assert.assertEquals(json.getString("message"), "保存异常");
        System.out.println(out);
    }

    @Test
    public void tranSave() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/tranSave.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(new JSONObject());
        System.out.println(out);
        JSONObject json = new JSONObject(out);
        Assert.assertEquals(json.getString("message"), "测试事务回滚");
        Assert.assertEquals(json.getBoolean("success"), false);

    }


    /**
     * 演示通过标签实现事务 演示事务,接口方式是否成功
     *
     * @throws Exception
     */
    @Test
    public void testsave2() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/save.jhtml";
        //token
        HessianClient hessianClient = HessianClientFactory.getInstance();
        hessianClient.setToken("12345679xxxxxx99999999999999"); //认证token  Auth 2.0

        try {
            SpringPersionInterface springPersionInterface = hessianClient.getInterface(SpringPersionInterface.class, url);
            springPersionInterface.save();
        } catch (RocException e) {
            Assert.assertEquals(e.getMessage(), "保存异常");
            e.printStackTrace();
        }

       // Assert.assertEquals(response!=0, true);

    }

    /**
     * 接口方式的 验证
     *
     * @throws Exception
     */
    @Test
    public void validUpdate() {
        String url = "http://127.0.0.1:8080/demo/persion/save.jhtml";
        //token
        HessianClient hessianClient = HessianClientFactory.getInstance();
        hessianClient.setToken("12345679xxxxxx99999999999999"); //认证token  Auth 2.0
        try {
            SpringPersionInterface springPersionInterface = hessianClient.getInterface(SpringPersionInterface.class, url);
            int response = springPersionInterface.validUpdate(8, 10);
            Assert.assertEquals(response, 18);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * 无连接测试
     * @throws Exception
     */
    @Test
    public void testnoLink() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/34253452345345.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(new JSONObject());
        Assert.assertEquals(httpClient.getStatusCode(), 404);
        System.out.println(out);
    }


    /**
     * 禁止重复提交
     */
    @Test
    public void repeatPost1() {
        String url = "http://127.0.0.1:8080/demo/persion/repeat/post.jhtml";
        //token
        HessianClient hessianClient = HessianClientFactory.getInstance();
        hessianClient.setToken("12345699999999999"); //认证token  Auth 2.0
        try {
            SpringPersionInterface springPersionInterface = hessianClient.getInterface(SpringPersionInterface.class, url);
            RocResponse response = springPersionInterface.getRepeatPost();
            Assert.assertEquals(response.getSuccess(), 1);
            Assert.assertEquals(response.getProperty("repeat"), 3);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void repeatPost2() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/repeat/post.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post();
        Assert.assertEquals(out.contains("张三"), true);

         httpClient.post();

        out = httpClient.post();
        System.out.println("3-------------"+out);
        JSONObject json = new JSONObject(out);
        Assert.assertEquals(json.getString("message"), "10秒后再试");
        Assert.assertEquals(json.getBoolean("success"), false);
    }


    @Test
    public void testException() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/test/exception.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post();

        JSONObject json = new JSONObject(out);
        Assert.assertEquals(json.getBoolean("success"), false);
        Assert.assertEquals(json.getString("message"), "测试显示异常");
    }

    @Test
    public void testException2() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/test/rocexception.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post();
        JSONObject json = new JSONObject(out);
        Assert.assertEquals(json.getBoolean("success"), false);
        Assert.assertEquals(json.getInt("code"), -100);

    }

}
