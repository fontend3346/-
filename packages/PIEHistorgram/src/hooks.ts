import { Props } from "./interfaces";
import { reactive, onMounted, watch, ref } from "vue";
import * as echarts from "echarts";

export const useHandler = (props: Props, chart: any) => {
  const state = reactive({
  })
  const initcharts = () => {
    let mychart = echarts.init(chart.value)
    if (props.option == null) {
      mychart.setOption({
        color: props.color,
        xAxis: {
          type: 'category',
          data: props.xAxisData,
          axisLabel: {
            interval: props.xInterval,
            rotate: props.rotate, //全部显示x轴
            textStyle: {
              color: props.xAxisColor //x轴文本颜色
            }
          },

        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: props.yAxisColor //y轴文本颜色,
            }
          },
          max: props.yAxisMax,
          min: props.yAxisMin
        },
        series: [
          {
            data: props.yAxisData,
            type: 'bar'
          }
        ],
        grid: {
          x2: 20,
          y2: 30
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#292c38',
            type: 'solid'
          }
        }
      });
    }
    else {
      mychart.setOption(props.option)
    }

  }
  onMounted(() => {
    initcharts()
  });
  watch(
    () => props.xAxisData,
    () => {
      initcharts()
    },
    {
      deep: true,
    }
  );
  return {};
};
