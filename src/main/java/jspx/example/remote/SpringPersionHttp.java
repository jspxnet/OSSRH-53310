package jspx.example.remote;

import com.github.jspxnet.sioc.annotation.RpcClient;
import com.github.jspxnet.txweb.enums.RpcProtocolEnumType;
import jspx.example.controller.SpringPersionInterface;


/**
 * Created by jspx.net
 *
 * author: chenYuan
 * date: 2020/6/30 22:14
 *
 **/
@RpcClient(bind = SpringPersionInterface.class, url = "jspx.example.conf.RemoteConfig@demo.remoteTestUrl",protocol = RpcProtocolEnumType.HTTP)
public interface SpringPersionHttp extends SpringPersionInterface {

}
