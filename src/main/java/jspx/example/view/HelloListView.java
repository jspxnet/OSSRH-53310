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


import com.github.jspxnet.txweb.annotation.HttpMethod;
import com.github.jspxnet.txweb.support.ActionSupport;

import java.util.List;
import java.util.ArrayList;

/**
 * Created by IntelliJ IDEA.
 * User:chenYuan (mail:39793751@qq.com)
 * Date: 2007-8-5
 * Time: 1:52:12
 * jspx.example.view.HelloListView
 */
@HttpMethod(caption = "list演示")
public class HelloListView extends ActionSupport
{
    private String value = "hello";
    public HelloListView()
    {

    }

    public String getValue()
    {
        return value;
    }

    public void setValue(String value)
    {
        this.value = value;
    }

    public List<String> getList()
    {
        List<String> list = new ArrayList<String>();
        list.add("one");
        list.add("two");
        list.add("three");
        list.add("four");
        list.add("five");
        list.add("six");
        list.add("seven");
        list.add("eight");
        list.add("nine");
        list.add("ten");
     
        return list;
    }

    @Override
    public String execute() throws Exception
    {
        put("HelloList", getList());
        return SUCCESS;
    }
}