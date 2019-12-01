package jspx.example.conf;

import com.github.jspxnet.sioc.annotation.Bean;
import com.github.jspxnet.sioc.annotation.PropPrefix;
import com.github.jspxnet.sioc.annotation.PropertySource;
import com.github.jspxnet.sioc.annotation.Value;
import jspx.example.env.DemoIoc;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Bean(namespace = DemoIoc.namespace)
@PropertySource(value = "classpath:persion.properties")
@PropPrefix(prefix = "persion" )
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
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public boolean isBoss() {
        return isBoss;
    }

    public void setBoss(boolean boss) {
        isBoss = boss;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public List<Object> getLists() {
        return lists;
    }

    public void setLists(List<Object> lists) {
        this.lists = lists;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey;
    }
}