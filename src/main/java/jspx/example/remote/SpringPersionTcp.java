package jspx.example.remote;

import com.github.jspxnet.sioc.annotation.RpcClient;
import com.github.jspxnet.txweb.enums.RpcProtocolEnumType;
import jspx.example.controller.SpringPersionInterface;
import jspx.example.env.DemoIoc;

/**
 * Created by jspx.net
 *
 * author: chenYuan
 * date: 2020/6/30 22:14
 *
 **/
@RpcClient(bind = SpringPersionInterface.class,namespace = DemoIoc.namespace, url = "/demo/persion/index",protocol = RpcProtocolEnumType.TCP)
public interface SpringPersionTcp extends SpringPersionInterface {


}
