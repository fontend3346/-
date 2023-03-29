import { onMounted, ref, reactive, getCurrentInstance, watch } from "vue";
import { useRouter } from "vue-router";
import http from "@/api/index";
import { ElMessage } from "element-plus";
import store from "@/store";
import utils from "@/utils/utils";
import { AnyAaaaRecord } from "dns";
import baseMap from "@/plugins/lib/baseMaps";
import mapboxgl from "mapbox-gl";
export const useHandler = () => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  // 返回
  const backConfig = () => {
    emit("backConfig");
  };
  const state: any = reactive({
    editShow: false,
    title: "新建", //新建
    showAdd: false, //新建显隐

    deviceNameSearch: "", //设备名称
    NetIdSearch: "", //台网
    NetIdSearchList: [], //台网list
    stationIdSearch: "", //台站
    stationIdSearchList: "", //台站list
    pointIdSeatch: "", //测点
    pointIdSeatchList: "", //测点list
    deveceType: "", //设备类型
    deveceTypeList: [], //设备类型

    linkageData: [], //表格数据
    linkageColumns: [
      // {
      //   prop: "creator",
      //   label: "用户名称",
      // },
      {
        prop: "networkname",
        label: "台网名称",
      },
      {
        prop: "stationname",
        label: "站点名称",
      },
      {
        prop: "pointname",
        label: "测点名称",
      },
      {
        prop: "name",
        label: "设备名称",
      },
      {
        prop: "typename",
        label: "设备类型",
      },
      {
        prop: "description",
        label: "描述",
      },
      {
        prop: "create_time",
        label: "创建时间",
      },
    ], //表头
    total: 10,
    pageSize: 10,
    pageNum: 1,
    //编辑信息
    editRow: {
      device_name: "",
      device_code: "",
      device_type: "",
      desCon: "",
      netstation: "",
      station: "",
      detection_point: "",
      instSn: "",
      desInstall: "",
      transferAggrement: "",
      subnetMask: "",
      ports: "",
      gateway: "",
      userName: "",
      pwd: "",
      id: "", //编辑id
      cateId: "", //设备类型
      equipmentFactory: "", //设备厂家
      subjectionSubkect: "", //学科类型
    }, //编辑设备
    subjectList: [], //设备学科(无用)
    testList: [], //设备测项
    workMethodList: [], //工作方式(无用)
    sourceList: [], //设备来源(无用)

    subjectionPlatformList: [], // 隶属站台数据(无用)
    equipmentDisciplineList: [], //设备学科数据(无用)
    equipmentDeviceList: [], //设备测项(无用)
    workWayList: [], //工作方式(无用)
    equipmentSourceList: [], //设备来源(无用)

    //更改添加设备
    elStepActive: 0, //切换页
    addRow: {
      deviceName: "",
      deviceNum: "",
      createDate: "",
      leaveFactoryTime: "",
      describe: "",
      serialNumber: "",
      equipmentType: 2,
      equipmentModel: "",
      station: "",
      netstation: "",
      detection_point: "",
      installDate: "",
      installPer: store.state.user.userId,
      desCon: "",
      ipAdress: "",
      transferAggrement: "",
      subnetMask: "",
      ports: "",
      gateway: "",
      userName: "",
      pwd: "",
      instSn: "",
      addContent: [], //设备类型为数据采集器的通道
      equipmentFactory: "",
      subjectionSubkect: "", //学科类型
    }, //添加设备
    equipmentFactoryList: [], // 设备厂家数据
    equipmentModelList: [], // 设备类型数据
    equipmentTypeList: [], // 设备型号数据
    measurementPointList: [], // 测点数据
    transferAggrementList: [], //传输协议
    facilityNameList: [], //数据采集设备名称
    portholeList: [], //数据采集设备通道
    netstationList: [], //台网数据
    stationList: [], //台站数据
    installPerList: [], //台站数据
    totalFacility: {}, //选择设备
    totalFacilityList: [], //选择设备list
    facilityAisleList: [], //选择采集设备list-1
    watchAisleList: [], //选择观测设备list-1
    facilityAisleListCopy: [], //选择采集设备list-2
    watchAisleListCopy: [], //选择观测设备list-1
    jointArr: "", //拼接数据
    classify_id: "", //判断是哪个设备
    hook_id: "", //设备id
    facilityInfo: [{ collectChannel: "", observeChannel: "" }],
    addSteps: ["设备基础信息", "设备安装记录", "设备访问参数", "设备通道"],
    oldDate: [], //上一次的设备通道数组
    oldValAisle: "", //上一次选中的设备通道
    deviceNameOld: "", //上一次选中的设备通道
    firstVal: 1,
    // 详情弹框
    detailModal: false, //详情弹框
    addRecord: false, //添加维修记录弹框
    addRecordId: null, //添加维修id
    // apparatuName: "", //仪器名称
    apparatuContent: "", //维护内容
    apparatuOrg: null, //维修机构
    apparatuStaff: "", //维修人
    bearerPer: "", //送修人
    bearerResult: "", //送修结果
    apparatuTime: null, //维护时间
    apparatuType: null, //维护类型
    startMaintainTime: null, //开始时间
    endMaintainTime: null, //结束时间
    maintainDes: null, //描述

    recordArr: [
      //维修记录字段
      {
        label: "仪器名称",
        value: 0,
      },
      {
        label: "维护类型",
        value: 1,
      },
      {
        label: "维护时间",
        value: 2,
      },
      {
        label: "维护内容",
        value: 3,
      },
      {
        label: "维修人",
        value: 4,
      },
      {
        label: "维修机构",
        value: 5,
      },
      {
        label: "维修结果",
        value: 6,
      },
      {
        label: "送修人",
        value: 7,
      },
    ],
    typeList: [
      {
        label: "设备接入",
        value: 1,
      },
      {
        label: "设备维修",
        value: 2,
      },
      {
        label: "设备下线",
        value: 3,
      },
    ],
    installList: [], //安装记录
    keepList: [], //维修记录
  });
  onMounted(() => {
    searchList();
    getProvince(); // 获取台网列表(搜索)
    getStations(); // 获取子台站列表(搜索)
    getDeviceTypeVal({}); //获取设备类型(搜索)
    getPoint(); // 获取测点(搜索)
    getEquipmentFactory(); //设备厂家(修改和添加)
    queryProtocol(); //查询传输协议(修改和添加)
    getSubject(); //查询学科类型
  });
  watch(
    () => state.addRow.equipmentType,
    (newVal, oldVal) => {
      if (newVal == 1) {
        state.addRow.addContent = [
          {
            attribute: "", // 通道属性
            description: "", //描述
            itemCode: "", //侧向分量代码
          },
        ]; //设备类型为数据采集器的通道
        state.addSteps = [
          "设备基础信息",
          "设备安装记录",
          "设备访问参数",
          "设备通道",
        ];
      } else {
        state.addRow.addContent = [
          {
            attribute: "", // 通道属性
            description: "", //描述
            itemCode: "", //侧向分量代码
            inst2Id: "",
            chanId: "",
          },
        ];
        state.addSteps = ["设备基础信息", "设备安装记录", "设备通道"];
      }
    },
    {
      deep: true,
    }
  );

  //重置数据
  const resentData = () => {
    state.addRow.deviceName = "";
    state.addRow.deviceNum = "";
    state.addRow.createDate = "";
    state.addRow.leaveFactoryTime = "";
    state.addRow.describe = "";
    state.addRow.serialNumber = "";
    // state.addRow.equipmentType = "";
    state.addRow.equipmentModel = "";
    state.addRow.station = "";
    state.addRow.netstation = "";
    state.addRow.detection_point = "";
    state.addRow.installDate = "";
    state.addRow.desCon = "";
    state.addRow.ipAdress = "";
    state.addRow.transferAggrement = "";
    state.addRow.subnetMask = "";
    state.addRow.ports = "";
    state.addRow.gateway = "";
    state.addRow.userName = "";
    state.addRow.pwd = "";
    state.addRow.instSn = "";
    // state.addRow.addContent = "";
    state.addRow.equipmentFactory = "";
  };
  // 获取隶属学科
  const getSubject = () => {
    let params = {
      collectionName: "META_DATA_SUBJECT_INFO",
      queryConditionList: [],
      queryResultList: [],
    };
    http.stationsInfoManage.getSubject(params).then((res: any) => {
      let arr: any = [];
      if (res && res.code == 0) {
        res.data.data.forEach((item: any) => {
          arr.push(item.properties);
        });
        state.subjectionSubkectList = arr;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 获取台网列表
  const getProvince = () => {
    http.stationsInfoManage.getCountry().then((res: any) => {
      if (res.code == 0) {
        state.NetIdSearchList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //台网改变事件
  const networkChange = (val: any) => {
    state.stationIdSearch = "";
    state.pointIdSeatch = "";
    state.editRow.station = ""; //台站
    state.editRow.detection_point = ""; //测点
    let data = {
      networkId: val,
    };
    stationsTotal(data); // 点击台网查询子台站
    let params = {
      networkId: val,
      stationId: state.stationIdSearch,
    };
    pointApi(params);
    let pointParams = {
      name: state.deviceNameSearch,
      networkId: val,
      pointId: state.pointIdSeatch,
      stationId: state.stationIdSearch,
    };
    getDeviceTypeVal(pointParams);
  };
  // 获取子台站列表
  const getStations = () => {
    let params = {
      networkId: "",
    };
    stationsTotal(params);
  };
  // 台站api
  const stationsTotal = (data: any) => {
    http.stationsInfoManage.getStationsEarth(data).then((res: any) => {
      if (res.code == 0) {
        state.stationIdSearchList = res.data;
      } else {
        ElMessage({
          message: res.message,
          type: "error",
        });
      }
    });
  };
  // 台站改变事件
  const sysopChange = (val: any) => {
    state.pointIdSeatch = "";
    state.editRow.detection_point = ""; //测点
    let params = {
      networkId: state.NetIdSearch,
      stationId: val,
    };
    pointApi(params);
    let data = {
      name: state.deviceNameSearch,
      networkId: state.NetIdSearch,
      pointId: state.pointIdSeatch,
      stationId: val,
    };
    getDeviceTypeVal(data);
  };
  // 获取测点
  const getPoint = () => {
    let params = {
      networkId: "",
      stationId: "",
    };
    pointApi(params);
  };
  // 测点api
  const pointApi = (data: any) => {
    http.stationsInfoManage.pointApi(data).then((res: any) => {
      if (res.code == 0) {
        state.pointIdSeatchList = res.data;
      } else {
        ElMessage({
          message: res.message,
          type: "error",
        });
      }
    });
  };
  //测点改变事件
  const pointIdChange = (val: any) => {
    let params = {
      name: state.deviceNameSearch,
      networkId: state.NetIdSearch,
      pointId: val,
      stationId: state.stationIdSearch,
    };
    getDeviceTypeVal(params);
  };
  //设备类型api
  const getDeviceTypeVal = (params: any) => {
    http.instrumentRegistration.getDeviceTypeApi(params).then((res: any) => {
      if (res.code == 0) {
        state.deveceTypeList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //数据类型改变tab
  const toPage = (row: any) => {
    state.addRow.equipmentType = row.cateId;
  };
  //数据类型改变radio
  const radioChange = (row: any) => {
    state.elStepActive = 0;
  };
  //添加通道
  const addAisle = () => {
    // debugger;
    state.firstVal += 1;
    let obj: any;
    if (state.addRow.equipmentType == 1) {
      obj = {
        attribute: "", // 通道属性
        description: "", //描述
        itemCode: "", //侧向分量代码
      };
    } else if (state.addRow.equipmentType == 2) {
      obj = {
        attribute: "", // 通道属性
        description: "", //描述
        itemCode: "", //侧向分量代码
        inst2Id: "",
        chanId: "",
      };
    }
    //将选中的通道禁止选中
    state.addRow.addContent.push(obj);
    // console.log(
    //   state.addRow.addContent,
    //   state.addRow.addContent[state.addRow.addContent.length - 2],
    //   "上一个对象"
    // );
    //判断上一个通道是否有值
    let arrFlag = state.addRow.addContent.map((item) => {
      if (item.chanId == state.oldValAisle) {
        return true;
      } else {
        return false;
      }
    });
    // 当上一个通道有值，且整体数组大于0才能让他变为禁用
    if (
      state.addRow.addContent.length > 0 &&
      arrFlag.indexOf(true) != -1 &&
      state.addRow.addContent[state.addRow.addContent.length - 2].chanId
    ) {
      state.portholeList.forEach((item: any) => {
        if (item.id == state.oldValAisle) {
          item.disabled = true;
        }
      });
    }
  };

  //删除通道
  const delAisle = (item: Object, index: any) => {
    state.addRow.addContent.splice(index, 1);
    //  删除通道将删除的通道变为可选状态
    state.portholeList.forEach((v: any) => {
      if (v.id == item.chanId) {
        v.disabled = false;
      }
    });
  };
  // 下一步
  const nextSelete = () => {
    if (!state.addRow.deviceName) {
      ElMessage.info("设备名称不能为空");
      return;
    }
    if (!state.addRow.deviceNum) {
      ElMessage.info("设备编号不能为空");
      return;
    }
    if (!state.addRow.equipmentFactory) {
      ElMessage.info("设备厂家不能为空");
      return;
    }
    if (!state.addRow.equipmentModel) {
      ElMessage.info("设备型号不能为空");
      return;
    }
    if (!state.addRow.serialNumber) {
      ElMessage.info("序列号不能为空");
      return;
    }
    if (!state.addRow.netstation) {
      ElMessage.info("台网不能为空");
      return;
    }
    if (!state.addRow.station) {
      ElMessage.info("台站不能为空");
      return;
    }
    if (!state.addRow.detection_point) {
      ElMessage.info("测点不能为空");
      return;
    }
    state.elStepActive = 1;
    getJulist(); //查询安装人
  };
  //资源配置-上一步 不清空
  const upcollection = () => {
    state.elStepActive = 0;
  };
  //资源配置-下一步
  const nextcollection = () => {
    state.elStepActive = 2;
    if (state.addRow.equipmentType == 2) {
      deviceList(); // 查询采集设备数据
    }
  };

  //资源配置-上一步 不清空
  const upThreeWith = () => {
    state.elStepActive = 1;
  };
  //资源配置-下一步
  const nextThreeWith = () => {
    state.elStepActive = 3;
  };
  // 信息确认-上一步
  const upSure = () => {
    state.elStepActive = 2;
  };
  // 信息确认-确认
  const nextSure = () => {
    let params = {
      instBaseInfo: {
        cateId: state.addRow.equipmentType, //设备类型
        instCode: state.addRow.deviceNum, //设备编号
        creator: store.state.user.userId, //登录用户
        description: state.addRow.describe, // 描述
        name: state.addRow.deviceName, //设备名称
        serialNum: state.addRow.serialNumber, //序列号
        status: 1, // 状态(状态)
        instModelId: state.addRow.equipmentModel, //设备型号
        manuDate: state.addRow.createDate,
        outDate: state.addRow.leaveFactoryTime,
      },
      instChanInfo: state.addRow.addContent,
      instrPointHis: {
        description: state.addRow.desCon, //描述
        instSn: Number(state.addRow.instSn), // 安装流水 (只能是数字  输入框)
        installDate: state.addRow.installDate, //安装日期
        // offTime: "", //不要
        // onTime: "", //不要
        pointCode: state.addRow.detection_point, //测点
        stationCode: state.addRow.station, // 台站
        status: 1, //页面不需要体现
        userId: state.addRow.installPer, //选择的用户  默认选择当前用户id
      },
      subjectId: state.addRow.subjectionSubkect, //隶属学科
    };
    //设备类型选择的是采集设备
    if (state.addRow.equipmentType == 1) {
      params.instrAccInfo = {
        ip: state.addRow.ipAdress, //ip访问地址
        mask: state.addRow.subnetMask, // 子网掩码
        password: state.addRow.pwd, //手写
        port: state.addRow.ports,
        linkUser: state.addRow.userName, //用户名  手写
        protocolId: state.addRow.transferAggrement, //协议
        gateway: state.addRow.gateway, //网关
      };
    }
    http.instrumentRegistration.addDevice(params).then((res: any) => {
      if (res.code == 0) {
        state.showAdd = false;
        state.addRow.addContent = [];
        ElMessage.success("添加成功！");
        searchList();
      } else {
        ElMessage.error("添加失败");
      }
    });
  };
  // 新建 添加仪器
  const addInstrument = () => {
    state.showAdd = true;
    state.title = "新增";
    state.elStepActive = 0;
    state.addRow.deviceName = "";
    state.addRow.deviceNum = "";
    state.addRow.createDate = "";
    state.addRow.leaveFactoryTime = "";
    state.addRow.describe = "";
    state.addRow.serialNumber = "";
    state.addRow.equipmentType = 1;
    state.addRow.equipmentModel = "";
    state.addRow.station = "";
    state.addRow.netstation = "";
    state.addRow.detection_point = "";
    state.addRow.installDate = "";
    state.addRow.desCon = "";
    state.addRow.ipAdress = "";
    state.addRow.transferAggrement = "";
    state.addRow.subnetMask = "";
    state.addRow.ports = "";
    state.addRow.gateway = "";
    state.addRow.userName = "";
    state.addRow.pwd = "";
    state.addRow.instSn = "";
    state.addRow.equipmentFactory = "";
    deviceTypeFun(); //设备类型
    getNetListFun(); //查询台网
  };
  // 设备类型
  const deviceTypeFun = () => {
    let params = {};
    http.instrumentRegistration.deviceTypeList(params).then((res: any) => {
      if (res.code == 0) {
        state.equipmentModelList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
    // }
  };
  // 设备厂家
  const getEquipmentFactory = () => {
    let params = {};
    http.instrumentRegistration.getEquipmentFactory(params).then((res: any) => {
      if (res.code == 0) {
        state.equipmentFactoryList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
    // }
  };
  // 设备厂家查询设备型号
  const equipmentFactoryChange = (v: Object) => {
    state.addRow.equipmentModel = "";
    state.editRow.device_type = "";
    if (v) {
      let param = {
        mfId: v,
      };
      devicModelFun(param);
    }
  };
  // 设备型号
  const devicModelFun = (param: Object) => {
    http.instrumentRegistration.deviceModelList(param).then((res: any) => {
      if (res.code == 0) {
        state.equipmentTypeList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
    // }
  };
  // 查询台网
  const getNetListFun = () => {
    let params = {
      collectionName: "NETWORK_BASE_INFO",
      outputGeobuf: false,
      pageCount: 10000,
      pageNum: 1,
      queryConditionList: [],
      queryResultList: [],
    };
    http.instrumentRegistration.getNetList(params).then((res: any) => {
      if (res.code == 0) {
        res.data.data.map((item) => {
          let obj = {
            label: item.properties.cname,
            value: item.properties.network_id,
          };
          state.netstationList.push(obj);
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 台网查台站
  const netstationChange = (val: any) => {
    state.addRow.station = "";
    state.addRow.detection_point = "";
    let params = {
      name: "",
      networkId: val,
      pageNum: 1,
      pageSize: 10000,
    };
    getStationList(params);
  };
  // 台站查测点
  const stationChange = (val: any) => {
    state.addRow.detection_point = "";
    let params = {
      name: "",
      stationId: val,
      pageNum: 1,
      pageSize: 10000,
    };
    getPointList(params);
  };
  // 查询台站api
  const getStationList = (params: any) => {
    http.instrumentRegistration.getSelectStation(params).then((res: any) => {
      if (res.code == 0) {
        state.stationList = res.data.list;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 查询测点api
  const getPointList = (params: any) => {
    http.instrumentRegistration.getPointCopy(params).then((res: any) => {
      if (res.code == 0) {
        state.measurementPointList = res.data.list;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 查询测点api
  const queryProtocol = () => {
    http.instrumentRegistration.queryProtocol().then((res: any) => {
      if (res.code == 0) {
        state.transferAggrementList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 查询安装人(第一个)
  const getJulist = () => {
    let params = {
      pageNum: 1,
      pageSize: 10000,
      userId: store.state.user.userId,
    };
    http.userManagement.queryUserRoleList(params).then((res) => {
      if (res.code == 0) {
        state.installPerList = res.data.list;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 查询数据采集设备
  const deviceList = () => {
    let params = {
      pageNum: 1,
      pageSize: 10000,
      cate: 1, //查询采集1或者是设备2
      point: state.addRow.detection_point,
    };
    http.instrumentRegistration.getInstrument(params).then((res: any) => {
      if (res.code == 0) {
        state.facilityNameList = res.data.list;
      } else {
        ElMessage.info(res.message);
      }
    });
  };
  //查询数据采集设备查询采集设备通道Api
  const facilityChange = (val: any) => {
    let params = {
      instId: val,
    };
    queryChan(params);
  };
  // 查询采集设备通道Api
  const queryChan = (params: any) => {
    // debugger;
    http.instrumentRegistration.queryChan(params).then((res: any) => {
      if (res.code == 0) {
        // 判断是否第一次点击，上一次的设备名称是否与这一次的值相等，
        if (state.firstVal != 1 && state.deviceNameOld == params.instId) {
          // 当设备名称本次与上一次相等的时候，并且设备通道不相等的时候才能更新设备通道(wen)
          if (state.oldDate !== res.data[0].inst_id) {
            state.portholeList = res.data;
          }
        } else {
          state.portholeList = res.data;
        }
        //保留一份旧的设备通道  下一次如果还是当前旧的通道，并且是同样的采集设备名称   那就不重复赋值了
        state.deviceNameOld = params.instId; //保留一份旧的采集设备名称
        state.oldDate = res.data[0].inst_id;
      } else {
        ElMessage.info(res.message);
      }
    });
  };
  // 查询采集设备通道change事件
  const chanIdChange = (v: any) => {
    state.oldValAisle = v;
  };

  // 改变选择设备事件(无用)
  const changeTotal = (v: any) => {
    state.facilityInfo = [{ collectChannel: "", observeChannel: "" }];
    if (state.facilityAisleList) {
      state.facilityAisleList.map((item: any) => {
        item.disabled = false;
      });
    }
    if (state.watchAisleListCopy) {
      state.watchAisleListCopy.map((item: any) => {
        item.disabled = false;
      });
    }
    let params = {
      classifyId: v.classifyId,
      deviceId: v.id,
    };
    http.instrumentRegistration.selectHookChannel(params).then((res: any) => {
      if (res.code == 0) {
        if (res.data.length > 0) {
          state.jointArr = [];
          let obj = {};
          res.data.forEach((item: any) => {
            item.disabled = false;
          });
          state.jointArr = res.data;
          if (state.classify_id == 1) {
            state.watchAisleList = state.jointArr;
          } else if (state.classify_id == 2) {
            state.facilityAisleListCopy = state.jointArr;
          }
        } else {
          ElMessage.info("当前设备无挂接通道");
        }
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 设备学科(无用)
  const addDiscipline = () => {
    let params = {
      code: "",
    };
    http.instrumentRegistration.addDiscipline(params).then((res: any) => {
      if (res.code == 0) {
        state.equipmentDisciplineList = res.data;
        state.subjectList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 新增设备测项(无用)
  const changeDevice = (row: any) => {
    let params = {
      code: "",
      tableName: row.tableName,
    };
    http.instrumentRegistration.changeDevice(params).then((res: any) => {
      if (res.code == 0) {
        state.equipmentDeviceList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 编辑设备测项(无用)
  const changeTest = (row: any) => {
    let params = {
      code: "",
      tableName: row.tableName,
    };
    http.instrumentRegistration.changeDevice(params).then((res: any) => {
      if (res.code == 0) {
        state.testList = res.data;
        state.editRow.facilityTest = "";
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 工作方式(无用)
  const addWorkWay = () => {
    let params = {
      code: "",
    };
    http.instrumentRegistration.addWorkWay(params).then((res: any) => {
      if (res.code == 0) {
        state.workWayList = res.data;
        state.workMethodList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 设备来源接口(无用)
  const addSource = () => {
    let params = {
      code: "",
    };
    http.instrumentRegistration.addSource(params).then((res: any) => {
      if (res.code == 0) {
        state.equipmentSourceList = res.data;
        state.sourceList = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };

  // 根据根据参数查询设备类型表(无用)
  const getDeviceTypeList = () => {
    let params = {
      unitId: "",
      stationType: "",
      stationId: "",
    };
    http.instrumentRegistration.getDeviceType(params).then((res: any) => {
      if (res.code == 0) {
        res.data.forEach((item: any) => {
          let obj = {
            label: item.name,
            value: item.id,
          };
          state.equipmentTypeList.push(obj);
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };

  // 查询设备类型id和名字(无用)
  const getSelectIdAndNamenList = () => {
    let params = {
      name: "",
    };
    http.instrumentRegistration.getSelectIdAndNamen(params).then((res: any) => {
      if (res.code == 0) {
        res.data.forEach((item: any) => {
          let obj = {
            label: item.name,
            value: item.id,
          };
          state.equipmentModelList.push(obj);
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 编辑
  const edit = (row: any) => {
    http.instrumentRegistration.getUpdateData(row.inst_id).then((res: any) => {
      if (res.code == 0) {
        state.editShow = true;
        state.title = "编辑";
        let row = res.data;
        state.editRow.device_name = row.name; //设备名称
        state.editRow.device_code = row.code; //设备编码
        state.editRow.device_type = row.instModelId; //设备型号
        state.editRow.desCon = row.description; //设备描述
        state.editRow.netstation = row.networkId; //台网id
        state.editRow.station = row.stationId; //台站id
        state.editRow.detection_point = row.pointId; //测点
        state.editRow.instSn = row.instSn; //安装流水号
        state.editRow.desInstall = row.installDescription; //安装描述
        state.editRow.transferAggrement = row.protocolId; //安装协议
        state.editRow.subnetMask = row.mask; //子网掩码
        state.editRow.ports = row.port; //子网端口
        state.editRow.gateway = row.gateway; //网关
        state.editRow.userName = row.linkUser; //用户名称
        state.editRow.pwd = row.password; //修改密码
        state.editRow.id = row.instId; //修改id
        state.editRow.equipmentFactory = row.producerId; //设备厂家
        state.editRow.cateId = row.cateId; //设备类型  编辑页面中不显示 但要用
        state.editRow.subjectionSubkect = row.subjectId; //学科类型
        devicModelFun({ mfId: state.editRow.cateId }); //设备类型查询设备厂家
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 编辑
  const editConfirm = () => {
    let params = {
      name: state.editRow.device_name, //设备名称
      code: state.editRow.device_code, //设备编码
      instModelId: state.editRow.device_type, //设备型号
      description: state.editRow.desCon, //设备描述
      networkId: state.editRow.netstation, //台网id
      stationId: state.editRow.station, //台站id
      pointId: state.editRow.detection_point, //测点
      instSn: state.editRow.instSn, //安装流水号
      installDescription: state.editRow.desInstall, //安装描述
      protocolId: state.editRow.transferAggrement, //安装协议
      mask: state.editRow.subnetMask, //子网掩码
      port: state.editRow.ports, //子网端口
      gateway: state.editRow.gateway, //网关
      linkUser: state.editRow.userName, //用户名称
      password: state.editRow.pwd, //修改密码
      instId: state.editRow.id, //修改id
      producerId: state.editRow.equipmentFactory, //设备厂家
      cateId: state.editRow.cateId, //设备类型  编辑页面中不显示 但要用
      subjectId: state.editRow.subjectionSubkect, //隶属学科
    };
    http.instrumentRegistration.editDevice(params).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("编辑成功！");
        searchList();
        state.editShow = false;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 删除
  const confirmDelete = (row: any) => {
    let params = {
      cate: row.cate_id,
      instId: row.inst_id,
    };
    http.instrumentRegistration.delDevice(params).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("删除成功！");
        searchList();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  const deleted = () => {};
  // 查询表格参数
  const searchList = () => {
    let params = {
      pageNum: state.pageNum,
      pageSize: state.pageSize,
      name: state.deviceNameSearch,
      network: state.NetIdSearch,
      station: state.stationIdSearch,
      point: state.pointIdSeatch,
      cate: state.deveceType, ////设备类型
    };
    http.instrumentRegistration.getInstrument(params).then((res: any) => {
      if (res) {
        if (res.code == 0) {
          state.total = res.data.total;
          state.linkageData = res.data.list;
          state.linkageData.forEach((item) => {
            item.create_time = utils.formatDate(item.create_time, 0);
          });
        } else {
          ElMessage.info(res.message);
        }
      }
    });
  };

  // 分页
  const pageChange = (val: any) => {
    state.pageNum = val;
    searchList();
  };
  // 分页
  const sizeChange = (val: any) => {
    state.pageSize = val;
    searchList();
  };
  // 新建取消
  const cancel = () => {
    state.showAdd = false;
    state.editShow = false;
    state.detailModal = false;
  };
  // 切换台站同时切换经纬度
  const changeSelect = (item: any) => {
    state.addRow.longitude = item.longitude;
    state.addRow.latitude = item.latitude;
  };
  // 点击详情
  const detail = (row: any) => {
    console.log(row, "row");
    state.title = "详情";
    state.detailModal = true;
    state.addRecordId = row.inst_id;
    queryInfo(row.inst_id); //查询设备信息
    // queryInfo(3148); //查询设备信息
  };
  // 点击添加维修记录
  const addCard = () => {
    state.detailModal = false;
    state.addRecord = true;
    state.title = "新增记录";
  };
  // 关闭新增记录弹框
  const recordCancel = () => {
    state.addRecord = false;
    state.title = "详情";
    state.detailModal = true;
  };
  // 新增记录确认
  const recordConfirm = () => {
    let params = {
      instId: state.addRecordId, //id
      mainType: state.apparatuType, //维护类型
      mainTime: state.apparatuTime, //维护时间
      mainContent: state.apparatuContent, //维护内容
      mainPerson: state.apparatuStaff, //维护人
      mainOgr: state.apparatuOrg, //维修机构
      desc: state.maintainDes, //描述
      dutyPerson: state.bearerPer, //送修人
      mainResult: state.bearerResult, //送修结果
      startTime: state.startMaintainTime, //开始时间
      endTime: state.endMaintainTime, //结束时间
    };
    http.instrumentRegistration.maintenanceInfo(params).then((res: any) => {
      if (res.code == 0) {
        state.title = "详情";
        state.addRecord = false;
        state.detailModal = true;
        queryInfo(state.addRecordId);
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 根据设备id查询信息
  const queryInfo = (id: any) => {
    let params = {
      InstId: id,
    };
    http.stationsInfoManage.queryInfo(params).then((res: any) => {
      if (res.code == 0) {
        if (res.data.install) {
          state.installList = res.data.install; //安装
          state.installList.map((item: any) => {
            if (item.status == 1) {
              item.state = "生效";
            } else {
              item.state = "失效";
            }
          });
        }
        if (res.data.keep) {
          state.keepList = res.data.keep; //维护
          state.keepList.map((item: any) => {
            if (item.mainType == 1) {
              item.type = "上线";
            } else if (item.mainType == 2) {
              item.type = "维修";
            } else {
              item.type = "下线";
            }
          });
        }
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  return {
    state,
    resentData,
    getProvince,
    networkChange,
    getStations,
    sysopChange,
    getPoint,
    radioChange,
    addAisle,
    nextSelete,
    upcollection,
    nextcollection,
    upThreeWith,
    nextThreeWith,
    upSure,
    nextSure,
    addInstrument,
    deviceTypeFun,
    getEquipmentFactory,
    equipmentFactoryChange,
    devicModelFun,
    getNetListFun,
    netstationChange,
    stationChange,
    getStationList,
    getPointList,
    queryProtocol,
    getJulist,
    deviceList,
    facilityChange,
    chanIdChange,
    edit,
    editConfirm,
    confirmDelete,
    searchList,
    pageChange,
    sizeChange,
    cancel,
    changeSelect,
    delAisle,
    pointIdChange,
    detail,
    addCard,
    recordCancel,
    recordConfirm,
  };
};
