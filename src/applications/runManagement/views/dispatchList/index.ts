import {
  reactive,
  onMounted,
  ref,
  getCurrentInstance,
  onBeforeUnmount,
} from "vue";
import http from "@/api/index";
import store from "@/store";
import { ElMessage } from "element-plus";
export const useHandler = () => {
  const state = reactive({
    //搜索
    orderNum: "", //单号
    textItem: "", //测项
    textItemList: [
      {
        value: "",
        label: "",
      },
    ], //测项数据
    stationName: "", //台站名称
    dataBaseList: [
      {
        value: "",
        label: "",
      },
    ], //台站名称数据

    netWorkName: "", //台网名称
    netWorkList: [
      {
        value: "",
        label: "",
      },
    ], //台网数据
    conductor: "", //处理人
    conductorList: [
      {
        value: "",
        label: "",
      },
    ], //处理人
    statusValue: "", //状态
    statusList: [
      {
        value: "",
        label: "",
      },
    ], //状态列表
    value1: "", //派单时间

    //表格
    sourceData: [
      {
        networkName: "天津市地震局",
        center: "天津地震局",
        stationName: "宝城(新)台",
        faultCause: "其他",
        explain: "巡检无异常",
        maintainPerson: "张12",
        sentPerson: "测试人员",
        last: "26秒",
      },
      {
        networkName: "北京市地震局",
        center: "北京市地震局",
        stationName: "东二旗",
        faultCause: "数采故障",
        explain: "数采维修",
        maintainPerson: "章12",
        sentPerson: "测试人员",
        last: "26秒",
      },
    ], //表格数据
    sourceColumns: [
      {
        prop: "networkName",
        label: "台网",
      },
      {
        prop: "center",
        label: "分中心",
      },
      {
        prop: "stationName",
        label: "台站名称",
      },
      {
        prop: "stationName",
        label: "台站编码",
      },
      {
        prop: "faultCause",
        label: "故障说明",
      },
      {
        prop: "faultCause",
        label: "故障原因",
      },
      {
        prop: "explain",
        label: "处理说明",
      },
      {
        prop: "explain",
        label: "处理方式",
      },
      {
        prop: "maintainPerson",
        label: "现场维护人",
      },
      {
        prop: "sentPerson",
        label: "派单人",
      },
      {
        prop: "sentPerson",
        label: "处理人",
      },
      {
        prop: "sentTime",
        label: "派单时间",
      },
      {
        prop: "last",
        label: "历时",
        width: "80",
      },
    ], //表头
    total: 0, //总条数
    pageSize: 10, //分页尺寸
    pageNum: 1, //当前页

    //详情
    isHobby: false, //详情弹框
    title: "", //标题
    detailShowList: {
      code: "PIE19120900",
      name: "涉县",
      desc: "其他中断报警(10.5.80.17)",
      cause: "网络故障、重启无效",
      stationName: "涉县",
      disposeName: "测试人员",
      stationAddress: "测试人员",
      ticketsTime: "2019-12-09 20:14:23",
      stationDeal: "测震",
      ticketsName: "测试人员",
    },
    activeStep: "3", //步骤
    stepsInfo: [
      {
        title: "第1步[处理]",
        info: "设备值进人员处理结果:测试人员18839476440 历时:2天12小时27分5秒",
        isResolve: "未解决",
        description: "待运营商协商",
        src: "https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg?source=1940ef5c",
        time: "2019-12-09 20:14:23-2019-12-12 08:41:28 1人18839476440",
        file: "查看附件(1)>>",
      },
      {
        title: "第1步[处理]",
        info: "设备值进人员处理结果:测试人员18839476440 历时:2天12小时27分5秒",
        isResolve: "未解决",
        description: "待运营商协商",
        src: "https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg?source=1940ef5c",
        time: "2019-12-09 20:14:23-2019-12-12 08:41:28 1人18839476440",
        file: "查看附件(2)>>",
      },
      {
        title: "第1步[处理]",
        info: "设备值进人员处理结果:测试人员18839476440 历时:2天12小时27分5秒",
        isResolve: "未解决",
        description: "待运营商协商",
        src: "https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg?source=1940ef5c",
        time: "2019-12-09 20:14:23-2019-12-12 08:41:28 1人18839476440",
        file: "查看附件(3)>>",
      },
    ], //步骤条

    //附件弹框
    isFileTable: false,
    fileData: [
      {
        account1: "1",
      },
    ], //附件表格
    fileColumns: [
      {
        prop: "account1",
        label: "附件名称",
      },
      {
        prop: "account1",
        label: "上传时间",
      },
    ], //附件表头

    //派单
    isSendModal: false, //是否显示派单
    testOption: 3, //选择测项
    testOptionList: [
      {
        id: "",
        name: "",
      },
    ], //选择测项
    targetNetwork: "", //台网
    networkList: [
      {
        value: "",
        label: "",
      },
    ], //目标台网
    targetStation: "", //目标台站
    targetStationList: [
      {
        value: "",
        label: "",
      },
    ], //目标台站
    conductorSend: "", //处理人
    conductorListSend: [
      {
        value: "",
        label: "",
      },
    ], //处理人
    malFunction: "", //故障现象
    explain: "", //初步说明
  });

  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  onMounted(() => {});
  onBeforeUnmount(() => {});

  //查询
  const searchData = () => {};
  //台网改变事件
  const netWorkNameChange = () => {};
  //台站名称改变事件
  const stationNameChange = () => {};
  //重置
  const resetbtn = () => {};
  //导出
  const exportBtn = () => {};
  //详情按钮
  const detailClick = () => {
    state.isHobby = true;
    state.title = "详情";
  };
  //选中数据
  const onSelectionChange = (row: any) => {};
  //分页
  const pageChange = () => {};
  //分页
  const sizeChange = () => {};
  //确定按钮
  const confirm = () => {};
  //确定取消按钮
  const cancel = () => {};
  //查看附件
  const fileModal = () => {
    state.isFileTable = true;
  };
  //选中附件
  const onSelectionFile = () => {};
  //表格下载
  const downLoadBtn = (row: any) => {
    console.log(row);
  };
  //下载按钮
  const confirmFile = () => {
    state.isFileTable = false;
    console.log("下载");
  };
  //添加派单
  const sendOrders = () => {
    getSubject();
    state.isSendModal = true;
    state.title = "手动派单";
  };
  //目标台站修改
  const changeType = () => {};
  //搜索台站tab栏 获取隶属学科
  const getSubject = () => {
    let params = {
      collectionName: "META_DATA_SUBJECT_INFO",
      queryConditionList: [],
      queryResultList: [],
    };
    http.stationsInfoManage.getSubject(params).then((res: any) => {
      let arr: any = [];
      if (res && res.code == 0) {
        res.data.data.forEach((item) => {
          arr.push(item.properties);
        });
        state.testOptionList = arr;
        console.log(state.testOptionList);
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //取消
  const cancleFun = () => {};
  //确定
  const confirmFun = () => {
    let params = {
      description: state.explain, //初步说明
      dispatcherId: state.conductorSend, //处理人的id
      faultPhenomenon: state.malFunction, //故障现象
      handlerId: store.state.user.userId, //当前登陆人的id
      measurement: state.testOption, //学科
      networkId: state.targetNetwork, //台网id
      stationId: state.targetStation, //台站id
      workOrderName: "", //工单名称
    };
    http.dispatchOpen.addOrder(params).then((res: any) => {
      if (res && res.code == 0) {
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  return {
    state,
    detailClick,
    stationNameChange,
    searchData,
    netWorkNameChange,
    resetbtn,
    exportBtn,
    pageChange,
    sizeChange,
    onSelectionChange,
    confirm,
    cancel,
    confirmFile,
    fileModal,
    onSelectionFile,
    downLoadBtn,
    sendOrders,
    changeType,
    cancleFun,
    confirmFun,
  };
};
