package jspx.example.pqo;


import com.github.jspxnet.txweb.annotation.Param;

import java.io.Serializable;


/*
   通过JsonField的注释生成API接口文档,这里就是进入的参数

*/
public class DemoParamReq implements Serializable {

    @Param(caption = "姓名", required = true)
    private String name;
    @Param(caption = "年龄", min = 1, max = 100, message = "年龄不在范围")
    private int old;
    @Param(caption = "求和")
    private int sumOld;

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
}
