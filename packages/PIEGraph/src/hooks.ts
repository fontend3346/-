import { Props, Emits } from "./interfaces";
import { reactive, onMounted, watch, ref, nextTick } from "vue";
import * as echarts from "echarts";

export const useHandler = (props: Props, emit: Emits) => {
  const state = reactive({
    options: {},
  });
  let mychart = ref();
  let chart = ref();
  const initcharts = () => {
    mychart.value = echarts.init(chart.value);

    if (props.option != null) {
      state.options = props.option;
    } else {
      state.options = {
        tooltip: {
          trigger: "item",
        },
        color: props.color,
        legend: {
          orient: "vertical",
          x: "right",
          y: "30%",
          padding: [0, 15, 0, 0],
          // x: "center",
          // y: 170,
          itemWidth: 14,
          itemHeight: 8,
          itemGap: 20,
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        },
        title: {
          zlevel: 0,
          text: ["{name|总数}", `{value|${props.subtext}}`].join("\n"),
          top: "41%",
          left: "32%",
          textAlign: "center", //居中
          textStyle: {
            rich: {
              value: {
                color: "#fff",
                fontSize: 18,
                fontStyle: "normal",
                fontWeight: "normal",
              },
              name: {
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: "normal",
                color: "#98dcff",
                lineHeight: 35,
              },
            },
          },
        },
        // title: {
        //   text: props.text,
        //   subtext: props.subtext,
        //   left: props.left,
        //   top: props.top,
        //   textStyle: props.textStyle,
        //   subtextStyle: props.subtextStyle,
        // },
        series: [
          {
            type: "pie",
            label: {
              show: false,
              position: "outside",
              formatter: function (data: any) {
                return data.percent.toFixed(1) + "%";
              },
              color: "#ffffff", //颜色
              fontSize: 12, //字体大小
            },
            data: props.data,
            radius: props.radius,
            center: ["35%", "60%"],
          },
        ],
      };
    }
    mychart.value.setOption(state.options);
    mychart.value.on("click", function (item: any) {
      emit("clickGraph", item);
    });
  };
  onMounted(() => {
    initcharts();
  });

  watch(
    () => props,
    () => {
      nextTick(() => {
        mychart.value.clear();
        state.options.series[0].data = props.data;
        state.options.title.text = ["{name|总数}", `{value|${props.subtext}}`].join("\n");
        mychart.value.setOption(state.options);

      })
    },
    {
      deep: true,
    }
  );
  return {
    chart
  };
};
