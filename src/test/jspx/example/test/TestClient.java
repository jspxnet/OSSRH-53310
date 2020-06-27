package jspx.example.test;

import com.github.jspxnet.boot.JspxNetApplication;
import com.github.jspxnet.json.JSONArray;
import com.github.jspxnet.json.JSONObject;
import com.github.jspxnet.network.rpc.HelloService;
import com.github.jspxnet.network.rpc.client.NettyClient;
import com.github.jspxnet.network.rpc.client.NettyRpcProxy;
import com.github.jspxnet.network.rpc.env.MasterSocketAddress;
import com.github.jspxnet.network.rpc.env.RpcConfig;
import com.github.jspxnet.network.rpc.model.SendCommandFactory;
import com.github.jspxnet.network.rpc.model.cmd.INetCommand;
import com.github.jspxnet.network.rpc.model.cmd.SendCmd;
import com.github.jspxnet.network.rpc.model.route.RouteChannelManage;
import com.github.jspxnet.network.rpc.model.route.RouteSession;
import com.github.jspxnet.utils.*;
import io.netty.channel.Channel;
import jspx.example.controller.SpringPersionInterface;
import jspx.example.controller.impl.SpingPersionController;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.net.InetSocketAddress;
import java.net.SocketAddress;
import java.util.ArrayList;
import java.util.List;

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
            SocketAddress socketAddress = MasterSocketAddress.getInstance().getSocketAddress();

            SendCmd reply = client.send(socketAddress,command);
            System.out.println(ObjectUtil.toString(reply));
        }
        client.shutdown();
    }

    @Test
    static void testClient3() throws Exception {

        SocketAddress socketAddress = IpUtil.getSocketAddress("127.0.0.1:8992");
        List<SocketAddress> list = new ArrayList<>();
        list.add(socketAddress);

        NettyClient nettyClient =  new NettyClient();
        SendCmd cmd = SendCommandFactory.createCommand(INetCommand.REGISTER);
        cmd.setType(INetCommand.TYPE_JSON);
        cmd.setData(new JSONArray(list).toString());

        SendCmd reply = nettyClient.send(socketAddress,cmd);
        if (reply!=null&&INetCommand.TYPE_JSON.equals(reply.getType()))
        {
            String str = reply.getData();
            System.out.println("str----------" + str);
        }
        //把路由表自己保管起来
        Thread.sleep(RpcConfig.getInstance().getTimeout()* DateUtil.SECOND);
    }
    @Test
    static void getPid() throws Exception {
        System.out.println(SystemUtil.getPid());
    }
}
