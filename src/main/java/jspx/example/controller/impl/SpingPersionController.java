package jspx.example.controller.impl;


import com.github.jspxnet.boot.environment.Environment;
import com.github.jspxnet.enums.ErrorEnumType;
import com.github.jspxnet.json.JSONObject;
import com.github.jspxnet.sioc.annotation.Bean;
import com.github.jspxnet.sioc.annotation.Ref;
import com.github.jspxnet.sober.transaction.TransactionManager;
import com.github.jspxnet.txweb.annotation.*;
import com.github.jspxnet.txweb.result.RocException;
import com.github.jspxnet.txweb.result.RocResponse;
import com.github.jspxnet.txweb.support.ActionSupport;
import com.github.jspxnet.txweb.util.RequestUtil;
import com.github.jspxnet.utils.BeanUtil;
import com.github.jspxnet.utils.FileUtil;
import com.github.jspxnet.utils.ObjectUtil;
import com.github.jspxnet.utils.RandomUtil;
import jspx.example.conf.Persion;
import jspx.example.controller.SpringPersionInterface;
import jspx.example.dao.AnonDemoDAO;
import jspx.example.dao.IocDemoDAO;
import jspx.example.dto.DemoDto;
import jspx.example.env.DemoIoc;
import jspx.example.param.TestParam;
import jspx.example.pqo.DemoParamReq;
import jspx.example.pqo.ReDemoParamReq;
import jspx.example.table.Employee;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * 这里是采用spingboot方式调用配置的一个例子，和spring区别主要是可以用传统方式一样的调用使用
 * Bean bean的命名空间必须在 HttpMethod 之内,否则action会找不要ioc bean对象，
 * 因为构架内部是逻辑分离的，各个命名空间虽然可以相互调用，但程序内部注释方式，
 * 默认就在同一个命名空间下，命名空间有继承关系
 * <p>
 * <p>
 * ROC 调用协议头:
 * <p>
 * rocHeaders.put("Charset","UTF-8");
 * rocHeaders.put("Content-Type","application/json; charset=UTF-8");
 * rocHeaders.put("X-Requested-With","jspx.net-roc");
 * rocHeaders.put("accept","application/json");
 * <p>
 * 调用程序看 TestCallDemoMain
 * <p>
 * <p>
 * {
 * "id": "url文件名称(不是必须)",
 * "version": "3.0",
 * "method": {
 * "name": "调用的方法名称",
 * "params":{
 * //调用方法的参数, 例如:update(var1,var2)
 * }
 * },
 * "params": {
 * "参数1": 1,    //全局内的参数，相当于类的set方法
 * "参数2": 2
 * },
 * "result": ["list","currentPage","要返回的数据方法"]
 * }
 * <p>
 * <p>
 * 相当于配置
 * <action name="*" caption="sping方式"  class="jspx.example.controller.SpingPersionController" method="@" >
 * </action>
 *
 *重要说明:ROC调用方式都会采用 RocResponse 封装返回json格式,除非你返回的就是一个json格式,不会封装
 *
 */
@HttpMethod(caption = "sping方式", actionName = "*", namespace = DemoIoc.namespace + "/persion")
@Bean(namespace = DemoIoc.namespace)
public class SpingPersionController extends ActionSupport implements SpringPersionInterface
{
    public SpingPersionController() {

    }

    private Persion persion;
    @Ref(namespace = DemoIoc.namespace)
    public void setPersion(Persion persion) {
        this.persion = persion;
    }



    @Ref(namespace = DemoIoc.namespace)
    private IocDemoDAO iocDemoDAO;

    @Operate(caption = "默认入口", post = false)
    public String index()
    {
       System.out.println("index--------------------提供给远程的一个默认入口");
       return ("提供给远程的一个默认入口");
    }
    /*
    请求参数:
    {"params": {"id": 2}}

     这种方式如果返回的是一共JSON对象,那么系统不会进行封装，将按照你的返回输出
    返回:
    {
        "lastName": "",
        "isBoss": true,
        "lists": ["1","2","3"],
        "name": "张三",
        "birth": "2018-02-11 00:00:00",
        "publicKey": "演示标签注释方式载入",
        "age": 18
    }

    json 格式不会封装成RocResponse
   */
    @Operate(caption = "得到", post = false)
    public JSONObject get()
    {
        //System.out.println("--------------------id=" + getInt("id"));
        return new JSONObject(persion);
    }



