package jspx.example.dao.impl;


import com.github.jspxnet.json.JSONObject;
import com.github.jspxnet.sioc.annotation.Bean;
import com.github.jspxnet.sioc.annotation.Ref;
import com.github.jspxnet.sober.SoberFactory;
import com.github.jspxnet.sober.jdbc.JdbcOperations;
import jspx.example.conf.Persion;
import jspx.example.dao.IocDemoDAO;
import jspx.example.env.DemoIoc;

/**
 * 特殊DAO例子
 */
@Bean(bind = IocDemoDAO.class,namespace = DemoIoc.namespace)
public class IocDemoDAOImpl  extends JdbcOperations implements IocDemoDAO {

    public String getPersionJson(Persion persion)
    {
        JSONObject json = new JSONObject(persion);
        return json.toString(4);
    }

    @Ref(name = "jspxSoberFactory" ,namespace = DemoIoc.namespace)
    @Override
    public void setSoberFactory(SoberFactory soberFactory) {
        super.setSoberFactory(soberFactory);
    }


    public JSONObject getPersionJsonObject(Persion persion)
    {
        return  new JSONObject(persion);
    }


}
