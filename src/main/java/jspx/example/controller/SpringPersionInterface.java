package jspx.example.controller;

import com.github.jspxnet.txweb.annotation.Operate;
import com.github.jspxnet.txweb.annotation.Param;
import com.github.jspxnet.txweb.result.RocResponse;
import jspx.example.conf.Persion;
import jspx.example.dto.DemoDto;
import jspx.example.pqo.DemoParamReq;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;

/**
 * 这里是提供给远程分布式调用的接口
 *
 * 在其他应用是用的时候添加如下标签
 * @RemoteHttp("http://127.0.0.1:8080/demo/persion/index.jhtml")
 * 将会会被注册在ioc 的 remote 命名空间
 *
 * @SpringPersionInterface springPersionInterface;
 * 这样就可以调用了,
*/
public interface SpringPersionInterface extends Serializable {

    Persion getPersion();

    int save() throws Exception;

    DemoDto update(@Param DemoParamReq demoParam);

    /*
   请求：
    {
       "method": {
           "name": "update",
           "params": [3,6,"小明同学"]
       }
    }

   返回:
   {
       "protocol": "jspx.net-remote",
       "data": "小明同学9",
       "success": 1,
       "version": "3.0"
   }

        实际场景中没必要，建议不用同名函数，因为看API会有点晕
        */
    @Operate(caption = "演示多参数")
    String update(@Param(caption = "参数1") int var1, @Param(caption = "参数2") int var2, @Param(caption = "参数3") String var3);

    int validUpdate(@Param(min = 5, max = 10) int var1, @Param(min = 10, max = 20) int var3);

    int tranSave() throws Exception;


    int tranSave2() throws Exception;

    int edit() throws Exception;


    RocResponse getRequestParam();

    @Operate(caption = "测试大数据量")
    Persion getMaxPersion() throws UnsupportedEncodingException;
}
