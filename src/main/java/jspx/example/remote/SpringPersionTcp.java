package jspx.example.remote;

import com.github.jspxnet.sioc.annotation.RpcClient;
import com.github.jspxnet.txweb.annotation.Param;
import com.github.jspxnet.txweb.enums.RpcProtocolEnumType;
import jspx.example.conf.Persion;
import jspx.example.controller.SpringPersionInterface;
import jspx.example.dto.DemoDto;
import jspx.example.env.DemoIoc;
import jspx.example.pqo.DemoParamReq;

import java.io.Serializable;

/**
 * Created by jspx.net
 *
 * author: chenYuan
 * date: 2020/6/30 22:14
 *
 **/
@RpcClient(bind = SpringPersionInterface.class,namespace = DemoIoc.namespace,protocol = RpcProtocolEnumType.TCP)
public interface SpringPersionTcp extends SpringPersionInterface {


}
