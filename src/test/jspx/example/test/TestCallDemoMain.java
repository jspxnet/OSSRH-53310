package jspx.example.test;


import com.github.jspxnet.json.JSONArray;
import com.github.jspxnet.json.JSONObject;
import com.github.jspxnet.json.XML;
import com.github.jspxnet.network.http.HttpClient;
import com.github.jspxnet.network.http.HttpClientFactory;
import com.github.jspxnet.txweb.result.RocResponse;
import com.github.jspxnet.txweb.service.HessianClient;
import com.github.jspxnet.txweb.service.client.HessianClientFactory;
import com.github.jspxnet.util.TypeReference;
import jspx.example.conf.Persion;
import jspx.example.remote.SpringPersionInterface;
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


        String jsonStr =
                "        {\n" +
                "            \"id\": 2\n" +
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

    @Test
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
        String out = httpClient.post(new JSONObject());
       JSONObject json = new JSONObject(out);
        System.out.println(out);
        Assert.assertEquals(json.getString("data"), "ok");

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

    @Test
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
    @Test
    public void testHttpRocUpdate2() throws Exception {

        JSONObject json = new JSONObject();
        json.put("var1",3);
        json.put("var2",6);
        json.put("var3","");

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
        JSONObject json = new JSONObject();
        json.put("var1",3);
        json.put("var2",6);
        json.put("var3","my");

        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/update3.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        System.out.println(out);
        JSONObject jsonResult = new JSONObject(out);
        //计算 3+6
        Assert.assertEquals(jsonResult.getString("data"), "my9");
    }


    /*

    请求-不满足验证条件的参数:验证配置看，demo.validator.xml 看 <validator id="jspx.example.pqo.DemoParamReq">  部分

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
                "             \"name\": \"validParam1\",\n" +
                "             \"params\": {\"demoParam\":{ \"old\": 18, \"name\": \"小明同学\", \"sumOld\":3 },\"var2\":3,\"var3\":6}\n" +
                "         }\n" +
                "     }";
        JSONObject json = new JSONObject(jsonStr);
        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/validParam1.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        System.out.println(out);
    }

    @Test//(threadPoolSize = 10, invocationCount = 4)
    public void tesValidUpdate3() throws Exception {
        String jsonStr = "{\"demoParam\":{ \"sumOld\":3 ,\"old\":5},\"var2\":3,\"var3\":6}";
        JSONObject json = new JSONObject(jsonStr);
        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/validParam1.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        System.out.println(out);
        JSONObject jsonResult = new JSONObject(out);
        Assert.assertEquals(jsonResult.getString("message"), "DemoParamReq.name不能为空");
        Assert.assertEquals(jsonResult.getBoolean("success"), false);
    }


    @Test//(threadPoolSize = 10, invocationCount = 4)
    public void tesValidUpdate4() throws Exception {
        String jsonStr = "{\n" +
                "         \"method\": {\n" +
                "             \"name\": \"validParam1\",\n" +
                "             \"params\": {\"demoParam\":{ \"old\": 200, \"name\": \"小明同学\", \"sumOld\":3 },\"var2\":3,\"var3\":6}\n" +
                "         }\n" +
                "     }";
        JSONObject json = new JSONObject(jsonStr);
        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/validParam1.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        System.out.println(out);
        JSONObject jsonResult = new JSONObject(out);
        Assert.assertEquals(jsonResult.getString("message"), "年龄不在范围");
        Assert.assertEquals(jsonResult.getBoolean("success"), false);

    }

    @Test//(threadPoolSize = 10, invocationCount = 4)
    public void tesvalidParam() throws Exception {
        String jsonStr = "{\n" +
                "         \"method\": {\n" +
                "             \"name\": \"validParam1\",\n" +
                "             \"params\": {\"demoParam\":{ \"old\": 80, \"name\": \"小明同学\", \"sumOld\":3 },\"var3\":6}\n" +
                "         }\n" +
                "     }";
        JSONObject json = new JSONObject(jsonStr);
        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/validParam1.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        System.out.println(out);
         JSONObject jsonResult = new JSONObject(out);
        Assert.assertEquals(jsonResult.getString("message"), "年龄不在范围");
        Assert.assertEquals(jsonResult.getBoolean("success"), false);

    }

    @Test//(threadPoolSize = 10, invocationCount = 4)
    public void tesvalidParam2() throws Exception {
        String jsonStr = "{\"method\": {\n" +
                "    \"name\": \"validParamList\",\n" +
                "    \"params\": {\n" +
                "\t  \n" +
                "        \"param\": {\n" +
                "            \"old\": 10,\n" +
                "            \"name\": \"小明同学\",\n" +
                "            \"sumOld\": 3,\n" +
                "\t\t    req:{\n" +
                "\t\t\t  \"old\": 20,\n" +
            //    "\t\t\t  \"name\": \"小明同学\",\n" +
                "\t\t\t  \"sumOld\": 3\n" +
                "\t\t\t},\n" +
                "\t\t  list:[\n" +
                "\t\t  {\n" +
                "\t\t\t  \"old\": 30,\n" +
                "\t\t\t  \"name\": \"小明同学\",\n" +
                "\t\t\t  \"sumOld\": 3\n" +
                "\t\t\t}\n" +
                "\t\t  ]\n" +
                "        }\n" +
                "    }\n" +
                "}}";
        JSONObject json = new JSONObject(jsonStr);
        System.out.println("---调用json\r\n" + json.toString(4));
        String url = "http://127.0.0.1:8080/demo/persion/validParamList.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String out = httpClient.post(json);
        System.out.println(out);
        JSONObject jsonResult = new JSONObject(out);
        Assert.assertEquals(jsonResult.getString("message"), "姓名长度不正确");
        Assert.assertEquals(jsonResult.getBoolean("success"), false);
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
        SpringPersionInterface springPersionInterface = hessianClient.create(SpringPersionInterface.class, url,null);
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
        SpringPersionInterface springPersionInterface = hessianClient.create(SpringPersionInterface.class, url,null);
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
        String out = httpClient.post();
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
        try {
            SpringPersionInterface springPersionInterface = hessianClient.create(SpringPersionInterface.class, url,null);
            springPersionInterface.save();
        } catch (Exception e) {

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
        try {
            SpringPersionInterface springPersionInterface = hessianClient.create(SpringPersionInterface.class, url,null);
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
        System.out.println(out);
        Assert.assertEquals(httpClient.getStatusCode(), 404);

    }


    /**
     * 禁止重复提交
     */
    @Test
    public void repeatPost1() {
        String url = "http://127.0.0.1:8080/demo/persion/repeat/post.jhtml";
        //token
        HessianClient hessianClient = HessianClientFactory.getInstance();
        try {
            SpringPersionInterface springPersionInterface = hessianClient.create(SpringPersionInterface.class, url,null);
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

        System.out.println("1---------out=" + out);
         httpClient.post();

        out = httpClient.post();

        System.out.println("---------out=" + out);
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

    @Test
    public void testSomeParam() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/some/param.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String jsonStr = "{\"var1\":1,\"var3\":\"var3data\"}";
        JSONObject json = new JSONObject(jsonStr);

        String out = httpClient.post(json);
        System.out.println(out);

        JSONObject result = new JSONObject(out);
        Assert.assertEquals(result.getJSONObject("property").getInt("var1"), 1);
        Assert.assertEquals(result.getJSONObject("property").getString("var3"), "var3data");
        Assert.assertEquals(result.getJSONObject("property").getString("var2"), "love");


    }

    @Test
    public void testSomeParam1() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/some/param.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String jsonStr = "{\"var2\":\"1\",\"var3\":\"var3data\"}";
        JSONObject json = new JSONObject(jsonStr);

        String out = httpClient.post(json);
        System.out.println(out);
       // JSONObject result = new JSONObject(out);
     //   Assert.assertEquals(result.getString("message").contains("参数不合规,参数2"), true);

    }

    @Test
    public void testSomeParam2() throws Exception {
        String url = "http://127.0.0.1:8080/demo/persion/some/param.jhtml";
        HttpClient httpClient = HttpClientFactory.createRocHttpClient(url);
        String jsonStr = "{\"var1\":\"3\"}";
        JSONObject json = new JSONObject(jsonStr);

        String out = httpClient.post(json);
        JSONObject result = new JSONObject(out);
        Assert.assertEquals(result.getString("message").contains("var3参数不允许空"), true);
    }



    @Test
    public  void RocResponse() throws Exception {
        //todo
        RocResponse rocResponse1 = RocResponse.success(new ArrayList<>());
        JSONObject json = new JSONObject(rocResponse1);
        JSONArray array = json.getJSONArray("data");
        Assert.assertEquals(array.size(), 0);
        System.out.println("--------------SkinListView="+ new JSONObject(rocResponse1).toString());
        RocResponse rocResponse2 = RocResponse.success();
        JSONObject json2 = new JSONObject(rocResponse2);
        JSONArray array2 = json2.getJSONArray("data");
        System.out.println("--------------SkinListView="+ array2);
        Assert.assertEquals(array2, null);

        RocResponse rocResponse3 = RocResponse.success();
        rocResponse3.setCount(1);
        rocResponse3.setCurrentPage(2);
        JSONObject json3 = new JSONObject(rocResponse3);
        System.out.println("--------------SkinListView="+ json3.toString(4));
    }
}
