package jspx.example.test;


import com.github.jspxnet.boot.EnvFactory;
import com.github.jspxnet.boot.JspxNetApplication;
import com.github.jspxnet.json.JSONArray;
import com.github.jspxnet.json.JSONObject;
import com.github.jspxnet.sioc.BeanFactory;
import com.github.jspxnet.sioc.tag.BeanModel;
import com.github.jspxnet.txweb.config.ActionConfig;
import com.github.jspxnet.txweb.config.TXWebConfigManager;
import com.github.jspxnet.utils.ClassUtil;
import com.github.jspxnet.utils.FileUtil;
import com.github.jspxnet.utils.ObjectUtil;
import jspx.example.conf.Persion;
import jspx.example.conf.SinglePersion;
import jspx.example.controller.SpringPersionInterface;
import jspx.example.controller.impl.SpingPersionController;
import jspx.example.dao.IocDemoDAO;
import jspx.example.env.DemoIoc;
import jspx.example.pqo.DemoParamReq;
import jspx.example.remote.SpringPersionTcp;
import jspx.example.table.Employee;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

public class TestDemoNg {
    static BeanFactory beanFactory = null;

    @BeforeClass
    public static void init() {
        JspxNetApplication.autoRun();
        System.out.println("------------开始");
        beanFactory = EnvFactory.getBeanFactory();
    }

    @AfterClass
    public static void afterExit() {
        System.out.println("------------结束");
    }

    @Test
    static void getEmployeeList()  {
        BeanFactory beanFactory = EnvFactory.getBeanFactory();
        IocDemoDAO iocDemoDAO = beanFactory.getBean(IocDemoDAO.class,DemoIoc.namespace);
        for(int i=1;i<=3;i++)
        {
            List<Employee>  list = iocDemoDAO.getEmployeeList(i,2);
            System.out.println("-----------第"+i+"页,size=" + list.size());
            for (Employee employee:list)
            {
                System.out.println(ObjectUtil.toString(employee));
            }
        }
    }


    @Test
    public static void testFilePath() throws IOException {

        File file = EnvFactory.getFile("ioc/definterceptor.xml");
        System.out.println("------------file=" + file);
    }

    @Test
    public static void testFilePath2() throws IOException {

        File file = EnvFactory.getFile("txweb/permission_roc.xml");
        System.out.println("------------file=" + file);
    }


    @Test
    public static void testFilePath3() throws IOException {

        File dir = new File("D:\\website\\webapps\\root\\WEB-INF\\template\\");
        File[] files = FileUtil.getPatternFiles(dir.getAbsolutePath(), "txweb/permission_roc.xml");
        for (File f:files)
            System.out.println("------------file=" + f);
    }



    @Test(threadPoolSize = 3)
    public static void testPropertySource()  {


        BeanModel beanModel = new BeanModel();
        beanModel.setSingleton(true);
        beanModel.setClassName(SinglePersion.class.getName());
        beanModel.setNamespace(DemoIoc.namespace);
        beanFactory.registerBean(beanModel);

        SinglePersion persion1 = beanFactory.getBean(SinglePersion.class,DemoIoc.namespace);
        System.out.println(beanFactory.hashCode()+"   " + persion1.hashCode()+"----------------result=" + new JSONObject(persion1));
        SinglePersion persion2 = beanFactory.getBean(SinglePersion.class,DemoIoc.namespace);
        System.out.println(beanFactory.hashCode()+"   " + persion2.hashCode()+"----------------result=" + new JSONObject(persion2));

        Assert.assertEquals(persion1.hashCode(),persion2.hashCode());


    }


    @Test(threadPoolSize = 3)
    public static void testCreateBean()  {

        BeanModel beanModel = new BeanModel();
        beanModel.setSingleton(false);
        beanModel.setId(Persion.class.getName());
        beanModel.setClassName(Persion.class.getName());
        beanFactory.registerBean(beanModel);

        Persion persion1 = (Persion)beanFactory.getBean(beanModel.getId());


        System.out.println(persion1.hashCode()+"----------------result=" + new JSONObject(persion1));
        Persion persion2 = (Persion)beanFactory.getBean(beanModel.getId());
        System.out.println(persion2.hashCode()+"----------------result=" + new JSONObject(persion2));
        Assert.assertEquals(persion1.hashCode()==persion2.hashCode(),false);
    }



    @Test
    public static void testActionInput2() throws Exception {
        //PersionController
        ActionConfig actionConfig = TXWebConfigManager.getInstance().getActionConfig("get","demo/persion",false);
        Assert.assertEquals(actionConfig.getClassName(), SpingPersionController.class.getName());
        System.out.println("---------------1-result=" + actionConfig.toString());
        Object obj = beanFactory.getBean(actionConfig.getClassName(),"demo/persion");
        System.out.println("---------------2-result=" + obj);
    }


    @Test
    public static void classToJson() throws Exception {
        JSONArray json =   new JSONArray(DemoParamReq.class);
        System.out.println(json.toString(4));
    }

    @Test
    public static void getimplements()  {
        System.out.println(ClassUtil.getImplements(DemoParamReq.class).getName());
    }
}