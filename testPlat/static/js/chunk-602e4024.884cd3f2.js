(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-602e4024"],{1560:function(e,t,n){},"2f3b":function(e,t,n){"use strict";n("3721")},3721:function(e,t,n){},"397e":function(e,t,n){"use strict";var c=n("b775");function o(e,t){c["a"].post("/api/prt/update",e).then((function(e){t(e)}))}function l(e,t){c["a"].get("/api/prt/list",{params:t}).then((function(t){e(t)}))}function r(e,t){c["a"].delete("/api/prt/delete/"+e).then((function(e){t(e)}))}function a(e){c["a"].get("/api/env/list").then((function(t){e(t)}))}function u(e,t){c["a"].post("/api/prt/domain/update",e).then((function(e){t(e)}))}function i(e,t){c["a"].delete("/api/prt/domain/del/"+e).then((function(e){t(e)}))}function d(e,t){c["a"].get("/api/mobilePhone/list",{params:t}).then((function(t){e(t)}))}function b(e,t){c["a"].get("/api/appConfig/list",{params:t}).then((function(t){e(t)}))}function j(e,t){c["a"].delete("/api/appConfig/del/"+t).then((function(t){return e(t)}))}function O(e,t){c["a"].post("/api/appConfig/update",t).then((function(t){e(t)}))}function f(e,t){c["a"].get("/api/dingRobot/list",{params:t}).then((function(t){return e(t)}))}function p(e,t){c["a"].post("/api/dingRobot/update",t).then((function(t){return e(t)}))}function s(e,t){c["a"].delete("/api/dingRobot/delete/"+t).then((function(t){return e(t)}))}t["a"]={addPrt:o,prtList:l,delPrt:r,envList:a,updatePrtDomain:u,delPrtDomain:i,mobilePhoneList:d,appConfigList:b,delAppConfig:j,updateAppConfig:O,dingRobotList:f,updateRobot:p,delRobot:s}},"7eed":function(e,t,n){"use strict";var c=n("7a23"),o=function(e){return Object(c["pushScopeId"])("data-v-1d448798"),e=e(),Object(c["popScopeId"])(),e},l={id:"layout-one"},r={id:"layout-describe"},a=o((function(){return Object(c["createElementVNode"])("div",null,"描述",-1)})),u=Object(c["createTextVNode"])("添加"),i={id:"layout-fun"},d={class:"fun-item"},b=Object(c["createTextVNode"])(" 项目名称:   "),j={class:"fun-item"},O=Object(c["createTextVNode"])("查询"),f={class:"fun-item"},p=Object(c["createTextVNode"])("重置"),s={id:"layout-list"},m=Object(c["createTextVNode"])(" 列表区域 "),V={id:"layout-pag"},v=Object(c["createTextVNode"])("分页");function h(e,t){var n=Object(c["resolveComponent"])("el-col"),o=Object(c["resolveComponent"])("el-button"),h=Object(c["resolveComponent"])("el-divider"),N=Object(c["resolveComponent"])("el-row"),C=Object(c["resolveComponent"])("el-input");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",l,[Object(c["createElementVNode"])("div",r,[Object(c["createVNode"])(N,{gutter:3},{default:Object(c["withCtx"])((function(){return[Object(c["renderSlot"])(e.$slots,"title",{},(function(){return[Object(c["createVNode"])(n,{span:22},{default:Object(c["withCtx"])((function(){return[a]})),_:1}),Object(c["createVNode"])(n,{span:2},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(o,{type:"primary"},{default:Object(c["withCtx"])((function(){return[u]})),_:1})]})),_:1})]}),!0),Object(c["createVNode"])(n,{span:24},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(h)]})),_:1})]})),_:3})]),Object(c["createElementVNode"])("div",i,[Object(c["renderSlot"])(e.$slots,"fun",{},(function(){return[Object(c["createVNode"])(N,{gutter:3},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(n,{span:5},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",d,[b,Object(c["createVNode"])(C,{style:{width:"200px"},modelValue:e.filterAccount,"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.filterAccount=t}),placeholder:"Please input"},null,8,["modelValue"])])]})),_:1}),Object(c["createVNode"])(n,{span:1},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",j,[Object(c["createVNode"])(o,{type:"primary"},{default:Object(c["withCtx"])((function(){return[O]})),_:1})])]})),_:1}),Object(c["createVNode"])(n,{span:1},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",f,[Object(c["createVNode"])(o,{type:"warning",onClick:t[1]||(t[1]=function(){})},{default:Object(c["withCtx"])((function(){return[p]})),_:1})])]})),_:1})]})),_:1})]}),!0)]),Object(c["createElementVNode"])("div",s,[Object(c["renderSlot"])(e.$slots,"list",{},(function(){return[m]}),!0)]),Object(c["createElementVNode"])("div",V,[Object(c["renderSlot"])(e.$slots,"page",{},(function(){return[v]}),!0)])])}n("db6c");var N=n("d959"),C=n.n(N);const x={},w=C()(x,[["render",h],["__scopeId","data-v-1d448798"]]);t["a"]=w},9010:function(e,t,n){"use strict";n.r(t);n("b0c0");var c=n("7a23"),o=n("7eed"),l=n("062e"),r=n("397e"),a=n("2a40"),u=function(e){return Object(c["pushScopeId"])("data-v-58bc712a"),e=e(),Object(c["popScopeId"])(),e},i=u((function(){return Object(c["createElementVNode"])("div",null,"钉钉机器人",-1)})),d=Object(c["createTextVNode"])("添加机器人"),b={class:"fun-item"},j=Object(c["createTextVNode"])(" 机器人名称:   "),O={class:"fun-item"},f=Object(c["createTextVNode"])(" 机器人状态:   "),p={class:"fun-item"},s=Object(c["createTextVNode"])("查询"),m={class:"fun-item"},V=Object(c["createTextVNode"])("重置"),v={key:0,id:"robotList"},h={class:"card-header"},N={key:0,style:{color:"#67C23A"}},C={key:1,style:{color:"#F56C6C"}},x={style:{"text-overflow":"ellipsis",overflow:"hidden"}},w={class:"robot-item",style:{"white-space":"nowrap","text-overflow":"ellipsis"}},g={style:{color:"#409EFF"}},y={key:0},_={key:1},k={id:"robotList-data-bottom"},E=Object(c["createTextVNode"])("编辑"),B=Object(c["createTextVNode"])("删除"),T={class:"hidden"},P={class:"dialog-footer"},S=Object(c["createTextVNode"])("取消"),L=Object(c["createTextVNode"])("保存"),A={setup:function(e){var t=Object(c["reactive"])([{text:"启用",value:0},{text:"禁用",value:1}]),n=Object(c["ref"])(null),u=Object(c["ref"])(""),A=Object(c["ref"])([]),R=function(){var e={pageSize:q.value,current:G.value};""!==u.value&&(e["name"]=u.value),null!=n.value&&(e["status"]=n.value),r["a"].dingRobotList((function(e){A.value=e.data.records,M.value=e.data.total}),e)},U=function(e){a["a"].messageBox(r["a"].delRobot((function(e){R()}),e))},F=Object(c["reactive"])([{text:"测试计划执行前",value:0},{text:"测试计划执行后",value:1}]),D=Object(c["ref"])(!1),I=Object(c["reactive"])({id:null,name:null,status:null,robotType:null,atPhone:null,robotAddress:null,type:null}),$=function(){I["id"]=null,I["name"]=null,I["status"]=null,I["robotType"]=null,I["atPhone"]=null,I["robotAddress"]=null,I["type"]=null,D.value=!0},z=function(e){I["id"]=e["id"],I["name"]=e["name"],I["status"]=e["status"],I["robotType"]=e["robotType"],I["atPhone"]=e["atPhone"],I["robotAddress"]=e["robotAddress"],I["type"]=e["type"],D.value=!0},J=function(e){r["a"].updateRobot((function(e){a["a"].toast(e),D.value=!1,R()}),e)},M=Object(c["ref"])(0),q=Object(c["ref"])(10),G=Object(c["ref"])(1),H=function(e){G.value=e,R()};return Object(c["onBeforeMount"])((function(){R()})),function(e,r){var a=Object(c["resolveComponent"])("el-col"),R=Object(c["resolveComponent"])("el-button"),G=Object(c["resolveComponent"])("el-input"),K=Object(c["resolveComponent"])("el-option"),Q=Object(c["resolveComponent"])("el-select"),W=Object(c["resolveComponent"])("el-row"),X=Object(c["resolveComponent"])("el-descriptions-item"),Y=Object(c["resolveComponent"])("el-popover"),Z=Object(c["resolveComponent"])("el-descriptions"),ee=Object(c["resolveComponent"])("el-divider"),te=Object(c["resolveComponent"])("el-card"),ne=Object(c["resolveComponent"])("el-form-item"),ce=Object(c["resolveComponent"])("el-form"),oe=Object(c["resolveComponent"])("el-dialog");return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[Object(c["createVNode"])(Object(c["unref"])(o["a"]),null,{title:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(a,{span:22},{default:Object(c["withCtx"])((function(){return[i]})),_:1}),Object(c["createVNode"])(a,{span:2},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(R,{type:"primary",onClick:$},{default:Object(c["withCtx"])((function(){return[d]})),_:1})]})),_:1})]})),fun:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",null,[Object(c["createVNode"])(W,{gutter:4},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(a,{span:6},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",b,[j,Object(c["createVNode"])(G,{modelValue:u.value,"onUpdate:modelValue":r[0]||(r[0]=function(e){return u.value=e}),style:{width:"200px"},placeholder:"请输入机器人名称"},null,8,["modelValue"])])]})),_:1}),Object(c["createVNode"])(a,{span:6},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",O,[f,Object(c["createVNode"])(Q,{modelValue:n.value,"onUpdate:modelValue":r[1]||(r[1]=function(e){return n.value=e})},{default:Object(c["withCtx"])((function(){return[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(Object(c["unref"])(t),(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])(K,{label:e.text,key:e.value,value:e.value},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])])]})),_:1}),Object(c["createVNode"])(a,{span:2},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",p,[Object(c["createVNode"])(R,{type:"primary",onClick:r[2]||(r[2]=function(t){return e.queryMobilePhone()})},{default:Object(c["withCtx"])((function(){return[s]})),_:1})])]})),_:1}),Object(c["createVNode"])(a,{span:2},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",m,[Object(c["createVNode"])(R,{type:"warning",onClick:r[3]||(r[3]=function(t){return e.mobilePhoneListInit()})},{default:Object(c["withCtx"])((function(){return[V]})),_:1})])]})),_:1})]})),_:1})])]})),list:Object(c["withCtx"])((function(){return[A.value.value!==[]?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",v,[Object(c["createVNode"])(W,{gutter:20},{default:Object(c["withCtx"])((function(){return[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(A.value,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])(a,{span:8,id:"robotList-data"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(te,{class:"box-card"},{header:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",h,[0===e.status?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",N,"启用")):Object(c["createCommentVNode"])("",!0),1===e.status?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",C,"禁用")):Object(c["createCommentVNode"])("",!0)])]})),default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",null,[Object(c["createVNode"])(Z,{column:1,border:""},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(X,{label:"机器人编号","label-align":"left",align:"left",width:"150px"},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e.id),1)]})),_:2},1024),Object(c["createVNode"])(X,{label:"机器人名字","label-align":"left",align:"left",width:"150px"},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e.name),1)]})),_:2},1024),Object(c["createVNode"])(X,{label:"@","label-align":"left",align:"left"},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("span",x,Object(c["toDisplayString"])(e.atPhone),1)]})),_:2},1024),Object(c["createVNode"])(X,{label:"机器人地址","label-align":"left",align:"left"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(Y,{placement:"top-start",width:400,trigger:"hover"},{reference:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",w,Object(c["toDisplayString"])(e.robotAddress),1)]})),default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("span",g,Object(c["toDisplayString"])(e.robotAddress),1)]})),_:2},1024)]})),_:2},1024),Object(c["createVNode"])(X,{label:"机器人执行时机","label-align":"left",align:"left"},{default:Object(c["withCtx"])((function(){return[0===e.robotType?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",y,"测试计划执行前")):Object(c["createCommentVNode"])("",!0),1===e.robotType?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",_,"测试计划执行后")):Object(c["createCommentVNode"])("",!0)]})),_:2},1024)]})),_:2},1024)]),Object(c["createVNode"])(ee),Object(c["createElementVNode"])("div",k,[Object(c["createVNode"])(R,{type:"primary",onClick:function(t){return z(e)}},{default:Object(c["withCtx"])((function(){return[E]})),_:2},1032,["onClick"]),Object(c["createVNode"])(R,{type:"primary",onClick:function(t){return U(e.id)}},{default:Object(c["withCtx"])((function(){return[B]})),_:2},1032,["onClick"])])]})),_:2},1024)]})),_:2},1024)})),256))]})),_:1})])):Object(c["createCommentVNode"])("",!0)]})),page:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",null,[Object(c["createVNode"])(Object(c["unref"])(l["a"]),{total:M.value,pageSize:q.value,onPaging:H},null,8,["total","pageSize"])])]})),_:1}),Object(c["createElementVNode"])("div",T,[Object(c["createVNode"])(oe,{modelValue:Object(c["unref"])(D),"onUpdate:modelValue":r[11]||(r[11]=function(e){return Object(c["isRef"])(D)?D.value=e:D=e}),title:"机器人配置",width:"30%"},{footer:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("span",P,[Object(c["createVNode"])(R,{onClick:r[9]||(r[9]=function(e){return Object(c["isRef"])(D)?D.value=!1:D=!1})},{default:Object(c["withCtx"])((function(){return[S]})),_:1}),Object(c["createVNode"])(R,{type:"primary",onClick:r[10]||(r[10]=function(e){return J(Object(c["unref"])(I))})},{default:Object(c["withCtx"])((function(){return[L]})),_:1})])]})),default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(ce,{model:Object(c["unref"])(I),"label-width":"120px"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(ne,{label:"机器人名称"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(G,{placeholder:"机器人名称",modelValue:Object(c["unref"])(I).name,"onUpdate:modelValue":r[4]||(r[4]=function(e){return Object(c["unref"])(I).name=e})},null,8,["modelValue"])]})),_:1}),Object(c["createVNode"])(ne,{label:"需要@的人"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(G,{placeholder:"需要@的人",modelValue:Object(c["unref"])(I).atPhone,"onUpdate:modelValue":r[5]||(r[5]=function(e){return Object(c["unref"])(I).atPhone=e})},null,8,["modelValue"])]})),_:1}),Object(c["createVNode"])(ne,{label:"机器人地址"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(G,{placeholder:"机器人地址",modelValue:Object(c["unref"])(I).robotAddress,"onUpdate:modelValue":r[6]||(r[6]=function(e){return Object(c["unref"])(I).robotAddress=e})},null,8,["modelValue"])]})),_:1}),Object(c["createVNode"])(ne,{label:"状态"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(Q,{modelValue:Object(c["unref"])(I).status,"onUpdate:modelValue":r[7]||(r[7]=function(e){return Object(c["unref"])(I).status=e})},{default:Object(c["withCtx"])((function(){return[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(Object(c["unref"])(t),(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])(K,{label:e.text,value:e.value},null,8,["label","value"])})),256))]})),_:1},8,["modelValue"])]})),_:1}),Object(c["createVNode"])(ne,{label:"执行时机"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(Q,{modelValue:Object(c["unref"])(I).robotType,"onUpdate:modelValue":r[8]||(r[8]=function(e){return Object(c["unref"])(I).robotType=e})},{default:Object(c["withCtx"])((function(){return[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(Object(c["unref"])(F),(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])(K,{label:e.text,value:e.value},null,8,["label","value"])})),256))]})),_:1},8,["modelValue"])]})),_:1})]})),_:1},8,["model"])]})),_:1},8,["modelValue"])])],64)}}},R=(n("2f3b"),n("d959")),U=n.n(R);const F=U()(A,[["__scopeId","data-v-58bc712a"]]);t["default"]=F},db6c:function(e,t,n){"use strict";n("1560")}}]);
//# sourceMappingURL=chunk-602e4024.884cd3f2.js.map