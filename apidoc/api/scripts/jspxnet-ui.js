/**
 * 版权说明,你可以任意的拷贝,发布,修改本js代码.但对于修改后的代码修改 必须发一份到39793751@qq.com
 * 这样方便我在后期升级考虑
 * jspxnet.js 4.0 for mootools 1.5
 * chenYan
 * 本js库包含了基本常用的js组件，均使用mootools 开发完成
 * 主要包括:
 * tag输入框，进度条,日历样式 .calendar  简单颜色选择 .colorBox max,窗口 window,表格，文件表格,树
 *
 */
//保存当前选择的行
/*
 //表头Cation
 var hcaption = ["排序","开始HTML","结束HTML","目标字段","字段类型","不重复","常量-表达式","删除"];
 var varNames =[
 {name:"sortType",input:"input"},
 {name:"fieldStartTag",input:"text"},
 {name:"fieldEndTag",input:"text"},
 {name:"toField",input:"select",option:"one;two;three"},
 {name:"fieldType",input:"select",option:"string;int;float;double;date"},
 {name:"fieldCheck",input:"checkbox",option:"1"},
 {name:"fieldExpression",input:"text"}
 jtable = new TableBind({id:"表格ID",heads:hcaption});
 cbutton 将判断数据有无 出现 陈原
 */
function $clear(timer){
   clearTimeout(timer);
   clearInterval(timer);
   return null;
}
//为了兼容老版本 end
 
//比较颜色 #ff000 形式和 rgb(255,0, 0) 比较
String.prototype.compareColor = function(color) {
    if (this == color) return true;
    if (this == null || color == null) return false;
    if (this.toLowerCase().replace(/ /g, '') == color.toLowerCase().replace(/ /g, '')) return true;
    var tempColor = false;
    if (this.toLowerCase().indexOf("rgb") == -1 && this.length > 1) {
        tempColor = this.hexToRgb();
        if (!tempColor) return false;
        tempColor = tempColor.toLowerCase().replace(/ /g, '');
        return (tempColor == color.toString().toLowerCase().replace(/ /g, ""));
    }
    if (color.toLowerCase().indexOf("rgb") == -1 && color.length > 1) {
        tempColor = color.hexToRgb();
        if (!tempColor) return false;
        tempColor = tempColor.toLowerCase().replace(/ /g, '');
        return (tempColor == this.toString().toLowerCase().replace(/ /g, ""));
    }
};
//交换表格的两列
function swapTableCell(mytable, startCell, endCell) {
    if (startCell == endCell) return;
    var oTBody = mytable.tBodies[0];
    for (var i = 0; i <= oTBody.rows.length; i++) {
        swapNode(mytable.rows.item(i).cells[startCell], mytable.rows.item(i).cells[endCell]);
    }
}
//firefox 交换节点,IE有
function swapNode(node1, node2) {
    var parent = node1.parentNode;//父节点
    var t1 = node1.nextSibling;//两节点的相对位置
    var t2 = node2.nextSibling;
 
    //如果是插入到最后就用appendChild
    if (t1) parent.insertBefore(node2, t1);
    else parent.appendChild(node2);
    if (t2) parent.insertBefore(node1, t2);
    else parent.appendChild(node1);
}
//创建表单对象
function createInputElement(vinput, svalue) {
    if (svalue == null||svalue == '&nbsp;') svalue = '';
    var myAnchor = false;
    if (!vinput.input) alert('type .input no definition,表格头部没有定义');
    if (vinput.input == "button" || vinput.input == "cbutton") {
        if (vinput.input == "cbutton" && (svalue == ''|| svalue == '0'))
        {
            myAnchor = new Element('div',{html:'&nbsp;'});
        } //如果无数据
        else if (vinput.blink) {
            //如果要新窗口使用函数方式
            myAnchor = new Element('a', {'class':'jDefButton',href:vinput.blink,'html':vinput.caption});
            if (vinput.caption && vinput.caption.indexOf('|') != -1)
                myAnchor.adopt(new Element('i', {'class':vinput.type,html:vinput.caption.substring(vinput.caption.indexOf('|') + 1, vinput.caption.length)}));
            else myAnchor.adopt(new Element('i', {'class':vinput.type}));
        }
    } else
    if ('textarea' == vinput.input) {
        myAnchor = new Element('textarea', {rows:1,name:vinput.name,value: svalue});
    } else
    if ('select' == vinput.input) {
        myAnchor = new Element('select', {name:vinput.inputName?vinput.inputName:vinput.name});
        myAnchor.setOptions(vinput.option, svalue);
    } else
    if ('selectView' == vinput.input) {
        myAnchor = new Element('select', {name:vinput.inputName?vinput.inputName:vinput.name});
        myAnchor.setOptions(svalue, vinput.option);
		
    }
    else
    if ('urlDialog' == vinput.input) {
        myAnchor = new Element('input', {type:'text',name:vinput.inputName?vinput.inputName:vinput.name,'class':'colorBox',value:svalue});
    } else
    if ('selectbox' == vinput.input.toLocaleLowerCase()) {
        myAnchor = new Element('input', {type:'checkbox',name:vinput.inputName?vinput.inputName:vinput.name,value:svalue});
    } else
    if ('checkbox' == vinput.input) {
        myAnchor = new Element('input', {type:vinput.input,name:vinput.inputName?vinput.inputName:vinput.name,value:svalue});
        if (this.options) {
            var selectArray = vinput.options;
            if (typeOf (this.options) == 'string')
                selectArray = vinput.options.split(";");
            if (typeOf(selectArray) == 'array' && selectArray.contains(svalue))
                myAnchor.set('checked', 'checked');
        }
    } else
    if ('color' == vinput.input) {
        myAnchor = new Element('input', {type:'text',name:vinput.inputName?vinput.inputName:vinput.name,'class':'colorBox',value:svalue});
    } else
    if ('date' == vinput.input||'calendar' == vinput.input) {
        myAnchor = new Element('input', {type:'text','class':'calendar',name:vinput.inputName?vinput.inputName:vinput.name,value:svalue});
    } else
    if ('text' == vinput.input) {
        myAnchor = new Element('input', {type:vinput.input,name:vinput.inputName?vinput.inputName:vinput.name,value: svalue});
    } else
    if ('img' == vinput.input) {
        myAnchor = new Element('img', {type:vinput.input,name:vinput.inputName?vinput.inputName:vinput.name,src: svalue});
    } else
    if ('img_button' == vinput.input) {
 
        myAnchor = new Element('a', {'href':vinput.blink});
        myAnchor.adopt(new Element('img', {type:vinput.input,name:vinput.inputName?vinput.inputName:vinput.name,src: vinput.image}));
    } else
    {
        myAnchor = new Element('div',{html:'&nbsp;'});
    }
    return myAnchor;
}
//得到表格单元中的值
function getTableCellValue(tableCell, fixed) {
    var tempEl = tableCell.getElement("input");
     if (tempEl) return tempEl.get("value");
     var result = '';
    tempEl = tableCell.getElement("textarea");
     if (tempEl) 
    {
       result=tempEl.get("value"); 
       if (fixed && result)
               return result.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
       else return result;
    }
    tempEl = tableCell.getElement("select");
     if (!tempEl)       tempEl = tableCell.getElement("checkbox");
    if (tempEl) return tempEl.get("value");
     return tableCell.get('html');
}
//判断单选或多选框是否选择
function getTableCellChecked(tableCell) {
    var fnp = tableCell.innerHTML;
    if (Browser.name=='ie') {
        var tempEl = new Element('div', {'html': fnp});
        if (tempEl.getElement("input"))
            return tempEl.getElement("input").get("checked");
    } else {
        if (tableCell.getElement("input"))
            return tableCell.getElement("input").get("checked");
    }
    return false;
}
//类型转换
function convert(sValue, sDataType) {
    switch (sDataType) {
        case "number":
            if (sValue == null) return 0;
            return sValue.trim().toNumber() || 0;
        case "text":
            if (sValue == null) return 0;
            if (sValue.length > 40) return sValue.cut(40);
            return sValue.trim() || "";
        case "color":
            if (sValue == null) return 0;
            var tempColor = sValue;
            if (sValue.toLowerCase().indexOf("rgb") == -1 && sValue.length > 1)
                tempColor = color.hexToRgb();
            return tempColor.replace('rgb', '').replace(/ /g, '').replace(/, /g, '').trim().toInt() || 0;
        case "date":
            if (sValue == null) return 0;
            return sValue.toDate().getTime() || 0;
        default:
            if (sValue == null) return "";
            return sValue() || "";
    }
}
//-----------------------------颜色输入框
var ColorBox = new Class({
    Implements: Options,
    options: {
        ptag:'body',
        colorBoxCss:'.colorBox',
        option: 'default',
        images: '/script/images/color.png'
    },
    initialize: function(options) {
        this.setOptions(options);
        if (!this.ptag) this.ptag = "body";
 
    },
    cssInit:function() {
        if (!this.options.option || this.options.option == "default") this.options.option = "#000000;#B0B0B0;#F0F0F0;#FFFFFF;#F00000;#FFE0E0;#00cc00;#0FF0C0;#00ccFF;#bbF000;#0000BB;#B111B1;#BBBB00;#FFFF00;#FFBB00;#FF00FF";
        var cr = this;
        var colorBoxCss = cr.options.colorBoxCss;
        $$(cr.ptag.toLowerCase() + " " + colorBoxCss).each(function(cbox) {
            if (cbox.get('colorInit')) return;
            cbox.set('colorInit',true);
 
            var imgBox = new Element('img', {'src':cr.options.images,'class':'jSelectButton'});
            imgBox.inject(cbox, 'after');
            if (cbox.hasClass('max'))
            {
                imgBox.addEvent('click', function(event) {
                    var dialog = new JDialog.Color({
                        'title': '颜色对话框 Color',
                        'callback': function (_confirmed) {
                            cbox.set('value', _confirmed);
                            cbox.setStyle("background-color", cbox.value);
                            cbox.focus();
                        }
                    });
                    dialog.show();
                });
            } else imgBox.addEvent('click', function(event) {
                event.stop();
                var colorPaneId = cbox.id + '_colorPanel';
                var colorPane = $(colorPaneId);
                if (colorPane) return false;
                var position = cbox.getPosition();
                var positionX = position.x;
                var pDiv = cbox.getParent();
                if (pDiv) 
               {
                   positionX = position.x + pDiv.scrollLeft;
               }
                colorPane = new Element('div', {id:colorPaneId,'class': 'colorPanel',styles:{position: "absolute",left:positionX + "px", top: (position.y+20) + "px"}});
                colorPane.adopt(new Element('span'));
               window.document.body.adopt(colorPane);
 
                var colArray = cr.options.option.split(";");
                for (var i = 0; i < colArray.length; i++) {
                    var col = colArray[i];
                    colorPane.adopt(new Element('div',
                    {
                        styles:
                        {
                            'background-color':col
                        },
                        events:
                        {
                            mouseover: function(event) {
                                var selColor = this.getStyle("background-color");
                                colorPane.getElement("span").setStyle("background-color", selColor);
                            }
                            ,
                            click: function(event) {
                                var selColor = colorPane.getElement("span").getStyle("background-color");
                                cbox.set("value", selColor);
                                cbox.setStyle("background-color", cbox.value);
                                cbox.focus();
                                colorPane.destroy();
                            }
                        }
                    }));
                }
                colorPane.addEvent('mouseleave', function(event) {
                   this.destroy();
                });
                //拖动
                colorPane.makeDraggable({
                        onStart:function() {
                           this.element.setStyle('opacity',0.5);
                        },
                        onComplete: function() {
                           this.element.setStyle('opacity',1);
                        }
                });
            });
            //addEvent end
        });
    }
});
//----------------只能输入数字并且可以滑动选择
var RangeInput = new Class({
    Implements: Options,
    options: {
        ptag:'body',
        rangeCss:'input.range',
        option: 'default',
        backgroundColor:'#CAD8F3',
        lightColor:'#598BEC',
        images: '/script/images/color.png'
    },
    initialize: function(options) {
        this.setOptions(options);
        var ri = this;
        var inputArray = $$(this.options.rangeCss);
        if (inputArray)
        {
            inputArray.addEvent('keyup', function() {
                if (!this.get('value').isNumber()) {
                    var v = this.get('value');
                    if (v == '') this.set('value',this.get('defaultValue'));
                    else {
                        var showV = '';
                        for (var i = 0; i < v.length; i++) {
                            var sv = v.charAt(i) + "";
                            if (sv.isInteger())
                                showV = showV + sv;
                        }
                        if (showV == '') this.set('value', this.get('defaultValue'));
                        else  this.set('value', showV);
                    }
                }
                var value = this.get('value');
                var min = this.get('min');
                var max = this.get('max');
                if (min && max)
                    this.set('value', value.toInt().limit(min.toInt(), max.toInt()));
            });
 
            inputArray.each(function(e){
                e.setStyles({'float':'left','width':'50px'});
                var v = e.get('value')?e.get('value').toInt():e.get('min')?e.get('min').toInt():0;
                var sliderWidth = e.get('sliderWidth');
                if (!sliderWidth&&e.getStyle('width').toInt()>50) sliderWidth = e.getStyle('width').toInt() - 50;
                else  sliderWidth = 100;
 
                var sliderEl = new Element('div', {styles:{'float':'left', 'margin':0,padding:0,'height':'21px','width':sliderWidth+'px','border-bottom':'1px solid #BBB'}});
                var blackEl = new Element('div', {'align':'center',styles:{'cursor':'pointer', 'margin':0, 'padding':0,'height':'21px','vertical-align':'top', width:'16px','background-color':ri.options.backgroundColor}});
 
                blackEl.addEvent('mouseover', function() {
                    this.setStyle('background-color',ri.options.lightColor);
                });
                blackEl.addEvent('mouseleave', function() {
                    this.setStyle('background-color',ri.options.backgroundColor);
                });
 
                sliderEl.adopt(blackEl);
                sliderEl.inject(e, 'after');
                if (Browser.name=='chrome') sliderEl.setStyle('margin-top',3);
                var steps = e.get('max');
                if (steps==null||!steps) steps = 10000;
                else steps = steps.toInt();
 
                new Slider(sliderEl,blackEl, {
                    steps: steps,  // Steps from 0 to 100
                    Offset:v,
                    wheel: true, // Using the mousewheel is possible too
                    onChange: function(){
                        var value = this.step;
                        var min = e.get('min');
                        if (min==null||!min) min = 0;
                        else min = min.toInt();
                        var max = e.get('max');
                        if (max==null||!max) max = 10000;
                        else max = max.toInt();
                        e.set('value',value.toInt().limit(min, max));
                    }
                }).set(v);
            });
        }
 
    }
});
//----------------------------------日历
/*
 * 语言 0: 中文, 1: 英语
 * 1.  new Calendar("id").show():
 * 2.  new Calendar().cssInit();
*/
 
var Calendar = new Class({
    Implements: [Options, Events],
    options: {
        ptag:'body',
        calendarCss:'.calendar',
        language: 0,
        top:10,
        format:"yyyy-MM-dd",
        images: '/script/images/calendar.png',
        curDayClass: 'calendarCurrentDay',
        tipDayClass:'calendarTipDay',
        oldTipDayClass: 'calendarOldTipDay',
        /* 日历语言包 */
        lang:{
            weeks:      [
                ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期天"],
                ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"]
            ],
            weeksMenu:[
                ["一","二","三","四","五","六","日"],
                ["MON","TUR","WED","THU","FRI","SAT","SUN"]
            ]
        }
    },
    initialize: function(options) {
        this.setOptions(options);
        if (!this.ptag) this.ptag = "body";
        this.language = this.options.language;
        this.lang =  this.options.lang;
        this.images = this.options.images;
        this.calendarCss = this.options.calendarCss;
        this.tipDayClass = this.options.tipDayClass;
        this.oldTipDayClass = this.options.oldTipDayClass;
 
        this.Date = new Date();
        this.Year = this.Date.getFullYear();
        this.Month = this.Date.getMonth();
        this.Week = this.Date.getDay();
        this.Today = this.Date.getDate();
        if (this.language == 'zh') this.language = 0;
        this.format = this.options.format||"yyyy-MM-dd";
        this.msgStore = this.options.msgStore||[];
    },
    getViewElement:function()
    {
        this.caleContainer = new Element('div',{'class':'calendarContainer'});
        var caleElem = '<div class="calendarTopContainer"><table cellpadding="0" cellspacing="0"><tr>';
        // 上部 日期 部分
        caleElem += '<td class="calendarTodayView"></td>';
        // 链接和select 控制部分
        caleElem += '<td>';
 
        caleElem += '<table class="calendarYearMonthContainer" cellpadding="0" cellspacing="0">';
        caleElem += '<tr>';
        caleElem += '<td>';
        caleElem += '<a class="linkQuickYear" style="cursor:pointer;"></a>';
        caleElem += '<input type="text" class="selectQuickYear" />';
        caleElem += '</td>';
        caleElem += '<td>.</td>';
        caleElem += '<td>';
        caleElem += '<a class="linkQuickMonth" style="cursor:pointer;"></a>';
        caleElem += '<input type="text" class="selectQuickMonth" />';
        caleElem += '</td>';
        caleElem += '</tr>';
        caleElem += '</table>';
        caleElem += '<div class="calendarWeekView"></div>';
        caleElem += '</td>';
 
        // 快速切换到上下月或本月
        caleElem += '<td>';
        caleElem += '<div class="calendarCloseContainer">';
        caleElem += '<a class="calendarClose" style="cursor:pointer;">x</a>';
        caleElem += '</div>';
 
        //id="calendarQuickContainer"
        caleElem += '<div class="calendarQuickContainer">';
        //id=' + this.caleTop.prev_Year_id + '
        caleElem += '<a class="toPrevYear" style="cursor:pointer;">◄</a>';
        //id=' + this.caleTop.prev_month_id + '
        caleElem += '<a class="toPrevMonth" style="cursor:pointer;">←</a>';
        //id=' + this.caleTop.back_today_id + '
        caleElem += '<a class="backToday" style="cursor:pointer;">▇</a>';
        //id=' + this.caleTop.next_month_id + '
        caleElem += '<a class="toNextMonth" style="cursor:pointer;">→</a>';
        //id=' + this.caleTop.next_Year_id + '
        caleElem += '<a class="toNextYear" style="cursor:pointer;">►</a>';
        caleElem += '</div>';
        caleElem += '</td>';
 
        caleElem += '</tr></table></div>';
        // <上部创建结束>
 
        // <日历视图主体部分>
        caleElem += '<div class="calendarMainContainer">';
        // 周 菜单
        caleElem += '<div class="calendarWeeksContainer">';
        for (var i = 0; i < 7; i ++) {
            caleElem += '<span>' + this.lang["weeksMenu"][this.language][i] + '</span>';
        }
        caleElem += '</div>';
 
        // 日期 视图
        caleElem += '<table class="calendarDaysContainer" cellpadding="0" cellspacing="0">';
        for (var tr = 0; tr < 6; tr ++) {
            caleElem += '<tr>';
            for (var td = 0; td < 7; td ++) {
                caleElem += '<td><span></span></td>';
            }
            caleElem += '</tr>';
        }
        caleElem += '</table>';
 
        caleElem += '<div class="calendarYearContainer" ></div>';
 
        caleElem += '<div class="calendarMonthContainer" ></div>';
 
 
        caleElem += '</div>';
        // <日历主体部分创建结束>
        caleElem += '<div class="calendarTipsContainer" ></div>';
 
        //caleElem += '</div>';
        // <日历提示部分 - 提供给 show() 方法>
 
        // <日历提示部分创建结束>
        this.caleContainer.set('html',caleElem);
 
 
        this.yearContainer = this.caleContainer.getElement('div.calendarYearContainer');
        this.monthContainer =  this.caleContainer.getElement('div.calendarMonthContainer');
        this.msgContainer =  this.caleContainer.getElement('div.calendarTipsContainer');
 
        this.lq_year = this.caleContainer.getElement('a.linkQuickYear');
        this.sq_year = this.caleContainer.getElement('input.selectQuickYear');
        this.lq_month = this.caleContainer.getElement('a.linkQuickMonth');
        this.sq_month = this.caleContainer.getElement('input.selectQuickMonth');
 
        this.today_view = this.caleContainer.getElement('td.calendarTodayView');
        this.week_view = this.caleContainer.getElement('div.calendarWeekView');
        this.prev_Year = this.caleContainer.getElement('a.toPrevYear');
 
        this.prev_month = this.caleContainer.getElement('a.toPrevMonth');
        this.back_today = this.caleContainer.getElement('a.backToday');
        this.next_month = this.caleContainer.getElement('a.toNextMonth');
        this.next_Year = this.caleContainer.getElement('a.toNextYear');
 
        this.calendarWeeksContainer =  this.caleContainer.getElement('div.calendarWeeksContainer');
        this.calendarDaysContainer =  this.caleContainer.getElement('table.calendarDaysContainer');
 
        this.calendarClose =  this.caleContainer.getElement('a.calendarClose');
        return this.caleContainer;
    }
    ,
    getMonthViewArray:function(year, month) {
        /* 获取 月份 数据 */
        var monthArray = [],
        // 一周的开始  0,周一开始，1星期日开始
        beginDayOfWeek = new Date(year, month, 0).getDay(),
        // 该月总天数
        daysOfMonth = new Date(year, month + 1, 0).getDate();
        // 创建一个 7*6 的矩阵
        for (var i = 0; i < 42; i ++)
            monthArray[i] = "&nbsp;";
        for (var j = 0; j < daysOfMonth; j ++)
            monthArray[ j + beginDayOfWeek ] = j + 1;
        return monthArray;
    },
    /* 绑定所有数据 */
    bindAllData : function(curYear, curMonth) {
 
        this.lq_year.set('value',curYear);
        this.sq_year.set('value',curYear);
        this.changeSelectValue(curYear, curMonth);
        // 绑定默认数据到日历面板上部分的 当天 和 周 部分中去
        this.today_view.innerHTML = this.Today;
        this.week_view.innerHTML = this.lang['weeks'][this.language][this.Week];
        // 获得日期并绑定到 日历主体 部分
        var daysOfMonthArray = this.getMonthViewArray(curYear, curMonth),
                spans =  this.calendarDaysContainer.getElements("span"),
                curYMD = this.Year + "" + ( this.Month + 1 ) + "" + this.Today,
                selectYear = this.sq_year.value,
                selectMonth = this.sq_month.value;
 
        for (var i = 0; i < spans.length; i ++)
        {
            spans[i].innerHTML = daysOfMonthArray[i];
            var selectYMD = selectYear + "" + selectMonth + "" + spans[i].innerHTML;
            if (curYMD == selectYMD)
                spans[i].className = this.options.curDayClass;
            else
                spans[i].className = "";
        }
        if (this.msgStore != "") this.initPopMsg(this.msgStore);
    }
    ,
    /* 绑定所有事件 */
    bindAllEvent: function() {
        var cr = this;
        this.prev_Year.onclick = function() {
            cr.resetLinkSelect();
            cr.goPrevOrNextYear(this);
        };
        this.next_Year.onclick = function() {
            cr.resetLinkSelect();
            cr.goPrevOrNextYear(this);
        };
        this.prev_month.onclick = function() {
            cr.resetLinkSelect();
            cr.goPrevOrNextMonth(this);
        };
        this.next_month.onclick = function() {
            cr.resetLinkSelect();
            cr.goPrevOrNextMonth(this);
        };
        this.back_today.onclick = function() {
            cr.resetLinkSelect();
            cr.bindAllData(cr.Year, cr.Month);
        };
        this.today_view.onclick = function() {
            cr.resetLinkSelect();
            cr.bindAllData(cr.Year, cr.Month);
        };
        // 年月事件
        this.sq_year.onchange = function() {
            cr.bindAllData(cr.sq_year.value, cr.sq_month.value.toInt() - 1);
        };
        this.sq_month.onchange = function() {
            cr.bindAllData(cr.sq_year.value, cr.sq_month.value.toInt() - 1);
        };
        this.sq_year.onkeyup=function(event)
        {
            if (event.key=='enter')
            {
                cr.resetLinkSelect();
            }
        };
        this.sq_month.onkeyup=function(event)
        {
            if (event.key=='enter')
            {
                cr.resetLinkSelect();
            }
        };
 
        this.lq_year.onclick = function() {
                if (this.getStyle('display')=='none') return;
                this.setStyle('display','none');
 
                cr.sq_year.setStyle('display','');
                cr.calendarWeeksContainer.setStyle('display','none');
                cr.calendarDaysContainer.setStyle('display','none');
                cr.monthContainer.setStyle('display','none');
                cr.yearContainer.setStyle('display','');
 
                var curYear = cr.lq_year.get('value').toInt();
                var selectYear = '';
                for (var i=curYear-15;i<curYear+10;i++)
                {
                    if (i==cr.Year) selectYear = selectYear + "<a class='" + cr.options.curDayClass + "'>" + i + "</a>";
                    else selectYear = selectYear + "<a>" + i + "</a>";
                }
                var leftYear = new Element('a',{html:'◁','startYear':(curYear-25)});
                var rightYear = new Element('a',{html:'▷','startYear':(curYear+10)});
                var closeYear = new Element('a',{html:'×'});
 
                closeYear.addEvent('click', function(){
                    cr.resetLinkSelect();
                });
 
                cr.yearContainer.set('html',selectYear);
                var liArray = cr.yearContainer.getElements('a');
                liArray.addEvent('click', function(){
                    cr.bindAllData(this.get('html').toInt(),cr.sq_month.get('value').toInt());
 
                    cr.yearContainer.setStyle('display','none');
                    cr.calendarWeeksContainer.setStyle('display','block');
                    cr.calendarDaysContainer.setStyle('display','block');
                });
 
                leftYear.addEvent('click', function(){
                    var startYear = this.get('startYear').toInt();
                    var selectYear = '';
                    for (var i=startYear;i<startYear+25;i++)
                    {
                            if (i==cr.Year) selectYear = selectYear + "<a class='" + cr.options.curDayClass + "'>" + i + "</a>";
                            else selectYear = selectYear + "<a>" + i + "</a>";
                    }
                    cr.yearContainer.set('html',selectYear);
 
                    var liArray = cr.yearContainer.getElements('a');
                    liArray.addEvent('click', function(){
                        var month = cr.sq_month.get('value').toInt();
                        cr.bindAllData(this.get('html').toInt(),month);
                        cr.resetLinkSelect();
                    });
 
                    leftYear.set('startYear',(startYear-25));
                    rightYear.set('startYear',(startYear+25));
 
                    cr.yearContainer.adopt(leftYear);
                    cr.yearContainer.adopt(rightYear);
                    cr.yearContainer.adopt(closeYear);
                });
 
                rightYear.addEvent('click', function(){
                    var startYear = this.get('startYear').toInt();
                    var selectYear = '';
                    for (var i=startYear;i<startYear+25;i++)
                    {
                        if (i==cr.Year) selectYear = selectYear + "<a class='" + cr.options.curDayClass + "'>" + i + "</a>";
                        else selectYear = selectYear + "<a>" + i + "</a>";
                    }
                    cr.yearContainer.set('html',selectYear);
 
                    var liArray = cr.yearContainer.getElements('a');
                    liArray.addEvent('click', function(){
                        var month = cr.lq_month.get('html').toInt();
                        cr.bindAllData(this.get('html').toInt(),month);
                        cr.resetLinkSelect();
                    });
 
                    leftYear.set('startYear',(startYear-25));
                    rightYear.set('startYear',(startYear+25));
 
                    cr.yearContainer.adopt(leftYear);
                    cr.yearContainer.adopt(rightYear);
                    cr.yearContainer.adopt(closeYear);
                });
 
                cr.yearContainer.adopt(leftYear);
                cr.yearContainer.adopt(rightYear);
                cr.yearContainer.adopt(closeYear);
 
                cr.sq_year.focus();
        };
 
        this.lq_month.onclick = function() {
            cr.lq_month.setStyle('display','none');
            cr.sq_month.setStyle('display','');
            cr.sq_month.focus();
 
            cr.calendarWeeksContainer.setStyle('display','none');
            cr.calendarDaysContainer.setStyle('display','none');
            cr.yearContainer.setStyle('display','none');
 
            cr.monthContainer.setStyle('display','');
 
            var selectMonth="";
            for (var i=1;i<13;i++)
            {
                if (i-1==cr.Month) selectMonth = selectMonth + "<a class='" + cr.options.curDayClass + "'>" + i + "</a>";
                else selectMonth = selectMonth + "<a>" + i + "</a>";
            }
            cr.monthContainer.set('html',selectMonth);
            var liArray = cr.monthContainer.getElements('a');
            liArray.addEvent('click', function(){
                cr.bindAllData(cr.sq_year.get('value').toInt(),(this.get('html').toInt()-1));
                cr.resetLinkSelect();
            });
        };
        var spans = this.calendarDaysContainer.getElements("span");
        for (var i = 0; i < spans.length; i ++) {
            spans[i].onmouseover = function() {
                if (this.innerHTML != "&nbsp;" && this.className == "")
                    this.style.backgroundColor = "#f1f1f1";
            };
            spans[i].onmouseout = function() {
                if (this.innerHTML != "&nbsp;")
                    this.style.backgroundColor = "";
            };
        }
    }
    ,
    /* 改变快速选择年, 月的值 */
    changeSelectValue:function(year, month) {
        this.lq_year.set('html',year);
        month = month + 1;
        this.lq_month.set('html',month);
        this.sq_month.set('value',month);
        this.resetLinkSelect();
    }
    ,
    /* 初始化年, 月下拉框和对应超链接的值 */
    resetLinkSelect : function() {
        this.sq_year.setStyle('display','none');
        this.sq_month.setStyle('display','none');
        this.yearContainer.setStyle('display','none');
        this.calendarWeeksContainer.setStyle('display','block');
        this.calendarDaysContainer.setStyle('display','block');
        this.monthContainer.setStyle('display','none');
        this.lq_year.setStyle('display','block');
        this.lq_month.setStyle('display','block');
    }
    ,
    /* 选择上下月 */
    goPrevOrNextMonth : function(obj) {
        var curMonthSelect = this.sq_month;
        var curMonth = parseInt(curMonthSelect.value);
        var curYear = parseInt(this.sq_year.value);
 
        if (obj == this.next_month)
            curMonthSelect.value = curMonth + 1;
        else
            curMonthSelect.value = curMonth - 1;
 
        var getNowMonth = curMonthSelect.value - 1;
        if (getNowMonth <0) getNowMonth = 0;
        if (getNowMonth >11) getNowMonth = 11;
 
        this.bindAllData(curYear, getNowMonth);
    },
    /* 选择上下年*/
    goPrevOrNextYear:function(obj) {
        var year = this.lq_year.get('html').toInt();
        var month = this.lq_month.get('html').toInt();
        if (obj==this.next_Year) year = year + 1;
        else year= year - 1;
 
        if (year < 1800)  year = 1800;
        this.bindAllData(year, month-1);
    }
    ,
   /* 初始化提示信息 */
   initPopMsg : function() {
        var cr = this;
        var selectYear = this.sq_year.value;
        var selectm = this.sq_month.value;
        var spans = this.calendarDaysContainer.getElements("span");
        for (var key in this.msgStore) {
            var keyY = key.substring(0, 4);
            var keyMD = key.substring(4);
 
            for (var i = 0; i < spans.length; i ++) {
                var d = spans[i].innerHTML;
                if (selectm.length < 2) selectm = "0" + selectm;
                if (d.length < 2) d = "0" + d;
                var getMD = selectm + "" + d;
                if (getMD == keyMD) {
                    if (selectYear == keyY)
                        spans[i].className = this.tipDayClass + " " + keyY;
                    else
                        spans[i].className = this.oldTipDayClass + " " + keyY;
 
                    spans[i].onmouseover = function()
                    {
                        var hoverDate = this.className.split(" ")[1] + "" + selectm + "" + this.innerHTML;
                        var y = this.className.split(" ")[1];
                        var d = this.innerHTML;
                        if (y)
                        {
                            cr.msgContainer.innerHTML = cr.getMsgHtml(y,selectm, d);
                            cr.msgContainer.setStyle('display','block');
                        }
                    };
                }
            }
        }
    }
    ,
    /* 得到提示信息HTML 内容 */
    getMsgHtml: function(y, m, d) {
        if (m.length < 2) m = "0" + m;
        if (d.length < 2) d = "0" + d;
        var date = y + m + d;
        var showDate = y + "-" + m + "-" + d;
        return '<div>' + showDate + ':</div><div>' + this.msgStore[date] + '</div>';
    }
    ,
    /*绑定输入框*/
   bindInput:function(inputId,hide)
   {
        var cr = this;
        var cbox = inputId;
        if (typeOf(inputId)=='string') cbox = $(inputId);
        if (!cbox) return;
        var format = cbox.get('format')||cr.format||'yyyy-MM-dd';
        var spanEls = this.popContainer.getElements(".calendarDaysContainer span");
        spanEls.addEvent('click', function(event){
            event.stop();
            var da = this.get('html');
            if (da != "&nbsp;")
            {
                var year = cr.popContainer.getElement('.selectQuickYear').get('value');
                var month = cr.popContainer.getElement('.selectQuickMonth').get('value');
                var dateStr = year + "-" + month + "-" + da + " "+  new Date().getHours() + ":" + new Date().getMinutes();
                dateStr = dateStr.toDate().string(format);
                if ('INPUT'==cbox.tagName)
                {
                    cbox.set('value',dateStr);
                } else {
                    cbox.set('html',dateStr);
                }
                if (hide&&cr.popContainer) cr.popContainer.dispose();
            }
        });
    }
    ,
    /* 方法一: 将日历插件加入实例元素中 */
    tip:function(instanceId,msgId,msgData,inputId) {
        this.popContainer = $(instanceId);
        var msgBox = $(msgId);
        if (msgBox) this.msgContainer = msgBox;
        if (this.popContainer)
        {
            var cr = this;
            this.popContainer.adopt(this.getViewElement());
            this.bindAllEvent();
            this.bindAllData(this.Year, this.Month);
 
            // 方法一中没有关闭按钮
            this.calendarClose.setStyle('display','none');
            if (typeOf(msgData)=='object') {
                this.msgStore = msgData;
                this.initPopMsg(this.msgStore);
 
                cr.caleContainer.addEvent('mouseleave', function() {
                    (function () {
                        this.style.display = "none";
                    }).delay(2000, cr.msgContainer);
                });
            }
            if (inputId) this.bindInput(inputId,false);
        }
    }
    ,
    /* 方法二:直接显示，点击后选择 */
   show:function(panelDiv,inputId) {
        var cbox = inputId;
        if (typeOf(inputId)=='string') cbox = $(inputId);
        if (!cbox) return;


        if (cbox&&typeOf(cbox)=='ELEMENT'&&cbox.get('format'))
            this.format =  cbox.get('format');
         if (typeOf(panelDiv)=='string')
            this.popContainer = $(panelDiv);
        else this.popContainer = panelDiv;
       if (!this.popContainer) return;
 
        this.popContainer.adopt(this.getViewElement());
        this.calendarClose.setStyle('display','none');
        this.bindAllEvent();
        this.bindAllData(this.Year,this.Month);
        this.bindInput(cbox,false);
        if (cbox) cbox.focus();
    }
    ,
     /* 方法三: 弹出日历插件 */
    cssInit : function() {
		//系统不支持type="date" 的时候使用
		if (supportHtml5Date()) return;
        var cr = this;
        $$(cr.ptag.toLowerCase() + " " + cr.calendarCss).each(function(cbox) {
            if (cbox.getProperty('calendarInit')) return;
            cbox.setProperty('calendarInit', true);
            var imgBox = new Element('img', {'src':cr.images,'class':'jSelectButton'});
            imgBox.inject(cbox, 'after');
            imgBox.addEvent('click', function(event) {
                event.stop();
                if (cr.popContainer) cr.popContainer.dispose();
 
                cr.popContainer = new Element("div", {'class':'popContainer'});
                cr.popContainer.adopt(cr.getViewElement());
                document.body.appendChild(cr.popContainer);
 
                cr.bindAllEvent();
                cr.bindAllData(cr.Year, cr.Month);
 
                cr.bindInput(cbox,true);
                cr.format = cbox.getProperty('format');
 
                var position = cbox.getPosition();
                var positionX = position.x;
                var pDiv = cbox.getParent('div');
                if (pDiv) positionX = position.x + pDiv.scrollLeft;
                cr.popContainer.setStyles({position: "absolute", left: positionX + "px", top: position.y+20 + "px",'z-index':120});
 
                cr.calendarClose.addEvent('click', function() {
                    cr.popContainer.dispose();
                });
                //拖动
                cr.popContainer.makeDraggable({
                    onStart:function() {
                        this.element.setStyle('opacity',.5);
                    },
                    onComplete: function() {
                        this.element.setStyle('opacity',1);
                    }
                });
                cbox.focus();
            });
        });
    }
});
//-----------------------------------日历之间选择
var CalendarBetween = new Class({
    Implements: [Options, Events],
    options: {
        ptag:'body',
        calendarCss:'.calendarBetween',
        language: 0,
        format:"yyyy-MM-dd",
        semicolon:"~",  //分割符号
        readonly:true,
        images: '/script/images/calendar.png',
        callback: null, //调用返回的函数
        closeCss: 'closeModalPanel' //调用返回的函数
    },
    initialize: function(_opts) {
        this.setOptions(_opts);
 
        if (!this.ptag) this.ptag = "body";
        this.language = this.options.language;
        this.lang =  this.options.lang;
        this.images = this.options.images;
        this.calendarCss = this.options.calendarCss;
    },
    cssInit : function() {
        var cr = this;
        if (!this.ptag) this.ptag = "body";
 
        $$(cr.ptag.toLowerCase() + " " + cr.calendarCss).each(function(cbox) {
            if (cbox.getProperty('calendarInit')) return;
            cbox.setProperty('calendarInit', true);
            cr.times = Number.random(0, 10000);
 
            var imgBox = new Element('img', {'src':cr.images,'class':'jSelectButton'});
            imgBox.inject(cbox, 'after');
            imgBox.addEvent('click', function(event) {
                event.stop();
                function _callback(_confirmed) {
                    var date1 = $('startDate'+cr.times);
                    var date2 = $('endDate'+cr.times);
                    if (date1&&date2)
                         cbox.set('value',date1.get('value')+ cr.options.semicolon + date2.get('value'));
                }
 
                var contentDivHtml = '<div id="' +'calendarBetweenPanel'+cr.times+'" name="calendarBetweenPanel" styles="float:left;"><div>';
                 var dialogX = new JDialog.Prompt({
                                 title: '日期选项',
                                 width:439,
                                 message: contentDivHtml,
                                 callback: _callback,
                                 onAfterShow:function()
                                 {
                                         var contentDiv = $('calendarBetweenPanel'+cr.times);
                                         var calendarBetweenStartDiv = new Element('div',{id:'calendarBetweenStart'+cr.times,'name':'calendarBetweenStart'+cr.times,'styles':{'float':'left','padding':'1px'}});
                                         var calendarBetweenEndDiv = new Element('div',{id:'calendarBetweenEnd'+cr.times,'name':'calendarBetweenEnd'+cr.times,'styles':{'float':'left','padding':'1px'}});
                                         var clearDiv = new Element('div',{id:'calendarBetweenClear'+cr.times,'styles':{'clear':'both'}});
 
                                         contentDiv.adopt(calendarBetweenStartDiv);
                                         contentDiv.adopt(calendarBetweenEndDiv);
                                         contentDiv.adopt(clearDiv);
 
                                         var startDate = new Element('input',{id:'startDate'+cr.times,'type':'text',name:'startDate'+cr.times,'class':'calendarBetweenInput','placeholder':'起始日期'});
                                         var endDate = new Element('input',{id:'endDate'+cr.times,'type':'text',name:'startDate'+cr.times,'class':'calendarBetweenInput','placeholder':'结束日期'});
 
                                         contentDiv.adopt(startDate);
                                         contentDiv.adopt(endDate);
 
                                         startDate.setProperty('readonly',cr.options.readonly);
                                         endDate.setProperty('readonly',cr.options.readonly);
 
                                         new Calendar().show('calendarBetweenStart'+cr.times,startDate);
                                         new Calendar().show('calendarBetweenEnd'+cr.times,endDate);
                                 }
                                 });
                 dialogX.show();
            });
        });
    }
});
 
