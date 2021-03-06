package jspx.example.pqo;

import com.github.jspxnet.txweb.annotation.Param;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * Created by jspx.net
 *
 * @author: chenYuan
 * @date: 2020/8/11 22:13
 * @description: jspbox
 **/
@Data
public class ReDemoParamReq implements Serializable {

    @Param(caption = "姓名",min = 2,max = 30,required = true,message = "长度不正确")
    private String name;
    @Param(caption = "年龄")
    private int old;
    @Param(caption = "求和")
    private int sumOld;
    @Param(caption = "对象", required = true)
    private DemoParamReq req;

    @Param(caption = "列表", required = true)
    private List<DemoParamReq> list;
}
