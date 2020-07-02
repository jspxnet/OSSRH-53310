package jspx.example.view;

import com.github.jspxnet.boot.EnvFactory;
import com.github.jspxnet.network.rpc.client.NettyRpcProxy;
import com.github.jspxnet.network.rpc.model.transfer.RequestTo;
import com.github.jspxnet.network.rpc.model.transfer.ResponseTo;
import com.github.jspxnet.sioc.BeanFactory;
import com.github.jspxnet.txweb.enums.WebOutEnumType;
import com.github.jspxnet.txweb.result.RocResponse;
import com.github.jspxnet.txweb.support.ActionSupport;
import com.github.jspxnet.txweb.util.RequestUtil;
import com.github.jspxnet.txweb.util.TXWebUtil;
import com.github.jspxnet.utils.ObjectUtil;
import jspx.example.conf.Persion;
import jspx.example.controller.SpringPersionInterface;
import jspx.example.env.DemoIoc;
import jspx.example.remote.SpringPersionTcp;

/**
 * Created by jspx.net
 *
 * @author: chenYuan
 * @date: 2020/7/2 22:58
 * @description: jspx-framework
 **/
public class RpcHelloWordView extends ActionSupport {
    /**
     * 一般有request 的接口是用,http方式用http方式调用,
     * 下边演示TCP方式 模拟request参数调用
     */
    @Override
    public String execute() throws Exception
    {
        RequestTo requestTo = new RequestTo(request);
        requestTo.put(RequestUtil.AUTHORIZATION_KEY,"测试的token.987342543534315342543");
        ResponseTo responseTo = new ResponseTo(response);

        System.out.println("requestTo------" + ObjectUtil.toString(requestTo));
        SpringPersionInterface springPersionInterface = NettyRpcProxy.create(SpringPersionInterface.class, "demo", requestTo,responseTo);
        RocResponse rocResponse = springPersionInterface.getRequestParam();
        System.out.println("RpcHelloWordView------" + ObjectUtil.toString(rocResponse));
        put("value",ObjectUtil.toString(rocResponse));
        //TXWebUtil.print(ObjectUtil.toString(rocResponse), WebOutEnumType.TEXT.getValue(),response);
        return SUCCESS;
    }

}
