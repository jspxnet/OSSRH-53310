/*
 * Copyright © 2004-2014 chenYuan. All rights reserved.
 * @Website:wwww.jspx.net
 * @Mail:39793751@qq.com
 * @author: chenYuan , 陈原
 * @License: Jspx.net Framework Code is open source (LGPL)，Jspx.net Framework 使用LGPL 开源授权协议发布。
 * @jvm:jdk1.6+  x86/amd64
 *
 */
package jspx.example.dao.impl;

import com.github.jspxnet.sioc.annotation.Bean;
import com.github.jspxnet.sioc.annotation.Ref;
import com.github.jspxnet.sober.Criteria;
import com.github.jspxnet.sober.SoberFactory;
import com.github.jspxnet.sober.annotation.Query;
import com.github.jspxnet.sober.annotation.Update;
import com.github.jspxnet.sober.criteria.expression.Expression;
import com.github.jspxnet.sober.jdbc.JdbcOperations;
import com.github.jspxnet.utils.ArrayUtil;
import jspx.example.env.DemoIoc;
import jspx.example.table.VoteTopic;
import jspx.example.dao.AnonDemoDAO;
import java.util.List;
import java.util.Map;


/**
 * Created by IntelliJ IDEA.
 * User: chenYuan
 * Date: 2008-8-12
 * Time: 11:22:20
 * 特殊DAO例子
 */
@Bean(namespace = DemoIoc.namespace)
public class AnonDemoDAOImpl  extends JdbcOperations implements AnonDemoDAO
{
    public AnonDemoDAOImpl()
    {
        
    }

    @Ref(name = "jspxSoberFactory" ,namespace = DemoIoc.namespace)
    @Override
    public void setSoberFactory(SoberFactory soberFactory) {
        super.setSoberFactory(soberFactory);
    }


    @Override
    public List<VoteTopic> getTestList(Object[] parms,int ipage,int icount)
    {
        Criteria criteria = createCriteria(VoteTopic.class);
        return criteria.setCurrentPage(ipage).setTotalCount(icount).list(true);
    }


    //这里演示使用sql查询
    @Override
    @Query(id="getVoteTopic",namespace="jspx.apply.table.VoteTopic")
    public List getTestList2(Object[] parms,int ipage,int icount)
    {
        return null;
    }
    

    @Override
    @Update(entity= VoteTopic.class,sql="update ${table_name} set topicText=? where id=?")
    public int getTestUpdate(Object[] parms)
    {
        /*这里什么也不用写,因为这里的程序更本就不会执行,
          这里使用数组的方式传递参数        
        */
        return 0;
    }
    @Override
    @Update(entity= VoteTopic.class,sql="update ${table_name} set topicText='${topicText}' where ${primary_key}='${id}'")
    public int getTestUpdate2(Map<String,Object> valueMap)
    {
        /*这里使用map方式传递参数,使用Freemaker解析 */
        return 0;
    }

}