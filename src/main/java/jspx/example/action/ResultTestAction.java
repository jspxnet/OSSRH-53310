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
import com.github.jspxnet.utils.DateUtil;
import com.github.jspxnet.utils.StringUtil;
import java.util.List;
import java.util.ArrayList;

/**
 * jspx.example.action.ResultTestAction
 * Created by IntelliJ IDEA.
 * User: chenYuan
 * Date: 2008-8-11
 * Time: 16:15:01
 *
 */
@HttpMethod(caption = "返回演示")
public class ResultTestAction extends ActionSupport {
    private String info = StringUtil.empty;
    public ResultTestAction() {
       
    }

    public List<String> getList() {
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

    /**
     * redirect 直接跳转到新的页面，不保留环境变量
     */
    @Operate(caption = "edit(编辑)")
    public void edit() {
        info = DateUtil.getDateTimeST() +" edit,点击编辑按钮";
    }

    /*
      注意，这里使用的是CHAIN 方式，将会保留环境变量 ，并且是使用 location 为模板显示
     */
    @Operate( caption = "save(保存)")
    public void save() {
        List<String> list = new ArrayList<String>();
        list.add("save");
        list.add("to");
        list.add("show");
        list.add("time");
        list.add("is");
        put("helloList", list);
        put("showDate", DateUtil.getDateTimeST());
        info = DateUtil.getDateTimeST() +" save,点击保存按钮";
    }

    public String getInfo() {
        return info;
    }

    @Override
    public String execute() throws Exception {
        put("helloList", getList());
        put("info", new String(info==null?"显示页面":""));
        return super.execute();
    }
}