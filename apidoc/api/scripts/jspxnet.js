/**
 * 版权说明,你可以任意的拷贝,发布,修改本js代码.但对于修改后的代码修改 必须发一份到39793751@qq.com
 * 这样方便我在后期升级考虑
 * jspxnet.js 2.0 for mootools 1.45
 * chenYan
 *  提供了常用的js函数方法，和js验证
 *
 */
//--------------------------------------RPC call TXWeb
var scriptPath = '/script';
var photoFileTypes = ['jpg', 'png', 'gif', 'bmp', 'jpeg'];
//------------------------------js属性扩展 常用部分
var baseTypes = ["int", "integer", "long", "bool", "boolean", "float", "long", "date", "double", "string", "map"];

function isMobileBrowser()
{
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

function isBaseType(type) {
    for (var i = 0; i < baseTypes.length; ++i) {
        if (baseTypes[i] == type) return true;
    }
    return false;
}

function supportHtml5Date() {
	var i = document.createElement('input');
	i.setAttribute('type', 'date');
		//浏览器不支持date类型
	if(i.type == 'text'){
	    return false;
	}
    return true;
}

//常用的提交
function formButton(form, op) {
    if (!op) {
        alert("code error");
        return false;
    }
    if (op.indexOf("delete") != -1) {
        var q = confirm('delete ? 是否确定要删除?');
        if (q == "0" || q == 0) return false;
    }
    var oper = $('method');
    if (!oper) {
        oper = new Element('input', {id: 'method', name: 'method', type: 'hidden'});
        $(form).grab(oper);
    }
    oper.set("value", op);
    $(form).submit();
    return true;
}

//简单的java StringBuffer
function StringBuffer() {
    this._strings_ = new Array;
}
StringBuffer.prototype.append = function (str) {
    this._strings_.push(str);
};
StringBuffer.prototype.toString = function () {
    return this._strings_.join("");
};
//得到长度,为了兼容java
String.prototype.getLength = function () {
    var o = this;
    var elen;
    if (typeOf(o.length) == "number")
        elen = o.length;
    else elen = o.length();
    return elen;
};
//得到浏览器URL
function getBrowserURL() {
    if (location.href.lastIndexOf('/') != -1) {
        firstpos = location.href.lastIndexOf('/') + 1;
        lastpos = location.href.length;
        return location.href.substring(0, firstpos);
    }
    return "";
}
//调用一个函数
function callBack(functionName, ev) {
    if (typeOf(functionName) == 'string')
        return eval(functionName(ev));
    else
        return functionName(ev);
}
//将一个页面做为弹出窗口
function popupCenterWindow(url, name, width, height, scro) {
    var win = null;
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;
    var features = 'height=' + height + ',';
    features += 'width=' + width + ',';
    features += 'top=' + top + ',';
    features += 'left=' + left + ',';
    features += 'scrollbars= ' + scro + ',';
    features += 'resizable=no';
    win = window.open(url, name, features);
    if (parseInt(navigator.appVersion) >= 4) {
        win.window.focus();
    }
    return win;
}
//字符串转换到dom 对象
function createElement(xmlStr) {
    if (!xmlStr)return null; //空串返回null
    var xmlDom = false;
    if (window.ActiveXObject) {
        var prefixes = ["MSXML2", "Microsoft", "MSXML", "MSXML3"];
        for (var i = 0; i < prefixes.length; i++)
            try {
                xmlDom = new ActiveXObject(prefixes[i] + ".DomDocument");
                if (xmlDom) break;
            }
            catch (ex) {
                xmlDom = new ActiveXObject("Microsoft.XMLDOM");
            }
    } else if (document.implementation && document.implementation.createDocument) {
        xmlDom = document.implementation.createDocument("", "doc", null);
    }
    xmlDom.async = false;
    try {
        xmlDom.loadXML(xmlStr);
    }
    catch (e) {  //非IE浏览器
        var oParser = new DOMParser();
        xmlDom = oParser.parseFromString(xmlStr, "text/xml");
    }
    return xmlDom;
}


/**
 * 扩展mootools 中array数据放入select 单元
 *   var data= ["aa:AA","bb:BB","cc:CC"];
 *   data.setOptions($('mcountry'),"cc");
 */
Array.implement({
    setOptions: function (select, sel, keyf) {
        if (typeOf(select) == 'element') select.deleteOptions();
        if (keyf == null || keyf == undefined) keyf = ":";
        var keys = null, vars = null, opt = null;

        function ie6OptionSelected() {
            this.selected = true;
        }
        this.each(function (av) {
            if (typeOf(av) == "string") {
                var hav = av.indexOf(keyf);
                if (hav == -1) {
                    opt = new Option(av, av);
                    if (av == sel)
                        if (Browser.name=='ie'&&Browser.version==6)
                            ie6OptionSelected.delay(1, opt);
                        else  opt.selected = true;

                } else {
                    keys = av.substring(0, hav);
                    vars = av.substring(hav + 1, av.getLength());
                    opt = new Option(vars, keys);
                    if (keys == sel) {
                        if (Browser.name=='ie'&&Browser.version==6)
                            ie6OptionSelected.delay(1, opt);
                        else  opt.selected = true;
                    }
                }
            } else {
                opt = new Option(av.key, av.value);
                if (keys == sel)
                    if (Browser.name=='ie'&&Browser.version==6)
                        ie6OptionSelected.delay(1, opt);
                    else  opt.selected = true;
            }
            if (typeOf(select) == 'element') select.options.add(opt);
            else  alert(select + ' not find ' + typeOf(select) + "  " + select);
        });

    }
    //经常用的是通过遍历,重构数组.
    ,
    remove:function(dx)
    {
      if(isNaN(dx)||dx>this.length){return false;}
        for(var i=0,n=0;i<this.length;i++)
        {
            if(this[i]!=this[dx])
            {
                this[n++]=this[i]
            }
        }
        this.length-=1
    }
});
//------------------------------使用scriptmark   begin
//转换为原则选择器
String.prototype.selectors = function (sp) {
    if (sp == undefined) sp = ";";
    var str = this;
    var result = '';
    if (str.indexOf(sp) != -1) {
        var array = str.toArray(sp);
        array.each(function (a) {
            result = result + '#' + a + ',';
        });
    } else result = this;
    return result;
};
//删除html
String.prototype.deleteHtml = function (len, end) {
    var result = this.replace(/<[^>].*?>/g, "").trim();
    if (!len) return result;
    if (!end) end = '';
    return result.cut(len, end);
};
//清理wordTag
String.prototype.cleanWord = function () {
    var html = this.replace(/<\/?chsdate[^>]*>/gi, "");
    // Remove all SPAN tags
    html = html.replace(/<\/?SPAN[^>]*>/gi, "");
    // Remove Class attributes
    html = html.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3");
    // Remove Style attributes
    html = html.replace(/<(\w[^>]*) style="([^"]*)"([^>]*)/gi, "<$1$3");
    // Remove Lang attributes
    html = html.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3");
    // Remove XML elements and declarations
    html = html.replace(/<\\?\?xml[^>]*>/gi, "");
    html = html.replace(/&lt;\\?\?xml:namespace[^>]*>/gi, "");
    // Remove Tags with XML namespace declarations: <o:p></o:p>
    html = html.replace(/<\/?\w+:[^>]*&gt;/gi, "");
    // Replace the &nbsp;
    html = html.replace(/&nbsp;/, " ");
    // Transform <P> to <DIV>
    var re = new RegExp("(<P)([^>]*>.*?)(<\/P>)", "gi"); // Different because of a IE 5.0 error
    return html.replace(re, "<div$2</div>").replace(/<p \/>/gi, "");
};
String.prototype.cut = function (len, send) {
    if (send == undefined) send = "";
    if (this.getCLength() > len - send.length)
        return this.csubstring(0, (len - send.length)) + send;
    else return this;
};
//安中文计算长度
String.prototype.getCLength = function () {
    return this.replace(/[^\x00-\xff]/g, "**").length;
};
//安中文切断
String.prototype.csubstring = function (start, len) {
    var result = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var strLength = this.replace(chineseRegex, "**").length;
    var newLength = 0;
    for (var i = 0; i < strLength; i++) {
        var singleChar = this.charAt(i).toString();
        if (singleChar.match(chineseRegex) != null)newLength += 2;
        else newLength++;
        if (len && newLength > len) break;
        if (newLength >= start) result += singleChar;
    }
    return result;
};

