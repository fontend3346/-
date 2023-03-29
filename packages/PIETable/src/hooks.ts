import { Emits, Props } from './interfaces'
import {
  reactive,
  onMounted,
  toRefs,
  ref,
  defineExpose,
} from "vue";
import { ElMessage } from "element-plus";


// 操作
export const useHandler = (props: Props, emit: Emits,) => {
  const state = reactive({
    currentExpandIndex: undefined,
    isModal: false,
    item: {},
    getCurrentExpandIndex: "",
    data1: props.data,
    lookBtn: props.lookBtn,
    isAction: props.isAction,
    isTableShow: props.isTableShow,
    isSpecilShow: props.isSpecilShow,
    operateBtn: props.operateBtn,
    action: "操作",
    isShow: false,
  });
  const tables = ref<null | HTMLElement>(null); // table的ref
  const dynamic = (row: any, index: any, item: any) => {
    emit("dynamicBtn", row, index, item);
  };
  const look = (row: any) => {
    // state.item = row;
    emit("look", row);
  };
  const edit = (row: any) => {
    emit("edit", row);
  };
  const operate = (row: any) => {
    emit("operate", row);
  };
  const deleted = (row: any) => {
    emit("deleted", row);
  };
  const deletedPopout = (row: any) => {
    emit("deletedPopout", row);
  };
  const submit = (row: any) => {
    state.item = row;
    emit("submit", row);
  };
  const issue = (row: any) => {
    state.item = row;
  };
  const detail = (row: any) => {
    emit("detail", row);
  };
  //查看
  const lookOver = (item: any) => {
    state.isModal = true;
  };
  //确定查看
  const lookOverOK = () => {
    state.isModal = false;
  };
  const onCurrentChange = (currentRow: any, oldCurrentRow: any) => {
    emit("on-current-change", currentRow, oldCurrentRow);
  };
  const onSelect = (selection: any, row: any) => {
    // console.log('点击触发onSelect', row)

    // 评估模板页面选择控制结束
    emit("on-select", selection, row);
  };
  const onSelectCancel = (selection: any, row: any) => {
    emit("on-select-cancel", selection, row);
  };
  const onSelectAll = (selection: any) => {

  };
  const onSelectionChange = (selection: any) => {
    // this.isModal = true;
    emit("on-selection-change", selection);
  };
  const onSortChange = (column: any, key: any, order: any) => {
    emit("on-sort-change", column, key, order);
  };
  const onFilterChange = (row: any) => {
    emit("on-filter-change", row);
  };
  const onRowClick = (row: any, index: any) => {
    emit("on-row-click", row, index);
  };
  const onRowDblclick = (row: any, index: any) => {
    emit("on-row-dblclick", row, index);
  };
  const onExpand = (row: any, status: any) => {
    emit("on-expand", row, status);
  };
  //确定删除
  const confirmDelete = (row: any) => {
    emit("confirmDelete", row);
  };
  //取消删除
  const cancelDelete = () => {
    ElMessage.info("取消删除");
  };
  onMounted(() => {
    defineExpose({ tables });
  });
  //复选选项
  const changeWeight = (row: any) => { };
  return {
    ...toRefs(state),
    deletedPopout,
    dynamic,
    look,
    deleted,
    submit,
    issue,
    detail,
    lookOver,
    lookOverOK,
    onCurrentChange,
    onSelect,
    onSelectCancel,
    onSelectAll,
    onSelectionChange,
    onSortChange,
    onFilterChange,
    onRowClick,
    onRowDblclick,
    onExpand,
    confirmDelete,
    cancelDelete,
    operate,
    edit,
    tables,
    changeWeight,
  };
}