//-----------------------------------绑定两个输入框合并提交数据
var JBetweenInput = new Class({
    Implements: [Options, Events],
    options: {
        startInput:'',
        endInput:'',
        toInput:'',
        semicolon:"~",
        dataType:'auto',
        sort:true
    },
    initialize: function(_opts) {
        this.setOptions(_opts);
        this.startInput = this.options.startInput;
        if (typeOf(this.startInput)=='string') this.startInput = $(this.startInput);
        this.endInput = this.options.endInput;
        if (typeOf(this.endInput)=='string') this.endInput = $(this.endInput);
        this.toInput = this.options.toInput;
        if (typeOf(this.toInput)=='string') this.toInput = $(this.toInput);
 
        this.semicolon = this.options.semicolon;
        this.sort = this.options.sort;
 
        if (this.startInput.getProperty('betweenInputInit')) return;
        this.startInput.setProperty('betweenInputInit', true);
 
        var bi = this;
        this.startInput.addEvent('blur',function(){
            bi.flush();
        });
        this.endInput.addEvent('blur',function(){
            bi.flush();
        });
    },
    flush : function(event) {
        var startV = 'INPUT'==this.startInput.tagName?this.startInput.get('value'):this.startInput.get('html');
        var endV = 'INPUT'==this.endInput.tagName?this.endInput.get('value'):this.endInput.get('html');
        var dataType = this.options.dataType;
        if (dataType=='auto'&&startV.isNumber()&&endV.isNumber()) dataType = 'number';
        if (dataType=='auto'&&startV.isDateTime()&&endV.isDateTime()) dataType = 'dateTime';
        if (dataType=='number') {
            startV = startV-0;
            endV = endV-0;
            if (this.sort&&startV>endV)
            {
                var tmp = startV; startV = endV;endV = tmp;
            }
        } else
        if (dataType=='dateTime') {
            var startVT = startV.toDate().getTime();
            var endVT = endV.toDate().getTime();
            if (this.sort&&startVT>endVT)
            {
                var tmp = startV;startV = endV;endV = tmp;
            }
        } else {
            if (this.sort&&startV>endV)
            {
                var tmp = startV;startV = endV;endV = tmp;
            }
        }
        if ('INPUT'==this.toInput.tagName)
            this.toInput.set('value',startV + this.semicolon + endV);
        else
            this.toInput.set('html',startV + this.semicolon + endV);
    }
});
//-----------------------------------窗口
var JModalPanel = new Class({
    Implements: [Options, Events],
    options: {
        top:100,
        callback: null, //调用返回的函数
        closeCss: 'closeModalPanel' //调用返回的函数
        /*
         onComplete: $empty(), //当前要发送请求的时候
         onBeforeClose: $empty(),
         onBeforeHide: $empty(),
         onBeforeShow: $empty(),
         onResize(): $empty()
         */
    },
    initialize: function(_opts) {
        this.setOptions(_opts);
        this.times = Number.random(0, 10000);
        this.windowId = "windowSide_" + this.times;
        this.closeBtn = new Element('a', {'class':this.options.closeCss,'html':'×'});  //创建锁定背景层
        var sf = this;
        this.closeBtn.addEvent('click', function(event) {
            sf.close();
        });
 
        this.contentDiv = new Element('div', {'align':'center',styles:{'margin-top':this.options.top}});
        //创建锁定背景层
        this.blackgroundLock = new Element('div', {id:this.windowId,'class':'blackgroundLock'});
        this.blackgroundLock.adopt(this.closeBtn);
        this.blackgroundLock.adopt(this.contentDiv);
        this.blackgroundLock.setStyle('z-index',1);
        window.document.body.appendChild(this.blackgroundLock);
    },
    adopt:function(el)
    {
        this.contentDiv.adopt(el);
    }
    ,
    close:function()
    {
        this.blackgroundLock.destroy();
        window.currentStep = false;
        window.modalPanel = false;
    }
});
//-----------------------------------窗口
var JWindow = new Class({
    Implements: [Options, Events],
    options: {
        message: 'Message not specified.',
        url: false,
        ajaxErrorMessage: '<h3>Error 404</h3><p>The requested file could not be found.</p>',
        ajaxDelay: 800,
        topHeight:100,
        top: 0,
        left: 0,
        width: 'auto',
        height: 'auto',
        title: 'title',
        modal:false,
        resize: true,
        move:true,
        scrollWin:true,
        minButton:true,
        zoomButton:true,
        maxButton:true,
        loadIcon: '/script/images/loading.gif',
        callback: null, //调用返回的函数
        winIconCss: 'winIcon', //调用返回的函数
        windowCss: 'a.window' //调用返回的函数
       /*
        onComplete: $empty(), //当前要发送请求的时候
        onAfterShow: $empty(),
        onBeforeHide: $empty(),
        onBeforeShow: $empty(),
        onResize(): $empty()
       */
    },
    initialize: function(_opts) {
        this.setOptions(_opts);
        this.times = Number.random(0, 10000);
        this.windowSideId = "windowSide_" + this.times;
        this.windowInsideId = "windowInside_" + this.times;
        this.windowTitlePaneId = "windowTitlePanel_" + this.times;
        this.windowContextId = "windowContext_" + this.times;
        this.windowButtonPaneId = "windowButtonPaneID_" + this.times;
        this.winIconId = "winIconID_" + this.times;
        this.windowButtonPaneId = "windowButtonPanel_" + this.times;
        this.minWindowId = "minWindow_" + this.times;
        this.maxWindowId = "maxWindow_" + this.times;
        this.zoomWindowId = "zoomWindow_" + this.times;
        this.closeWindowsId = "closeWindow_" + this.times;
    }
    ,getTimes:function()
    {
        return this.times;
    }
    ,
    beginLoading:function() {
        var loading = new Element("img", {src:this.options.loadIcon,'class':'loading',border:'0'});
       var w = $(this.windowContextId);
        if (w&&w!=null)
        {
            w.empty();
            w.appendChild(loading);
        }
    }
    ,
    hide:function() {
        this.fireEvent('beforeHide');
        $(this.windowSideId).setStyle('display', 'none');
    }
    ,
    show:function() {
        var win = this;
        var wincontHC = 32; //窗口 边和内容的高度差
        var fixedTop = 0; //窗格固定高度，滚动窗口的时候用
 
        if ($(this.windowSideId))
        {
            this.fireEvent('beforeShow');
            $(this.windowSideId).setStyle('display','');
            return;
        }
 
        function saveXYWH() {
            //windowState状态  0:普通 1:最小化 2:最大化
            var windowState = windowSide.retrieve('windowState');
            if (windowState == 0) {
                windowSide.store('windowOldLeft', windowSide.getStyle('left'));
                windowSide.store('windowOldTop', windowSide.getStyle('top'));
                windowSide.store('windowOldWidth', windowSide.getStyle('width'));
                windowSide.store('windowOldHeight', windowSide.getStyle('height'));
 
                windowSide.store('windowOldInsideHeight', windowInside.retrieve('height'));
                windowSide.store('windowOldInsideWidth', windowInside.retrieve('width'));
                windowSide.store('windowOldContextHeight', win.windowContext.getStyle('height'));
                windowSide.store('windowOldContextWidth', win.windowContext.getStyle('width'));
 
                var iframeEl = win.windowContext.getElement('iframe');
                if (iframeEl)
                {
                    windowSide.store('iframeOldWidth', iframeEl.getStyle('width'));
                    windowSide.store('iframeOldHeight', iframeEl.getStyle('height'));
                }
            }
        }
        function getWindowHeight()
        {
            var height = windowSide.getStyle('height');
            if (height != 'auto' && height.indexOf('%') == -1)
                return height.toInt();
            var position = dragSizePane.getElement('span').getPosition();
            return (position.y - windowSide.getStyle('top').toInt() + 10);
        }
        function getMaxZindex()
        {
           var wins = $$('.windowSide');
            if (!wins) return 200;
           var result = 0;
           for (var i=0;i<wins.length;i++) result = max(result,wins[i].getStyle('z-index').toInt());
            if (result<200) result = 200;
            return result;
        }
        win.windowContext = new Element('div', {id:win.windowContextId,'class':'windowContext'});  //上下文内容
        var windowSide = new Element('div', {id:win.windowSideId,'class':'windowSide'});
        if (this.options.pop)
        {
            //采用样式表方式实现 position:fixed; bottom:0px; 基底,兼容IE
            if (self.frameElement && self.frameElement.getParentDocument && self.frameElement.tagName == "IFRAME") {
                var pdoc = self.frameElement.getParentDocument();
                var bot = 0;
                if (pdoc.offsetHeight==pdoc.clientHeight) bot = pdoc.scrollHeight - pdoc.clientHeight;
                else bot = pdoc.offsetHeight - pdoc.clientHeight;
                windowSide.setStyle("bottom",(bot- self.frameElement.getParentDocument().scrollTop - window.document.body.scrollTop));
            } else
              windowSide.setStyle("bottom",0);
                windowSide.setStyle("position","fixed");
                 windowSide.setStyle("float",'right');
             windowSide.setStyle("right",'1px');
        }
 
         //最外部的层
       var windowInside = new Element('div', {id:this.windowInsideId,'class':'windowInside'});  //最内部的层
       var windowTitlePane = new Element('div', {id:this.windowTitlePaneId,'class':'windowTitlePanel'});  //标题头部
       windowTitlePane.onmouseup = function() {
                   fixedTop = windowSide.getStyle('top').toInt() - windowSide.getParentDocument().scrollTop.toInt();
                windowSide.setStyle('z-index', ( getMaxZindex()+1));
        };
 
        if (this.options.zoomButton)
        {
            windowTitlePane.ondblclick = function() {
                var windowState = windowSide.retrieve('windowState');
                //windowState状态  0:普通 1:最小化 2:最大化
                if (windowState == 2)
                    $(win.zoomWindowId).fireEvent('click');
                else
                if (windowState == 0||windowState == 1)
                    $(win.maxWindowId).fireEvent('click');
            };
        }
 
        var zIndex = (getMaxZindex() + 1);
        if (this.options.modal) {
            this.blackgroundLock = new Element('div', {id:'blackgroundLock','class':'blackgroundLock'});  //创建锁定背景层
            this.blackgroundLock.setStyle('z-index', zIndex);
            window.document.body.appendChild(this.blackgroundLock);
            windowSide.setStyle('z-index', (zIndex + 1));
        } else {
            windowSide.setStyle('z-index', zIndex);
        }
        this.windowSide = windowSide;
        window.document.body.appendChild(this.windowSide);
        //按钮 begin
        //最小化窗口
        var windowButtonPane = new Element('div', {id:this.windowButtonPaneId,'class':'windowButtonPanel'});  //最内部的层
        if (this.options.minButton)
            windowButtonPane.adopt(new Element('span', {id:this.minWindowId,'class':'minWindow',
                events:
                {
                    click: function() {
                        //windowState状态  0:普通 1:最小化 2:最大化
                        var windowState = windowSide.retrieve('windowState');
                        saveXYWH();
                        win.windowContext.setStyle('display', 'none');
                        windowSide.setStyle('width', '120px');
                        windowSide.setStyle('height', 'auto');
                        windowInside.setStyle('width', '110px');
                        windowInside.setStyle('height', 'auto');
                        this.setStyle('display', 'none');
                        $(win.zoomWindowId).setStyle('display', '');
                        $(win.maxWindowId).setStyle('display', '');
                        windowSide.store('windowState', 1);
                    }
                }
 
            }), 'bottom');
 
        if (this.options.zoomButton)
            windowButtonPane.adopt(new Element('span', {id:this.zoomWindowId,'class':'zoomWindow',
                styles:{display: 'none'},
                events:
                {
                    click: function() {
                        //windowState状态  0:普通 1:最小化 2:最大化
                        var windowState = windowSide.retrieve('windowState');
                        windowSide.setStyle('left', windowSide.retrieve('windowOldLeft'));
                        windowSide.setStyle('top', windowSide.retrieve('windowOldTop'));                
 
                        windowSide.setStyle('width', windowSide.retrieve('windowOldWidth'));
                        windowSide.setStyle('height', windowSide.retrieve('windowOldHeight'));
 
                        windowInside.setStyle('height', windowSide.retrieve('windowOldInsideHeight'));
                        windowInside.setStyle('width', windowSide.retrieve('windowOldInsideWidth'));
 
                        win.windowContext.setStyle('height', windowSide.retrieve('windowOldContextHeight'));
                        win.windowContext.setStyle('width', windowSide.retrieve('windowOldContextWidth'));
 
                        win.windowContext.setStyle('display', '');
 
                        this.setStyle('display', 'none');
                        windowSide.store('windowState', 0);
                        if (win.options.minButton)
                            $(win.minWindowId).setStyle('display', '');
                        if (win.options.maxButton)
                            $(win.maxWindowId).setStyle('display', '');
 
                        var dlgContentPanel = win.windowContext.getElement("div.jdialogContentPanel");
                        if (dlgContentPanel)
                        {
                            dlgContentPanel.setStyle('height','auto');
                        }
 
                        var iframeEl = win.windowContext.getElement('iframe');
                        if (iframeEl)
                        {
                            iframeEl.setStyle('height', windowSide.retrieve('iframeOldHeight'));
                            iframeEl.setStyle('width', windowSide.retrieve('iframeOldWidth'));
                        }
                    }
                }
 
            }), 'bottom');  //缩放窗口
 
        //最大化窗口
        if (this.options.maxButton)
            windowButtonPane.adopt(new Element('span', {id:this.maxWindowId,'class':'maxWindow',
                events:
                {
                    click: function() {
                        saveXYWH();
                        var page =  window.getSize();
                        var maxW = page.x - 2;
                        var maxH = 0;
 
                        if (self.frameElement && self.frameElement.getParentDocument && self.frameElement.tagName == "IFRAME") {
                            maxH = window.parent.document.body.getSize().y - win.options.topHeight - wincontHC;
                        } else maxH = page.y- wincontHC - 40;
 
                        windowSide.setStyles({'width': maxW,'height': maxH,'top':0,'left': 0});
                        windowSide.store('windowState', 2);
                        windowInside.setStyles({'width':maxW-10,'height':maxH-22});
 
                        this.setStyle('display', 'none');
                        win.windowContext.setStyle('display', '');
                        if (win.options.minButton) $(win.minWindowId).setStyle('display', '');
                        if (win.options.zoomButton) $(win.zoomWindowId).setStyle('display', '');
 
                        win.windowContext.setStyle('width',windowInside.getStyle('width'));
                        win.windowContext.setStyle('height',windowInside.getStyle('height'));
 
                        var dlgContentPanel = win.windowContext.getElement("div.jdialogContentPanel");
                        if (dlgContentPanel) dlgContentPanel.setStyle('height',maxH-wincontHC);
 
                        var iframeEl = win.windowContext.getElement('iframe');
                        if (iframeEl)
                        {
                            iframeEl.setStyle('height',maxH-wincontHC);
                            iframeEl.setStyle('width',maxW-10);
                        }
                    }
                }
 
            }), 'bottom');
 
 
        this.windowEvents = function() {
            if (!win.options.scrollWin ||  !windowSide || typeOf(windowSide)!='element') return;
            windowSide.setStyle('top', (windowSide.getParentDocument().scrollTop.toInt() + fixedTop));
        };
 
        //关闭
        windowButtonPane.adopt(new Element('span', {id:this.closeWindowsId,'class':'closeWindow',
            events:
            {
                click: function() {
                    win.close(0);
                }
            }
        }), 'bottom');  //关闭窗口
        //按钮 end
 
        windowTitlePane.adopt(windowButtonPane);
        windowTitlePane.adopt(new Element('span', {id:this.winIconId,'class':this.options.winIconCss}), 'bottom');  //图标  'winIcon'
        windowTitlePane.appendText(this.options.title);
        windowInside.adopt(windowTitlePane, 'top');
        windowInside.adopt(win.windowContext, 'bottom');
        var dragSizePanel = new Element('div', {'class':'dragSizePanel'});
        var dragSizeOperate = new Element('a', {'class':'dragSizeOperate',
       events:
        {
            mousedown: function(event) {
                //拖动影子 windowContext
                var dragDiv = new Element('div', {id:'drag_' + win.windowContextId,'html':'&nbsp;',
                               styles:
                               {
                                   'background-image':'url(/script/images/b.png)',
                                   'left':windowSide.getStyle('left'),
                                   'top':windowSide.getStyle('top'),
                                   'width':windowSide.getStyle('width'),
                                   'height':windowSide.getStyle('height'),
                                   'z-index':110
                               }
                           });
 
                window.document.body.appendChild(dragDiv);
                var myDrag = dragDiv.makeDraggable({
                    onBeforeStart:function(element) {
                        element.setStyle('width', windowSide.getStyle('width'));
                        element.setStyle('height', getWindowHeight());
                    },
                    onStart:function() {
                       this.element.setStyle('opacity',1);
                    },
                    onDrag : function(element) {
                        var h = element.getStyle('top').toInt() - windowSide.getStyle('top').toInt() + getWindowHeight() + 30;
                        var w = element.getStyle('left').toInt() - windowSide.getStyle('left').toInt() + windowSide.getStyle('width').toInt();
                        if (w < 120) w = 120;
 
                        element.setStyle('top', windowSide.getStyle('top'));
                        element.setStyle('left', windowSide.getStyle('left'));
                        element.setStyle('width', w);
                        if (h < 52) h = 52;
                        element.setStyle('height', (h - 30));
                    },
                    onComplete: function() {
                       this.element.setStyle('opacity',.5);
                        var w = this.element.getStyle('width').toInt();
                        var h = this.element.getStyle('height').toInt();
                        if (h < wincontHC) h = wincontHC;
 
                        windowSide.setStyle('width', w);
                        windowSide.setStyle('height', h);
 
                        windowInside.setStyle('width', w - 10);
                        windowInside.setStyle('height', h - 10);
 
                        win.windowContext.setStyle('width', w - 10);
                        win.windowContext.setStyle('height', h - wincontHC);
                        var dlgContentPanel = win.windowContext.getElement("div.jdialogContentPanel");
                        if (dlgContentPanel)
                        {
                            dlgContentPanel.setStyle('height',h-wincontHC-23);
                        }
                        var iframeEl = win.windowContext.getElement('iframe');
                        if (iframeEl)
                        {
                            iframeEl.setStyle('height', h - wincontHC);
                            iframeEl.setStyle('width',w-10 + 'px');
                        }
                        this.element.destroy();
                    }
                    ,
                    onCancel:function() {
                        this.element.destroy();
                    }
                });
                myDrag.start(event);
            }
        }});
 
        dragSizePanel.adopt(dragSizeOperate, 'bottom');  //缩放窗口
        windowSide.adopt(windowInside);
        windowSide.adopt(dragSizePanel, 'bottom');
 
        this.beginLoading();
        var iWin = $$('.windowSide').length;
        if (this.options.left&&this.options.left>0) windowSide.setStyle('left',this.options.left);
        if (this.options.top&&this.options.top>0) windowSide.setStyle('top',this.options.top);
        //开启拖动
 
        if (this.options.move) {
            windowSide.makeDraggable({handle:windowTitlePane,
                onStart:function() {
                   this.element.setStyle('opacity',.5);
                    window.document.body.selectedIndex = 0;
                }
               ,
               onComplete: function(){
                   if (windowSide.getStyle('left').toInt()<0) windowSide.setStyle('left',0);
                   var maxWidth=document.body.clientWidth?document.body.clientWidth:screen.width;
                   if (windowSide.getStyle('left').toInt()+windowSide.getStyle('width').toInt()>maxWidth)
                       windowSide.setStyle('left',maxWidth-windowSide.getStyle('width').toInt());
                   if (windowSide.getStyle('top').toInt()<0) windowSide.setStyle('top',0);
                   this.element.setStyle('opacity',1);
               }
            });
        }
 
        if (!this.options.resize) {
            windowTitlePane.setStyle('cursor','auto');
            dragSizeOperate.setStyle('display','none');
        }
        this.setMessage(this.options.url,this.options.message);
        if (this.options.width=='auto'&&this.options.height=='auto')
        {
            this.options.height = 50;
			if (isMobileBrowser())
			{
	            this.options.width = document.body.clientWidth-2;
			} else
	            this.options.width = window.screen.availWidth/3;
        }
 
        if (this.options.width&&this.options.width != 'auto') {
            windowSide.setStyle("width", this.options.width);
            windowInside.setStyle("width", this.options.width.toInt() - 10);
        } else
        {
            var tmpWidth = windowInside.getStyle("width").toInt() + 50;
            if (tmpWidth<100||(Browser.name=='ie'&&Browser.version==6)) tmpWidth = window.screen.availWidth/3;
           if (tmpWidth<140) tmpWidth = 140;            
            windowSide.setStyle("width", tmpWidth);
            windowInside.setStyle("width",tmpWidth-10);
        }
 
        if (!this.options.pop && this.options.left==0 && this.options.top==0)
        {
             windowSide.centerPosition(iWin * 8);
        }  else {
           if (this.options.top) windowSide.setStyle('top',this.options.top<0?0:this.options.top);
           if (this.options.left) windowSide.setStyle('left',this.options.left<0?0:this.options.left);
        }
        if (this.options.scrollWin)
        {
            window.addEvent('scroll', this.windowEvents.bind(this));
            (function()
            {
                fixedTop = windowSide.getStyle('top').toInt() - windowSide.getParentDocument().scrollTop.toInt();
            }).delay(200);
        }
        windowSide.store('windowState', 0);
        this.fireEvent('afterShow');
    }
    ,
    setMessage:function(url, msg) {
        var win = this;
        if (url && (!photoFileTypes.contains(url.getFileType())))
       {
            if (url.startsWith('file:')) alert('协议错误,你需要使用http协议,you need http');
            var ajax = new Request({url: url,method: 'GET',
               onComplete:this.options.onComplete,
                onSuccess: function(html) 
               {
                        win.windowContext.empty();
                        win.windowContext.set('html', html);
                },
                onFailure: function(html) {
                        win.windowContext.empty();
                        win.windowContext.set('html', html);
                }
            });
            ajax.send();
        } else {
            win.windowContext.empty();
            if (msg && typeOf(msg) == 'element') {
                //iframe会短20px
                if (msg.tagName.toLowerCase()=="iframe") msg.setStyle('margin-bottom','20px');
                win.windowContext.adopt(msg);
            }
            else if (msg && typeOf(msg) == 'array') {
                msg.each(function(e) {
                    if (typeOf(e) == 'element')
                    {
                        if (e.tagName.toLowerCase()=="iframe") e.setStyle('margin-bottom','20px');
                        win.windowContext.adopt(e);
                    }
                    else win.windowContext.appendText(e);
                });
            }
            else if (msg && !photoFileTypes.contains(msg.getFileType()))
           {
                win.windowContext.set('html', msg);
            } else {
                win.windowContext.adopt(new Element("img", {src:msg,border:'0'}));
            }
        }
    }
    ,
    close:function(v) {
        var closeEl = $(this.closeWindowsId);
        if (closeEl)
        {
 
            var win = this;
            win.fireEvent('beforeClose',v,this);
            var closeMorph = false;
            if (win.scrollClose)
            {
                var doc = window.document.body.getParentDocument();
                closeMorph =  {'top': doc.clientHeight,'background-color': '#FFFFF',color: '#FFFFF',"opacity": 0.2};
            } else
                closeMorph =  {'background-color': '#FFFFF',color: '#FFFFF',"opacity": 0.2};
 
            new Fx.Morph(win.windowSide, {
                duration:500,
                onComplete: function(){
                    //关闭
                    if (typeof(win.blackgroundLock)!=undefined && win.blackgroundLock) win.blackgroundLock.dispose();
                    if (win.options.scrollWin) win.windowSide.removeEvent('scroll', this.windowEvents);
                    win.windowSide.dispose();
                }
            }).start(closeMorph);
 
            //closeEl.fireEvent('click',v);
        }
    }
    ,
    maxClick:function()
    {
        var maxEl = $(this.maxWindowId);
        if (maxEl) maxEl.fireEvent('click');
    }
    ,
    isClose:function() {
        return !$(this.windowSideId);
    }
    ,
    setPosition:function(x,y)
    {
        var winDiv = $(this.windowSideId);
        if (winDiv)
        {
            winDiv.setStyle('top',x);
            winDiv.setStyle('left',y);
        }
    }
    ,
    cssInit:function() {
        if (typeOf(this.options.windowCss) == 'string')
            this.options.windowCss = $$(this.options.windowCss);
            this.options.windowCss.each(function (e) {
            e.set('url', e.get('href'));
            e.set('href', 'javascript:void(0);');
            e.onclick = function() {
                var jWin = new JWindow({
                    title: 'URL连接页面对话框',
                    url:e.get('url')
                });
                jWin.show();
            };
        });
    }
});
//-------------------------------------------对话框
var JDialog = new Class({
    Extends: JWindow,
    initialize: function(options) {
        if (options.minButton==undefined) options.minButton= false;
        this.parent(options);
    }
});
//--------------------------------------------气泡窗格，可定时关闭
JDialog.Pop = new Class({
    Extends: JDialog,
    initialize: function(options) {
        options.resize = false;
       if (!options.width) options.width = 220;
       if (!options.height) options.height = 180;
        var infoDiv = new Element('div', {'class':'jdialogContentPanel'});
        if (typeOf(options.message) == 'element') infoDiv.adopt(options.message);
        else infoDiv.set('html', options.message);
        options.message = infoDiv;
        options.scrollClose = true;
        options.scrollWin = false;
        options.pop = true;
 
        if (options.sleep==undefined) options.sleep = 5000;
        this.parent(options);
        this.close.delay(options.sleep,this);
    }
});
//--------------------------------------------yes no 对话框
JDialog.Confirm = new Class({
    Extends: JDialog,
    initialize: function(options) {
        options.resize = false;
        if (!options.okButtionCaption) options.okButtionCaption = '确定';
        if (!options.noButtionCaption) options.noButtionCaption = '取消';
        var win = this;
 
        var buttonPane = new Element('div', {'class':'jdialogButtonPanel'});
        buttonPane.adopt(new Element('button', {type:'button',html:options.okButtionCaption,'class': 'jdialog-ok-button',
            events:
            {
                click: function() {
                    win.options.callback(true);
                    win.close();
                }
            }
        }));
 
        buttonPane.adopt(new Element('button', {type:'button',html:options.noButtionCaption,'class': 'jdialog-no-button',
            events:
            {
                click: function() {
                    if (options.callback)
                        options.callback(false);
                    win.close();
                }
            }
        }));
 
        var msgArray = [];
        var jdialogContentPanel = new Element('div', {'class':'jdialogContentPanel'});
        if (typeOf(options.message) == 'element')
            jdialogContentPanel.adopt(options.message);
        else
            jdialogContentPanel.set('html', options.message)
        msgArray.push(jdialogContentPanel);
        msgArray.push(buttonPane);
        options.message = msgArray;
        this.parent(options);
    }
});
//-----------------------------------提示对话框返回一值  return dialog
JDialog.Prompt = new Class({
    Extends: JDialog,
    initialize: function(options) {
        if (!options.okButtionCaption) options.okButtionCaption = '确定';
        if (!options.noButtionCaption) options.noButtionCaption = '取消';
        var win = this;
        var buttonPane = new Element('div', { 'class': 'jdialogButtonPanel'});
        buttonPane.adopt(new Element('button', {type:'button',html:options.okButtionCaption,'class': 'jdialog-ok-button',
            events:
            {
                click: function() {
                    if (options.callback) options.callback($(win.windowContextId));
                    win.close();
                }
            }
        }));
        buttonPane.adopt(new Element('button', {type:'button','html':options.noButtionCaption,'class': 'jdialog-no-button',
            events:
            {
                click: function() {
                    win.close();
                }
            }
        }));
 
        var msgArray = new Array();
        var jdialogContentPanel = new Element('div', {'class':'jdialogContentPanel'});
        if (typeOf(options.message) == 'element') {
            jdialogContentPanel.adopt(options.message.clone());
        }
        else {
            jdialogContentPanel.set('html', options.message);
        }
        if (!options.message) jdialogContentPanel.adopt(new Element('input', {type:'text'}));
 
        msgArray.push(jdialogContentPanel);
        msgArray.push(buttonPane);
        options.message = msgArray;
        this.parent(options);
    }
});
//-----------------------------------颜色话框 color dialog
JDialog.Color = new Class({
    Extends: JDialog,
    initialize: function(options) {
        options.resize = false;
        if (!options.title) options.title = '颜色对话框 Color Dialog';
        if (!options.okButtionCaption) options.okButtionCaption = '确定';
        if (!options.noButtionCaption) options.noButtionCaption = '取消';
        var win = this;
        var clr = ['00', '30', '60', '90', 'a0', 'c0', 'ff'];
        var colorPane = new Element('div', {'class': 'jdialog_colorPanel'});
        var bspan = new Element('span', {html:'&nbsp;'});
 
        colorPane.adopt(bspan);
        var inputEl = new Element('input', {type:'text','class':'jdialog_colorInput'});
        for (var r = 0; r < 7; r++)
            for (var g = 0; g < 7; g++)
                for (var b = 0; b < 7; b++) {
                    var col = '#' + clr[6 - r] + clr[6 - g] + clr[6 - b];
                    colorPane.adopt(new Element('div',
                    {
                        styles:
                        {
                            'background-color':col
                        },
                        events:
                        {
                            click: function() {
                                var cspan = colorPane.getElement("span");
                                var color = this.getStyle('background-color').toUpperCase();
                                bspan.setStyle("background-color", color);
                              
                                inputEl.set('value',color);
                                var white = new Color(color);
                                cspan.setStyle('color', white.invert());
                            }
                            ,
                            dblclick:function(){
                                var cspan = colorPane.getElement("span");
                                options.callback(cspan.getStyle('background-color'));
                                win.close();
                            }
                        }
 
                    }));
                }
 
        var buttonPane = new Element('div', { 'class': 'jdialogButtonPanel'});
        buttonPane.adopt(inputEl);
        buttonPane.adopt(new Element('button', {type:'button','html':options.okButtionCaption,'class': 'jdialog-ok-button',
            events:
            {
                click: function() {
                    var cspan = colorPane.getElement("span");
                    options.callback(cspan.getStyle('background-color'));
                    win.close();
                }
            }
        }));
 
        buttonPane.adopt(new Element('button', {type:'button',html:options.noButtionCaption,'class': 'jdialog-no-button',
            events:
            {
                click: function() {
                    win.close();
                }
            }
        }));
 
        var msgArray = [];
        var jdialogContentPanel = new Element('div', {'class':'jdialogContentPanel'});
        jdialogContentPanel.adopt(colorPane);
        msgArray.push(jdialogContentPanel);
        msgArray.push(buttonPane);
        bspan.setStyle('width',420);
        options.width = 430;
        options.message = msgArray;
        this.parent(options);
    }
});
//-----------------------------------提示对话框  alert dialog
JDialog.Alert = new Class({
    Extends: JDialog,
    initialize: function(options) {
        var win = this;
        if (!options.title) options.title = '提示对话框 Alert Dialog';
        if (!options.okButtionCaption) options.okButtionCaption = '关闭';
 
        var buttonPane = new Element('div', { 'class': 'jdialogButtonPanel'});
        buttonPane.adopt(new Element('button', {type:'button',html:options.okButtionCaption,'class': 'jdialog-no-button',
            events:
            {
                click: function() {
                    if (options.callback) options.callback(true);
                    win.close(0);
                }
            }
        }));
 
        var msgArray = [];
        if (typeOf(options.message) == 'string') {
            var fileName = options.message;
            var ext = fileName.getFileType();
            if (photoFileTypes.contains(ext)) {
                options.message = new Element('img', {src: fileName,border:0});
                var addFref = false;
                if (options.message.width > options.width) {
                    options.message.set('width', (options.width - 10));
                    addFref = true;
                }
                if (options.message.height > 500) {
                    options.message.set('height', 480);
                    addFref = true;
                }
                if (addFref) {
                    options.message = new Element('a', {href:fileName,target:'_blank','html':options.message});
                }
            }
        }
        var dialogContentPanel = new Element('div', {'class':'jdialogContentPanel'});
        if (typeOf(options.message) == 'element')
        {
            dialogContentPanel.adopt(options.message);
        }
        else dialogContentPanel.set('html',options.message);
 
        msgArray.push(dialogContentPanel);
        msgArray.push(buttonPane);
        options.message = msgArray;
        this.parent(options);
    }
});
//-----------------------------------漂浮面板,用于在线咨询
/*
 <div id='floatingPanel' class="floatingPanel">
 <div class="floatingSideBar">§</div>
 <div id="floatingPanelContent" class="floatingMainBar" style="display:none;">
 <div class="topPanel"></div>
 <div class="titPanel">在线客服</div>
 <div class="conPanel">
 <p>订购热线:</p>
 <p>0851-3855521</p>
 <p>0851-6598117</p>
 <p>QQ联系：</p>
 <p>客服一：</p>
 <p>客服二：</p>
 <p>客服三：</p>
 </div>
 <div class="endPanel"></div>
 </div>
 </div>
 */
 var JFloatingPanel = new Class({
    Implements: Options,
    options: {
        title:'浮动窗口',
        float:'right',
        top:100,
        width:160,
        content:'',
        interval:0,
        openAction:'mouseenter',
        closeAction:'mouseleave',
        sideBar:'<span style="font-size:24px; font-weight:bold;color:#FFF;">&sect;</span>',
        background:'#F93',
        display:'none'
    },
    initialize: function(options) {
        this.setOptions(options);
 
        if (typeOf(this.options.content) == 'string')
            this.options.content = $(this.options.content);
 
        var floatingPanel = new Element('div', {"class": "floatingPanel"});
        var floatingSideBar = new Element('div', {"class": "floatingSideBar",styles:{'background':this.options.background}});
        if (typeOf(this.options.sideBar)=='element')
        {
            floatingSideBar.adopt(this.options.sideBar);
        } else {
            floatingSideBar.set('html',this.options.sideBar);
        }
 
        floatingPanel.setStyle( 'top',this.options.top);
 
        var floatingPanelContent = new Element('div', {"class": "floatingMainBar"});
        floatingPanelContent.setStyles({
            'width':this.options.width,
            'background':this.options.background
        });
        if (this.options.float=='left')
        {
            floatingSideBar.setStyle( 'float','right');
            floatingPanel.setStyle('left',this.options.interval);
        } else {
            floatingSideBar.setStyle( 'float','left');
            floatingPanel.setStyle('right',this.options.interval);
        }
 
        var topPanel = new Element('div', {"class": "topPanel"});
        var titPanel = new Element('div', {"class": "titPanel",'html':this.options.title});
 
        floatingPanelContent.adopt(topPanel);
        floatingPanelContent.adopt(titPanel);
        floatingPanelContent.setStyle('display','none');
 
        var conPanel = new Element('div', {"class": "conPanel"});
        conPanel.adopt(this.options.content);
 
        floatingPanelContent.adopt(conPanel);
 
        var endPanel = new Element('div', {"class": "endPanel"});
 
        floatingPanel.adopt(floatingSideBar);
        floatingPanel.adopt(floatingPanelContent);
        floatingPanel.adopt(endPanel);
 
        window.document.body.adopt(floatingPanel);
 
        floatingSideBar.addEvent(this.options.openAction, function() {
            floatingPanelContent.setStyle('display','');
            floatingSideBar.setStyle('display','none');
        });
 
        floatingPanelContent.addEvent(this.options.closeAction, function() {
            floatingSideBar.setStyle('display','');
            floatingPanelContent.setStyle('display','none');
        });
 
    }
});
 
