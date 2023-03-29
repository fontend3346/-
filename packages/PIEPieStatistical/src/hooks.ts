import { onMounted, ref,reactive ,getCurrentInstance,onBeforeMount} from "vue";
import { Emits, Props } from "./interfaces";
import * as echarts from "echarts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const {
      appContext: {
        config: { globalProperties },
      },
    } = getCurrentInstance() as any;
  let activeIndex = ref(0);
  const selectActive = (item, index) => {
    activeIndex.value = index;
    emit("selectActive", item);
  }
  let time = ref(null)
  let date = ref(null)
  let time1 = ref(null)
  let myChart: any = ref()
  const state = reactive({
    option: {}
  })
  const initEchart = () => {

    state.option = props.options;
    let myChartDom = myChart.value;
    let myEchart = echarts.init(myChartDom);
    // let myEchart = new baseCharts(myChartDom);
    // let myEchart = echarts.init(document.getElementsByClassName("my-chart"));
    myEchart.setOption(state.option)
  }

  onMounted(() => {
    initEchart()
  });

  return { selectActive, activeIndex,time1 ,myChart};
};
