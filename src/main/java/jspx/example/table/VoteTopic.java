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


import com.github.jspxnet.json.JsonIgnore;
import com.github.jspxnet.sober.annotation.Column;
import com.github.jspxnet.sober.annotation.Id;
import com.github.jspxnet.sober.annotation.Nexus;
import com.github.jspxnet.sober.annotation.Table;
import com.github.jspxnet.sober.enums.MappingType;
import com.github.jspxnet.sober.table.OperateTable;
import com.github.jspxnet.utils.DateUtil;
import com.github.jspxnet.utils.StringUtil;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;


/**
 * Created by IntelliJ IDEA.
 * User:chenYuan (mail:39793751@qq.com)
 * Date: 2006-2-28
 * Time: 17:02:40
 *
 */

@Table(name = "test_votetopic", caption = "投票")
public class VoteTopic extends OperateTable
{
    public VoteTopic()
    {

    }


    @Id
    @Column(caption="ID",notNull = true)
    private long id = 0;

    @Column(caption = "组ID", length = 50, notNull = false, defaultValue = "")
    private String groupId = StringUtil.empty;

    @Column(caption = "选项", length = 250, notNull = true, defaultValue = "")
    private String topicText = StringUtil.empty;

    @Column(caption = "类型", option = "0:单选;1:多选", notNull = true, defaultValue = "0")
    private int voteType = 0;

    //默认为空表示任意,更具后台设置判断多个使用 ;分割
    @Column(caption = "允许投票的角色", length = 250, notNull = true, defaultValue = "")
    private String roleIds = StringUtil.empty;

    @Column(caption = "表示图", option = "0:条型;1:柱状;2:饼型;4:线型", notNull = true, defaultValue = "0")
    private int shape = 0;

    @Column(caption = "重复投票", option = "0:否;1:是", notNull = true, defaultValue = "0")
    private int repeat = 0;

    @Column(caption = "一次投票次数" ,length = 4, notNull = true, defaultValue = "0")
    private int times = 0;

    @Column(caption = "投票结束时间", notNull = true)
    private Date endDate = DateUtil.addYear(2);

    @Column(caption = "排序时间", notNull = true)
    private Date sortDate = new Date();

    @Column(caption = "投票才能看结果",option = "0:否;1:是",length = 2,notNull = true, defaultValue = "0")
    private int pollLook = 0;

    @Column(caption = "排序", notNull = true, defaultValue = "0")
    private int sortType = 0;

    @JsonIgnore       //json不输出
    @Column(caption = "最后操作时间", notNull = true)
    private Date lastDate = new Date();

    @Nexus(mapping = MappingType.OneToMany, field = "id", targetField = "topicId", orderBy = "sortType:A", targetEntity = VoteItem.class,delete=true,update=true)
    private List<VoteItem> voteItemList = new LinkedList<VoteItem>();

    @Column(caption = "命名空间", length = 50, dataType="isLengthBetween(1,50)")
    public String namespace = StringUtil.empty;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTopicText()
    {
        return topicText;
    }

    public void setTopicText(String topicText)
    {
        this.topicText = topicText;
    }

    public int getVoteType()
    {
        return voteType;
    }

    public void setVoteType(int voteType)
    {
        this.voteType = voteType;
    }

    public String getRoleIds()
    {
        return roleIds;
    }

    public void setRoleIds(String roleIds)
    {
        this.roleIds = roleIds;
    }

    public int getRepeat()
    {
        return repeat;
    }

    public void setRepeat(int repeat)
    {
        this.repeat = repeat;
    }

    public int getShape()
    {
        return shape;
    }

    public void setShape(int shape)
    {
        this.shape = shape;
    }

    public int getTimes()
    {
        return times;
    }

    public void setTimes(int times)
    {
        this.times = times;
    }

    public String getNamespace()
    {
        return namespace;
    }

    public void setNamespace(String namespace)
    {
        this.namespace = namespace;
    }

    public Date getSortDate()
    {
        return sortDate;
    }

    public void setSortDate(Date sortDate)
    {
        this.sortDate = sortDate;
    }

    public int getSortType()
    {
        return sortType;
    }

    public void setSortType(int sortType)
    {
        this.sortType = sortType;
    }

    public Date getLastDate()
    {
        return lastDate;
    }

    public void setLastDate(Date lastDate)
    {
        this.lastDate = lastDate;
    }

    public String getGroupId()
    {
        return groupId;
    }

    public void setGroupId(String groupId)
    {
        this.groupId = groupId;
    }

    public Date getEndDate()
    {
        return endDate;
    }

    public void setEndDate(Date endDate)
    {
        this.endDate = endDate;
    }

    public List<VoteItem> getVoteItemList()
    {
        return voteItemList;
    }

    public void setVoteItemList(List<VoteItem> voteItemList)
    {
        this.voteItemList = voteItemList;
    }

    public int getPollLook()
    {
        return pollLook;
    }

    public void setPollLook(int pollLook)
    {
        this.pollLook = pollLook;
    }

    public int getSumPoint()
    {
        int  result=0;
        for (VoteItem vv : getVoteItemList())
        {
            result = result + vv.getVotePoint();
        }
        return result;
    }
}