package jspx.example.view;



import com.github.jspxnet.network.rpc.client.proxy.NettyRpcProxy;
import com.github.jspxnet.network.rpc.model.transfer.RequestTo;
import com.github.jspxnet.network.rpc.model.transfer.ResponseTo;
import com.github.jspxnet.txweb.result.RocResponse;
import com.github.jspxnet.txweb.support.ActionSupport;
import com.github.jspxnet.txweb.util.RequestUtil;
import com.github.jspxnet.utils.ObjectUtil;
import jspx.example.controller.SpringPersionInterface;

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

        //直接调用,无拦截
        SpringPersionInterface springPersionInterface = NettyRpcProxy.create(SpringPersionInterface.class, "demo/persion", requestTo,responseTo,null);
        RocResponse rocResponse = springPersionInterface.getRequestParam();
        put("value",ObjectUtil.toString(rocResponse));

        //action方式调用,有权限控制,会执行拦截器
        SpringPersionInterface springPersionInterface2 = NettyRpcProxy.create(SpringPersionInterface.class, "demo/persion/update", requestTo,responseTo,null);
        Object str = springPersionInterface2.update(1,3,"abc");

        put("actionParam",ObjectUtil.toString(str));

        return SUCCESS;
    }

}