//-----------------------------------居顶自动定位
//  new JSmartFloat({element:$$('div.topRight')});
//  <div class="topRight" >xxx<div>
var JSmartFloat = new Class({
    Implements: Options,
    options: {
        container:''
    },
    initialize: function(options) {
        this.setOptions(options);
        if (typeOf(this.options.container) == 'string') this.options.container = $(this.options.container);
        var element = this.options.container;
        var position = function(element) {
            var top = element.getPosition().y;
            var left = element.getPosition().x;
            //pos = element.getStyle("position");
            window.addEvent("scroll", function() {
                var scrolls = this.getScroll().y;
                if (scrolls > top) {
                    if (window.XMLHttpRequest) {
                        element.setStyles({
                            position: "fixed",
                            left:left,
                            top: 0
                        });
                    } else {
                        element.setStyles({
                            top: scrolls,
                            left:left
                        });
                    }
                }else {
                    element.setStyles({
                        position: "absolute",
                        left:left,
                        top: top
                    });
                }
            });
        };
 
 
         if (typeOf(element) == "elements") {
            return element.each(function(items) {
                position(items);
            });
        } else if (typeOf(element) == "element") {
            position(element);
        }
    }
});
//-----------------------------------tab 选卡 ,尽量使用 JIndexingTab
var JTabs = new Class({
    Implements: Options,
    options: {
        buttons:false,
        buttonCss:'buttonCss',  //按钮默认样式
        buttonCurrentCss:'buttonCurrentCss', //按钮当前样式
        contexts: false,  //显示面板
        eventAction:'click', //mouseenter
//        highlight:'#FF9', //高亮显示
        varName:'tabIndex',
		outClose:false,
        current: 0   // -1 默认开始都关闭
    },
    initialize: function(options) {
        this.setOptions(options);
        var tab = this;
        if (typeOf(this.options.buttons) == 'string')
            this.options.buttons = $$(this.options.buttons);
        if (typeOf(this.options.contexts) == 'string')
            this.options.contexts = $$(this.options.contexts);
 
        this.options.buttons.each(function(button, index) {
            button.store(tab.options.varName, index);
            //事件绑定
            button.addEvent(tab.options.eventAction, function() {
                tab.options.current = button.retrieve(tab.options.varName);
                tab.options.buttons.each(function(btn, actionIndex) {
					var con = tab.options.contexts[actionIndex];
					if (!con) return;
                    if (tab.options.current == actionIndex) {
                        con.setStyle('display', '');
                        btn.set('class', tab.options.buttonCurrentCss);
                    } else {
                        con.setStyle('display', 'none');
                        btn.set('class', tab.options.buttonCss);
                    }
                });
            });
        });
		if (this.options.outClose)
		{
			 var outEl = false;
			 if (typeOf(this.options.outClose) == 'string') outEl = $(this.options.outClose);
			 if (outEl)
			 {
				 outEl.addEvent('mouseleave', function() {
				     tab.options.contexts.setStyle('display', 'none');
                });
             }
		}
		if(this.options.current==-1){
			 tab.options.contexts.setStyle('display', 'none');
		} else this.setCurrent(this.options.current);
    },
    setCurrent:function(current) {
        var button = this.options.buttons[current];
        if (button&&typeOf(button) == 'element')
            button.fireEvent(this.options.eventAction);
    }
    ,
    getCurrent:function() {
        return this.options.current;
    }
});
//-----------------------------------切换标签
//和jtabs 不同, JFieldsetTabs采用 fieldset 转换到tab
var JIndexingTab = new Class({
    Implements: Options,
    options: {
        container:false,
        mode:'accordion', //支持 accordion:手风琴;tab:切换标签;indexing:菜单标签
        togPanel:'div.togPanel',
        buttonCss:'none',
        buttonCurrentCss:'currentDoor',
        contexts: false,
        eventAction:'mouseenter',
        highlight:'#4E80B9',
        sideBar:'<a class="indexing"></a>',
        varName:'tabIndex',
        current: 0
    },
    initialize: function(options) {
        this.setOptions(options);
        var tab = this;
 
        if (typeOf(this.options.container) == 'string')
            this.options.container = $(this.options.container);
 
        if (this.options.container) this.options.container.empty();
 
        if (typeOf(this.options.contexts) == 'string')
            this.options.contexts = $$(this.options.contexts);
 
        if (typeOf(this.options.togPanel) == 'string')
            this.options.togPanel = $$(this.options.togPanel);
 
 
        if (typeOf(this.options.sideBar) == 'string')
            this.options.sideBar = $(this.options.sideBar);
 
        this.options.buttons = new Array();
 
        if (this.options.mode=='tab')
        {
            this.options.contexts.each(function(cont, index) {
                //fieldset
                var legend = cont.getElement("legend");
                if (!legend) return;

                var caption = legend.get("html");
                var title = legend.get("title");

				if (title)
					legend.set('html',caption+"<span class='note'>"+title+"</span>");

                legend.addClass('small');
                var spEl = new Element("span",{'html':caption});
                var btEl = new Element("a");
                btEl.adopt(spEl);
                btEl.store(tab.options.varName, index);
                tab.options.buttons.push(btEl);
                //事件绑定
                btEl.addEvent(tab.options.eventAction, function() {
                    tab.options.current = index;
                    tab.options.buttons.each(function(bt, actionIndex) {
                        if (tab.options.current == actionIndex) {
                            var cont = tab.options.contexts[actionIndex];
                            if (cont) cont.setStyle('display', '');
                            bt.set('class', tab.options.buttonCurrentCss);
                        } else {
                            tab.options.contexts[actionIndex].setStyle('display', 'none');
                            bt.set('class', tab.options.buttonCss);
                        }
                    });
                });
            });
 
            if (this.options.container)
                this.options.container.adopt(tab.options.buttons);
            else {

                this.slidingDoor = new Element("div",{'class':'slidingDoor'});
                this.slidingDoor.adopt(this.options.buttons);
                if (this.options.contexts&&this.options.contexts[0])
                    this.options.contexts[0].getParent().grab(this.slidingDoor,'top');
            }
        } else
        if (this.options.mode=='accordion')
        {
            new Fx.Accordion($$('fieldset legend'),this.options.togPanel, {
                display:this.options.current,
                alwaysHide: true
            });
            $$('legend').setStyle('cursor','pointer');
        }
        else {
            //生成书签
            var floatIndexPanel = new Element("ol",{'class':'floatIndexPanel'});
            this.options.contexts.each(function(cont, index) {
                //fieldset
                var legendEl = cont.getElement("legend");
                legendEl.set("id","index_" + index);
                var caption = legendEl.get('html');
                var id = legendEl.get('id');
                var liEl = new Element('li');
                var aEl = new Element('a', {'href': '#index_'+index,'html': caption});
                liEl.adopt(aEl);
                floatIndexPanel.adopt(liEl);
            });
 
            if (this.options.contexts.length>1)
                new JFloatingPanel({title:'目录索引',sideBar:this.options.sideBar,'content':floatIndexPanel,float:'right',top:180});
        }
        this.setCurrent(this.options.current);
    },
    setCurrent:function(current) {
        var button = this.options.buttons[current];
        if (typeOf(button) == 'element')
            button.fireEvent(this.options.eventAction);
    }
    ,
    getCurrent:function() {
        return this.options.current;
    }
});
//-----------------------------------文件列表控件
//格式说明:id=[标题:文件路径]
//230=[2017-1-24:upload/2017/png/2017-1-24_s.png]
//231=[2017-1-22:upload/2017/png/2017-1-22_s.png]
var JFileGrid = new Class({
    Implements: [Options, Events],
    options: {
        container: 'fileBox',
        downUrl:"download/",
        width:false,
        height:200,
        debug:false,
        fileTypePath: '/share/pimg/filetype/',
        authority: 'read;edit;delete;download',
        refreshButton:false,
        clearButton:false,
        fileNameClickAuto:true  //点击文件名后自动处理, 图片就弹出图片显示，word等就在新窗口打开
        /*
         onClickFileName: function(thisElement, event){},
         onClickUp : function(thisElement, event){},
         onClickRename : function(thisElement, event){},
         onClickEdit: function(thisElement, event){},
         onClickDelete: function(thisElement, event){},
         onClickDownload: function(thisElement, event){},
         onMouseOver: function(thisElement, event){}, //在文件名范围
         onMouseEnter: function(thisElement, event){},
         */
    },
    initialize: function (options) {
        this.setOptions(options);
        this.element = document.id(options.container);
        var se = this;
        if (this.options.debug==false) this.element.setStyle('display', 'none');
        if (this.options.refreshButton)
        {
            var refreshButton = $(this.options.refreshButton);
            if (refreshButton)
                refreshButton.addEvent('click', function(){
                    se.refresh();
                });
        }
        if (this.options.clearButton)
        {
            var clearButton = $(this.options.clearButton);
            if (clearButton)
                clearButton.addEvent('click', function(){
                    se.clear();
                });
        }
        this.element.addEvent('change', function(){
            se.refresh();
        });
        this.ulDiv = new Element('ul');
 
        if (this.options.height)
            this.ulDiv.setStyle('height',this.options.height);
        if (this.options.width)
            this.ulDiv.setStyle('width',this.options.width);
 
        this.element.getParent("div").adopt(this.ulDiv);
        this.element.inject(this.ulDiv, 'after');
        this.refresh();
    },
    refresh: function () {
        this.ulDiv.empty();
        var sf = this;
        var value = this.element.get('value').trim();
		if (value=='') return;

        var lineArray = value.toArray("\n");
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i];
            if (line=='') continue;
            if (line.indexOf('=')==-1) continue;
            var id = line.substringBefore("=").trim();
            line = line.substringAfter("=").trim();

            var caption=line.indexOf("[")!=-1?line.substringBetween("[",":"):line;
            var fileName=line.indexOf("[")!=-1?line.substringBetween(":","]"):line;
            var fileExt = fileName.getFileType();
            if (fileExt=='') fileExt= 'unknown';
 
            var liEl = new Element('li', {"ref": id,'file':fileName,'caption':caption});
            var sortEl = new Element('span', {"class":"fileSort","html":( i+1) + "."});
            liEl.adopt(sortEl);
 
            var extEl = new Element('img', {"src": sf.options.fileTypePath + fileExt + ".gif"});
             extEl.setStyles({'max-height':(window.getSize().y-100),'max-width':(window.getSize().x-200)})
   
            var fileNameEl = new Element('a', {"ref": id, "class": "fileName",'caption':caption,'path':fileName,
                events: {
                    mouseover: function(){
                        sf.fireEvent('mouseOver',this.get('ref'));
                    },
                    mouseenter: function(){
                        sf.fireEvent('mouseEnter',this.get('ref'));
                    }
                    ,
                    click:function()
                    {
                        if (sf.options.fileNameClickAuto)
                        {
                            if (photoFileTypes.contains(this.get('fileType')))
                            {
                                showImageDialog(sf.options.downUrl + this.get('ref') + '.' + suffix,this.get('path'));
                            } else {
                                window.open(sf.options.downUrl + this.get('ref') + '.' + suffix,'newwindow');
                            }
                        }
                        if (sf.options.authority.indexOf('read')!=-1)
                            sf.fireEvent('clickFileName',this.get('ref'));
                    }
                }
            });
 
            fileNameEl.adopt(extEl);
            fileNameEl.appendText(caption);
            liEl.adopt(fileNameEl);
 
            var controlPanelEl = new Element('div', {"class": "controlPanel"});
 
            if (this.options.authority.indexOf('delete')!=-1)
            {
                var delBt = new Element('a', {"ref": id,"class": 'jDefButton',
                    events: {
                        click: function(e){
                           var point = window.document.mousePos(e.event);
                            var delId = this.get('ref');
                            function display_confirm(_confirmed) {
                                var result = (_confirmed ? 'yes' : 'no');
                                if (result=='yes')
                                {
                                    sf.deleteRow(delId);
                                    sf.fireEvent('clickDelete',delId);
                                }
                            }
                            var message = new Element("div",{'html':'是否确定要删除' +delId+ '?'});
                            message.setStyle('margin','10px');
                            message.setStyle('width','240px');
                            var dialog = new JDialog.Confirm({
                                title: '询问对话框 confirm',
                                width:240,
                               top:point.y,
                               left:(point.x-260),
                                message: message,
                                callback: display_confirm
                            });
                            dialog.show();
                        }
                    }
                });
                var delImg = new Element('i',{"class": 'jIcoDelDoc'});
                delBt.adopt(delImg);
                delBt.appendText('删除');
                controlPanelEl.adopt(delBt);
            }
 
           if (this.options.authority.indexOf('sort')!=-1||this.options.authority.indexOf('edit')!=-1||this.options.authority.indexOf('update')!=-1)
           {
              
                var upBt = new Element('a', {"ref": id,"class": 'jDefButton',
                    events: {
                        click: function(){
                            sf.sortUp(this.get('ref'));
                            sf.fireEvent('clickUp',this);
                        }
                    }
                });
                var upImg = new Element('i', {"class": 'jIcoUp'});
                upBt.adopt(upImg);
                upBt.appendText('提前');
                controlPanelEl.adopt(upBt);
           }
 
            if (this.options.authority.indexOf('rename')!=-1||this.options.authority.indexOf('edit')!=-1||this.options.authority.indexOf('update')!=-1)
            {
                var renameBt = new Element('a', {"ref": id,"class": 'jDefButton',
                    events: {
                        click: function(){
 
                            var rId = this.get('ref');
                            var displayPrompt = function(confirmed)
                            {
                                var newName = confirmed.getElement('input').get('value');
                                if (newName=='')
                                {
                                    alert("文件名称不能为空,need input file name");
                                    return;
                                }
                                sf.rename(rId,newName);
                                sf.fireEvent('clickRename',this);
                            };
 
                            var message = new Element("div",{'html':'输入新的文件名','styles':{'margin':'10px','width':'280px'}});
                            var inputBox = new Element("input",{'type':'text','value': sf.getCaption(rId)});
                            message.adopt(inputBox);
 
                            var position = sf.ulDiv.getPosition();
 
                            var dialog = new JDialog.Prompt({
                                title: 'Dialog 录入对话框',
                                top:(position.y+20),
                                left:position.x,
                                width:300,
                                message:message,
                                callback:displayPrompt
                            });
                            dialog.show();
                        }
                    }
                });
 
                var renameImg = new Element('i', {"class": 'jIcoChange'});
                renameBt.adopt(renameImg);
                renameBt.appendText('改名');
                controlPanelEl.adopt(renameBt);
 
            }
 
            if (this.options.authority.indexOf('edit')!=-1||this.options.authority.indexOf('update')!=-1)
            {
 
                var officeEditFileExt = ['txt','rtf','xsl','html','xhtml','htm','mth','pdf','doc','docx','ppt','pptx','xls','xlsx','csv','wps','wpt','et','dpt'];
                if (officeEditFileExt.contains(fileExt))
                {
                    var editBt = new Element('a', {"ref": id,"class": 'jDefButton',
                        events: {
                            click: function(){
                                sf.fireEvent('clickEdit',this);
                            }
                        }
                    });
                    var editImg = new Element('i', {"class": 'jIcoEditDoc'});
                    editBt.adopt(editImg);
                    editBt.appendText( '编辑');
                    controlPanelEl.adopt(editBt);
                }
            }
 
 
            if (this.options.authority.indexOf('down')!=-1)
            {
                var downBt = new Element('a', {"ref": id,"class": 'jDefButton',
                    events: {
                        click: function(){
                            sf.fireEvent('clickDownload',this);
                        }
                    }
                });
                var downImg = new Element('i', {"class": 'jDTDownload'});
                downBt.adopt(downImg);
                downBt.appendText('下载');
                controlPanelEl.adopt(downBt);
            }
 
            liEl.adopt(controlPanelEl);
            this.ulDiv.adopt(liEl);
        }
 
    },
    setValue: function (v) {
        this.element.set('value',v);
       this.element.fireEvent('change');
    },
    addRow: function (v) {
        var value = this.element.get('value').trim();
        var lineArray = value.toArray("\n");
        var result = '';
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i].trim();
            if (line=='') continue;
            if (line.indexOf('=')==-1) continue;
            result = result + line + "\r\n";
        }		
        result = result + v;
        this.element.set('value',result);    
       this.element.fireEvent('change');
    },
    deleteRow: function (id) {
        var value = this.element.get('value').trim();
        var lineArray = value.toArray("\n");
        var result = '';
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i].trim();
            if (line=='') continue;
            if (line.indexOf('=')==-1) continue;
            var fid = line.substringBefore("=").trim();
            if (fid==id) continue;
            result = result + line + "\r\n";
        }
        this.element.set('value',result);
       this.element.fireEvent('change');
    },
    sortUp: function (id) {
        var value = this.element.get('value').trim();
        var lineArray = value.toArray("\n");
        var result = '';
        var first = '';
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i].trim();
            if (line=='') continue;
            if (line.indexOf('=')==-1) continue;
            var fid = line.substringBefore("=").trim();
            if (fid==id)
            {
                first =  line + "\r\n";
            } else
                result = result + line + "\r\n";
        }
 
        result = first + result;
        this.element.set('value',result.trim());
       this.element.fireEvent('change');
    } ,
    rename:function (id,name) {
        //name = name.replace(/\:/g, "").replace(/\[/g, "");
        var value = this.element.get('value').trim();
        var lineArray = value.toArray("\n");
        var result = '';
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i].trim();
            if (line=='') continue;
            if (line.indexOf('=')==-1) continue;
            var fid = line.substringBefore("=").trim();
            if (fid==id)
            {
				//添加后缀名
                var fileName = line.indexOf("[")!=-1?line.substringAfter("=").substringBetween(":","]"):line.substringAfter("=");
               // var fileExt = fileName.getFileType();
              //  var caption = line.substringAfter("=").substringBetween("[",":").trim();
                var newLine = fid + "=[" + name + ":"+ fileName+"]\r\n";
                result = result + newLine;
            } else
                result = result + line + "\r\n";
        }
        this.element.set('value',result.trim());
        this.element.fireEvent('change');
    },
    getCaption:function (id) {
        var value = this.element.get('value').trim();
        var lineArray = value.toArray("\n");
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i].trim();
            if (line==''||line=='\r\n'||line=='\n') continue;
            var fid = line.substringBefore("=").trim();
            if (fid==id)
            {
                return line.substringAfter("=").substringBetween("[",":").trim();
            }
        }
        return '';
    },
    clear:function () {
        this.element.set('value','');
       this.element.fireEvent('change');
    },
    getValue:function () {
        return this.element.get('value');
    }
});
//-----------------------------------文件列表控件
//   new JPhotoArea({container:'layoutPhoto',textArea:'attachments',debug:false,downUrl:'/jcms/download/',
//   'clearButton':'cleanPhotoBtn','onRefresh':clickRefresh,'onClickEdit':clickEdit,'refreshButton':'refreshPhotoBtn','onClickDelete':clickDelete});
var JPhotoArea = new Class({
    Implements: [Options, Events],
    options: {
        container: 'fileBox',
        downUrl:"download/",
        varName:"upFile",
        textArea:'attachments',
        highlight:'#FC3',
        width:false,
        height:false,
        debug:false,
        authority: 'edit;delete',
        refreshButton:false,
        clearButton:false,
        fileNameClickAuto:true  //点击文件名后自动处理, 图片就弹出图片显示，word等就在新窗口打开
        /*
         onClickEdit: function(thisElement, event){},
         onClickDelete: function(id, event){},
         onRefresh: function(thisElement, event){},
         */
    },
    initialize: function (options) {
        this.setOptions(options);
        this.textArea = document.id(options.textArea);
        this.element = document.id(options.container);
 
        var se = this;
        if (this.options.debug==false) this.textArea.setStyle('display', 'none');
        if (this.options.refreshButton)
        {
            var refreshButton = $(this.options.refreshButton);
            if (refreshButton)
                refreshButton.addEvent('click', function(){
                    se.refresh();
                });
        }
        if (this.options.clearButton)
        {
            var clearButton = $(this.options.clearButton);
            if (clearButton)
                clearButton.addEvent('click', function(){
                    se.clear();
                });
        }
        this.textArea.addEvent('change', function(){
            se.refresh();
        });
        this.ulDiv = new Element('ul');
        if (this.options.height) this.ulDiv.setStyle('height',this.options.height);
        if (this.options.width) this.ulDiv.setStyle('width',this.options.width);
        this.element.adopt(this.ulDiv);
        this.refresh();
    },
    getAreaData:function()
    {
        //得到区域结构的值
        var liArray = this.ulDiv.getElements('li');
        var result = "";
        for (var i=0;i<liArray.length;i++)
        {
            var id = liArray[i].get('ref');
            var file = liArray[i].get('file');
            var value = liArray[i].getElement('textarea').get('value');
            result = result + id+"=["+value+":"+file+"]\r\n";
        }
        return result;
    },
    refresh: function () {
        this.ulDiv.empty();
        var sf = this;
        var value = this.textArea.get('value').trim();
        var lineArray = value.toArray("\n");
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i];
            if (line=='') continue;
            if (line.indexOf('=')==-1) continue;
            var id = line.substringBefore("=").trim();
            line = line.substringAfter("=").trim();
            var caption=line.substringBetween("[",":");
            var file=line.substringBetween(":","]");

            var liEl = new Element('li', {"ref": id,"file":file});
            this.ulDiv.adopt(liEl);
 
            var controlEl = new Element('span', {"class": 'control'});
 
            var editBtn = new Element('a', {"class":"edit","ref":id});
            editBtn.addEvent('click', function(){
                sf.fireEvent('clickEdit',this.get("ref"));
            });
 
            var delBtn = new Element('a', {'class':'del',"ref":id});
            delBtn.addEvent('click', function(){
                var id = this.get("ref");
                sf.fireEvent('clickDelete',id);
                sf.deleteRow(id);
            });
 
            controlEl.adopt(editBtn);
            controlEl.adopt(delBtn);
            liEl.adopt(controlEl);
 
            var imgPanelEl = new Element('div', {"class": 'img'});
            var imgEl = new Element('img', {"src":sf.options.downUrl + id + '.' + suffix});
            var moveEl = new Element('span', {"class":"move"});
            imgPanelEl.adopt(imgEl);
            imgPanelEl.adopt(moveEl);
            liEl.adopt(imgPanelEl);
 
            var desEl = new Element('span', {"class": 'des'});
            var txtEl = new Element("textarea", {"name":sf.options.varName + "_" + id,'ref':id });
            txtEl.addEvent('change', function(){
                var caption = this.get('value');
                sf.rename(this.get("ref"),caption.cleanSpecial(),file);
            });

            desEl.adopt(txtEl);
            txtEl.set('value',caption);
            liEl.adopt(desEl);
 
            this.ulDiv.adopt(liEl);
        }
 
        new Sortables(this.ulDiv,{
            revert:true,
            clone: true,
            opacity: 0.5,
            onSort:function(element, clone){
                element.setStyle('background-color',sf.options.highlight);
            },
            onComplete:function(element){
                sf.setValue(sf.getAreaData());
                sf.refresh();
        }});
        this.fireEvent('refresh',this.getValue());
    },
    setValue: function (v) {
        this.textArea.set('value',v);
        this.textArea.fireEvent('change');
    },
    addRow: function (v) {
        var value = this.textArea.get('value').trim();
        var lineArray = value.toArray("\n");
        var result = '';
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i].trim();
            if (line=='') continue;
            if (line.indexOf('=')==-1) continue;
            result = result + line + "\r\n";
        }
        result = result + v;
        this.textArea.set('value',result);
        this.textArea.fireEvent('change');
    },
    deleteRow: function (id) {
        var value = this.textArea.get('value').trim();
        var lineArray = value.toArray("\n");
        var result = '';
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i].trim();
            if (line==''||line=='\r\n'||line=='\n') continue;
            if (line.indexOf('=')==-1) continue;
            var fid = line.substringBefore("=").trim();
            if (fid==id) continue;
            result = result + line + "\r\n";
        }
        this.textArea.set('value',result.trim());
        this.textArea.fireEvent('change');
    },
    sortUp: function (id) {
        var value = this.textArea.get('value').trim();
        var lineArray = value.toArray("\n");
        var result = '';
        var first = '';
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i].trim();
            if (line==''||line=='\r\n'||line=='\n') continue;
            if (line.indexOf('=')==-1) continue;
            var fid = line.substringBefore("=").trim();
            if (fid==id)
            {
                first =  line + "\r\n";
            } else
                result = result + line + "\r\n";
        }
        result = first + result;
        this.textArea.set('value',result.trim());
        this.textArea.fireEvent('change');
    } ,
    rename:function (id,name,file) {
        var value = this.textArea.get('value').trim();
        var lineArray = value.toArray("\n");
        var result = '';
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i].trim();
            if (line==''||line=='\r\n'||line=='\n') continue;
            if (line.indexOf('=')==-1) continue;
            var fid = line.substringBefore("=").trim();
            if (fid==id)
            {
                var newLine = fid + "=[" + name +":"+ file +"]\r\n";
                result = result + newLine;
            } else
                result = result + line + "\r\n";
        }
        this.textArea.set('value',result.trim());
        this.textArea.fireEvent('change');
    },
    getCaption:function (id) {
        var value = this.textArea.get('value').trim();
        var lineArray = value.toArray("\n");
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i].trim();
            if (line==''||line=='\r\n'||line=='\n') continue;
            var fid = line.substringBefore("=").trim();
            if (fid==id)
            {
                return line.substringAfter("=").substringBetween("[",":").trim();
            }
        }
        return '';
    },
    clear:function () {
        this.textArea.set('value','');
		this.element.empty();
        this.textArea.fireEvent('change');
    },
    getValue:function () {
        return this.textArea.get('value');
    }
});
//-----------------------------------树结构 tree
//var treeNode = {id:'节点ID',iocn:'图标',openIcon:'打开图标',inputType:'checkbox',inputCss:'treeInput',text:'节点描述',action:'动作',pid:'root'};
var JTree = new Class({
    Implements: [Options, Events],
    options: {
        url: false,
        paneId:'JTree',
        prefix:'JTree',
        rootId:'root', //更节点ID
        varName:'treeNode',
        multiselect:false, //是否多选
        loadJson:false,
        loadXml:false,
        edit:false, //默认模式
        editMode:false, //对于只显示不允许编辑的可以设置为false
		showFiled:false,
        ajaxDelay: 800,
        inputType:false,
        useLimb:false, //输入框不使用枝节点
        rootHide:false, //根节点隐藏
        buttonHide:true, //叶子节点隐藏展开按钮
        draggable: true, //是否运行拖动
        defaultOpenIcon:'/images/openfolder.png',  //打开节点图标
        defaultIcon:'/images/folder.png',  //打开节点图标
        nodeHideIcon:'/images/elbow-plus.gif',  //隐藏图标
        nodeExpandIcon:'/images/elbow-minus.gif',  //展开图标
        operateIcon:'/images/dialog-operate.gif',
        operate2Icon:'/images/dialog-operate2.gif',
        defaultInputCss:'treeNodeInput',
        treeNodeControlPaneCss:'treeNodeControlPanel',
        treeNodeWrapButtonCss:'treeNodeWrapButton',
 
        addButtonCaption:'添加子分类',
        addButtonCss:'treeNodeAddButton',
 
        upButtonCaption:'',
        upButtonCss:'treeNodeUpButton',
 
        downButtonCaption:'',
        downButtonCss:'treeNodeDownButton',
 
        deleteButtonCaption:'&nbsp;',
        deleteButtonCss:'treeNodeDeleteButton',
 
        editButtonCaption:'编辑详细',
        editButtonCss:'treeNodeEidtButton'
/*
        onDeleteBefore: $empty(),
        onDblclickNode: $empty(), //双击节点
        onClickNode: $empty(), //点击节点
        onSelectChange: $empty(), //勾选改变
        onClickEditButton: $empty(), //点击节点
        onNodeExpand: $empty(), //节点展开事件
        onNodeHide: $empty(), //节点收缩隐藏
        onShowAfter: $empty() //显示树之后
*/        
    },
    initialize: function(_opts) {
        this.setOptions(_opts);
        if (this.options.defaultOpenIcon)
            this.options.defaultOpenIcon = scriptPath + this.options.defaultOpenIcon;
        if (this.options.defaultIcon)
            this.options.defaultIcon = scriptPath + this.options.defaultIcon;
        this.options.nodeHideIcon = scriptPath + this.options.nodeHideIcon;
        this.options.nodeExpandIcon = scriptPath + this.options.nodeExpandIcon;
        this.options.operateIcon = scriptPath + this.options.operateIcon;
        this.options.operate2Icon = scriptPath + this.options.operate2Icon;
        this.options.treeStatus = new Hash.Cookie('treeStatus' + this.options.paneId, {autoSave: true});
 
        if (this.options.loadJson) this.loadJson();
        else if (this.options.loadXml) this.loadXml();
        else if (this.options.url) this.loadURL(this.options.url);
    }
    ,
    show:function() {
        var domRoot = this.getDomRootNode();
        this.refreshButton(domRoot, true);
        this.upButtonEnable(domRoot, false);
        this.downButtonEnable(domRoot, false);
        this.deleteButtonEnable(domRoot, false);
 
        var tree = this;
        if (!this.options.edit) {
            this.viewMode();
            this.options.treeStatus.load();
            this.options.treeStatus.each(function(key, nodeId) {
                var node = $(nodeId);
                if (node) {
                    tree.expandOrCollapse(node.getElement('button'), key);
                }
            });
        }
        if (this.options.rootHide)
        {
            this.hideRoot();
        }
        this.fireEvent('showAfter', domRoot);
    }
    ,
    deleteChildNodes:function(nodeId) {
        //删除节点
        var node = nodeId;
        if (typeOf(node) == 'string')
            node = $(node);
        if (typeOf(node)=='Element') {
            var child = node.getElement('ul');
            if (child)
                child.empty();
        }
    }
    ,
    getDomRootNode:function() {
        if (typeOf(this.options.rootId) == 'string')
		{
            return  $(this.options.prefix + '_' + this.options.rootId);
		}
        return this.options.rootId;
    }
    ,
    getRootNode:function() {
        var nodes = this.options.loadJson;
        for (var i = 0; i < nodes.length; i++)
            if (nodes[i].id == this.options.rootId) return nodes[i];
        return null;
    }
    ,
    deleteAll:function()
    {
        var root = $(this.options.prefix + '_' + this.options.rootId);
        if (!root) return;
        root.destroy();
    }
    ,
    showRoot:function() {
        var domRoot = this.getDomRootNode();
        if (domRoot)
            domRoot.getElement('.treeLiDiv').setStyle('display', '');
    }
    ,
    hideRoot:function() {
        var tree = this;
        var hide = function (){
            var domRoot = tree.getDomRootNode();
            if (domRoot) {
                domRoot.getElement('div.treeLiDiv').setStyle('display', 'none');
                domRoot.getElement('ul').setStyle('padding', 0);
            }
        };
        hide.delay(200);
    }
    ,
    editMode:function() {
        var tree = this;
        var domRoot = this.getDomRootNode();
        domRoot.getElements('div.' + this.options.treeNodeControlPaneCss).setStyle('display', '');
        var inputs = domRoot.getElements('span');
        inputs.each(function(inputbox) {
            new Element('input', {type:'text',name:tree.options.varName,'class':'editCaption',value:inputbox.get("html")}).replaces(inputbox);
        });
        this.options.edit = true;
    }
    ,
    viewMode:function() {
        var tree = this;
        var domRoot = this.getDomRootNode();
        if (!domRoot) alert('不能得到 root 节点');
		if (!tree.options.showFiled)
	        domRoot.getElements('div.' + this.options.treeNodeControlPaneCss).setStyle('display', 'none');
        var inputs = domRoot.getElements('input.editCaption');
        inputs.each(function(inputbox) {
            var valueEl = new Element('span', {html:inputbox.get("value"),
                events:
                {
                    click:function() {
                        if (!tree.options.multiselect)
                       {
                            domRoot.getElements('span').removeClass('seleced');
                       }
                        tree.clickCaption(this);
                    }
                    ,
                    dblclick:function() {
                        tree.dblclickCaption(this);
                    }
                }
            });
            valueEl.replaces(inputbox);
        });
        this.options.edit = false;
    }
    ,
    getChildNodes:function(nodeId) {
        var result = [];
        var jsonData = this.options.loadJson;
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].pid == nodeId)
                result.push(jsonData[i]);
        }
        if (result.length > 0)
            return result;
        return null;
    }
    ,
    loadJson:function(data) {
        if (data!=undefined) this.options.loadJson = data;
        if (typeOf(this.options.loadJson) !== 'array') alert(typeOf(this.options.loadJson) + ' 数据类型错误, error tree json data');
        this.deleteAll();
        var startNode = this.getRootNode();
        if (startNode) {   //数据里边存在根节点,
            //节点添加递归,只用一个开始节点
            this.appendNode(startNode);
        }
        else {
            //动态添加,不会添加子节点,非递归
            var nodes = this.options.loadJson;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes.id=='root')
                {
                    continue;
                }
                this.addNode(nodes[i].pid, this.createNode(nodes[i]));
            }
        }
        //if (!startNode) alert('没有找到起始节点, not found start node');
        this.show();
    }
    ,
    loadURL:function(url, varName) {
        var tree = this;
        if (!url) url = tree.options.url;
        //接收url方式和数组方式
        new Request.JSON({
            url: url,
            method:'GET', //必须
            secure:false,
            onComplete: function(nodes) {
                if (varName) {
                    if (typeOf( nodes[varName]) == "string")
                        nodes = JSON.decode(nodes[varName]);
                }
                tree.options.loadJson = nodes;
                tree.loadJson();
            }
        }).send();
    }
    ,
    appendNode:function(node) {
        this.addNode(node.pid, this.createNode(node));
        var childs = this.getChildNodes(node.id);
        if (childs)
            for (var i = 0; i < childs.length; i++) {
                this.appendNode(childs[i]);
            }
    }
    ,
    loadXml:function(xmlDate) {
        var dom = createElement(xmlDate);
        var result = new Array();
        var children = false;
        if ('tree' == dom.childNodes[0].nodeName)
            children = dom.childNodes[0].childNodes;
        else children = dom.childNodes;
        for (var i = 0; i < children.length; i++) {
            if ('node' == children[i].nodeName.toLowerCase()) {
                var node = new Object();
                node.id = children[i].getAttribute('id');
                node.text = children[i].getAttribute('text');
                node.iocn = children[i].getAttribute('iocn');
                node.openIcon = children[i].getAttribute('openIcon');
                node.pid = children[i].getAttribute('pid');
                node.action = children[i].getAttribute('action');
                node.checked = children[i].getAttribute('checked');
                node.value = children[i].getAttribute('value');
                result.push(node);
            }
        }
        this.options.loadJson = result;
        this.loadJson();
    }
    ,
    getSelected:function() {
        var treeInputs = this.getDomRootNode().getElements('input[type=checkbox]');
        if (treeInputs==null || treeInputs!=null&&treeInputs.length==0)  treeInputs = this.getDomRootNode().getElements('input[type=radio]');
        var result = new Array();
        if (treeInputs!=null&&treeInputs.length>0)
        {
            for (var i=0;i<treeInputs.length;i++)
            {
                if (treeInputs[i].checked==true||treeInputs[i].checked=='true')
                {
                    var obj = new Object();
                    obj.id = treeInputs[i].get('value');
                    var theLi = treeInputs[i].getParent('li');
                    obj.caption = theLi.getElement('span').get('html');
                    obj.path = this.getNodePath(obj.id);
                    result.include(obj);
                }
            }
        } else
        {
                var nodeSpan = this.getDomRootNode().getElements('span.seleced');
                for (var i=0;i<nodeSpan.length;i++)
                {
                    var obj = new Object();
                    var theLi = nodeSpan[i].getParent('li');
                    obj.id = theLi.get('id').substringLastAfter("_");
                    obj.caption = nodeSpan[i].get('html');
                    obj.path = this.getNodePath(obj.id);
                    result.include(obj);
                }
        }
        return result;
    }
    ,
    clickCaption:function(nodeSpan) {
        if (nodeSpan) {
            if (nodeSpan.hasClass('seleced'))
                nodeSpan.removeClass('seleced');
            else
                nodeSpan.addClass('seleced');
            this.fireEvent('clickNode', nodeSpan.getParent('li').id.substringLastAfter('_'));
        }
    }
    ,
    dblclickCaption:function(nodeSpan) {
        if (nodeSpan) {
            nodeSpan.addClass('seleced');
            this.fireEvent('dblclickNode',nodeSpan.getParent('li').id);
 
        }
    }
    ,
    expandOrCollapse:function(tnode, status) {
        //展开
        if (!tnode) return false;
        var tree = this;
        var node = tnode.getParent('li');
        //展开，关闭
        var clickNode = tnode.getParent().getParent().getLast();
        var clickNodeStyle = clickNode.getStyle('display');
        if (clickNode.get('tag').toLowerCase() == 'ul')//如果最后一个元素是ul
        {
            var img = node.getElement('img');
            if ((!status || status == 0) && clickNodeStyle == 'block') {
                tnode.setStyle('background', 'url(' + tree.options.nodeHideIcon + ')');
                clickNode.setStyle('display', 'none');
                if (img) img.set('src', img.get('icon'));
                this.options.treeStatus.set(node.id, 0);
                tree.fireEvent('nodeHide', node.id);
 
            } else
            if (!status || status == 1) {
                tnode.setStyle('background', 'url(' + tree.options.nodeExpandIcon + ')');
                clickNode.setStyle('display', 'block');
                if (img) img.set('src', img.get('openIcon'));
                this.options.treeStatus.set(node.id, 1);
                tree.fireEvent('nodeExpand', node.id);
            }
        }
    }
    ,
    collapseAll:function() {
        //收缩节点
        var tree = this;
        var collapse = function (){
            var root = tree.getDomRootNode();
            var uls = root.getElements('ul');
            var frootid = tree.options.prefix + '_' + tree.options.rootId;
            uls.each(function(ul) {
                var tnode = ul.getParent("li");
                if (frootid != tnode.get('id')) {
                    var clickNode = tnode.getLast();
                    var img = tnode.getElement('img');
                    tnode.getElement('button').setStyle('background', 'url(' + tree.options.nodeHideIcon + ')');
                    clickNode.setStyle('display', 'none');
                    img.set('src', img.get('icon'));
                    tree.options.treeStatus.set(tnode.id, 0);
                }
            });
        };
        collapse.delay(200);
    }
    ,
    expandAll:function() {
        //展开
        var tree = this;
        var expand = function (){
            var root = tree.getDomRootNode();
            var uls = root.getElements('ul');
            var frootId = tree.options.prefix + '_' + tree.options.rootId;
            uls.each(function(ul) {
                var tnode = ul.getParent("li");
                if (frootId != tnode.get('id')) {
                    var clickNode = tnode.getLast();
                    var img = tnode.getElement('img');
                    tnode.getElement('button').setStyle('background', 'url(' + tree.options.nodeExpandIcon + ')');
                    clickNode.setStyle('display', 'block');
                    img.set('src', img.get('openIcon'));
                    tree.options.treeStatus.set(tnode.id, 1);
                }
            });
        };
        expand.delay(200);
    }
    ,
    isLimb:function(nodeId) {
        //判断是否为枝节点
        var nodes = this.options.loadJson;
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].pid == nodeId) return true;
        }
        return false;
    }
    ,
    getNodePath:function(nodeId) {
        //判断是否为枝节点
        var nodes = this.options.loadJson;
        function getNodeForId(nid)
        {
            for (var i = 0; i < nodes.length; i++)
                if (nodes[i].id == nid) return nodes[i];
            return null;
        }
        var result = new Array();
        var node = getNodeForId(nodeId);
        var i=0;
        while (node!=null && (node.id !='root'||node.pid=='root'))
        {
            result.push(node);
            node = getNodeForId(node.pid);
            i++;
            if (i>100) break;
        }
        result.reverse();
        return result;
    }
    ,
    createNode:function(node) {
        if (!node.inputCss) node.inputCss = this.options.defaultInputCss;
        var tree = this;
        var treeLiNode = new Element('li', {'class':'treeLiNode',id:this.options.prefix + '_' + node.id});  //LI
        var treeLiDiv = new Element('div', {'class':'treeLiDiv'});
        treeLiNode.adopt(treeLiDiv);
        var cbutton = new Element('button', {'class': this.options.treeNodeWrapButtonCss,
            'events':
            {
                'click': function() {
                    tree.expandOrCollapse(this);
                    return false;
                }
            }
        });
        treeLiDiv.adopt(cbutton); //展开按钮
        if (node.value == undefined) node.value = "";
        //输入框
        var inputEl = null;
        if (this.options.inputType)
            inputEl = new Element('input', {type:this.options.inputType,'class':this.options.defaultInputCss,name:this.options.varName,value:node.id});
        else
        if (node.inputType)
            inputEl = new Element('input', {type:node.inputType,'class':node.inputCss,name:this.options.varName,value:node.id}); //输入框
 
        if (inputEl && node.checked) inputEl.set("checked", "checked");
        if (inputEl)
           if (inputEl.get("type") == "text")
               inputEl.set("value", node.value);
           else
           {
               inputEl.addEvent('click', function() {
                    if (this.getProperty('checked'))
                    {
                       tree.fireEvent('selectChange', node);    
                    }
               });
           }
   
        if (!this.options.useLimb) {
            if (!this.isLimb(node.id)) {
                if (this.options.buttonHide) {
                    cbutton.setStyle('display', 'none');
                }
                treeLiDiv.adopt(inputEl);
            }
        } else {
            treeLiDiv.adopt(inputEl);
        }
 
        if (node.iocn && node.openIcon)
            treeLiDiv.adopt(new Element('img', {src:node.openIcon,icon:node.icon,openIcon:node.openIcon,border:0})); //图标
        else if (tree.options.defaultIcon&&tree.options.defaultOpenIcon)
            treeLiDiv.adopt(new Element('img', {src:tree.options.defaultOpenIcon,icon:tree.options.defaultIcon,openIcon:tree.options.defaultOpenIcon,border:0})); //图标
 
        if (!this.options.editMode) {
            treeLiDiv.adopt(new Element('span', {html:node.text,
                events:
                {
                    click:function() {
                        if (!tree.options.multiselect)
                            tree.getDomRootNode().getElements('span').removeClass('seleced');
                        tree.clickCaption(this);
                        return false;
                    }
                    ,
                    dblclick:function() {
                        tree.dblclickCaption(this);
                        return false;
                    }
                }
            })); //caption
            if (this.options.showFiled)
            {
				 var treeNodeControlPane = new Element('div', {'class':this.options.treeNodeControlPaneCss});
				 treeNodeControlPane.adopt(new Element('span',{'html':node[this.options.showFiled]}));
				 treeLiDiv.adopt(treeNodeControlPane);
            }
        } else {
            treeLiDiv.adopt(new Element('input', {type:'text','class':'editCaption',value:node.text})); // edit caption box
            var treeNodeControlPane = new Element('div', {'class':this.options.treeNodeControlPaneCss});
            //添加
            treeNodeControlPane.adopt(new Element('button', {'class':this.options.addButtonCss,html:this.options.addButtonCaption,
                'events':
                {
                    'click':function() {
                        var allLi = tree.getDomRootNode().getElements("li");
                       //生成一个唯一ID begin
                       function hasId(allLi,id)
                       {
                           for (var i=0;i<allLi.length;i++)
                           {
                               if (allLi[i].get('id')==tree.options.prefix + '_'  + tree.options.prefix  + id) return true;
                           }
                           return false;
                       }
                       var newId = allLi.length+1;
                       while (hasId(allLi,newId))
                       {
                           newId++;
                       }
                       //生成一个唯一ID end
                        var node = this.getParent('li');
                        var nid = tree.options.prefix + newId;
                        var newNode = {id:nid,iocn:'',openIcon:'',inputType:'',inputCss:'',text:'',action:'',pid:node.id};
                        tree.addNode(node.id, tree.createNode(newNode));
                    }
                }
            }));
 
            //li移动
            var treeNodeMove = function() {
                //得到节点li--------------前面有这个变量了
                var thisNode = this.getParent('li');
                if (this.get('class') == tree.options.downButtonCss) {
                    var nextNode = thisNode.getNext();
                    if (nextNode) {
                        //向下
                        thisNode.inject(nextNode, 'after');
                    }
                }
                else {
                    var PreviousNode = thisNode.getPrevious(); //得到这个节点
                    if (PreviousNode) {
                        //向上
                        thisNode.inject(PreviousNode, 'before');
                    }
                }
                //-------------判断按钮
                var checkNode = thisNode.getParent('li');
                if (!checkNode)
                    checkNode = $(tree.options.prefix + '_' + tree.options.rootId);
                tree.refreshButton(checkNode, false);
            };
            treeNodeControlPane.adopt(new Element('button', {'class':this.options.upButtonCss,html:this.options.upButtonCaption,
                events:
                {
                    click:treeNodeMove
                }
            })); //上移
            treeNodeControlPane.adopt(new Element('button', {'class':this.options.downButtonCss,html:this.options.downButtonCaption,
                events:
                {
                    click:treeNodeMove
                }
            })); //下移
 
 
            treeNodeControlPane.adopt(new Element('button', {'class':this.options.deleteButtonCss,html:this.options.deleteButtonCaption,
                events:
                {
                    click:function() {
                        //删除咨询
                        var node = this.getParent('li');
                        if (node) {
                            if(confirm("是否确定删除?") == true){
                                tree.fireEvent('deleteBefore',node.id);
                                node.destroy();
                            }
                        }
                    }
                }
            }));//删除
 
            treeNodeControlPane.adopt(new Element('button', {'class':this.options.editButtonCss,html:this.options.editButtonCaption,
                events:
                {
                    click:function() {
 
                        tree.fireEvent('clickEditButton', node.id);
                    }
                }
            })); //编辑详细
 
            treeLiDiv.adopt(treeNodeControlPane);
        }
        treeLiNode.adopt(new Element('ul', {'class':'treeNodes'})); //子节点位置
        return treeLiNode;
    }
    ,
    addNode:function(pId, nodeEL) {
 
        if (!pId || pId == '')
        {
            var pane = $(this.options.paneId);
            if (pane) pane.adopt(nodeEL);
        }
        else {
            var prefix = this.options.prefix;
            var liId = pId;
            if (!liId.startsWith(prefix + '_')) liId = prefix + '_' + pId;
            var pEL = $(liId);
            if (pEL) pEL.getElement('ul').adopt(nodeEL);
        }
    }
    ,
    deleteButtonEnable:function(liNode, disabled) {
        if (!liNode) return;
        var btnDel = liNode.getElement('button.treeNodeDeleteButton');
        if (!btnDel) return;
        if (disabled) {
            btnDel.setStyles({
                background:'url(' + this.options.operateIcon + ') 0 0px',
                cursor:'pointer'
            });
            btnDel.removeProperty('disabled');
        } else {
            //如果成立(即btnUp在第一行li中),设置这个btnUp样式为禁止
            btnDel.setStyles({
                background:'url(' + this.options.operate2Icon + ') 0 0px',
                cursor:'not-allowed'
            });
            btnDel.set('disabled', 'disabled');
        }
    }
    ,
    upButtonEnable:function(liNode, disabled) {
        if (!liNode) return;
        var btnUp = liNode.getElement('button.treeNodeUpButton');
        if (!btnUp) return;
        if (disabled) {
            //如果成立(即btnUp在第一行li中),设置这个btnUp样式为禁止
            btnUp.setStyles({
                background:'url(' + this.options.operateIcon + ') 0 -34px',
                cursor:'pointer'
            });
            btnUp.removeProperty('disabled');
        } else {
            //如果成立(即btnUp在第一行li中),设置这个btnUp样式为禁止
            btnUp.setStyles({
                background:'url(' + this.options.operate2Icon + ') 0 -34px',
                cursor:'not-allowed'
            });
            btnUp.set('disabled', 'disabled');
        }
    }
    ,
    downButtonEnable:function(liNode, disabled) {
        if (!liNode) return;
        var btnDown = liNode.getElement('button.treeNodeDownButton');
        if (!btnDown) return;
        if (disabled) {
            //如果成立(即btnUp在第一行li中),设置这个btnUp样式为禁止
            btnDown.setStyles({
                background:'url(' + this.options.operateIcon + ') 0 -17px',
                cursor:'pointer'
            });
            btnDown.removeProperty('disabled');
        } else {
            //如果成立(即btnUp在第一行li中),设置这个btnUp样式为禁止
            btnDown.setStyles({
                background:'url(' + this.options.operate2Icon + ') 0 -17px',
                cursor:'not-allowed'
            });
            btnDown.set('disabled', 'disabled');
        }
    }
    ,
    getDomChildren:function(liNode) {
        //得到 liNode 节点下的所有兄弟节点
        if (!liNode) return false;
        var ul = liNode.getElement('ul');
        return ul.childNodes;
    }
    ,
    getDomXml:function() {
        return '<tree>\r\n' + this.getNodesXml(this.getDomRootNode(), 1) + '</tree>';
    }
    ,
    getNodesXml:function(liNode, sort) {
        if (!liNode) return '';
        var result = '';
        var node = '<node id="' + liNode.id.substring(this.options.prefix.length + 1) + '" ';
        if (this.options.edit)
            node = node + 'text="' + liNode.getElement('input.editCaption').get('value').xmlEscape() + '" ';
        else
            node = node + 'text="' + liNode.getElement('span').get('html').xmlEscape() + '" ';
 
        node = node + 'icon="' + liNode.getElement('img').get('icon') + '" ';
        node = node + 'openIcon="' + liNode.getElement('img').get('openIcon') + '" ';
        node = node + 'sort="' + sort + '" ';
 
        if (liNode.getParent('li'))
            node = node + 'pid="' + liNode.getParent('li').id.substring(this.options.prefix.length + 1) + '" ';
        else node = node + 'pid="" ';
        node = node + "/>\r\n";
        result = result + node;
 
        var childs = this.getDomChildren(liNode);
        if (childs && childs.length > 0) {
            for (var i = 0; i < childs.length; i++)
                result = result + this.getNodesXml(childs[i], i + 1);
        }
        return result;
    }
    ,
    getDomJosn:function() {
        return JSON.encode(this.getNodesJosn(this.getDomRootNode()));
    }
    ,
    getNodesJosn:function(liNode) {
        var result = [];
        var node = {};
        node.id = liNode.id.substring(this.options.prefix.length + 1);
        if (this.options.edit)
            node.text = liNode.getElement('input.editCaption').get('value');
        else
            node.text = liNode.getElement('span').get('html');
        node.iocn = liNode.getElement('img').get('icon');
        node.openIcon = liNode.getElement('img').get('openIcon');
        if (liNode.getParent('li'))
            node.pid = liNode.getParent('li').id.substring(this.options.prefix.length + 1);
        else node.pid = '';
        result.push(node);
        var childs = this.getDomChildren(liNode);
        if (childs)
            for (var i = 0; i < childs.length; i++)
                result.push(this.getNodesJosn($(childs[i].id)));
        return result;
    }
    ,
    refreshButton: function(liNode, inChild) {
        //从liNode 节点开始向下遍历
        if (!liNode) return false;
        var startNode = liNode.getElement('ul');
        var children = startNode.childNodes;
        for (var i = 0; i < children.length; i++) {
            if (children[i].get('tag').toLowerCase() != 'li') break;
            //子节点begin
            if (inChild) {
                var childs = this.getDomChildren(children[i]);
                if (childs) {
                    this.refreshButton(children[i], inChild);
                }
            }
            //子节点end
            if (children.length == 1) {
                this.upButtonEnable(children[i], false);
                this.downButtonEnable(children[i], false);
                break;
            }
            if (i == 0) {
                this.upButtonEnable(children[i], false);
                if (children.length > 1)
                    this.downButtonEnable(children[i], true);
                else
                    this.downButtonEnable(children[i], false);
                continue;
            }
            if (children.length - 1 == i) {
                this.downButtonEnable(children[i], false);
                if (children.length > 1)
                    this.upButtonEnable(children[i], true);
                else
                    this.upButtonEnable(children[i], false);
                continue;
            }
            this.upButtonEnable(children[i], true);
            this.downButtonEnable(children[i], true);
        }
    }
});
//--------------------------进度条
var JProgressBar = new Class({
    Implements: [Events, Options],
    options: {
        container: $(document.body),
        width:0,
        startPercentage: 0,
        displayText: false,
        speed:10,
        step:1,
        allowMore: false
    },
 
    initialize: function(options) {
        this.times = Number.random(0, 10000);
        options.boxID = 'progressBarBg_' + this.times;
        options.percentageID = 'progressBarPoint_' + this.times;
        options.displayID = 'progressBarDisplay_' + this.times;
        this.setOptions(options);
        var box = new Element('div', {id:this.options.boxID,'class':'progressBarBg'});
        if (this.options.width<1) this.options.width = this.options.container.getStyle('width').toInt();
        if (this.options.width>200) this.options.width = 200;
        if (this.options.width > 0) box.setStyle('width', this.options.width);
        var per = new Element('div', {id:this.options.percentageID,'class':'progressBarPoint'});
        per.inject(box);
        box.inject(this.options.container);
        if (this.options.displayText) {
            per.adopt(new Element('div', {id:this.options.displayID,'class':'progressBarText'}));
        }
        this.set(this.options.startPercentage);
    },
 
    //计算得到百分比
    calculate: function(percentage) {
       if (percentage==0) return 1;
        return ($(this.options.boxID).getStyle('width').toInt() * (percentage / 100)).toInt();
    },
 
    //动画动作
    animate: function(go) {
       if (!go) go = 0;
        if (!this.options.allowMore && go > 100) go = 100;
        var percentage = $(this.options.percentageID);
        if (percentage)
        {
            percentage.set('morph',
                    {duration: this.options.speed,
                        link:'cancel',
                        onComplete: this.fireEvent(go == 100 ? 'complete' : 'change', [go], this.options.speed)
                    }
            ).morph({width:this.calculate(go)});
            percentage.set('text', go + '%');
        }
       this.to = go;
    },
    //设置到指定位置
    set: function(to) {
        this.animate(to);
    },
    //按照步长增长
    step: function() {
        this.set(this.to.toInt() + this.options.step);
    },
    destroy:function(){
        var box = $(this.options.boxID);
        if (box) box.destroy();
    }
});
/*-------------------tagsBox */
var TagboxList = new Class({
    Implements: [Options, Events],
    options: {
        split:' ', //切分符号
        max: 5,  //最大个数
        unique: true,  //清除相同的
        editableFloat: 'right', //编辑框所在方向
        hideEditable: false //隐藏编辑框
        /*
         onBitBoxRemove: $empty,
         onBitBoxFocus: $empty,
         onBitBoxBlur: $empty,
        */
    },
    initialize: function(element, options) {
        this.setOptions(options);
        this.container=$(element);
        if (this.container==null) return;
        //隐藏原编辑框
        this.original =this.container.setStyle('display', 'none').set('autocomplete', 'off');
        //容器面板
        this.container = new Element('div', {'class': 'tagboxList'}).inject(element, 'after');
 
        this.ulDiv = new Element('ul', {'class':'tagboxList-bits'}).inject(this.container);
 
        this.container.addEvent('click', function(e) {
            if ((e.target == this.ulDiv || e.target == this.container) &&!this.focused) this.focus();
        }.bind(this));
        this.focused = false;
        this.refresh();
 
        var ta = this;
        window.addEvents({
            'click': function(e) {
                if (!e.target.className.contains('tagbox-bit')&&e.target != this.container) {
                    ta.onBitBlur();
                }
            }.bind(this),
            'keydown':function(ev) {
                if (!ta.focused) return;
                var focusTo = -1;
                if (ev.key =='delete'||ev.code==46)
                {
                    ev.stop();
                    var liArray = ta.ulDiv.getElements('li');
                    liArray.each(function(e,i)
                    {
                        if (e.hasClass('tagbox-bit-box-focus'))
                        {
                            focusTo = i;
                            return false;
                        }
                    });
                    var result = ta.remove();
                    (function(){
                        focusTo = focusTo-1;
                        liArray = ta.ulDiv.getElements('li');
                        if (focusTo>=0&&focusTo<liArray.length)
                        {
                            if (!liArray[focusTo].hasClass('tagboxList-bit-editable'))
                                liArray[focusTo].addClass('tagbox-bit-box-focus');
                        }
                    }).delay(200);
                    return result;
                }
                if (ev.key =='left'||ev.code==37)
                {
                    ev.stop();
                    var liArray = ta.ulDiv.getElements('li');
                    for (var i=0;i<liArray.length-1;i++)
                    {
                        var e = liArray[i];
                        if (e.hasClass('tagbox-bit-box-focus'))
                        {
                            focusTo = i-1;
                            break;
                        }
                    }
                    if (focusTo>-1)
                    {
                         liArray.removeClass('tagbox-bit-box-focus');
                         liArray[focusTo].addClass('tagbox-bit-box-focus');
                    }
                    return;
                }
                if (ev.key=='right'||ev.code==39)
                {
                    ev.stop();
                    var liArray = ta.ulDiv.getElements('li');
                    for (var i=0;i<liArray.length-1;i++)
                    {
                        var e = liArray[i];
                        if (e.hasClass('tagbox-bit-box-focus'))
                        {
                            focusTo = i+1;
                            break;
                        }
                    }
 
                    if (focusTo>-1&&focusTo<(liArray.length-1))
                    {
                        for (var i=0;i<liArray.length-1;i++)
                        {
                            var e = liArray[i];
                            if (e.hasClass('tagbox-bit-box-focus'))
                                e.removeClass('tagbox-bit-box-focus');
                            if (focusTo==i&&!e.hasClass('tagboxList-bit-editable'))
                                e.addClass('tagbox-bit-box-focus');
                        }
                    }
                }
               
               
            }.bind(this)
        });
    },
    refresh: function () {
        var ta = this;
        this.ulDiv.empty();
        var value = this.original.get('value').trim();
        var lineArray = value.toArray(this.options.split).clean();
        var inputLiEl = false;
        this.inputEl = false;
        if (!this.options.hideEditable)
        {
            inputLiEl = new Element('li', {"class": 'tagboxList-bit tagboxList-bit-editable'});
            this.inputEl = new Element('input', {'type':'text',"class":"tagboxList-bit-editable-input"});
            inputLiEl.adopt(this.inputEl);
            this.inputEl.addEvent('keydown', function(event){
                if (event.key=='enter')
                {
                    event.stop();
                    var v = this.get('value');
                    if (v!='')
                    {
                        ta.add(v);
                    }
                }
            });
            if (this.options.editableFloat=='left') this.ulDiv.adopt(inputLiEl);
        }

        for (var i = 0; i < lineArray.length&&i<this.options.max; i++)
        {
            var word = lineArray[i];
            if (word=='') continue;
            var liEl = new Element('li', {"class": 'tagboxList-bit tagbox-bit-box tagbox-deletable','html':word,'word':word});
            var deleteButton = new Element('a', {'class':'tagbox-deletebutton','html':'×'});
            liEl.adopt(deleteButton);
            deleteButton.addEvent('click', function() {
                ta.ulDiv.getElements('li').removeClass('tagbox-bit-box-focus');
                this.getParent('li').addClass('tagbox-bit-box-focus');
                ta.remove();
            });
 
            liEl.addEvent('click', function() {
                ta.ulDiv.getElements('li').removeClass('tagbox-bit-box-focus');
                this.addClass('tagbox-bit-box-focus');
                ta.onBitFocus();
            });
 
            this.ulDiv.adopt(liEl);
        }
 
        if (!this.options.hideEditable&&this.options.editableFloat=='right') this.ulDiv.adopt(inputLiEl);
 
       
    }
    ,
    add: function(bit) {
        if (bit==undefined) return this;
        var lineArray = String(this.original.get('value')).trim().toArray(this.options.split).clean();
        if(lineArray.length>=this.options.max) return;
        lineArray.include(bit);
        this.original.set('value', lineArray.toString(this.options.split).trim());
        this.refresh();
        this.focus();
        return this;
    }
    ,
    remove: function(bit) {
        if (bit==undefined) bit = this.getSelectedTag();
        bit=String(bit).trim();
        if (bit==''||typeof(bit)==Object ) return;
        var value = this.original.get('value').trim();
        var lineArray = value.toArray(this.options.split).clean();
        lineArray.erase(bit);
        this.original.set('value',lineArray.toString(this.options.split));
        this.refresh();
        this.fireEvent('bitBoxRemove',bit);
        return bit;
    }
    ,
    focus: function() {
        if (this.inputEl)
        {
           this.focused = false;
          if (Browser.name=='ie')
          {
              (function(){
                  this.inputEl.focus(); 
              }).delay(100,this);
          }
          else this.inputEl.focus();
        }
    },
    onBitFocus: function() {
        this.focused = true;
        this.fireEvent('bitBoxFocus',this.getSelectedBit());
    }
    ,
    onBitBlur: function() {
        if (!this.focused) return this;
        this.focused = false;
        this.fireEvent('bitBoxBlur',this);
    }
    ,
    getSelectedBit: function() {
        return this.ulDiv.getElements('li.tagbox-bit-box-focus');
    }
    ,
    getSelectedTag: function() {
        var el = this.getSelectedBit();
        if (!el) return this;
        return el.get('word');
    }
    ,
    getValue: function() {
        return this.original.get('value').trim();
    }
    ,
    setValue: function(v) {
        this.original.set('value',v);
        this.refresh();
        return this;
    }
});
/*-------------------JUsersBox */
var JUsersBox = new Class({
    Implements: [Events, Options],
    options: {
        container: 'userBox',
        width:false,
        height:20,
        debug:false,
        hideIcon:false,
        inputId:'userBox',
        selectIcon:'/script/images/add.gif',
        split:';', //切分符号     background-color:#F8E3F9
        marker: {'user':{'startTag':'[','endTag':']','centerTag':':','icon':'/script/images/user.gif','color':'#dee7f8'},
                  'group':{'startTag':'{','endTag':'}','centerTag':':','icon':'/script/images/users.gif','color':'#F0F1D6'},
                  'contacts':{'startTag':'<','endTag':'>','centerTag':':','icon':'/script/images/users.gif','color':'#DFEEF4'},
                  'follow':{'startTag':'「','endTag':'」','centerTag':':','icon':'/script/images/users.gif','color':'#F5F0F7'}
        },
        refreshButton:false,
        clearButton:false
    },
    initialize: function (options) {
        this.setOptions(options);
 
        this.element = document.id(options.container);
        if (this.options.debug==false) this.element.setStyle('display', 'none');
        var ta = this;
        if (this.options.refreshButton)
        {
            var refreshButton = $(this.options.refreshButton);
            if (refreshButton)
                refreshButton.addEvent('click', function(){
                    ta.refresh();
                });
        }
        if (this.options.clearButton)
        {
            var clearButton = $(this.options.clearButton);
            if (clearButton)
                clearButton.addEvent('click', function(){
                    ta.clear();
                });
        }
        this.element.addEvent('change', function(){
            ta.refresh();
        });
 
        this.ulDiv = new Element('ul',{'class':'tagboxList-bits'});
         if (this.options.height) this.ulDiv.setStyle('height',this.options.height);
        if (this.options.width) this.ulDiv.setStyle('width',this.options.width);
        this.element.getParent().adopt(this.ulDiv);
        this.ulDiv.inject(this.element, 'before');
 
        if (!this.options.hideIcon)
        {
            this.clickBtn = new Element('a',{'class':'selectBtn',events: {
                click: function(e) {
                    e.target = ta;
                    ta.fireEvent('clickSelected',e);
                }}});
            this.clickBtn.adopt(new Element('img',{'src':this.options.selectIcon}));
        }
 
        this.focused = false;
        this.refresh();
 
        window.addEvents({
            'click': function(e) {
                if (!e.target.className.contains('user')&&!e.target.className.contains('group')
                        &&!e.target.className.contains('tagbox-bit-box')&&e.target!=ta.ulDiv)
                {
                    ta.onBitBlur();
                }
            }.bind(this),
            'keydown':function(ev) {
                if (!ta.focused) return;
                var focusTo = -1;
                if (ev.key=='delete'||ev.code==46)
                {
                    ev.stop();
                    var liArray = ta.ulDiv.getElements('li');
                    liArray.each(function(e,i)
                    {
                        if (e.hasClass('tagbox-bit-box-focus'))
                        {
                            focusTo = i;
                            return;
                        }
                    });
                    var result = ta.remove();
                    (function(){
                        focusTo = focusTo-1;
                        liArray = ta.ulDiv.getElements('li');
                        if (focusTo>=0&&focusTo<liArray.length)
                        {
                            liArray[focusTo].addClass('tagbox-bit-box-focus');
                            liArray[focusTo].setStyle('background','');
                        }
                    }).delay(200);
                }
                if (ev.key=='left'||ev.code==37)
                {
                    ev.stop();
                    focusTo = -1;
                    var liArray = ta.ulDiv.getElements('li');
                    if (liArray) liArray.each(function(e,i)
                    {
                        if (e.hasClass('tagbox-bit-box-focus'))
                        {
                            focusTo = i-1;
                            return;
                        }
                    });
                    if (focusTo>-1)
                    {
                        liArray.each(function(e,i)
                        {
                            if (e.hasClass('tagbox-bit-box-focus'))
                            {
                                e.removeClass('tagbox-bit-box-focus');
                                e.setStyle('background', e.get('typeColor'));
                            }
                            if (focusTo==i)
                            {
                                e.addClass('tagbox-bit-box-focus');
                                e.setStyle('background','');
                            }
                        });
                    }
                }
                if (ev.key=='right'||ev.code==39)
                {
                    ev.stop();
                    var liArray = ta.ulDiv.getElements('li');
                    if (liArray) liArray.each(function(e,i)
                    {
                        if (e.hasClass('tagbox-bit-box-focus'))
                        {
                            focusTo = i+1;
                            return;
                        }
                    });
                    if (focusTo>-1&&focusTo<liArray.length)
                    {
                        liArray.each(function(e,i)
                        {
                            if (e.hasClass('tagbox-bit-box-focus'))
                            {
                                e.removeClass('tagbox-bit-box-focus');
                                e.setStyle('background', e.get('typeColor'));
                            }
                            if (focusTo==i)
                            {
                                e.addClass('tagbox-bit-box-focus');
                                e.setStyle('background','');
                            }
 
                        });
                    }
                }
            }.bind(this)
        });
    },
    isUser:function(data)
    {
        if (!data) return false;
        return data.startsWith(this.options.marker.user.startTag) && data.contains(this.options.marker.user.centerTag) && data.endWith(this.options.marker.user.endTag);
    }
    ,
    isGroup:function(data)
    {
        if (!data) return false;
        return data.startsWith(this.options.marker.group.startTag) && data.contains(this.options.marker.group.centerTag) && data.endWith(this.options.marker.group.endTag);
    },
    isContacts:function(data)
    {
        if (!data) return false;
        return data.startsWith(this.options.marker.contacts.startTag) && data.contains(this.options.marker.contacts.centerTag) && data.endWith(this.options.marker.contacts.endTag);
    },
    isFollow:function(data)
    {
        if (!data) return false;
        return data.startsWith(this.options.marker.follow.startTag) && data.contains(this.options.marker.follow.centerTag) && data.endWith(this.options.marker.follow.endTag);
    },
    createElement:function(line)
    {
        if (!line) return false;
        var ta = this;
        var liEl = new Element('li', {"class":"tagboxList-bit tagbox-bit-box","word":line,events: {
                            click:function(){
                                ta.ulDiv.getElements('li').each(function(e)
                                {
                                    if (e.hasClass('tagbox-bit-box-focus'))
                                    {
                                        e.removeClass('tagbox-bit-box-focus');
                                        e.setStyle('background', e.get('typeColor'));
                                    }
                                });
                                this.addClass('tagbox-bit-box-focus');
 
                                liEl.setStyles({'background':'#FFF','color':'#000'});
                                ta.onBitFocus();
                            }
                }
        });
 
        if (this.isUser(line))
        {
            liEl.set('typeColor',this.options.marker.user.color);
            var id = line.substringAfter(this.options.marker.user.startTag).substringBefore(this.options.marker.user.centerTag).trim();
            var userName = line.substringAfter(this.options.marker.user.centerTag).substringBefore(this.options.marker.user.endTag).trim();
            liEl.adopt(new Element('img', {"src": this.options.marker.user.icon}));
            var spanEl = new Element('span', {"class":"user",'ref':id,"type":"user",'html':userName});
            liEl.adopt(spanEl);
            var deleteEl = new Element('a', {"ref": id, "class": "tagbox-deletebutton","html":"×",
                events: {
                    click:function()
                    {
                        ta.remove(liEl.get('word'));
                        ta.focused = false;
                    }
                }
            });
            liEl.adopt(deleteEl);
        }
        if (this.isGroup(line))
        {
            liEl.set('typeColor',this.options.marker.group.color);
            var id = line.substringAfter(this.options.marker.group.startTag).substringBefore(this.options.marker.group.centerTag).trim();
            var groupName = line.substringAfter(this.options.marker.group.centerTag).substringBefore(this.options.marker.group.endTag).trim();
            liEl.adopt(new Element('img', {"src": this.options.marker.group.icon}));
            liEl.adopt(new Element('span', {"class":"group",'ref':id,'html':groupName,"type":"group",'title':'部门'}));
             var deleteEl = new Element('a', {"ref": id, "class": "tagbox-deletebutton","html":"×",
                events: {
                    click:function()
                    {
                        ta.remove(liEl.get('word'));
                        ta.focused = false;
                    }
                }
            });
            liEl.adopt(deleteEl);
        }
        if (this.isContacts(line))
        {
            liEl.set('typeColor',this.options.marker.contacts.color);
            var id = line.substringAfter(this.options.marker.contacts.startTag).substringBefore(this.options.marker.contacts.centerTag).trim();
            var userName = line.substringAfter(this.options.marker.contacts.centerTag).substringBefore(this.options.marker.contacts.endTag).trim();
            liEl.adopt(new Element('img', {"src": this.options.marker.contacts.icon}));
            liEl.adopt(new Element('span', {"class":"group",'ref':id,'html':userName,"type":"contacts",'title':'通讯录'}));
            var deleteEl = new Element('a', {"ref": id, "class": "tagbox-deletebutton","html":"×",
                events: {
                    click:function()
                    {
                        ta.remove(liEl.get('word'));
                        ta.focused = false;
                    }
                }
            });
            liEl.adopt(deleteEl);
        }
        if (this.isFollow(line))
        {
            liEl.set('typeColor',this.options.marker.follow.color);
            var id = line.substringAfter(this.options.marker.follow.startTag).substringBefore(this.options.marker.follow.centerTag).trim();
            var userName = line.substringAfter(this.options.marker.follow.centerTag).substringBefore(this.options.marker.follow.endTag).trim();
            liEl.adopt(new Element('img', {"src": this.options.marker.follow.icon}));
            liEl.adopt(new Element('span', {"class":"group",'ref':id,"type":"follow",'html':userName,'title':'关注'}));
            var deleteEl = new Element('a', {"ref": id, "class": "tagbox-deletebutton","html":"×",
                events: {
                    click:function()
                    {
                        ta.remove(liEl.get('word'));
                        ta.focused = false;
                    }
                }
            });
            liEl.adopt(deleteEl);
        }
        liEl.setStyle('background',liEl.get('typeColor'));
        return liEl;
    },
    refresh: function () {
        this.ulDiv.empty();
        var ta = this;
        var value = this.element.get('value').trim();
        var split = this.options.split;
        var lineArray = value.toArray(split);
 
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i];
            if (line=='') continue;
            var liEl = ta.createElement(line);
            this.ulDiv.adopt(liEl);
        }
        this.ulDiv.adopt(this.clickBtn);
 
    },
    getSelectedBit: function() {
        return this.ulDiv.getElements('li.tagbox-bit-box-focus');
    }
    ,
    getValue: function () {
        return this.element.get('value');
    },
    setValue: function (v) {
        var split = this.options.split;
        var lineArray = v.toArray(split);
        var str = '';
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i];
            if (line==''||str.indexOf(line)!=-1) continue;
            str = str + line;
            if (i<(lineArray.length-1))  str = str+ split;
        }
        this.element.set('value',str);
        this.refresh();
 
    },
    onBitFocus: function() {
        this.focused = true;
        this.fireEvent('bitBoxFocus',this.getSelectedBit());
    }
    ,
    onBitBlur: function() {
        if (!this.focused) return this;
        this.focused = false;
        this.fireEvent('bitBoxBlur',this);
    }
    ,
    add:function (v) {
        var value = this.element.get('value').trim();
        var split = this.options.split;
        var lineArray = (value+split+v).toArray(split);
        var str = '';
        for (var i = 0; i < lineArray.length; i++) {
            var line = lineArray[i];
            if (line==''||str.indexOf(line)!=-1) continue;
            str = str + line;
            if (i<(lineArray.length-1))  str = str+ split;
        }
        this.element.set('value',str);
        this.element.fireEvent('change');
    },
    remove: function(bit) {
        if (bit==undefined) bit = this.getSelectedTag();
        bit=String(bit).trim();
        if (bit==''||typeof(bit)==Object) return;
        var value = this.element.get('value').trim();
        var lineArray = value.toArray(this.options.split).clean();
        lineArray.erase(bit);
        this.element.set('value',lineArray.toString(this.options.split));
        this.refresh();
        this.fireEvent('bitBoxRemove',bit);
        return bit;
    },
    getSelectedTag: function() {
        var el = this.getSelectedBit();
        if (!el) return this;
        return el.get('word');
    },
    clear:function () {
        this.element.set('value','');
        this.element.fireEvent('change');
    }
    ,
    getInputId:function () {
        return this.options.inputId;
    }
 
});
//----------------密码iphone方式
var PassShark = new Class({
   Implements: [Options, Events, Class.Occlude],
   Binds: ['start', 'stop', '_check'],
   options: {
       interval: 200,
       duration: 2000,
       replacement: '%u25CF',
       prefix: 'password-',
       debug: false
       /*
       onStageChange: $empty
       */
   },
   initialize: function(element, options){
       this.origElement = this.element = document.id(element);
       if (this.occlude()) return this.occluded;
       this.setOptions(options);
       this.$E = function(selector){ return document.getElement(selector); };
       this._setup();
   },
 
   _setup: function(){
       if (this.options.debug) this.enableLog();
       var attributes = this.origElement.getProperties(
           'name',
           'id',
           'class',
           'style',
           'size',
           'maxlength',
           'disabled',
           'tabindex',
           'accesskey',
           'value'
       );
       this.checker = null;
       this.timer = null;
       this._cloakInput(attributes);
   }.protect(),
 
   _cloakInput: function(params){
       // Display none the original element.
       this.origElement.hide();
       var standardMaxLength = 255;
       var opts = this.options;
       var attributes = (typeof params == 'object') ? Object.append( params , {
           'type': 'text',
           'name': opts.prefix + (params.name ? params.name : ''),
           'id': opts.prefix + (params.id ? params.id : ''),
           'maxlength': params.maxlength != -1 ? params.maxlength : standardMaxLength,
           'accesskey': params.accesskey != undefined ? params.accesskey : '',
           'tabindex': params.tabindex != '' ? params.tabindex : ''
       }) : {};
 
       // Adding the new text field.
       var input = new Element('input', attributes).inject(this.origElement, 'after');
       // Adapt label to new field.
       if (this.$E('label[for='+params.id+']')) this.$E('label[for='+params.id+']').setProperty('for', opts.prefix + params.id);
        else (new Element('label')).setProperty('for', opts.prefix + params.id);
       // Disable tabindex.
       this.origElement.setProperty('tabindex', '');
       // Disable accesskey.
       this.origElement.setProperty('accesskey', '');
       // Set events
       this.element = input.store('focus', 0).addEvents({
           'focus': this.start,
           'blur': this.stop
       });
       this._check.delay(opts.interval, this, ['', true]);
   }.protect(),
 
   start: function(event){
       if (this.options.debug) this.log('Event:', event.type);
       this.element.store('focus', 1);
       $clear(this.checker);
       this.checker = this._check.delay(this.options.interval, this, '');
   },
 
   stop: function(event){
       if (this.options.debug) this.log('Event:', event.type);
       this.element.store('focus', 0);
       this.checker = $clear(this.checker);
   },
 
   _onDeletion: function(caret, diff){
       var value = this.origElement.get('value');
       var split = caret;
       if ((typeof(caret)== 'number') && (this.element.getCaretPosition() < caret)) {
           split = caret - diff;
       }
       else if (typeOf(caret)!= 'object') {
           caret = caret + diff;
       }
       var str1 = value.slice(0, caret.start || split);
       var str2 = value.slice(caret.end || caret);
       this.origElement.set('value', str1+str2);
   }.protect(),
 
   _setPassword: function(str) {
       if (this.options.debug) this.log('_setPassword:', str);
       var tmp = '';var add = 0;
       for (var i=0; i < str.length; i++) {
           if (str.charAt(i) == unescape(this.options.replacement)) {
               tmp += this.origElement.get('value').charAt(i - add);
           } else {
               tmp += str.charAt(i);
               if (this.element.getCaretPosition() !== str.length) {
                   add++;
               }
           }
       }
       this.origElement.set('value', tmp);
   }.protect(),
 
   _convertLastChar: function() {
       if (this.element.get('value') != '') {
           var tmp = '';
           for (var i=0; i < this.element.get('value').length; i++) {
               tmp += unescape(this.options.replacement);
           }
           var caret = this._getCaretRange();
           this.element.set('value', tmp);
           if (this.element.retrieve('focus')) this._correctCaret(caret);
       }
   },
 
   _check: function(oldValue, initialCall, posCaret){
       if (this.options.debug) this.log('_check:', oldValue);
       var bullets = this.element.get('value');
       if (bullets.length < oldValue.length) {
           var subtract = oldValue.length - bullets.length;
           this._onDeletion(posCaret, subtract);
       }
       if (oldValue != bullets) {
           this._setPassword(bullets);
           if (bullets.length > 1) {
               var tmp = '';
               for (i=0; i < bullets.length-1; i++) {
                   tmp += unescape(this.options.replacement);
               }
               tmp += bullets.charAt(bullets.length-1);
               var caret = this._getCaretRange();
               this.element.set('value', tmp);
               this._correctCaret(caret);
           }
           $clear(this.timer);
           this.timer = this._convertLastChar.delay(this.options.duration, this);
       }
       if (!initialCall) {
           $clear(this.checker);
           this.checker = this._check.delay(this.options.interval, this, [this.element.get('value'), false, caret || this._getCaretRange()]);
       }
   },
 
   _correctCaret: function(caret){
       switch (typeOf(caret)) 
       {
           case 'number': return this.element.setCaretPosition(caret);
           case 'object': return this.element.selectRange(caret.start, caret.end);
       }
   }.protect(),
 
   _getCaretRange: function(){
       return (this.element.getSelectedRange().start === this.element.getSelectedRange().end) ? this.element.getCaretPosition() : this.element.getSelectedRange();
   }.protect()
 
});
//-----------多选框
//全选
function selectAll(id, name) {
    if (typeOf(id) == 'string')
        id = $(id);
    var inputs = id.getElements('input');
    inputs.each(function(e) {
        if (e.get('name') == name)
            e.set('checked', 'checked');
    });
}
//反选
function selectedConvert(id, name) {
    if (typeOf(id) == 'string')
        id = $(id);
    var inputs = id.getElements('input');
    inputs.each(function(e) {
        if (e.get('name') == name) {
            if (e.get('checked') == 'checked' || e.get('checked') == '')
                e.set('checked', 'checked');
            else e.set('checked', '');
        }
    });
}
//得到选择的值,方便ajax提交
function selectedValues(elId) {
    var result = [];
    var inputs = elId;
    if (typeOf(elId) == 'string') inputs = $$(elId);
    if (inputs) inputs.each(function(e) {
        if (e.get('checked'))
                result.push(e.get('value'));
        });
    return result;
}
 
