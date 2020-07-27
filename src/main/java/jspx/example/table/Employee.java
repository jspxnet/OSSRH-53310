/*
 * Copyright © 2004-2014 chenYuan. All rights reserved.
 * @Website:wwww.jspx.net
 * @Mail:39793751@qq.com
 * @author: chenYuan , 陈原
 * @License: Jspx.net Framework Code is open source (LGPL)，Jspx.net Framework 使用LGPL 开源授权协议发布。
 * @jvm:jdk1.6+  x86/amd64
 *
 */
package jspx.example.table;

import com.github.jspxnet.sober.annotation.Column;
import com.github.jspxnet.sober.annotation.Id;
import com.github.jspxnet.sober.annotation.Table;
import com.github.jspxnet.utils.StringUtil;
import java.io.Serializable;

/**
 * Created by IntelliJ IDEA.
 * User: chenYuan
 * Date: 2009-8-11
 * Time: 11:09:18
 *
 */
@Table(name = "demo_employee")
public class Employee  implements Serializable {
    @Id
    @Column(caption = "姓名", notNull = true)
    private long id;


    @Column(caption = "姓名", length = 50, notNull = true)
    private String name = StringUtil.empty;

    @Column(caption = "性别", length = 4, option="男;女",notNull = true)
    private String sex = StringUtil.empty;

    @Column(caption = "年龄", option="1-150",notNull = true)
    private int old = 1;

/*    @Column(caption = "年龄",length = 50,option="1-150",notNull = true)
    private int[] nodeId = null;*/

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getSex()
    {
        return sex;
    }

    public void setSex(String sex)
    {
        this.sex = sex;
    }

    public int getOld() {
        return old;
    }

    public void setOld(int old) {
        this.old = old;
    }
/*
    public int[] getNodeId()
    {
        return nodeId;
    }

    public void setNodeId(int[] nodeId)
    {
        this.nodeId = nodeId;
    }*/
}