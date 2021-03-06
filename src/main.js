// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from './axios/axios'
import videojs from 'video.js'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'

// 组件引入
import player from "@/components/player"

Vue.config.productionTip = false

Vue.use(router)
Vue.use(iView)
Vue.use(VueVideoPlayer)

// 组件注册-全局
Vue.component("videojs-player", player);

// 全局注册axios
Vue.prototype.$axios = axios;

// 全局配置-iview
Vue.prototype.$Message.config({
    duration: 2
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
