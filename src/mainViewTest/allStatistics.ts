import { reactive, ref, onMounted, nextTick } from "vue";
import { ElMessage } from "element-plus";
import http from "@/api/index";
import * as echarts from "echarts";

export const useHandler = () => {
  // 台站级别与数量统计
  let stationNum = ref(""); //站网数量统计(台阵下的台站数量)
  let stationType = ref(""); //国家台地方台区域台
  let stationPic = ref(""); //站台数量统计(台阵下的台站数量)
  // 设备统计
  let facilityNum = ref(""); //设备学科统计
  let facilityType = ref(""); //设备使用率
  let facilityPic = ref(""); //设备状态统计
  let state = reactive({
    // 台网/站/测点/设备统计
    stationNumAll: {
      stationNetworkTotal: "",
      stationtotal: "",
      stationtnormal: "",
      stationtabnormal: "",
      pointnormal: "",
      pointtotal: "",
      pointabnormal: "",
      devicetotal: "",
      devicenormal: "",
      deviceabnormal: "",
    },
    stationOption: {
      // title: {
      //   //配置标题组件
      //   text: "工作室对比", //设置主标题
      //   left: "left", //设置主次标题都左右居中
      //   top: "10",
      //   textStyle: {
      //     fontSize: 14,
      //     color: "#fff",
      //   },
      // },
      tooltip: {
        trigger: "item",
      },
      legend: {
        // textStyle: {
        //   fontSize: 14,
        //   color: "#fff",
        // },
        orient: "vertical",
        left: "80%",
        bottom: "top",
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          // center: ["50%", "65%"],
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
              color: "#fff",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "国家" },
            { value: 735, name: "地方" },
            { value: 580, name: "区域" },
          ],
        },
      ],
    }, //台站级别统计
    stationTotalNet: {
      // title: {
      //   text: "触发次数",
      //   top: "0",
      //   textStyle: {
      //     fontSize: 14,
      //     color: "#fff",
      //   },
      // },
      tooltip: {
        trigger: "axis",
        // axisPointer: {
        //   type: "shadow",
        // },
      },
      xAxis: {
        type: "category",
        data: [],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          textStyle: {
            show: true,
            fontFamily: "微软雅黑",
            color: "#fff",
            fontSize: "14",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          textStyle: {
            show: true,
            fontFamily: "微软雅黑",
            color: "#fff",
            fontSize: "14",
          },
        },
      },
      grid: {
        top: "16%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      series: [
        {
          data: [],
          type: "bar",
          itemStyle: {
            normal: {
              //柱状图颜色
              color: function (params) {
                var colorList = [
                  "#c23531",
                  "#009345",
                  "#61a0a8",
                  "#d48265",
                  "#91c7ae",
                  "#749f83",
                  "#ca8622",
                ];
                if (params.dataIndex >= colorList.length) {
                  //颜色少的时候循环颜色
                  let index = params.dataIndex - colorList.length;
                  return colorList[index];
                } else {
                  return colorList[params.dataIndex];
                }
              },
            },
          },
        },
      ],
    }, //站台数量(台网下的台站)统计
    stationTotal: {
      // title: {
      //   text: "触发次数",
      //   top: "0",
      //   textStyle: {
      //     fontSize: 14,
      //     color: "#fff",
      //   },
      // },
      tooltip: {
        trigger: "axis",
        // axisPointer: {
        //   type: "shadow",
        // },
      },
      xAxis: {
        type: "category",
        data: [],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          textStyle: {
            show: true,
            fontFamily: "微软雅黑",
            color: "#fff",
            fontSize: "14",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          textStyle: {
            show: true,
            fontFamily: "微软雅黑",
            color: "#fff",
            fontSize: "14",
          },
        },
      },
      grid: {
        top: "16%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      series: [
        {
          data: [],
          type: "bar",
          itemStyle: {
            normal: {
              //柱状图颜色
              color: function (params) {
                var colorList = [
                  "#c23531",
                  "#009345",
                  "#61a0a8",
                  "#d48265",
                  "#91c7ae",
                  "#749f83",
                  "#ca8622",
                ];
                if (params.dataIndex >= colorList.length) {
                  //颜色少的时候循环颜色
                  let index = params.dataIndex - colorList.length;
                  return colorList[index];
                } else {
                  return colorList[params.dataIndex];
                }
              },
            },
          },
        },
      ],
    }, //站台数量(台阵下的台站)统计
    facilitySubject: {
      // title: {
      //   text: "触发次数",
      //   top: "0",
      //   textStyle: {
      //     fontSize: 14,
      //     color: "#fff",
      //   },
      // },
      tooltip: {
        trigger: "axis",
        // axisPointer: {
        //   type: "shadow",
        // },
      },
      xAxis: {
        type: "category",
        data: [
          "地震台阵",
          "火山台阵",
          "综合台",
          "重力台",
          "海揽台",
          "岛碟台",
          "科考船",
          "境外中和台",
          "科学台阵",
          "地磁台",
          "机动车组",
        ],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          textStyle: {
            show: true,
            fontFamily: "微软雅黑",
            color: "#fff",
            fontSize: "14",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          textStyle: {
            show: true,
            fontFamily: "微软雅黑",
            color: "#fff",
            fontSize: "14",
          },
        },
      },
      grid: {
        top: "16%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      series: [
        {
          data: [
            43,
            {
              value: 18,
              itemStyle: {
                color: "#a90000",
              },
            },
            100,
            13,
            1,
            21,
            2,
            38,
            200,
            8,
            1,
          ],
          type: "bar",
        },
      ],
    }, //设备学科
    facilityUsage: {
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      series: [
        {
          startAngle: 210, // 开始角度 左侧角度
          endAngle: -30, // 结束角度 右侧
          name: "Pressure",
          type: "gauge",
          radius: "95%",
          progress: {
            show: true,
          },
          center: ["50%", "60%"],
          pointer: {
            // 指针样式
            width: 3,
            length: "60%",
            shadowBlur: 5,
          },
          detail: {
            // 中间数据
            valueAnimation: true,
            formatter: "{value}M/S", // 数据值的样式
            textStyle: {
              fontSize: 18,
            },
            color: "#fff",
            offsetCenter: [0, "70%"], // 中间值的位置
          },
          axisLine: {
            lineStyle: {
              width: 8, // 这个是修改宽度的属性
            },
          },
          axisTick: {
            // 短刻度样式
            show: false, // false表示不显示
          },
          splitLine: {
            show: false, // false表示不显示
            // 长刻度设置
          },
          axisLabel: {
            // 刻度值
            distance: -5, // 位置
            color: "#fff",
            fontSize: 14,
          },
          color: ["skyblue"],
          data: [
            {
              value: 80,
              // name: "完成率",
            },
          ],
        },
      ],
    }, //设备使用率
    statusOption: {
      // title: {
      //   text: "突发事件类型",
      //   left: "left",
      //   top: "10",
      //   textStyle: {
      //     fontSize: 14,
      //     color: "#fff",
      //   },
      // },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
      },
      series: [
        {
          // name: "Access From",
          type: "pie",
          radius: "70%",
          center: ["50%", "60%"],
          data: [
            { value: 63, name: "未归档" },
            { value: 40, name: "已归档" },
          ],
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 14,
              },
            },
            emphasis: {
              show: true, //鼠标移入是否显示文字
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    }, //设备状态统计
  });
  onMounted(() => {
    ininEcharts();
    stationAll(); //台网/站/测点/设备统计
    stationInfo(); //查询台阵对应的台站-柱状图
    // facilitySub(); //查询设备学科 - 柱状图;
    stationNumNet();
  });
  //台网/站/测点/设备统计
  const stationAll = () => {
    http.allStatistics.getList().then((res: any) => {
      if (res.code == 0) {
        state.stationNumAll = res.data;
      }
    });
  };
  //查询台阵对应的台站-柱状图
  const stationInfo = () => {
    http.allStatistics.stationInfo().then((res: any) => {
      if (res.code == 0) {
        state.stationTotal.xAxis.data = res.data.name;
        state.stationTotal.series[0].data = res.data.count;
        nextTick(() => {
          let stationPicDom = stationPic.value;
          echarts.init(stationPicDom).setOption(state.stationTotal);
        });
      }
    });
  };
  // 查询设备学科 - 柱状图;
  const facilitySub = () => {
    http.allStatistics.facilitySub().then((res: any) => {
      console.log(res.code, "code");
      if (res.code == 0) {
        // state.facilitySubject.xAxis.data = res.data.name;
        // state.facilitySubject.series[0].data = res.data.count;
        // nextTick(() => {
        // let facilityNumDom = facilityNum.value;
        // echarts.init(facilityNumDom).setOption(state.stationTotal);
        // });
      }
    });
  };
  //查询台网下的台站-柱状图
  const stationNumNet = () => {
    http.allStatistics.networkStationInfo().then((res: any) => {
      if (res.code == 0) {
        state.stationTotalNet.xAxis.data = res.data.unitName;
        state.stationTotalNet.series[0].data = res.data.count;
        nextTick(() => {
          let stationNumDom = stationNum.value;
          echarts.init(stationNumDom).setOption(state.stationTotalNet);
        });
      }
    });
  };
  const ininEcharts = () => {
    //国家地方区域
    let domGrade: any = stationType.value;
    let myEchartGrade = echarts.init(domGrade);
    myEchartGrade.setOption(state.stationOption);
    //设备学科
    let dom: any = facilityNum.value;
    let myEchart = echarts.init(dom);
    myEchart.setOption(state.facilitySubject);
    //设备使用率
    let domType: any = facilityType.value;
    let myType = echarts.init(domType);
    myType.setOption(state.facilityUsage);
    //设备状态
    let domPic: any = facilityPic.value;
    let myPic = echarts.init(domPic);
    myPic.setOption(state.statusOption);
  };
  return {
    state,
    stationNum,
    stationType,
    stationPic,
    facilityNum,
    facilityType,
    facilityPic,
  };
};
