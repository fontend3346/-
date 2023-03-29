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
    engineToken: "" || localStorage.getItem("engine-token"),
    accessToken: "" || localStorage.getItem("accessToken"),
    engineAccount: "" || localStorage.getItem("engine-account"),
    roles: [],
    info: {},
    userInfo: "" || localStorage.getItem("userInfo"),
    userId: "" || localStorage.getItem("userId"),
    userName: "" || localStorage.getItem("user"),
    roleInfo: "" || localStorage.getItem("roleInfo"),
    roleLevel: "" || localStorage.getItem("roleLevel"),
    stationInfo: "" || localStorage.getItem("stationInfo"),
    menuList: "" || localStorage.getItem("menuList"),
    menuShow: "" || localStorage.getItem("menuShow"),
  },

  mutations: {
    SET_USERINFO: (state: Object, info: Object) => {
      state.userId = info.userId;
      state.engineToken = info.token;
      state.userName = info.account;
      localStorage.setItem("engine-token", info.token); //token
      localStorage.setItem("engine-teamid", info.teamInfoResp[0].teamId); //teamId
      localStorage.setItem("userId", info.userId); // userId
      localStorage.setItem("userInfo", JSON.stringify(info)); // userInfo
      localStorage.setItem("user", info.account); // user
      state.userInfo = JSON.stringify(info);
    },
    SET_ROLEINFO: (state: Object, info: Object) => {
      state.roleLevel = info.level;
      state.roleInfo = JSON.stringify(info);
      localStorage.setItem("roleInfo", JSON.stringify(info));
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
    //登陆后站点信息
    STAT_INFO: (state: Object, info: any) => {
      state.stationInfo = JSON.stringify(info);
      localStorage.setItem("stationInfo", JSON.stringify(info)); // userInfo
    },
    // 登陆后获取菜单列表
    SET_MENU_LIST: (state: Object, info: any) => {
      state.menuList = JSON.stringify(info);
      localStorage.setItem("menuList", JSON.stringify(info)); // userInfo
    },
    // 移除cookie信息
    REMOVE_INFO: (state: Object) => {
      localStorage.removeItem("userId");
      localStorage.removeItem("engine-teamid");
      localStorage.removeItem("engine-token");
      localStorage.removeItem("user");
      localStorage.removeItem("stationInfo");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("roleInfo");
      localStorage.removeItem("menuList");
    },
    //
    SET_MENUSHOW: (state: Object, info: any) => {
      state.menuShow = info;
      localStorage.setItem("menuShow", info); // userInfo
    },
  },

  actions: {},
};

export default user;
