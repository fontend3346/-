<template>
  <div class="pie-table">
    <el-table
      :loading="loading"
      ref="tables"
      :data="data"
      :columns="columns"
      :border="border"
      v-bind="$attrs"
      @current-change="onCurrentChange"
      @select="onSelect"
      @select-cancel="onSelectCancel"
      @select-all="onSelectAll"
      @selection-change="onSelectionChange"
      @sort-change="onSortChange"
      @row-click="onRowClick"
      @row-dblclick="onRowDblclick"
      @on-expand="onExpand"
      @changeWeight="changeWeight"
      disabled-hover
      :max-height="maxHeight"
      :span-method="objectSpanMethod"
    >
      <el-table-column
        v-if="showCheckbox"
        type="selection"
        width="50"
      ></el-table-column>
      <el-table-column
        v-if="showIndex"
        type="index"
        label="序号"
        :index="1"
        width="70"
      ></el-table-column>

      <template v-for="item in columns" :key="item" v-if="isTableShow">
        <el-table-column
          v-if="item"
          :prop="item.prop"
          :label="item.label"
          show-overflow-tooltip
          :sortable="item.sortable"
          :width="item.width ? item.width : ''"
          :filters="item.filters || null"
          :filter-method="item.filterMethod"
        >
          <!-- 插槽 -->
          <template #default="scope">
            <slot
              v-if="item.isTemplate"
              :name="item.prop"
              :row="scope.row"
            ></slot>
            <template v-else>{{ scope.row[item.prop] }}</template>
          </template>
        </el-table-column>
      </template>
      <template v-for="item in columns" :key="item" v-if="isSpecilShow">
        <el-table-column
          v-if="item"
          :prop="item.prop"
          :label="item.label"
          show-overflow-tooltip
          :sortable="item.sortable"
          :width="item.width ? item.width : ''"
          :filters="item.filters || null"
          :filter-method="item.filterMethod"
        >
          <!-- 插槽 -->
          <template #default="scope">
            <slot
              v-if="item.isTemplate"
              :name="item.prop"
              :row="scope.row"
            ></slot>
            <template v-else>{{ scope.row.properties[item.prop] }}</template>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        :label="action"
        v-if="isAction"
        class="btnClass"
        :width="operationWidth ? operationWidth : ''"
      >
        <template #default="scope">
          <span
            v-if="detailBtnIcon"
            class="lookBtn-table"
            @click.stop="detail(scope.row)"
            ><i class="iconfont icon-liebiao"></i
          ></span>
          <span
            v-if="detailBtn"
            class="lookBtn-table"
            @click.stop="detail(scope.row)"
            >详情</span
          >
          <span
            v-if="lookBtn"
            class="lookBtn-table"
            @click.prevent="look(scope.row)"
            >查看</span
          >
          <!-- 编辑图标 -->
          <span
            v-if="editBtnIcon"
            class="editBtns-table"
            @click="edit(scope.row)"
            ><i class="iconfont icon-bianji"></i
          ></span>
          <span v-if="editBtn" class="editBtn-table" @click="edit(scope.row)"
            >编辑</span
          >
          <span
            v-if="titleClick"
            class="editBtn-table"
            @click="titleClicks(scope.row)"
            >{{ titleWrap }}</span
          >

          <span
            v-if="recallBtn && scope.row.commitStatus == 1"
            :class="
              scope.row.operate == 1 ? 'editBtn-table' : 'no-access-editBtn'
            "
            @click="recallClicks(scope.row)"
            >{{ recallTitle }}</span
          >
          <span
            v-if="editBtnSpal && scope.row.commitStatus == 2"
            :class="
              scope.row.operate == 1 ? 'editBtn-table' : 'no-access-editBtn'
            "
            @click="editSpal(scope.row)"
            >编辑</span
          >
          <span
            v-if="contentBtn"
            :class="
              scope.row.replace == 1 ? 'editBtn-table' : 'no-access-editBtn'
            "
            @click="contentFun(scope.row)"
            >{{ contentTitle }}</span
          >
          <span
            v-if="auditBtn"
            class="editBtn-table"
            @click="auditClicks(scope.row)"
            >{{ auditTitle }}</span
          >
          <span
            v-if="isStartUseBtn"
            class="activeBtn-table"
            @click="confirmStartUse(scope.row)"
          >
            <span>开启</span>
          </span>

          <span
            v-if="activationBtn"
            class="activeBtn-table"
            @click="activeOpen(scope.row)"
          >
            <span>关闭</span>
          </span>
          <span
            v-if="manageBtn"
            class="lookBtn-table"
            @click="manage(scope.row)"
            >管理</span
          >
          <span
            v-if="sourceManageBtn"
            :class="
              scope.row.authoritiesCode != '29ua4cZVKNZmqJf7bHsHo'
                ? 'lookBtn-table'
                : 'no-access-editBtn'
            "
            @click="sourceManage(scope.row)"
            >资源</span
          >
          <span v-if="limitBtn" class="lookBtn-table" @click="limit(scope.row)"
            >权限</span
          >
          <span v-if="groupBtn" class="lookBtn-table" @click="group(scope.row)"
            >角色</span
          >
          <!-- 动态按钮名 传出row index  使用时把dynamicShow改为true-->
          <span
            v-show="dynamicShow"
            class="lookBtn-table"
            :class="item.value"
            v-for="(item, index) in dynamicBtnName"
            :key="item.value"
            @click="dynamic(scope.row, index, item)"
          >
            {{ item.label }}
          </span>
          <!-- 删除按钮-不带弹框 -->
          <span
            v-if="deleteBtnPopout"
            class="delBtn-table"
            @click="deletedPopout(scope.row)"
            >删除</span
          >
          <!-- 按钮插槽，页面可自定义按钮样式和操作 -->
          <slot v-if="actionSlot" name="action" :row="scope.row"></slot>

          <!-- 删除按钮-带弹框 -->
          <el-popconfirm
            placement="top"
            width="160"
            confirm-button-text="确定"
            cancel-button-type="info"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="red"
            :title="deleteTitle"
            @confirm="confirmDelete(scope.row)"
            @cancel="cancelDelete"
          >
            <template #reference>
              <span class="delBtn-table" @click="deleted" v-show="deleteBtn">{{
                deleteLabel
              }}</span>
            </template>
          </el-popconfirm>
          <!-- 删除-带图标 -->
          <el-popconfirm
            placement="top"
            width="160"
            confirm-button-text="确定"
            cancel-button-type="info"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="red"
            title="确定删除吗？"
            @confirm="confirmDelete(scope.row)"
            @cancel="cancelDelete"
          >
            <template #reference>
              <span class="delBtn-table" @click="deleted" v-show="deleteBtnIcon"
                ><i class="iconfont icon-shanchu1"></i
              ></span>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";
