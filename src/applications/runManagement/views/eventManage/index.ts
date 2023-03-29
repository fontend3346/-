import http from "@/api/index";
// import md5 from "js-md5";
import { ElMessage } from "element-plus";
import {
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  nextTick,
  ref,
} from "vue";
import * as echarts from "echarts";
let equipmentVal = ref(""); //设备类型
export const useHandler = () => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  // 返回
  //echarts图
  let warnGrade = ref(""); //
  let facilityId = ref(null); //设备id
  let waveOptions: any = reactive({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        animation: false,
        // transitionDuration: 0, //[defaule:0.4] echart防止tooltip的抖动
        label: {
          backgroundColor: "#1891FF",
          color: "#98dcff",
        },
      },
    },
    color: "#1891FF",
    grid: {
      left: "3%",
      right: "8%",
      bottom: "10%",
      top: "16%",
      containLabel: true,
    },
    lineStyle: {
      width: 4,
    },
    areaStyle: {},
    xAxis: {
      type: "category",
      //刻度线
      axisTick: false,
      data: [],
      name: "时间",
      nameTextStyle: {
        padding: [0, 0, 200, 0], // 上右下左与原位置距离
        color: "#98dcff",
      },
      axisLine: {
        show: true,
        onZero: false, //不在y轴的零刻度线
        lineStyle: {
          color: "#98dcff",
        },
      },
      axisLabel: {
        show: false,
        textStyle: {
          color: "#98dcff",
        },
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      // name: "数量",
      // nameLocation: "left",
      nameTextStyle: {
        // padding: [0, 0, 80, -10], // 上右下左与原位置距离
        color: "#98dcff",
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#98dcff",
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#98dcff",
        },
      },
      splitNumber: 10,
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        type: "line",
        data: [],
        name: "",
        symbol: "none",
        itemStyle: {
          normal: {
            label: {
              show: false, // 在折线拐点上显示数据
            },
            lineStyle: {
              width: 5, // 设置虚线宽度
              type: "solid", // 虚线'dotted' 实线'solid'
            },
          },
        },
      },
    ],
    dataZoom: {
      // 放大和缩放
      type: "inside",
    },
  });

  const state = reactive({
    fitData: "", //样本名称
    sampleName: "",
    title: "波形展示",
    linkageData: [],
    lookEcharts: false,
    equipmentArr: [
      {
        value: "1",
        label: "地震波",
      },
      {
        value: "2",
        label: "电磁波",
      },
    ],
    linkageColumns: [
      {
        prop: "name",
        label: "事件名称",
      },
      {
        prop: "type",
        label: "事件类型",
      },
      {
        prop: "startTime",
        label: "开始时间",
      },

      {
        prop: "endTime",
        label: "结束时间",
      },
      {
        prop: "description",
        label: "描述",
      },
    ],
    total: 0, //总条数
    pageSize: 10, //分页尺寸
    pageNum: 1, //当前页
  });
  let showEcharts = ref(false);
  //选择设备类型下拉框
  const equipmentChange = () => {
    equipmentVal.value = equipmentVal.value;
  };

  // 切换页码
  const pageChange = (i: any) => {
    state.pageNum = i;
    queryWaveTable();
  };
  // 分页大小
  const pageSizeChange = (i: any) => {
    state.pageSize = i;
    queryWaveTable();
  };
  const sampleList: any = reactive({
    list: [],
  });
  // 确认删除
  const confirmDelete = (row: any) => {
    state.sampleName = row.name;
    sampleList.list = state.sampleName.split();
    deleteData(row);
  };
  //删除数据接口
  const deleteData = (data: any) => {
    let params = {
      id: data.id,
    };
    http.stationsInfoManage.deleteData(params).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("删除成功");
        queryWaveTable();
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //查看
  const lookWave = (data: any) => {
    state.lookEcharts = true;
    let params = {
      streamId: data.streamCode,
      startTime: data.startTime,
      endTime: data.endTime,
    };
    http.stationsInfoManage.searchStreamID(params).then((res: any) => {
      if (res.code == 0) {
        waveOptions.series[0].data = res.data.waveFormData;
        waveOptions.xAxis.data = res.data.waveFormSaveTime;
        echarts.init(warnGrade.value).setOption(waveOptions);
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  onMounted(() => {
    queryWaveTable();
  });
  //查询波形样本列表
  const queryWaveTable = () => {
    let params = {
      name: state.fitData,
      waveType: equipmentVal.value,
      deviceId: 1,
      pageNum: state.pageNum,
      pageSize: state.pageSize,
    };
    http.stationsInfoManage.searchWaveTable(params).then((res: any) => {
      if (res.code == 0) {
        state.linkageData = res.data.list;
        state.linkageData.map((item: any) => {
          if (item.waveType == 1) {
            item.type = "地震波";
          } else if (item.waveType == 2) {
            item.type = "电磁波";
          }
        });
        state.total = res.data.total;
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //根据样本名查询波形样本数据接口
  //点击查看后回显
  const lookEcharts = (row: any) => { };
  //批量删除数据接口
  const deleteWave = () => {
    let params = {
      list: sampleList.list,
    };

    http.stationsInfoManage.deleteWave(params).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("删除成功");
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  //查询按钮
  const searchClick = () => {
    queryWaveTable();
  };
  return {
    state,
    equipmentVal,
    warnGrade,
    facilityId,
    waveOptions,
    showEcharts,
    equipmentChange,
    pageChange,
    pageSizeChange,
    confirmDelete,
    sampleList,
    lookWave,
    queryWaveTable,
    lookEcharts,
    deleteWave,
    searchClick,
  };
};
