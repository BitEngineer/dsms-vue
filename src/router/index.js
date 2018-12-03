import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import User from '@/pages/user/User'
import TableDemo from '@/pages/user/TableDemo'
import video from '@/pages/video/video'
import video1 from '@/pages/video/video1'
import video2 from '@/pages/video/video2'
import EditableTable from '@/pages/demo/EditableTable'
import StatusTableDemo from '@/pages/status-table/status-table-demo'
import HandsonTableDemo from '@/pages/demo/handson-table-demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
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
          path: '/handson-table-demo',
          name: 'HandsonTableDemo',
          component: HandsonTableDemo
        },
      ]
    }
  ]
})
