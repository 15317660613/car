(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-331ff383"],{"45a8":function(e,t,i){"use strict";var r=i("bf1d"),a=i.n(r);a.a},"4db7":function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container"},[i("el-breadcrumb",{staticClass:"headerTitle",attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/assignment"}}},[e._v("任务平台")]),i("el-breadcrumb-item",[e._v("发布任务")])],1),i("div",{staticClass:"content"},[i("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[i("div",{staticStyle:{display:"inline-flex","justify-content":"space-between",width:"100%"}},[i("el-form-item",{staticClass:"nameLabel",attrs:{label:"任务名称",prop:"title"}},[i("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),i("el-form-item",{staticStyle:{width:"224px"},attrs:{label:"截止时间",prop:"deadlinetime"}},[i("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH",placeholder:"选择时间"},model:{value:e.form.deadlinetime,callback:function(t){e.$set(e.form,"deadlinetime",t)},expression:"form.deadlinetime"}})],1),i("el-form-item",{staticStyle:{width:"224px"},attrs:{label:"赏金",prop:"reward"}},[i("el-input",{model:{value:e.form.reward,callback:function(t){e.$set(e.form,"reward",t)},expression:"form.reward"}})],1)],1),i("el-form-item",{attrs:{prop:"details"}},[i("quill-editor",{ref:"myQuillEditor",attrs:{options:e.editorOption},on:{blur:function(t){return e.onEditorBlur(t)},focus:function(t){return e.onEditorFocus(t)},change:function(t){return e.onEditorChange(t)}},model:{value:e.form.details,callback:function(t){e.$set(e.form,"details",t)},expression:"form.details"}})],1),i("el-form-item",{staticStyle:{width:"486px"}},[i("el-upload",{staticClass:"upload-demo",attrs:{action:"/api/upload","on-preview":e.handlePreview,"on-success":e.uploadSuccess}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v("添加附件")])],1)],1)],1),i("div",{staticStyle:{width:"100%","padding-top":"40px","text-align":"center"}},[i("el-button",{staticClass:"dev-button",on:{click:e.handleCreate}},[e._v("发布任务")])],1)],1)],1)},a=[],o=i("b775");function s(e){return Object(o["a"])({url:"/sys/task/add/richtxt/",method:"post",data:e})}var l=i("cf45"),n={name:"AssignmentDetail",filters:{statusFilter:function(e){var t={0:"任务中",1:"已完成"};return t[e]}},data:function(){return{fileList:[],editorOption:{placeholder:"请输入任务详情",modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{color:[]},{background:[]}],[{font:["Microsoft-YaHei","SimSun","SimHei","KaiTi","Arial","sans-serif"]}],[{align:[]}],["clean"],["link","image"]]}},copyQuery:{page:1,pageSize:10},total:0,rules:{title:[{required:!0,message:"任务名称不能为空",trigger:"blur"}],deadlinetime:[{required:!0,message:"截止时间不能为空",trigger:"blur"}],details:[{required:!0,message:"任务详情不能为空",trigger:"blur"}],reward:[{required:!0,message:"赏金不能为空",trigger:"blur"}]},form:{title:"",deadlinetime:"",details:"",fileIdList:[]},honourList:[{id:1,color:"#FBCA03",userName:"创始人",taskNum:"15"},{id:2,color:"#ABC5E2",userName:"quyueming",taskNum:"9"}]}},created:function(){},methods:{onEditorReady:function(){},onEditorBlur:function(){},onEditorFocus:function(){},onEditorChange:function(){},handleCreate:function(){var e=this;this.$refs.form.validate((function(t){if(!t)return console.log("error submit!!"),!1;var i=Object(l["a"])(e.form);i.deadlinetime=i.deadlinetime+":00:00",e.loading=!0,s(i).then((function(t){e.$message({message:"发布成功等待审批！",type:"success",duration:2e3,onClose:function(){e.$router.push({name:"createSuccess"})}})}))}))},uploadSuccess:function(e,t,i){if(e.ok){for(var r=[],a=0;a<i.length;a++)r.push(i[a].response.data.id);this.form.fileIdList=r,this.$forceUpdate()}else this.form.fileIdList=[],this.$forceUpdate(),this.$message.error(e.message)}}},d=n,u=(i("45a8"),i("2877")),c=Object(u["a"])(d,r,a,!1,null,"ce873454",null);t["default"]=c.exports},bf1d:function(e,t,i){}}]);