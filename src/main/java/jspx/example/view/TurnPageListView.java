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
import com.github.jspxnet.txweb.annotation.Operate;
import com.github.jspxnet.txweb.annotation.Param;
import com.github.jspxnet.txweb.annotation.TurnPage;
import com.github.jspxnet.txweb.support.ActionSupport;
import com.github.jspxnet.utils.StringUtil;

import java.util.List;
import java.util.ArrayList;

/**
 * Created by IntelliJ IDEA.
 * User:chenYuan (mail:39793751@qq.com)
 * Date: 2007-8-5
 * Time: 2:04:08
 * 演示翻页
 */
@HttpMethod(caption="演示翻页")
public class TurnPageListView extends ActionSupport
{
    
    private static List<String> list = new ArrayList<String>();
    static
    {
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
        list.add("1");
        list.add("2");
        list.add("3");
        list.add("4");
        list.add("5");
        list.add("6");
        list.add("7");
        list.add("8");
        list.add("9");
    }

    public TurnPageListView()
    {

    }


    @Operate(caption = "数据库的查询列表")
    public List<String> getDataBaseList()
    {

        return list;
    }

    public int getCurrentPage()
    {
        return currentPage;
    }

    @Param(caption = "页数",min = 1)
    public void setCurrentPage(int currentPage)
    {
        this.currentPage = currentPage;
    }

    private int currentPage = 1;

    /**
     * 如果使用sober 查询数据库的话,sober 已经为为立完成了,页面计算
     *
     * @return
     */
    @Operate(caption = "列表")
    public List<String> getList()
    {
        if (currentPage <= 0) currentPage = 1;
        int ibegin = currentPage * getDefalutRows() - getDefalutRows();

        List<String> list = new ArrayList<String>();
        List<String> databaseList = getDataBaseList();
        for (int i = ibegin; i < ibegin + getDefalutRows() && i < databaseList.size(); i++)
        {
            list.add(databaseList.get(i));
        }
        return list;
    }

    @Operate(caption = "列表总数")
    public int getTotalCount()
    {
        return getDataBaseList().size();
    }

    @Operate(caption = "一页显示行数")
    public int getDefalutRows()
    {
        //时间使用的时候可以从配置文件中得到
        return 4;
    }

    @TurnPage(rows = "@defalutRows", enable = "true")
    private String turnPage = StringUtil.empty;
    //file=翻页模版(默认turnpage.ftl),params=翻页记录的参数多个使用分号隔开,totalCount=得到总行数的方法,rows=一页行数的方法,enable表示是否运行翻页处理
    //@表示从本方法中得到数据.
    public String getTurnPage()
    {
        return turnPage;
    }

}