//首字母大写
String.prototype.firstUpperCase = function () {
    return this.substring(0, 1).toUpperCase() + this.substring(1, this.length);
};
//首字母小写
String.prototype.firstLowerCase = function () {
    return this.substring(0, 1).toLowerCase() + this.substring(1, this.length);
};
//得到长度,为了兼容java
String.prototype.getLength = function () {
    var o = this;
    var elen;
    if (typeOf(o.length) == "number") elen = o.length;
    else elen = o.length();
    return elen;
};
//得到字符前的
String.prototype.substringBefore = function (prefix) {
    if (this == null || prefix == undefined) return "";
    var pos = this.indexOf(prefix);
    if (pos == -1)
        return "";
    return this.substring(0, pos);
};
//得到字符前的
String.prototype.substringAfter = function (prefix) {
    if (this == null || prefix == undefined) return "";
    var pos = this.indexOf(prefix);
    if (pos == -1) return "";
    return this.substring(pos + 1, this.length);
};

//得到
String.prototype.substringLastAfter = function (prefix) {
    if (this == null || prefix == undefined) return "";
    var pos = this.lastIndexOf(prefix);
    if (pos == -1)
        return "";
    return this.substring(pos + prefix.getLength(), this.getLength());
};
String.prototype.substringBetween =  function (begin,end) {
    var pos = this.indexOf(begin);
    if (pos == -1) return this;
    var iend = this.indexOf(end);
    if (iend == -1) return this;
    return this.substring(pos+1,iend);
};
//得到文件类型后缀
String.prototype.getFileType = function () {
    var fileType = this.substringLastAfter(".").toLowerCase();
    if (fileType.indexOf('?')==-1) return fileType;
    return fileType.substringBefore("?");
};
//得到文件名称
String.prototype.getFileName = function () {
    var pos = this.lastIndexOf('/');
    if (pos != -1) return this.substring(pos + 1, this.length);
    return this;
};
//得到字符传出现的次数
String.prototype.countMatches = function (c) {
    var elen = this.getLength();
    var clen = c.getLength();
    if (!this || elen < 1) return 0;
    if (elen < clen) return 0;
    var result = 0;
    for (var i = 0; i < elen - clen; i++) {
        if (c == this.substring(i, i + clen)) result++;
    }
    return result;
};
//转换为整数 ,separator 表示得到切分后的部分来转换,为了区分mootools
String.prototype.parseInt = function (separator) {
    var result = 0;
    if (separator && this.lastIndexOf(separator) != -1) {
        firstpos = this.lastIndexOf(separator) + separator.getLength();
        lastpos = this.getLength();
        result = parseInt(this.substring(firstpos, this.getLength()));
        if (isNaN(result)) return 0;
        return result;
    }
    result = parseInt(this.replace("px", ""));
    if (isNaN(result)) return 0;
    return result;
};
//转换为数字,有小数点
String.prototype.toNumber = function (dec) {
    var f = this.replace("px", "");
    if (dec < 0) dec = 2;
    var result = parseInt(this) + (dec == 0 ? "" : ".");
    f -= parseInt(f);
    if (f == 0)
        for (var i = 0; i < dec; i++)   result += '0';
    else {
        for (i = 0; i < dec; i++)  f *= 10;
        result += parseInt(Math.round(f));
    }
    return  result;
};
//去出空格
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
};
String.prototype.toBoolean = function () {
    if (this == '') return false;
    var temp = this.toLowerCase();
    return temp == 'true' || temp == '1' || temp == 'y';

};

