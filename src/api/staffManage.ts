import request from "@/utils/request";
const baseUrl = window.gateway.baseUrl + "/api/v1/user";
const stationUrl = window.gateway.baseUrl + "/api/v1/operation/system";
//人员管理接口
const staffManage = {
  //获取/搜索人员管理列表
  getList(data: any) {
    return request({
      url: baseUrl + "/assetUser",
      method: "get",
      params: data,
    });
  },
  //创建人员管理列表
  createList(data: any) {
    return request({
      url: baseUrl + "/assetUser",
      method: "post",
      data: data,
    });
  },
  //修改/删除人员管理列表
  updateList(data: any) {
    return request({
      url: baseUrl + "/assetUser",
      method: "put",
      data: data,
    });
  },
  //删除人员管理
  batchList(data: any) {
    return request({
      url: baseUrl + `/assetUser/deleteUser/${data.id}`,
      method: "delete",
      // data: data,
    });
  },
  //查询搜索表格的台网下拉框
  networkSelect(userId) {
    return request({
      url: baseUrl + `/userModule/index/network/${userId}`,
      method: "get",
    });
  },
  //查询搜索表格的台站下拉框
  stationSelect(data: any, userId: any) {
    return request({
      url: baseUrl + `/userModule/index/station/${userId}`,
      method: "get",
      params: data,
    });
  },
  // 导入xlsx文件
  importStaff(data: any) {
    return request({
      url: baseUrl + `/assetUser/register/excel`,
      method: "post",
      data: data,
    });
  },
};

export default staffManage;
