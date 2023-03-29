import { onMounted, ref } from "vue";
import { Emits, Props } from "./interfaces";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  let selectButtonValue = ref(1);
  let selecValue = ref(0);
  let energyValue = ref(1);
  let dateNow = ref([]);
  const selectActive = (item) => {
    emit("selectActive", item);
  }
  const buttonClick = (index) => {
    selectButtonValue.value = index;
    emit("buttonClick", index)
  }
  const searchClick = (e) => {
    emit("searchClick", e);
  }
  const subscribeClick = (e) => {
    emit("subscribeClick", e);
  }
  const changeValue = (item) => {
    emit("changeRadiusValue", item);
  }
  const changeDate = (value) => {
    dateNow.value = value;
    emit("changeDate", value);
  }
  const changeValueOne = (value) => {
    energyValue.value = value;
    emit("changeValueOne", value);
  }
  onMounted(() => {
  });

  return { selectActive, buttonClick, selectButtonValue, selecValue, searchClick, subscribeClick, changeValue, dateNow, changeDate, changeValueOne, energyValue };
};
