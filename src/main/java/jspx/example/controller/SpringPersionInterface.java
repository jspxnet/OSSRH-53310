package jspx.example.controller;

import com.github.jspxnet.txweb.annotation.Param;
import com.github.jspxnet.txweb.result.RocResponse;
import jspx.example.conf.Persion;
import jspx.example.pqo.DemoParamReq;
import java.io.Serializable;

/**
 * 这里是提供给远程分布式调用的接口
 *
 *
 *
 */
public interface SpringPersionInterface extends Serializable {

    Persion getPersion();

    RocResponse save() throws Exception;

    RocResponse update(@Param DemoParamReq demoParam);

    RocResponse validUpdate(@Param(min = 5, max = 10) int var1, @Param(min = 10, max = 20) int var3);

    RocResponse edit() throws Exception;
}
