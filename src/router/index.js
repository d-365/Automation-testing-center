import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const Crm = ()=> import("../views/tools/CRM")
const login = ()=> import("../views/user/login.vue")
const home =  ()=> import("../views/home.vue")
const userList = ()=> import("../views/user/userList")
const domain = ()=> import("../views/setting/domain")
const interfaceList = ()=> import("../views/interface/list")
const testCase = ()=> import("../views/interface/testCase")
const casePlan = ()=> import("../views/interface/casePlan")
const newPlan = ()=> import("../views/interface/newPlan")
const planResult = ()=> import("../views/interface/planResult")
const planReport = ()=> import("../views/interface/planReport")
const test = ()=> import("../views/test")
const loginBeautiful = () => import("../views/user/loginBeautiful")
const role = ()=> import("../views/user/role")
const pageElement = ()=> import("views/WebAuto/pageElement")
const seleniumCase = ()=>import("views/WebAuto/seleniumCase")
const seleniumPlan = ()=>import("views/WebAuto/seleniumPlan")
const seleniumResult = ()=>import("views/WebAuto/seleniumResult")
const action = ()=> import("views/system_common/action")
const webPlan = ()=> import("views/WebAuto/webPlan")
const webReport = ()=>import("views/WebAuto/webPlanReport")
const platProject = ()=>{
  return import("views/system_common/plat_project")
}
const newInterfaceInfo = ()=>import("views/newInterface/apiInfo")
const newInterfaceCase = ()=>import("views/newInterface/apiCase")
const appConfig = ()=>import("views/system_common/appConfig")
const mobilePhone = ()=> import("views/system_common/mobilePhone")
const appPage = ()=>import("views/AppAuto/appPage")
const appCase = ()=>import("views/AppAuto/appCase")
const appPlan = ()=>import("views/AppAuto/appPlan")
const appReport = ()=>import("views/AppAuto/appReport")
const appPlanDetail = ()=>import("views/AppAuto/planDetail")
const dingRobot = ()=>import("views/system_common/dingRobot")
const sms = ()=> import("../views/tools/smsCode")

const routes = [
  {
    name: "验证码处理",
    path: "/tools/code",
    component:sms,
    meta: {title: "验证码处理"}
  },
  {
    name: "钉钉机器人",
    path: "/ding/robot",
    component:dingRobot,
    meta: {title: "钉钉机器人"}
  },
  {
    name: "App计划",
    path: "/app/planDetail",
    component:appPlanDetail,
    meta: {title: "App计划"}
  },
  {
    name: "App测试计划",
    path: "/appium/plan",
    component:appPlan,
    meta: {title: "App测试计划"}
  },
  {
    name: "App测试报告",
    path: "/appium/report",
    component:appReport,
    meta: {title: "App测试报告"}
  },
  {
    name: "App用例",
    path: "/appium/case",
    component:appCase,
    meta: {title: "App用例"}
  },
  {
    name: "App元素",
    path: "/appium/page",
    component:appPage,
    meta: {title: "App元素"}
    },
  {
    name: "APP配置",
    path: "/common/appConfig",
    component:appConfig,
    meta: {title: "APP配置"}
  },
  {
    name: "执行机管理",
    path: "/common/mobilePhone",
    component:mobilePhone,
    meta: {title: "执行机管理"}
  },
  {
    name: "接口详情",
    path: "/interface/info",
    component:newInterfaceInfo,
    meta: {title: "API接口详情"}
  },
  {
    name: "API用例管理",
    path: "/interface/caseList",
    component:newInterfaceCase,
    meta: {title: "API用例管理"}
  },
  {
    name: "项目管理",
    path: "/common/projects",
    component:platProject,
    meta: {
      title: "项目管理"
    }
  },
  {
    path: "/web/report",
    name: "report",
    component:webReport,
    meta: {
      title: "web自动化执行报告"
    }
  },
  {
    path: "/case/webPlan",
    name: "webPlan",
    component:webPlan,
    meta: {
      title: "WEB测试计划"
    }
  },
  {
    path: '/common/action',
    name: 'action',
    component: action,
    meta:{
      title:"action"
    },
  },
  {
    path: '/tools/crm',
    name: 'crm',
    component: Crm,
    meta:{
      title:"crm工具"
    },
  },
  {
    path: '/user/login',
    name: 'login',
    component: login,
    meta:{
      title:"登录"
    },
  },
  {
    path:'/',
    name: '首页',
    component: home,
    meta:{
      title:"首页"
    },
  },
  {
    path: '/user/userList',
    name: "用户列表",
    component: userList,
    meta:{
      title:"用户列表"
    },
  },
  {
    path: '/setting/domain',
    name: "域名设置",
    component: domain,
    meta:{
      title:"域名设置"
    },
  },
  {
    path: '/interface/list',
    name: "接口列表",
    component: interfaceList,
    meta:{
      title:"API接口列表"
    },
  },
  {
    path: '/case/list',
    name: "用例列表",
    component: testCase,
    meta:{
      title:"API用例列表"
    },
  },
  {
    path: '/case/plan',
    name: "执行计划",
    component: casePlan,
    meta:{
      title:"API执行计划"
    },
  },
  {
    path: '/case/result',
    name: "API执行结果",
    component: planResult,
    meta:{
      title:"执行结果"
    },

  },
  {
    path: '/case/newPlan',
    name: "新增计划",
    component: newPlan,
    meta:{
      title:"新增计划"
    },
  },
  {
    path: '/plan/report',
    name: "计划运行结果详情页",
    component: planReport,
    meta:{
      title:"API报告详情"
    },
  },
  {
    path: "/test/chart",
    name: "test",
    component :test,
    meta: {
      title: "test"
    }
  },
  {
    path: "/loginPlus",
    name: "loginPlus",
    component :loginBeautiful,
    meta: {
      title: "loginPlus",
      notShowMenu: true
    }
  },
  {
    path: "/user/role",
    name: "角色管理",
    component:role,
    meta: {
      title: "角色管理"
    }
  },
  {
    path: "/selenium/page",
    name: "页面元素",
    component:pageElement,
    meta: {
      title: "WEB页面元素"
    }
  },
  {
    path: "/selenium/case",
    name: "用例管理",
    component:seleniumCase,
    meta: {
      title: "WEB用例管理"
    }
  },
  {
    path: "/selenium/plan",
    name: "测试计划",
    component:seleniumPlan,
    meta: {
      title: "WEB测试计划"
    }
  },
  {
    path: "/selenium/report",
    name: "测试结果",
    component:seleniumResult,
    meta: {
      title: "WEB测试结果"
    }
  },


]

const router = createRouter({
  // base: process.env.BASE_URL,
  // history: createWebHistory(process.env.BASE_URL),
  history:createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
router.onError(error => {
  const pattern = /Loading chunk (\w)+ failed/g
  const isError = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isError) {
    router.replace(targetPath).then()
  }
})


export default router
