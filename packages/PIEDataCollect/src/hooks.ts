import { Emits, Props } from "./interfaces";
import { ref, onMounted, nextTick, reactive, watch } from "vue";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  let dataCollectOne = ref();
  let dataCollectTwo = ref();
  let state = reactive({
    deviceName: "",
  });
  onMounted(() => {});
  let activeIndex: any = ref(0);
  const activeDown = (index, item) => {
    activeIndex.value = index;
    emit("activeDown", item);
  };
  const deviceNameChange = (val: any) => {
    emit("deviceNameChange", val);
  };
  const handleSizeChange = (val) => {
    emit("handleSizeChange", val);
  };
  const handleNumChange = (val) => {
    emit("handleNumChange", val);
  };
  const handleSizeChangeCopy = (val) => {
    emit("handleSizeChangeCopy", val);
  };
  const handleNumChangeCopy = (val) => {
    emit("handleNumChangeCopy", val);
  };
  const activeOpen = (row) => {
    emit("activeOpen", row);
  };

  const confirmStartUse = (row) => {
    emit("confirmStartUse", row);
  };
  const logFun = (row) => {
    emit("logFun", row);
  };
  const waveformFun = (row) => {
    emit("waveformFun", row);
  };
  const moreClick = (row) => {
    emit("moreClick", row);
  };
  const rowClick = (row) => {
    nextTick(() => {
      dataCollectTwo.value.tables.setCurrentRow(row, true);
    });
    emit("rowClick", row);
  };
  const rowClickOne = (row) => {
    nextTick(() => {
      dataCollectOne.value.tables.setCurrentRow(row, true);
    });
    emit("rowClickOne", row);
  };
  const searchOne = (row) => {
    emit("searchOne", row);
  };
  const searchTwo = (row) => {
    emit("searchTwo", row);
  };

  const provinceChange = (row: any, index: any) => {
    emit("provinceChange", row, index);
  };

  const taiwaneseChange = (row: any, index: any) => {
    emit("taiwaneseChange", row, index);
  };
  const stationsChange = (row: any, index: any) => {
    emit("stationsChange", row, index);
  };
  const equipmentChange = (row) => {
    emit("equipmentChange", row);
  };
  const deleteReceive1 = (row) => {
    emit("deleteReceive1", row);
  };

  return {
    state,
    activeIndex,
    activeDown,
    handleSizeChange,
    deviceNameChange,
    handleSizeChangeCopy,
    handleNumChange,
    handleNumChangeCopy,
    activeOpen,
    confirmStartUse,
    logFun,
    waveformFun,
    rowClick,
    rowClickOne,
    moreClick,
    dataCollectOne,
    dataCollectTwo,
    searchOne,
    searchTwo,
    provinceChange,
    taiwaneseChange,
    stationsChange,
    equipmentChange,
    deleteReceive1,
  };
};
