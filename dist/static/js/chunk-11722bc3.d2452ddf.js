(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11722bc3"],{"2c19":function(t,e,a){},3467:function(t,e,a){"use strict";var i=a("2c19"),r=a.n(i);r.a},"9e90":function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),a.d(e,"h",(function(){return n})),a.d(e,"i",(function(){return s})),a.d(e,"j",(function(){return o})),a.d(e,"e",(function(){return l})),a.d(e,"d",(function(){return c})),a.d(e,"l",(function(){return d})),a.d(e,"k",(function(){return u})),a.d(e,"g",(function(){return p})),a.d(e,"f",(function(){return h})),a.d(e,"b",(function(){return f})),a.d(e,"c",(function(){return y}));var i=a("b775");function r(t){return Object(i["a"])({url:"/business/information/page",method:"post",data:t})}function n(t){return Object(i["a"])({url:"/business/statSales/listPassengerSales",method:"get",params:t})}function s(t){return Object(i["a"])({url:"/business/statStock/listVehicleAge",method:"get",params:t})}function o(t){return Object(i["a"])({url:"/business/statStock/listEnterpriseStock",method:"get",params:t})}function l(t){return Object(i["a"])({url:"/business/statYield/listMonthYield",method:"get",params:t})}function c(t){return Object(i["a"])({url:"/business/statYield/listEnterpriseYield",method:"get",params:t})}function d(t){return Object(i["a"])({url:"/business/statUsedCarVolume/usedCarTrendChart",method:"get",params:t})}function u(t){return Object(i["a"])({url:"/business/statUsedCarVolume/companyChart",method:"get",params:t})}function p(t){return Object(i["a"])({url:"/business/statNewEnergy/salesVolume",method:"get",params:t})}function h(t){return Object(i["a"])({url:"/business/statNewEnergy/companyChart",method:"get",params:t})}function f(t){return Object(i["a"])({url:"/business/statDisplace/barChart",method:"get",params:t})}function y(t){return Object(i["a"])({url:"/business/statDisplace/vehicleFlowTo",method:"get",params:t})}},eb84:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{position:"relative"}},[a("div",{staticClass:"mainContainer",staticStyle:{margin:"0 auto"}},[a("div",{staticClass:"newsparent"},[a("div",{staticClass:"chartParent",staticStyle:{display:"flex","flex-flow":"column"}},[a("div",{staticStyle:{"border-radius":"4px",border:"1px solid #DCDFE6"}},[a("div",{staticClass:"chartTitle",staticStyle:{display:"flex","justify-content":"space-between"}},[a("span",[t._v(t._s(t.companyYear)+"新能源市场月度销量")]),a("span",{staticStyle:{"margin-right":"20px"}},[t._v("单位：辆")])]),a("v-chart",{staticClass:"chartHeight",attrs:{options:t.polarAge}})],1),a("div",{staticStyle:{"border-radius":"4px",border:"1px solid #DCDFE6","margin-top":"20px"}},[a("div",{staticClass:"chartTitle",staticStyle:{display:"flex","justify-content":"space-between"}},[a("span",[t._v(t._s(t.companyYear)+"新能源TOP10企业产量表现")]),a("span",{staticStyle:{"margin-right":"20px"}},[t._v("单位：辆")])]),a("v-chart",{staticClass:"chartHeight",attrs:{options:t.polarCompany}})],1)]),a("div",{staticClass:"baseItemWidth baseMargin",staticStyle:{"border-radius":"6px",border:"1px solid #DCDFE6"}},[a("div",{staticClass:"hotTitle",staticStyle:{width:"100%",display:"flex","justify-content":"space-between","padding-left":"16px","padding-right":"16px"}},[t._m(0),a("router-link",{attrs:{to:"/unscramble"}},[a("div",{staticClass:"cardTitleMore hotTitle"},[t._v(" 查看更多"),a("i",{staticClass:"iconfont iconxingzhuangbeifen",staticStyle:{"font-size":"12px","margin-left":"6px"}})])])],1),a("div",{staticStyle:{height:"1px",width:"100%","background-color":"#DCDFE6"}}),t._l(t.hotArray,(function(e,i){return a("div",{key:i,staticStyle:{"padding-left":"16px","padding-right":"16px"}},[a("div",{staticClass:"hotNewsTitle",staticStyle:{cursor:"pointer"},attrs:{title:e.title?e.title:""},on:{click:function(a){return t.goDetail(e.id)}}},[a("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[a("use",{attrs:{"xlink:href":"#iconcar-app-thirteen"}})]),t._v(" "+t._s(e.title?e.title:"")+" ")]),a("div",{class:{lineMargin:i==t.hotArray.size-1},staticStyle:{height:"1px",width:"100%","background-color":"#DCDFE6"}})])}))],2)])]),a("carouselBottom")],1)])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"cardTitleLine hotTitleMargin"}),a("div",{staticClass:"cardTitle hotTitle"},[t._v(" 数据解读 ")])])}],n=(a("4160"),a("b0c0"),a("159b"),a("9e90")),s=(a("3191"),a("9ca8"),a("ef97"),a("c037"),a("94b1"),a("2f73"),a("007d"),a("0dc0")),o={name:"Home",components:{carouselBottom:s["a"]},data:function(){return{hotArray:[],lastYear:"",ageYear:"",companyYear:"",daliyArray:[],polarAge:{color:["#8FB9FC","#4FD7CF","#675bba"],tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}},formatter:function(t){var e="";return t.forEach((function(t){"NaN"==t.data&&(t.data="--"),e=e+t.seriesName+":"+t.data+"<br>"})),e}},grid:{left:"3%",right:"10%",bottom:"3%",top:"3%",containLabel:!0},xAxis:{show:!0,type:"category",axisLine:{lineStyle:{color:"#D8E5EE",width:1}},axisLabel:{formatter:"{value}",show:!0,textStyle:{color:"#606266",fontSize:12}},data:[]},yAxis:[{yAxisIndex:0,show:!0,type:"value",splitLine:{lineStyle:{type:"dashed"},show:!0},axisLine:{lineStyle:{color:"#D8E5EE",width:1}},axisLabel:{show:!0,textStyle:{color:"#606266",fontSize:12}}},{yAxisIndex:1,show:!0,type:"value",splitLine:{lineStyle:{type:"dashed"},show:!1},axisLine:{lineStyle:{color:"#D8E5EE",width:1}},axisLabel:{formatter:"{value} %",show:!0,textStyle:{color:"#606266",fontSize:12}}}],series:[{barWidth:"20px",data:[],type:"bar"},{barWidth:"20px",data:[],type:"bar"},{yAxisIndex:1,data:[],type:"line"}]},polarCompany:{color:"#66B7FF",tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}},formatter:function(t){var e=t[0];return e.data[0]+"："+e.data[1]}},grid:{left:"3%",right:"10%",bottom:"3%",top:"3%",containLabel:!0},xAxis:{show:!0,type:"category",axisLine:{lineStyle:{color:"#D8E5EE",width:1}},axisTick:{alignWithLabel:!0},axisLabel:{show:!0,textStyle:{color:"#606266",fontSize:12},interval:0,rotate:30}},yAxis:{show:!0,type:"value",splitLine:{lineStyle:{type:"dashed"},show:!0},axisLine:{lineStyle:{color:"#D8E5EE",width:1}},axisLabel:{show:!0,textStyle:{color:"#606266",fontSize:12}}},series:[{barWidth:"20px",data:[],type:"bar"}]}}},created:function(){this.getInformation(),this.getStatNewEnergyMonthList(),this.getStatNewEnergyCompanyList()},mounted:function(){},computed:{},methods:{goDetail:function(t){this.$router.push({path:"/unscrambleDetail",query:{id:t,type:5}})},getInformation:function(){var t=this,e={current:1,size:10,type:5,frontOrBack:"front"};Object(n["a"])(e).then((function(e){t.hotArray=e.data.data.records}))},getStatNewEnergyMonthList:function(){var t=this;Object(n["g"])({}).then((function(e){t.ageYear=e.data.year;var a=t;e.data&&(console.log(e.data),e.data.now&&0!=e.data.now.length&&(t.companyYear=e.data.now[0].year+"年",t.polarAge.series[0].name=parseInt(e.data.now[0].year)-1+"年"+e.data.now[0].month+"月",t.polarAge.series[1].name=e.data.now[0].year+"年"+e.data.now[0].month+"月",e.data.now.forEach((function(t){a.polarAge.xAxis.data.push(t.TYPE),a.polarAge.series[1].data.push(t.SUM?t.SUM:0)})),e.data.last.forEach((function(t){a.polarAge.series[0].data.push(t.SUM?t.SUM:0)}))),t.polarAge.series[2].name="同比",e.data.yearOnYear.forEach((function(t){a.polarAge.series[2].data.push(t)})))}))},getStatNewEnergyCompanyList:function(){var t=this;Object(n["f"])({}).then((function(e){var a=[];e.data&&0!=e.data.length&&(t.companyYear=e.data[0].YEAR+"年",e.data.forEach((function(t){var e=[];e.push(t.COMPANY_NAME),e.push(t.SUM),a.push(e)})),t.polarCompany.series[0].data=a)}))}}},l=o,c=(a("3467"),a("2877")),d=Object(c["a"])(l,i,r,!1,null,"19ffb621",null);e["default"]=d.exports}}]);