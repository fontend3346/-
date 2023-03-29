import request from "@/utils/request";
// import gateway from "../../public/static/config";
let baseUrl = (window as any).gateway.baseUrl
let url = baseUrl + "/earthquake";
// let url = 'http://10.1.52.119:8099/earthquake'
const timeCollect = {
  // 查询配置任务
  getTasks(data: any) {
    return request({
      url: url + '/dataReviceConfig/get',
      method: 'get',
      params: data,
    })
  },
  // 激活关闭
  flageController(data: any) {
    return request({
      url: url + '/dataReviceConfig/update',
      method: 'post',
      data
    })
  },
  // 添加配置任务
  addTasks(data: any) {
    return request({
      url: url + '/dataReviceConfig/add',
      method: 'post',
      data,
    })
  }
};

export default timeCollect;
