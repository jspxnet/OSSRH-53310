package jspx.example.test;

import com.github.jspxnet.boot.EnvFactory;
import com.github.jspxnet.boot.JspxNetApplication;
import com.github.jspxnet.cache.redis.RedissonClientConfig;
import com.github.jspxnet.sioc.BeanFactory;
import com.github.jspxnet.utils.*;
import jspx.example.conf.Persion;
import jspx.example.remote.SpringPersionInterface;
import jspx.example.env.DemoIoc;
import jspx.example.remote.SpringPersionHttp;
import jspx.example.remote.SpringPersionTcp;
import org.redisson.api.RedissonClient;
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

    @Test
    static void testPersion() {

        BeanFactory beanFactory = EnvFactory.getBeanFactory();
        Persion persion = beanFactory.getBean(Persion.class,DemoIoc.namespace);

        System.out.println("------" + ObjectUtil.toString(persion));

    }

    @Test(threadPoolSize = 10, invocationCount = 10)
    static void testRedissonClient() {

        BeanFactory beanFactory = EnvFactory.getBeanFactory();
        RedissonClient redissonClient = (RedissonClient)beanFactory.getBean(RedissonClientConfig .class);
        System.out.println(redissonClient.hashCode()+"------redissonClient=" + redissonClient.hashCode());

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
