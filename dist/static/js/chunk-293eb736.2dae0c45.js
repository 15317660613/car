(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-293eb736"],{"1a08":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticStyle:{position:"relative"}},[e("div",{staticClass:"mainContainer",staticStyle:{margin:"0 auto"}},[e("div",{staticClass:"newsparent"},[e("div",{staticClass:"chartParent",staticStyle:{display:"flex","flex-flow":"column"}},[e("div",{staticStyle:{"border-radius":"4px",border:"1px solid #DCDFE6"}},[t._m(0),e("v-chart",{staticClass:"chartHeight",attrs:{options:t.polarAge}})],1),e("div",{staticStyle:{"border-radius":"4px",border:"1px solid #DCDFE6","margin-top":"20px"}},[e("div",{staticClass:"chartTitle",staticStyle:{display:"flex","justify-content":"space-between"}},[e("span",[t._v(t._s(t.companyYear)+"汽车市场TOP10企业产量表现")]),e("span",{staticStyle:{"margin-right":"20px"}},[t._v("单位：辆")])]),e("v-chart",{staticClass:"chartHeight",attrs:{options:t.polarCompany}})],1)]),e("div",{staticClass:"baseItemWidth baseMargin",staticStyle:{"border-radius":"6px",border:"1px solid #DCDFE6"}},[e("div",{staticClass:"hotTitle",staticStyle:{width:"100%",display:"flex","justify-content":"space-between","padding-left":"16px","padding-right":"16px"}},[t._m(1),e("router-link",{attrs:{to:"/unscramble"}},[e("div",{staticClass:"cardTitleMore hotTitle"},[t._v(" 查看更多"),e("i",{staticClass:"iconfont iconxingzhuangbeifen",staticStyle:{"font-size":"12px","margin-left":"6px"}})])])],1),e("div",{staticStyle:{height:"1px",width:"100%","background-color":"#DCDFE6"}}),t._l(t.hotArray,(function(a,i){return e("div",{key:i,staticStyle:{"padding-left":"16px","padding-right":"16px"}},[e("div",{staticClass:"hotNewsTitle",staticStyle:{cursor:"pointer"},attrs:{title:a.title?a.title:""},on:{click:function(e){return t.goDetail(a.id)}}},[e("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#iconcar-app-thirteen"}})]),t._v(" "+t._s(a.title?a.title:"")+" ")]),e("div",{class:{lineMargin:i==t.hotArray.size-1},staticStyle:{height:"1px",width:"100%","background-color":"#DCDFE6"}})])}))],2)])]),e("carouselBottom")],1)])},s=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"chartTitle",staticStyle:{display:"flex","justify-content":"space-between"}},[e("span",[t._v("本年度汽车市场月度产量表现")]),e("span",{staticStyle:{"margin-right":"20px"}},[t._v("单位：辆")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticStyle:{display:"flex"}},[e("div",{staticClass:"cardTitleLine hotTitleMargin"}),e("div",{staticClass:"cardTitle hotTitle"},[t._v(" 数据解读 ")])])}],r=(e("4160"),e("c975"),e("b0c0"),e("ac1f"),e("5319"),e("159b"),e("9e90")),o=(e("3191"),e("9ca8"),e("ef97"),e("c037"),e("94b1"),e("2f73"),e("007d"),e("d28f"),e("0dc0")),n={name:"Home",components:{carouselBottom:o["a"]},data:function(){return{hotArray:[],lastYear:"",ageYear:"",companyYear:"",daliyArray:[],polarAge:{title:{id:"111"},color:["#8FB9FC","#4FD7CF","#675bba"],legend:{top:"-2%"},tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}},formatter:function(t){var a="";return t.forEach((function(t){"NaN"==t.data&&(t.data="--"),-1!=t.seriesName.indexOf("增速")&&(t.data+="%"),a=a+t.seriesName+":"+t.data+"<br>"})),a}},grid:{left:"3%",right:"10%",bottom:"3%",top:"10%",containLabel:!0},xAxis:{show:!0,type:"category",axisLine:{lineStyle:{color:"#D8E5EE",width:1}},axisLabel:{formatter:"{value}",show:!0,textStyle:{color:"#606266",fontSize:12}},data:[]},yAxis:[{yAxisIndex:0,show:!0,type:"value",splitLine:{lineStyle:{type:"dashed"},show:!0},axisLine:{lineStyle:{color:"#D8E5EE",width:1}},axisLabel:{show:!0,textStyle:{color:"#606266",fontSize:12}}},{yAxisIndex:1,show:!0,type:"value",splitLine:{lineStyle:{type:"dashed"},show:!1},axisLine:{lineStyle:{color:"#D8E5EE",width:1}},axisLabel:{formatter:"{value} %",show:!0,textStyle:{color:"#606266",fontSize:12}}}],series:[{barWidth:"20px",data:[],type:"bar"},{barWidth:"20px",data:[],type:"bar"},{yAxisIndex:1,data:[],type:"line"}]},polarCompany:{color:"#66B7FF",tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}},formatter:function(t){var a="";return t.forEach((function(t){"NaN"==t.data&&(t.data="--"),a=a+t.seriesName+":"+t.data+"<br>"})),a}},grid:{left:"3%",right:"10%",bottom:"3%",top:"3%",containLabel:!0},xAxis:{show:!0,type:"category",axisLine:{lineStyle:{color:"#D8E5EE",width:1}},axisTick:{alignWithLabel:!0},axisLabel:{show:!0,textStyle:{color:"#606266",fontSize:12},interval:0,rotate:30}},yAxis:{show:!0,type:"value",splitLine:{lineStyle:{type:"dashed"},show:!0},axisLine:{lineStyle:{color:"#D8E5EE",width:1}},axisLabel:{show:!0,textStyle:{color:"#606266",fontSize:12}}},series:[{barWidth:"20px",data:[],type:"bar"}]}}},created:function(){this.getInformation(),this.getStatMonthYieldList(),this.getStatEnterpriseYieldList()},mounted:function(){},computed:{},methods:{goDetail:function(t){this.$router.push({path:"/unscrambleDetail",query:{id:t,type:5}})},getInformation:function(){var t=this,a={current:1,size:10,type:5,frontOrBack:"front"};Object(r["a"])(a).then((function(a){t.hotArray=a.data.data.records}))},getStatMonthYieldList:function(){var t=this;Object(r["e"])({}).then((function(a){t.ageYear=a.data.year;var e=t;a.data.maps&&0!=a.data.maps.length&&(t.polarAge.xAxis.data=a.data.maps[0].monthData,t.polarAge.series[0].data=a.data.maps[0].last,t.polarAge.series[0].name=parseInt(e.ageYear)-1+"年",t.polarAge.series[1].data=a.data.maps[0].curr,t.polarAge.series[1].name=e.ageYear+"年",t.polarAge.series[2].name=e.ageYear+"年增速",a.data.maps[0].compara.forEach((function(t){e.polarAge.series[2].data.push(t.replace("%",""))})))}))},getStatEnterpriseYieldList:function(){var t=this;Object(r["d"])({}).then((function(a){t.companyYear=a.data.month+"月";var e=[];a.data.maps&&0!=a.data.maps.length&&(a.data.maps.forEach((function(t){var a=[];a.push(t.COMPANYNAME),a.push(t.SUM),e.push(a)})),t.polarCompany.series[0].data=e)}))}}},l=n,c=(e("517d"),e("2877")),d=Object(c["a"])(l,i,s,!1,null,"7854082e",null);a["default"]=d.exports},"517d":function(t,a,e){"use strict";var i=e("71cf"),s=e.n(i);s.a},"71cf":function(t,a,e){}}]);