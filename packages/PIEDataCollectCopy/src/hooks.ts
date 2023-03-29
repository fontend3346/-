import { Emits, Props } from "./interfaces";
import { ref, onMounted, nextTick, watch } from "vue";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  let dataCollectOne = ref();
  let dataCollectTwo = ref();
  onMounted(() => {});
  let activeIndex: any = ref(0);
  const activeDown = (index, item) => {
    activeIndex.value = index;
    emit("activeDown", item);
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

  const detailData = (row) => {
    emit("detailData", row);
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
    activeIndex,
    activeDown,
    handleSizeChange,
    handleSizeChangeCopy,
    handleNumChange,
    handleNumChangeCopy,
    activeOpen,
    detailData,
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
