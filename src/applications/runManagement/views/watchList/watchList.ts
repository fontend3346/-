import { onMounted, ref, reactive, getCurrentInstance } from "vue";
import http from "@/api/index";
import store from "@/store";
import { ElMessage } from "element-plus";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
export const useHandler = () => {
  const state = reactive({
    tableEditDate: "", //替换日期
    tableEditType: "", //替换类型
    tableEditId: "", //人id
    tablePeopleList: [
      {
        id: "",
        name: ""
      }
    ], //换班人员数组
    tablereplaceValue: "", //替班人员
    tablechangePeople: "", //换班人员
    tableDate: "", //时间
    tableradioValue: 1, ////列表替班换班弹框
    radioValue: 1,
    tableModalShow: false, //列表替班换班弹框显隐
    dutyOnType: "", //换班值班类型
    dutyReplaceType: "", //替班值班类型
    userType: null, //用户类型
    userJurisdiction: {}, //用户权限
    selectionList: [], //选中数据
    weekList: [2, 3, 4, 5, 6], //值班日期数组
    startWeek: "", //开始星期
    endWeek: "", //结束星期
    startTimeDuty: "", //值班开始时间
    endTimeDuty: "", //值班结束时间
    showNetWork: true, //用户值班权限为台网
    changePeopleValue: "", //选择被换班人员
    changePeopleValue1: "", //选择换班人员
    beReplaceValue: "", //被替班人员
    beReplaceValueId: "",
    replaceValue: "", //替班人员
    shiftChanged: "", //被换班
    thisDate: <any>{}, //当前日期信息
    thisContent: <any>{}, //当前日志新消息
    // netWorkValue: "", //权限为台网时当前台网
    netWorkInput: "", //用户为台网禁用的输入框内容
    netWorkSiteValue: "", //权限为台网时当前站点
    currentSite: "", //权限为台站时当前站点
    netWotkList: [], //权限为台网时当前台网数据
    netWorkCurrentSiteList: [], //权限为台网时当前站点数据
    currentSiteList: [], //权限为台站时当前站点数据
    title: "详情", //新建
    oneDayTitle: "替换班弹框", //某一天弹框的标题
    elseTex: "日报查看",
    dateData: {}, //详情弹框内容
    allDateContent: [], //日历数据
    showDetails: false, //详情显隐
    detailsData: <any>{}, //详情弹框内容
    showAdd: false, //新建显隐
    showOneDay: false, //单击某一天的弹框
    addData: <any>{}, //新建弹框内容
    watchPersonList: [], //所有可选人员
    selectMainPerson: [], //目前选中主班人员
    selectStandbyPerson: [], //目前选中备班人员
    isAdd: false, //人员总列表选择器
    currentType: "", //区分选择人员列表为主班 / 备班
    watchTimeType: '2', //值班日排班规则
    watchTimeList: [
      { label: "星期一", checked: false, value: 1 },
      { label: "星期二", checked: false, value: 2 },
      { label: "星期三", checked: false, value: 3 },
      { label: "星期四", checked: false, value: 4 },
      { label: "星期五", checked: false, value: 5 },
      { label: "星期六", checked: false, value: 6 },
      { label: "星期日", checked: false, value: 7 },
    ],
    isManual: false, //是否手动选择排班时间
    isBrowse: false, //是否显示预览框
    workType: null,
    browsecolumns: [
      {
        prop: "date",
        label: "日期",
      },
      {
        prop: "mainPerson",
        label: "主班人员",
      },
      {
        prop: "standbyPerson",
        label: "备班人员",
      },
    ], //预览表头
    browseData: [], //预览表格内容
    pageSize: 10,
    pageNum: 1,
    totalTable: 10,
    pageSizeTable: 10,
    pageNumTable: 1,
    changeWorkValue: true,
    showCalender: true,
    rosteringValue: false, //排班，替换，删除导入等功能是否禁用
    dutyTime: "", //开始 截止 时间
    dynamicBtnName: [
      { value: "换班", label: "替班" },
      { value: "替班", label: "替班" },
    ], //动态按钮名
    netId: "", //台网id
    stationId: "", //台站id
    selectPeopleValue: [], //被选中主班人员
    selectPeopleId: [], //被选中主班人员id
    selectSpareValue: [], //被选中主班人员
    selectSpareId: [], //被选中主班人员id
    changePeopleArr: [
    ], //被换班人员数组
    changePeopleList: [
    ], //换班人员数组
    beReplaceArr: [
    ], //被替班人员数组
    replaceArr: [
    ], //替班人员数组
    PeopleArr: [],
    beChangeDate: "",
    currentContent: undefined,
    oneDateValue: "", //换班日期
    dateValue: "", //表格中的时间选择器
    previewDateValue: "", //三角形-预览日期
    mainPeopel: "", //三角形-预览主班人员
    standbyPeopel: "", //三角形-预览备班人员
    previewContent: "", //日志内容
    files: null,
    rowIndexArrOne: [], //处理后第一行数据
    rowIndexArrTwo: [], //处理后第二行数据
    mergeTable: [],
    titleWrap: "替班换班", //
    mergeTableColumns: [
      {
        prop: "dutyDate",
        label: "日期",
      },
      {
        prop: "dutyTypeName",
        label: "班次",
      },
      {
        prop: "dutyName",
        label: "值班人员",
      },
      {
        prop: "phoneNumber",
        label: "电话号码",
      },
    ],
    changePeopleValueId: "",
    sidebarValue: false, //侧边栏是否收起
    mainPeople: [], //合并主班人员
    standbyPeople: [], //合并备班人员
  });
  interface User {
    dutyDate: string;
    dutyTypeName: string;
    dutyName: string;
    phoneNumber: string;
  }
  interface SpanMethodProps {
    row: User;
    column: TableColumnCtx<User>;
    rowIndex: number;
    columnIndex: number;
  }
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  onMounted(() => {
    // 判断是台网还是台站
    judgmentStatus();
  });
  const objectSpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex,
  }: SpanMethodProps) => {
    if (columnIndex === 0) {
      if (state.rowIndexArrOne.includes(rowIndex)) {
        return {
          rowspan:
            state.rowIndexArrOne[state.rowIndexArrOne.indexOf(rowIndex) + 1] -
            rowIndex,
          colspan: 1,
        };
      } else {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    } else if (columnIndex === 1) {
      if (state.rowIndexArrTwo.includes(rowIndex)) {
        return {
          rowspan:
            state.rowIndexArrTwo[state.rowIndexArrTwo.indexOf(rowIndex) + 1] -
            rowIndex,
          colspan: 1,
        };
      } else {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    }
  };
  // 处理表格数据
  const getRow = () => {
    let resOne = state.mergeTable;
    let resTwo = state.mergeTable;
    state.rowIndexArrOne = [];
    state.rowIndexArrTwo = [];
    //获取到数据后，处理第一列
    resOne.reduce((result: any, currentVal: any, currentIndex: any) => {
      if (result == 0 || result != currentVal.dutyDate) {
        state.rowIndexArrOne.push(currentIndex);
      }
      return currentVal.dutyDate;
    }, 0);
    state.rowIndexArrOne.push(resOne.length);
    //获取到数据后，处理第二列
    resTwo.reduce((result: any, currentVal: any, currentIndex: any) => {
      if (result == 0 || result != currentVal.dutyType) {
        state.rowIndexArrTwo.push(currentIndex);
      }
      return currentVal.dutyType;
    }, 0);
    state.rowIndexArrTwo.push(resTwo.length);
  };
  // let radioValue = ref(1);
  const oneDateValue = ref(new Date());
  const oneDateChange = (data: any) => {
    state.PeopleArr.map((item: any) => {
      if (item.dutyDate == dateFormat(data)) {
        state.changePeopleList.push(item.main[0], item.standby[0]);
      }
    });
    state.oneDateValue = dateFormat(data);
  };
  const dateChange = () => { };
  //预览时间选择器改变事件
  const previewDateChange = (date: any) => {
    let newId = "";
    // 输入框有值
    if (state.netWorkSiteValue) {
      newId = state.netWorkSiteValue;
    } else if (state.userType == 1 && state.netWorkCurrentSiteList.length > 0) {
      // 台网登录
      newId = state.netWorkCurrentSiteList[0].id;
    } else if (state.userType == 2 && state.netWorkCurrentSiteList.length > 0) {
      // 台站登录
      newId = state.netWorkCurrentSiteList[0].unitId;
    }
    let params = {
      date: dateFormat(state.previewDateValue),
      stationId: newId, //台站id
    };
    http.watchList.getRoster(params).then((res: any) => {
      state.previewContent = res.data[0].content;
      state.mainPeopel = res.data[0].main[0].name;
      state.standbyPeopel = res.data[0].standby[0].name;
    });
  };
  //动态按钮方法
  const dynamicBtn = (row: any, index: any, item: any) => { };
  //点击单选按钮替班、换班
  const radioChange = (v: any) => {
    if (v == "2") {
      queryPeople();
    }
    state.changeWorkValue = !state.changeWorkValue;
  };
  const changeCalendar = () => {
    state.showCalender = true;
  };
  const changeTable = () => {
    state.showCalender = false;
    getRosterTable();
  };
  //获取上传文件
  const httpRequestUpload = (item: any) => { };
  const upload = ref<UploadInstance>();
  // 上传事件
  const onChangeM = (file: any) => {
    state.files = new FormData();
    state.files.append("file", file.raw);
    if (file.status == "ready") {
      upload.value.submit();
      http.watchList.importRoster(state.files).then((res: any) => {
        if (res.code == 200) {
          ElMessage.success("上传成功");
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  };
  //点击排班按钮
  const rostering = () => {
    state.addData.day = "";
    state.selectMainPerson = [];
    state.addData.mainEvery = "";
    state.selectStandbyPerson = [];
    state.addData.standbyEvery = "";
    state.watchTimeType = '2';
    state.addData.watchTime = [];
    state.showAdd = true;
    state.addData.mainShift = [];
    state.watchPersonList = [];
    state.weekList = [2, 3, 4, 5, 6];
    queryPeople();
  };
  //查询所有人员名单
  const queryPeople = () => {
    let params = {}
    if (state.userType == 1) {
      params = {
        unitId: state.netWotkList[0].unitId,
      };
    } else {
      params = {
        stationId: state.netWorkSiteValue,
      };
    }

    http.watchList.queryPeople(params).then((res: any) => {
      if (res.code == 0) {
        res.data.map((item: any) => {
          state.watchPersonList.push({
            key: item.name,
            label: item.name,
            id: item.id,
          });
        });
        state.replaceArr = res.data;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //复选框选中
  const onSelectionChange = (selection: any) => {
    state.selectionList = selection;
  };
  //导出
  const exportList = () => {
    exportRoster();
  };
  //点击单元格 查看详情
  const toDetails = (data: any, currentContent: any) => {
    let date1 = new Date(data.day).getTime();
    let date2 = new Date().getTime();
    state.beChangeDate = data.day;
    state.currentContent = currentContent;
    if (date1 < date2 - 86400000) {
      ElMessage.info("今天日期之前不可进行替换班");
      state.sidebarValue = true;
      browseModel();
    } else {
      state.radioValue = 1;
      if (state.netWorkSiteValue && state.userType == 1) {
        state.sidebarValue = true;
        ElMessage.info("当前用户没有替班换班权限");
        browseModel();
      } else {
        state.showOneDay = true;
      }
      state.PeopleArr.map((item: any) => {
        if (item.standby && item.main) {
          item.main[0] = Object.assign({}, item.main[0], { type: 1 });
          item.standby[0] = Object.assign({}, item.standby[0], { type: 2 });
          if (data.day == item.dutyDate) {
            state.changePeopleArr.push(item.main[0], item.standby[0]);
            state.beReplaceArr.push(item.main[0], item.standby[0]);
          }
        }
      });
    }
  };
  const changePeople = (row: any) => {
    state.changePeopleValue = row.name;
    state.dutyOnType = row.type;
    state.changePeopleValueId = row.id;
  };
  const replacePeople = (row: any) => {
    state.beReplaceValue = row.name;
    state.dutyReplaceType = row.type;
    state.beReplaceValueId = row.id;
  };
  //确认查看 详情
  const detailsConfirm = () => {
    state.showDetails = false;
  };
  //编辑方法
  const toEdit = () => {
    state.title = "编辑";
    state.showAdd = true;
    state.addData = {};
    state.addData.day = [state.thisDate.date, state.thisDate.date];
    state.selectMainPerson = state.thisContent.mainShift;
    state.selectStandbyPerson = state.thisContent.standbyShift;
  };
  //点击加号，遍历数组改变默认选中人员
  const addMainShift = (val: any) => {
    if (val == 1) {
      state.currentType = "main";
      state.addData.mainShift = []; //目前表格里的人员赋值给穿梭框绑定值
    } else {
      state.currentType = "standby";
      state.addData.mainShift = [];
    }
    state.isAdd = true;
  };
  //选择人员change事件
  const changeSelect = (item: any) => {
    if (state.currentType == "main") {
      state.selectPeopleValue = item;
    } else if (state.currentType == "standby") {
      state.selectSpareValue = item;
    }
  };
  //确认选择的人
  const confirmSelect = () => {
    if (state.addData.mainShift) {
      if (state.currentType == "main") {
        state.watchPersonList.map((item: any) => {
          state.selectPeopleValue.map((e) => {
            if (item.key == e) {
              state.selectPeopleId.push(item.id);
            }
          });
        });
        state.selectMainPerson = state.addData.mainShift;
      } else if (state.currentType == "standby") {
        state.watchPersonList.map((item: any) => {
          state.selectSpareValue.map((e) => {
            if (item.key == e) {
              state.selectSpareId.push(item.id);
            }
          });
        });
        state.selectStandbyPerson = state.addData.mainShift;
      }
    }
    state.isAdd = false;
  };
  //选择排班类型
  const changeTimeType = (item: any) => {
    state.addData.watchTime = [];
    state.workType = item;
    state.isManual = false;
    state.weekList = []
    if (item == 1) {
      state.isManual = true;
    } else if (item == 2) {
      state.weekList = [2, 3, 4, 5, 6]
    } else if (item == 3) {
      state.weekList = [1, 7]
    }
  };
  //手动选择排班日期
  const changeWatchTime = (item: any) => {
    state.weekList = []
  };
  //预览按钮
  const browse = () => {
    // state.browseData = [];
    state.addData.watchTime.map((item: any) => {
      if (item == "星期一") {
        state.weekList.push(2);
      } else if (item == "星期二") {
        state.weekList.push(3);
      } else if (item == "星期三") {
        state.weekList.push(4);
      } else if (item == "星期四") {
        state.weekList.push(5);
      } else if (item == "星期五") {
        state.weekList.push(6);
      } else if (item == "星期六") {
        state.weekList.push(7);
      } else if (item == "星期日") {
        state.weekList.push(1);
      }
    });
    state.startTimeDuty = dateFormat(state.addData.day[0]);
    state.endTimeDuty = dateFormat(state.addData.day[1]);
    // generateRoster();
    previewRoster();
    state.isBrowse = true;
    //接口
  };
  //替换班弹框中的预览按钮
  const browseModel = () => {
    state.mainPeopel = "";
    state.standbyPeopel = "";
    state.previewContent = "";
    if (state.currentContent == undefined) {
      // ElMessage.info("该日期排班信息为空");
    } else {
      state.sidebarValue = true;
      let newId = ""; //当用户为台网，未选择站点时传的参数
      let newIdStation = "";
      if (state.netWorkSiteValue == "" && state.userType == 1) {
        newId = state.netWotkList[0].unitId;
      } else if (state.netWorkSiteValue && state.userType == 1) {
        newIdStation = state.netWorkSiteValue;
      } else if (state.netWorkSiteValue == "" && state.userType == 2) {
        newIdStation = state.netWorkCurrentSiteList[0].unitId;
      } else if (state.netWorkSiteValue && state.userType == 2) {
        newIdStation = state.netWorkSiteValue;
      }
      let params = {
        date: state.beChangeDate,
        stationArrayId: newId, //台网
        stationId: newIdStation, //台站
      };
      http.watchList.getRoster(params).then((res: any) => {
        if (res.code == 200) {
          res.data[0].main.map((item: any) => {
            state.mainPeopel = state.mainPeopel + item.name + ",";
          });
          res.data[0].standby.map((item: any) => {
            state.standbyPeopel = state.standbyPeopel + item.name + ",";
          });
          state.previewContent = res.data[0].content;
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  };
  //确认浏览
  const confirmBrowse = () => {
    state.isBrowse = false;
  };
  // 时间转化
  const dateFormat = (dateData: any) => {
    var date = new Date(dateData);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    const time = y + "-" + m + "-" + d;
    return time;
  };
  //生成排班表
  const generateRoster = () => {
    let newId = ""; //当用户为台网，未选择站点时传的参数
    let newIdStation = "";
    if (state.netWorkSiteValue == "" && state.userType == 1) {
      newId = state.netWotkList[0].unitId;
    } else if (state.netWorkSiteValue == "" && state.userType == 2) {
      newIdStation = state.netWorkCurrentSiteList[0].unitId;
    } else if (state.netWorkSiteValue && state.userType == 2) {
      newIdStation = state.netWorkSiteValue;
    }
    let params = {
      dutyDay: state.weekList, //值班日:1~7:周日~周六
      dutyStaffIds: state.selectPeopleId, //主班人员
      dutyStaffNum: state.addData.mainEvery, //主班值班人数
      endTime: state.endTimeDuty, //结束时间
      reserveStaffIds: state.selectSpareId, //备班人员
      reserveStaffNum: state.addData.standbyEvery, //备班值班人数
      startTime: state.startTimeDuty, //开始时间
      stationArrayId: newId, //台网id
      stationId: newIdStation, //台站id
    };
    http.watchList.generateRoster(params).then((res: any) => {
      if (res.code == 200) {
        //当站点输入框没有值时，获取排班表传参为台网id
        let param = {
          stationArrayId: newId, //台站id
          stationId: newIdStation,
        };
        getRoster(param);
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //获取排班表
  const getRoster = (params: any) => {
    http.watchList.getRoster(params).then((res: any) => {
      if (res.code == 200) {
        state.PeopleArr = res.data;
        res.data.map((item: any) => {
          state.mainPeople = [];
          state.standbyPeople = [];
          if (item.main) {
            item.main.map((_item: any) => {
              state.mainPeople.push(_item.name);
            });
          }
          item.mainPeople = state.mainPeople.toString();
          if (item.standby) {
            item.standby.map((v: any) => {
              state.standbyPeople.push(v.name);
            });
            item.standbyPeople = state.standbyPeople.toString();
          } else {
            item.standbyPeople = "";
          }
          state.allDateContent.push({
            date: item.dutyDate,
            content: {
              mainShift: item.mainPeople,
              standbyShift: item.standbyPeople,
            },
          });
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //获取排班表(表格)
  const getRosterTable = () => {
    let newId = ""; //当用户为台网，未选择站点时传的参数
    let newIdStation = "";
    if (state.netWorkSiteValue == "" && state.userType == 1) {
      newId = state.netWotkList[0].unitId;
    } else if (state.netWorkSiteValue && state.userType == 1) {
      newIdStation = state.netWorkSiteValue;
    } else if (state.netWorkSiteValue == "" && state.userType == 2) {
      newIdStation = state.netWorkCurrentSiteList[0].unitId;
    } else if (state.netWorkSiteValue && state.userType == 2) {
      newIdStation = state.netWorkSiteValue;
    }
    let params = {
      pageNum: state.pageNumTable,
      pageSize: state.pageSizeTable,
      stationArrayId: newId, //台网id
      stationId: newIdStation, //台站id
    };
    http.watchList.getRosterTable(params).then((res: any) => {
      if (res.code == 200) {
        state.mergeTable = res.data.date;
        state.mergeTable.map((item: any) => {
          if (item.dutyType == 1) {
            item.dutyTypeName = "主班";
          } else if (item.dutyType == 2) {
            item.dutyTypeName = "备班";
          }
        });
        state.totalTable = res.data.total;
        getRow();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 点击事件获取换班人员
  const tableDateChange = (data: any) => {
    state.tablePeopleList = [];
    state.PeopleArr.map((item: any) => {
      if (item.dutyDate == dateFormat(data)) {
        state.tablePeopleList.push(item.main[0], item.standby[0]);
      }
    });
  };
  // 点击获取替班人员
  const tableChangeRadio = (v: any) => {
    state.replaceArr = [];
    if (v == "2") {
      queryPeople();
    }
  };
  // 列表-替班换班-取消
  const tableCancelModal = () => {
    state.tableModalShow = false;
  };
  // 列表-替班换班-确定
  const tableConfirmModal = () => {
    let newId = ""; //当用户为台网，未选择站点时传的参数
    let newIdStation = "";
    if (state.netWorkSiteValue == "" && state.userType == 1) {
      newId = state.netWotkList[0].unitId;
    } else if (state.netWorkSiteValue == "" && state.userType == 2) {
      newIdStation = state.netWorkCurrentSiteList[0].unitId;
    } else if (state.netWorkSiteValue && state.userType == 2) {
      newIdStation = state.netWorkSiteValue;
    }
    if (state.tableradioValue == 1) {
      let params = {
        dutyDate: state.tableEditDate, //操作日期
        dutyId: state.tableEditId, //操作人员id
        dutyReplaceDate: dateFormat(state.tableDate), //换班日期
        dutyType: state.tableEditType, //值班类型
        replaceId: state.tablechangePeople, //替换班人员id
        stationArrayId: newId, //台网id
        stationId: newIdStation, //台站id
      };
      http.watchList.replaceRoster(params).then((res: any) => {
        if (res.code == 200) {
          state.tableModalShow = false;
          ElMessage.success(res.message);
          getRosterTable();
        } else {
          ElMessage.error(res.message);
        }
      });
    } else if (state.tableradioValue == 2) {
      let params = {
        dutyDate: state.tableEditDate, //操作日期
        dutyId: state.tableEditId, //操作人员id
        dutyType: state.tableEditType, //值班类型
        replaceId: state.tablereplaceValue, //替换班人员id
        stationArrayId: newId, //台网id
        stationId: newIdStation, //台站id
      };
      http.watchList.replaceRoster(params).then((res: any) => {
        if (res.code == 200) {
          state.tableModalShow = false;
          ElMessage.success(res.message);
          getRosterTable();
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  };
  // 列表-替班换班
  const handleEdit = (row: any) => {
    // state.userJurisdiction = JSON.parse(store.state.user.roleInfo);
    // if (state.userJurisdiction.level == 3) {
    if (state.netWorkSiteValue && state.userType == 1) {
      ElMessage.info("当前用户没有替班换班权限");
    } else {
      state.tableEditDate = row.dutyDate; //日期
      state.tableEditType = row.dutyType; //类型
      state.tableEditId = row.dutyId; //人id
      state.tableModalShow = true;
      state.tableradioValue = 1;
      state.tableDate = "";
      state.tablechangePeople = "";
      state.tablereplaceValue = "";
      state.tablePeopleList = [];
      state.replaceArr = [];
    }
    // }else {
    //   ElMessage.info("当前用户没有替班换班权限");
    // }
  };
  // 删除
  const handleDelete = (row: any) => {
    // state.userJurisdiction = JSON.parse(store.state.user.roleInfo);
    // if (state.userJurisdiction.level == 3) {
    if (state.netWorkSiteValue && state.userType == 1) {
      ElMessage.info("当前用户没有删除权限");
    } else {
      let id = row.id;
      http.watchList.deleteRoster(id).then((res: any) => {
        if (res.code == 200) {
          ElMessage.success("删除成功");
          getRosterTable();
          getRow();
        } else {
          ElMessage.error(res.message);
        }
      });
    }
    //  }else {
    //   ElMessage.info("当前用户没有删除权限");
    // }
  };
  //取消换班按钮
  const cancelChangeShift = () => {
    state.changePeopleArr = [];
    state.beReplaceArr = [];
    state.showOneDay = false;
    state.oneDateValue = "";
    state.changePeopleValue = "";
    state.changePeopleValue1 = "";
    state.beReplaceValue = "";
    state.replaceValue = "";
    // state.PeopleArr = [];
  };
  //换班
  const replaceRoster = () => {
    let newId = ""; //当用户为台网，未选择站点时传的参数
    let newIdStation = "";
    if (state.netWorkSiteValue == "" && state.userType == 1) {
      newId = state.netWotkList[0].unitId;
    } else if (state.netWorkSiteValue == "" && state.userType == 2) {
      newIdStation = state.netWorkCurrentSiteList[0].unitId;
    } else if (state.netWorkSiteValue && state.userType == 2) {
      newIdStation = state.netWorkSiteValue;
    }
    let params = {
      dutyDate: state.beChangeDate, //操作日期
      dutyId: state.changePeopleValueId, //操作人员id
      dutyReplaceDate: state.oneDateValue, //换班日期
      dutyType: state.dutyOnType, //值班类型
      replaceId: state.changePeopleValue1, //替换班人员id
      stationArrayId: newId, //台网id
      stationId: newIdStation, //台站id
    };
    http.watchList.replaceRoster(params).then((res: any) => {
      if (res.code == 200) {
        let params = {
          stationArrayId: newId, //台网id
          stationId: newIdStation, //台站id
        };
        getRoster(params);
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //替班
  const replaceRoste = () => {
    let newId = ""; //当用户为台网，未选择站点时传的参数
    let newIdStation = "";
    if (state.netWorkSiteValue == "" && state.userType == 1) {
      newId = state.netWotkList[0].unitId;
    } else if (state.netWorkSiteValue == "" && state.userType == 2) {
      newIdStation = state.netWorkCurrentSiteList[0].unitId;
    } else if (state.netWorkSiteValue && state.userType == 2) {
      newIdStation = state.netWorkSiteValue;
    }
    let params = {
      dutyDate: state.beChangeDate, //操作日期
      dutyId: state.beReplaceValueId, //操作人员id
      // dutyReplaceDate: state.oneDateValue, //换班日期
      dutyType: state.dutyReplaceType, //值班类型
      replaceId: state.replaceValue, //替换班人员id
      stationArrayId: newId, //台网id
      stationId: newIdStation, //台站id
    };
    http.watchList.replaceRoster(params).then((res: any) => {
      if (res.code == 200) {
        let params = {
          stationArrayId: newId, //台网id
          stationId: newIdStation, //台站id
        };
        getRoster(params);
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //排班信息预览
  const previewRoster = () => {
    let newId = "";
    let newIdStation = "";
    if (state.userType == 1) {
      newId = state.netWotkList[0].unitId;
    } else {
      newIdStation = state.netWorkCurrentSiteList[0].unitId;
    }

    let params = {
      dutyDay: state.weekList, //值班日:1~7:周日~周六
      dutyStaffIds: state.selectPeopleId, //主班人员
      dutyStaffNum: state.addData.mainEvery, //主班值班人数
      endTime: state.endTimeDuty, //结束时间
      reserveStaffIds: state.selectSpareId, //备班人员
      reserveStaffNum: state.addData.standbyEvery, //备班值班人数
      startTime: state.startTimeDuty, //开始时间
      stationArrayId: newId, //台网id
      stationId: newIdStation, //台站id
      pageNum: 1,
      pageSize: 100,
    };
    http.watchList.previewRoster(params).then((res: any) => {
      state.browseData = [];
      if (res.code == 200) {
        // state.browseData = res.data;
        res.data.map((item: any) => {
          state.browseData.push({
            date: dateFormat(item.date),
            mainPerson: item.mainPerson,
            standbyPerson: item.standbyPerson,
          });
        });
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //导出排班表
  const exportRoster = () => {
    let newId = "";
    let newIdStation = "";
    // 输入框有值
    if (state.netWorkSiteValue) {
      newIdStation = state.netWorkSiteValue;
    } else if (state.userType == 1 && state.netWorkCurrentSiteList.length > 0) {
      // 台网登录
      newId = state.netWotkList[0].unitId;
    } else if (state.userType == 2 && state.netWorkCurrentSiteList.length > 0) {
      // 台站登录
      newIdStation = state.netWorkCurrentSiteList[0].unitId;
    }
    let params = {
      station: newIdStation,
      stationArrayId: newId,
    };
    http.watchList.exportRoster(params).then((res: any) => {
      ElMessage.success("导出成功");
      let data = res;
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      const name = new Date().getTime();
      link.setAttribute("download", "值班表" + ".xlsx"); // 需要文件名字
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); //下载完成移除元素
      window.URL.revokeObjectURL(url); //释放掉blob对象
    });
  };
  const querystations = (params: any) => {
    http.stationsInfoManage.getStationsEarth(params).then((res: any) => {
      if (res.code == 0) {
        state.netWorkCurrentSiteList = res.data;
        if (state.netWorkValue == "") {
          let newstationsId = "";
          newstationsId = state.netWorkCurrentSiteList[0].id;
          let params = {
            pageNum: 1,
            pageSize: 100,
            stationId: newstationsId, //台站id
          };
          getRoster(params);
        }
      } else {
        ElMessage({
          message: res.message,
          type: "error",
        });
      }
    });
  };
  const selectNetWork = (row: any) => {
    let netId = "";
    if (state.netWorkValue) {
      netId = state.netWorkValue;
    } else {
      netId = state.netWotkList[0].unitId; //默认台网第一个
    }
    let params = {
      unitId: netId,
    };
    querystations(params);
  };
  const netWorkStation = (row: any) => {
    state.allDateContent = [];
    let newId = "";
    let newIdStation = "";
    if (state.netWorkSiteValue && state.userType == 1) {
      newIdStation = state.netWorkSiteValue;
    } else if (state.netWorkSiteValue == "" && state.userType == 1) {
      newId = state.netWotkList[0].unitId;
    } else if (state.netWorkSiteValue == "" && state.userType == 2) {
      newIdStation = state.netWorkCurrentSiteList[0].unitId;
    } else if (state.netWorkSiteValue && state.userType == 2) {
      newIdStation = state.netWorkSiteValue;
    }
    let params = {
      stationArrayId: newId, //台网
      stationId: newIdStation, //台站
    };
    getRoster(params);
    // 列表
    getRosterTable();
    if (state.netWorkSiteValue && state.userType == 1) {
      state.rosteringValue = true; //禁用排班等功能
    } else {
      state.rosteringValue = false;
    }
  };
  //确认新建 / 编辑
  const addConfirm = () => {
    let date1 = new Date(state.addData.day[0]).getTime();
    let date2 = new Date(state.addData.day[1]).getTime();
    let date3 = new Date().getTime();
    if (date1 < date3 - 86400000 || date2 < date3 - 86400000) {
      ElMessage.info("该日期不能进行排班");
    } else {
      if (state.selectPeopleId.length > 0) {
        if (state.workType == 1) {
          state.addData.watchTime.map((item: any) => {
            if (item == "星期一") {
              state.weekList.push(2);
            } else if (item == "星期二") {
              state.weekList.push(3);
            } else if (item == "星期三") {
              state.weekList.push(4);
            } else if (item == "星期四") {
              state.weekList.push(5);
            } else if (item == "星期五") {
              state.weekList.push(6);
            } else if (item == "星期六") {
              state.weekList.push(7);
            } else if (item == "星期日") {
              state.weekList.push(1);
            }
          });
        }
        if (state.workType == null) {
          state.weekList = [1, 2, 3, 4, 5, 6, 7];
        }
        state.startTimeDuty = dateFormat(state.addData.day[0]);
        state.endTimeDuty = dateFormat(state.addData.day[1]);
        generateRoster();
        state.showAdd = false;
      } else {
        ElMessage.info("未选择主班人员");
      }
    }
  };
  //换班替班确认弹框
  const addEveryDay = () => {
    if (state.changeWorkValue) {
      replaceRoster(); //换班
    } else {
      replaceRoste(); //替班
    }
    state.changePeopleArr = [];
    state.beReplaceArr = [];
    state.showOneDay = false;
    state.oneDateValue = "";
    state.changePeopleValue = "";
    state.changePeopleValue1 = "";
    state.beReplaceValue = "";
    state.replaceValue = "";
    state.PeopleArr = [];
  };

  // 查询 （不要接收参数
  const searchList = () => { };
  // 分页
  const pageChangeTable = (i: any) => {
    state.pageNumTable = i;
    getRosterTable();
    getRow();
  };
  // 分页
  const sizeChangeTable = (i: any) => {
    state.pageSizeTable = i;
    getRosterTable();
    getRow();
  };
  //三角形按钮
  const triangleBtn = () => {
    state.sidebarValue = false;
  };
  // 判断是台网还是台站
  const judgmentStatus = () => {
    if (store.state.user.stationInfo) {
      state.userType = JSON.parse(store.state.user.stationInfo)[0].userType;
    }
    //如果登录的是台网
    if (state.userType == 1) {
      state.netWotkList = JSON.parse(store.state.user.stationInfo);
      if (state.netWotkList.length > 0) {
        state.netWorkInput = state.netWotkList[0].unitName;
        let params = {
          stationArrayId: state.netWotkList[0].unitId,
        };
        getRoster(params);
        let param = {
          networkId: state.netWotkList[0].unitId,
        };
        querystations(param); //通过台网查询台站
      } else {
        ElMessage.error("暂无台网数据");
      }
      //如果登录的是台站
    } else if (state.userType == 2) {
      state.netWorkCurrentSiteList = JSON.parse(store.state.user.stationInfo);
      state.netWorkSiteValue = state.netWorkCurrentSiteList[0].unitId
      let params = {
        stationId: state.netWorkCurrentSiteList[0].unitId,
      };
      getRoster(params);
      //如果登录没用户
    } else if (state.userType) {
      state.netWorkCurrentSiteList = [];
    }
  };
  return {
    state,
    judgmentStatus,
    triangleBtn,
    sizeChangeTable,
    pageChangeTable,
    searchList,
    addEveryDay,
    addConfirm,
    netWorkStation,
    selectNetWork,
    querystations,
    exportRoster,
    previewRoster,
    replaceRoste,
    replaceRoster,
    cancelChangeShift,
    handleDelete,
    handleEdit,
    tableConfirmModal,
    tableCancelModal,
    tableChangeRadio,
    tableDateChange,
    getRosterTable,
    getRoster,
    generateRoster,
    dateFormat,
    confirmBrowse,
    browseModel,
    browse,
    changeWatchTime,
    changeTimeType,
    confirmSelect,
    changeSelect,
    addMainShift,
    toEdit,
    detailsConfirm,
    replacePeople,
    changePeople,
    toDetails,
    exportList,
    onSelectionChange,
    queryPeople,
    rostering,
    onChangeM,
    httpRequestUpload,
    upload,
    changeTable,
    changeCalendar,
    radioChange,
    dynamicBtn,
    previewDateChange,
    dateChange,
    oneDateChange,
    oneDateValue,
    getRow,
    objectSpanMethod,
  };
};
