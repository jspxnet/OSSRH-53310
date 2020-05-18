package jspx.example.param;

import com.github.jspxnet.txweb.annotation.Param;
import lombok.Data;

import java.util.List;

/**
 * Created by jspx.net
 *
 * @author: chenYuan
 * @date: 2020/5/6 10:51
 * @description: jspxpro
 */

@Data
public class TestParam {

    @Param(caption = "boxType")
    private int boxType;
    @Param(caption = "名称")
    private String caption;
    @Param(caption = "类型")
    private int dataType;
    @Param(caption = "扩展")
    private String extension;

    @Param(caption = "扩展2")
    private List child;

}