    /**
     * 方法别名访问  http://127.0.0.1:8080/demo/persion/path.jhtml
     */
    @Operate(caption = "路径参数", method = "path", post = false)
    public JSONObject getPath() {
        return new JSONObject(persion);
    }


    @Operate(caption = "默认参数", method = "defvalue", post = false)
    public JSONObject getDefValue(@Param(caption = "默认参数89",value = "89") int intValue,@Param(caption = "默认参数abc",value = "abc") String strValue,
                                  @Param(caption = "默认数组",value = "[one,two,three]") String[] array)
    {
        JSONObject json = new JSONObject();
        json.put("intValue",intValue);
        json.put("strValue",strValue);
        json.put("array",array);
        return json;
    }


    /*
       路径作为参数
       直接访问地址 : http://127.0.0.1:8080/demo/persion/pname/cy/2343.jhtml
       返回:
        {
            "protocol": "jspx.net-remote",
                "data": {
                    "name": "cy",
                    "id": "2343"
                },
            "success": 1,
            "version": "3.0"
    }
   */
    @Operate(caption = "路径参数", method = "/pname/${name}/${id}", post = false)
    public RocResponse getPathValue(@PathVar(name = "name") String name, @PathVar(name = "id") String id)
    {
        JSONObject json = new JSONObject();
        json.put("name", name);
        json.put("id", id);
        return RocResponse.success(json);
    }


    /**
     * 变量名称直接对应
     * @param name
     * @param id
     * @return
     */
    @Operate(caption = "路径参数", method = "/pname/${name}/${id}", post = false)
    public RocResponse getPathValue2(@PathVar String name, @PathVar String id) {
        JSONObject json = new JSONObject();
        json.put("name", name);
        json.put("id", id);
        return RocResponse.success(json);
    }
    /**
     * 请求参数
     * {
     * "params": {"id": 2},
     * "version": "3.0"
     * }
     * <p>
     * 如果返回对象是 JSONObject,那么就直接得到json
     * 返回
     * {
     * "lastName": "",
     * "isBoss": true,
     * "lists": ["1","2","3"],
     * "name": "张三",
     * "birth": "2018-02-11 00:00:00",
     * "publicKey": "演示标签注释方式载入",
     * "age": 18
     * }
     */
    @Operate(caption = "删除")
    public JSONObject delete() {
        // getString() getInt() 等方法可以直接得到参数
        //System.out.println("--------------------id=" + getInt("id"));

        JSONObject json = new JSONObject();
        json.put(Environment.SUCCESS, 1);
        json.put(Environment.message, "删除Persion");
        return json;
    }

    /**
     * 请求：无参数,直接访问地址得到
     * http://127.0.0.1:8080/demo/persion/getPersion.jhtml
     * //但这里要注意,浏览器里边直接访问是不行的，如果直接访问将变为传统模式,需要模版文件支持
     * 必须使用ajax Roc 协议头调用
     * 返回：
     * {
     * "lastName": "",
     * "isBoss": true,
     * "lists": ["1","2","3"],
     * "name": "张三",
     * "birth": "2018-02-11 00:00:00",
     * "publicKey": "演示标签注释方式载入",
     * "age": 18
     * }
     *
     * @return Roc方式自动转换为json，传统模版方式显示对象也是json，模版内调用是对象
     */
    @Override
    @Operate(caption = "得到")
    public Persion getPersion()
    {
        System.out.println("---------------------run-----------getPersion:" + ObjectUtil.toString(persion));
        return persion;
    }

    @Operate(caption = "得到2",method = "/persion2")
    public RocResponse<Persion> getPersion2()
    {
        Persion persion = new Persion();
        persion.setAge(101);
        persion.setName("name");
        System.out.println("---------------------run-----------getPersion2");
        return RocResponse.success(persion);
    }

    @Operate(caption = "数组参数",method = "/dataarray")
    public RocResponse getArrayParam(@Param(caption = "数组参数") List<TestParam> list)
    {
        System.out.println("---------------------getArrayParam-----------list=" + list);
        for (TestParam p:list)
        {
            System.out.println("---------------------p=" + p);
        }
        return RocResponse.success(list);
    }


