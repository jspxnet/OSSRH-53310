##说明

这里是一个jspx-framework自动生成API文档的模版文件.配合jspx-framework可以不用手工是用API文档编辑器

#API文档自动生成模板

ioc文件配置 ioc\api.xml
txweb文件配置 txweb\api.xml
api稳定模板文件  api

##步骤

1.	配置好ioc和txweb文件
2.	拷贝api目录到你的软件目录
3.	例如软件目录为shop,访问地址为 /shop/api/

ioc配置
```xml
<load file="ioc/api.xml" softName="你的软件英文名称,命名空间"/>
```
txweb配置

```xml
   <load file="txweb/api.xml" softName="你的软件英文名称,命名空间" />
```

配合支持库
```xml
<dependency>
    <groupId>com.github.jspxnet</groupId>
    <artifactId>jspx-framework</artifactId>
    <version>6.31</version>
</dependency>
```