function notSelectedValues(elId) {
    var inputs = elId;
    if (typeOf(elId) == 'string') inputs = $$(elId);
    if (inputs) inputs.each(function(e) {
        if (e.get('checked'))
                e.set('checked','');
        });
}
// 特殊类型
//selectbox : 选择框，tog:展开标记 ,button||cbutton 按钮 这几个只有编辑状态,其他标准空间不变
// ****************************************************************************
var JDataTable = new Class({
    Implements: [Events,Options],
    getOptions: function() {
        return {
            title: 'grid',
            alternaterows: true,
            showCaption:true,
            sortCaption:true,
            resizeColumns:true,
            selectable:true,
            serverSort:true,
            sortOn: null,
            sortBy: 'ASC',
            filterHide: true,
            filterHideCls: 'hide',
            filterSelectedCls: 'filter',
            multiselect:false,
            editMode:false,
            editondblclick:false,
            height:0,
            //accordion
            accordion:false,
            accordionRenderer:null,
            autoSectionToggle:true, //如果为 true 详细只打开一个，否则可以同时看多个
            showTog:false,
            openAccordionOnDblClick:false,
            //pagination
            url:null,
            pagination:false,
            currentPage:1,
            countOptions: [10,24, 30, 40, 60, 80, 100],
            count:24,
            filterInput:false,
            dataProvider:null,
            language:'zh'
           /*    
            onSelected:$empty(),
            onLoadAfter:$empty()
             ondblclick
           */
        };
    },
    initialize: function(options) {
        this.setOptions(this.getOptions(), options);
        if (typeof(this.options.table)=='element')
            this.container = this.options.table;
        else
        if (typeof(this.options.table)=='string')
             this.container = $(this.options.table);
        if (!this.container) return;
        //兼容老版本
        if (!this.options.buttons) {
            this.options.buttons = this.options.headButtons;
        }
        if (!this.options.columnModel) {
            this.options.columnModel = this.options.columnModels;
        }
        if (!this.options.height||this.options.height<1) {
             var docx = this.container.getParentDocument();
             this.options.height = docx.clientHeight*3/4 - 20;
        }
        this.useSelectBox = false;
        for (var i = 0; i < this.options.columnModel.length; i++) {
            if (this.options.columnModel[i].input == 'selectbox') {
                this.useSelectBox = true;
                break;
            }
        }
        this.draw();
       this.refresh();
        this.calendar = new Calendar(this.options.language, this.container.tagName);
        this.colorBox = new ColorBox({ptag:this.container.tagName});
    },
 
    // API
    reset: function() {
        this.renderData();
        this.refreshDelayID = null;
        this.dragging = false;
        this.selected = new Array();
 
        if (this.options.accordion)
            this.elements = this.ulBody.getElements('li:nth-child(2n+1)');
        else
            this.elements = this.ulBody.getElements('li');
 
        this.filtered = false;
        this.lastsection = null;
        if (this.options.alternaterows) this.altRow();
        this.elements.each(function(el, i) {
            el.addEvent('click', this.onRowClick.bind(this));
            el.addEvent('dblclick', this.onRowDblClick.bind(this));
            el.addEvent('mouseover', this.onRowMouseOver.bind(this));
            el.addEvent('mouseout', this.onRowMouseOut.bind(this));
        }, this);
 
        // **************************** Setup Caption ************************
        this.container.getElements('div.th').each(function(el, i) {
            var type = el.retrieve('type');
            if (type) {
                el.getdate = function(str) {
                    return str.toDate();
                };
                el.findData = function(elem) {
                    var child = elem.getFirst();
                    if (child) return el.findData(child); else  return elem.innerHTML();
                };
                el.compare = function(a, b) {
                    var var1 = a.getChildren()[i].innerHTML.trim();
                    var var2 = b.getChildren()[i].innerHTML.trim();
                    if (type == 'number' || type == 'int' || type == 'float') {
                        var1 = parseFloat(var1);
                        var2 = parseFloat(var2);
                        if (el.sortBy == 'ASC') {
                            return var1 - var2;
                        } else {
                            return var2 - var1;
                        }
                    } else if (type == 'string') {
                        var1 = var1.toUpperCase();
                        var2 = var2.toUpperCase();
                        if (var1 == var2) {
                            return 0
                        }
                        if (el.sortBy == 'ASC') {
                            if (var1 < var2) {
                                return -1
                            }
                        } else {
                            if (var1 > var2) {
                                return -1
                            }
                        }
                        return 1;
                    } else if (type == 'date') {
                        var1 = parseFloat(el.getdate(var1));
                        var2 = parseFloat(el.getdate(var2));
 
                        if (el.sortBy == 'ASC') {
                            return var1 - var2;
                        } else {
                            return var2 - var1;
                        }
                    } else if (type == 'currency') {
                        var1 = parseFloat(var1.substr(1).replace(',', ''));
                        var2 = parseFloat(var2.substr(1).replace(',', ''));
                        if (el.sortBy == 'ASC') {
                            return var1 - var2;
                        } else {
                            return var2 - var1;
                        }
                    }
                }
            }
        }, this);
 
    },
    //编辑模式
    editMode: function() {
        if (this.options.editMode) return;
        this.options.editMode = true;
        var grid = this;
        var lis = this.container.getElements("li");
        lis.each(function(li, i) {
            var rowData = grid.options.list[i];
            var tds = li.getElements("div.td");
            tds.each(function(e, j) {
                var th = grid.options.columnModel[j];
                var value = e.get('html');
                e.empty();
                if (!th.edit) return;
                if (typeOf(value) == 'string') {
                    value = value.replace(/\$\{/g, "$\\{").substitute({'index':i,'sortIndex':(i+1)}).replace(/\$\\\{/g, "${");
                }
                if (th.input == "select")
                    e.setAttribute("keyValue", value);
                if (rowData && (th.input == "button" || th.input == "cbutton"))
                    th.blink = th.link.substitute(rowData);
                if (th.input == "checkbox" && value == "" && th.name == "select") //没有值就默认为id
                    value = e.getAttribute("keyValue");
               var input = createInputElement(th, value);
                input.addClass('inline');
                e.adopt(input);
            });
        });
        this.reset();
    }
    ,
   //浏览模式
    viewMode: function() {
        if (!this.options.editMode) return;
        this.options.editMode = false;
        var lis = this.container.getElements("li");
        lis.each(function(li, i) {
            var tds = li.getElements("div.td");
            tds.each(function(e, j) {
                e.set('html', getTableCellValue(e, false));
                //if (e.get('html')=='') e.set('html','&nbsp;');
            });
        });
       this.reset();
    }
    ,
    finishEditing: function() {
       var cmu = this.options.columnModel;
        if (!cmu) return;
       var editMode = this.options.editMode;
       var result = new Array();
        var elements = this.ulBody.getElements('li.tr');
        elements.each(function(el, i) {
           var obj = new Object();
            var columns = el.getElements('div.td');
           columns.each(function(td){
               var filed = td.getProperty('filed');
               if (filed)
               {
                  obj[filed] = getTableCellValue(td, false);
               }
           });
            result.push(obj);
        });
       this.options.list = result;
    },
    addRow: function(data, row) {
       this.finishEditing();
        if (this.options.list==null) this.options.list = new Array();
       if (!data)
       {
            data = new Object();
           var cmu = this.options.columnModel;
            for (var i=0; i<cmu.length;i++) data[cmu[i].name] = "";
       }
       if (row) this.options.list.splice(row,row,data);
       else this.options.list.push(data);
        this.reset();
    },
    deleteRow: function(row) {
        if (row >= 0 && row < this.options.list.length) {
            this.options.list.splice(row, 1);
            this.refresh();
        }
    },
    toggle: function(el) {
        if (el.getStyle('display') != 'block') {
            el.setStyle('display', 'block');
           this.options.accordionRenderer({parent:el,rowdata:el.retrieve('rowdata')}); ////动态导入
        } else el.setStyle('display', 'none');
    },
    getSection: function(row) {
        return this.ulBody.getElement('.section-' + row);
    },
    getLiParent: function (target) {
        target = $(target);
        while (target && !target.hasClass('td')) {
            target = target.getParent();
        }
        if (target)
            return target.getParent();
    },
    onRowMouseOver: function (evt) {
        var li = this.getLiParent(evt.target);
        if (!li) return;
        if (!this.dragging)
            li.addClass('over');
        this.fireEvent("mouseover", {target:this, row:li.retrieve('row'), element:li });
    },
 
    onRowMouseOut: function (evt) {
        var li = this.getLiParent(evt.target);
        if (!li) return;
        if (!this.dragging)
            li.removeClass('over');
        this.fireEvent("mouseout", {targetk:this, row:li.retrieve('row'), element:li });
    },
    onSelectBoxClick:function(evt) {
        if (evt.target.type.toLowerCase() != 'checkbox') return;
        var li = this.getLiParent(evt.target);
        var check = evt.target.getProperty('checked');
        if (check) {
            if (!li.hasClass('selected')) {
                li.addClass('selected');
                this.selected.push(Number(li.retrieve('row')));
            }
        } else {
            if (li.hasClass('selected')) {
                li.removeClass('selected');
                this.selected.erase(Number(li.retrieve('row')));
            }
        }
    }
    ,
    onRowClick: function (evt) {
        if ("div" != evt.target.tagName.toLowerCase()) return;
        var li = this.getLiParent(evt.target);
        if (!li) return;
        if (this.options.selectable && evt.target.get('class') != 'toggleicon') {
            var currentindex = li.retrieve('row');
            var selectedNum = this.selected.length;
            var dontselect = false;
            var useSelectBox = this.useSelectBox;
 
            if ((!evt.control && !evt.shift) || !this.options.multiselect) {
                this.elements.each(function(el, i) {
                    if (useSelectBox) {
                        var selectBox = el.getElement('.selectbox');
                        if (selectBox) selectBox.removeProperty('checked');
                    }
                    el.removeClass('selected')
                }, this);
                this.selected = new Array();
            }
            if (evt.control) {
                for (var i = 0; i < selectedNum; i++) {
                    if (currentindex == this.selected[i]) {
                        var el = this.elements[ currentindex ];
                        el.removeClass('selected');
                        if (useSelectBox) {
                            var selectBox = el.getElement('.selectbox');
                            if (selectBox) selectBox.removeProperty('checked');
                        }
                        this.selected.splice(i, 1);
                        dontselect = true;
                    }
                }
            }
            if (evt.shift && this.options.multiselect) {
                var si = 0;
                if (this.selected.length > 0)
                    si = this.selected[selectedNum - 1];
 
                var endindex = currentindex;
                startindex = Math.min(si, endindex);
                endindex = Math.max(si, endindex);
 
                for (var i = startindex; i <= endindex; i++) {
                    var el = this.elements[i];
                    if (useSelectBox) {
                        var selectBox = el.getElement('.selectbox');
                        if (selectBox) selectBox.setProperty('checked', 'checked');
                    }
                   if (!el.hasClass('selected')) el.addClass('selected');
                    this.selected.push(Number(i));
                }
            }
            if (!dontselect) {
                if (useSelectBox) {
                    var selectBox = li.getElement('.selectbox');
                    if (selectBox) selectBox.setProperty('checked', 'checked');
                }
                li.addClass('selected');
                this.selected.push(Number(li.retrieve('row')));
            }
            this.unique(this.selected, true);
        }
        if (evt.target.get('class') == 'toggleicon' && this.options.accordion && !this.options.openAccordionOnDblClick) {
            this.accordianOpen(li);
        }
 
        this.fireEvent("click", {indices:this.selected, target:this, row:li.retrieve('row'), element:li });
       //预留给外部
        this.fireEvent("selected", {indices:this.selected, target:this,row:li.retrieve('row'), element:li });
    },
 
    toggleIconClick: function(evt) {
        var li = this.getLiParent(evt.target);
        this.accordianOpen(li);
    },
 
    accordianOpen: function(li) {
        var section = this.getSection(li.retrieve('row'));
        if (this.options.autoSectionToggle) {
 
            if (this.lastsection)
                if (this.lastsection != section) {
 
                    this.lastsection.setStyle('display', 'none');
                    var temp = this.lastsection.getPrevious();
                    if (temp) {
                        temp.getElement('.toggleicon').setStyle('background-position', '0 0');
                    }
                }
            if (!this.options.accordionRenderer) {
                section.setStyle('display', 'block');
            }
        }
        if (this.options.accordionRenderer)  this.toggle(section);
        if (this.options.showTog)  li.getElement('.toggleicon').setStyle('background-position', section.getStyle('display') == 'block' ? '-16px 0' : '0 0');
        this.lastsection = section;
    },
    onRowDblClick: function (evt) {
        if ("div" != evt.target.tagName.toLowerCase()) return;
        var li = this.getLiParent(evt.target);
        if (!li) return;
        var t = evt.target;
        if (this.options.editMode && this.options.editondblclick && t.hasClass('td')) {
            var childs = li.getChildren();
            for (var i = 0; i < childs.length; i++) {
                if (childs[i] == t) break;
            }
            var obj = this.edit({columnIndex:i});
            if (obj) obj.input.selectRange(0, obj.input.value.length);
        }
        if (this.options.accordion && this.options.openAccordionOnDblClick) {
            this.accordianOpen(li);
        }
 
       if (this.options.ondblclick)
           this.options.ondblclick({rowdata:this.options.list[li.retrieve('row')-0]})
    },
    onLoadData: function (data) {
       if (data) this.fireEvent("loadData", {target:this, pkey:data.pkey});
        this.setData(data);
       if (data) this.fireEvent("loadAfter", {target:this, pkey:data.pkey});
    },
    unique: function(a, asNumber) {
        function om_sort_number(a, b) {
            return a - b;
        }
        var sf = asNumber ? om_sort_number : function() {  };
        a.sort(sf);
        for (var i = 1; i < a.length; i++) {
            if (a[i - 1] == a[i]) {
                a.splice(i, 1);
                i--;
            }
        }
        return a;
    },
    // API
    loadData: function (url) {
        this.options.url = (url != null) ? url : this.options.url;
        if (!this.options.url && !this.options.dataProvider) return;
        var param = {'r':(1000*Math.random())};
        // ************* pagination *************************
        if (this.options.pagination)
            param = {currentPage:this.options.currentPage, count:this.options.count};
        // ************* server sorting *********************
        if (this.options.serverSort) {
            if (this.options.sortOn)
                param.sort = this.options.sortOn + ':' + this.options.sortBy;
        }
        if (this.options.filterInput) {
            var cfilter = this.container.getElement('input.cfilter');
            if (cfilter) param.filter = cfilter.value;
        }
        this.showLoader();
        if (this.options.dataProvider) {
            this.options.dataProvider.loadData(param);
        } else {
 
            var request = new Request.JSON({url:this.options.url,headers: {'If-Modified-Since': '0'},data:param,onComplete:this.onLoadData.bind(this)});
            request.get();
        }
 
    },
    refresh: function() {
        this.loadData();
 
        if (this.options.editMode) {
            this.options.editMode = false;
            this.editMode();
        } else {
            this.options.editMode = true;
            this.viewMode();
        }
 
    },
    setData: function(data, cm) {
        if (!data) return;
        if (typeOf(data)=='array') this.options.list = data;
        else if (data.list) this.options.list = data.list;
        else this.options.list = data[this.options.method];
        if (data.turnPage) this.options.turnPage = data.turnPage;
        if (!this.options.columnModel) this.setAutoColumnModel();
        if (this.options.pagination) {
            if (data.totalCount && data.currentPage) {
                this.options.currentPage = data.currentPage;
                this.options.totalCount = data.totalCount;
                this.options.maxpage = Math.ceil(this.options.totalCount / this.options.count);
                this.container.getElement('div.pDiv input').value = data.currentPage;
                var to = (data.currentPage * this.options.count) > data.totalCount ? data.totalCount : (data.currentPage * this.options.count);
 
                this.container.getElement('div.pDiv span.pPageStat').set('html', ((data.currentPage - 1) * this.options.count + 1) + '..' + to + ' / ' + data.totalCount);
                this.container.getElement('div.pDiv .pcontrol span.maxPage').set('html', this.options.maxpage);
 
            } else if (data.turnPage) {
                this.options.turnPage = data.turnPage;
                var footerDiv = this.container.getElement('div.pDiv2');
                footerDiv.empty();
                turnPageDiv = new Element('div', {'class':'turnPagePanel'});
                footerDiv.adopt(turnPageDiv);
                turnPageDiv.set('html', this.options.turnPage);
                var grid = this;
                var trunButtons = turnPageDiv.getElements('a');
                trunButtons.each(function(button) {
                    var ahref = button.get('href');
                    button.removeProperty("href");
                    button.addEvent('click', function(e) {
                        var event = new Event(e);
                        event.stopPropagation();
                        if ((Browser.name=='ie'&&(Browser.version==6|| Browser.version==7)) && (ahref.startsWith("http") && grid.options.url != '')) {
                            var x = ahref.indexOf('?');
                            if (x != -1) ahref = ahref.substring(x, ahref.length);
                        }
                        if (grid.options.url.indexOf('?') != -1 && ahref.indexOf('?') == 0) {
                            ahref = ahref.replace('?', '&');
                        }
                        grid.loadData(grid.options.url + ahref);
                    });
                });
            }
        }
        if (cm&&this.options.columnModel != cm)
       {
             this.options.columnModel = cm;
             this.draw();
        }
        this.reset();
        this.hideLoader();
    },
    setList: function(data) {
        return this.options.list = data;
    },
    getData: function() {
        return this.options.list;
    },
    getDataByRow: function(row) {
        if (row >= 0 && row < this.options.list.length)
            return this.options.list[row];
    },
    setDataByRow: function(row, data) {
        if (row >= 0 && row < this.options.list.length) {
            this.options.list[row] = data;
            this.reset();
        }
    },
    setScroll: function(x, y) {
        var bDiv = this.container.getElement('.bDiv');
        new Fx.Scroll(bDiv).set(x, y);
    },
    isHidden: function(i) {
        return this.elements[i].hasClass(this.options.filterHideCls);
    },
    hideWhiteOverflow: function(i) {
        if (this.container.getElement('.gBlock'))
            this.container.getElement('.gBlock').dispose();
        var pReload = this.container.getElement('div.pDiv .pReload');
        if (pReload) pReload.removeClass('loading');
    },
 
    showWhiteOverflow: function(i) {
        // ************* white overflow & loader ************
        if (this.container.getElement('.gBlock'))
            this.container.getElement('.gBlock').dispose();
 
        var gBlock = new Element('div', {style:'top: 0px; left: 0px; background: white none repeat scroll 0% 0%;  -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; position: absolute; opacity: 0.5; filter: alpha(opacity=50'});
        var bDiv = this.container.getElement('.bDiv');
 
        var top = 1;
        top += this.container.getElement('.tDiv') ? this.container.getElement('.tDiv').getSize().y : 0;
        top += this.container.getElement('.hDiv') ? this.container.getElement('.hDiv').getSize().y : 0;
 
        gBlock.setStyles({width:this.options.width, height: this.options.height - 1, top:0});
        gBlock.addClass('gBlock');
        this.container.adopt(gBlock);
        var pReload = this.container.getElement('div.pDiv .pReload');
        if (pReload) pReload.addClass('loading');
    },
    showLoader: function() {
        if (this.loader) return;
        this.showWhiteOverflow();
        this.loader = new Element('div');
        this.loader.addClass('elementloader');
        this.loader.inject(this.container);
       //todo    this.loader.setStyles({top:this.options.height / 2 - 16,left:this.options.width / 2});
    },
    hideLoader: function() {
        if (!this.loader) return;
        this.hideWhiteOverflow();
        this.loader.dispose();
        this.loader = null;
    },
    // API 全选
    selectAll: function() {
       var useSelectBox = this.useSelectBox;
        this.elements.each(function(el, i) {
           if (!el.hasClass('selected')) {
                el.addClass('selected');
               if (useSelectBox) {
                      var selectBox = el.getElement('.selectbox');
                      if (selectBox) selectBox.setProperty('checked', 'checked');
                }
            }
        }, this);
    },
    // API 返选
    selectedConvert: function() {
       var useSelectBox = this.useSelectBox;
        this.elements.each(function(el, i) {
            if (el.hasClass('selected')) 
           {
                el.removeClass('selected');
               if (useSelectBox) {
                   var selectBox = el.getElement('.selectbox');
                   if (selectBox) selectBox.removeProperty('checked');
                }
            }
            else
           {
                el.addClass('selected');
               if (useSelectBox) {
                   var selectBox = el.getElement('.selectbox');
                   if (selectBox) selectBox.setProperty('checked', 'checked');
                }
 
           }
        }, this);
    },
    getSelecteds: function(name) {
        //得到当前选择的字段数组
        var result = new Array();
        this.elements.each(function(el, i) {
            if (el.hasClass('selected'))
            {
                if (name==undefined)
                    result.include(this.getDataByRow(el.retrieve('row')));
                else
                    result.include(this.getDataByRow(el.retrieve('row'))[name]);
            }
        }, this);
        return result;
    },
    setSelectedValue: function(name,value) {
        var el = this.container.getElement('li.selected input[name=' + name + ']');
        if (el) el.set('value',value);
    },
    setSelectedIndices: function(arr) {
        if (!arr) return;
        for (var i = 0; i < arr.length; i++) {
            var li = this.elements[arr[i]];
            this.onRowClick({target:li.getFirst(), control:false});
        }
    },
    onMouseOver: function(obj) {
        obj.columnModel.onMouseOver(obj.element, obj.list);
    },
    removeCaption: function() {
        var obj = this.container.getElement('.hDiv');
        if (obj) obj.empty();
        this.options.columnModel = null;
    },
    removeAll: function() {
        if (this.ulBody)
            this.ulBody.empty();
        this.options.list = [];
    },
    setColumnModel: function(cmu) {
        if (!cmu)
            return;
        this.options.columnModel = cmu;
        this.draw();
    },
    setColumnProperty: function(columnName, property, value) {
        var cmu = this.options.columnModel;
        if (!cmu || !columnName || !property) return;
        columnName = columnName.toLowerCase();
        for (var i = 0; i < cmu.length; i++) {
            if (cmu[i].name.toLowerCase() == columnName) {
                cmu[i][property] = value;
                return;
            }
        }
    },
    setAutoColumnModel: function() {
 
        if (!this.options.list) return;
        var rowCount = this.options.list.length;
        if (!(rowCount > 0))
            return;
        this.options.columnModel = [];
 
        // uzmi schemu od prvog podatka
        for (var cn in this.options.list[0]) {
            var type = typeOf(this.options.list[0][cn]) == "number" ? "number" : "string";
            this.options.columnModel.push({caption:cn, name:cn, type: type, edit:true});
        }
        this.fireEvent("autocolummodel", {target:this, columnModel:this.options.columnModel});
        this.draw();
    },
    setSize: function(w, h) {
 
        // Width
        this.options.width = w ? w : this.options.width;
 
        this.container.setStyle('width', this.options.width);
 
        var width = this.options.width - 2;
        if (this.options.buttons) this.container.getElement('.tDiv').setStyle('width', width);
 
        var hDiv = this.container.getElement('.hDiv');
        if (this.options.showCaption && hDiv) hDiv.setStyle('width', width);
 
        var bodyEl = this.container.getElement('.bDiv');
        bodyEl.setStyle('width', width);
        this.container.getElement('.pDiv').setStyle('width', width);
 
        // Height
        this.options.height = h ? h : this.options.height;
 
        bodyEl.setStyle('height', this.getBodyHeight());
        this.container.setStyle('height', this.options.height);
 
        // ako je kojim slucajem whiteOverflow namjesti
        var gBlock = this.container.getElement('.gBlock');
        if (gBlock)
            gBlock.setStyles({width:this.options.width, height: bodyEl.getSize().y });
    },
 
    onBodyScroll: function() {
        var hbox = this.container.getElement('.hDivBox');
        var bbox = this.container.getElement('.bDiv');
        var xs = bbox.getScroll().x;
        hbox.setStyle('position', 'relative');
        hbox.setStyle('left', -xs);
        this.rePosDrag();

    },
    onBodyClick: function() {
 
    },
    onBodyMouseOver: function() {
        //console.debug(this.onBodyScrollID);
    },
    onBodyMouseOut: function() {
 
    },
    //*********** Drag columns events ***********
    rePosDrag: function() {
        if (!this.options.resizeColumns)
            return;
        var dragTempWidth = 0;
        var cDrags = this.container.getElements('.cDrag div');
        var scrollX = this.container.getElement('div.bDiv').getScroll().x;
        for (var c = 0; c < this.options.columnModel.length; c++) {
            var columnModel = this.options.columnModel[c];
            //if (columnModel.hide) continue;
            // hide-1
            var dragSt = cDrags[c];
            dragSt.setStyle('left', dragTempWidth + columnModel.width + (Browser.name=='ie' ? 1 : 1 ) - scrollX);
            if (!columnModel.hide)
                dragTempWidth += columnModel.width;
        }
    },
    onColumnDragComplete: function(target) {
        this.dragging = false;
        var colindex = target.retrieve('column');
 
        var cDrag = this.container.getElement('div.cDrag');
        var dragSt = cDrag.getElements('div')[colindex];
        var scrollX = this.container.getElement('div.bDiv').getScroll().x;
 
        this.sumWidth = 0;
        for (var c = 0; c < this.options.columnModel.length; c++) {
            var columnModel = this.options.columnModel[c];
            if (c == colindex) {
                var pos = dragSt.getStyle('left').toInt() + scrollX - this.sumWidth - (Browser.name=='ie' ? -1 : 1 );
            } else if (!columnModel.hide)
                this.sumWidth += columnModel.width;
        }
        if (pos < 30) pos = 30;
        this.options.columnModel[colindex].width = pos;
 
        this.sumWidth += pos;
 
        this.ulBody.setStyle('width', this.sumWidth + this.visibleColumns * (Browser.name=='ie' ? 1 : 1 ));
        var hDivBox = this.container.getElement('div.hDivBox');
 
        hDivBox.setStyle('width', this.sumWidth + this.visibleColumns * 2);
 
        // Caption
        var columns = hDivBox.getElements('div.th');
        var columnObj = columns[colindex];
 
        columnObj.setStyle('width', pos - (Browser.name=='ie'? 6 : 6 ));
 
        var visibleColumns = this.visibleColumns;
 
        // radi accordiana
        var elements = this.ulBody.getElements('li.tr');
 
        // sve kolone u body
        elements.each(function(el, i) {
            el.setStyle('width', this.sumWidth + 2 * visibleColumns); // inace se Div-ovi wrapaju
 
            if (!el.hasClass('section')) {
                var columns = el.getElements('div.td');
                var columnObj = columns[colindex];
                columnObj.setStyle('width', pos - (Browser.name=='ie' ? 6 : 6 ));
            }
 
        });
 
        this.rePosDrag();
        this.refresh();
    },
    onColumnDragStart: function(target) {
        this.dragging = true;
    },
    onColumnDragging: function(target) {
        target.setStyle('top', 1);
    },
    overDragColumn: function(evt) {
        evt.target.addClass('dragging');
    },
    outDragColumn: function(evt) {
        evt.target.removeClass('dragging');
    },
 
    // ************************* Caption events ********************************
    clickCaptionColumn: function(evt) {
        if (this.dragging) return;
        var colindex = evt.target.retrieve('column');
        var columnModel = this.options.columnModel[colindex];
        evt.target.removeClass(columnModel.sort);
        columnModel.sort = (columnModel.sort == 'ASC') ? 'DESC' : 'ASC';
        evt.target.addClass(columnModel.sort);
        this.sortIndex = colindex;
        //hide-1
        this.sort(colindex);
    },
 
    overCaptionColumn: function(evt) {
        if (this.dragging) return;
        var colindex = evt.target.retrieve('column');
        var columnModel = this.options.columnModel[colindex];
        evt.target.addClass(columnModel.sort);
    },
 
    outCaptionColumn: function(evt) {
        if (this.dragging) return;
        var colindex = evt.target.retrieve('column');
        var columnModel = this.options.columnModel[colindex];
        if (!this.sortIndex)
            evt.target.removeClass(columnModel.sort);
        else {
            var hDivBoxThs = this.container.getElements('.th');
            for (var i = 0; i < hDivBoxThs.length; i++) {
                var colI = hDivBoxThs[i].retrieve('column');
                if (colI != this.sortIndex) {
                    hDivBoxThs[i].removeClass('ASC');
                    hDivBoxThs[i].removeClass('DESC');
                }
            }
        }
    },
 
    getBodyHeight: function() {
        var captionHeight = this.options.showCaption ? 24 + 2 : 0;  //+2 radi bordera
        var toolbarHeight = this.options.buttons ? this.container.getElement('.tDiv').getStyle('height').toInt() : 0;
        var paginationToolbar = this.options.pagination ? 26 : 0;
        var h = this.options.height - captionHeight - toolbarHeight - paginationToolbar - 2 -(this.options.titleHeight?this.options.titleHeight:26); //+2 radi bordera
		return h;
    },
 
    renderData: function() {
        this.ulBody.empty();
        var self = this;
        if (this.options.list && this.options.list.length) {
            var columnCount = this.options.columnModel.length;
            var rowCount = this.options.list.length;
 
            for (var r = 0; r < rowCount; r++) {
                var rowdata = this.options.list[r];
               rowdata.index = r;
                var li = new Element('li',{'class':'tr'});
                li.setStyle('width', this.sumWidth + 2 * this.visibleColumns);
                li.store('row', r);
                this.ulBody.appendChild(li);
 
                for (var c = 0; c < columnCount; c++) {
                    var columnModel = this.options.columnModel[c];
                    var div = new Element('div',{'class':'td','filed':columnModel.name});
                    div.setStyle('width', columnModel.width - 6);
                    li.appendChild(div);
 
                    if (!columnModel.hide && this.options.accordion && this.options.showTog && columnModel.input == 'tog') {
                        div.appendChild(new Element('div', {'class':'toggleicon'}));
                    }
                    if (columnModel.hide) div.setStyle('display', 'none');
                    if (columnModel.onMouseOver) {
                        div.onmouseover = this.onMouseOver.bind(this, {element:div, columnModel:columnModel, data:rowdata });
                    }
 
                    // title
                    if (columnModel.caption) div.caption = rowdata[columnModel.caption];
 
                    var value = "";
                    if (columnModel.name.indexOf(".")!=-1)
                    {
                        var p = columnModel.name.indexOf(".");
                        var objName = columnModel.name.substr(0,p);
                        var valueName = columnModel.name.substr(p+1,columnModel.name.length);
                        value = rowdata[objName][valueName];
                    }
                    else
                      value = rowdata[columnModel.name];
                    if (columnModel.tip && value)
                    {
                        div.store('tip:title',columnModel.caption);
                        div.store('tip:text',value);
                        new Tips(div);
                    }
                   if (value&&columnModel.type=='date')
                   {
                       if (!columnModel.format) columnModel.format = 'yyyy-MM-dd';
                       if (typeof(value)=='date') value = value.string(columnModel.format);
                       else value = (value.toDate()).string(columnModel.format);
                       if (value==undefined||value==null||value=='1800-01-01') value= '&nbsp;';
                   }
 
                    if (columnModel.name=='sortIndex')
                    {
                        value = r+1;
                    }
                    if (typeOf(value) == 'string')
                    {
                        value = value.replace(/\$\{/g, "$\\{").substitute({'index':r,'sortIndex':(r+1)}).replace(/\$\\\{/g, "${");
                        if (value.indexOf('.')>0&&columnModel.input=='img')
                        {
                            value = '<img src="' + value + '" border="0" >';
                        }
                    }
                    if (columnModel.input == "show")
                    {
                        var opts = columnModel.option.toArray(";");
                        value = opts.show(value);
                    }
                    if (columnModel.input == "selectShow"&&value)
                    {
						 
                         var opts = value.toArray(";");
						 for (var i = 0; i<opts.length;i++) {
                                    if (opts[i].indexOf(columnModel.option + ":")!=-1){
                                       value = opts[i].substringAfter(":");
									   if (div) div.set('html', value);
                                    }
                          }
                    }
					
                    if (this.options.editMode && columnModel.edit && columnModel.input != 'tog' || columnModel.input.indexOf('button') != -1 || 
						columnModel.input.indexOf('select') != -1 || columnModel.input.indexOf('selectbox') != -1) {

                        if (columnModel.input == "select"||columnModel.input == "show") div.setAttribute("keyValue", value);
                        if (rowdata && (columnModel.input == 'button' || columnModel.input == 'cbutton'|| columnModel.input == 'img_button'))
                             columnModel.blink = columnModel.link.replace(/\$\{/g, "$\\{").substitute(rowdata).replace(/\$\\\{/g, "${");
                        if (columnModel.input == "checkbox" && value == "" && columnModel.name == "select") //没有值就默认为id
                            value = div.get("keyValue");
                        var inputEl = createInputElement(columnModel, value);
                        if (columnModel.input != 'selectbox' && columnModel.input.indexOf('select') != -1&&!this.options.editMode) {
                            //修复IE selectDisabled bug
                            var selectLock = function(event) {
                                event.stop();
                                var el = event.target;
                                function ie6OptionSelected() {
                                    this.selected = true;
                                }
                                var key = el.get("keyValue");
                                var opts = el.options;
                                if (key)  for (var i = 0; i<opts.length;i++) {
                                    if (opts[i].value==key){
                                        if (Browser.name=='ie'&&Browser.version==6)
                                            ie6OptionSelected.delay(2, opts[i]);
                                        else  opts[i].selected = true;
                                    }
                                }
                                return false;
                            };
                            inputEl.set("keyValue", div.get("keyValue"));
                            inputEl.set('lock', "true");
                            inputEl.addEvent('change', selectLock.bind(inputEl));
                        }

                        if (columnModel.input == 'selectbox') {
                            inputEl.set('class', 'selectbox');
                            inputEl.addEvent('change', this.onSelectBoxClick.bind(this));
                        }
                        div.appendChild(inputEl);
                    } else  {
                        if (columnModel.input != 'tog') {
                            if (columnModel.labelFunction != null) {
                                div.innerHTML = columnModel.labelFunction(rowdata, r, columnModel);
                            } else {
                                if (columnModel.align) div.setStyles({'text-align': columnModel.align});
                                if (value==undefined||value==null||(columnModel.type=='string'||columnModel.type=='text') && (typeOf (value ) == 'string'&&value.trim(value)==''))
                                {
                                 if (columnModel.type=='string'||columnModel.type=='text') value = '&nbsp;'; else value = '0';
                                }
                               if (columnModel.expression)
                               {
                                   value = columnModel.expression.substitute(rowdata);
                               }
                               if (div) div.set('html', value);
                            }
                        }
                    }
 
                } // for column
 
                if (this.options.accordion) {
                    var li2 = new Element('li',{'class':'section'});
                    li2.addClass('section-' + r);
                    li2.setStyle('width', this.sumWidth + 2 * this.visibleColumns);
                   li2.store('rowdata', rowdata);
                    this.ulBody.appendChild(li2);                   
                }
            }
            if (this.calendar)  this.calendar.cssInit();
            if (this.colorBox)  this.colorBox.cssInit();
        }
    },
 
    // ************************* Main draw function ***************************
    draw: function() {
        this.removeAll(); // reset variables and only empty ulBody
        this.container.empty(); // empty all
        // ************************* Common ***************************************
        var width = this.options.width;
       if (this.options.width) width = this.options.width - (Browser.name=='ie'? 2 : 0); //-2 radi bordera
        else if (this.container.getStyle('width')) this.options.width = width = this.container.getStyle('width').toInt();
 
        var columnCount = this.options.columnModel ? this.options.columnModel.length : 0;
        // ************************* Container ************************************       
 
        this.container.addClass('JDataTable');
        //set title caption
        var titleDiv = new Element('div',{'class':'JDTTitlePanel',html:this.options.title});
        this.container.appendChild(titleDiv);
       if (this.options.width)
        {
            this.container.setStyle('width',width);
            //titleDiv.setStyle('width',width);
        }
        this.options.titleHeight = titleDiv.getStyle('height').toInt();
        // ************************* Toolbar **************************************
        if (this.options.buttons) {
            var tDiv = new Element('div',{'class':'tDiv JDTButtonPanel'});
           //   if (width) tDiv.setStyles({'width':width,height:(25 + (Browser.name=='ie'?2:0)});  设置工具栏高度,改为样式表设置
            this.container.appendChild(tDiv);
            var bt = this.options.buttons;
            for (var i = 0; i < bt.length; i++) {
                var fBt = new Element('div');
                tDiv.appendChild(fBt);
                if (bt[i].separator) {
                    fBt.addClass('btnseparator');
                    continue;
                }
                fBt.addClass('fbutton'); //fbutton
                if (typeOf(bt[i]).toLowerCase() == 'element') {
                    fBt.adopt(bt[i]);
                } else {
                    var cBt = new Element('div');
                    cBt.addEvent('click', bt[i].onclick.bind(this, [bt[i].bclass, this]));
                    cBt.addEvent('mouseover', function() {
                        this.addClass('fbOver');
                    });
                    cBt.addEvent('mouseout', function() {
                        this.removeClass('fbOver');
                    });
                    fBt.appendChild(cBt);
                    var spanBt = new Element('span');
                    spanBt.addClass(bt[i].bclass);
                    spanBt.setStyle('padding-left', 20);
                    spanBt.set('html', bt[i].name);
                    cBt.appendChild(spanBt);
                }
            }
        }
 
        // ************************* Caption ***************************************
        var hDiv = new Element('div',{'class':'hDiv'});
        this.container.appendChild(hDiv);
       //if (width) hDiv.setStyle('width', width);
 
        var hDivBox = new Element('div',{'class':'hDivBox'});
        hDiv.appendChild(hDivBox);
 
        this.sumWidth = 0;
        this.visibleColumns = 0;
        for (var c = 0; c < columnCount; c++) {
            var columnModel = this.options.columnModel[c];
            var caption = columnModel.caption;
            if (caption&&caption.indexOf('|') != -1) caption = caption.substring(0, caption.indexOf('|'));
 
            var div = new Element('div', {html:caption});
            // ******************************************
            // ****** default postavke columnModela *****
            if (columnModel.width == null)  columnModel.width = 100;
            columnModel.sort = 'ASC';
            // ******************************************
 
            // ********************** Caption events **************************
            if (this.options.sortCaption) {
                div.addEvent('click', this.clickCaptionColumn.bind(this));
                div.addEvent('mouseout', this.outCaptionColumn.bind(this));
                div.addEvent('mouseover', this.overCaptionColumn.bind(this));
            }
 
            div.store('column', c);
            div.store('dataType', columnModel.type);
            div.addClass('th');
            div.setStyle('width', columnModel.width - (Browser.name=='ie' ? 6 : 6 ));
            hDivBox.appendChild(div);
 
            if (columnModel.hide)
                div.setStyle('display', 'none');
            else {
                this.sumWidth += columnModel.width;
                this.visibleColumns++;
            }
        }
        hDivBox.setStyle('width', this.sumWidth + this.visibleColumns * 2);
        if (!this.options.showCaption)
            hDiv.setStyle('display', 'none');
       // ************************* Column size drag *****************************
       var bodyHeight = this.getBodyHeight();
	   if (!bodyHeight||bodyHeight<=0) bodyHeight = this.options.height-26;

        if (this.options.height) {            
            this.container.setStyle('height', this.options.height);
        }
 
        if (this.options.resizeColumns) {
            var cDrag = new Element('div'); //拖动线
            cDrag.addClass('cDrag');
            var toolbarHeight = this.options.buttons ? tDiv.getStyle('height').toInt() : 0; // toolbar
            cDrag.setStyle('top', toolbarHeight + this.options.titleHeight);
            this.container.appendChild(cDrag);
            var dragTempWidth = 0;
            for (var i = 0; i < columnCount; i++) {
                var columnModel = this.options.columnModel[i];
                var dragSt = new Element('div');
                var captionHeight = this.options.showCaption ? 24 + 2 : 0; // +2 border
 
                dragSt.setStyles({top:1,left: dragTempWidth + columnModel.width, height: captionHeight, display:'block'}); // bodyHeight+
                dragSt.store('column', i);
                cDrag.appendChild(dragSt);
 
                // Events
                dragSt.addEvent('mouseout', this.outDragColumn.bind(this));
                dragSt.addEvent('mouseover', this.overDragColumn.bind(this));
 
                var dragMove = new Drag(dragSt, {snap:0});
                dragMove.addEvent('drag', this.onColumnDragging.bind(this));
                dragMove.addEvent('start', this.onColumnDragStart.bind(this));
                dragMove.addEvent('complete', this.onColumnDragComplete.bind(this));
 
                if (columnModel.hide)
                    dragSt.setStyle('display', 'none');
                else
                    dragTempWidth += columnModel.width;
            }
        }
        // ************************* Body *****************************************
        var bDiv = new Element('div', {'class':'bDiv'});
        if (width) bDiv.setStyle('width', width);
        if (bodyHeight) bDiv.setStyle('height', bodyHeight);
        this.container.appendChild(bDiv);
 
        //  scroll event
        this.onBodyScrollBind = this.onBodyScroll.bind(this);
        bDiv.addEvent('scroll', this.onBodyScrollBind);
 
        this.ulBody = new Element('ul');
        this.ulBody.setStyle('width', this.sumWidth + this.visibleColumns * (Browser.name=='ie' ? 1 : 1 ));
        bDiv.appendChild(this.ulBody);
 
        if (this.options.pagination && !this.container.getElement('div.pDiv')) {
            var pDiv = new Element('div', {'class':'pDiv'});
           //if (width) pDiv.setStyle('width', width);
            //pDiv.setStyle('height', 25);
            this.container.appendChild(pDiv);
 
            var h = '<div class="pGroup"><select class="rp" name="rp">';
            // *****
            var optIdx;
            var setDefaultcount = false;
            for (optIdx = 0; optIdx < this.options.countOptions.length; optIdx++) {
                if (this.options.countOptions[optIdx] != this.options.count)
                    h += '<option value="' + this.options.countOptions[optIdx] + '">' + this.options.countOptions[optIdx] + '</option>';
                else {
                    setDefaultcount = true;
                    h += '<option selected="selected" value="' + this.options.countOptions[optIdx] + '">' + this.options.countOptions[optIdx] + '</option>';
                }
            }
            // *****
 
            h += '</select></div>';
            h += '<div class="btnseparator"></div><div class="pGroup"><div class="pFirst pButton"></div><div class="pPrev pButton"></div></div>';
            h += '<div class="btnseparator"></div><div class="pGroup"><span class="pcontrol"> <input class="cpage" type="text" value="1" size="4" style="text-align:center"/> / <span class="maxPage">&nbsp;</span></span></div>';
            h += '<div class="btnseparator"></div><div class="pGroup"><div class="pNext pButton"></div><div class="pLast pButton"></div></div>';
            h += '<div class="btnseparator"></div><div class="pGroup"><div class="pReload pButton"></div></div>';
            h += '<div class="btnseparator"></div><div class="pGroup"><span class="pPageStat"></div>';
 
            if (this.options.filterInput) h += '<div class="btnseparator"></div><div class="pGroup"><span class="pcontrol"><input class="cfilter" type="text" value="" style="" /><span></div>';
 
            var pDiv2 = new Element('div', {'class':'pDiv2','html':h});
           pDiv.adopt(pDiv2);
            // set this.options.count value from this.options.countOptions array
            var rpObj = pDiv2.getElement('.rp');
            if (!setDefaultcount && rpObj.options.length > 0) {
                this.options.count = rpObj.options[0].value;
                rpObj.options[0].selected = true;
            }
            pDiv2.getElement('.pFirst').addEvent('click', this.firstPage.bind(this));
            pDiv2.getElement('.pPrev').addEvent('click', this.prevPage.bind(this));
            pDiv2.getElement('.pNext').addEvent('click', this.nextPage.bind(this));
            pDiv2.getElement('.pLast').addEvent('click', this.lastPage.bind(this));
            pDiv2.getElement('.pReload').addEvent('click', this.refresh.bind(this));
            pDiv2.getElement('.rp').addEvent('change', this.countChange.bind(this));
           pDiv2.getElement('input.cpage').addEvent('keyup', this.pageChange.bind(this));
            if (this.options.filterInput) pDiv2.getElement('input.cfilter').addEvent('change', this.firstPage.bind(this)); // goto 1 & refresh
        }
    },
    firstPage: function() {
        this.options.currentPage = 1;
        this.refresh();
    },
 
    prevPage: function() {
        if (this.options.currentPage > 1) {
            this.options.currentPage--;
            this.refresh();
        }
    },
    nextPage: function() {
        if ((this.options.currentPage + 1) > this.options.maxpage) return;
        this.options.currentPage++;
        this.refresh();
    },
 
    lastPage: function() {
        this.options.currentPage = this.options.maxpage;
        this.refresh();
    },
 
    countChange: function() {
        this.options.currentPage = 1;
        this.options.count = this.container.getElement('.rp').value;
        this.refresh();
    },
 
    pageChange: function() {
        var np = this.container.getElement('div.pDiv2 input').value;
        if (np > 0 && np <= this.options.maxpage) {
            if (this.refreshDelayID)
                $clear(this.refreshDelayID);
            this.options.currentPage = np;
            this.refreshDelayID = this.refresh.delay(1000, this);
        }
    },
    // API
    gotoPage: function(p) {
        if (p > 0 && p <= this.options.maxpage) {
            this.options.currentPage = p;
            this.refresh();
        }
    },
    setCount: function(p) {
        if (p > 0) {
            this.options.count = p;
            this.refresh();
        }
    },
    // API, not doc
    sort: function(index, by) {
        if (index < 0 || index >= this.options.columnModel.length) return;
        if (this.options.onStart) {
            this.fireEvent('onStart');
        }
        var caption = this.container.getElements('.th');
        var el = caption[index];
        if (by != null)
            el.addClass(by.toLowerCase());
 
        if (el.hasClass('ASC')) {
            el.sortBy = 'ASC';
        } else if (el.hasClass('DESC')) {
            el.sortBy = 'DESC';
        }
 
        if (this.options.serverSort) {
           var type = this.options.columnModel[index].type;
            if (type=='tog'||type=='button'||type=='button') return;
            this.options.sortOn = this.options.columnModel[index].name;
            this.options.sortBy = el.sortBy;
            this.refresh();
        } else {
            // Sorting...
            this.elements.sort(el.compare);
            this.elements.injectInside(this.ulBody);
 
            // Update selection array because indices has been changed
            this.selected = new Array();
            this.elements.each(function(el, i) {
                if (el.hasClass('selected')) {
                    this.selected.push(el.retrieve('row'));
                }
            }, this);
 
            // Filter
            if (this.filtered) {
                this.filteredAltRow();
            } else {
                this.altRow();
            }
        }
 
    },
    altRow: function() {
        this.elements.each(function(el, i) {
            if (i % 2) {
                el.removeClass('erow');
            } else {
                el.addClass('erow');
            }
        });
    },
    filteredAltRow: function() {
        this.ulBody.getElements('.' + this.options.filterSelectedCls).each(function(el, i) {
            if (i % 2) {
                el.removeClass('erow');
            } else {
                el.addClass('erow');
            }
        });
    },
    // API
    filter: function(form) {
        //var form = $(form);
        var col = 0;
        var key = '';
        if (!(form.length > 0)) this.clearFilter();
        key = form;
        if (key) {
            for (var i = 0; i < this.options.list.length; i++) {
                var dat = this.options.list[i];
 
                for (var c = 0; c < this.options.columnModel.length; c++) {
                    var columnModel = this.options.columnModel[c];
                    if (columnModel.type == "checkbox") continue;
                    var el = this.elements[i];
                    if (this.options.filterHide) {
                        el.removeClass('erow');
                    }
                    if (dat[columnModel.name] != null && dat[columnModel.name].toLowerCase().indexOf(key) > -1) {
                        el.addClass(this.options.filterSelectedCls);
                        if (this.options.filterHide) el.removeClass(this.options.filterHideCls);
                        break;
                    } else {
                        el.removeClass(this.options.filterSelectedCls);
                        if (this.options.filterHide)  el.addClass(this.options.filterHideCls);
                    }
                }
            }
 
            if (this.options.filterHide) {
                this.filteredAltRow();
                this.filtered = true;
            }
        }
    },
 
    // API
    clearFilter: function() {
        this.elements.each(function(el, i) {
            el.removeClass(this.options.filterSelectedCls);
            if (this.options.filterHide) {
                el.removeClass(this.options.filterHideCls);
            }
        }, this);
        if (this.options.filterHide) {
            this.altRow();
            this.filtered = false;
        }
    }
});
//---------------------选择表格
JDialog.DataTable = new Class({
    Extends: JDialog.Alert,
    initialize: function(options) {
        this.id = 'dataTable_' + Number.random(1,10000);
        options.resize = true;
        if (!options.field) options.field='';
        if (!options.title) options.title = '数据选择对话框';
        if (!this.options.buttons) this.options.buttons = new Array();
        var win = this;
        var buttons = new Array();
        if (options.selectField&&options.fields)
        {
            var labelField = new Element('label', {'for':'field','html':'字段'});
 
            var fieldBox = new Element('select', {'id':'field','name':'field'});
            fieldBox.setStyle('min-width',70);
 
            labelField.adopt(fieldBox);
            if (options.fields) fieldBox.setOptions(options.fields,options.field,":");
            buttons.push(labelField);
        }
 
        var intervalIDs = [];
        var clickTime = 0; //为3的时候才搜索
        var labelFind = new Element('label', {'for':'find','html':'关键字'});
        var checkClickButton=function()
        {
            clickTime++;
            if (clickTime>=3)
            {
                if (clickTime==3) clickButton();
                intervalIDs.each(function(id){
                    window.clearInterval(id);
                });
                intervalIDs.clean();
            }
        };
        var findBox = new Element('input', {'id':'find','name':'find',size:12, 'events':
        {
            'keyup': function(event)
            {
                event.stop();
                //按下后等等1秒,才执行
                intervalIDs.include(window.setInterval(checkClickButton,400));
            }
        }});
        labelFind.adopt(findBox);
        buttons.push(labelFind);
        var clickButton=function()
        {
            clickTime = 0;
            var field = options.field;
            if (options.selectField)
            {
                field = encodeURI(fieldBox.get('value'));
            }
            var find = encodeURI(findBox.get('value'));
            if (win.options.jsonUrl.indexOf("?")==-1) win.options.jsonUrl = win.options.jsonUrl + '?';
            win.jtable.loadData(win.options.jsonUrl + '&field=' + field + '&find=' + find);
        };
 
        buttons.push(new Element('div', {'class':'btnseparator'}));
        var button_ok = new Element('button', {'type':'button','class':'jTDYes','html':'确定',
            'events':
            {
                'click': function(event)
                {
                    var selects = win.jtable.getSelecteds();
                    //提示操作 begin
                    if (selects.length<1)
                    {
                        alert('没有选择，数据');
                        return;
                    }
                    options.callback(selects);
                    win.close();
                }
            }
        });
        buttons.push(button_ok);
 
        this.gridPane = new Element('div', {id:this.id});
        options.message = this.gridPane;
        this.parent(options);
        this.show();
        this.jtable = new JDataTable({table:this.id,title:this.options.tableTitle,url:this.options.jsonUrl,
            accordion:false,
            width:this.options.width-10,
            height:this.options.height -30,
            autoSectionToggle:false,
            showTog:false, //显示详细
            editMode:false,
            columnModels:this.options.columnModels,
            buttons:buttons,
            pagination:true,
            serverSort:true,
            showCaption: true,
            sortCaption: true,
            alternaterows: true,
            resizeColumns: true,
            count:18,
            multiselect:this.options.multiselect,
            ondblclick:function(){button_ok.fireEvent('click')}
        });
    }
});
//-----选择树
JDialog.Tree = new Class({
    Extends: JDialog,
    initialize: function(options) {
        if (!options.mode) options.mode='select';
        this.id = 'tree_' + Number.random(1, 10000);
        if (options.bindId && $(this.id)) return;
        options.resize = false;
        options.scrollWin=false;
 
        if (!options.title) options.title = '数据选择对话框';
        if (!options.okButtionCaption) options.okButtionCaption = '确定';
        if (!options.noButtionCaption) options.noButtionCaption = '取消';
        this.parent(options);
 
        var win = this;
        var treeContentPanel = new Element('div', {'class':'jdialogContentPanel'});
        treeContentPanel.setStyle('height',options.height-24);
 
        var treePanel = new Element('div', {id:this.id,'class':'selectTreePanel'});
        treeContentPanel.adopt(treePanel);
        var getTreeSelectNode=function ()
        {
            var selects = win.jtree.getSelected();
            //提示操作 begin
            if (selects.length<1)
            {
                alert('没有选择，数据');
                return;
            }
            if (options.selectLeaf)
            {
                var node = selects[0].path[selects[0].path.length-1];
                if (win.jtree.isLimb(node.id))
                {
                    //alert('只允许选择叶子节点，不允许选择枝干节点');
                    return;
                }
            }
            options.callback(selects);
            win.close();
        };
 
        var buttonPane = new Element('div', { 'class': 'jdialogButtonPanel'});
        var okButton = new Element('button', {type:'button','html':options.okButtionCaption,'class': 'jdialog-ok-button',
            events:
            {
                click: function() {
                    getTreeSelectNode();
                }
            }
        });
 
        buttonPane.adopt(okButton);
        buttonPane.adopt(new Element('button', {type:'button',html:options.noButtionCaption,'class': 'jdialog-no-button',
            events:
            {
                click: function() {
                    win.close();
                }
            }
        }));
 
        var msgArray = new Array();
        msgArray.push(treeContentPanel);
        msgArray.push(buttonPane);
 
        options.message = msgArray;
        if (options.resultMethods==undefined) options.resultMethods="treeSrc";
 
        this.parent(options);
        this.show();
        var treeId = this.id;
        var mode = options.mode;
        var changeTree=function changeTree(){
            if (mode!='select') return;
            var liArray = $$('#'+treeId+' li.treeLiNode');
            liArray.each(function(e){
                var liEl =e.getElement('li.treeLiNode');
                if (!liEl) {
                    if (!e.hasClass('selectTreeLiNode'))  e.addClass('selectTreeLiNode');
                }
            });
        };
 
        var clickNodeName = function(nodeId)
        {
            getTreeSelectNode();
        };
 
 
        this.jtree = new JTree({prefix:'select',rootId:'root',paneId:this.id,varName:'nodeId',
            defaultOpenIcon:null,  //打开节点图标
            defaultIcon:null,  //打开节点图标
            rootHide:true,
            edit:false,
            multiselect:false,
            onShowAfter:changeTree,
            onClickNode:clickNodeName,
            path:'/script/'});
        if (this.options.treeJson)
        {
            this.jtree.loadJson(this.options.treeJson);
        } else
        if (this.options.jsonUrl)
        {
            this.jtree.loadURL(this.options.jsonUrl,this.options.resultMethods);
        }
    }
});
//----------------评价滚动条
var JRating = new Class({
   Implements: Options,
   options: {
       txt: '普通',
       step:1,
       width:100,
       showNum:true,
        enable:true,
       value:80,
       min:0
       /* onClick:$empty(),
          onChange:$empty()
       */
   },
   initialize: function(element, options){
       this.setOptions(options);
       this.element = document.id(element);
       if (!this.element.hasClass('rating')) this.element.addClass('rating');
        var txtDiv = new Element('span',{'class':'txt',html:this.options.txt});
       this.element.adopt(txtDiv);
       this.pointerDiv = new Element('span',{'class':'pointer', styles:{width:this.options.value}});
       this.pointerDiv.onclick=this.options.onClick;
       var r = this;
        var ratingBarDiv = new Element('div',{'class':'ratingBar',
            styles:
            {
                width:r.options.width
            },
            events:
            {
                mousemove: function(event) {
                    if (!r.options.enable) return;
                    var ex=event.client?event.client.x:event.clientX;
                    ratingBarDiv.setStyle('cursor','pointer');
                    //原始x偏移量
                    var s=r.pointerDiv.getPosition().x.toInt();
                    //进度条盒子宽度(px)
                    var bw=ratingBarDiv.getStyle('width').toInt();
                    var nw=ex-s;nw=(nw>bw)?bw:nw;nw=(nw<1)?0:nw;    //鼠标所在位置的宽度
                    nw = (nw / r.options.step).toInt()*r.options.step;
                    if (nw<r.options.min) nw=r.options.min;
                    r.pointerDiv.setStyle('width',nw);
                    var x=bw/5;
                    var numSpan=r.element.getElement('.num');
                    if (numSpan) numSpan.set('html',nw);
                    r.options.onChange(nw,x);
                }
            }
        });
       
       ratingBarDiv.adopt(this.pointerDiv);
       this.element.adopt(ratingBarDiv);
        if (this.options.showNum) 
        {
           var numDiv = new Element('span',{'class':'num',html:this.options.value});
           this.element.adopt(numDiv);
        }
   }    
   ,
    setCaption: function(v) {
     this.element.getElement('.txt').set('html',v);
    }
   ,
    setValue: function(v) {
        this.pointerDiv.setStyle('width',v);
    }
});
//---------------------切换div
var JScrollPanel = new Class({
    Implements: [Events, Options],
    options: {
        container: $('div.scrollDiv'), //div容器
        button: $('div.scrollButton'), //button容器,动态生成放入
        textPanelCss:'titlePanel',
        currentCss:'selected',
        motion:'scroll', // fade,none
        buttonTransition:'elastic:out', //图片翻页效果 'linear', 'quad:in', 'back:in', 'bounce:out', 'elastic:out', 'sine:in:out'
        titleTransition: 'elastic:out', //标题显示效果  'linear', 'quad:in', 'back:in', 'bounce:out', 'elastic:out', 'sine:in:out'
        duration:'normal',// - 250ms * 'normal' - 500ms * 'long
        titleHeight:100,
        buttonHeight:50,
        buttonWidth:50,
        jsonData:false,
        marginWidth:1,
        scrollWidth:false,
        data:[], //数据显示层
        arrowPrevious:false, //外部导向id，上一个
        arrowNext:false,      //外部导向id， 下一个
        arrowButton:true, //是否显示导向按钮
        arrowLeftImg:'/script/images/arrow_left.gif', //上一个
        arrowRightImg:'/script/images/arrow_right.gif', //下一个
        arrowWidth:28,
        play:true, //默认是否播放
        statusBar:false, //状态容器
        buttonTemplate:false,
        playInfo:'播放',
        stopInfo:'停止',
        currentStep:0,//当前步骤
        currentPage:1,//当前页
        sleep:4000, //滚动等待时机
        showArrow:true, //显示导航
        buttonEvent:'click',
        showTitle:true //显示标题
        //onScrollChange: $empty() //参数 是索
        //onLoad: $empty() //载入完成后
    },
 
    initialize: function(options) {
        this.setOptions(options);
        if (typeof(this.options.container)=='string')
            this.options.container = $(this.options.container);
 
        if (typeof(this.options.button)=='string')
            this.options.button = $(this.options.button);
 
        if (this.options.statusBar&&typeof(this.options.statusBar)=='string')
            this.options.statusBar = $(this.options.statusBar);
 

        if (typeof(this.options.data)=='string') this.options.data = $$(this.options.data);

        this.scrollWidth = this.options.scrollWidth;
        this.currentPage = this.options.currentPage;
        this.buttonTemplate = this.options.buttonTemplate;
 
       if (!this.buttonTemplate) this.buttonTemplate = this.options.button.get('html');
 
       this.loadData(false);
       this.setCurrentStep(this.options.currentStep);
       if (this.options.play&&this.buttonJson.length>1) this.play();

 
    },
    loadData:function(data) {
        if (data)  this.options.data = data;
        if (!this.options.data) return;
 
        this.buttonWidth = this.options.buttonWidth;
        var cs = this;
		
        this.buttonJson = this.options.jsonData;
        if (!this.buttonJson)
        {
            this.buttonJson = [];
            //通过div生成 li 按钮列表
            for (var i=0; i<cs.options.data.length;i++)
            {
                var btn = {};
                btn.image = cs.options.data[i].get("image");
				if (!btn.image) btn.image = cs.options.data[i].get("img");
                btn.title = cs.options.data[i].get("title");
                btn.link = cs.options.data[i].get("link");
                btn.target = cs.options.data[i].get("target");
                btn.html = cs.options.data[i].get("html");
                btn.index = i;
                btn.sort = (i+1);
                this.buttonJson.include(btn);
            }
        } else {
			for (var i=0;i<this.buttonJson.length;i++)
			{
				this.buttonJson[i].index=i;
				this.buttonJson[i].sort=(i+1);
			}
		}
        this.buttonLength = this.buttonJson.length;
 
        //通过模板生成按钮
        this.options.button.empty();
 
        this.buttonUlPanel = new Element('ul',{'class':'scroll'});
        this.buttonScrollPanel = new Element('div',{'class':'scrollPanel'});
        this.buttonScrollPanel.adopt(this.buttonUlPanel);
 
        var tempLi = false;
        for (var i=0;i<this.buttonJson.length;i++)
        {
            var liDiv = new Element('li',{'styles':{'height':this.options.buttonHeight,'width':this.options.buttonWidth}});
            liDiv.set('html',this.buttonTemplate.substitute(this.buttonJson[i]));
            liDiv.set('link',this.buttonJson[i].link);
            liDiv.set('sort',this.buttonJson[i].sort);
            liDiv.set('index',this.buttonJson[i].index);
            liDiv.set('target',this.buttonJson[i].target);
 
            liDiv.addEvent(this.options.buttonEvent, function() {
                var goInd = this.get('index').toInt();
                if (goInd!=cs.options.currentStep) cs.setCurrentStep(this.get('index').toInt());
            });
            this.buttonUlPanel.adopt(liDiv);
            if (!tempLi) tempLi =  liDiv;
        }
 
        if (tempLi==null) return;
 
        this.options.button.addEvents({
            'mouseenter': function() {
                 cs.stop();
            },
            'mouseleave': function() {
                 cs.play();
            }
        });
 
        //计算缩图宽度及数量
        if (cs.options.arrowPrevious)
        {
            $(cs.options.arrowPrevious).addEvent('click', function() {
                cs.previous();
            });
        }
        if (cs.options.arrowNext)
        {
            $(cs.options.arrowNext).addEvent('click', function() {
                cs.next();
            });
        }
 
        //加入导向图片
       if (cs.options.arrowButton)
       {
 
            this.arrowLeft = new Element('a',{'class':'left',styles:{'opacity':0.8,'float':'left','width':this.options.arrowWidth,'height':this.options.buttonHeight,'background':'url("' + this.options.arrowLeftImg + '") no-repeat'},
                'events': {
                    'click': function(){
                        cs.setPlayStatus(false);
                        cs.currentPage = cs.currentPage - 1;
                        if (cs.currentPage<1) cs.currentPage = 1;
                        cs.setImgPage(cs.currentPage);
                    },
                    'mouseover': function(){
                        this.setStyle('opacity',1);
                    },
                    'mouseleave': function(){
                        this.setStyle('opacity',0.8);
                    }
                }});
 
            this.arrowRight = new Element('a',{'class':'right',styles:{'opacity':0.8,'float':'right','width':this.options.arrowWidth,'height':this.options.buttonHeight,'background':'url("' + this.options.arrowRightImg + '") no-repeat'},
                'events': {
                    'click': function(){
                        cs.setPlayStatus(false);
                        cs.currentPage = cs.currentPage + 1;
                        if (cs.currentPage>cs.buttonMaxPage) cs.currentPage = cs.buttonMaxPage;
                        cs.setImgPage(cs.currentPage);
                    },
                    'mouseover': function(){
                        this.setStyle('opacity',1);
                    },
                    'mouseleave': function(){
                        this.setStyle('opacity',0.8);
                    }
                }
 
            });
 
            this.options.button.adopt(this.arrowLeft);
            this.options.button.adopt(this.arrowRight);
       }
 
        this.options.button.adopt(this.buttonScrollPanel);
        this.contentWidth = this.options.container.getWidth();
        if (!this.contentWidth)  this.contentWidth = this.options.container.getSize().x;
        this.buttonPanelWidth = this.options.button.getWidth();
        if (!this.buttonPanelWidth)  this.buttonPanelWidth = this.contentWidth;
        var ract = window.getSize();
        if (!this.buttonPanelWidth) this.buttonPanelWidth = this.contentWidth>0?this.contentWidth:ract.x/3;
 
        //计算翻页控件显示数量begin
       if (!cs.options.arrowButton)  this.showButtonSize = parseInt(Math.ceil(this.buttonPanelWidth/(this.buttonWidth+this.options.marginWidth)));
       else this.showButtonSize = parseInt(Math.ceil((this.buttonPanelWidth-(this.options.arrowWidth*2))/(this.buttonWidth+this.options.marginWidth)));
        //每屏显示宽度
 
       if (!cs.options.arrowButton)  this.buttonShowWidth = this.buttonPanelWidth;
       else  this.buttonShowWidth = this.buttonPanelWidth-(this.options.arrowWidth*2);
 
        this.buttonMaxPage = Math.ceil(this.buttonLength/this.showButtonSize);
 
        //小图片的合计宽度
        if (!this.scrollWidth) this.scrollWidth = (this.buttonWidth+ this.options.marginWidth)*this.buttonLength;
        if (Browser.name=='ie'&&Browser.version==6) this.scrollWidth = this.scrollWidth + this.buttonLength;
        this.buttonUlPanel.setStyle('width',this.scrollWidth);
 
        this.buttonFx = new Fx.Morph(this.buttonUlPanel,{
            link:'cancel',
            duration: this.options.duration,
            transition: this.options.buttonTransition
        });
        //计算翻页控件显示数量end
        // 标题begin
        this.titleDiv = new Element('div',{'class':this.options.textPanelCss});
        this.titleFx = new Fx.Morph(this.titleDiv,{
            link:'cancel',
            duration: this.options.duration,
            transition: this.options.titleTransition
        });
        this.titleFx.set( {
            'height': 0,
            'width': this.contentWidth,
            'visibility': 'hidden'
        });
        //标题end

        //cache 效果 begin
        this.container = this.options.container.clone();
        this.container.addClass('contentScrollPanel');        
        this.container.setStyle('float','left');
        this.container.setStyle('display','');
 
 
        this.cacheContainer = this.options.container.clone();
        this.cacheContainer.addClass('cacheContainer');                
        this.cacheContainer.setStyle('float','left');
        this.cacheContainer.setStyle('display','');
 
        this.scrollContainer =  new Element('div',{'class':'scrollContainer','styles':{
            'width':this.contentWidth>0?(this.contentWidth*2):'100%',
            'float':'left'
        }});
 
        this.scrollContainer.adopt(this.container);
        this.scrollContainer.adopt(this.cacheContainer);
 
        this.options.container.empty();
        this.options.container.adopt(this.scrollContainer);
        if (this.options.motion=='scroll')
            this.options.container.setStyle('overflow','hidden');
		 
        //cache 效果 end
        this.container.addEvents({
            'mouseenter': function() {
                if (cs.options.showTitle)
                {
                    cs.titleFx.start( {
                        'visibility': 'visible',
                        'height': cs.options.titleHeight
                    });
                }
                cs.stop();
            },
            'mouseleave': function() {
 
                if (cs.options.showTitle && cs.titleDiv)
                {
 
                     (function()
                     {
                         if (Browser.name=='ie'){
                             cs.titleDiv.setStyles({
                                 'height': 0,
                                 'visibility': 'hidden'
                             });
                         } else {
                             cs.titleFx.start( {
                                 'height': 0,
                                 'visibility': 'hidden'
                             });
                         }
                     }).delay(200,cs);
                }
                cs.play();
             },
            'click': function() {
                var link = this.get("link");
                var target = this.get("target");
                if (link!=null && link!=''&& link!='#')
                {
                    if (link.startsWith('javascript:'))
                    {
                        eval(link.substringAfter(":"));
                    } else
                    {
                        if (target==''||target=='_self') window.location = link;
                        else window.open(link,target);
                    }
                }
            }
         });
 
        if (this.options.showArrow==false) this.options.button.setStyle('display','none');
        this.fireEvent('load',this);
 
    },
    setCurrentStep:function(current) {
        var oldCurrentStep = this.options.currentStep;
        if (current==undefined) current = this.options.currentStep;
        else  this.options.currentStep = current;
        var cs = this;
 
        var buttons = this.buttonUlPanel.getElements('li');
        if (!buttons) return;
        buttons.removeClass(this.options.currentCss);
        if (!buttons[current]) return;
        if (this.options.currentCss) buttons[current].addClass(this.options.currentCss);		
        if (this.options.motion=='scroll')
        {
		        this.cacheFx = new Fx.Morph(this.scrollContainer, {
                duration: 'normal',
                onStart:function()
                {
                    cs.cacheContainer.set('html',cs.buttonJson[buttons[current].get('index').toInt()].html);
                    cs.container.set("link",buttons[current].get('link'));
                },
                onComplete:function(){
 
                    var cur = buttons[current];
                    if (!cur) return;
                    cs.container.set('html',cs.buttonJson[cur.get('index').toInt()].html);
                    if (cs.options.showTitle&&cs.titleFx&&cs.titleDiv)
                    {
                        var tit= cs.buttonJson[cur.get('index').toInt()].title;
                        if (tit) cs.titleDiv.set('html',tit);
                        cs.container.grab(cs.titleDiv,'top');
                    }
                    if (cs.container.getStyle('float')=='left')
                    {
                        cs.container.setStyle('float','right');
                    } else
                        cs.container.setStyle('float','left');
 
                    //联动,翻页 begin
                    var thePage = parseInt(current/cs.showButtonSize);
                    if (thePage*cs.showButtonSize<=current) thePage = thePage + 1;
                    if (cs.currentPage != thePage) cs.setImgPage(thePage);
 
                    //联动,翻页 end
                    cs.fireEvent('scrollChange',cs);
                 }
            });
 
 
            var leftStart = 0;
            var leftEnd =-this.contentWidth;
            if (oldCurrentStep<current || oldCurrentStep==current==1)
            {
                this.container.setStyle('float','left');
 
                leftStart = 0;
                leftEnd =-this.contentWidth;
 
            } else
            if (oldCurrentStep>current)
            {
                this.container.setStyle('float','right');
                leftStart = -this.contentWidth;
                leftEnd = 0;
            }  else return;
            this.cacheFx.start({'margin-left':[leftStart,leftEnd]});
        }
        else if (this.options.motion=='fade')
        {
            var containerFx = new Fx.Tween(cs.container, {
                property: 'opacity',
                duration: 'normal',
                onStart:function()
                {
                    cs.container.setStyle('opacity',0.8);
                    cs.cacheContainer.set('html',cs.buttonJson[buttons[current].get('index').toInt()].html);
                    cs.container.set("link",buttons[current].get('link'));
                    cs.container.set('html',cs.buttonJson[buttons[current].get('index').toInt()].html);
                },
                onComplete:function(){
                    //联动,翻页 begin
                    var thePage = parseInt(current/cs.showButtonSize);
                    if (thePage*cs.showButtonSize<=current) thePage = thePage + 1;
                    if (cs.currentPage != thePage) cs.setImgPage(thePage);
                    //联动,翻页 end
                    cs.fireEvent('scrollChange',cs);
                }
            });
            containerFx.start([0.4,1]);
        }
        else
        {
            cs.cacheContainer.set('html',cs.buttonJson[buttons[current].get('index').toInt()].html);
            cs.container.set('html',cs.cacheContainer.get('html'));
            cs.container.set("link",buttons[current].get('link'));
 
            //联动,翻页 begin
            var thePage = parseInt(current/cs.showButtonSize);
            if (thePage*cs.showButtonSize<=current) thePage = thePage + 1;
            if (cs.currentPage != thePage) cs.setImgPage(thePage);
            //联动,翻页 end
            cs.fireEvent('scrollChange',cs);
        }
        this.titleDiv.setStyle('width',cs.container.getStyle('width'));
    },
    setPlayStatus:function(play)
    {
        this.options.playStatus = play;
        if (this.options.statusBar&&this.options.playInfo&&this.options.stopInfo)
        {
            if (this.options.playStatus)
                this.options.statusBar.set('html',this.options.playInfo);
            else
                this.options.statusBar.set('html',this.options.stopInfo);
        }
    },
    getCurrentStep:function() {
        return this.options.currentStep;
    },
    timer:function () {
        if (!this.options.play) return;
        this.next();
    },
    play:function() {
      if (this.periodical) return;
      this.setPlayStatus(true);
      this.periodical = this.timer.periodical(this.options.sleep,this);
    },
    isStop:function()
    {
        return !this.options.playStatus;
    },
    stop:function() {
        this.setPlayStatus(false);
        if (this.periodical) clearInterval(this.periodical);
        this.periodical = null;
    },
    playAndStop:function() {
        if (this.options.playStatus)  this.stop();
        else this.play();
        return this.options.playStatus;
    },
    previous:function() {
        var current = this.options.currentStep - 1;
        if (current<0) current = (this.buttonLength-1);
        this.setCurrentStep(current);
    },
    next:function() {
        var current = this.options.currentStep.toInt() + 1;
        if (current>=this.buttonLength) current = 0;
        this.setCurrentStep(current);
    },
    clickPrevious:function() {
        this.stop();
        this.previous();
    },
    clickNext:function() {
        this.stop();
        this.next();
    },
    clickPreviousPage:function(){
        this.stop();
        this.setImgPage(this.currentPage - 1);
    },
    clickNextPage:function(){
        this.stop();
        this.setImgPage(this.currentPage+1);
    },
    setImgPage:function(buttonPage) {
        var page = buttonPage-1;
        if (!page||page<=0) page = 0;
        if (page>this.buttonMaxPage-1) page = this.buttonMaxPage-1;
        var move = page*this.buttonShowWidth;
        this.buttonFx.start( {
            'margin-left':-move
        });
        this.currentPage = (page+1);
    },
    close:function()
    {
            this.options.container.destroy();
            this.options.button.destroy();
 
    }
});
//--------------------------无缝滚动
var JMarquee  = new Class({
    Implements: [Events, Options],
    options: {
        container: '', //div容器
        button: false, //button容器,动态生成放入
        currentCss:'selected',
        textPanelCss:'titlePanel',
        titleTransition: 'back:in', //: 'linear', 'quad:in', 'back:in', 'bounce:out', 'elastic:out', 'sine:in:out'
        transition: 'linear', //: 'linear', 'quad:in', 'back:in', 'bounce:out', 'elastic:out', 'sine:in:out'
        duration:'normal',// - 250ms * 'normal' - 500ms * 'long
        direction:false, // false:右边  true 左边
        titleHeight:100,
        blockWidth:100, //每一个滚动块的宽度,包含间隙
        marginWidth:1,
        scrollWidth:false,
        data:[], //数据显示层
        arrowPrevious:false, //外部导向id，上一个
        arrowNext:false,      //外部导向id， 下一个
        arrowButton:true, //是否显示导向按钮
        arrowLeftImg:'/script/images/arrow_left.gif', //上一个
        arrowRightImg:'/script/images/arrow_right.gif', //下一个
        play:true, //默认是否播放
        playMode:true, //是否为手动模式
        statusBar:false, //状态容器
        playInfo:'播放',
        stopInfo:'停止',
        buttonEvent:'mouseenter', //click mouseenter
        currentStep:1,//当前步骤, 1 开始
        sleep:4000, //滚动等待时机
        showArrow:true, //显示导航
        showTitle:true //显示标题
        //onScrollChange: $empty() //参数 是索
        //onLoad: $empty() //载入完成后
 
    },
    initialize: function(options) {
        this.setOptions(options);
        if (typeof(this.options.container)=='string')
            this.options.container = $(this.options.container);
 
        if (typeof(this.options.button)=='string')
            this.options.button = $(this.options.button);
 
        if (this.options.statusBar&&typeof(this.options.statusBar)=='string')
            this.options.statusBar = $(this.options.statusBar);
 
        if (typeof(this.options.data)=='string')
            this.options.data = $$(this.options.data);
 
        this.scrollWidth = this.options.scrollWidth;
 
        this.loadData(this.options.data);
        this.setImgPage(this.options.currentStep);
        if (this.options.play) this.play();
    },
    loadData:function(data) {
        if (data==undefined) return;
        this.options.data = data;
        if (!this.options.data) return;
        this.blockWidth = this.options.blockWidth;
        this.buttonJson = [];
        var cs = this;
        //通过div生成 li 按钮列表
        for (var i=0; i<cs.options.data.length;i++)
        {
            var btn = {};
            btn.image = cs.options.data[i].get("image");
            btn.title = cs.options.data[i].get("title");
            btn.link = cs.options.data[i].get("link");
            btn.target = cs.options.data[i].get("target");
            btn.index = i;
            btn.sort = (i+1);
            this.buttonJson.include(btn);
        }
        this.buttonLength = this.buttonJson.length;
 
        this.options.container.empty();
        this.ulPanel = new Element('ul',{'class':'scroll'});
        this.scrollPanel = new Element('div',{'class':'scrollPanel'});
        this.scrollPanel.adopt(this.ulPanel);
        this.titles = new Array(this.buttonJson.length);
        var closeTitle = function() {
            var ind = this.get('index');
            (function()
            {
                var titleDiv = cs.titles[ind];
                if (titleDiv)
                {
                    titleDiv.morph( {
                        'height': 0,
                        'display': 'none'
                    });
                }
            }).delay(200,cs);
            cs.play();
        };
 
       var tempLi = false;
        for (var i=0;i<this.buttonJson.length;i++)
        {
            var liDiv = new Element('li');
            this.ulPanel.adopt(liDiv);
            liDiv.set('html',this.options.data[i].get('html'));
            liDiv.set('link',this.buttonJson[i].link);
            liDiv.set('sort',this.buttonJson[i].sort);
            liDiv.set('target',this.buttonJson[i].target);
            liDiv.set('index',this.buttonJson[i].index);
            if (cs.options.showTitle)
            {
                var titleDiv = new Element('div',{'class':this.options.textPanelCss,'html':this.buttonJson[i].title});
                titleDiv.set('index',this.buttonJson[i].index);
                liDiv.grab(titleDiv,'top');
                titleDiv.set('morph', {
                    duration: 'long',
                    link:'cancel',
                    transition: 'bounce:out'
                });
 
                titleDiv.setStyles({
                    'height': 0,
                    'width': this.blockWidth,
                    'position':'absolute',
                    'z-index':1,
                    'display': 'none'
                });
                this.titles[this.buttonJson[i].index]=titleDiv;
                liDiv.addEvent('mouseenter', function() {
                    var ind = this.get('index');
                    if (cs.options.showTitle)
                    {
                        var titleDiv = cs.titles[ind];
                        if (titleDiv) {
                            titleDiv.morph({
                                'display': '',
                                'height': cs.options.titleHeight
                            });
                        }
                    }
                    cs.stop();
                });
                liDiv.addEvent('mouseleave',closeTitle );
                titleDiv.addEvent('mouseleave',closeTitle );
            }
            if (this.buttonJson[i].link&&this.buttonJson[i].link!='#')
            {
                liDiv.addEvent('click', function() {
                    var link = this.get("link");
                    var target = this.get("target");
                    if (link!=null && link!=''&& link!='#')
                    {
                        if (link.startsWith('javascript:'))
                        {
                            eval(link.substringAfter(":"));
                        } else
                        {
                            if (target==''||target=='_self')
                                window.location = link;
                            else
                                window.open(link,target);
                        }
                    }
                });
            }
 
            if (!tempLi) tempLi =  liDiv;
        }
 
        if (!tempLi) return;
 
        this.options.container.addEvents({
            'mouseenter':function() {
                cs.stop();
            },
            'mouseleave':function() {
                if (cs.options.showTitle)
                {
                    (function()
                    {
                        if (Browser.name=='ie'){
                            cs.titleFx.set( {
                                'height': 0,
                                'display': 'none'
                            });
                        } else {
                            cs.titleFx.start( {
                                'height': 0,
                                'display': 'none'
                            });
                        }
                    }).delay(200,cs);
                }
                cs.play();
          }
        });
 
        //计算缩图宽度及数量
        if (cs.options.arrowPrevious)
        {
            $(cs.options.arrowPrevious).addEvent('click', function() {
                cs.previous();
            });
        }
        if (cs.options.arrowNext)
        {
            $(cs.options.arrowNext).addEvent('click', function() {
                cs.next();
            });
        }
 
        //加入导向图片
        var img = new Image();
        img.src = this.options.arrowLeftImg;
        if (!this.options.arrowButton) img.width = 0;
 
        this.options.container.adopt(this.scrollPanel);
        this.contentWidth = this.options.container.getWidth();
 
        //计算翻页控件显示数量begin
        //显示个数
        this.showButtonSize = parseInt(Math.ceil(this.contentWidth/(this.blockWidth+this.options.marginWidth)));
        //每屏显示宽度
        this.buttonMaxPage = Math.ceil(this.buttonLength/this.showButtonSize);
 
        if (!this.scrollWidth) this.scrollWidth = this.showButtonSize*(this.blockWidth+this.options.marginWidth);
 
        //菜单放入按钮 begin
        if (this.options.button)
        {
            this.menuPanel = new Element('ul',{'class':'scroll'});
            var leftLiDiv = new Element('span',{'class':'left'});
            var leftDiv = new Element('a',{'href':'javascript:void(0)','class':'left',styles:{'float':'left'},'html':'◄'});
            leftLiDiv.adopt(leftDiv);
            leftDiv.addEvent('click', function() {
                cs.previous();
            });
            this.menuPanel.adopt(leftLiDiv);
 
            for (var i=1;i<=this.buttonMaxPage;i++)
            {
                var liDiv = new Element('li');
                var aDiv = new Element('a',{'href':'javascript:void(0)'});
                liDiv.adopt(aDiv);
 
                aDiv.set('pageIndex',i);
                aDiv.addEvent(cs.options.buttonEvent, function() {
                    var pageIndex = this.get("pageIndex");
                    if (pageIndex)
                        cs.setImgPage(pageIndex);
                });
                this.menuPanel.adopt(liDiv);
            }
            this.options.button.adopt(this.menuPanel);
            var rightLiDiv = new Element('span',{'class':'right'});
            var rightDiv = new Element('a',{'href':'javascript:void(0)','class':'right','html':'►'});
            rightLiDiv.adopt(rightDiv);
            rightDiv.addEvent('click', function() {
                cs.next();
            });
            this.menuPanel.adopt(rightLiDiv);
            this.menuPanel.addEvents({
                'mouseenter': function() {
                   cs.stop();
                },
                'mouseleave': function() {
                    cs.play();
                }
            });
        }
        //菜单放入按钮 end
 
        this.scrollPanel.setStyle('width',this.contentWidth);
        var fullWidth = (this.blockWidth+this.options.marginWidth)*this.buttonLength;
        if (Browser.name=='ie'&&Browser.version==6) fullWidth = fullWidth + this.buttonLength;
        this.ulPanel.setStyle('width',fullWidth);
 
 
        this.buttonFx = new Fx.Morph(this.ulPanel,{
            link:'cancel',
            duration: this.options.duration,
            transition: this.options.transition
        });
        //计算翻页控件显示数量end
 
        // 标题begin
        if (this.options.showTitle)
        {
            this.titleDiv = new Element('div',{'class':this.options.textPanelCss});
            this.titleFx = new Fx.Morph(this.titleDiv,{
                link:'cancel',
                duration: this.options.duration,
                transition: this.options.titleTransition
            });
        }
        //标题end
 
        //cache 效果 begin
        this.options.container.setStyle('overflow','hidden');
        this.fireEvent('load',this);
 
    },
    setPlayStatus:function(play)
    {
        this.options.play = play;
        if (this.options.statusBar)
        {
            if (this.options.play)
                this.options.statusBar.set('html',this.options.playInfo);
            else
                this.options.statusBar.set('html',this.options.stopInfo);
        }
    },
    timer:function () {
        if (!this.options.play) return;
        if (this.options.direction) this.previous();
        else this.next();
    },
    previous:function() {
        this.options.currentStep = this.options.currentStep - 1;
        if (this.options.currentStep<1) this.options.currentStep = this.buttonMaxPage;
        this.setImgPage(this.options.currentStep);
        this.stop();
        this.play();
    },
    next:function() {
        this.options.currentStep = this.options.currentStep + 1;
        if (this.options.currentStep>this.buttonMaxPage) this.options.currentStep = 1;
        this.setImgPage(this.options.currentStep);
        this.stop();
        this.play();
    },
    play:function() {
        if (this.options.play&&this.periodical) return;
        if (!this.options.playMode) return false;
        this.setPlayStatus(true);
        this.periodical  = this.timer.periodical(this.options.sleep,this);
 
    },
    playAndStop:function() {
        if (this.options.play)  this.stop();
        else this.play();
        return this.options.play;
    },
    isStop:function()
    {
        return !this.options.play;
    },
    stop:function() {
        this.setPlayStatus(false);
        if (this.periodical) clearInterval(this.periodical);
        this.periodical = null;
    },
    setImgPage:function(buttonPage) {
        var page = buttonPage-1;
        if (page<=0) page = 0;
        if (page>this.buttonMaxPage-1) page = this.buttonMaxPage-1;
        var move = page*this.scrollWidth;
        if (move<this.blockWidth) move = 0;
       if(move==0){
           this.ulPanel.setStyle('margin-left',0);
       }else{
           this.buttonFx.start( {
                'margin-left':-move
             });
       }
 
        this.options.currentStep = buttonPage;
        var leArray = this.menuPanel.getElements('li');
        if (leArray)
        {
            leArray.removeClass(this.options.currentCss);
            if (leArray[(this.options.currentStep-1)])
                leArray[(this.options.currentStep-1)].addClass(this.options.currentCss);
        }
    }
    ,
    getCurrentStep:function()
    {
       return this.options.currentStep;
    }
 
});
 
//---------------------延时加载图片
/**
 * var lazyloader = new LazyLoad();
 * <img data-src="path/xxx.jpg" />
 */
var LazyLoad = new Class({
    Implements: [Options,Events],
    options: {
        range: 200,
        elements: "img",
        loaderImg: "/share/pimg/ajax-loader.gif",
        container: window,
        mode: "vertical",
        realSrcAttribute: "data-src"  //属性
    },
    /* initialize */
    initialize: function(options) {
        // Set the class options
        this.setOptions(options);
        // Elementize items passed in
        this.container = document.id(this.options.container);
        this.elements = document.id(this.container == window ? document.body : this.container).getElements(this.options.elements);
 
        // Set a variable for the "highest" value this has been
        this.largestPosition = 0;
 
        // Figure out which axis to check out
        var axis = (this.options.mode == "vertical" ? "y": "x");
 
        // Calculate the offset
        var offset = (this.container != window && this.container != document.body ? this.container : "");
        var ld = this;
        // Find elements remember and hold on to
        this.elements = this.elements.filter(function(el) {
            if (el.tagName=='IMG'&&!el.getProperty('src')) el.setProperty('src',ld.options.loaderImg);
            // Get the image position
            var elPos = el.getPosition(offset)[axis];
            // If the element position is within range, load it
            if(elPos < this.container.getSize()[axis] + this.options.range) {
                this.loadImage(el);
                return false;
            }
            return true;
        },this);
 
        // Create the action function that will run on each scroll until all images are loaded
        var action = function(e) {
            // Get the current position
            var cpos = this.container.getScroll()[axis];
            // If the current position is higher than the last highest
            if(cpos > this.largestPosition) {
                // Filter elements again
                this.elements = this.elements.filter(function(el) {
                    // If the element is within range...
                    if((cpos + this.options.range + this.container.getSize()[axis]) >= el.getPosition(offset)[axis]) {
                        // Load the image!
                        this.loadImage(el);
                        return false;
                    }
                    return true;
                },this);
                // Update the "highest" position
                this.largestPosition = cpos;
            }
 
            // relay the class" scroll event
            this.fireEvent("scroll");
            // If there are no elements left, remove the action event and fire complete
            if(!this.elements.length) {
                this.container.removeEvent("scroll",action);
                this.fireEvent("complete");
            }
        }.bind(this);
 
        // Add scroll listener
        this.container.addEvent("scroll",action);
    },
    loadImage: function(image) {
        // Set the SRC
        var dataSrc = image.get(this.options.realSrcAttribute);
        if (dataSrc)
        {
            image.removeProperty(this.options.realSrcAttribute);
            image.setProperty("src",dataSrc);
            // Fire the image load event
            this.fireEvent("load",[image]);
        }
    }
});
//-------------video 连续播放
//<video width="320" height="200" controls preload>
//  <source src="movie1.mp4" type="video/mp4" >示例视频1</source>           
//	<source src="movie2.mp4" type="video/mp4" >示例视频1</source>     
//</video>
var JVideos = new Class({
    Implements: [Options, Events],
    options: {
	   container:'video',
       current:0
    },
    initialize: function (options) {
       this.setOptions(options);
        this.container =  container;
        if (typeof(this.options.container)=='string') this.options.container = $(this.options.container);
       this.options.container.set('current',this.options.current);
       this.options.container.addEventListener('ended', this.play);
       
   },
   play:function ()
   {
       var container = this.options.container;
       var sources = container.getElements('source');
       var playList = [];
       for (var i=0;i<sources.length;i++)
       {   
		   playList.include(sources[i].get('src'));
       }
       var current = container.get('current').toInt();
       current++;  
       if(current >= playList.length) current = 0;
       container.set('current',current);
 
       container.src = playList[current];
       container.load();   
       container.play();
   }
   ,
   attribute:function(name,value)
   {
	   if (this.options.container)
	       this.options.container.setAttribute(name, value);
   }    
});    
//---------------------瀑布流
//new Waterfall({container:"wf-main"});	

var Waterfall = new Class({
    Implements: [Options, Events],
    options: {
        container: "wf-main",
        childClass:false
    },
    initialize: function (options) {
        this.setOptions(options);
        this.container =  this.options.container;
        if (typeof(this.container)=='string') this.container = $(this.container);
        var cDiv =  this.container.getElement('div');
        this.children = this.options.childClass;
        this.children = this.children && this.children != '' ? this.children : 'wf-cld';
        if (!cDiv&&this.children) cDiv = $(this.children);
        if (!cDiv) return;
 
        this.colWidth = cDiv.getStyle('width').toInt()
                + Math.round(cDiv.getStyle('border-left-width').toFloat() + cDiv.getStyle('border-right-width').toFloat())
                + Math.round(cDiv.getStyle('margin-left').toFloat() + cDiv.getStyle('margin-right').toFloat());
        this.colCount = (this.container.getStyle('width').toInt()/this.colWidth).toInt();
 
        //列高   索引
        var col = [],iArr = [];
        var nodes = this.getByClass(this.children,this.container),len = nodes.length;
        for(var i = 0; i < this.colCount; i++){
            col[i] = 0;
        }
        for(var i = 0; i < len; i++){
            nodes[i].h = nodes[i].offsetHeight + this.getMar(nodes[i]);
            iArr[i] = i;
        }
        for(var i = 0; i < len; i++){
            var ming = this.getMinCol(col);
            nodes[i].setStyle('left',ming * this.colWidth);
            nodes[i].setStyle('top',col[ming]);
            col[ming] += nodes[i].h;
        }
        this.container.setStyle('height',this.maxArr(col));
    }
    ,
    getByClass:function(cls,p){
        var arr = [],reg = new RegExp("(^|\\s+)" + cls + "(\\s+|$)","g");
        var nodes = p.getElementsByTagName("*"),len = nodes.length;
        for(var i = 0; i < len; i++){
            if(reg.test(nodes[i].className)){
                arr.push(nodes[i]);
                reg.lastIndex = 0;
            }
        }
        return arr;
    },
    maxArr:function(arr){
        var len = arr.length,temp = arr[0];
        for(var ii= 1; ii < len; ii++){
            if(temp < arr[ii]){
                temp = arr[ii];
            }
        }
        return temp;
    },
    getMar:function(node){
        var dis = 0;
        if(node.currentStyle){
            dis = parseInt(node.currentStyle.marginBottom);
        }else if(document.defaultView){
            dis = parseInt(document.defaultView.getComputedStyle(node,null).marginBottom);
        }
        return dis;
    },
    getMinCol:function(arr){
        var ca = arr,cl = ca.length,temp = ca[0],minc = 0;
        for(var ci = 0; ci < cl; ci++){
            if(temp > ca[ci]){
                temp = ca[ci];
                minc = ci;
            }
        }
        return minc;
    }
});
//---------------------模板 begin
//文件方式调用渲染
Request.Template = new Class({
    Extends: Request.JSON,
    options: {
        templateUrl:false,
        method: 'POST', //必须
        encoding:'UTF-8',
        headers:{'X-Requested-With':'jspx.net-roc'},
        progress:true
    },
    initialize: function (id,options) {
        this.parent(options);
        this.element = typeof(id)=='string'?$(id):id;
 
        this.template = false;
        var self = this;
        if (this.options.templateUrl)
        {
            if (this.options.progress)
            {
                this.progressBar = new JProgressBar({
                    container:this.element,
                    startPercentage:0,
                    speed:500,
                    step:100
                });
            }
            new Request({ url: this.options.templateUrl,
                onLoadstart:function() {
                    if (self.options.progress) self.progressBar.step(40);
                },
                onSuccess: function(txt){
                    if (self.options.progress) self.progressBar.step(60);
                    self.template = Handlebars.compile(txt);
                }
            }).get();
        } else {
            self.template = Handlebars.compile(self.element.get('html'));
            this.element.empty();
            if (this.options.progress)
            {
                this.progressBar = new JProgressBar({
                    container:this.element,
                    startPercentage:0,
                    speed:500,
                    step:100
                });
            }
        }
        this.timer = false;
    },
    onLoadstart:function() {
        if (this.options.progress) this.progressBar.step(80);
    },
    onSuccess: function(data,t)
    {
        if (this.options.progress) this.progressBar.step(100);
        var checkRender=function()
        {
            if (this.template) {
                if (this.options.progress) this.progressBar.destroy();
                if (this.timer) clearInterval(this.timer);
                this.element.set('html',this.template(data));
            }
        };
        this.timer = checkRender.periodical(400,this);
    },
    render: function (o) {
        if (this.options.progress) this.progressBar.step(20);
        if (typeof(o)!='string') o = JSON.encode(o);
        this.send(o);
    }
});
 
 
 
//bug 自动修复
window.addEvent('domready', function () {
    if (Browser.name=='ie'&&(Browser.version==6 || Browser.version==7)) {
        //<button value="abc">测试</button> 需要交换value不能得到
        var butArray = $$('button');
        if (butArray) butArray.each(function (e) {
            if (e&&e.getAttributeNode('value'))
            {
                var value = e.getAttributeNode('value').nodeValue;
                var inputEl = new Element('input', {'name': e.get('name'), 'type': 'hidden', 'value': value});
                e.set('name', 'submit_' + value);
                inputEl.injectAfter(e);
            }
        });
    }
 
    //修复placeholder
    if (!('placeholder' in document.createElement('input')))
    {
        var color = '#aaa';
        $$('input').each(function(el)
        {
            var text = el.get('placeholder'), defaultColor = el.getStyle('color');
            if (text)
            {
                el.setStyle('color', color).set('value', text)
                        .addEvent('focus', function()
                        {
                            if (this.value == '' || this.value == text) this.setStyle('color', defaultColor).set('value','');
                        })
                        .addEvent('blur', function()
                        {
                            if (this.value == '' || this.value == text) this.setStyle('color', color).set('value', text);
                            else this.setStyle('color', defaultColor);
                        });
                var form = el.getParent('form');
                if (form)
                {
                    form.addEvent('submit', function()
                    {
                        if (el.value == text) el.set('value', '');
                    });
                }
            }
        });
    }
    //修复数字录入
    var inputTest = document.createElement("input");
    inputTest.setAttribute("type", "number");
    if (inputTest.type != "number")
    {
        new RangeInput({rangeCss:'input[type=number]'});
    }
    //修复日期
    inputTest.setAttribute("type", "date");
    if (inputTest.type != "date")
    {
        new Calendar({calendarCss:'input[type=date]'}).cssInit();
    }
    //修复颜色
    inputTest.setAttribute("type", "color");
    if (inputTest.type != "color")
    {
        new ColorBox({colorBoxCss:'input[type=color]'}).cssInit();
    }
    //修复数字范围
    inputTest.setAttribute("type", "range");
    if (inputTest.type != "range")
    {
        new RangeInput({rangeCss:'input[type=range]'});
    }
   
    if (typeof(Handlebars)!='undefined'&&Handlebars!=undefined)
    {
       
        //Handlebars 模板扩展支持
        Handlebars.registerHelper("eval",function(/* ... */){
            var options = arguments[arguments.length-1];
            var code = arguments[0];
            this.data = options.data;
            eval("var result=" + code);
            return result;
        });
 
        Handlebars.registerHelper("if",function(/*...*/){
            var options = arguments[arguments.length-1];
            var condit = arguments[0];
            var result = false;
            var exChars = ['.','<','>', '=','+','-','*','/','('];
            if (condit==undefined || typeof(condit)!='string'&&!condit&& condit<=0 ) condit = false;
            if (condit&&exChars.some(function(item, index){ return condit.indexOf(item)!=-1;})) 
           {
               result = eval(condit);
           }
            else result = condit;
            if(result) return options.fn(this);
            else return options.inverse(this);
        });
 
        //模板文件自动载入
        var scriptTemplates = $$("script[type=text/x-handlebars-template]");
        if (scriptTemplates) scriptTemplates.each(function(e) {
            var url = e.get("template-file");
            if (!url||url=='') return;
            e.load(url);
        });
    }
  
});
 
function scrollToTop(acceleration, time) {
    acceleration = acceleration || 0.1;
    time = time || 16;
    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;
 
    if (document.documentElement) {
        x1 = document.documentElement.scrollLeft || 0;
        y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
        x2 = document.body.scrollLeft || 0;
        y2 = document.body.scrollTop || 0;
    }
    var x3 = window.scrollX || 0;
    var y3 = window.scrollY || 0;
 
    // 滚动条到页面顶部的水平距离
    var x = Math.max(x1, Math.max(x2, x3));
    // 滚动条到页面顶部的垂直距离
    var y = Math.max(y1, Math.max(y2, y3));
 
    // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
    var speed = 1 + acceleration;
    window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
 
    // 如果距离不为零, 继续调用迭代本函数
    if(x > 0 || y > 0) {
        var invokeFunction = "scrollToTop(" + acceleration + ", " + time + ")";
        window.setTimeout(invokeFunction, time);
    }
}