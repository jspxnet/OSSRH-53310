package jspx.example.dao;

import com.github.jspxnet.sober.SoberSupport;
import jspx.example.conf.Persion;


public interface IocDemoDAO extends SoberSupport {
    String getPersionJson(Persion persion);
}
