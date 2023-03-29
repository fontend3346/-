import { onMounted, ref, reactive, getCurrentInstance, onBeforeMount, watch } from "vue";
import { Emits, Props } from "./interfaces";
import * as echarts from "echarts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;
  let myChart: any = ref()
  const state = reactive({
    imageList: <any>[],//影像数组 echart图例的数据
    airNum: <any>[],//某个影像上的所有飞机数据
    echartSeries: <any>[],//放在echart series配置项里的数据
    xName: [],//echart的x轴项
  })
  const cancel = () => {

    emit("cancel")
    emit("update:visible", false);
  }
  //echart数据暂时写这里了，很多配置项
  const lineChart = reactive({
    title: {},
    tooltip: {
      trigger: "axis",
    },
    legend: {
      // data: ["系列1", "系列2", "系列3", "系列4", "系列5"],
      data: state.imageList.target,
      orient: "vertical", //垂直显示
      y: "center", //延Y轴居中
      x: "right", // 使用百分比可自动根据屏幕大小自适应
      itemGap: 20, //每条图例的距离
      align: "left",
      textStyle: {
        color: "#fff", //更改坐标轴文字颜色
        fontSize: 15, //更改坐标轴文字大小
      },
    },
    grid: {
      left: "6%",
      right: "23%", //坐标轴图表在echartbox中的位置
      bottom: "3%",
      containLabel: true,
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisTick: {
        show: false, //坐标轴刻度线
      },
      axisLine: {
        show: true, //轴线
      },
      data: ["飞机1", '2021-10-01', '2021-10-02', '2021-10-02'],
      // data: state.xName,
      axisLabel: {
        rotate: 60,
        show: true,
        textStyle: {
          color: "#b7b7b8", //更改坐标轴文字颜色
          fontSize: 13, //更改坐标轴文字大小
        },
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false, //Y轴背景线
        lineStyle: {
          color: "#b7b7b8",
          type: "dashed",
        },
      },

      axisTick: {
        show: true,  //坐标轴刻度线
      },
      axisLine: {
        show: true, //轴线
      },
      // data: state.xName,
      // data: ["0.2", "0.4", "0.6", "0.8", "1.0"],
      axisLabel: {
        show: true,
        textStyle: {
          color: "#b7b7b8", //更改坐标轴文字颜色
          fontSize: 13, //更改坐标轴文字大小
        },
      },
    },
    series: state.echartSeries,
  });
  //折线图线条样式
  const echartSymbol = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'];
  const initEchart = () => {
    state.imageList = Object.keys(props.options);
    state.airNum = Object.values(props.options);
    let arr: any = [];
    let xName: any = [];
    state.airNum.forEach((e: any, index: any) => {
      arr.push([]);
      xName.push([]);
    })
    state.airNum.forEach((e: any, index: any) => {
      // console.log("index", arr);
      e.forEach((item: any) => {
        arr[index].push(item.count)
        xName[index].push(item.className)
        // arr[index].push(item.count)
      })
    })

    state.imageList.forEach((e: any, index: any) => {
      let onsSeries: any = {
        name: e,
        type: "line",
        symbol: echartSymbol[(index % 7) - 1],//循环图例样式
        symbolSize: 10,
        data: arr[index],
      };
      state.echartSeries.push(onsSeries);

    })

    state.xName = xName[0];//x坐标轴项
    // console.log("图例,lenend", state.imageList);
    // console.log("x轴", state.xName);
    // console.log("series数据", state.echartSeries);
    lineChart.xAxis.data = state.xName
    let myChartDom = myChart.value;
    let myEchart = echarts.init(myChartDom);
    myEchart.setOption(lineChart)
    // myEchart.setOption(props.options)

  }
  watch(
    () => props.options,
    (newValue, oldValue) => { initEchart(); },
    { deep: true, }
  );


  onMounted(() => {
    initEchart();
  });

  // onBeforeMount(() => {
  //     isTime();
  //   });

  return {
    initEchart, myChart, state, lineChart, cancel
  };
};