//---------------验证功能部分 begin
String.prototype.isEmpty = function () {
    return (this == null) || this == undefined || (this.getLength() < 1);
};
//是否为中文
String.prototype.isChinese = function () {
    return /^[\u0391-\uFFE5]+$/.test(this);
};
//是否为日期 call mt
String.prototype.isDate = function () {
    if ("" == this) return false;
    return new Date(Date.parse(this)).isValid();
};
//判断文本输入是不是时间格式,如13:25
String.prototype.isTime = function () {
    var a = this.match(/^(\d{1,2})(:)?(\d{1,2})$/);
    if (a == null)  return false;
    return !(a[1] > 24 || a[3] > 60);
};
//是否为email
String.prototype.isEmail = function () {
    if (this.isEmpty()) {
        return false;
    }
    var re = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
    return re.test(this);
};
//判断字符串中是否存在数组中的字符
String.prototype.indexOfArray = function (array) {
    if (typeOf(array) == "string") return this.indexOf(array);
    for (var i = 0; i < array.length; i++) {
        if (this.indexOf(array[i]) != -1) return true;
    }
    return false;
};
//判断是否为正常的名称
String.prototype.isGoodName = function() {
    if (!this.isLengthBetween(2, 26)) return false;
    return !this.indexOfArray(['.','\\','/',',',';','.',' ','^','&','|','[',']','!','=','(',')','{','}','<','>','%']);
};
//判断URL http格式的
String.prototype.isURL = function () {
    var reg = /^http:\/\/.{0,93}/;
    var reg2 = /^https:\/\/.{0,93}/;
    var reg3 = /^rtsp:\/\/.{0,93}/;
    var reg4 = /^mms:\/\/.{0,93}/;
    return reg.test(this) || reg2.test(this) || reg3.test(this) || reg4.test(this);
};
//比较开始是否相等 formI从那里开始比较
String.prototype.startsWith = function (str, formI) {
    return this.substr(formI, str.length) == str;
};
//比较结束是否相等
String.prototype.endWith = function (prefix) {
    if (this == null) return false;
    if (typeOf(prefix) == "string") {
        return this.substring(this.getLength() - prefix.getLength(), this.getLength()) == prefix;
    } else {
        for (var i = 0; i < prefix.length; i++) {
            if (this.substring(this.getLength() - prefix[i].getLength(), this.getLength()) == prefix[i])
                return true;
        }
        return false;
    }
};
//校验手机号码：必须以数字开头，除数字外，可含有“-”
String.prototype.isMobile = function () {
	var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
    return reg.test(this);

};
//校验QQ
String.prototype.isQQ = function () {
    var patrn = /^[1-9]\d{4,8}$/;
    return patrn.test(this);
};
//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
String.prototype.isPhone = function () {
    var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
    return patrn.test(this);
};
//是否为邮编
String.prototype.isPostcode = function () {
    var patrn = /^[a-zA-Z0-9 ]{3,12}$/;
    return patrn.test(this);
};
//是否为整数
String.prototype.isInteger = function () {
    var patrn = /^[-\+]?\d+$/;
    return patrn.test(this);
};
String.prototype.isFloat = function () {
    return this.isDouble();
};
//是否为双精度数
String.prototype.isDouble = function () {
    var patrn = /^[-\+]?\d+(\.\d+)?$/;
    return patrn.test(this);
};
//是否为英文
String.prototype.isEnglish = function () {
    var patrn = /^[A-Za-z]+$/;
    return patrn.test(this);
};
//是否为正整数
String.prototype.isSafe = function () {
    var patrn = /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/;
    return !patrn.test(this);
};
//IP地址转换成对应数值
String.prototype.isIP = function () {
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g; //匹配IP地址的正则表达式
    if (re.test(this)) {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true;
    }
    return false;
};
//表达式验证
String.prototype.test = function (regex, params) {
    return ((typeOf(regex) == 'string') ? new RegExp(regex, params) : regex).test(this);
};
//是否相等
String.prototype.equal = function (v) {
    return this == v;
};
//判断是否为数字
String.prototype.isNumber = function () {
    var objExp = /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
    return objExp.test(this);
};
//转换为数字验证是否在范围内
String.prototype.isBetween = function (imin, imax) {
    if (!this.isNumber()) return false;
    return parseFloat(this).isBetween(imin, imax);
};
// 判断长度是否在之内
String.prototype.isLengthBetween = function (iMin, iMax) {
    return (this.length >= iMin) && (this.length <= iMax);
};
String.prototype.cleanSpecial = function() {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?]");
    var rs = "";
    for (var i = 0; i < this.length; i++) {
        rs = rs + this.substr(i, 1).replace(pattern, '');
    }
    return rs;
};
//判断为日期时间 2002-1-31 12:34:56
String.prototype.isDateTime = function () {
    var r, d;
    if (this.countMatches(':') == 2) {
        r = this.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
        d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
    }
    if (this.countMatches(':') == 1) {
        r = this.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2})$/);
        d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], 0);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6]);
    }
    if (this.countMatches(':') == 0)
        return this.isDate();
};
String.prototype.isCardCode = function () {
    var intStrLen = this.getLength();
    if ((intStrLen != 15) && (intStrLen != 18)) return false;
    var factorArr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
    var varArray = [];
    var lngProduct = 0;
    var intCheckDigit;
    var idNumber = this;
    // check and set value
    for (var i = 0; i < intStrLen; i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
            return false;
        } else if (i < 17) {
            varArray[i] = varArray[i] * factorArr[i];
        }
    }
    if (intStrLen == 18) {
        var date8 = idNumber.substring(6, 14);
        if (!date8.isDate()) return false;
        // calculate the sum of the products
        for (i = 0; i < 17; i++) lngProduct = lngProduct + varArray[i];

        intCheckDigit = 12 - lngProduct % 11;
        switch (intCheckDigit) {
            case 10:
                intCheckDigit = 'X';
                break;
            case 11:
                intCheckDigit = 0;
                break;
            case 12:
                intCheckDigit = 1;
                break;
        }
        if (varArray[17].toUpperCase() != intCheckDigit) return false;
    }
    else {
        var date6 = idNumber.substring(6, 12);
        if (!date6.isDate())
            return false;
    }
    //alert ("Correct.");
    return true;
};
//判断密码安全级别
String.prototype.checkPassWordLevel = function () {
    var n = 0;
    if (/\d/.test(this)) n++; //包含数字
    if (/[a-z]/.test(this)) n++; //包含小写字母
    if (/[A-Z]/.test(this)) n++; //包含大写字母
    if (this.length == 6) n = 1; //长度小于6位
    return n;
};

