/*
 * Copyright © 2004-2014 chenYuan. All rights reserved.
 * @Website:wwww.jspx.net
 * @Mail:39793751@qq.com
 * @author: chenYuan , 陈原
 * @License: Jspx.net Framework Code is open source (LGPL)，Jspx.net Framework 使用LGPL 开源授权协议发布。
 * @jvm:jdk1.6+  x86/amd64
 *
 */
package jspx.example.view;


import com.github.jspxnet.sioc.annotation.Ref;
import com.github.jspxnet.txweb.annotation.Describe;
import com.github.jspxnet.txweb.annotation.Operate;
import com.github.jspxnet.txweb.annotation.Param;
import com.github.jspxnet.txweb.result.RocResponse;
import com.github.jspxnet.txweb.support.ActionSupport;
import jspx.example.env.DemoIoc;
import jspx.example.remote.SpringPersionHttp;
import jspx.example.table.Employee;
import java.util.List;
import java.util.LinkedList;

/**
 * 演示例子 DemoAction 继承了DemoView,暴露DemoView给外部就可以了
 */
public class DemoView extends ActionSupport
{

    //分布式调用注入
    @Ref
    protected SpringPersionHttp springPersionHttp;

    //演示数据，实际使用的时候是数据库
    final private static List<Employee> LIST = new LinkedList<>();

    static
    {
        Employee ep = new Employee();
        ep.setName("xiaoMing");
        ep.setSex("男");
        ep.setOld(23);
        LIST.add(ep);

        ep = new Employee();
        ep.setName("xiaoHong");
        ep.setSex("女");
        ep.setOld(21);
        LIST.add(ep);

        for (int i = 0; i < 30; i++)
        {
            ep = new Employee();
            ep.setName("name-" + i);
            ep.setSex("女");
            ep.setOld(20 + i);
            LIST.add(ep);
        }

    }

    //-------------------
    @Operate(caption = "首页输出",post = false,method = "index")
    public String index()
    {
        return "简单的演示例子";
    }

    /**
     * 返回建议统一是用 RocResponse 对象封装
     * @return 数据列表,可以翻页
     */
    @Operate(caption = "列表",post = false,method = "list")
    public RocResponse<List<Employee>> getList()
    {
        return RocResponse.success(LIST).setCurrentPage(1).setTotalCount(LIST.size());
    }

    //下边的注释中文能够自动生成API文档
    @Operate(caption = "翻页列表",post = false,method = "list/page")
    @Describe(namespace = DemoIoc.namespace)
    public RocResponse<List<Employee>> getListPage( @Param(caption = "行数",min = 1,max = 40,value = "1") int count,
                                                    @Param(caption = "当前页数",min = 1,max = 1000,value = "10") int currentPage)
    {

        return RocResponse.success(LIST).setCount(count).setCurrentPage(currentPage).setTotalCount(LIST.size());
    }
}