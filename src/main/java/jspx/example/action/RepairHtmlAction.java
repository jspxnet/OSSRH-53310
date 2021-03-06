/*
 * Copyright © 2004-2014 chenYuan. All rights reserved.
 * @Website:wwww.jspx.net
 * @Mail:39793751@qq.com
 * @author: chenYuan , 陈原
 * @License: Jspx.net Framework Code is open source (LGPL)，Jspx.net Framework 使用LGPL 开源授权协议发布。
 * @jvm:jdk1.6+  x86/amd64
 *
 */
package jspx.example.action;

import com.github.jspxnet.txweb.annotation.HttpMethod;
import com.github.jspxnet.txweb.annotation.Operate;
import com.github.jspxnet.txweb.annotation.Param;
import com.github.jspxnet.txweb.result.RocResponse;
import com.github.jspxnet.txweb.support.ActionSupport;
import com.github.jspxnet.utils.HtmlUtil;

/**
 * Created by IntelliJ IDEA.
 * User: chenYuan
 * Date: 2008-8-28
 * Time: 16:27:51
 * 演示修复HTML
 */
@HttpMethod(caption = "演示修复HTML")
public class RepairHtmlAction extends ActionSupport
{

    public RepairHtmlAction()
    {

    }

    @Operate(caption = "修复html")
    public RocResponse<String> repair(@Param(caption = "需要修复的html",required = true,min = 1,max = 5000) String html ) throws Exception
    {
        return RocResponse.success(HtmlUtil.getSafeFilter(html),"操作成功");
    }
}