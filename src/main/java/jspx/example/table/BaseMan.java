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
import com.github.jspxnet.utils.DateUtil;
import com.github.jspxnet.utils.StringUtil;
import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: 陈原
 * Date: 2007-8-5
 * Time: 0:25:57
 * 这是一个例子的bean对象
 * 演示保存基本的信息
 * 用sober保存在数据库中表名为 jspx_baseMan
 */

@Table(name = "jspx_baseMan", caption = "会员")
public class BaseMan
{
    @Id
    @Column(caption = "用户名称", length = 50, notNull = true)
    private String id = StringUtil.empty;

    @Column(caption = "密码", length = 100, notNull = true)
    private String password = StringUtil.empty;

    @Column(caption = "头像URL", length = 100, notNull = true)
    private String faceImage = "/share/pimg/basesys/s_none.gif";

    @Column(caption = "头像宽", notNull = false, defaultValue = "128")
    private int faceWidth = 120;

    @Column(caption = "头像高", notNull = false, defaultValue = "128")
    private int faceHeight = 120;

    @Column(caption = "性别", option = "男;女;保密", length = 4, notNull = true, defaultValue = "1")
    private String sex = "男";

    @Column(caption = "生日", notNull = true)
    private Date birthday;

    @Column(caption = "等级", notNull = true)
    private int levels = 0;

    @Column(caption = "上级ID", length = 40, notNull = false)
    private String parentManId = StringUtil.empty;

    @Column(caption = "登陆次数")
    private int loginTimes = 0;

    @Column(caption = "最后登陆时间", notNull = false)
    private Date loginDate = new Date();

    @Column(caption = "是否帮定IP", option = "0:否;1:是", notNull = false, defaultValue = "0")
    private int bindIp = 0;

    @Column(caption = "帮定表达式", length = 100, notNull = false)
    private String bindIpfilter = "*";

    @Column(caption = "时间限制", option = "0:否;1:是", notNull = false, defaultValue = "0")
    private int timeSecure = 0;

    //"时间限制表达式 7:00-12:00;14:00-18:00
    @Column(caption = "时间限制表达式", length = 50, notNull = false, defaultValue = "*")
    private String timeBound = "*";

    //"天限制表达式 1,2,3,4,5,6,7
    @Column(caption = "天限制表达式", length = 100, notNull = false, defaultValue = "*")
    private String dayBound = "*";

    //"月限制表达式 1-12
    @Column(caption = "月限制表达式", length = 100, notNull = false, defaultValue = "*")
    private String monthBound = "*";

    @Column(caption = "冻结", option = "0:激活;1:冻结", notNull = false, defaultValue = "0")
    private int congeal = 0;

    //小于当前日期为未禁言
    @Column(caption = "禁言结束日期", notNull = true)
    private Date confineDate = DateUtil.addYear(-1);

    //当大于这个日期的时候就不允许登陆
    @Column(caption = "有效时间", notNull = true)
    private Date availableIn = DateUtil.addYear(50);

    @Column(caption = "积分数量", notNull = false, defaultValue = "0")
    private int gold = 0;

    @Column(caption = "年收入", notNull = true, defaultValue = "0")
    private int income = 0;

    @Column(caption = "职位", option = "自由职业;工作人员;政府人员;主管;部门经理;大区经理;总经理;总裁", notNull = false)
    private String position = StringUtil.empty;

    @Column(caption = "皮肤", length = 50, notNull = false, defaultValue = "default")
    private String skin = "default";

    @Column(caption = "mail", length = 50, notNull = true, defaultValue = "")
    private String mail = StringUtil.empty;

    @Column(caption = "qq", length = 20, notNull = false, defaultValue = "")
    private String qq = StringUtil.empty;

    @Column(caption = "msn", length = 20, notNull = false, defaultValue = "")
    private String msn = StringUtil.empty;

    @Column(caption = "个人主页", length = 50, notNull = true, defaultValue = "")
    private String homepage = StringUtil.empty;

    @Column(caption = "个人简介", length = 250, notNull = false)
    private String synopsis = StringUtil.empty;

    @Column(caption = "国家", length = 50, notNull = false, defaultValue = "中国大陆")
    private String country = "中国大陆";

    @Column(caption = "省份", length = 50, notNull = false)
    private String province = StringUtil.empty;

    @Column(caption = "城市", length = 50, notNull = false)
    private String city = StringUtil.empty;

    @Column(caption = "教育水平", option = "初中;高中;技校;中专;大专;本科;硕士;博士;博士后", length = 50, notNull = false)
    private String educate = StringUtil.empty;

    @Column(caption = "信誉", notNull = true, defaultValue = "100")
    private int creditStanding = 100;

    @Column(caption = "备注", notNull = true, defaultValue = "")
    private String remark = StringUtil.empty;

    @Column(caption = "签名", length = 250)
    private String signature = StringUtil.empty;

    @Column(caption = "最后操作时间", notNull = true)
    private Date lastDate = new Date();

