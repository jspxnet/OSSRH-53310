package jspx.example.pqo;



import com.github.jspxnet.json.JsonField;

import java.io.Serializable;


/*
   通过JsonField的注释生成API接口文档,这里就是进入的参数

*/
public class DemoParamReq implements Serializable {
    @JsonField(caption="姓名")
    private String name;
    @JsonField(caption="年龄")
    private int old;
    @JsonField(caption="求和")
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
