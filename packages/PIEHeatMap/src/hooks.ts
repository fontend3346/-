import { Props, Emits } from "./interfaces";
import { reactive, onMounted, watch, ref } from "vue";
import * as echarts from "echarts";
import { center } from "@turf/turf";

export const useHandler = (props: Props, emit: Emits) => {
  const state = reactive({
    options: {},
  });
  let chart = ref();
  let mychart = ref();
  const handleData = () => {
    let arr: any = props.data.map((item: any) => {
      return [
        item.name,
        item.value,
        item.station_id,
        [item.longitude, item.latitude],
      ];
    });
    // arr.sort((a: any, b: any) => b[1] - a[1])
    let chartData: any = [];
    let title: any = [];
    let netstaion_id: any = [];
    let index: number = 0;
    let coordinate: any = [];

    arr.map((item: any) => {
      chartData.push([index % 6, 5 - Math.floor(index / 6), item[1]]);
      title.push(item[0]);
      netstaion_id.push(item[2]);
      coordinate.push(item[3]);
      index++;
    });
    return {
      chartData: chartData,
      title: title,
      netstaion_id: netstaion_id,
      coordinate: coordinate,
    };
  };
  const initcharts = () => {
    mychart.value = echarts.init(chart.value);
    let { chartData, title, netstaion_id, coordinate } = handleData();
    if (props.option == null) {
      state.options = {
        tooltip: {
          position: "top",
          formatter: function (p: any) {
            return (
              title[p.data[0] + (5 - p.data[1]) * 6] +
              `${props.rateName}:` +
              p.data[2] +
              "%"
            );
          },
        },
        grid: {
          height: "70%",
          width: "90%",
          left: "center",
          // top: 'center'
        },
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6"],
          show: false,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: "category",
          show: false,
          data: ["1", "2", "3", "4", "5", "6"],
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          min: 0,
          max: 100,
          show: true,
          calculable: true,
          orient: "horizontal",
          left: "center",
          bottom: "2%",
          // color: ["#6FE9B1", "#EB887F"],
          color: ["#F9C727", "rgba(99,237,255,0.08)"],
          border: true,
        },
        series: [
          {
            type: "heatmap",
            data: chartData,
            label: {
              show: true,
              formatter: function (p: any) {
                return (
                  title[p.data[0] + (5 - p.data[1]) * 6].slice(0, 2) +
                  "\n" +
                  p.data[2]
                );
              },
              textStyle: {
                color: "white",
              },
            },
            emphasis: {
              itemStyle: {
                // color: "rgba(111, 233, 177, 0.7)",
                // color: "rgba(86, 209, 164,0.8)",
                // borderColor: "rgba(99,237,255,0.08)",
                // borderWidth: 1,
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.8)",
              },
            },
          },
        ],
      };
    } else {
      state.options = props.option;
    }
    mychart.value.setOption(state.options);
    mychart.value.on("click", (item: any) => {
      let data = item.data;
      let i = data[0] + (5 - data[1]) * 6;
      let id = {
        network_id: netstaion_id[i],
        cname: title[i],
        latitude: coordinate[i][1],
        longitude: coordinate[i][0],
      };
      emit("clickHeatMap", id);
    });
  };
  onMounted(() => {
    initcharts();
  });

  return {
    chart,
  };
};