//判断密码安全级别2 按长度
String.prototype.checkPassWordLevel1 = function () {
    var grade = 0;
    if (this.length >= 6 && this.length <= 9) grade = 1;
    if (this.length >= 10 && this.length <= 15) grade = 2;
    if (this.length >= 16 && this.length <= 20) grade = 3;
    return grade;
};
//---------------验证功能部分 end
String.prototype.show = function (sel) {
    return this.split(";").show(sel);
};
String.prototype.toArray = function (sp) {
    if (!sp) {
        var charArr = [];
        for (var i = 0; i < this.getLength(); i++) charArr[i] = this.charAt(i);
        return charArr;
    }
    return this.split(sp);
};
String.prototype.xmlEscape = function () {
    var str = this;
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    return str;
};
String.prototype.url = function () {
    return encodeURI(this);
};
String.prototype.toDate = function () {
    //中文日期
    return Date.parse(this);
};
//得到请求的参数
String.prototype.getQueryString = function (name) {
    var result = this.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
        return "";
    }
    return  result[1];
};
//---------------------------------------数字
Number.prototype.toInt = function () {
    return this.round(0);
};
Number.prototype.round = function (pos) {
    return Math.round(this * Math.pow(10, pos)) / Math.pow(10, pos);
};
Number.prototype.toDate = function () {
    return new Date(this);
};
Number.prototype.toDateString = function (fm) {
    var date = new Date(this);
    return date.string(fm);
};
Number.prototype.string = function (y, n) {
    if (this > 0) return y;
    else return n;
};
Number.prototype.abs = function () {
    return Math.abs(this);
};
//判断一个数值是否在范围内
Number.prototype.isBetween = function (imin, imax) {
    return imin <= this & this <= imax;
};
Number.prototype.toFloat = function () {
    return parseFloat(this);
};
//转换为日期比较,返回小时
Number.prototype.compareHour = function (beginDate) {
    var lbegin = 0;
    if (typeOf(beginDate) == "number") lbegin = beginDate;
    else lbegin = beginDate.getTime();
    var diffMillis = this - lbegin;
    return diffMillis / (60 * 60 * 1000);
};
//转换为日期比较,返回天数
Number.prototype.compareDay = function (beginDate) {
    var diffMillis = this.compareHour(beginDate);
    return diffMillis / 24;
};
//判断是否存在数组中
Number.prototype.indexOfArray = function (array) {
    for (var i = 0; i < array.length; i++) {
        if (this == array[i]) return true;
    }
    return false;
};
//-------------------------------------日期
Date.prototype.string = function (format, def) {
    if (this.getFullYear() <= 1800 && this.getMonth() < 2 && this.getDate() == 1) return def;
    return this.string(format);
};
//日期格式化输出
Date.prototype.string = function (formatStr) {

    var date = this;
    /*
     函数：填充0字符
     参数：value-需要填充的字符串, length-总长度
     返回：填充后的字符串
     */
    var zeroize = function (value, length) {
        if (!length) {
            length = 2;
        }
        value = new String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };
    return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
            case 'd':
                return date.getDate();
            case 'dd':
                return zeroize(date.getDate());
            case 'ddd':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
            case 'dddd':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
            case 'M':
                return date.getMonth() + 1;
            case 'MM':
                return zeroize(date.getMonth() + 1);
            case 'MMM':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
            case 'MMMM':
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
            case 'yy':
                return (date.getFullYear()+'').substr(2);
            case 'yyyy':
                return date.getFullYear();
            case 'h':
                return date.getHours() % 12 || 12;
            case 'hh':
                return zeroize(date.getHours() % 12 || 12);
            case 'H':
                return date.getHours();
            case 'HH':
                return zeroize(date.getHours());
            case 'm':
                return date.getMinutes();
            case 'mm':
                return zeroize(date.getMinutes());
            case 's':
                return date.getSeconds();
            case 'ss':
                return zeroize(date.getSeconds());
            case 'l':
                return date.getMilliseconds();
            case 'll':
                return zeroize(date.getMilliseconds());
            case 'tt':
                return date.getHours() < 12 ? 'am' : 'pm';
            case 'TT':
                return date.getHours() < 12 ? 'AM' : 'PM';
        }
    });
};
Date.prototype.compareHour = function (beginDate) {
    var diffMillis = this.getTime() - beginDate.getTime();
    return diffMillis / (60 * 60 * 1000);
};
Date.prototype.compareDay = function (beginDate) {
    var diffMillis = this.getTime() - beginDate.getTime();
    return diffMillis / (24 * 60 * 60 * 1000);
};
Date.prototype.addMilliseconds = function (value) {
    this.setMilliseconds(this.getMilliseconds() + value);
    return this;
};
Date.prototype.addSeconds = function (value) {
    return this.addMilliseconds(value * 1000);
};
Date.prototype.addMinutes = function (value) {
    return this.addMilliseconds(value * 60000);
};
Date.prototype.addHours = function (value) {
    return this.addMilliseconds(value * 3600000);
};
Date.prototype.addDays = function (value) {
    return this.addMilliseconds(value * 86400000);
};
Date.prototype.addWeeks = function (value) {
    return this.addMilliseconds(value * 604800000);
};
Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};
Date.prototype.addYears = function (value) {
    return this.addMonths(value * 12);
};
Date.prototype.clearTime = function () {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this;
};
Date.prototype.isLeapYear = function () {
    var y = this.getFullYear();
    return(((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0));
};
Date.prototype.between = function (beginDate, end) {
    var ltime = this.getTime();
    var lbegin = 0;
    if (typeOf(beginDate) == "number") lbegin = beginDate;
    else lbegin = beginDate.getTime();
    var lend = 0;
    if (typeOf(end) == "number") lend = end;
    else lend = end.getTime();
    return lbegin < ltime && ltime < lend;
};
//得到当年的第几周 call mt
Date.prototype.getWeekOfYear = function () {
    return new Date().get('week');
};

//--------------------------------------数组
//判断当前环境是否有满足min,max,的环境变量,checkbox 验证的时候使用
//和服务器版本不同,检查表单,服务器版本检查请求变量
Array.prototype.any = function (min, imax) {
    var len = this.length;
    var m = 0;
    for (var i = 0; i < len; i++) {
        var fBox = $(this[i]);
        if (!fBox) continue;
        if ('checkbox' == fBox.getProperty('type').toLowerCase() && fBox.getProperty("checked")) m++;
        else if ('radio' == fBox.getProperty('type').toLowerCase() && fBox.getProperty("checked")) m++;
        else if ('text' == fBox.getProperty('type').toLowerCase() && fBox.get('value') != '') m++;
    }
    if (imax == undefined) return min <= m;
    return min <= m && m <= imax;
};
Array.prototype.sum = function () {
    var a = this;
    if ((a instanceof Array) || // if array
            (a && typeOf(a) == "object" && "length" in a)) { // or array like
        var total = 0;
        for (var i = 0; i < a.length; i++) {
            var element = a[i];
            if (!element) continue;  // ignore null and undefined elements
            if (typeOf(element) == "number") total += element;
            else throw new Error("sum(): all array elements must be numbers");
        }
        return total;
    }
    else throw new Error("sum(): argument must be an array");
};

Array.prototype.max = function () {
    var m = Number.NEGATIVE_INFINITY;
    for (var i = 0; i < this.length; i++)
        if (this[i] > m) m = this[i];
    return m;
};
Array.prototype.min = function () {
    var m = Number.MAX_VALUE;
    for (var i = 0; i < this.length; i++)
        if (this[i] < m) m = this[i];
    return m;
};
Array.prototype.avg = function () {
    var a = this;
    if ((a instanceof Array) || // if array
            (a && typeOf(a) == "object" && "length" in a)) { // or array like
        var m = 0;
        for (var i = 0; i < a.length; i++)
            m = a[i] + m;
        return m / a.length;
    }
    else throw new Error("avg(): argument must be an array");
};
Array.prototype.options = function (sel) {
    return this.options(sel, ":");
};
Array.prototype.options = function (sel, keyf) {
    if (keyf == null || keyf == undefined) keyf = ":";
    var out = "";
    for (var i = 0; i < this.length; i++) {
        if (this[i] == "") continue;
        var hav = this[i].indexOf(keyf);
        if (hav == -1) {
            out = out + "<option value=\"" + this[i] + "\"";
            if (this[i] == sel) out = out + ' selected="selected"';
            out = out + ">" + this[i] + "</option>";
        } else {
            var keys = this[i].substring(0, hav);
            var vars = this[i].substring(hav + 1, this[i].getLength());
            out = out + "<option value=\"" + keys + "\"";
            if (keys == sel) out = out + ' selected="selected"';
            out = out + ">" + vars + "</option>";
        }
    }
    return out;
};
Array.prototype.show = function (sel) {
    if (typeOf(sel) == 'number') sel = sel + '';
    for (var i = 0; i < this.length; i++) {
        if (this[i] == "") continue;
        var hav = this[i].indexOf(":");
        if (hav != -1) {
            var keys = this[i].substring(0, hav);
            if (keys == sel)
                return this[i].substring(hav + 1, this[i].getLength());
        } else if (this[i] == sel) return sel;
    }
    return '';
};
Array.prototype.radio = function (rname, sel) {
    return this.radio(rname, sel, null, ":");
};
Array.prototype.radio = function (rname, sel, style, keyf) {
    if (keyf == null || keyf == undefined) keyf = ":";
    var out = "";
    for (var i = 0; i < this.length; i++) {
        if (this[i] == "") continue;
        var hav = this[i].indexOf(keyf);
        if (hav == -1) {
            out = out + '<label class="radioLabel">';
            out = out + ' <input id="' + rname + i + '" name="' + rname + '" type="radio" value="' + this[i] + '"';
            if (this[i] == sel) out = out + ' checked="checked"';
            if (style && style != "") out = out + ' style="' + style + '" ';
            out = out + ' />' + this[i] + '</label>';
        } else {
            var keys = this[i].substring(0, hav);
            var vars = this[i].substring(hav + 1, this[i].getLength());
            out = out + '<label class="radioLabel">';
            out = out + '<input id="' + rname + i + '" name="' + rname + '" type="radio" value="' + keys + '" ';
            if (keys == sel) out = out + 'checked="checked" ';
            if (style && style != "") out = out + 'style="' + style + '" ';
            out = out + ' />' + vars + '</label>';
        }
    }
    return out;
};
Array.prototype.checkbox = function (rname, sel) {
    return this.checkbox(rname, sel, null, ":");
};
Array.prototype.checkbox = function (rname, selected, style, keyf) {
    if (keyf == null || keyf == undefined) keyf = ":";
    var sel;
    if (typeOf(selected) == "string")
        sel = selected.split(";");
    else sel = selected;
    var out = "";
    for (var i = 0; i < this.length; i++) {
        if (this[i] == "") continue;
        var hav = this[i].indexOf(keyf);
        if (hav == -1) {
            out = out + '<label class="radioLabel">';
            out = out + ' <input id="' + rname + i + '" name="' + rname + '" type="checkbox" value="' + this[i] + '" ';
            if (sel && sel.contains(this[i])) out = out + 'checked="checked" ';
            if (style && style != "") out = out + 'style="' + style + '" ';
            out = out + ' />' + this[i] + '</label>';
        } else {
            var keys = this[i].substring(0, hav);
            var vars = this[i].substring(hav + 1, this[i].getLength());
            out = out + '<label class="radioLabel">';
            out = out + '<input id="' + rname + i + '" name="' + rname + '" type="checkbox" value="' + keys + '"';
            if (sel && sel.contains(keys)) out = out + ' checked="checked" ';
            if (style && style != "") out = out + 'style="' + style + '" ';
            out = out + ' />' + vars + '</label>';
        }
    }
    return out;
};
//将数组转换为ajax请求参数的形式
Array.prototype.toQueryString = function (name) {
    var paramStr = '';
    for (var i = 0; i < this.length; i++) {
        paramStr = paramStr + name + '=' + this[i];
        if (this.length - 1 != i) paramStr = paramStr + '&';
    }
    return paramStr;
};
Array.prototype.toString = function (split) {
    if (this.length <= 0) return '';
    var paramStr = '';
    for (var i = 0; i < this.length; i++) {
        paramStr = paramStr + this[i];
        if (this.length - 1 != i) paramStr = paramStr + split;
    }
    return paramStr;
};
//--------------------------------------全局函数
//最大值
//noinspection JSDuplicatedDeclaration
function max(/* ... */) {
    var m = Number.NEGATIVE_INFINITY;
    for (var i = 0; i < arguments.length; i++)
        if (arguments[i] > m) m = arguments[i];
    return m;
}
//最小值
//noinspection JSDuplicatedDeclaration
function min(/* ... */) {
    var m = Number.MAX_VALUE;
    for (var i = 0; i < arguments.length; i++)
        if (arguments[i] < m) m = arguments[i];
    return m;
}
//合计
//noinspection JSDuplicatedDeclaration
function sum(/* ... */) {
    var m = 0;
    for (var i = 0; i < arguments.length; i++)
        m = arguments[i] + m;
    return m;
}
//平均
//noinspection JSDuplicatedDeclaration
function avg(/* ... */) {
    var m = 0;
    for (var i = 0; i < arguments.length; i++)
        m = arguments[i] + m;
    return m / arguments.length;
}
//是否为josn对象
function isJson(obj){
  return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
}
function getRandom(len) {
    var Num = "";
    for (var i = 1; i <= len; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}

/**
 * 得到url参数，能得到3种url参数
 * 1. 例如：friendlist.jsp#a=3&b=7   得到参数a的值  $g("#","a")
 * 2. 例如：friendlist.jsp#3_7   得到参数a的值  $g("#",1) 得到7  从0开始
 * 3. 例如：friendlist.jsp?a=3&b=7   得到参数a的值  $g("b") 得到7
 *
 */
function $g() {
    var Url = top.window.location.href;
    var u, vname;
    if (arguments[0] == "#") {
        u = Url.split("#");
        if (arguments[1] == '*') return u[1];
        var bq = "";
        if (u[1] && u[1].indexOf('_') != -1) bq = u[1].split("_");
        if (typeOf(arguments[1]) == 'number' && bq.length >= arguments[1]) return bq[arguments[1]];
        vname = arguments[1] + "=";
    }
    else {
        u = Url.split("?");
        vname = arguments[0] + "=";
    }
    if (u.length <= 1) g = '';
    else g = u[1];
    if (g != '') {
        gg = g.split("&");
        for (i = 0; i < gg.length; i++) {
            var indexof = gg[i].indexOf(vname);
            if (indexof == 0) {
                return gg[i].substring(vname.length, gg[i].length);
            }
        }
    }
    return '';
}
/**
 * iframe自适应高度
 * iframeHeightBind.periodical(1000,"plist");
 */
var iframeHeightBind = function () {
    var iframe = false;
    if (typeOf(this) == 'string') iframe = document.getElementById(this);
    else iframe = this;
    var bugFix = new Element('div', {
        'styles': {
            'clear': 'both'
        }
    });
    var height = 0;
    if (Browser.name=='ie'&& iframe.Document && iframe.Document.body && iframe.Document.body.scrollHeight) //ie5+ syntax
    {
        height = iframe.Document.body.scrollHeight;
    } else {
	    var innerDoc = iframe.contentDocument ? iframe.contentDocument : iframe.contentWindow.document;
        if (innerDoc && innerDoc.body) {
            if (!innerDoc.body.offsetHeight && innerDoc.body.adopt) innerDoc.body.adopt(bugFix);
            height = innerDoc.body.offsetHeight;
        }
    }
    height = height + height*0.1;  //加上滚动边
    if (Browser.name=='ie') 
	{
		if (Browser.version==6)	height = height + 42;  //IE6
		else  height = height + 24;
	}
    if (height < 200) height = window.screen.availHeight;
    iframe.height = height;
};
//得到鼠标事件的当前坐标，
window.document.mousePos = function (event) {
    var event = event || window.event;
    if (!event) return{x: window.screen.availWidth / 2.5, y: window.screen.availHeight / 4};
    return {
        x: event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
        y: event.clientY + document.body.scrollTop + document.documentElement.scrollTop
    };
};
//同时兼容ie和ff的写法
window.document.getEvent = function () {
    if (document.all) return window.event;
    func = window.document.getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0)
            if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation))
                return arg0;
        func = func.caller;
    }
    return window.event;
};
//设置div居中,iwin 为高度偏移量
window.document.centerPosition = function (divSide, iwin) {
    if (!divSide || typeOf(divSide) != 'element') return;
    if (!iwin) iwin = 1;
    var doc = divSide.getParentDocument();
    var scrollTop = doc.scrollTop;
    if (scrollTop == 0) {
        scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : window.pageYOffset;
    }
    if (!scrollTop) scrollTop = 0;
    var left = doc.offsetWidth - divSide.offsetWidth;
    var top = scrollTop + (doc.clientHeight - divSide.offsetHeight)/3;
    var le = left / 2 - 40;
    divSide.setStyle('left', le < 0 ? left : le);
    divSide.setStyle('top', top + iwin);
};
//得到屏幕宽高
window.document.getPosition = function () {
    var doc = document.documentElement;
    if (doc && doc.clientHeight) {
        return {x: (doc.clientWidth > doc.scrollWidth) ? doc.clientWidth - 1 : doc.scrollWidth,
            y: (doc.clientHeight > doc.scrollHeight) ? doc.clientHeight : doc.scrollHeight};
    }
    else {
        return {x: (window.innerWidth > doc.scrollWidth) ? window.innerWidth : doc.scrollWidth,
            y: (window.innerHeight > doc.scrollHeight) ? window.innerHeight : doc.scrollHeight};
    }
};

