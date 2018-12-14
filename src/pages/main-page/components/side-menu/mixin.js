import CommonIcon from '@/components/common-icon'
// import { showTitle } from '@/libs/util'
export default {
  components: {
    CommonIcon
  },
  methods: {
    showTitle (item) {
      // return showTitle(item, this)
      return item.title;
    },
    showChildren (item) {
      // return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
      return item.children && (item.children.length > 0)
    },
    getNameOrHref (item, children0) {
      return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)
    },
    getIcon (item) {
      return item.icon || ''
    },
    /*
     * type: 当item为侧边菜单项时，type为'menu'，当侧边菜单栏收起始type为'drop-menu'
     */
    getKey (item, type) {
      if (item.code) {
        return `${type}-${item.code}`
      }
      if (item.name) {
        return `${type}-${item.name}`
      }
      if (item.title) {
        return `${type}-${item.title}`
      }
    }
  }
}
