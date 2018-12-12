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
    children: [{
      code: 'TableDemo',
      name: 'TableDemo',
      title: '表格组件使用demo',
      icon: 'md-person',
      path: '/tableDemo',
      treePath: 'home.demo.TableDemo'
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
      code: 'EditableTableDemo',
      name: 'EditableTableDemo',
      title: '可编辑表格demo',
      icon: 'md-person',
      path: '/editableTableDemo',
      treePath: 'home.demo.EditableTableDemo'
    },
    {
      code: 'HandsontableDemo',
      name: 'HandsontableDemo',
      title: 'handsontable演示',
      icon: 'md-person',
      path: '/handsontableDemo',
      treePath: 'home.demo.HandsontableDemo'
    }]
  }
]

export const getMenuByName = (menuList, menuName) => {
  for (let i = 0; i < menuList.length; i++) {
    if (!menuList[i].children) {
      if (menuList[i].name === menuName) {
        return menuList[i];
      } else {
        continue;
      }
    } else {
      let result = getMenuByName(menuList[i].children, menuName);
      return result;
    }
  }
  return null;
}

export const getMenuByCode = (menuList, menuCode) => {
  if (menuList.length > 0) {
    for (let i = 0; i < menuList.length; i++) {
      if (menuList[i].code === menuCode) {
        return menuList[i];
      } else if (menuList[i].children) {
        let result = getMenuByCode(menuList[i].children, menuCode);
        return result;
      } else {
        continue;
      }
    }
  }
  return null;
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