import { toRefs } from "vue";
import { InfoFilled } from "@element-plus/icons-vue";
const emit = defineEmits<{
  (event: "manage", row: any): void;
  (event: "sourceManage", row: any): void;
  (event: "limit", row: any): void;
  (event: "group", row: any): void;
  (event: "dynamicBtn", row: any, index: any, item: any): void;
  (event: "look", row: any): void;
  (event: "edit", row: any): void;
  (event: "operate", row: any): void;
  (event: "deleted", row: any): void;
  (event: "deletedPopout", row: any): void;
  (event: "titleClicks", row: any): void;
  (event: "contentFun", row: any): void;
  (event: "editSpal", row: any): void;
  (event: "recallClicks", row: any): void;
  (event: "auditClicks", row: any): void;
  (event: "submit", row: any): void;
  (event: "detail", row: any): void;
  (event: "on-current-change", currentRow: any, oldCurrentRow: any): void;
  (event: "on-select", selection: any, row: any): void;
  (event: "on-select-cancel", selection: any, row: any): void;
  (event: "on-selection-change", row: any): void;
  (event: "on-sort-change", column: any, key: any, order: any): void;
  (event: "on-filter-change", row: any): void;
  (event: "on-row-click", row: any, index: any): void;
  (event: "on-row-dblclick", row: any, index: any): void;
  (event: "on-expand", row: any, status: any): void;
  (event: "confirmDelete", row: any): void; //确定删除
  (event: "downRow", row: any): void; // 下载按钮
  (event: "replyRow", row: any): void; // 批复按钮
  (event: "activeOpen", row: any): void; // 激活按钮
  (event: "confirmStartUse", row: any): void;
}>();

