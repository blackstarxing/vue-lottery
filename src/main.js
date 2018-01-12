import Vue from 'vue'
import App from './App.vue'

//用户端页面 
import index from './views/page/index.vue'
import recharge from './views/page/recharge.vue'
import withdraw from './views/page/withdraw.vue'
import leaguer from './views/page/leaguer.vue'
import information from './views/page/information.vue'

// 商户端页面
import businessrecharge from './views/businesspage/recharge.vue'
import machinerecharge from './views/businesspage/machinerecharge.vue'
import businesswithdraw from './views/businesspage/withdraw.vue'

import VueRouter from 'vue-router' 
import VueResource from 'vue-resource' 

// 注册提示框插件
import Toast from './components/toast/toast'
Vue.use(Toast) 

// 引入公共css
require('!style-loader!css-loader!less-loader!./assets/css/style.less');
// 接口地址
Vue.prototype.$api = "www.sdgsogds.com"

//注册两个插件 
Vue.use(VueResource) 
Vue.use(VueRouter)

// 设置请求头
Vue.http.options.emulateJSON = true;

const router = new VueRouter({
  // mode: 'history',
  // base: __dirname,
  routes: [
    {
      path: '/index',
      component: index,
      name:'首页'
    },
    {
      path: '/recharge',
      component: recharge,
      name:'充值'
    },
    {
      path: '/withdraw',
      component: withdraw,
      name:'提款管理'
    },
    {
      path: '/leaguer',
      component: leaguer,
      name:'VIP专区'
    },
    {
      path: '/information',
      component: information,
      name:'消息详情'
    },
    {
      path: '/businessrecharge',
      component: businessrecharge,
      name:'充值'
    },
    {
      path: '/machinerecharge',
      component: machinerecharge,
      name:'申请充值'
    },
    {
      path: '/businesswithdraw',
      component: businesswithdraw,
      name:'提现申请'
    },
    { path: '*', redirect: '/index'}
  ]
})

// 修改标签标题
router.afterEach((to, from, next) => {
  document.title = to.name;
})

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')