/**
 * 扩展mootools
 * deleteOptions 删除select 单元 中的选项
 * setOptions 设置 option
 */
Element.implement({
    index: function () {
        var sib = this.getParent().getChildren();
        for (var i = 0; i < sib.length; i++) {
            if (sib[i] == this) {
                sib = null;
                return i;
            }
        }
    },
    centerPosition: function (iWin) {
        window.document.centerPosition(this, iWin);
    },
    deleteOptions: function () {
        if (this.tagName.toLowerCase() == "select") {
            var selLen = this.options.length;
            var i = 0;
            if (Browser.name=='ie')
                for (i = 0; i < selLen; i++)
                    this.options.remove(0);
            else
                for (i = 0; i < selLen; i++)
                    this.remove(0);
            this.options.length = 0;
        } else alert(this.id + "错误的输入框类型");
    },
    setOptions: function (array, sel, keyf) {
        if (typeOf(array) == 'array')
            array.setOptions(this, sel, keyf);
        else
            array.split(";").setOptions(this, sel, keyf);
    },
    sendBind: function (bindId) {
        this.set('send', {onComplete: function (response) {
            var tagName = $(bindId).get('tag');
            if ("input" == tagName.toLowerCase() || "textarea" == tagName.toLowerCase())
                $(bindId).set('value', response);
            else if ("div" == tagName.toLowerCase() || "span" == tagName.toLowerCase())
                $(bindId).set('html', response);
            else if ("select" == tagName.toLowerCase())
                $(bindId).setOptions(response.toArray());
        }});
        this.send();
    },
    setSelected: function (v) {
        var selLen = this.options.length;
        for (var i = 0; i < selLen; i++) {
            if (this.options[i].value == v) {
                this.selectedIndex = i;
                return;
            }
        }
    },
    getParentDocument: function () {
        var doc = false;
        var useEl = document.documentElement ? true : false;
        if (self.frameElement && self.frameElement.tagName == "IFRAME") {
            if (useEl) doc = window.parent.document.documentElement;
            else doc = window.parent.document.body;
            return doc;
        } else {
            if (useEl) doc = window.document.documentElement;
            else doc = window.document.body;
            return doc;
        }
    },
    getWidth: function () {
        var width = this.getStyle('width');
        if ('NaN' == width || 'auto' == width) {
            if (Browser.name=='chrome')
                width = document.defaultView.getComputedStyle(this, null)['width'];
            if (navigator.userAgent.toLowerCase().indexOf('trident') != -1)
                width = this.currentStyle['width'];
            if ('NaN' == width || 'auto' == width)
                width = this.offsetWidth;
        }
        if (typeOf(width) == 'string')
            width = width.toInt();
        return width;
    }
});
function getRadioValue(name) {
    var radios = false;
    if (typeOf(name) == 'string') radios = $$(name);
    else radios = name;
    for (var r = 0; r < radios.length; r++) {
        if (radios[r].getProperty("checked")) {
            return radios[r].get('value');
        }
    }
    return null;
}

