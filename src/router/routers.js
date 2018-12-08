import Login from '@/pages/login/login'
import index from '@/pages/index'
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

export default [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login
  // },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/pages/login/login.vue')
  },
  {
    path: '/',
    name: 'index',
    component: index,
    children: [
      {
        path: '/user',
        name: 'User',
        component: User
      },
      {
        path: '/tableDemo',
        name: 'tableDemo',
        component: TableDemo
      },
      {
        path: '/video',
        name: 'video',
        component: video
      },
      {
        path: '/video1',
        name: 'video1',
        component: video1
      },
      {
        path: '/video2',
        name: 'video2',
        component: video2
      },
      {
        path: '/editableTable',
        name: 'editableTable',
        component: EditableTable
      },
      {
        path: '/statusTable',
        name: 'statusTable',
        component: StatusTableDemo
      },
      {
        path: '/statusTable1',
        name: 'statusTable1',
        component: StatusTableDemo1
      },
      {
        path: '/handson-table-demo',
        name: 'HandsonTableDemo',
        component: HandsonTableDemo
      }
    ]
  }
]
