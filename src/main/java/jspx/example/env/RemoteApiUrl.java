package jspx.example.env;

import com.github.jspxnet.sioc.annotation.Bean;
import com.github.jspxnet.sioc.annotation.PropertySource;
import com.github.jspxnet.sioc.annotation.Value;
import lombok.Data;

@Bean(namespace = DemoIoc.namespace, singleton = true)
@PropertySource(value = "classpath:remote-api.properties")
@Data
public class RemoteApiUrl {

    @Value("accountApi.url")
    private String accountApiUrl;

    @Value("paymentApi.url")
    private String paymentApiUrl;

    @Value("pointsLevelApi.url")
    private String pointsLevelApiUrl;

    @Value("refundApi.url")
    private String refundApiUrl;

    @Value("transferApi.url")
    private String transferApiUrl;

    @Value("withdrawApi.url")
    private String withdrawApiUrl;
}
