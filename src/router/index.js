import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import User from '@/pages/user/User'
import video from '@/pages/video/video'
import videos from '@/pages/video/videos'
import video1 from '@/pages/video/video1'
import video2 from '@/pages/video/video2'
import video3 from '@/pages/video/video3'

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
          path: 'user',
          name: 'User',
          component: User
        },
        {
          path: 'video',
          name: 'video',
          component: video
        },
        {
          path: 'videos',
          name: 'videos',
          component: videos
        },
        {
          path: 'video1',
          name: 'video1',
          component: video1
        },
        {
          path: 'video2',
          name: 'video2',
          component: video2
        },
        {
            path: 'video3',
            name: 'video3',
            component: video3
          }
      ]
    }
  ]
})