const props = withDefaults(
  defineProps<{
    action: string; // 自定义行的名称
    border: boolean;
    titleWrap: string;
    contentTitle: string;
    auditTitle: string;
    recallTitle: string;
    deleteTitle: string; // 删除标题描述
    deleteLabel: string; // 删除
    titleClick: boolean;
    contentBtn: boolean;
    auditBtn: boolean;
    recallBtn: boolean; // 撤回
    showIndex: boolean; //是否显示序号列(从1开始)
    isAction: boolean;
    isTableShow: boolean;
    isSpecilShow: boolean;
    showCheckbox: boolean; //是否显示多选框
    data: any; // 表格数据
    objectSpanMethod: any;
    lookBtn: boolean; //查看按钮是否显示
    editBtnIcon: boolean;
    editBtnSpal: boolean;
    deleteBtnIcon: boolean;
    detailBtnIcon: boolean;
    activationBtn: boolean; // 激活按钮是否显示
    isStartUseBtn: boolean;
    editBtn: boolean; //编辑按钮是否显示
    deleteBtn: boolean; //编辑按钮是否显示
    deleteSpecialBtn: boolean;
    setBtnText: string;
    operateBtn: boolean; //操作按钮是否显示
    columns: any; // 表头
    operationWidth: any; // 操作列宽度
    loading: boolean;
    maxHeight: string;
    detailBtn: boolean;
    manageBtn: boolean;
    sourceManageBtn: boolean;
    limitBtn: boolean;
    deleteBtnPopout: boolean;
    groupBtn: boolean;
    dynamicBtnName: any;
    dynamicShow: boolean;
    actionSlot: boolean;
  }>(),
  {
    action: "操作",
    border: false,
    titleWrap: "参数设置",
    contentTitle: "参数设置",
    auditTitle: "参数设置",
    recallTitle: "参数设置",
    deleteTitle: "确定删除吗？",
    deleteLabel: "删除",
    titleClick: false,
    contentBtn: false,
    auditBtn: false,
    recallBtn: false, // 撤回
    showIndex: false, //是否显示序号列(从1开始)
    isAction: false,
    isTableShow: true,
    isSpecilShow: false,
    showCheckbox: false, //是否显示多选框
    data: [],
    objectSpanMethod: {},
    lookBtn: false,
    editBtnIcon: false,
    editBtnSpal: false,
    deleteBtnIcon: false,
    detailBtnIcon: false,
    activationBtn: false,
    isStartUseBtn: false,
    editBtn: false,
    deleteBtn: false,
    deleteSpecialBtn: false,
    setBtnText: "设置",
    operateBtn: false,
    columns: [],
    operationWidth: null,
    loading: false,
    maxHeight: "500",
    detailBtn: false,
    manageBtn: false,
    sourceManageBtn: false,
    limitBtn: false,
    deleteBtnPopout: false,
    groupBtn: false,
    dynamicBtnName: [{ value: "动态按钮名", label: "传入dynamicBtnName值" }],
    dynamicShow: false,
    actionSlot: false,
  }
);

