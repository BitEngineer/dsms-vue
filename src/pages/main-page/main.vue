<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu accordion ref="sideMenu" :active-name="activeMenuName" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <!-- <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div> -->
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" showBreadCrumb :breadCrumbList='breadCrumbList' @on-coll-change="handleCollapsedChange">
          <!-- <user :message-unread-count="messageUnreadCount" :user-avator="userAvator"/>
          <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/>
          <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store>
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/> -->
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <!-- <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/> -->
            <tags-nav :value="currentTag" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
// import Fullscreen from './components/fullscreen'
// import User from './components/user'
// import Language from './components/language'
// import ErrorStore from './components/error-store'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getNewTagList, getNextRoute, routeEqual } from '@/libs/util'
import { getTreePathByMenu, getBreadCrumbListByMenu, getMenuByCode } from './menu'
import routers from '@/router/routers'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
import './main.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    TagsNav,
    // Fullscreen,
    // Language,
    // ErrorStore,
    // User
  },
  data () {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false,
      activeMenuName: this.$route.name,
      currentTag: {}
    }
  },
  computed: {
    ...mapGetters([
      // 'errorCount',
      // 'messageUnreadCount'
    ]),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    // tagRouter () {
    //   return this.$store.state.app.tagRouter
    //   // return this.$store.state.app.homeRoute
    // },
    cacheList () {
      return ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
    },
    menuList () {
      return this.$store.getters.menuList
    },
    breadCrumbList() {
      return this.$store.state.app.breadCrumbList
    }
    // userAvator () {
    //   return this.$store.state.user.avatorImgPath
    // },
    // local () {
    //   return this.$store.state.app.local
    // },
    // hasReadErrorPage () {
    //   return this.$store.state.app.hasReadErrorPage
    // }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      // 'setLocal',
      'setHomeRoute'
    ]),
    ...mapActions([
      // 'handleLogin'
    ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })

      // 当前活动菜单
      this.activeMenuName = route.name ? route.name : route;

      // 设置面包屑导航
      let breadcrumbList = getBreadCrumbListByMenu(this.menuList, this.activeMenuName);
      this.setBreadCrumb(breadcrumbList);

      // 设置标签导航
      // this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      let activeMenu = getMenuByCode(this.menuList, this.activeMenuName)
      this.addTag({menuItem: activeMenu, type: 'unshift'});
      // 设置当前标签
      this.currentTag = activeMenu
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    // handleCloseTag (res, type, route) {
    //   if (type === 'all') {
    //     this.turnToPage(this.$config.homeName)
    //   } else if (routeEqual(this.$route, route)) {
    //     if (type !== 'others') {
    //       const nextRoute = getNextRoute(this.tagNavList, route)
    //       this.$router.push(nextRoute)
    //     }
    //   }
    //   this.setTagNavList(res)
    // },
    handleCloseTag (tags, type, closingTag) {
      if(type === 'all') {
        // 路由跳转
        this.$router.push(this.$config.homeName)
        // 当前活动菜单
        this.activeMenuName = this.$config.homeName
        // 设置面包屑导航
        let breadcrumbList = getBreadCrumbListByMenu(this.menuList, this.$config.homeName)
        this.setBreadCrumb(breadcrumbList);
        // 设置标签导航
        this.setTagNavList(tags);
        this.currentTag = getMenuByCode(tags, this.$config.homeName)
      } else if(type === 'others') {
        this.setTagNavList(tags)
      } else {
        // 下一个当前tag
        let nextTag = {}
        if(this.currentTag.name === closingTag.name) {
          let i = this.tagNavList.indexOf(closingTag)
          nextTag = this.tagNavList[i-1]
        }else{
          nextTag = this.currentTag
        }
        
        // 路由跳转
        this.$router.push(nextTag.name)
        // 当前活动菜单
        this.activeMenuName = nextTag.name
        // 设置面包屑导航
        let breadcrumbList = getBreadCrumbListByMenu(this.menuList, nextTag.name)
        this.setBreadCrumb(breadcrumbList)
        // 设置标签导航
        this.setTagNavList(tags);
        this.currentTag = nextTag
      }
    },
    handleClick (item) {
      this.currentTag = item
      this.turnToPage(item)
    },
  },
  watch: {
    // '$route' (newRoute) {
    //   const { name, query, params, meta } = newRoute
    //   this.addTag({
    //     route: { name, query, params, meta },
    //     type: 'push'
    //   })
    // this.setBreadCrumb(newRoute)
    //   this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
    // this.$refs.sideMenu.updateOpenName(newRoute.name)
    // },
  },
  mounted () {
    // 设置标签导航
    // this.setTagNavList()
    // this.setHomeRoute(routers)
    // this.addTag({
    //   route: this.$store.state.app.homeRoute
    // })

    // 设置标签导航
    this.setTagNavList()
    // 默认将配置的首页放入
    let homeMenu = getMenuByCode(this.menuList, 'home');
    this.addTag({menuItem: homeMenu, type: 'unshift'});
    this.currentTag = homeMenu;

    // 设置面包屑导航
    this.setBreadCrumb(getBreadCrumbListByMenu(this.menuList, 'home'))
    // this.setBreadCrumb(this.$route)

    // 设置初始语言
    // this.setLocal(this.$i18n.locale)

    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
  }
}
</script>
