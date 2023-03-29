import { Props, Emits } from "./interfaces";
import { reactive, onMounted, watch, ref, nextTick } from "vue";
import baseCharts from "@/plugins/lib/baseCharts";
import * as echarts from "echarts";
import http from "@/api/index";
import utils from "@/utils/utils";
import { ElMessage } from "element-plus";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  let showHistoryWeave = ref(false);
  let isShowFlage = props.isShowFlage;
  let waveOptionList: any = ref([]); // 波形option列表
  let waveHistory: any = ref([]); // 波形option列表
  let historyTime: any = ref([]); // 波形option列表
  let waveTimer: any = ref(null); //波形定时器
  let xRange = ref([]); // x轴的范围
  let zoomStartTimeTwo = ref("");
  let zoomEndTimeTwo = ref("");
  let maxVal = ref(0);
  let minVal = ref(0);
  let waveOptions: any = reactive({
    // 波形option
    tooltip: {
      trigger: "axis",
      // axisPointer: {
      //   type: 'cross'
      // }
      // formatter: '{b0}<br />{a0}：{c0}个<br />{a1}：{c1}个<br />{a2}：{c2}个'
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
    dataZoom: [
      {
        show: false,
        realtime: true,
        start: 0,
        endValue: null,
        bottom: 35,
        height: 12,
        backgroundColor: "#F0F0F0",
        dataBackground: {
          lineStyle: {
            color: "#fff",
          },
          areaStyle: {
            color: "#F0F0F0",
          },
        },
        fillerColor: "#D3D3D3",
        borderColor: "#F0F0F0",
        handleStyle: {
          opacity: 0,
        },
      },
      {
        type: "inside",
        realtime: true,
      },
    ],
    xAxis: {
      boundaryGap: false,
      type: "category",
      //刻度线
      axisTick: false,
      data: [],
      // name: "时间",
      nameTextStyle: {
        padding: [0, 0, 200, 500], // 上右下左与原位置距离
        color: "#98dcff",
      },
      nameGap: 30, // x轴name与横坐标轴线的间距
      nameLocation: "middle", // x轴name处于x轴的什么位置
      axisLine: {
        show: true,
        onZero: false, //不在y轴的零刻度线
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
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      name: "数量",
      // scale: true,
      // min: "dataMin", //取最小值为最小刻度
      // max: "dataMax", //取最大值为最大刻度
      // nameLocation: "left",
      // interval: 2.6, //设置刻度间距
      nameTextStyle: {
        padding: [0, 0, 80, -10], // 上右下左与原位置距离
        color: "#fff",
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#98dcff",
        },
        interval: 2,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#98dcff",
        },
      },
      axisPointer: {
        snap: true,
      },
      splitNumber: 3,
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
        //标注最大最小
        // markPoint: {
        //   symbolSize: "35", //size
        //   //是否显示标注的值
        //   label: {
        //     show: true,
        //     color: "red",
        //     textStyle: {
        //       color: "#fff",
        //       fontSize: 14,
        //     },
        //   },
        //   itemStyle: {
        //     color: "",
        //   },
        //   data: [
        //     { type: "max", name: "最大值" },
        //     { type: "min", name: "最小值" },
        //   ],
        // },
        // //标注最大线
        // markLine: {
        //   lineStyle: {
        //     width: 1,
        //   },
        //   label: {
        //     textStyle: {
        //       color: "#fff",
        //       fontSize: 14,
        //     },
        //   },
        //   data: [{ type: "max", name: "最大值" }],
        // },
        itemStyle: {
          normal: {
            label: {
              show: false, // 在折线拐点上显示数据
            },
            lineStyle: {
              width: 3, // 设置虚线宽度
              type: "solid", // 虚线'dotted' 实线'solid'
              color: "",
            },
          },
        },
      },
    ],
  });

  // let waveOptions: any = reactive({
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: {
  //       type: 'cross'
  //     }
  //   },
  //   toolbox: {
  //     show: false,
  //     feature: {
  //       saveAsImage: {}
  //     }
  //   },
  //   xAxis: {
  //     type: 'category',
  //     boundaryGap: false,
  //     axisLine: {
  //       onZero: false,
  //       color: '#666669',
  //       lineStyle: {
  //         type: 'solid',
  //         color: '#666669', //左边线的颜色
  //         width: '1' //坐标线的宽度
  //       }
  //     },
  //     name: '秒',
  //     axisLabel: {
  //       formatter: '{value} ',
  //       color: '#666669'
  //     },
  //     data: []
  //   },
  //   yAxis: {
  //     name: 'mm/s',
  //     type: 'value',
  //     axisLabel: {
  //       formatter: '{value} ',
  //       color: '#666669'
  //     },
  //     splitLine: {
  //       lineStyle: {
  //         color: '#EEEEF1'
  //       }
  //     },
  //     axisLine: {
  //       color: '#666669',
  //       lineStyle: {
  //         type: 'solid',
  //         color: '#666669', //左边线的颜色
  //         width: '4' //坐标线的宽度
  //       }
  //     },
  //     axisPointer: {
  //       snap: true
  //     },
  //     min: (value) => {
  //       return value.min;
  //     },
  //     max: (value) => {
  //       return value.max;
  //     }
  //   },
  //   visualMap: {
  //     show: false,
  //     dimension: 0,
  //     pieces: [
  //       {
  //         lte: 6,
  //         color: '#FF4A4A'
  //       },
  //       {
  //         gt: 6,
  //         lte: 8,
  //         color: '#FF4A4A'
  //       },
  //       {
  //         gt: 8,
  //         lte: 14,
  //         color: '#FF4A4A'
  //       },
  //       {
  //         gt: 14,
  //         lte: 17,
  //         color: '#FF4A4A'
  //       },
  //       {
  //         gt: 17,
  //         color: '#FF4A4A'
  //       }
  //     ]
  //   },
  //   dataZoom: [
  //     {
  //       show: true,
  //       type: 'inside',
  //       filterMode: 'none'
  //     },
  //     {
  //       show: true,
  //       type: 'inside',
  //       filterMode: 'none'
  //     }
  //   ],
  //   series: [
  //     {
  //       itemStyle: {
  //         normal: {
  //           lineStyle: {
  //             color: '#FF4A4A'
  //           }
  //         }
  //       },
  //       name: '秒',
  //       type: 'line',
  //       smooth: true,
  //       data: []
  //     }
  //   ]
  // })
  let colorList = [
    "#1891FF",
    "#12C3C3",
    "#FBCD14",
    "#F14864",
    "#8542E1",
    "#7DA6FF",
    "#4AC312",
    "#FB8F14",
    "#F148E7",
  ];
  let waves: any = reactive({
    waveData: [],
    equipmentVal: {}, // 设备下拉框绑定的值
    facilityId: "", // 设备编号
  });
  //设备echart弹窗关闭事件
  const calcelInstrument = (isShowFlage: any) => {
    if (waveTimer.value) {
      clearInterval(waveTimer.value);
    }
    waves.facilityId = "";
    waveOptionList.value = [];
    emit("calcelInstrument", isShowFlage);
  };
  //选择设备类型下拉框 yyq
  const equipmentChange = (item: any) => {
    if (waveTimer.value) {
      clearInterval(waveTimer.value);
    }
    waves.facilityId = item ? item.value : "";
    waveOptionList.value = [];
    setWaveInterval();
  };
  //波段大图确定事件
  const bandConfirm = (row: any) => {
    emit("bandConfirm", row, xRange.value, waves.waveData);
  };
  // 电磁波-鼠标移动后的数据
  const echartDragOne = (params: any, xRange) => {
    // console.log(xRange);

    xRange.value = params;
    emit("echartDragOne", xRange);
  };
  // 地震波-鼠标移动后的数据
  const echartDragTwo = (e: any) => {
    // emit('echartDragTwo', e)
  };
  //设置定时器请求波形
  const setWaveInterval = () => {
    if (waveTimer.value) {
      clearInterval(waveTimer.value);
    }
    showWave();
    waveTimer.value = setInterval(() => {
      showWave();
    }, 2000);
  };
  //处理数据
  const resetData = (index, data, time) => {
    waveOptionList.value[index].series[0].data = data;
    waveOptionList.value[index].xAxis.data = time;
    //对比历史数据与此次数据大小
    if (
      waveOptionList.value[index].yAxis.maxVal <
      Math.max(...waveOptionList.value[index].series[0].data)
    ) {
      waveOptionList.value[index].yAxis.maxVal = Math.max(
        ...waveOptionList.value[index].series[0].data
      );
    }
    if (
      waveOptionList.value[index].yAxis.minVal >
      Math.min(...waveOptionList.value[index].series[0].data)
    ) {
      waveOptionList.value[index].yAxis.minVal = Math.min(
        ...waveOptionList.value[index].series[0].data
      );
    }
    //赋值
    waveOptionList.value[index].yAxis.min =
      waveOptionList.value[index].yAxis.minVal;
    waveOptionList.value[index].yAxis.max =
      waveOptionList.value[index].yAxis.maxVal;
  };
  //地震波
  const showWave = () => {
    let params = {
      instId: waves.facilityId, //设备编号  30
      // startTime: "2023-01-05 23:30:00",
      // startTime: utils.formatDate(new Date().getTime() - 30000, 0),
      // endTime: "2023-01-05 24:00:00",
      // endTime: utils.formatDate(new Date().getTime(), 0),
    };
    http.stationsInfoManage.getData(params).then((res: any) => {
      if (res && res.code == 0) {
        // options1.series[0].data = res.data;
        if (res.data) {
          if (waveOptionList.value.length == 0) {
            res.data.map((item: any, index: any) => {
              let _item = JSON.parse(JSON.stringify(waveOptions));
              _item.series[0].data = item.waveFormData;
              _item.series[0].name = item.streamCode;
              _item.series[0].itemStyle.normal.lineStyle.color =
                colorList[index];
              _item.xAxis.data = item.waveFormSaveTime;
              _item.yAxis.min = Math.min(...item.waveFormData);
              _item.yAxis.max = Math.max(...item.waveFormData);
              _item.yAxis.minVal = Math.min(...item.waveFormData);
              _item.yAxis.maxVal = Math.max(...item.waveFormData);
              waveOptionList.value.push(_item);
            });
          } else {
            res.data.map((item: any, index: any) => {
              resetData(index, item.waveFormData, item.waveFormSaveTime);
              // let size = 30;
              // // 删除头部数据
              // waveOptionList.value[index].series[0].data.splice(
              //   0,
              //   Math.round(item.waveFormData.length / size)
              // );
              // waveOptionList.value[index].xAxis.data.splice(
              //   0,
              //   Math.round(item.waveFormSaveTime.length / size)
              // );
              // let data1 = item.waveFormData.slice(
              //   item.waveFormData.length -
              //     Math.round(item.waveFormData.length / size),
              //   item.waveFormData.length
              // );
              // data1.map((_item) => {
              //   waveOptionList.value[index].series[0].data.push(_item);
              // });
              // let data2 = item.waveFormSaveTime.slice(
              //   item.waveFormSaveTime.length -
              //     Math.round(item.waveFormSaveTime.length / size),
              //   item.waveFormSaveTime.length
              // );
              // data2.map((_item) => {
              //   waveOptionList.value[index].xAxis.data.push(_item);
              // });

              //这块注释掉
              // waveOptionList.value[index].series[0].data.concat(item.waveFormData.slice(0, Math.round(item.waveFormData.length / size)))
              // waveOptionList.value[index].xAxis.data.concat(item.waveFormSaveTime.slice(0, Math.round(item.waveFormSaveTime.length / size)))
              // item.waveFormData.map((_item_: any, _index: any) => {
              //   if (_index < Math.round(item.waveFormData.length / 10)) {

              //     let _item = item.waveFormData.slice((_index + 1) * Math.round(item.waveFormData.length / size), (_index + 2) * Math.round(item.waveFormData.length / size))

              //     waveOptionList.value[index].series[0].data.concat(_item)
              //     let timeItem = item.waveFormSaveTime.slice((_index + 1) * Math.round(item.waveFormSaveTime.length / size), (_index + 2) * Math.round(item.waveFormSaveTime.length / size))

              //     waveOptionList.value[index].xAxis.data.concat(timeItem)

              //   }
              // })
              // waveOptionList.value[index].series[0].itemStyle.normal.lineStyle.color = colorList[index];
            });
          }
          waves.waveData = res.data;
        } else {
          if (waveTimer.value) {
            //清除定时器
            clearInterval(waveTimer.value);
          }
        }
      } else {
        if (waveTimer.value) {
          //清除定时器
          clearInterval(waveTimer.value);
        }
      }
    });

    // let params: any;
    // if (row == 1) {
    //   params = {
    //     sampleName: 1,
    //     startTime: zoomStartTimeOne.value,
    //     endTime: zoomEndTimeOne.value,
    //     deviceId: "",
    //     // deviceId: state.thisEquipId,//后期有数据在写活
    //   };
    //   http.stationsInfoManage.waveform(params).then((res: any) => {
    //     if (res && res.code == 0) {
    //       options1.series[0].data = res.data;
    //       options1.xAxis.min = res.data[0][0];
    //     } else {
    //       ElMessage.error(res.message);
    //     }
    //   });
    // } else if (row == 2) {
    //   params = {
    //     sampleName: 1,
    //     startTime: zoomStartTimeThree.value,
    //     endTime: zoomEndTimeThree.value,
    //     deviceId: "",
    //     // deviceId: state.thisEquipId,//后期有数据在写活
    //   };
    //   http.stationsInfoManage.waveform(params).then((res: any) => {
    //     if (res && res.code == 0) {
    //       options3.series[0].data = res.data;
    //       options3.xAxis.min = res.data[0][0];
    //     } else {
    //       ElMessage.error(res.message);
    //     }
    //   });
    // }
  };
  // 选择历史时间
  const historyTimeFun = () => {
    historyWeave();
  };
  //历史波形点击事件
  const historyWeave = () => {
    if (waveOptionList.value.length > 0) {
      let params = {};
      if (historyTime.value != null) {
        params = {
          instId: waves.facilityId, //设备编号  30
          startTime: utils.formatDate(historyTime.value[0], 0),
          endTime: utils.formatDate(historyTime.value[1], 0),
        };
      } else {
        params = {
          instId: waves.facilityId, //设备编号  30
        };
      }
      http.stationsInfoManage.getData(params).then((res: any) => {
        if (res && res.code == 0) {
          showHistoryWeave.value = true;
          if (res.data) {
            if (waveHistory.value.length == 0) {
              res.data.map((item: any, index: any) => {
                let _item = JSON.parse(JSON.stringify(waveOptions));
                _item.series[0].data = item.waveFormData;
                _item.series[0].name = item.streamCode;
                _item.series[0].itemStyle.normal.lineStyle.color =
                  colorList[index];
                _item.xAxis.data = item.waveFormSaveTime;
                _item.yAxis.min = function (value: any) {
                  return value.min;
                };
                _item.yAxis.max = function (value: any) {
                  return value.max;
                };
                waveHistory.value.push(_item);
              });
            } else {
              res.data.map((item: any, index: any) => {
                let size = 30;
                // 删除头部数据
                waveHistory.value[index].series[0].data.splice(
                  0,
                  Math.round(item.waveFormData.length / size)
                );
                waveHistory.value[index].xAxis.data.splice(
                  0,
                  Math.round(item.waveFormSaveTime.length / size)
                );
                let data1 = item.waveFormData.slice(
                  item.waveFormData.length -
                    Math.round(item.waveFormData.length / size),
                  item.waveFormData.length
                );
                data1.map((_item) => {
                  waveHistory.value[index].series[0].data.push(_item);
                });
                let data2 = item.waveFormSaveTime.slice(
                  item.waveFormSaveTime.length -
                    Math.round(item.waveFormSaveTime.length / size),
                  item.waveFormSaveTime.length
                );
                data2.map((_item) => {
                  waveHistory.value[index].xAxis.data.push(_item);
                });
              });
            }
          }
        } else {
        }
      });
      emit("historyWeave");
    } else {
      ElMessage.error("暂无数据");
    }
  };
  // 历史弹框取消
  const historyCancel = () => {
    emit("historyCancel");
  };
  onMounted(() => {});

  watch(
    () => props.showInstrument,
    (newval: any) => {
      if (props.showInstrument) {
        waves.equipmentVal = props.equipmentArr[0];
        waves.facilityId = props.equipmentArr[0].value;
        setWaveInterval();
      } else {
        if (waveTimer.value) {
          //清除定时器
          clearInterval(waveTimer.value);
        }
      }
    }
  );
  return {
    calcelInstrument,
    equipmentChange,
    bandConfirm,
    echartDragOne,
    echartDragTwo,
    waveOptionList,
    waves,
    showHistoryWeave,
    historyWeave,
    waveHistory,
    historyTime,
    historyTimeFun,
    historyCancel,
  };
};