const {
  currentExpandIndex,
  isModal,
  item,
  getCurrentExpandIndex,
  data1,
  lookBtn,
  isAction,
  isTableShow,
  isSpecilShow,
  operateBtn,
  action,
  isShow,
  manage,
  sourceManage,
  limit,
  deletedPopout,
  group,
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
  downRow,
  replyRow,
  contentFun,
  titleClicks,
  editSpal,
  recallClicks,
  auditClicks,
  tables,
  changeWeight,
  activeOpen,
  confirmStartUse,
} = useHandler(props, emit);
</script>
<style lang="less" scoped>
.pie-table {
  flex: 1;
  width: 100%;
  position: relative;
  // 删除弹框

  :deep(.el-table__header) {
    width: 100% !important;
    table-layout: auto !important;
  }

  :deep(.el-table__body) {
    width: 100% !important;
    table-layout: auto !important;
  }

  :deep(.el-table__body-wrapper) {
    width: 100%;
    max-height: 500px;
    // overflow-y: scroll;
  }
}

// 删除弹窗框背景色
:deep(.my-modal) {
  background-color: transparent;
}

:deep(.el-table) {
  // position: absolute;
  color: @main-font-color;
  background: transparent;
  border: none;
  width: 100%;
  //--el-table-text-color:red;

  el-table__header-wrapper table,
  .el-table__body-wrapper table {
    width: 100% !important;
  }

  .el-table__body,
  .el-table__footer,
  .el-table__header {
    table-layout: auto;
  }

  el-table__header-wrapper table,
  .el-table__body-wrapper table {
    width: 100% !important;
  }

  .el-table__body,
  .el-table__footer,
  .el-table__header {
    table-layout: auto;
  }

  // border-top: 1px solid #1d3870;
  // border-bottom: 1px solid #1d3870;
}
//表格th 字体颜色
:deep(.el-table__header-wrapper .el-table__header tr th) {
  color: @main-font-color;
}
.cell {
  color: @main-font-color;
  // border: 1px solid;
}

:deep(.el-table thead) {
  background: transparent;
  color: #fff;
}

.el-table--enable-row-transition .el-table__body tr:nth-of-type(even) {
  background: transparent;
  max-width: 100%;
}

.el-table--enable-row-transition .el-table__body tr:nth-of-type(odd) {
  background: transparent;
}

.table-box {
  width: 100%;

  :deep(.el-table tr:nth-child(odd)) {
    //偶数行
    background: transparent;
  }

  :deep(.el-table tr:nth-child(even)) {
    //偶数行
    background: transparent;
  }

  :deep(th.el-table__cell.is-leaf) {
    text-align: center;
    background: @table-th-bg;
    border: none;
    // border-left: 1px solid @th-border-color;
    color: @main-font-color;
  }

  :deep(td.el-table__cell) {
    // border-bottom: 1px solid @th-border-color;
    // border-left: 1px solid @th-border-color;
    text-align: center;
  }

  :deep(.cell) {
    word-break: break-all;
  }

  :deep(.el-table__body tr.current-row > td.el-table__cell) {
    // color: #000;
    background-color: transparent;
    // color: #fff;
  }

  :deep(.el-table tr:hover) {
    color: @th-border-color;
  }

  :deep(.el-table th.el-table__cell > .cell) {
    padding: 0;
  }
}

:deep(.el-table th.el-table__cell > .cell .icon-style::before) {
  text-align: center;
}

.ouputBtn-table {
  margin-right: 10px;
  cursor: pointer;
}

.detailBtn-table {
  margin-right: 10px;
  cursor: pointer;
}

.setBtn-table {
  cursor: pointer;
}

.icon-yanjing {
  color: #d8af19;
  margin-right: 15px;
}

.img-style {
  width: 24px;
}

.icon-bianji {
  color: #e57514;
  margin-right: 15px;
}

.icon-7 {
  color: #d22062;
}

//表格按钮颜色
.lookBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.updateBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.handleBtn-table {
  margin-right: 15px;
  color: rgb(0, 156, 92);
  cursor: pointer;
}

.editBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}
.no-access-editBtn {
  margin-right: 15px;
  color: #868181;
  cursor: not-allowed;
  cursor: no-drop;
}
.editBtns-table {
  // margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.planBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.taskBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.dataDetailsBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

// 状态为0时
.dataDetailsBtns-table {
  margin-right: 15px;
  color: rgb(134, 129, 129);
  cursor: not-allowed;
  cursor: no-drop;
}

.resultDownBtns-table {
  margin-right: 15px;
  color: rgb(134, 129, 129);
  cursor: not-allowed;
  cursor: no-drop;
}

.taskDeduceBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.reportDetailsBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.startServeBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.newAgainBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.reportDownBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}
.replyBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.modelBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.taskDataBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.inferBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.imageViewBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.basicAbilityBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.basicAbilityFinallyBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.setProductScoreBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.productBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.productUploadBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.allScoreBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.setProductBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.efficiencyBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.reportBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.reportBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.resultDownBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.port {
  cursor: pointer;
}

.implementBtn-cancel-table {
  margin-right: 15px;
  color: #e57514;
  cursor: pointer;
}

.implementBtn-table {
  margin-right: 15px;
  color: rgb(0, 156, 92);
  cursor: pointer;
}

//操作
.operateBtn-table {
  margin-right: 15px;
  color: #ae00ff;
  cursor: pointer;
}

.uploadBtn-table {
  margin-right: 15px;
  // color: #ae00ff;
  cursor: pointer;
}

//群组
.reportBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

//注销
.logoutBtn-table {
  margin-right: 15px;
  color: #ae00ff;
  cursor: pointer;
}

.processRepeatBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

//恢复
.recoveryBtn-table,
.downBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

// 结果导入
.resultInputBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

//销毁
.destroyBtn-table {
  margin-right: 15px;
  // color: #b1bdb8;
  color: rgb(0, 156, 92);
  cursor: pointer;
}

//资源样式
.sourceManageBtn-table {
  margin-right: 15px;
  color: greenyellow;
  cursor: pointer;
}

// 分发
.distributeBtn-table {
  margin-right: 15px;
  color: greenyellow;
  cursor: pointer;
}

.delBtn-table,
.stopUseBtn-table {
  // margin-right: 15px;
  margin-right: 15px;
  color: #ff0000;
  cursor: pointer;
}

.removeBtn-table {
  margin-right: 15px;
  // color: #ff0000;
  cursor: pointer;
}

.handleBtn-table {
  margin-right: 15px;
  color: rgb(0, 156, 92);
  cursor: pointer;
}

.isweightBtn-table {
  width: 50%;

  .el-input__inner {
    color: #98dcff;
  }
}

.isweightShow-table,
.startUseBtn-table {
  margin-right: 15px;
  color: rgb(255, 255, 255);
  cursor: pointer;
}

.public-table {
  color: #9a9a9a !important;
}

.topBtn-table,
.upBtn-table {
  margin-right: 15px;
  color: #c9e1ff;
  cursor: pointer;
}

.isCheck {
  color: #9a9a9a;
}

.encryptBtn-table {
  // color: #8ef258;
  cursor: pointer;
}

.decodeBtn-table {
  // color: #e5540d;
  cursor: pointer;
}

:deep(.el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td.el-table__cell) {
  background: transparent;
  color: @main-font-color;
}

.red {
  color: red;
}

.green {
  color: green;
}

.yellow {
  color: yellow;
}

.drop {
  margin: 0 auto;
}

.my-modal {
  color: @main-font-color;
}

.my-modal .operate-item {
  text-align: left;
}

.disabled {
  color: #ccc;
}

.el-table--small {
  font-size: @main-font-size;
}

// 样本标注任务管理详情按钮
.taskDetailBtn-table {
  color: #8080ff;
  cursor: pointer;
  margin-right: 15px;
}

// 取消按钮
.cancelBtn-table {
  color: #d7d7d7;
  cursor: pointer;
  margin-right: 15px;
}

.process-style {
  width: 120px !important;
  margin: 0 15px;
}

.el-button--small {
  padding: 8px 7px;
}

.status-box {
  border: 1px solid #00aeff;
}

.activeBtn-table {
  span {
    cursor: pointer;
    margin-right: 5px;
  }
}
</style>
