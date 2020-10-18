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
import com.github.jspxnet.sober.annotation.SqlMap;
import com.github.jspxnet.sober.jdbc.JdbcOperations;
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
    @SqlMap(namespace=DemoIoc.namespace)
    public <T> List<T> getTestList2(Map<String, Object> valueMap, int ipage, int icount, Class<T> cls)
    {
        valueMap.put("voteTopicTable",getTableName(VoteTopic.class));
        return null;
    }
    
    @Override
    @SqlMap(namespace=DemoIoc.namespace)
    public int getTestUpdate(Map<String,Object> valueMap)
    {
        valueMap.put("voteTopicTable",getTableName(VoteTopic.class));
        return 0;
    }


}