package jspx.example.dao.impl;


import com.github.jspxnet.json.JSONObject;
import com.github.jspxnet.sioc.annotation.Bean;
import com.github.jspxnet.sioc.annotation.Ref;
import com.github.jspxnet.sober.SoberFactory;
import com.github.jspxnet.sober.SqlMapClient;
import com.github.jspxnet.sober.TableModels;
import com.github.jspxnet.sober.jdbc.JdbcOperations;
import jspx.example.conf.Persion;
import jspx.example.dao.IocDemoDAO;
import jspx.example.env.DemoIoc;
import jspx.example.table.Employee;
import jspx.example.table.VoteTopic;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 特殊DAO例子
 */
@Bean(namespace = DemoIoc.namespace)
public class IocDemoDAOImpl  extends JdbcOperations implements IocDemoDAO {

    @Override
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

    @Override
    public List<Employee> getEmployeeList(int page,int count) throws Exception {
        Map<String, Object> valueMap = new HashMap<String, Object>();
        valueMap.put("employeeTable", getTableName(Employee.class));
        SqlMapClient sqlMapClient = buildSqlMap();
        return sqlMapClient.query(DemoIoc.namespace, getClassMethodName(), valueMap, page, count);
    }

}
