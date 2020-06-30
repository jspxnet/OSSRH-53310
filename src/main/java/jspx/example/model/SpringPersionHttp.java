package jspx.example.model;

import com.github.jspxnet.txweb.annotation.Param;
import com.github.jspxnet.sioc.annotation.RpcClient;
import jspx.example.conf.Persion;
import jspx.example.dto.DemoDto;
import jspx.example.pqo.DemoParamReq;

import java.io.Serializable;

/**
 * Created by jspx.net
 *
 * author: chenYuan
 * date: 2020/6/30 22:14
 *
 **/
@RpcClient("http://127.0.0.1:8080/demo/persion/index.jhtml")
public interface SpringPersionHttp extends Serializable {

    Persion getPersion();

    int save() throws Exception;

    DemoDto update(@Param DemoParamReq demoParam);

    int validUpdate(@Param(min = 5, max = 10) int var1, @Param(min = 10, max = 20) int var3);

    int tranSave() throws Exception;

    int tranSave2() throws Exception;

    int edit() throws Exception;
}
