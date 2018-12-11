import {
  getBreadCrumbList,
  getMenuByRouter,
  setTagNavListInLocalstorage,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead
} from '@/libs/util'
import beforeClose from '@/router/before-close'
import { saveErrorLogger } from '@/api/data'
import router from '@/router'
import routers from '@/router/routers'
import config from '@/config'
import { menus, getTreePathByMenu} from '@/pages/main-page/menu'
import { getMenuByCode } from '../../pages/main-page/menu';
const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {}
    // local: localRead('local'),
    // errorList: [],
    // hasReadErrorPage: false
  },
  getters: {
    menuList: (state, getters, rootState) => {
      let res = menus
      return res;
    }
    // menuList: (state, getters, rootState) => getMenuByRouter(routers, ''),
    // menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
    // errorCount: state => state.errorList.length
  },
  mutations: {
    // setBreadCrumb (state, route) {
    //   state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    // },
    setBreadCrumb (state, breadCrumbList) {
      state.breadCrumbList = breadCrumbList
    },
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      // } else tagList = getTagNavListFromLocalstorage() || []
      } else tagList = []
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      console.log(tagList, 'tagList.....');
      // setTagNavListInLocalstorage([...tagList])
    },
    closeTag (state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      if (route.meta && route.meta.beforeCloseName && route.meta.beforeCloseName in beforeClose) {
        new Promise(beforeClose[route.meta.beforeCloseName]).then(close => {
          if (close) {
            closePage(state, route)
          }
        })
      } else {
        closePage(state, route)
      }
    },
    // addTag (state, { route, type = 'unshift' }) {
    //   let router = getRouteTitleHandled(route)
    //   if (!routeHasExist(state.tagNavList, router)) {
    //     if (type === 'push') state.tagNavList.push(router)
    //     else {
    //       if (router.name === homeName) state.tagNavList.unshift(router)
    //       else state.tagNavList.splice(1, 0, router)
    //     }
    //     // setTagNavListInLocalstorage([...state.tagNavList])
    //   }
    // }
    addTag (state, { menuItem, type = 'unshift' }) {
      if (getMenuByCode(state.tagNavList, menuItem.code) == null) {
        if (type === 'push') state.tagNavList.push(menuItem)
        else {
          if (menuItem.name === homeName) state.tagNavList.unshift(menuItem)
          else state.tagNavList.splice(1, 0, menuItem)
        }
      }
    }
    // setLocal (state, lang) {
    //   localSave('local', lang)
    //   state.local = lang
    // },
    // addError (state, error) {
    //   state.errorList.push(error)
    // },
    // setHasReadErrorLoggerStatus (state, status = true) {
    //   state.hasReadErrorPage = status
    // }
  }
  // actions: {
  //   addErrorLog ({ commit, rootState }, info) {
  //     if (!window.location.href.includes('error_logger_page')) commit('setHasReadErrorLoggerStatus', false)
  //     const { user: { token, userId, userName } } = rootState
  //     let data = {
  //       ...info,
  //       time: Date.parse(new Date()),
  //       token,
  //       userId,
  //       userName
  //     }
  //     saveErrorLogger(info).then(() => {
  //       commit('addError', data)
  //     })
  //   }
  // }
}
