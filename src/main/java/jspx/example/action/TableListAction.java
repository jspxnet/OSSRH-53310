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

import com.github.jspxnet.txweb.annotation.Operate;
import com.github.jspxnet.utils.ArrayUtil;
import jspx.example.view.TableListView;
import jspx.example.table.Employee;
import java.util.List;
import java.util.LinkedList;

/**
 * Created by IntelliJ IDEA.
 * User: chenYuan
 * Date: 2009-9-5
 * Time: 23:34:24
 * 
 */
public class TableListAction extends TableListView
{
    public TableListAction()
    {
        
    }

    @Operate(caption ="删除")
    public void delete() throws Exception
    {
        String[] ids = getArray("id", true);
        List<Employee> list = getDatabase();
        for (Employee e:list)
        {
            if (ArrayUtil.inArray(ids,e.getName(),true))
            {
                 list.remove(e);
                 addActionMessage("成功删除:" + e.getName());
            }
        }
        setActionResult(MESSAGE);
    }

    @Operate(caption ="保存")
    public void save() throws Exception
    {
        Employee employee = getBean(Employee.class);
        LinkedList<Employee> list = (LinkedList<Employee>)getDatabase();
        list.add(0,employee);
        addActionMessage("保存成功:" + employee.getName());
    }

    @Operate(caption ="编辑")
    public void edit() throws Exception
    {

        String id = getString("id", true);
        if (id==null)
        {
            addFieldInfo("提示","参数错误|not  name");
            return;
        }
        Employee employee =  getBean(Employee.class);
        List<Employee> list = getDatabase();
       for (Employee e:list)
       {
           //这里只是演示，实际使用的时候，使用sql 或 sober hibnate 这些中间件，更新数据库就可以了
           if (id.equalsIgnoreCase(e.getName()))
           {
               e.setName(employee.getName());
               e.setSex(employee.getSex());
               e.setOld(employee.getOld());
               addActionMessage("成功编辑:" + e.getName());
           }
        }
    }

}