    @Operate(caption = "嵌套参数",method = "/childparam")
    public RocResponse getChildParam(@Param(caption = "数组参数") TestParam testParam)
    {
        System.out.println("---getChildParam------------------run-----------testParam type=" + testParam.getClass().getName());
        System.out.println("--------------------getChildParam=" + new JSONObject(testParam).toString());
        return RocResponse.success(testParam);
    }

    @Operate(caption = "通配符路径",method = "/all/*/aab")
    public RocResponse getAllPath()
    {
        System.out.println("---------------------getAllPath-----------");
        return RocResponse.success("ok");
    }

    /**
     * 注意协议请求头
     * 直接ROC请求地址："http://127.0.0.1:8080/demo/persion/getRocPersion.jhtml
     * <p>
     * 返回：
     * {
     * "protocol": "jspx.net-remote",
     * "code": 200,
     * "data": {
     * "lastName": "",
     * "isBoss": true,
     * "lists": ["1","2","3"],
     * "name": "张三",
     * "birth": "2018-02-11 00:00:00",
     * "publicKey": "演示标签注释方式载入",
     * "age": 18
     * },
     * "success": 1,
     * "message": "success",
     * "version": "3.0"
     * }
     *
     * @return 这种方式封装返回json数据, 是目前网上比较常用的封装方式
     */
    @Operate(caption = "得到")
    public RocResponse getRocPersion() {
        return RocResponse.success(persion);
    }

    @Operate(caption = "得到")
    public RocResponse getRocError() {
        return RocResponse.error(ErrorEnumType.PARAMETERS.getValue(), "故意的错误");
    }


    /**
     * 请求:
     * {"params": {
     * "old": 18,
     * "name": "小明同学",
     * "sumOld": 3
     * }}
     * <p>
     * <p>
     * 返回：（注意sum的来源）
     * {
     * "protocol": "jspx.net-remote",
     * "code": 200,
     * "data": {
     * "old": 18,
     * "name": "小明同学",
     * "sum": 21,
     * "sumOld": 3
     * },
     * "success": 1,
     * "message": "success",
     * "version": "3.0"
     * }
     * <p>
     * 这里演示 参数QO进入，和DTO 的返回
     *
     * @param demoParam
     * @return
     */
    @Override
    @Operate(caption = "演示对象参数")
    public DemoDto update(@Param DemoParamReq demoParam)
    {

        //接收到参数
        //这里加入自己的逻辑处理，或者封装在service中
        DemoDto demoDto = BeanUtil.copy(demoParam,DemoDto.class);
        //返回对象 DTO
        return demoDto;
    }


    /*

    请求:
    {"method": {
        "name": "update",
        "params": [3,6]
    }}

    返回:
    {
        "protocol": "jspx.net-remote",
        "code": 200,
        "data": 9,
        "success": 1,
        "message": "success",
        "version": "3.0"
    }

    注意这里使用了同名函数,生产环境种不推荐这样,特别是有多个 @Param 的同名函数,目前只识别一个同名，
    如果不是用 @Param 可以支持参数个数不同的同名函数。其实意义不大，因为 getInt('变量名') 方式就能得到
    */
    @Operate(caption = "演示参数进入")
    public int update(@Param(caption = "参数1") int var1, @Param(caption = "参数2") int var2) {
        //返回对象 DTO
        return (var1 + var2);
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
       "protocol": "jspx.net-remote",
       "data": "小明同学9",
       "success": 1,
       "version": "3.0"
   }

        实际场景中没必要，建议不用同名函数，因为看API会有点晕
        */
    @Override
    @Operate(caption = "演示多参数")
    public String update(@Param(caption = "参数1") int var1, @Param(caption = "参数2") int var2, @Param(caption = "参数3") String var3)
    {
        //返回对象 DTO
        return (var3 + (var1 + var2));
    }


