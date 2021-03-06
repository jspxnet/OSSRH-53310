package jspx.example.dto;



import com.github.jspxnet.json.JsonField;
import lombok.Data;

import java.io.Serializable;

/**
 * 这里演示一个DTO对象，一般DTO是传输给前台界面开发者的
 *
 * JsonField 中的 format 可以格式化输出日期和数字，也可以通过JsonField的注释生成API接口文档
 *
 */
@Data
public class DemoDto implements Serializable {
    @JsonField(caption="姓名")
    private String name;
    @JsonField(caption="年龄")
    private int old;
    @JsonField(caption="求和")
    private int sumOld;

    @JsonField(name = "sum")
    public int getSum() {
        return sumOld + old;
    }
}