function getCheckboxValue(name) {
    var radios = false;
    if (typeOf(name) == 'string') radios = $$(name);
    else radios = name;
    var sel= [];
    radios.each(function(item){
        if(item.checked==true) sel.push(item.get('value'));
    });
    return sel;
}

function getCheckboxCount(name) {
    var radios = false;
    if (typeOf(name) == 'string') radios = $$(name);
    var s = 0;
    radios.each(function(item){
        if(item.checked==true) s++;
    });
    return s;
}


//-------------------------验证请求
Request.ROC = new Class({
    Extends: Request.JSON,
    options: {
        method: 'POST', //必须
        encoding: 'UTF-8',
        link:'cancel',
		async:true,
        headers: {'X-Requested-With': 'jspx.net-roc'}
    },
    initialize: function (options) {
        if (typeof(options.data) != 'string')
        {
            options.data = JSON.encode(options.data);
        }

		options.onError=function(text, error)
		{
			document.body.innerHTML=
			'<!DOCTYPE html><html lang="zh"><head><meta charset="UTF-8"><title>'+ error+
			'</title></head><body><div class="container">'+
			text + '</div></body></html>';
		}
        this.parent(options);
    }
});
//--------------------------------------------------加密方式发送
Request.SECRET = new Class({
    Extends: Request.JSON,
    options: {
        method: 'POST', //必须
        encoding: 'UTF-8',
        async:true,
        link:'chain',
        headers: {'X-Requested-With': 'jspx.net-secret-roc'}
    },
    initialize: function (options) {
        var enData = null;
        if (typeof(options.data) != 'string')
        {
            enData = JSON.encode(options.data);
        }
        var k1 = getRandom(16)+'';
        var iv = getRandom(16)+'';
        data = encryptAEC_CBC_Pkcs7(enData,k1,iv);
        var ps = k1+'-'+iv;

        var key = encryptRSA(ps,pubK);
        var posts = {
            "keyType": "rsa",
            "dataType":"aes",
            "key": key,
            "data": data
        };
        options.data = JSON.encode(posts);
        options.onError=function(text, error)
        {
            document.body.innerHTML=
                '<!DOCTYPE html><html lang="zh"><head><meta charset="UTF-8"><title>'+ error+
                '</title></head><body><div class="container">'+
                text + '</div></body></html>';
        }
        this.parent(options);
    }
});
//-------------------------拖动上传，html5才支持
Request.DropUpload = new Class({
    Implements: [Options, Events],
    options: {
        encoding: 'UTF-8',
        step: 1024,
        fileType:'image'
        //onSuccess
        //oneError
    },
    initialize: function (container, options) {
        this.setOptions(options);
        this.container = container;
        if (typeof(this.container) == 'string') this.container = $(this.container);
        if (!window.FormData)
        {
            this.container.setStyle('display','none');
            return;
        }
        var sf = this;
        //拖进
        this.container.addEventListener('dragenter', function (e) {
            e.preventDefault();			
        }, false);

        //拖来拖去 , 一定要注意dragover事件一定要清除默认事件
        //不然会无法触发后面的drop事件
        this.container.addEventListener('dragover', function (e) {
            e.preventDefault();
        }, false);

        this.container.addEventListener('drop', function (e) {
            e.preventDefault();
            sf.dropHandler(e);
			
        }, false);

		if(this.container.get('type')=='file') this.container.addEventListener('change', function(){
		    sf.fileList = [];
			for (var i = 0; i <this.files.length; i++)
			{
				sf.fileList.push(this.files[i]);
			}
			sf.readFileUpload();
		}, false);

    },
    dropHandler: function (e) {
        //检测是否是拖拽文件到页面的操作
        if (e.dataTransfer.files.length < 0) return;
        this.fileList = [];
        for (var i = 0; i < e.dataTransfer.files.length; i++)
        {
            if (e.dataTransfer.files[i].type.indexOf(this.options.fileType)!=-1)
                this.fileList.push(e.dataTransfer.files[i]);
        }
        //将文件读取到内存
        this.readFileUpload();
    },
    uploadFile: function () {
        var request = new Browser.Request();
        request.open("POST", this.options.url, true);
        request.overrideMimeType("application/octet-stream");
        request.setRequestHeader('Content-Disposition', 'form-data; name="filedata"; fileame="' + unescape(encodeURIComponent(this.file.name)) + '"');
        var formData = new FormData();
        formData.append('sessionId',this.options.sessionId);
        formData.append('submit','submit');
        formData.append('Filename',this.file.name);
        formData.append('Filedata',this.file);
        var sf = this;
        request.upload.addEventListener('load', function () {
            sf.file = false;
            sf.readFileUpload();
        });
        request.onreadystatechange=function() {
            if (request.readyState == 4) {
                if (request.status == 200)
                {
                    sf.fireEvent('success', [(sf.file.name + sf.file.length), request.responseText]);
                } else {
                    sf.fireEvent('error', sf.file.name);
                }
            }
        };
        request.send(formData);
    }
    ,
    readFileUpload: function () {
        if (this.fileList.length > 0) {
            this.file = this.fileList.shift();
        }
        if (this.file) this.uploadFile();
    }
});