    /**
     * 验证配置没有使用注释方式，因为那样后期不方便调整
     * 参数方式默认是类名作为 验证的formId DemoParamReq.class.getName()
     * 传统方式使用form 自定义的id作为验证id
     * <p>
     * 混合参数方式,  因为DemoParamReq 是一个组合参数，所以这里使用@占位，来对其参数
     * <p>
     {
         "method": {
             "name": "validUpdate",
             "params": {"demoParam":{ "old": 18, "name": "小明同学", "sumOld":3 },"var2":3,"var3":6}
         }
     }
     *
     * @param demoParam 对象参数
     * @return demoDto  返回对象会自动封装
     */
    @Operate(caption = "演示参数验证")
    public DemoDto validParam1(@Param(caption = "参数1",required = true) DemoParamReq demoParam, @Param(caption = "参数2",required = true,min = 1,max = 10,message = "var2不允许空") int var2, @Param(caption = "参数3") int var3) {
        //接收到参数
        //这里加入自己的逻辑处理，或者封装在service中
        DemoDto demoDto = BeanUtil.copy(demoParam,DemoDto.class);
        demoDto.setOld(demoDto.getOld() + var2);
        demoDto.setSumOld(demoDto.getSum() + var3);
        //返回对象 DTO
        return demoDto;
    }

    @Operate(caption = "演示参数验证")
    public DemoDto validParam(@Param(caption = "参数1",required = true) DemoParamReq demoParam, @Param(caption = "参数2",required = true,min = 1,max = 10) int var2, @Param(caption = "参数3",value = "20") int var3) {
        //接收到参数
        //这里加入自己的逻辑处理，或者封装在service中
        DemoDto demoDto = BeanUtil.copy(demoParam,DemoDto.class);
        demoDto.setOld(demoDto.getOld() + var2);
        demoDto.setSumOld(var3);
        //返回对象 DTO
        return demoDto;
    }


    @Operate(caption = "演示参数验证List")
    public ReDemoParamReq validParamList(@Param(caption = "参数1",required = true) ReDemoParamReq param)
    {
        return param;
    }
    @Operate(caption = "演示参数验证2")
    public DemoDto getObjectParam(@Param(caption = "参数1") DemoParamReq demoParam) {
        //接收到参数
        return BeanUtil.copy(demoParam,DemoDto.class);
    }
    /**
     * 请求 故意设置参数二不满足要求：
     * {"method": {
     * "name": "validUpdate",
     * "params": [5,30]
     * }}
     * 返回：
     * <p>
     * {
     * "protocol": "jspx.net-remote",
     * "code": -32602,
     * "success": 0,
     * "error": {"validUpdate": "The 2nd parameter is unsafe,参数不合规"},
     * "version": "3.0"
     * }
     * <p>
     * 2nd 表示第二个参数不合规
     * <p>
     * Safety 安全验证，如果不满足要求，将会提示
     *
     * @param var1 注释限制值范围 5-10之间
     * @param var3 注释限制值范围 10-20之间
     * @return 演示参数不正确将会提示
     */
    @Override
    @Operate(caption = "演示参数安全")
    public int validUpdate(@Param(min = 5, max = 10) int var1, @Param(min = 5, max = 20) int var3)
    {
        //接收到参数
        //这里加入自己的逻辑处理，或者封装在service中

        //返回对象 DTO
        return (var1 + var3);
    }


    @Describe(value = {"这里只是一个演示，DemoParamReq将通过请求封装参数",
            "并且通过转换保存在DTO种,通过RocResponse封装返回给用户",
            "测试是否可生成API文档"})
    @Operate(caption = "动作名称",method = "validatedemo")
    public DemoDto getDemoParam(@Validate @Param  DemoParamReq demoParam,@Param(min = 1,max = 20)  String text) {
        //接收到参数
        //这里加入自己的逻辑处理，或者封装在service中

        System.out.println(text+ "---------toString=" + ObjectUtil.toString(getFieldInfo()));
        DemoDto demoDto = BeanUtil.copy(demoParam,DemoDto.class);
        //返回对象 DTO

        return demoDto;
    }

    @Operate(caption = "演示参数验证消息")
    public String[] testMessage(@Param(caption = "参数1",required = true,message = "参数不允许为空") @Validate String[] array) {
        //返回对象 DTO
        return array;
    }

    //报错信息
    @Operate(caption = "演示参数验证消息")
    public String testMessage2(@Param(caption = "参数1",required = true,message = "参数不允许为空") @Validate String str) {
        //返回对象 DTO
        return str;
    }
    static int concur = 0;

    @Ref(namespace = DemoIoc.namespace)
    private AnonDemoDAO anonDemoDAO;

