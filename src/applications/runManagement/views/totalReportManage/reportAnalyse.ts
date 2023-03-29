import { onMounted, ref, reactive, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import * as echarts from "echarts";
import store from "@/store";
import http from "@/api";
import { nextTick } from "vue-demi";
export const useHandler = () => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;

  let timeValue = ref(""); //时间
  let netStation = ref(); //台网
  let selectStation = ref(""); //台站
  let activeCon = ref(true); //切换历史数据和今日数据
  //历史数据echarts图
  let warnGrade = ref(); //异常状态
  let warnInfo = ref(); //预警状态
  let workTime = ref(); //异常类型
  let warnType = ref(); //预警类型
  let warnLevel = ref(); //预警级别

  let workRoom = ref(""); //突发事件
  let eventType = ref(""); //运行率
  let gradeStatus = ref("");

  //今日数据echarts图
  let workTime1 = ref(""); //触发次数
  let workRoom1 = ref(""); //突发事件
  let eventType1 = ref(""); //运行率
  let fileSituation1 = ref("");
  let warnInfo1 = ref("");
  let warnGrade1 = ref("");
  let gradeStatus1 = ref("");

  const state = reactive({
    unitIdList: [
      {
        stationId: "",
        name: "",
      },
    ], //台站列表
    netStationList: [
      {
        unitId: "",
        unitName: "",
      },
    ], //台网列表
    userType: null, //用户类型
    //历史数据  接口已对接
    gradeOption: {
      title: {
        //配置标题组件
        text: "异常状态", //设置主标题
        left: "left", //设置主次标题都左右居中
        // top: "2",
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        // top: "15%",
        // left: "center",
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
        orient: "vertical",
        left: "right",
        top: "bottom",
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "65%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            // position: "center",
            normal: {
              textStyle: {
                // 提示文字的样式
                color: "#ffffff",
                fontSize: 14,
              },
            },
          },
          center: ["50%", "55%"],
          // 提示样式
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: "20",
          //     fontWeight: "bold",
          //     color: "#fff",
          //   },
          // },
          //注释掉提示线
          // labelLine: {
          //   show: false,
          // },
          data: [],
        },
      ],
    }, //异常状态
    infoOption: {
      title: {
        //配置标题组件
        text: "预警状态", //设置主标题
        left: "left", //设置主次标题都左右居中
        top: "10",
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
        orient: "vertical",
        left: "right",
        top: "bottom",
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "65%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            // position: "center",
            normal: {
              textStyle: {
                // 提示文字的样式
                color: "#ffffff",
                fontSize: 14,
              },
            },
          },
          center: ["50%", "55%"],
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: "20",
          //     fontWeight: "bold",
          //     color: "#fff",
          //   },
          // },
          data: [
            { value: 1048, name: "张三" },
            { value: 735, name: "李四" },
            { value: 580, name: "小明" },
            { value: 484, name: "小李" },
            { value: 300, name: "小张" },
          ],
        },
      ],
    }, //预警状态
    workOption: {
      title: {
        text: "异常类型",
        top: "0",
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
      },
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
          data: [
            // 120,
            // {
            //   value: 200,
            //   itemStyle: {
            //     color: "#a90000",
            //   },
            // },
            // 150,
            // 80,
            // 70,
          ],
          type: "bar",
          barWidth: "25%",
          itemStyle: {
            normal: {
              //柱状图颜色
              color: function (params: any) {
                var colorList = [
                  "#99211c",
                  "#976b0c",
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
    }, //异常类型
    warnTypeOPtion: {
      title: {
        text: "预警类型",
        top: "0",
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
      },
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
          data: [
            // 120,
            // {
            //   value: 200,
            //   itemStyle: {
            //     color: "#a90000",
            //   },
            // },
            // 150,
            // 80,
            // 70,
          ],
          type: "bar",
          barWidth: "25%",
          itemStyle: {
            normal: {
              //柱状图颜色
              color: function (params: any) {
                var colorList = [
                  "#99211c",
                  "#976b0c",
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
    }, //预警类型
    warnLevelOPtion: {
      title: {
        text: "预警级别",
        top: "0",
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
      },
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
          data: [
            // 120,
            // {
            //   value: 200,
            //   itemStyle: {
            //     color: "#a90000",
            //   },
            // },
            // 150,
            // 80,
            // 70,
          ],
          type: "bar",
          barWidth: "25%",
          itemStyle: {
            normal: {
              //柱状图颜色
              color: function (params: any) {
                var colorList = [
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
    }, //预警级别

    roomOption: {
      // color: ["#62d1de", "#54d6b6", "#a6db69"], //在这里设置colorList，是一个数组，图片颜色会按顺序选取
      title: {
        text: "突发事件",
        left: "left",
        top: "0",
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        top: "15%",
        left: "3%",
        right: "4%",
        bottom: "4%",
        containLabel: true,
      },
      xAxis: {
        // type: "category",
        axisTick: {
          alignWithLabel: true, // 坐标轴刻度居中  show: false
        },

        axisLine: {
          show: true, // 坐标轴轴线是否显示
          lineStyle: {
            color: "#fff", //坐标轴颜色
          },
        },
        // //x轴文字旋转 刻度标签
        // axisLabel: {
        // show: false,
        //   rotate: 30,
        //   interval: 0,
        // },
        data: [
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "26",
          "24",
          "26",
          "23",
          "26",
          "24",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
          "34",
          "35",
          "36",
          "37",
          "38",
          "39",
          "40",
          "41",
          "42",
          "43",
        ],
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: false,
        },
        //坐标轴颜色
        axisLine: {
          // show: true, // 坐标轴轴线是否显示
          lineStyle: {
            color: "#fff",
          },
        },
      },
      series: [
        // {
        //   type: "line",
        //   smooth: true, //折点是圆弧状的
        //   showSymbol: false, //是否显示点点
        //   symbol: "circle", //折点设定为实心点
        //   symbolSize: 6, //设定实心点的大小
        //   hoverAnimation: false,
        //   itemStyle: {
        //     normal: {
        //       color: "#fc8a0f", //折点颜色
        //       lineStyle: {
        //         color: "#ff9c35", //折线颜色
        //       },
        //     },
        //   },
        //   // markPoint: {
        //   //   //显示一定区域内的最大值和最小值
        //   //   data: [
        //   //     { type: "max", name: "最大值" },
        //   //     { type: "min", name: "最小值" },
        //   //   ],
        //   // },
        //   data: [
        //     156, 157, 156, 157, 154, 156, 153, 156, 150, 150, 149, 165, 151, 152,
        //     153, 158, 159, 165, 153, 158, 159, 165, 156, 153, 156, 150, 156, 153,
        //     156, 150, 156, 153, 156, 150, 156, 153, 156, 150, 159, 165, 153, 158,
        //     158,
        //   ],
        // },
        {
          data: [
            156, 157, 156, 157, 154, 156, 153, 156, 150, 150, 149, 165, 151,
            152, 153, 158, 159, 165, 153, 158, 159, 165, 156, 153, 156, 150,
            156, 153, 156, 150, 156, 153, 156, 150, 156, 153, 156, 150, 159,
            165, 153, 158, 158,
          ],
          type: "line",
          smooth: true,
          showSymbol: false,
        },
        {
          data: [
            120, 120, 120, 120, 120, 125, 120, 125, 120, 125, 120, 127, 120,
            125, 120, 130, 124, 130, 125, 130, 125, 130, 118, 120, 115, 128,
            127, 120, 125, 120, 125, 130, 116, 127, 128, 122, 126, 127, 120,
            125, 120, 125, 120,
          ],
          type: "line",
          smooth: true,
          showSymbol: false,
        },
        {
          data: [
            89, 90, 88, 89, 90, 91, 93, 97, 95, 99, 97, 92, 87, 89, 82, 89, 84,
            89, 86, 91, 90, 87, 93, 97, 95, 99, 93, 97, 95, 99, 93, 97, 95, 99,
            93, 97, 95, 99, 90, 87, 93, 97, 90,
          ],
          type: "line",
          smooth: true,
          showSymbol: false,
        },
      ],
    }, //突发事件
    eventOption: {
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
              fontSize: 14,
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
            fontSize: 10,
          },
          color: ["skyblue"],
          data: [
            {
              value: 70,
              // name: "完成率",
            },
          ],
        },
      ],
    }, //运行率
    statusOption: {
      title: {
        text: "突发事件类型",
        left: "left",
        top: "10",
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
      },
      tooltip: {
        trigger: "item",
      },
      // legend: {
      //   orient: "vertical",
      //   left: "left",
      // },
      series: [
        {
          // name: "Access From",
          type: "pie",
          radius: "70%",
          center: ["50%", "60%"],
          data: [
            { value: 63, name: "未归档" },
            { value: 37, name: "已归档" },
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
    }, //预警状态

    //今日数据
    roomOption1: {
      // color: ["#62d1de", "#54d6b6", "#a6db69"], //在这里设置colorList，是一个数组，图片颜色会按顺序选取
      title: {
        text: "突发事件",
        left: "left",
        top: "0",
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        top: "15%",
        left: "3%",
        right: "4%",
        bottom: "4%",
        containLabel: true,
      },
      xAxis: {
        // type: "category",
        axisTick: {
          alignWithLabel: true, // 坐标轴刻度居中  show: false
        },

        axisLine: {
          show: true, // 坐标轴轴线是否显示
          lineStyle: {
            color: "#fff", //坐标轴颜色
          },
        },
        // //x轴文字旋转 刻度标签
        // axisLabel: {
        // show: false,
        //   rotate: 30,
        //   interval: 0,
        // },
        data: [
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "26",
          "24",
          "26",
          "23",
          "26",
          "24",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
          "34",
          "35",
          "36",
          "37",
          "38",
          "39",
          "40",
          "41",
          "42",
          "43",
        ],
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: false,
        },
        //坐标轴颜色
        axisLine: {
          // show: true, // 坐标轴轴线是否显示
          lineStyle: {
            color: "#fff",
          },
        },
      },
      series: [
        // {
        //   type: "line",
        //   smooth: true, //折点是圆弧状的
        //   showSymbol: false, //是否显示点点
        //   symbol: "circle", //折点设定为实心点
        //   symbolSize: 6, //设定实心点的大小
        //   hoverAnimation: false,
        //   itemStyle: {
        //     normal: {
        //       color: "#fc8a0f", //折点颜色
        //       lineStyle: {
        //         color: "#ff9c35", //折线颜色
        //       },
        //     },
        //   },
        //   // markPoint: {
        //   //   //显示一定区域内的最大值和最小值
        //   //   data: [
        //   //     { type: "max", name: "最大值" },
        //   //     { type: "min", name: "最小值" },
        //   //   ],
        //   // },
        //   data: [
        //     156, 157, 156, 157, 154, 156, 153, 156, 150, 150, 149, 165, 151, 152,
        //     153, 158, 159, 165, 153, 158, 159, 165, 156, 153, 156, 150, 156, 153,
        //     156, 150, 156, 153, 156, 150, 156, 153, 156, 150, 159, 165, 153, 158,
        //     158,
        //   ],
        // },
        {
          data: [
            156, 157, 156, 157, 154, 156, 153, 156, 150, 150, 149, 165, 151,
            152, 153, 158, 159, 165, 153, 158, 159, 165, 156, 153, 156, 150,
            156, 153, 156, 150, 156, 153, 156, 150, 156, 153, 156, 150, 159,
            165, 153, 158, 158,
          ],
          type: "line",
          smooth: true,
          showSymbol: false,
        },
        {
          data: [
            120, 120, 120, 120, 120, 125, 120, 125, 120, 125, 120, 127, 120,
            125, 120, 130, 124, 130, 125, 130, 125, 130, 118, 120, 115, 128,
            127, 120, 125, 120, 125, 130, 116, 127, 128, 122, 126, 127, 120,
            125, 120, 125, 120,
          ],
          type: "line",
          smooth: true,
          showSymbol: false,
        },
        {
          data: [
            89, 90, 88, 89, 90, 91, 93, 97, 95, 99, 97, 92, 87, 89, 82, 89, 84,
            89, 86, 91, 90, 87, 93, 97, 95, 99, 93, 97, 95, 99, 93, 97, 95, 99,
            93, 97, 95, 99, 90, 87, 93, 97, 90,
          ],
          type: "line",
          smooth: true,
          showSymbol: false,
        },
      ],
    }, //突发事件
    workOption1: {
      title: {
        text: "触发次数",
        top: "0",
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
      },
      tooltip: {
        trigger: "axis",
        // axisPointer: {
        //   type: "shadow",
        // },
      },
      xAxis: {
        type: "category",
        data: ["张三", "李四", "小明", "小李", "小张"],
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
            120,
            {
              value: 200,
              itemStyle: {
                color: "#a90000",
              },
            },
            150,
            80,
            70,
          ],
          type: "bar",
        },
      ],
    }, //触发次数
    eventOption1: {
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
              fontSize: 14,
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
            fontSize: 10,
          },
          color: ["skyblue"],
          data: [
            {
              value: 70,
              // name: "完成率",
            },
          ],
        },
      ],
    }, //运行率
  });
  onMounted(() => {
    unitIdListFun(); //站点数据
    setTimeout(() => {
      exceptionType(); //历史数据-异常类型饼图
    }, 500);
    ininEcharts();
  });
  //搜索
  const searchFun = () => {
    // activeCon.value = false;
    exceptionType();
  };
  //获取登录后的 台站/台网用户数据
  const unitIdListFun = () => {
    if (store.state.user.stationInfo) {
      state.userType = JSON.parse(store.state.user.stationInfo)[0].userType;
    }
    //如果登录的是台网
    if (state.userType == 1) {
      state.netStationList = JSON.parse(store.state.user.stationInfo);
      if (state.netStationList.length > 0) {
        //默认台网给第一个(只有一个)
        netStation.value = state.netStationList[0].unitId;
        let params = {
          networkId: state.netStationList[0].unitId,
        };
        netStationApi(params); //通过台网查询台站
      } else {
        ElMessage.error("暂无台网数据");
      }
      //如果登录的是台站
    } else if (state.userType == 2) {
      state.unitIdList = JSON.parse(store.state.user.stationInfo);
      //如果登录没用户
    } else if (state.userType) {
      state.unitIdList = [];
    }
  };
  //台网查台站change
  const netStationChange = () => {
    let netId = "";
    if (netStation.value) {
      netId = netStation.value;
    } else {
      netId = state.netStationList[0].unitId; //默认台网第一个
    }
    let params = {
      networkId: netId,
    };
    netStationApi(params);
  };
  //台网查台站API
  const netStationApi = (params: any) => {
    http.stationsInfoManage.getStationsEarth(params).then((res: any) => {
      if (res.code == 0) {
        state.unitIdList = res.data; //查出台站
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 历史数据echarts
  const exceptionType = () => {
    let stationId;
    let netWorkStationId;
    //台站有值
    if (selectStation.value) {
      stationId = selectStation.value;
      //台网用户中的台站第一个
    } else if (state.userType == 1) {
      netWorkStationId = netStation.value;
      //台站用户中的台站第一个
    } else if (state.userType == 2 && state.unitIdList.length > 0) {
      stationId = state.unitIdList[0].unitId;
    }
    let params = {
      endTime: timeValue.value ? timeValue.value[1] : "",
      startTime: timeValue.value ? timeValue.value[0] : "",
      stationId: stationId,
      netWorkStationId: netWorkStationId,
    };
    http.reportAnalyse.exceptionTypeList(params).then((res: any) => {
      if (res.code == 0) {
        if (res.data.exceptionStatus.length > 0) {
          //异常状态
          let arrData: any = [];
          let obj;
          res.data.exceptionStatus.forEach((item: any) => {
            obj = {
              value: item.count,
              name: item.status == 1 ? "未处理" : "已处理",
            };
            arrData.push(obj);
          });
          state.gradeOption.series[0].data = arrData;
          nextTick(() => {
            let warnGradeDom = warnGrade.value;
            echarts.init(warnGradeDom).setOption(state.gradeOption);
          });
        } else {
          ElMessage.warning("暂无数据");
          return;
        }
        if (res.data.warnigStatus.length > 0) {
          //预警状态
          let warData: any = [];
          let warObj;
          res.data.warnigStatus.forEach((item: any) => {
            warObj = {
              value: item.count,
              name: item.status == 1 ? "未发布" : "已发布",
            };
            warData.push(warObj);
          });
          state.infoOption.series[0].data = warData;
          nextTick(() => {
            let warnInfoDom = warnInfo.value;
            echarts.init(warnInfoDom).setOption(state.infoOption);
          });
        }
        if (res.data.exceptionType.length > 0) {
          //异常类型 ;
          let typeDataX: any = [];
          let typeDataY: any = [];
          res.data.exceptionType.forEach((item: any) => {
            typeDataX.push(item.exception_type);
            typeDataY.push(item.count);
          });
          state.workOption.xAxis.data = typeDataX;
          state.workOption.series[0].data = typeDataY;
          nextTick(() => {
            let workTimeDom = workTime.value;
            echarts.init(workTimeDom).setOption(state.workOption);
          });
        }
        if (res.data.warningType.length > 0) {
          //预警类型 ;
          let warnTypeX: any = [];
          let warnTypeY: any = [];
          res.data.warningType.forEach((item: any) => {
            warnTypeX.push(item.warning_type);
            warnTypeY.push(item.count);
          });
          state.warnTypeOPtion.xAxis.data = warnTypeX;
          state.warnTypeOPtion.series[0].data = warnTypeY;
          nextTick(() => {
            let warnTypeDom = warnType.value;
            echarts.init(warnTypeDom).setOption(state.warnTypeOPtion);
          });
        }
        if (res.data.warningLevel.length > 0) {
          //预警级别 ;
          let warnLevelX: any = [];
          let warnLevelY: any = [];
          res.data.warningLevel.forEach((item: any) => {
            warnLevelX.push(item.warning_level);
            warnLevelY.push(item.count);
          });
          state.warnLevelOPtion.xAxis.data = warnLevelX;
          state.warnLevelOPtion.series[0].data = warnLevelY;
          nextTick(() => {
            let warnLevelDom = warnLevel.value;
            echarts.init(warnLevelDom).setOption(state.warnLevelOPtion);
          });
        }
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  // 初始化图表
  const ininEcharts = () => {
    // //运行率
    // let domEvent: any = eventType.value;
    // let myEchartEvent = echarts.init(domEvent);
    // myEchartEvent.setOption(state.eventOption);
    // //历史数据 - 预警状态
    // let domStatus: any = gradeStatus.value;
    // let myEchartStatus = echarts.init(domStatus);
    // myEchartStatus.setOption(state.statusOption);
    // //触发次数
    // let dom: any = workRoom.value;
    // let myEchart = echarts.init(dom);
    // myEchart.setOption(state.roomOption);
    // //触发次数
    // let dom1: any = workRoom1.value;
    // let myEchart1 = echarts.init(dom1);
    // myEchart1.setOption(state.roomOption1);
    // //突发事件
    // let domTime1: any = workTime1.value;
    // let myEchartTime1 = echarts.init(domTime1);
    // myEchartTime1.setOption(state.workOption1);
    // //运行率
    // let domEvent1: any = eventType1.value;
    // let myEchartEvent1 = echarts.init(domEvent1);
    // myEchartEvent1.setOption(state.eventOption1);
  };
  return {
    state,
    ininEcharts,
    exceptionType,
    netStationApi,
    netStationChange,
    unitIdListFun,
    searchFun,
    gradeStatus1,
    warnGrade1,
    warnInfo1,
    fileSituation1,
    eventType1,
    workRoom1,
    workTime1,
    gradeStatus,
    eventType,
    workRoom,
    warnLevel,
    warnType,
    workTime,
    warnInfo,
    warnGrade,
    activeCon,
    selectStation,
    netStation,
    timeValue,
  };
};