//-------------------------验证请求
Request.Validator = new Class({
    Extends: Request.JSON,
    options: {
        secure: true,
        method: 'GET', //必须
        link: "chain",
        requestParam: false,
        result: "json",
        evalResponse: false
    },
    initialize: function (url) {
        this.formId = url.getFileName().substringBefore(".");
        this.from = window.document.getElementById(this.formId);
        if (url.indexOf('validator')==-1&&!url.startsWith('/'))
        {
            var urls = window.location.pathname.toArray("/");
            this.options.url = "/"+urls[1] + "/validator/" + url;
        } else {
            this.options.url = url;
        }
        this.options.onSuccess = this.onSuccess;
        this.options.onFailure = this.showErrorMessage;
        this.options.onException = this.showErrorMessage;
        this.parent(this.options);
        this.send();
    },
    onSuccess: function (data) {
        this.jsonData = data;
        this.checkLocal = false;
        var vObj = this;
        var getValidField = function (field) {
            //返回配置
            if (typeOf(field) == 'array') {
                for (var i = 0; i < vObj.jsonData.length; i++) {
                    var vf = vObj.jsonData[i];
                    for (var j = 0; j < field.length; j++) {
                        if (vf.field.indexOf(';') != -1 && vf.field.toArray(";").contains(field[j])) {
                            return vf;
                        } else if (field[j] == vf.field) {
                            return vf;
                        }
                        var dot = field[j].indexOf(vf.field);
                        if (dot != -1) {
                            return vf;
                        }
                        if (field[j] == vf.field || dot == 0 && field[j].substring(vf.field.length, field[j].length).isNumber()) return vf;
                    }
                }
            } else {
                for (var i = 0; i < vObj.jsonData.length; i++) {
                    var vf = vObj.jsonData[i];
                    if (vf.field == field) return vf;
                }
            }
            alert(field + ":没有找到对应的验证配置");
            return null;
        };
        var validFocus = function () {
            var vx = getValidField(this.get('id'));
            var input = $(vx.noteId);
            if (!input) alert(vx.noteId + ",没有定义|not define");

            if ((!vx.note||vx.note=='')&&vx.noteId) vx.note = $(vx.noteId).get('html');
            input.set("html", vx.note);
        };

        var validBlur = function () {
            //如果是多选，这里的this是数组
            var vx = getValidField(this.get('id'));
            if (!vx) {
                alert(this.get('id') + "没有定义相关验证配置");
                return;
            }

            //验证 -1:不通过 0:不需要验证 1:验证通过
            var needed = vx.required;
            var checkValue = "";
            //选择

            if (vx.dataType == 'radio')
            {
                var boxs = false;
                if (vx.field.indexOf(";") != -1) {
                    boxs = $$(vx.field.selectors(';'));
                }
                else boxs = $$('input[name=' + vx.field + ']');
                if (boxs) checkValue = getRadioValue(boxs);
                if (checkValue && checkValue != '') {
                    vObj.putMessage(vx, 1);
                    return 1;
                } else {
                    vObj.putMessage(vx, -1);
                    return -1;
                }
            } else
            if (vx.dataType == 'checkbox') //多选方式
            {
                var boxs = false;
                if (vx.field.indexOf(";") != -1) {
                    boxs = $$(vx.field.selectors(';'));
                }
                else boxs = $$('input[name=' + vx.field + ']');
                for (var r = 0; r < boxs.length; r++) {
                    if (boxs[r].getProperty("checked")) {
                        checkValue = boxs[r].get('value');
                        break;
                    }
                }
            } else
            {
                var tel = $(vx.field);
                if (tel) checkValue = tel.get('value');
                else alert(vx.field + '配置不正确');

            }

            if (!needed && checkValue == "") return 0;
            var url = vx.url;
            if (!vObj.checkLocal && url) {
                vObj.putMessage(vx, -1);
                //服务器检查
                vx.value = encodeURI(checkValue);
                url = url.substitute(vx);
                new Request({
                    method: 'POST',
                    url: url,
                    onSuccess: function (msg) {
                        if ('success' == msg)  vObj.putMessage(vx, 1);
                        else vObj.putMessage(vx, -1, msg);
                    }
                }).send('r=' + (Math.random() * 10000));

            } else {
                //本地js检查
                var dataType = vx.dataType;
                var expression = "";
                if (dataType.startsWith("(")) expression = dataType;
                else {
                    expression = "checkValue." + dataType;
                    if (!dataType.endWith(")") && !dataType.indexOfArray([">", "<", "=", "+", "-", "*", "/"])) expression = expression + "()";
                }

                var cv = false;
                try {
                    cv = eval(expression);
                } catch (e) {
                    alert(vx.field + ' 字段验证错误或html错误,联系管理人员, is error ' + this.get('name') +","+ e);
                }
                try {
                    if (cv||cv=='true') vObj.putMessage(vx, 1);
                    else vObj.putMessage(vx, -1);
                } catch (e) {
                    alert(vx.field + ' 字段配置错误或html错误,联系管理人员, is error ' + this.get('name') + e);
                    vObj.putMessage(vx, -1);
                }
            }
        };

        var doSubmit = function () {
            vObj.checkLocal = true;
            vObj.jsonData.each(function (vx) {
                if (vx.dataType == 'radio' || vx.dataType == 'checkbox') {
                    var boxs = false;
                    if (vx.field.indexOf(";") != -1) {
                        boxs = $$(vx.field.selectors(';'));
                    }
                    else boxs = $$('input[name=' + vx.field + ']');
                    if (boxs && boxs[0])  boxs[0].fireEvent('blur');
                } else {
                    var box = $(vx.field);
                    if (box) box.fireEvent('blur');
                }
            });
            vObj.checkLocal = false;
            var canDo = 0;
            var fields = '';
            vObj.jsonData.each(function (vx) {
                var tips = $(vx.noteId);
				if (tips&&tips.hasClass("error")) 
				{
					fields = fields + vx.field + ';';
					canDo++;
				}
            });
            if (canDo == 0) return true;
            var msgEl = $(vObj.formId + 'Msg');
            if (msgEl) msgEl = $('information');
            if (msgEl)   msgEl.grab(new Element('li', {'html': 'Error:有' + canDo + '个没有正确填写,  not fill out'}));
            else alert(canDo + ':个填写错误,请检查有错误标识的字段,not input:' + fields);
            return false;
        };

        this.jsonData.each(function (vx) {
            //添加必填标记
            if (vx.required == true) {
                var lab = $$('label[for='+ vx.field +']');
                if (lab) lab = lab[0];
                if (lab) {
                    var labHtml = lab.get('html');
                    if (labHtml.indexOf('<em>') == -1)
                        lab.set('html',labHtml+'<em>*</em>');
                }
            }
            var field = vx.field;
            if (vx.dataType == 'radio' || vx.dataType == 'checkbox') {
                var boxs = false;
                if (vx.field.indexOf(";") != -1) {
                    boxs = $$(vx.field.selectors(';'));
                }
                else boxs = $$('input[name=' + vx.field + ']');
                if (boxs) {
                    if (vx.checkbox || vx.radio)
                        boxs.addEvent('click', validBlur.bind(boxs));
                    else {
                        boxs.addEvent('focus', validFocus.bind(boxs));
                        boxs.addEvent('blur', validBlur.bind(boxs));
                    }
                }
            } else {
                if (field && field.indexOf(';') != -1) {
                    var checkField = '';
                    var fields = field.toArray(";");
                    for (var r = 0; r < fields.length; r++) {
                        checkField = checkField + '#' + fields[r];
                        if (r != fields.length - 1) checkField = checkField + ',';
                    }
                    field = checkField;
                }
                var box = null;
                if (field.indexOf('#') != -1) {
                    box = $$(field);
                    vx.checkbox = true;
                } else  box = $(field);
                if (!box) {
                    box = $$('input[name=' + field + ']');
                    if (box) {
                        vx.checkId = box.get('id').toString().replace(/,/g, ";");
                        vx.radio = true;
                    }
                    else alert(field + ":表单没有 radio 找到,(input radio not find)");
                }
                if (!box) {
                    alert(field + ":表单没有找到,(input not find)");
                    return;
                }
                if (box) {
                    if (vx.checkbox || vx.radio)
                        box.addEvent('click', validBlur.bind(box));
                    else {
                        box.addEvent('focus', validFocus.bind(box));
                        box.addEvent('blur', validBlur.bind(box));
                    }
                }
            }
        });
        if (this.from) this.from.onsubmit = doSubmit;
        else alert(fromId + " no find from id");
    },
    showErrorMessage: function (info) {
        var msgEl = $("information");
        if (msgEl != undefined && msgEl.tagName != undefined) {
            msgEl.set("html", info);
        }
    },
    putMessage: function (vx, state, msg) {
        var tips = $(vx.noteId);
        if (msg) {
            tips.set("html", msg);
            if (state == -1) {
                tips.set("class", "error");
            } else {
                tips.set("class", "note");
            }
        } else {
            if (state == -1) {
                tips.set("class", "error");
                tips.set("html", vx.error);
            }
            else if (state == 0) {
                tips.set("class", "note");
                tips.set("html", vx.note);
            }
            else {
                tips.set("class", "pass");
                tips.set("html", "<i class=\"jIcoCorrect\"></i>");
            }
        }
    }
});
//验证对象Form 做为一个单元
//-------------------------帮助请求
Request.Helper = new Class({
    Extends: Request.JSON,
    options: {
        container: "#helpTip",
        button: "#helpButton",
        secure: true,
        method: 'GET', //必须
        link: "chain",
        requestParam: false,
        result: "json",
        evalResponse: false
    },
    initialize: function (url) {
        this.helpId = url.getFileName().substringBefore(".");
        this.container = this.options.container;
        this.button = this.options.button;
        if (typeof(this.container) == 'string') this.container = $(this.container);
        if (typeof(this.button) == 'string') this.button = $(this.button);

        if (url.indexOf('help')==-1)
        {
            var urls = window.location.pathname.toArray("/");
            this.options.url = "/"+urls[1] + "/help/" + url;
        } else {
            this.options.url = url;
        }
        this.options.onSuccess = this.onSuccess;
        this.options.onFailure = this.showErrorMessage;
        this.options.onException = this.showErrorMessage;
        this.parent(this.options);
        var her = this;
        if (this.container&&this.button)
        {
            var helpSlide = new Fx.Slide(this.container).hide();
            this.button.addEvent('click', function(event){
                event.stop();
                if (her.container.get('html')!='')  req.send();
                helpSlide.toggle();
            });
        }
    },
    onSuccess: function (data) {
        //<div id="helpTip">
        var value = '<div class="tit">使用帮助：</div><div class="con">' + data.content +'</div>';
        this.container.set('html',value);

    },
    showErrorMessage: function (info) {
        var msgEl = $("information");
        if (msgEl != undefined && msgEl.tagName != undefined) {
            msgEl.set("html", info);
        }
    }
});

