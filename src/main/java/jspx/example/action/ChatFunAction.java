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

import com.github.jspxnet.txweb.annotation.HttpMethod;
import com.github.jspxnet.txweb.support.ActionSupport;

/**
 * Created by IntelliJ IDEA.
 * User: chenYuan
 * Date: 2010-11-4
 * Time: 16:12:12
 * 演示报表图形
 */
@HttpMethod(caption = "演示报表图形")
public class ChatFunAction extends ActionSupport {
    public ChatFunAction() {

    }

    public String execute() throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append("<graph baseFont=\"宋体\" baseFontSize=\"12\" outCnvBaseFontSize=\"12\" caption=\"得分时间线型图\" subcaption=\"10-18--10-24\" hovercapbg=\"FFECAA\" hovercapborder=\"F47E00\" formatNumberScale=\"0\" decimalPrecision=\"0\" showvalues=\"0\" numdivlines=\"3\" numVdivlines=\"0\" rotateNames=\"1\">\n" +
                "<categories>\n" +
                "<category name=\"10-18\"/>\n" +
                "<category name=\"10-19\"/>\n" +
                "<category name=\"10-20\"/>\n" +
                "<category name=\"10-21\"/>\n" +
                "<category name=\"10-23\"/>\n" +
                "<category name=\"10-24\"/>\n" +
                "</categories>\n" +
                "<dataSet seriesName=\"分数\" color=\"1D8BD1\" anchorBorderColor=\"1D8BD1\" anchorBgColor=\"1D8BD1\">\n" +
                "<set value=\"50\"/>\n" +
                "<set value=\"117\"/>\n" +
                "<set value=\"85\"/>\n" +
                "<set value=\"85\"/>\n" +
                "<set value=\"120\"/>\n" +
                "<set value=\"20\"/>\n" +
                "</dataSet>\n" +
                "</graph>");
        setResult(sb);
        return CHARTS;
    }
}