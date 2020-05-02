##目录


*		更多技术文档 [http://www.jspx.net/help/](http://www.jspx.net/help/)


	
#API接口调用说明

##一.ROC协议说明

1.	协议主要参照JSON-RPC 2.0，兼容resetFull API 方式，默认为传统页面开发模式。
2.	通过协议头部信息确定返回数据和格式支持类型，同时本地还可以使用传统方式搭建页面。
3.	传输主要是json格式，可以传输xml。
4.	为了区分其他协议，这里就叫ROC协议，远程对象调用协议。

##二.协议头

非加密方式:
headers: {'X-Requested-With': 'jspx.net-roc'}

加密方式:
headers: {'X-Requested-With': 'jspx.net-secret-roc'}

##三.URL地址说明

因为地址可以使用正规表达式,所以会出现如下的格式,表示可以多个地址都调用这个方法

例1:	/jcms/aematter|aelink|aevote

表示如下地址都可以调用，效果一样

/jcms/aematter

/jcms/aelink

/jcms/aevote


例2	:/jcms/verify\w+ 

正规表达式verify\w+ 表示后边匹配字符串

/jcms/verify\w+ 

/jcms/(verify+字符串) 都能访问到


##四.参数请求格式说明

数组方式传递参数,不推荐使用

```js
{
     "version": "3.0",  //版本,不是必须
     "protocol": "jspx.net-roc",  //协议说明,不是必须
     "format": "json",  //返回的格式要求,可以是xml，默认位json
      "method": {
        "name": "调用的方法",    //调用的方法名称
        "params": ["参数1","参数2",3]       //方法参数
       }

    },
    "params": {                //类对象参数就是类的set方法,文档中叫全局参数
        "参数1": 1,
        "参数2": 2
    },
    "result": ["list","currentPage","多个要返回的方法"]
}
```
 
推荐使用:参数也可以使用对象传输，

```js
{
     "version": "3.0",  //版本,不是必须
     "protocol": "jspx.net-roc",  //协议说明,不是必须
     "format": "json",  //返回的格式要求,可以是xml，默认位json
      "method": {
        "name": "调用的方法",    //调用的方法名称
        "params": {'参数名称1':'参数值1','参数名称2':'参数值2',...}       //方法参数
       }

    },
    "params": {                //类对象参数就是类的set方法,文档中叫全局参数
        "参数1": 1,
        "参数2": 2
    }
}
```

*	注意:参数params在method叫内部参数,在外部叫全局参数, 全局参数只是为了兼容传统接口,推荐API接口,都使用内部参数方式.


##五.常用参数说明

*	sort	:参数用法 field:A 表示field字段正序 field:D  倒序
*	count	:行数,翻页使用
*	currentPage	:页数,翻页使用
*	term	:ssql查询条件

例1:	field1:like['abc%'];field2:eq['abc'] ,相当于SQL的, field1 like 'abc%' AND field2='abc'
例2:	images:is[H] 表示images字段必须有数据


| ssql   | SQL      |
---------------------
| bt   | between    |
| eq   | =          |
| le   | <          |
| gt   | \>         |
| ne   | <>         |
| in   | in         |
| like | like       |
| N    | Null       |
| H    | NotNull    |
---------------------

##六.注意事项

调用方法名和url文件名相同时，不用参数，url直接ROC调用（必须有协议头），

无协议头的调用方式，将被认为是传统的页面调用方式，会提示找不到文件。

##七.特别说明

文档是自动生成，属于jspx.net架构的功能一部分

写代码就是写文档，代码完成文档也就完成。

如果你不想暴露文档，可以屏蔽TXWeb里边的文档入口配置，或者设置权限拦截后，可以配置指定的角色访问。