//-----------------------
  
//获取指定form中的所有的<input>对象  
function getFormJson(formId){
		var res = {},	//存放结果的数组
		current = null,	//当前循环内的表单控件
		i,	//表单NodeList的索引
		len, //表单NodeList的长度
		k,	//select遍历索引
		optionLen,	//select遍历索引
		option, //select循环体内option
		optionValue;	//select的value

		var form = $(formId);	//用form变量拿到当前的表单，易于辨识
	
	for(i=0, len=form.elements.length; i<len; i++){
		
		current = form.elements[i];
		
		//disabled表示字段禁用，需要区分与readonly的区别
		if(current.disabled) continue;
		
		switch(current.type){
			
			//可忽略控件处理
			case "file":	//文件输入类型
			case "submit":	//提交按钮
			case "button":	//一般按钮
			case "image":	//图像形式的提交按钮
			case "reset":	//重置按钮
			case undefined:	//未定义
				break;
			
			//select控件
			case "select-one":
			case "select-multiple":
				if(current.name && current.name.length){
					console.log(current)
					for(k=0, optionLen=current.options.length; k<optionLen; k++){

						option = current.options[k];
						optionValue = "";
						if(option.selected){
							if(option.hasAttribute){
								optionValue = option.hasAttribute('value') ? option.value : option.text
							}else{
								//低版本IE需要使用特性 的specified属性，检测是否已规定某个属性
								optionValue = option.attributes('value').specified ? option.value : option.text;	
							}
							res[current.name]=optionValue
						}
					}
				}
				break;
				
			//单选，复选框
			case "radio":
			case "checkbox":
				//这里有个取巧 的写法，这里的判断是跟下面的default相互对应。
				//如果放在其他地方，则需要额外的判断取值
				if(!current.checked) break;
			
			default:
				//一般表单控件处理
				if(current.name && current.name.length){
					res[current.name]=current.value;
				}
			
		}
	}
	return res;
}
