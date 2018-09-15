// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from './axios/axios'
// import videojs from 'video.js'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'

// 组件引入
// videojs播放器
import player from '@/components/player'
// 改进的videojs播放器
import FlashPlayer from '@/components/player-with-flash'

import TableWithPage from '@/components/table-with-page/table-with-page'

Vue.config.productionTip = false

Vue.use(router)
Vue.use(iView)
Vue.use(VueVideoPlayer)

// 组件注册-全局
Vue.component('videojs-player', player)
Vue.component('videojs-player-with-flash', FlashPlayer)
Vue.component('table-with-page', TableWithPage)

// 全局注册axios
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
