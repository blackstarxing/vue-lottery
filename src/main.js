import Vue from 'vue'
import App from './App.vue'
import index from './views/page/index.vue'
import my from './views/page/my.vue'
import recharge from './views/page/recharge.vue'
import withdraw from './views/page/withdraw.vue'
import leaguer from './views/page/leaguer.vue'

import VueRouter from 'vue-router' 
import VueResource from 'vue-resource' 

// 引入公共css
require('!style-loader!css-loader!less-loader!./assets/css/style.less');
// 接口地址
Vue.prototype.API = "www.sdgsogds.com"

//注册两个插件 
Vue.use(VueResource) 
Vue.use(VueRouter)

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
      path: '/my',
      component: my,
      name:'我的'
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
