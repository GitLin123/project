import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { UserConfigExport, ConfigEnv, loadEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import vue from "@vitejs/plugin-vue";
import path from "path";
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  //获取各个环境下的对应的变量
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        mockPath: "mock",
        localEnabled: command === "serve",
      }),
    ],
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "http://sph-api.atguigu.cn",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
};
