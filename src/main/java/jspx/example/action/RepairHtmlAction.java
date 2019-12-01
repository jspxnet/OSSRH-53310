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
    private String html;
    private String repairHtml;

    public RepairHtmlAction()
    {

    }

    public void setHtml(String html)
    {
        this.html = html;
    }

    public String getHtml()
    {
        return html;
    }

    public String getRepairHtml()
    {
        return repairHtml;
    }
    
    @Operate(caption = "修复html")
    public void repair() throws Exception {
        repairHtml = HtmlUtil.getSafeFilter(html);
    }

    public String execute() throws Exception
    {
        put("repairHtml", repairHtml);
        return SUCCESS;
    }
}