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


import com.github.jspxnet.io.AbstractRead;
import com.github.jspxnet.io.AutoReadTextFile;
import com.github.jspxnet.txweb.annotation.HttpMethod;
import com.github.jspxnet.txweb.support.ActionSupport;

/**
 * Created by IntelliJ IDEA.
 * User: chenYuan
 * Date: 2008-8-26
 * Time: 14:07:03
 * jspx.example.view.CodeView
 */
@HttpMethod(caption = "显示代码")
public class CodeView extends ActionSupport
{
    public CodeView()
    {

    }

    private String url;

    public String getUrl()
    {
        return url;
    }

    public void setUrl(String url)
    {
        this.url = url;
    }

    @Override
    public String execute() throws Exception
    {
        StringBuffer codeFile = new StringBuffer(getTemplatePath());
        codeFile.append(url);
        AbstractRead read = new AutoReadTextFile();
        read.setFile(codeFile.toString());
        put("code", read.getContent());
        return SUCCESS;
    }
}