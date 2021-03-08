package jspx.example.remote;

import com.github.jspxnet.sioc.annotation.RpcClient;
import com.github.jspxnet.txweb.enums.RpcProtocolEnumType;
import jspx.example.env.DemoIoc;

/**
 * Created by jspx.net
 *
 * author: chenYuan
 * date: 2020/6/30 22:14
 * 注入这个接口 Ref 后就可以远程调用了,确保ip可访问,
 *  /demo/persion/index 表示 可以访问到的一个调用方法, demo水果分布式的集群分组名称,也是系统的名称,入口点, SpringPersionInterface 里边就是可以调用的接口
 **/
@RpcClient(bind = SpringPersionTcp.class,namespace = DemoIoc.namespace, url = "/demo/persion/index",protocol = RpcProtocolEnumType.TCP)
public interface SpringPersionTcp extends SpringPersionInterface {


}
