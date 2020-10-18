/*
 * Copyright © 2004-2014 chenYuan. All rights reserved.
 * @Website:wwww.jspx.net
 * @Mail:39793751@qq.com
 * @author: chenYuan , 陈原
 * @License: Jspx.net Framework Code is open source (LGPL)，Jspx.net Framework 使用LGPL 开源授权协议发布。
 * @jvm:jdk1.6+  x86/amd64
 *
 */
package jspx.example.dao;

import com.github.jspxnet.sober.SoberSupport;
import com.github.jspxnet.sober.annotation.SqlMap;
import jspx.example.env.DemoIoc;

import java.util.List;
import java.util.Map;

/**
 * Created by IntelliJ IDEA.
 * User: chenYuan
 * Date: 2008-8-12
 * Time: 11:22:51
 *
 */
public interface AnonDemoDAO  extends SoberSupport
{
       List getTestList(Object[] parms,int ipage,int icount);

       //这里演示使用sql查询
       <T> List<T> getTestList2(Map<String, Object> valueMap, int ipage, int icount, Class<T> cls);

       int getTestUpdate(Map<String, Object> valueMap);
}