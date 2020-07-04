package jspx.example.test;

import com.github.jspxnet.boot.EnvFactory;
import com.github.jspxnet.boot.JspxNetApplication;
import com.github.jspxnet.network.rpc.client.NettyRpcProxy;
import com.github.jspxnet.sioc.BeanFactory;
import com.github.jspxnet.utils.*;
import jspx.example.conf.Persion;
import jspx.example.controller.SpringPersionInterface;
import jspx.example.env.DemoIoc;
import jspx.example.remote.SpringPersionHttp;
import jspx.example.remote.SpringPersionTcp;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.io.UnsupportedEncodingException;

/**
 * Created by jspx.net
 *
 * @author: chenYuan
 * @date: 2020/6/23 21:31
 * @description: jspx-framework
 **/
public class TestClient {
    @BeforeClass
    public static void init() {
        JspxNetApplication.autoRun();
        System.out.println("------------开始");
    }

    // @AfterClass
    public void afterExit() {
        System.out.println("------------结束");
    }

    /**
     * 代码方式直接调用RPC
     */
    @Test
    static void testClient() {
        SpringPersionInterface springPersionInterface = NettyRpcProxy.create(SpringPersionInterface.class, "demo", IpUtil.getSocketAddress("127.0.0.1:8991"));
        System.out.println(ObjectUtil.toString(springPersionInterface.getPersion()));
    }



    /**
     * 注释方式调用RPC, TCP方式
     * 注意看 SpringPersionTcp 中的 @RpcClient 配置
     */
    @Test
    static void testTcpClient()
    {
        BeanFactory beanFactory = EnvFactory.getBeanFactory();
        SpringPersionInterface springPersionTcp = beanFactory.getBean(SpringPersionTcp.class,DemoIoc.namespace);
        System.out.println("-----------springPersionTcp:" + springPersionTcp);
        Persion persion = springPersionTcp.getPersion();
        System.out.println("------" + ObjectUtil.toString(persion));
    }
    @Test
    static void testTcpMaxClient() throws UnsupportedEncodingException {
        BeanFactory beanFactory = EnvFactory.getBeanFactory();
        SpringPersionInterface springPersionTcp = beanFactory.getBean(SpringPersionTcp.class,DemoIoc.namespace);
        System.out.println("-----------springPersionTcp:" + springPersionTcp);
        Persion persion = springPersionTcp.getMaxPersion();
        System.out.println("------" + ObjectUtil.toString(persion));
    }
    /**
     * 注释方式调用RPC, http 方式
     * 注意看 SpringPersionHttp 中的 @RpcClient 配置
     */
    @Test
    static void testHttpClient()  {
        BeanFactory beanFactory = EnvFactory.getBeanFactory();
        SpringPersionInterface springPersionHttp = beanFactory.getBean(SpringPersionHttp.class,DemoIoc.namespace);
        Persion persion = springPersionHttp.getPersion();
        System.out.println("------" + ObjectUtil.toString(persion));
    }


}
