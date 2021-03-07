package jspx.example.action;

import com.github.jspxnet.sioc.annotation.Bean;
import com.github.jspxnet.txweb.annotation.Describe;
import com.github.jspxnet.txweb.annotation.HttpMethod;
import com.github.jspxnet.txweb.annotation.Operate;
import com.github.jspxnet.txweb.annotation.Param;
import com.github.jspxnet.txweb.result.RocResponse;
import com.github.jspxnet.utils.HtmlUtil;
import jspx.example.env.DemoIoc;
import jspx.example.view.DemoView;

/**
 * Created by jspx.net
 *
 * @author: chenYuan
 * @date: 2021/3/6 22:45
 * @description: jspx.example.action.DemoAction
 **/
@HttpMethod(caption = "演示例子", actionName = "*", namespace = DemoIoc.namespace + "/test")
@Bean(namespace = DemoIoc.namespace, singleton = true)
@Describe(namespace = DemoIoc.namespace)
public class DemoAction extends DemoView /* implements DemoInterface 继承后这里是分布式调用的接口 */ {
    @Operate(caption = "修复html")
    public RocResponse<String> repair(@Param(caption = "需要修复的html",required = true,min = 1,max = 5000) String html ) throws Exception
    {
        return RocResponse.success(HtmlUtil.getSafeFilter(html),"操作成功");
    }
}
