package jspx.example.test;

import com.github.jspxnet.boot.JspxNetApplication;
import com.github.jspxnet.network.rpc.HelloService;
import com.github.jspxnet.network.rpc.client.NettyClient;
import com.github.jspxnet.network.rpc.client.NettyRpcProxy;
import com.github.jspxnet.network.rpc.env.MasterSocketAddress;
import com.github.jspxnet.network.rpc.model.SendCommandFactory;
import com.github.jspxnet.network.rpc.model.cmd.INetCommand;
import com.github.jspxnet.network.rpc.model.cmd.SendCmd;
import com.github.jspxnet.utils.ObjectUtil;
import com.github.jspxnet.utils.SystemUtil;
import io.netty.channel.Channel;
import jspx.example.controller.SpringPersionInterface;
import jspx.example.controller.impl.SpingPersionController;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.net.InetSocketAddress;
import java.net.SocketAddress;

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
    static void testClient()
    {
        SpringPersionInterface springPersionInterface = NettyRpcProxy.create(SpringPersionInterface.class,"demo");
        System.out.println(ObjectUtil.toString(springPersionInterface.getPersion()));
    }


    @Test
    static void testClient2() throws Exception {

        NettyClient client =  new NettyClient();
        for (int i=0;i<3;i++)
        {
            SendCmd command = SendCommandFactory.createCommand(INetCommand.PING);
            InetSocketAddress socketAddress = MasterSocketAddress.getInstance().getInetSocketAddress();

            SendCmd reply = client.send(socketAddress,command);
            System.out.println(ObjectUtil.toString(reply));
        }
        client.shutdown();
    }

    @Test
    static void getPid() throws Exception {
        System.out.println(SystemUtil.getPid());
    }
}
