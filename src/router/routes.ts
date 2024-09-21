//对外暴漏配置路由
export const constantRoute = [
  {
    path: "/login",
    component: () => import("../views/login/index.vue"),
    name: "login", //命名路由
    meta: {
      title: "登录", //菜单
      hidden: true, //在菜单中是否隐藏
      icon: "Promotion", //菜单左侧的图标
    },
  },
  {
    //登录成功过后展示数据
    path: "/",
    component: () => import("../layout/index.vue"),
    name: "",
    meta: {
      title: "",
      hidden: false,
      icon: "Avatar",
    },
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("../views/home/index.vue"),
        meta: {
          title: "首页", //菜单标题
          hidden: false,
          icon: "HomeFilled",
        },
      },
    ],
  },
  {
    path: "/screen",
    component: () => import("../views/screen/index.vue"),
    name: "screen",
    meta: {
      title: "数据大屏",
      hidden: false,
      icon: "Platform",
    },
  },
  {
    path: "/acl",
    component: () => import("../layout/index.vue"),
    redirect: "/acl/user",
    name: "Acl",
    meta: {
      title: "权限管理",
      icon: "Lock",
    },
    children: [
      {
        path: "/acl/user",
        component: () => import("../views/acl/user/index.vue"),
        name: "Acl",
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "User",
        },
      },
      {
        path: "/acl/role",
        component: () => import("../views/acl/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "UserFilled",
        },
      },
      {
        path: "/acl/permission",
        component: () => import("../views/acl/permission/index.vue"),
        name: "Permission",
        meta: {
          title: "菜单管理",
          hidden: false,
          icon: "Monitor",
        },
      },
    ],
  },
  {
    path: "/product",
    component: () => import("../layout/index.vue"),
    name: "product",
    meta: {
      title: "商品管理",
      icon: "Goods",
      hidden: false,
    },
    redirect: "/product/trademark",
    children: [
      {
        path: "/product/trademark",
        component: () => import("../views/product/trademark/index.vue"),
        name: "Trademark",
        meta: {
          title: "品牌管理",
          icon: "ShoppingCartFull",
          hidden: false,
        },
      },
      {
        path: "/product/attr",
        component: () => import("../views/product/attr/index.vue"),
        name: "Attr",
        meta: {
          title: "属性管理",
          icon: "ChromeFilled",
          hidden: false,
        },
      },
      {
        path: "/product/spu",
        component: () => import("../views/product/spu/index.vue"),
        name: "SPU",
        meta: {
          title: "SPU管理",
          icon: "Calendar",
          hidden: false,
        },
      },
      {
        path: "/product/sku",
        component: () => import("../views/product/sku/index.vue"),
        name: "SKU",
        meta: {
          title: "SKU管理",
          icon: "OfficeBuilding",
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/404",
    component: () => import("../views/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
      hidden: true,
      icon: "Doucument",
    },
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
    name: "Any",
    meta: {
      title: "任意路由",
      hidden: true,
      icon: "User",
    },
  },
];
