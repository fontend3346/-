import VueAxios from "axios";
import router from "@/router";
import cookie from "@/utils/cookies";
import { ElMessage } from "element-plus";
import gateway from "@/config/gateway";
// 创建 axios 实例
const request = VueAxios.create({
  // API 请求的默认前缀
  timeout: 60 * 1000, // Timeout
});

// 异常拦截处理器
const errorHandler = (error: any) => {
  if (error.response) {
    const data = error.response.data;
    // 从 localstorage 获取 token
    // const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      // ElMessage.info({
      //   ElMessage: 'Forbidden',
      //   description: data.ElMessage
      // })
      router.push({
        path: "/403",
      });
    }
    if (error.response.status === 404) {
      // ElMessage.info({
      //   ElMessage: 'Forbidden',
      //   description: data.ElMessage
      // })
      router.push({
        // path: "/404",
      });
    }
    if (error.response.status === 500) {
      // ElMessage.info({
      //   ElMessage: 'Forbidden',
      //   description: data.ElMessage
      // })
      router.push({
        // path:"/500",
      });
    }
    if (error.response.status === 401) {
      let login = "";
      if (process.env.NODE_ENV == "development") {
        // 开发
        login = `http://${window.location.host}/#/login?ReturnUrl=http://${window.location.host}/#/login`;
      } else if (process.env.NODE_ENV == "production") {
        // 测试
        login = window.gateway.loginUrl;
      }
      window.location.href = login;
      //
      // router.push({
      //   path: "/login",
      // });
      // // ElMessage.info({
      // //   ElMessage: 'Unauthorized',
      // //   description: 'Authorization verification failed'
      // // })
      // // if (token) {
      // //   store.dispatch('Logout').then(() => {
      // //     setTimeout(() => {
      // //       window.location.reload()
      // //     }, 1500)
      // //   })
      // // }
    }
  }
  try {
    return Promise.reject(error);
  } catch (error) {}
};

/* uuid */
function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// request interceptor
request.interceptors.request.use((config: any) => {
  config.headers["x-gw-version"] = gateway.x_gw_version;
  config.headers["x-host-app-id"] = gateway.x_host_app_id;
  // 网关请求AppId
  config.headers["x-app"] = gateway.x_app;
  config.headers["x-api"] = config.xApi === undefined ? "" : config.xApi;
  // 请求头时间戳
  config.headers["x-ts"] = Date.now().toString();
  // UUID值
  // config.headers["x-nonce"] = uuidv4().toString();
  // config.headers["x-nonce"] = uuid().toString();
  config.headers["x-nonce"] = guid();
  // WEB, IOS，ANDROID，IPAD，WINDOWS，MAC
  config.headers["x-client"] = gateway.x_client;
  // 请求环境：TEST(测试)、PRE（预发）、PROD（生产,不传时的默认值）
  config.headers["x-stage"] = "TEST";
  // process.env.NODE_ENV === "production" ? "PROD" : "TEST"; // 没有测试环境，不需要区分
  // 设备ID，该值在启用了加解密插件功能时需要（非必填）
  config.headers["x-did"] = "";
  //王国涛加！！
  config.headers["Content-Type"] = "application/json";
  config.headers["x-team-Id"] = localStorage.getItem("engine-teamid");

  // App版本号，在移动端app接入时需要，后期会配合灰度插件使用（非必填）
  config.headers["x-app-version"] = "";
  config.headers["x-token"] = localStorage.getItem("engine-token");

  return config;
}, errorHandler);
let timer: any = null; //time用来控制事件的触发
// response interceptor
request.interceptors.response.use((response: any) => {
  if (
    response.data.code == 554 ||
    response.data.code == -1 ||
    response.data.code == 552
  ) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      ElMessage.error(response.data.message);
    }, 1000);
    // return;
  } else {
    return response.data;
  }
}, errorHandler);

const installer = {
  vm: {},
  install(Vue: any) {
    Vue.use(VueAxios, request);
  },
};

export default request;

export { installer as VueAxios, request as axios };
