package jspx.example.conf;

import com.github.jspxnet.sioc.annotation.Bean;
import com.github.jspxnet.sioc.annotation.PropPrefix;
import com.github.jspxnet.sioc.annotation.PropertySource;
import com.github.jspxnet.sioc.annotation.Value;
import jspx.example.env.DemoIoc;
import lombok.Data;

/**
 * Created by jspx.net
 *
 * @author: chenYuan
 * @date: 2020/7/20 21:59
 * @description: jspbox
 *
 **/
@Bean(namespace = DemoIoc.namespace)
@PropertySource(value = "classpath:persion.properties")
@PropPrefix(prefix = "persion")
@Data
public class RemoteConfig {
    @Value("${remoteTestUrl}")
    private String remoteTestUrl;
}
