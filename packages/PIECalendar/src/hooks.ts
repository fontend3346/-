import { onMounted, watch, reactive, ref } from "vue";
import { Emits, Props } from "./interfaces";
// import http from "../../../src/api/index";
// import { ElMessage } from "element-plus";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const dateValue = ref(new Date());
  const calendar = ref()
  const state = reactive({

  });

  // console.log(dateValue, "dateValue");
  //插槽 按钮
  const selectDate = (val: string) => {
    calendar.value.selectDate(val)
    // console.log(dateValue.value);
    emit("monthChange", dateValue.value)
  }
  //时间选择器改变
  const dateChange = (val: any) => {
    // console.log(val, dateValue);

    emit("dateChange", val)
  }

  //双击某一格 暂时去掉
  const editCell = (data: any) => {
    let currentContent;
    props.allDateContent.forEach((e) => {
      if (e.date == data.day) {
        currentContent = e.content;
      }
    })
    if (!currentContent) {
      emit("dblclick", data, currentContent)
    }

  }
  //单击某一格
  const detailsCell = (data: any) => {
    let currentContent;
    props.allDateContent.forEach((e) => {
      if (e.date == data.day) {
        currentContent = e.content;
      }
    })
    // if (currentContent) {
    emit("dblclick", data, currentContent)
    // }
  }


  //加载单个日期内容
  const dateContent = (data: any) => {
    let res = <any>{};
    props.allDateContent.forEach((e) => {
      if (e.date == data.day) {
        let thisObject = Object.assign({}, e.content)
        res = thisObject;
      }
    })
    if (res.mainShift) {

      // let params = Object.assign(receptionDisposition.maskRowData, collectionList);
      // console.log(res.mainShift, typeof (res.mainShift), JSON.stringify(res.mainShift), "xxxxxx");
      res.mainShift = res.mainShift.toString()
    }
    if (res.standbyShift) {
      res.standbyShift = res.standbyShift.toString()
    }
    // res.standbyShift = res.standbyShift.join(",")
    return res;

  }
  return {
    state,
    dateValue,
    editCell, detailsCell, dateContent, selectDate, calendar, dateChange
  };
};
