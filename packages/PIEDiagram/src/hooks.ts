import {
  onMounted,
  ref,
  reactive,
  getCurrentInstance,
  onBeforeMount,
  watch,
  nextTick,
} from "vue";
import { Emits, Props } from "./interfaces";
import * as echarts from "echarts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance() as any;

  const state = reactive({
    options: {

    }
  });
  let open = [false, false, false, false, false, false]
  let myChart: any = ref();
  // let myChartDom = myChart.value;
  let myEchart: any = null
  const initEchart = () => {
    myEchart = echarts.init(myChart.value);
    if (props.option != null) {
      state.options = props.option
      myEchart.setOption(props.option);
    } else {
      state.options = {
        title: {
          text: "",
          subtext: "",
          top: "center",
          left: "center",
        },
        // tooltip: {},
        color:['#FFC617', '#33AAFF', '#39F6AC', '#FFD864', '#DA7AFF','#FF7171','#FF4D97'],
        legend: [
          {
            // selectedMode: 'single',
            show: true,
            data: props.categories.slice(1, props.categories.length).map(function (a: any) {
              return a.name;
            }),
            top: 40,
            itemWidth: 14,
            itemHeight: 8,
            textStyle: {
              color: "#fff",
              fontSize: "12px",
              fontWeight: 400,
            },
          },
        ],
        label: {
          show: true,
          position: "bottom",
          distance: 5,
          fontSize: 14,
          align: "center",
        },
        series: [
          {
            type: "graph",
            layout: "force",
            top: '20%',
            data: props.nodes.slice(0, 7),
            links: props.links,
            categories: props.categories,
            roam: true,
            label: {
              show: true,
              position: "bottom",
              formatter: "{b}",
            },
            lineStyle: {
              color: "source",
              curveness: 0.2,
            },
            emphasis: {
              focus: "adjacency",
              lineStyle: {
                width: 10,
              },
            },
            force: {
              repulsion: 500,
              layoutAnimation: true,
              gravity: 0.1,
              edgeLength: 80
            },
          },
        ]
      }
      myEchart.setOption(state.options);
    }
    myEchart.on('click', function (param: any) {
      if (param.dataType == 'node') {
        if (param.data.level != 2) {
          emit('clickNode', param.data.value)
        }
        // 点击学科类别，展开或者收起节点
        else {
          open[param.data.category - 1] = !open[param.data.category - 1]
          let newnode = props.nodes.slice(0, 7)
          for (let i = 0; i < open.length; i++) {
            if (open[i]) {
              props.nodes.map((e: any) => {
                if ((e.level == 3) && (e.category == i + 1)) {
                  newnode.push(e)
                }
              })
            }
          }
          state.options.series[0].data = newnode
          myEchart.setOption(state.options)
        }
      }
    });
  };

  onMounted(() => {
    initEchart();
  });
  watch(
    () => props.fresh,
    () => {
      nextTick(() => {
        console.log('watch');

        state.options.series[0].data = props.nodes.slice(0, 7)
        state.options.series[0].links = props.links
        state.options.series[0].categories = props.categories
        myEchart.setOption(state.options)
      })
    },
    {
      deep: true,
    }
  );
  return {
    initEchart,
    myChart,
    state,
  };
};
