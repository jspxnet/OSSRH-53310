package jspx.example.conf;

import com.github.jspxnet.sioc.annotation.Bean;
import com.github.jspxnet.sioc.annotation.PropPrefix;
import com.github.jspxnet.sioc.annotation.PropertySource;
import com.github.jspxnet.sioc.annotation.Value;
import jspx.example.env.DemoIoc;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Bean(namespace = DemoIoc.namespace,singleton = true)
@PropertySource(value = "persion.properties")
@PropPrefix(prefix = "persion")
@Data
public class Persion implements Serializable {
    final private String finTxt = "xxxx";
    final private static String finT = "323";
    private String name;
    private Integer age;
    private boolean isBoss;
    private Date birth;
    private String lastName;
    private List<Object> lists;
    @Value("${persionxxx}")
    private String publicKey;

}