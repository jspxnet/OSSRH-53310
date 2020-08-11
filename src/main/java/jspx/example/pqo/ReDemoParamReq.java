package jspx.example.pqo;

import com.github.jspxnet.txweb.annotation.Param;

import java.util.List;

/**
 * Created by jspx.net
 *
 * @author: chenYuan
 * @date: 2020/8/11 22:13
 * @description: jspbox
 **/
public class ReDemoParamReq {

    @Param(caption = "姓名", required = true)
    private String name;
    @Param(caption = "年龄")
    private int old;
    @Param(caption = "求和")
    private int sumOld;

    @Param(caption = "对象", required = true)
    private DemoParamReq req;

    @Param(caption = "列表", required = true)
    private List<DemoParamReq> list;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getOld() {
        return old;
    }

    public void setOld(int old) {
        this.old = old;
    }

    public int getSumOld() {
        return sumOld;
    }

    public void setSumOld(int sumOld) {
        this.sumOld = sumOld;
    }

    public DemoParamReq getReq() {
        return req;
    }

    public void setReq(DemoParamReq req) {
        this.req = req;
    }

    public List<DemoParamReq> getList() {
        return list;
    }

    public void setList(List<DemoParamReq> list) {
        this.list = list;
    }
}
