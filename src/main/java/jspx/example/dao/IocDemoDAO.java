package jspx.example.dao;

import com.github.jspxnet.sober.SoberSupport;
import jspx.example.conf.Persion;
import jspx.example.table.Employee;

import java.util.List;


public interface IocDemoDAO extends SoberSupport {
    String getPersionJson(Persion persion);


    List<Employee> getEmployeeList(int page, int count) throws Exception;
}
