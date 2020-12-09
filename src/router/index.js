import Vue from "vue";
import Router from "vue-router";

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    name: "Dashboard",
    hidden: true,
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index")
      }
    ]
  },

  {
    path: "/example",
    component: Layout,
    redirect: "/example/table",
    name: "Example",
    meta: { title: "Example", icon: "example" },
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/table/index"),
        meta: { title: "Table", icon: "table" }
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/tree/index"),
        meta: { title: "Tree", icon: "tree" }
      }
    ]
  },

  {
    path: "/form",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/index"),
        meta: { title: "Form", icon: "form" }
      }
    ]
  },
  {
    path: "/hall",
    component: Layout,
    redirect: "/hall/list",
    name: "电影展厅管理",
    meta: { title: "电影展厅管理", icon: "example" },
    children: [
      {
        path: "list",
        name: "展厅列表",
        component: () => import("@/views/movie/hall/list"),
        meta: { title: "展厅列表", icon: "table" }
      },
      {
        path: "create",
        name: "创建展厅",
        component: () => import("@/views/movie/hall/create"),
        meta: { title: "创建展厅", icon: "tree" }
      }
    ]
  },

  {
    path: "/subject",
    component: Layout,
    redirect: "/subject/list",
    name: "电影类别管理",
    meta: { title: "电影类别管理", icon: "example" },
    children: [
      {
        path: "list",
        name: "电影类别列表",
        component: () => import("@/views/movie/subject/list"),
        meta: { title: "电影类别列表", icon: "table" }
      },
      {
        path: "create",
        name: "创建电影类别",
        component: () => import("@/views/movie/subject/create"),
        meta: { title: "创建电影类别", icon: "tree" }
      }
    ]
  },

  {
    path: "/movie/manager",
    component: Layout,
    redirect: "/movie/manager/list",
    name: "电影发布管理",
    meta: { title: "电影发布管理", icon: "example" },
    children: [
      {
        path: "list",
        name: "电影列表",
        component: () => import("@/views/movie/manager/list"),
        meta: { title: "电影列表", icon: "table" }
      },
      {
        path: "info",
        name: "添加电影",
        component: () => import("@/views/movie/manager/info"),
        meta: { title: "添加电影", icon: "tree" }
      },
      {
        path: "info/:id",
        name: "编辑电影基本消息",
        component: () => import("@/views/movie/manager/info"),
        meta: { title: "编辑电影基本消息", noCache: true, icon: "tree" },
        hidden: true
      },
      {
        path: "video/:id",
        name: "添加电影视频",
        component: () => import("@/views/movie/manager/video"),
        meta: { title: "添加电影视频", noCache: true, icon: "tree" },
        hidden: true
      },

      {
        path: "publish/:id",
        name: "发布电影",
        component: () => import("@/views/movie/manager/publish"),
        meta: { title: "发布电影", noCache: true, icon: "tree" },
        hidden: true
      }
    ]
  },

  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
      title: "Nested",
      icon: "nested"
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "Menu1" },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1"),
            name: "Menu1-1",
            meta: { title: "Menu1-1" }
          },
          {
            path: "menu1-2",
            component: () => import("@/views/nested/menu1/menu1-2"),
            name: "Menu1-2",
            meta: { title: "Menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1"),
                name: "Menu1-2-1",
                meta: { title: "Menu1-2-1" }
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2"),
                name: "Menu1-2-2",
                meta: { title: "Menu1-2-2" }
              }
            ]
          },
          {
            path: "menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3"),
            name: "Menu1-3",
            meta: { title: "Menu1-3" }
          }
        ]
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "menu2" }
      }
    ]
  },
  
  {
    path: "external-link",
    component: Layout,
    children: [
      {
        path: "https://panjiachen.github.io/vue-element-admin-site/#/",
        meta: { title: "External Link", icon: "link" }
      }
    ]
  },

  { path: "*", redirect: "/404", hidden: true }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
