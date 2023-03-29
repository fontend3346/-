// import storage from 'store'
// import { login } from '@/api/login'
export const ACCESS_TOKEN = "Access-Token";
import cookie from "@/utils/cookies";
// interface state {
//   mgtToken?: string;
//   userInfo?: Object;
// }

const user = {
  state: {
    engineToken: "" || cookie.get("engine-token"),
    accessToken: "" || localStorage.getItem("accessToken"),
    engineAccount: "" || cookie.get("engine-account"),
    roles: [],
    info: {},
    userInfo: "" || cookie.get("userInfo"),
    userId: "" || cookie.get("userId"),
    userName: "" || cookie.get("user"),
    roleInfo: "" || cookie.get("roleInfo"),
    menuList: [],
  },

  mutations: {
    SET_USERINFO: (state: Object, info: Object) => {
      state.userInfo = info;
      state.userId = info.userId;
      state.userName = info.account;
      cookie.set("engine-token", info.token); //token
      cookie.set("engine-teamid", info.teamInfoResp[0].teamId); //teamId
      cookie.set("userId", info.userId); // userId
      cookie.set("userInfo", JSON.stringify(info)); // userInfo
      cookie.set("user", info.account); // user
    },
    //登录完成
    SET_MGT_TOKEN: (state: Object, mgtToken: string) => {
      localStorage.setItem("mgtToken", mgtToken);
      state.mgtToken = mgtToken;
    },
    SET_ACCESS_TOKEN: (state: Object, accessToken: string) => {
      localStorage.setItem("accessToken", accessToken);
      state.accessToken = accessToken;
    },
    SET_INFO: (state: Object, info: Object) => {
      state.info = info;
    },
    // 存储菜单列表
    SET_MENULIST: (state: Object, info: Object) => {
      state.menuList = info;
    },
    // 移除cookie信息
    REMOVE_INFO: (state: Object) => {
      cookie.delete("userId");
      cookie.delete("engine-teamid");
      cookie.delete("engine-token");
      cookie.delete("user");
    },
  },

  actions: {},
};

export default user;
