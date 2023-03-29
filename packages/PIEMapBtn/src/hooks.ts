import { onMounted, ref,reactive ,getCurrentInstance,onBeforeMount} from "vue";
import { Emits, Props } from "./interfaces";

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
  // let time1 = ref(null)
  // 获取时间
  // const isTime = () => {
  //     // let time = setInterval(() => {
  //     //   _this.time = _this.$utils.formatDate(new Date(), 2);
  //     // }, 1000);
  //     time = globalProperties.$utils.formatDate(new Date(), 9);
  //     date = globalProperties.$utils.formatDate(new Date(), 8);

  //     setInterval(() => {
  //       time = globalProperties.$utils.formatDate(new Date(), 9);
  //      date = globalProperties.$utils.formatDate(new Date(), 8);
  //     }, 1000);
  //   // debugger
  //     // console.log(date,time);
  //   time1 = date +" " +time
  //   console.log(time1,"time1")
  // };
  onMounted(() => {
    // isTime();
  });
  // onBeforeMount(() => {
  //     isTime();
  //   });

  return { selectActive, activeIndex };
};
