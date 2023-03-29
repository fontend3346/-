import { Emits, Props } from "./interfaces";
import { reactive, onMounted, watch, ref, nextTick } from "vue";
import * as echarts from "echarts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  // 点击事件
  const onClick = (e: MouseEvent) => {
    emit("click", e);
  };
  let echartsKeyId: any = ref();

  const state = reactive({
    option: {
      series: [],
      xAxis: {
        data: []
      }
    },
  });
  watch(
    () => props.options,
    (newValue, oldValue) => {
      if (myEcharts) {
        myEcharts.setOption(state.option);
        myEcharts.resize();
      } else {
        initEchart();
      }
    },
    {
      deep: true,
    }
  );
  const seleteList = reactive({
    selectStartTime: [],
    selectEndTime: [],
  });
  let startValue = ref(0);
  let endValue = ref(0);
  let startIndex: any = ref(null);
  let endIndex = ref(null);
  let startX = ref(null);
  let endX = ref(null);

  let myEcharts: any = null;

  // 图
  const echartDrag = () => {
    nextTick(() => {
      myEcharts = echarts.init(echartsKeyId.value);
      myEcharts.off("dataZoom");
      myEcharts.on("dataZoom", (params) => {
        let zoomData = params.batch[0];
        if (typeof zoomData.start != "undefined") {

          //滚轮, 滑动条
          //这里的缩放百分比是 没有  除以100的，所以需要乘以 0.01
          startIndex.value = parseInt(
            state.option.series[0].data.length * zoomData.start * 0.01
          );


          endIndex.value = parseInt(
            state.option.series[0].data.length * zoomData.end * 0.01
          );

          //这里需要注意，缩放过程中会出现计算出来的索引大于数据长度的问题，所以这里判断一下
          endIndex.value =
            endIndex.value > state.option.series[0].data.length - 1
              ? state.option.series[0].data.length - 1
              : endIndex.value;

          seleteList.selectStartTime =
            state.option.series[0].data[startIndex.value];
          seleteList.selectEndTime =
            state.option.series[0].data[endIndex.value];
          //这算出来的索引就可以直接用于图表数据的数组中进行取值了
          startX.value = state.option.xAxis.data[startIndex.value]
          endX.value = state.option.xAxis.data[endIndex.value]

          emit("echartDrag", seleteList, [startX.value, endX.value]);
        } else {
          //拖放
          startValue.value = parseInt(zoomData.startValue);
          endValue.value = parseInt(zoomData.endValue);
        }
      });
      myEcharts.setOption(state.option);
    });
  };
  const initEchart = () => {
    state.option = props.options;
    myEcharts = echarts.init(echartsKeyId.value);
    myEcharts.resize();
    // echartDrag();
    myEcharts.setOption(state.option);
  };
  //波段缩放

  onMounted(() => {
    // debugger
    initEchart();
  });
  return {
    onClick,
    state,
    echartsKeyId,
    seleteList,
    startIndex,
    endIndex,
    echartDrag,
  };
};
