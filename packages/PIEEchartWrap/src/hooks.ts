import { Emits, Props } from "./interfaces";
import { reactive, onMounted, watch, ref, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  let warnGrade = ref(""); //波形盒子
  let chartsConfigs: any = null;
  const state: any = reactive({
    timeVal: "120", //时间
    aisle: "", //通道
    // direction: ["N", "E", "Z"], //方向
    echartsData: [], //波形数据
    lookEcharts: true, //波形开关
    chartsConfigsArr: [], //波形数组
  });

  watch(
    () => props.echartsData,
    (newValue, oldValue) => {
      state.echartsData = props.echartsData;
      initEchart();
    },
    {
      deep: true,
    }
  );
  const initEchart = () => {
    // chartsConfigsArr = [];
    state.echartsData = props.echartsData;
    state.chartsConfigsArr = [];
    for (let i = 0; i < state.echartsData.length; i++) {
      createEcharts(
        state.echartsData[i].timeList,
        state.echartsData[i].dataList,
        state.echartsData[i].identifier,
        state.echartsData[i].earthquCharas,
      );
    }
  };
  // 动态创建echarts
  const createEcharts = (xAxisData: any, yAxisData: any, identifier: any, earthquCharas: any) => {
    let charts: any = document.createElement("div");
    charts.className = "mycharts";
    // charts.className = 'charts-style';
    charts.style = "width: 99.6%; height: 190px;";
    (warnGrade.value as any).appendChild(charts);
    let obj: any = {};
    let markData: any = []//拼接标注
    if (earthquCharas.length > 0) {
      earthquCharas.map((item: any) => {
        obj = {
          name: item.sP,
          xAxis: item.time,
          label: {
            distance: [0, -10],
            formatter: (params: any) => {
              return `${params.name}, ${params.value}`
            },
          }
        }
        markData.push(obj)
      })
    } else {
      markData = []
    }
    let optionData: any = {
      title: {
        show: true, //false
        text: identifier, //主标题文本
        textStyle: {
          color: "#ccc",
          fontSize: 16,
        },
        left: "5%",
        top: "top",
      },
      // 波形data
      line: {
        borderColor: "#333", //去边框
      },
      grid: {
        left: "2%",
        right: '3%',
        bottom: "10%",
        top: "13%",
        containLabel: true,
      },
      brush: {
        toolbox: ["lineY", "keep", "clear"],
        xAxisIndex: 0,
        brushStyle: {
          borderWidth: 1,
          color: "rgba(255,36,36,0)",
          borderColor: "#ff2424",
        },
      },
      xAxis: {
        boundaryGap: false,
        type: "category",
        id: "2",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

        axisTick: {
          show: false, // x轴刻度
        },
        axisLine: {
          show: false, //x轴
        },
        axisLabel: {
          show: true,
          color: "rgb(255,255,255)",
        }, // x轴字体颜色
      },
      yAxis: {
        type: "value",
        id: "2",
        // 去掉网格线
        splitLine: {
          show: false,
        },
        // 是否显示坐标轴刻度
        axisTick: {
          show: true,
          lineStyle: { color: "rgb(255,255,255)" }, // y轴刻度的颜色
        },
        axisLine: {
          show: true,
          lineStyle: { color: "rgb(255,255,255)" }, // y轴坐标轴颜色
        },
        axisLabel: { color: "rgb(255,255,255)" }, // y轴字体颜色
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
          showSymbol: false,
          markLine: {
            // 标注线
            symbol: "none",
            silent: false, //标线的点击事件         	
            animation: false, //不播放标线的动画   
            data: markData,
            lineStyle: {
              color: 'red',
              with: 1,
              type: 'solid'
            },
            emphasis: {
              disabled: true,
              lineStyle: {
                color: 'red',
                with: 2,
                type: 'solid'
              },
            }
          }
        },
      ],
      dataZoom: [
        {
          type: "inside",
        },
        // {
        //   type: "inside",
        //   start: "",
        //   end: "",
        // },
      ],
      toolbox: {
        show: false,
        feature: {
          brush: {
            type: ["lineY", "clear"],
            title: {
              rect: "选择",
              clear: "清除",
            },
          },
        },
        iconStyle: {
          borderColor: "#333",
        },
        itemSize: 20, // 设置图标大小
      },
    };
    chartsConfigs = echarts.init(charts);
    optionData.xAxis.data = xAxisData;
    optionData.series[0].data = yAxisData;
    chartsConfigs.setOption(optionData);
    state.chartsConfigsArr.push(chartsConfigs);
  };
  //时间改变事件
  const timeValChange = (val: any) => {
    emit("timeValChange", val);
  };
  //通道改变事件
  const aisleChange = (val: any) => {
    emit("aisleChange", val);
  };
  //箭头事件
  const arrowEvent = (type: any) => {
    emit("arrowEvent", type);
    // chartsConfigsArr.forEach((item) => {
    //   if (type == "+") {
    //     item.setOption({
    //       dataZoom: [
    //         item.getOption().dataZoom[0],
    //         {
    //           type: "inside",
    //           start: item.getOption().dataZoom[1].start + 10,
    //           end: item.getOption().dataZoom[1].end - 10,
    //           yAxisIndex: [0],
    //         },
    //       ],
    //     });
    //   } else {
    //     item.setOption({
    //       dataZoom: [
    //         item.getOption().dataZoom[0],
    //         {
    //           type: "inside",
    //           start: item.getOption().dataZoom[1].start - 10,
    //           end: item.getOption().dataZoom[1].end + 10,
    //           yAxisIndex: [0],
    //         },
    //       ],
    //     });
    //   }
    // });
  };
  //方向改变事件
  const directionChange = (val: any) => {
    let mycharts = document.getElementById("wrap");
    let childs = document.getElementsByClassName("mycharts");
    if (mycharts.firstChild) {
      for (let i = childs.length - 1; i >= 0; i--) {
        mycharts.removeChild(childs[i]);
      }
    }
    emit("directionChange", val);
  };
  //震幅改变事件
  const amplitude = () => {
    emit("amplitude");
  };
  //cancel
  const cancel = () => {
    let mycharts = document.getElementById("wrap");
    let childs = document.getElementsByClassName("mycharts");
    if (mycharts.firstChild) {
      for (let i = childs.length - 1; i >= 0; i--) {
        mycharts.removeChild(childs[i]);
      }
    }
    emit("cancel");
  };
  onMounted(() => {
    // initEchart();
  });
  return {
    state,
    warnGrade,
    timeValChange,
    aisleChange,
    arrowEvent,
    directionChange,
    amplitude,
    cancel,
  };
};
