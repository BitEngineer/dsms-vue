import Login from '@/pages/login/login'
import Index from '@/pages/index'
import User from '@/pages/user/User'
import TableDemo from '@/pages/user/TableDemo'
import video from '@/pages/video/video'
import video1 from '@/pages/video/video1'
import video2 from '@/pages/video/video2'
import EditableTable from '@/pages/demo/EditableTable'
import StatusTableDemo from '@/pages/status-table/status-table'
import StatusTableDemo1 from '@/pages/status-table/status-table-demo'
import HandsonTableDemo from '@/pages/demo/handson-table-demo'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

// export default [
//   {
//     path: '/login',
//     name: 'login',
//     meta: {
//       title: 'Login - 登录',
//       hideInMenu: true
//     },
//     component: () => import('@/pages/login/login.vue')
//   },
//   {
//     path: '/',
//     name: '_home',
//     component: Index,
//     children: [
//       {
//         path: '/home',
//         name: 'home',
//         meta: {
//           hideInMenu: false,
//           title: '首页',
//           notCache: true,
//           icon: 'md-home'
//         },
//         component: () => import('@/pages/home/home.vue')
//       },
//       {
//         path: 'tableDemo',
//         name: 'TableDemo',
//         meta: {
//           hideInMenu: false,
//           title: '表格组件使用',
//           notCache: true,
//           icon: 'md-person'
//         },
//         component: () => import('@/pages/user/TableDemo.vue')
//       },
//       {
//         path: 'statusTableDemo',
//         name: 'StatusTableDemo',
//         meta: {
//           hideInMenu: false,
//           title: '状态表格组件使用',
//           notCache: true,
//           icon: 'md-person'
//         },
//         component: () => import('@/pages/status-table/status-table.vue')
//       },
//       {
//         path: 'statusTableDemo1',
//         name: 'StatusTableDemo1',
//         meta: {
//           hideInMenu: false,
//           title: '状态表格组件使用',
//           notCache: true,
//           icon: 'md-person'
//         },
//         component: () => import('@/pages/status-table/status-table-demo.vue')
//       }
//     ]
//   }
// ]

// export default [
//   {
//     path: '/login',
//     name: 'login',
//     meta: {
//       title: 'Login - 登录',
//       hideInMenu: true
//     },
//     component: () => import('@/pages/login/login.vue')
//   },
//   {
//     path: '/',
//     name: '_home',
//     component: Index,
//     children: [
//       {
//         path: '/home',
//         name: 'home',
//         meta: {
//           title: '首页',
//           icon: 'md-home'
//         },
//         component: () => import('@/pages/home/home.vue')
//       },
//       {
//         path: 'tableDemo',
//         name: 'TableDemo',
//         meta: {
//           title: '表格组件使用',
//           icon: 'md-person'
//         },
//         component: () => import('@/pages/user/TableDemo.vue')
//       },
//       {
//         path: 'statusTableDemo',
//         name: 'StatusTableDemo',
//         meta: {
//           title: '状态表格组件使用',
//           icon: 'md-person'
//         },
//         component: () => import('@/pages/status-table/status-table.vue')
//       },
//       {
//         path: 'statusTableDemo1',
//         name: 'StatusTableDemo1',
//         meta: {
//           title: '状态表格组件使用',
//           icon: 'md-person'
//         },
//         component: () => import('@/pages/status-table/status-table-demo.vue')
//       }
//     ]
//   }
// ]

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    component: Index,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: () => import('@/pages/home/home.vue')
      },
      {
        path: 'tableDemo',
        name: 'TableDemo',
        meta: {
          title: '分页表格demo'
        },
        component: () => import('@/pages/user/TableDemo.vue')
      },
      {
        path: 'statusTableDemo',
        name: 'StatusTableDemo',
        meta: {
          title: '状态表demo'
        },
        component: () => import('@/pages/status-table/status-table.vue')
      },
      {
        path: 'statusTableDemo1',
        name: 'StatusTableDemo1',
        meta: {
          title: '状态表demo1'
        },
        component: () => import('@/pages/status-table/status-table-demo.vue')
      }
    ]
  }
]
