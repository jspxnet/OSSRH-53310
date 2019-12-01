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

import com.github.jspxnet.security.utils.EncryptUtil;
import com.github.jspxnet.txweb.annotation.HttpMethod;
import com.github.jspxnet.txweb.annotation.Operate;
import com.github.jspxnet.txweb.annotation.Validate;
import com.github.jspxnet.txweb.support.ActionSupport;
import jspx.example.table.BaseMan;

/**
 * Created by IntelliJ IDEA.
 * User:chenYuan (mail:39793751@qq.com)
 * Date: 2007-8-5
 * Time: 2:45:48
 */
@HttpMethod(caption = "演示提交结构")
public class TablePostAction extends ActionSupport
{

    public TablePostAction()
    {

    }

    //校验infoType为检查后保存到FieldInfo中的信息类型
    //dataTypeValidator为sioc配置  formId 为检验配置的ID,
    //提交表单中 post 不为空才运行校验

    @Validate(id="adduserForm")
    //提交表单中 post 不为空才运行 本方法
    @Operate(caption = "保存")
    public void save() throws Exception
    {
        if (hasFieldInfo()) return;
        //这里就得到了提交的信息,当然也可以使用webwork的方法
        BaseMan baseman = (BaseMan) getBean(BaseMan.class);
        if (baseman == null)
        {
            addFieldInfo("错误", "填写数据不满足要求");
            return;
        }
        //设置MD5加密密码
        baseman.setPassword(EncryptUtil.getMd5(baseman.getPassword()));

        //
        //memberDAO.save(baseman,maninfo)
        addActionMessage("保存成功");
    }


}