    /**
     * 默认事务将是用通一个连接,到事务结束
     * @return
     * @throws Exception
     */
    @Override
    @Operate(caption = "演示事务")
    //@Transaction(message = "保存异常")
    public int save() throws Exception
    {
        for (int i = 0; i < 4; i++)
        {

            Employee employee = new Employee();
            employee.setOld(concur++);
            employee.setName("中文" + i);
            anonDemoDAO.save(employee);
            System.out.println("TransactionManager="+TransactionManager.getInstance().toString());

            employee.setName("update" + i);
            iocDemoDAO.update(employee);
           if (i==3)
            {

                throw new RocException(RocResponse.error(111,"保存异常"));
            }
        }
        return 1;
    }

    /**
     *  Propagation.NEW 方式将自己创建一个连接完成事务
     * @return
     * @throws Exception
     */
    @Override
    @Operate(caption = "演示事务")
    @Transaction(message = "测试事务回滚")
    public int tranSave() throws Exception
    {
        Employee employee = new Employee();
        employee.setId(1);
        employee.setOld(concur++);
        employee.setName("中文");
        anonDemoDAO.save(employee);
        System.out.println("TransactionManager="+TransactionManager.getInstance().toString());
        employee.setId(1);
        anonDemoDAO.save(employee);
        return 1;
    }

    /**
     *  Propagation.NEW 方式将自己创建一个连接完成事务
     * @return
     * @throws Exception
     */
    static List<Employee> list = new ArrayList<>();
    @Override
    @Operate(caption = "演示事务")
    @Transaction(message = "保存异常")
    public int tranSave2() throws Exception
    {

        for (int i = 0; i < 4; i++)
        {

            Employee employee = new Employee();
            employee.setOld(concur++);
            employee.setName("中文" + i);
            anonDemoDAO.save(employee);
            list.add(employee);
        }
        for (Employee employee:list)
        {
            employee.setName("中文" + RandomUtil.getRandomGUID(8));
            anonDemoDAO.update(employee);
        }
        return 1;
    }

    @Override
    @Operate(caption = "演示事务")
    @Transaction(message = "edit异常")
    public int edit() throws Exception
    {
        List<Employee> list = anonDemoDAO.createCriteria(Employee.class).list(false);
        for (Employee employee:list)
        {
            employee.setName("edit");
            employee.setOld(concur++);
            iocDemoDAO.update(employee);
        }
        return 1;
    }


    @Operate(caption = "错误返回",method = "errorroc")
    public RocResponse errorRoc() throws Exception
    {
        throw new RocException(RocResponse.error(300,"错误直接返回"));
    }

    @Override
    @Operate(caption = "测试Request")
    public RocResponse getRequestParam()
    {
        RocResponse rocResponse = RocResponse.success("模拟httpRequest tcp调用").setProperty("token",RequestUtil.getToken(request));
        rocResponse.setProperty("test",getString("test"));
        return rocResponse;
    }



    @Override
    @Operate(caption = "测试大数据量")
    public Persion getMaxPersion() throws UnsupportedEncodingException {
        File f = new File("e:/test.txt");
        String txt = new String(FileUtil.readFileByte(f),"UTF-8");
        Persion persion = new Persion();
        persion.setName(txt);

        return persion;
    }

    @Override
    @Operate(caption = "10秒类禁止重复访问",post = false,repeat=10,method = "repeat/post")
    public RocResponse getRepeatPost()
    {
        RocResponse rocResponse = RocResponse.success(persion).setProperty("repeat",3);
        return rocResponse;
    }


    @Override
    @Operate(caption = "测试显示异常",post = false,method = "test/exception")
    public RocResponse getException() throws Exception {
        if (persion!=null)
        {
            throw  new Exception("测试显示异常");
        }
        return RocResponse.success(persion);
    }

    @Override
    @Operate(caption = "roc测试显示异常",post = false,method = "test/rocexception")
    public RocResponse getRocException() throws RocException {
        if (persion!=null)
        {
            throw  new RocException(RocResponse.error(-100,"roc测试显示异常"));
        }
        return RocResponse.success(persion);
    }

    @Override
    @Operate(caption = "缺省参数方式",method = "some/param")
    public RocResponse getSomeParam(@Param(caption = "参数1") int var1, @Param(caption = "参数2",min=2,max = 10,value = "love") String var2, @Param(caption = "参数3",required = true) String var3)
    {
        return RocResponse.success("缺省参数方式").setProperty("var1",var1).setProperty("var2",var2).setProperty("var3",var3);
    }

}