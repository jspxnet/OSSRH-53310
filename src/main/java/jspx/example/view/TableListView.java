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
import com.github.jspxnet.txweb.support.ActionSupport;
import com.github.jspxnet.utils.StringUtil;
import jspx.example.table.Employee;
import java.util.List;
import java.util.ArrayList;
import java.util.LinkedList;

/**
 * Created by IntelliJ IDEA.
 * User: chenYuan
 * Date: 2009-8-11
 * Time: 11:05:36
 * jspx.example.action.TableListAction
 */
@HttpMethod(caption="表格列表")
public class TableListView extends ActionSupport
{
    final private static String sessionSave = "sessionSave";


    //演示数据，实际使用的时候是数据库
    private static List<Employee> list = new LinkedList<Employee>();

    static
    {
        Employee ep = new Employee();
        ep.setName("xiaoMing");
        ep.setSex("男");
        ep.setOld(23);
        list.add(ep);

        ep = new Employee();
        ep.setName("xiaoHong");
        ep.setSex("女");
        ep.setOld(21);
        list.add(ep);

        for (int i = 0; i < 30; i++)
        {
            ep = new Employee();
            ep.setName("name-" + i);
            ep.setSex("女");
            ep.setOld(20 + i);
            list.add(ep);
        }

    }

    private String sort = StringUtil.empty;

    public String getSort() {
        return sort;
    }

    @Param(caption = "排序",length = 20)
    public void setSort(String sort) {
        this.sort = sort;
    }

    private String name = StringUtil.empty;

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public Employee getEmployee()
    {
        List<Employee> list = getDatabase();
        for (Employee emp : list)
        {
            if (emp.getName().equalsIgnoreCase(name))
            {
                return emp;
            }
        }
        return new Employee();
    }

    public List<Employee> getDatabase()
    {
        Object object = session.getAttribute(sessionSave);
        if (object == null)
        {
            session.setAttribute(sessionSave, list);
        }
        return (List<Employee>) session.getAttribute(sessionSave);
    }


    //当前是要显示那页
    private int currentPage = 0;
    public int getCurrentPage()
    {
        return currentPage;
    }

    @Param(caption = "页数",min = 1)
    public void setCurrentPage(int currentPage)
    {
        this.currentPage = currentPage;
    }


    //根据上边的条件得到翻页标签里边相应的数据
    @Operate(caption = "列表")
    public List<Employee> getList()
    {
        //实际使用的时候，可以使用sober 或者 hibnate ,jdbc 查询后返回数据
        if (currentPage <= 0) currentPage = 1;
        int ibegin = currentPage * getCount() - getCount();
        List<Employee> resultList = new ArrayList<Employee>();
        List<Employee> list = getDatabase();
        for (int i = ibegin; i < ibegin + getCount() && i < list.size(); i++)
        {
            resultList.add(list.get(i));
        }
        return resultList;
    }

    @Operate(caption = "列表总数")
    public int getTotalCount() throws Exception
    {
        //翻页程序 会根据配置里边的 @totalCount 找到这个方法，得到总行数，用来计算翻页
        //实际使用的时候 这里使用数据库查询 ，如果并发比较大可以使用缓存
        List<Employee> list = getDatabase();
        return list.size();
    }

    public int getCount()
    {
         //一行显示几条数据
        //使用的时候可以从配置文件中得到
        return 8;
    }

}