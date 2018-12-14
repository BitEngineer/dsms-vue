// export const menus = [
//   {
//     name: 'home',
//     icon: 'md-home',
//     meta: {
//       hideInMenu: true,
//       title: '首页',
//       notCache: true,
//       icon: 'md-home'
//     }
//   },
//   {
//     name: 'Demo',
//     icon: 'logo-buffer',
//     meta: {
//       showAlways: true,
//       icon: 'logo-buffer',
//       title: '组件使用demo'
//     },
//     children: [{
//       name: 'TableDemo',
//       icon: 'md-person',
//       meta: {
//         hideInMenu: false,
//         title: '表格组件使用',
//         notCache: true,
//         icon: 'md-person'
//       }
//     },
//     {
//       name: 'StatusTableDemo',
//       icon: 'md-person',
//       meta: {
//         hideInMenu: false,
//         title: '状态表格组件使用',
//         notCache: true,
//         icon: 'md-person'
//       }
//     },
//     {
//       name: 'StatusTableDemo1',
//       icon: 'md-person',
//       meta: {
//         hideInMenu: false,
//         title: '状态表格组件使用1',
//         notCache: true,
//         icon: 'md-person'
//       }
//     }]
//   }
// ]

// 说明：第一层菜单必须有icon，否则侧边栏收起时无法显示该菜单项
export const menus = [
  {
    code: 'home',
    name: 'home',
    title: '首页',
    icon: 'md-home',
    path: '/home',
    treePath: 'home'
  },
  {
    code: 'demo',
    name: 'demo',
    title: '组件使用demo',
    icon: 'logo-buffer',
    treePath: 'home.demo',
    children: [
      {
        code: 'IviewCompDemo',
        name: 'IviewCompDemo',
        title: '基于iview的组件',
        icon: 'md-person',
        treePath: 'home.demo.IviewCompDemo',
        children: [
          {
            code: 'TableDemo',
            name: 'TableDemo',
            title: '表格组件使用demo',
            icon: 'md-person',
            path: '/tableDemo',
            treePath: 'home.demo.IviewCompDemo.TableDemo'
          },
          {
            code: 'IviewCusCompDemo',
            name: 'IviewCusCompDemo',
            title: '基于iview的自定义组件',
            icon: '',
            treePath: 'home.demo.IviewCompDemo.IviewCusCompDemo',
            children: [
              {
                code: 'EditableTableDemo',
                name: 'EditableTableDemo',
                title: '自定义可编辑表格',
                icon: '',
                path: '/editableTableDemo',
                treePath: 'home.demo.IviewCompDemo.IviewCusCompDemo.EditableTableDemo'
              }
            ]
          }
        ]
      },
      {
        code: 'StatusTableDemo',
        name: 'StatusTableDemo',
        title: '状态表格组件使用',
        icon: 'md-person',
        path: '/statusTableDemo',
        treePath: 'home.demo.StatusTableDemo'
      },
      {
        code: 'StatusTableDemo1',
        name: 'StatusTableDemo1',
        title: '状态表格组件使用1',
        icon: 'md-person',
        path: '/statusTableDemo1',
        treePath: 'home.demo.StatusTableDemo1'
      },
      {
        code: 'HandsontableDemo',
        name: 'HandsontableDemo',
        title: 'handsontable演示',
        icon: 'md-person',
        path: '/handsontableDemo',
        treePath: 'home.demo.HandsontableDemo'
      }
    ]
  }
]

export const getMenuByCode = (menuList, menuCode) => {
  if (menuList.length > 0) {
    for (let i = 0; i < menuList.length; i++) {
      if (menuList[i].code === menuCode) {
        return menuList[i];
      } else if (menuList[i].children && menuList[i].children.length > 0) {
        let result = getMenuByCode(menuList[i].children, menuCode);
        if (result != null || i === (menuList.length - 1)) {
          return result
        }
      } else {
        if (i === (menuList.length - 1)) {
          return null
        }
      }
    }
  }
  return null
}

export const getTreePathByMenu = (menuList, menuCode) => {
  let targetMenu = getMenuByCode(menuList, menuCode);
  // 分离treepath
  let treePathArr = targetMenu.treePath.split('.');

  let result = [];
  treePathArr.forEach(item => {
    result.push(getMenuByCode(menuList, item));
  });
  return result;
}

export const getBreadCrumbListByMenu = (menuList, menuCode) => {
  let targetMenu = getMenuByCode(menuList, menuCode);
  // 分离treepath
  let treePathArr = targetMenu.treePath.split('.');

  let result = [];
  treePathArr.forEach(item => {
    let targetMenu = getMenuByCode(menuList, item);
    result.push({
      name: targetMenu.name,
      title: targetMenu.title,
      icon: targetMenu.icon,
      to: targetMenu.path ? targetMenu.code : null
    });
  });
  return result;
}