    public BaseMan()
    {

        try
        {
            birthday = StringUtil.getDate("1970-01-01");
        } catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public int getFaceWidth()
    {
        return faceWidth;
    }

    public void setFaceImage(String faceImage)
    {
        this.faceImage = faceImage;
    }

    public String getFaceImage()
    {
        return faceImage;
    }

    public void setFaceWidth(int faceWidth)
    {
        this.faceWidth = faceWidth;
    }

    public int getFaceHeight()
    {
        return faceHeight;
    }

    public void setFaceHeight(int faceHeight)
    {
        this.faceHeight = faceHeight;
    }

    public String getSex()
    {
        return sex;
    }

    public void setSex(String sex)
    {
        this.sex = sex;
    }

    public int getLevels()
    {
        return levels;
    }

    public void setLevels(int levels)
    {
        this.levels = levels;
    }

    public String getParentManId()
    {
        return parentManId;
    }

    public void setParentManId(String parentManId)
    {
        this.parentManId = parentManId;
    }

    public int getLoginTimes() {
        return loginTimes;
    }

    public void setLoginTimes(int loginTimes) {
        this.loginTimes = loginTimes;
    }

    public int getBindIp()
    {
        return bindIp;
    }

    public void setBindIp(int bindIp)
    {
        this.bindIp = bindIp;
    }

    public String getBindIpfilter()
    {
        return bindIpfilter;
    }

    public void setBindIpfilter(String bindIpfilter)
    {
        this.bindIpfilter = bindIpfilter;
    }

    public int getTimeSecure()
    {
        return timeSecure;
    }

    public void setTimeSecure(int timeSecure)
    {
        this.timeSecure = timeSecure;
    }

    public String getTimeBound()
    {
        return timeBound;
    }

    public void setTimeBound(String timeBound)
    {
        this.timeBound = timeBound;
    }

    public String getDayBound()
    {
        return dayBound;
    }

    public void setDayBound(String dayBound)
    {
        this.dayBound = dayBound;
    }

    public String getMonthBound()
    {
        return monthBound;
    }

    public void setMonthBound(String monthBound)
    {
        this.monthBound = monthBound;
    }

    public int getCongeal()
    {
        return congeal;
    }

    public void setCongeal(int congeal)
    {
        this.congeal = congeal;
    }

    public int getGold()
    {
        return gold;
    }

    public void setGold(int gold)
    {
        this.gold = gold;
    }

    public int getIncome()
    {
        return income;
    }

    public void setIncome(int income)
    {
        this.income = income;
    }

    public String getPosition()
    {
        return position;
    }

    public void setPosition(String position)
    {
        this.position = position;
    }

    public String getEducate()
    {
        return educate;
    }

    public void setEducate(String educate)
    {
        this.educate = educate;
    }

    public String getMail()
    {
        return mail;
    }

    public void setMail(String mail)
    {
        this.mail = mail;
    }

    public int getCreditStanding()
    {
        return creditStanding;
    }

    public void setCreditStanding(int creditStanding)
    {
        this.creditStanding = creditStanding;
    }

    public String getRemark()
    {
        return remark;
    }

    public void setRemark(String remark)
    {
        this.remark = remark;
    }


    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public Date getLastDate()
    {
        return lastDate;
    }

    public void setLastDate(Date lastDate)
    {
        this.lastDate = lastDate;
    }

    public String getMsn()
    {
        return msn;
    }

    public void setMsn(String msn)
    {
        this.msn = msn;
    }

    public String getHomepage()
    {
        return homepage;
    }

    public void setHomepage(String homepage)
    {
        this.homepage = homepage;
    }


    public String getSynopsis()
    {
        return synopsis;
    }

    public void setSynopsis(String synopsis)
    {
        this.synopsis = synopsis;
    }

    public Date getBirthday()
    {
        return birthday;
    }

    public void setBirthday(Date birthday)
    {
        this.birthday = birthday;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public Date getConfineDate()
    {
        return confineDate;
    }

    public void setConfineDate(Date confineDate)
    {
        this.confineDate = confineDate;
    }

    public String getCountry()
    {
        return country;
    }

    public void setCountry(String country)
    {
        this.country = country;
    }

    public String getProvince()
    {
        return province;
    }

    public void setProvince(String province)
    {
        this.province = province;
    }

    public String getCity()
    {
        return city;
    }

    public void setCity(String city)
    {
        this.city = city;
    }

    public Date getAvailableIn()
    {
        return availableIn;
    }

    public void setAvailableIn(Date availableIn)
    {
        this.availableIn = availableIn;
    }

    public void setSkin(String skin)
    {
        this.skin = skin;
    }

    public String getSkin()
    {
        if (StringUtil.isNull(skin))
        {
            return "default";
        }
        return skin;
    }

    public Date getLoginDate()
    {
        return loginDate;
    }

    public void setLoginDate(Date loginDate)
    {
        this.loginDate = loginDate;
    }


}