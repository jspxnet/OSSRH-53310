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

/**
 * Created by IntelliJ IDEA.
 * User:chenYuan (mail:39793751@qq.com)
 * Date: 2007-8-5
 * Time: 0:31:14
 * jspx.example.view.HelloWordView
 */
@HttpMethod(caption = "简单的演示")
public class HelloWordView extends ActionSupport
{

    public HelloWordView()
    {

    }

}