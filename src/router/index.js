// import Vue from 'vue'
// import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import index from '@/pages/index'
// import User from '@/pages/user/User'
// import TableDemo from '@/pages/user/TableDemo'
// import video from '@/pages/video/video'
// import video1 from '@/pages/video/video1'
// import video2 from '@/pages/video/video2'
// import EditableTable from '@/pages/demo/EditableTable'
// import StatusTableDemo from '@/pages/status-table/status-table'
// import StatusTableDemo1 from '@/pages/status-table/status-table-demo'
// import HandsonTableDemo from '@/pages/demo/handson-table-demo'
// export default new Router({
//   routes: [
//     {
//       path: '/hello',
//       name: 'HelloWorld',
//       component: HelloWorld
//     },
//     {
//       path: '/',
//       name: 'index',
//       component: index,
//       children: [
//         {
//           path: '/user',
//           name: 'User',
//           component: User
//         },
//         {
//           path: '/tableDemo',
//           name: 'tableDemo',
//           component: TableDemo
//         },
//         {
//           path: '/video',
//           name: 'video',
//           component: video
//         },
//         {
//           path: '/video1',
//           name: 'video1',
//           component: video1
//         },
//         {
//           path: '/video2',
//           name: 'video2',
//           component: video2
//         },
//         {
//           path: '/editableTable',
//           name: 'editableTable',
//           component: EditableTable
//         },
//         {
//           path: '/statusTable',
//           name: 'statusTable',
//           component: StatusTableDemo
//         },
//         {
//           path: '/statusTable1',
//           name: 'statusTable1',
//           component: StatusTableDemo1
//         },
//         {
//           path: '/handson-table-demo',
//           name: 'HandsonTableDemo',
//           component: HandsonTableDemo
//         },
//       ]
//     }
//   ]
// })

import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { setToken, getToken, canTurnTo } from '@/libs/util'
import config from '@/config'
const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      store.dispatch('getUserInfo').then(user => {
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        turnTo(to, user.access, next)
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
