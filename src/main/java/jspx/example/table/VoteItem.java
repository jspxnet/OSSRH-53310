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



import com.github.jspxnet.json.JsonField;
import com.github.jspxnet.sober.annotation.Column;
import com.github.jspxnet.sober.annotation.Id;
import com.github.jspxnet.sober.annotation.Nexus;
import com.github.jspxnet.sober.annotation.Table;
import com.github.jspxnet.sober.enums.MappingType;
import com.github.jspxnet.sober.table.OperateTable;
import com.github.jspxnet.utils.DateUtil;
import com.github.jspxnet.utils.NumberUtil;
import com.github.jspxnet.utils.StringUtil;
import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User:chenYuan (mail:39793751@qq.com)
 * Date: 2006-2-28
 * Time: 16:56:59
 *
 */

@Table(name = "test_voteitem", caption = "投票选项")
public class VoteItem extends OperateTable
{
     @Id
     @Column(caption="ID",notNull = true)
     private long id;


    @Column(caption = "排序", notNull = true, defaultValue = "0")
    private int sortType = 0;

    @Column(caption = "投票主题的ID", length = 50, notNull = true)
    private long topicId = 0;

    @Nexus(mapping = MappingType.ManyToOne, field = "topicId", targetField = "id", targetEntity = VoteTopic.class)
    private VoteTopic voteTopic;

    @Column(caption = "投票选项说明", length = 100, notNull = true)
    private String title = StringUtil.empty;

    @Column(caption = "图片投票", length = 100, notNull = false)
    private String images = StringUtil.empty;


    @Column(caption = "票数", notNull = true, defaultValue = "0")
    private int votePoint = 0;


    @Column(caption = "创建时间", notNull = true)
    @JsonField(format = DateUtil.DAY_FORMAT)
    protected Date formatDate = new Date();

    public VoteItem()
    {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getSortType()
    {
        return sortType;
    }

    public void setSortType(int sortType)
    {
        this.sortType = sortType;
    }

    public VoteTopic getVoteTopic()
    {
        return voteTopic;
    }

    public void setVoteTopic(VoteTopic voteTopic)
    {
        this.voteTopic = voteTopic;
    }

    public long getTopicId() {
        return topicId;
    }

    public void setTopicId(long topicId) {
        this.topicId = topicId;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getImages()
    {
        return images;
    }

    public void setImages(String images)
    {
        this.images = images;
    }

    public String getColor()
    {
        switch (sortType)
        {
            case 1:
                return "00EEAA";
            case 2:
                return "0099CC";
            case 3:
                return "990000";
            case 4:
                return "0033F0";
            case 5:
                return "FFFF00";
            case 6:
                return "FF99CC";
            case 8:
                return "0F9900";
            case 9:
                return "003300";
            case 10:
                return "00FFCC";
            case 11:
                return "00EEEE";
            case 12:
                return "00CC00";
            case 13:
                return "aa33B0";
            
        }
        return "F0" + Integer.toHexString(sortType);
    }

    public int getVotePoint()
    {
        return votePoint;
    }

    public void setVotePoint(int votePoint)
    {
        this.votePoint = votePoint;
    }


    /**
     * scale
     * 得到投票比例
     *
     * @return double
     */
    public Float getScale(int sum)
    {
        if (sum<=0) {
            return (float) 0;
        }
        return (NumberUtil.mul(NumberUtil.div(votePoint, sum).doubleValue(), 100)).floatValue();
    }

    /**
     * 得到投票比例
     *
     * @return double
     */
    public String getScaleTwo(int sum)
    {
        return NumberUtil.format(getScale(sum) * 2, "######");
    }

    public String getScaleString(int sum)
    {
        return NumberUtil.format(getScale(sum), "######");
    }

    public Date getFormatDate() {
        return formatDate;
    }

    public void setFormatDate(Date formatDate) {
        this.formatDate = formatDate;
    }
}