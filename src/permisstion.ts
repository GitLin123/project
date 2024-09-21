//路由鉴权，项目中的路由能不能被xx的权限访问
//什么条件可以访问
import router from "./router";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import setting from "./setting";
nprogress.configure({ showSpinner: false }); //关掉右上角的加载圈圈
//获取用户小仓库的token数据，判断用户是否登录成功
import pinia from "./store";
import useUserStore from "./store/modules/user";
let userStore = useUserStore(pinia);
//全局前置守卫：项目中任意路由切换都会触发的钩子
router.beforeEach(async (to, from, next) => {
  document.title = `${setting.title}-${to.meta.title} `;
  // to and from are both route objects. must call `next`.
  //to是要访问的路由对象，from是从哪来的路由，next是路由的放行函数
  nprogress.start(); //进度条开始加载
  //获取token，去判断用户登录，还是未登录
  if (userStore.token) {
    let username = userStore.username;
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      //登录成功，访问其余路由，排除登录/login
      //如果有用户信息
      if (username) {
        //放行
        next();
      } else {
        //如果没有用户信息，在守卫这里发请求获取到了用户信息再放行
        try {
          await userStore.userInfo(); //再次获取用户信息
          next();
        } catch (error) {
          //token过期或无效的情况
          //退出登录
          await userStore.userLogOut();
          next({ path: "/login", query: { redirect: to.path } }); //重定向到login并带上请求地址
        }
      }
      next();
    }
  } else {
    //用户未登录
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } }); //query用于记录用户想访问没访问成功的页面
    }
  }
  next();
});
//全局后置守卫
router.afterEach((to, from) => {
  // to and from are both route objects.
  nprogress.done();
});

//1、进度条路由
//2、路由鉴权 用户未登录，访问其他界面重定向到/login
//登录成功后，访问/login重定向到首页,其余的可以访问
