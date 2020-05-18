package jspx.example.controller;

import com.github.jspxnet.txweb.annotation.Operate;
import com.github.jspxnet.txweb.annotation.Param;
import com.github.jspxnet.txweb.annotation.Transaction;
import jspx.example.conf.Persion;
import jspx.example.dto.DemoDto;
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

    int save() throws Exception;

    DemoDto update(@Param DemoParamReq demoParam);

    int validUpdate(@Param(min = 5, max = 10) int var1, @Param(min = 10, max = 20) int var3);

    int tranSave() throws Exception;

    @Operate(caption = "演示事务")
    @Transaction(message = "保存异常")
    int tranSave2() throws Exception;

    int edit() throws Exception;
}
