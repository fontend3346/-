<template>
  <div class="instrument-admin">
    <!-- 2-1 日报管理 -->
    <div class="header-left-content">
      <div class="left-content-item" v-if="state.userType == 1">
        <span class="left-name">台网</span>
        <el-select
          :popper-append-to-body="false"
          v-model="state.unitId"
          placeholder="请选择站点"
          clearable
          disabled
          @clear="searchList"
          @change="netChange"
        >
          <el-option
            v-for="item in state.unitIdList"
            :key="item.unitId"
            :label="item.unitName"
            :value="item.unitId"
          ></el-option>
        </el-select>
      </div>
      <div class="left-content-item" v-if="state.userType == 2">
        <span class="left-name">台站</span>
        <el-select
          :popper-append-to-body="false"
          v-model="state.unitId"
          placeholder="请选择站点"
          clearable
          filterable
          multiple
          collapse-tags
          @clear="searchList"
          @change="netChange"
        >
          <el-option
            v-for="item in state.unitIdList"
            :key="item.unitId"
            :label="item.unitName"
            :value="item.unitId"
          ></el-option>
        </el-select>
      </div>
      <div class="left-content-item" v-if="state.userType == 1">
        <span class="left-name">台站</span>
        <el-select
          :popper-append-to-body="false"
          v-model="state.siteName"
          placeholder="请选择站点"
          clearable
          filterable
          multiple
          collapse-tags
          @clear="searchList"
          @change="netStationChange"
        >
          <el-option
            v-for="item in state.stationList"
            :key="item.stationId"
            :label="item.name"
            :value="item.stationId"
          ></el-option>
        </el-select>
      </div>
      <div class="left-content-item">
        <span class="left-name">填写人</span>
        <el-select
          :popper-append-to-body="false"
          v-model="state.fillPeople"
          placeholder="请选择状态"
          clearable
          filterable
          @clear="searchList"
        >
          <el-option
            v-for="item in state.fillPeopleList"
            :key="item.officer"
            :label="item.officer"
            :value="item.officer"
          ></el-option>
        </el-select>
      </div>
      <div class="left-content-item">
        <span class="left-name">值班日期</span>
        <el-date-picker
          v-model="state.dutyTime"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
        >
        </el-date-picker>
      </div>
      <div class="left-content-item">
        <span class="left-name">审核状态</span>
        <el-select
          :popper-append-to-body="false"
          v-model="state.checkStatus"
          placeholder="请选择状态"
          clearable
          filterable
          @clear="searchList"
        >
          <el-option
            v-for="item in state.checkStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="left-content-item">
        <span class="left-name">交接人员</span>
        <el-select
          :popper-append-to-body="false"
          v-model="state.replacePeoele"
          placeholder="请选择状态"
          clearable
          filterable
          @clear="searchList"
        >
          <el-option
            v-for="item in state.replacePeoeleList"
            :key="item.replacer"
            :label="item.replacer"
            :value="item.replacer"
          ></el-option>
        </el-select>
      </div>
      <div class="left-content-item">
        <span class="left-name">交接状态</span>
        <el-select
          :popper-append-to-body="false"
          v-model="state.replaceStatus"
          placeholder="请输入交接人员"
          clearable
          filterable
          @clear="searchList"
        >
          <el-option
            v-for="item in state.replaceStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div
        :class="state.userType == 1 ? 'left-content-net' : 'left-content-items'"
      >
        <button @click="fillReport">填写日报</button>
        <button @click="searchList">查询</button>
      </div>
    </div>
    <!--  -->
    <div class="pie-tb-iscontent">
      <PIETable
        :maxHeight="500"
        :data="state.linkageData"
        :columns="state.linkageColumns"
        :isAction="true"
        :showIndex="true"
        :actionSlot="true"
        :auditBtn="true"
        :header-cell-style="{
          background: 'rgba(95, 152, 255, 0.1)',
          fontSize: '16px',
          height: '50px',
          fontWeight: '200',
          letterSpacing: '3px',
        }"
        :cell-style="{
          background: 'transparent',
          fontSize: '15px',
          height: '50px',
          fontWeight: '200',
          color: '@main-font-color',
          letterSpacing: '2px',
        }"
        :row-style="{
          borderBottom: '1px solid #13598C',
          background: 'transparent',
        }"
      >
        <template #action="scope">
          <span
            v-if="scope.row.commitStatus == 2"
            :class="
              scope.row.operate == 1 ? 'editBtn-table' : 'no-access-editBtn'
            "
            @click="edit(scope.row)"
            >编辑</span
          >
          <span
            v-if="scope.row.commitStatus == 1"
            :class="
              scope.row.operate == 1 ? 'editBtn-table' : 'no-access-editBtn'
            "
            @click="recallFun(scope.row)"
            >撤回</span
          >
          <span
            :class="
              scope.row.replace == 1 ? 'editBtn-table' : 'no-access-editBtn'
            "
            @click="handover(scope.row)"
            >交接</span
          >
          <span
            :class="
              state.isAdmin && scope.row.checkStatus == 1
                ? 'editBtn-table'
                : 'no-access-editBtn'
            "
            @click="examine(scope.row)"
            >审核</span
          >
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
          >
            <template #reference>
              <span v-if="scope.row.operate == 1" class="delBtn-table"
                >删除</span
              >
            </template>
          </el-popconfirm>
          <span
            @click="confirmDelete(scope.row)"
            v-if="scope.row.operate == 2"
            class="no-access-editBtn"
          >
            删除</span
          >
        </template>
      </PIETable>
    </div>
    <!--  -->
    <div class="pie-tb-footer">
      <PIEPage
        :total="state.total"
        :pageSize="state.pageSize"
        :currentPage="state.pageNum"
        @handleSizeChange="sizeChange"
        @handleNumChange="pageChange"
      ></PIEPage>
    </div>
    <!-- 新建 / 编辑弹窗 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showAdd"
      width="50"
      height="40"
      @confirm="confirm"
      class="add-modal"
    >
      <template #operateItem>
        <div class="add-wrap">
          <div class="modal-content" v-if="state.title == '编辑'">
            <span class="modal-content-con modal-content-title">{{
              state.editRow.title
            }}</span>
          </div>
          <div class="modal-content" v-if="state.title == '填写日报'">
            <div class="modal-content-con">
              <span class="left-name" v-if="state.userType == 1">台网:</span>
              <span class="left-name" v-if="state.userType == 2">台站:</span>
              <el-select
                :popper-append-to-body="false"
                v-model="state.editRow.updateUnitId"
                placeholder="请选择站点"
                clearable
                filterable
                @change="unitIdChange"
              >
                <el-option
                  v-for="item in state.unitIdList"
                  :key="item.unitId"
                  :label="item.unitName"
                  :value="item.unitId"
                ></el-option>
              </el-select>
            </div>
            <div class="modal-content-con">
              <span class="left-name">值班日期:</span>
              <el-select
                v-model="state.editRow.dailyTime"
                placeholder="请选择填写时间"
                clearable
                filterable
                @change="dateChange"
              >
                <el-option
                  v-for="item in state.dailyTimeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <!-- <div class="modal-content">
        </div> -->
          <div class="modal-content">
            <div class="log-main">
              <span class="left-name">日报内容:</span>
              <el-input
                type="textarea"
                :rows="5"
                v-model="state.editRow.content"
                placeholder="请输入日报内容"
              ></el-input>
            </div>
          </div>

          <div class="main-content" v-if="state.userType == 2">
            <div class="add-content">
              <div class="modal-label-names">
                <span class="title-info">异常信息添加:</span>
                <span @click="addUnusual" class="iconfont icon-jiahao"></span>
              </div>
            </div>
            <div v-if="state.unusualShow" class="unusual-style">
              <div
                v-for="(item, index) in state.unusualInfo"
                :key="index"
                class="unusual-item"
              >
                <!-- <div class="modal-label-font">第{{ index + 1 }}个异常点</div> -->
                <div class="modal-label-names">
                  <span class="title-info">异常信息删除:</span>
                  <span
                    @click="delUnusual(item, index)"
                    class="iconfont icon-a-bianzu20beifen"
                  ></span>
                </div>
                <div class="item-class">
                  <div class="modal-content">
                    <span class="left-name">异常测点:</span>
                    <el-select
                      :popper-append-to-body="false"
                      clearable
                      v-model="item.pointId"
                      placeholder="请选择异常测点"
                      @change="unusualPonintChange"
                    >
                      <el-option
                        v-for="_item in state.unusualPonintList"
                        :key="_item.id"
                        :label="_item.name"
                        :value="_item.id"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="modal-content">
                    <span class="left-name">异常设备:</span>
                    <el-select
                      :popper-append-to-body="false"
                      clearable
                      v-model="item.deviceId"
                      placeholder="请选择异常设备"
                    >
                      <el-option
                        v-for="_item in state.unusualEquipmentList"
                        :key="_item.id"
                        :label="_item.device_name"
                        :value="_item.id"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="modal-content">
                    <span class="left-name">异常名称:</span>
                    <el-input
                      v-model="item.exceptionName"
                      placeholder="请输入异常信息"
                    ></el-input>
                  </div>
                  <div class="modal-content">
                    <span class="left-name">异常信息:</span>
                    <el-input
                      type="textarea"
                      v-model="item.exceptionContent"
                      placeholder="请输入异常信息"
                    ></el-input>
                  </div>
                  <div class="modal-content">
                    <span class="left-name left-name-long">异常开始时间:</span>
                    <!-- <el-date-picker
                  class="update-time"
                  v-model="item.startTime"
                  type="datetime"
                  placeholder="请选择开始时间"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss"
                >
                </el-date-picker> -->
                    <el-time-picker
                      v-model="item.startTime"
                      placeholder="请选择开始时间"
                      format="HH:mm:ss"
                      value-format="HH:mm:ss"
                    />
                  </div>
                  <div class="modal-content">
                    <span class="left-name left-name-long">异常结束时间:</span>
                    <el-date-picker
                      class="update-time"
                      v-model="item.endTime"
                      type="datetime"
                      placeholder="请选择结束时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                    >
                    </el-date-picker>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 审核弹框 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showExamine"
      width="40"
      height="40"
      @confirm="examineConfirm()"
      class="modify-modal"
    >
      <template #operateItem>
        <div class="modal-content">
          <span class="left-name">审核意见:</span>
          <el-input
            v-model="state.examineData"
            type="textarea"
            :rows="5"
          ></el-input>
        </div>
      </template>
    </PIEModal>
    <!-- 日报交接弹框 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showHandover"
      width="40"
      height="40"
      @confirm="handoverConfirm()"
      class="modify-modal"
    >
      <template #operateItem>
        <div class="modal-wrapper">
          <div class="daily-info">
            <span>日报详情:</span>
            <span>{{ state.dataInfo }}</span>
          </div>
          <!-- <div modal-label-title">交接确认:</div> -->
          <div
            class="modal-label-title"
            v-if="state.solvedException.length > 0"
          >
            已解决异常信息:
          </div>
          <div class="solved_info" v-if="state.solvedException.length > 0">
            <div
              v-for="(item, index) in state.solvedException"
              :key="index"
              class="item-content"
            >
              <div class="item-info">
                <div class="title">异常名称</div>
                {{ item.exceptionName }}
              </div>
              <div class="item-info">
                <div class="title">异常内容</div>
                <div class="info">
                  {{ item.exceptionContent }}
                </div>
              </div>
              <div class="item-info">
                <div class="title">测点名称</div>
                {{ item.point }}
              </div>
              <div class="item-info">
                <div class="title">设备名称</div>
                {{ item.device }}
              </div>
            </div>
          </div>
          <div
            class="modal-label-title"
            v-if="state.unresolvedException.length > 0"
          >
            未解决异常信息:
          </div>
          <div
            class="un_resolveInfo"
            v-if="state.unresolvedException.length > 0"
          >
            <div
              v-for="(item, index) in state.unresolvedException"
              :key="index"
              class="item-content"
            >
              <div class="item-info">
                <div class="title">异常名称</div>
                {{ item.exceptionName }}
              </div>
              <div class="item-info">
                <div class="title">异常内容</div>
                <div class="info">
                  {{ item.exceptionContent }}
                </div>
              </div>
              <div class="item-info">
                <div class="title">测点名称</div>
                {{ item.point }}
              </div>
              <div class="item-info">
                <div class="title">设备名称</div>
                {{ item.device }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./index";
import { InfoFilled } from "@element-plus/icons-vue";
const {
  state,
  addUnusual,
  unusualInfoFun,
  dateChange,
  delUnusual,
  delUnusualInfo,
  fillReport,
  edit,
  examine,
  examineConfirm,
  handover,
  handoverConfirm,
  confirmDelete,
  confirm,
  updateApi,
  getJulist,
  searchList,
  pageChange,
  sizeChange,
  unitIdListFun,
  unitIdChange,
  listPointApi,
  unusualPonintChange,
  recallFun,
  netChange,
  stationApi,
  netStationChange,
  writerFun,
  writerApi,
  personUserId,
  dailyReportDate,
} = useHandler();
</script>

<style lang="less" scoped>
.instrument-admin {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  .header-left-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .left-content-item {
      display: flex;
      align-items: center;
      // width: 25%;
      justify-content: flex-end;
      margin-bottom: 10px;
      :deep(.el-input) {
        width: 300px;
        background: transparent;
        border-radius: 5px;
        border: 1px solid @global-border-color;
        height: 40px;
        color: @main-font-color;
        box-sizing: border-box;
      }
      :deep(.el-input__wrapper) {
        width: 300px;
        flex-grow: 0;
      }
      :deep(.el-date-editor) {
        width: 300px;
        height: 40px;
      }
    }
    .left-content-items {
      width: 47.5%;
      display: flex;
      margin-bottom: 10px;
      justify-content: flex-end;
    }
    .left-content-net {
      width: 21.3%;
      display: flex;
      margin-bottom: 10px;
      justify-content: flex-end;
    }
    // .left-content-nets {
    //   width: 75%;
    //   display: flex;
    //   margin-bottom: 10px;
    //   justify-content: flex-end;
    // }
    button {
      padding: 10px 20px;
      box-sizing: border-box;
      background: transparent;
      margin-left: 10px;
      color: @main-font-color;
      border: 1px solid @global-header-bbg;
      cursor: pointer;
      border-radius: 5px;
    }
  }
  // //日报内容
  // .modal-content-con {
  //   display: flex;
  //   align-items: center;
  //   justify-content: flex-start;
  //   width: 100%;
  //   margin-right: 30px;
  // }
  .add-wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  //新增  弹框
  .modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    width: 86%;
    height: 100%;
    //日报内容
    .modal-content-con {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-right: 90px;
    }
    .modal-content-con:last-child {
      margin-right: 0;
    }
    .log-main {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      .left-name {
        width: 84px;
        display: inline-block;
      }
      .el-textarea {
        width: 100%;
      }
    }
    .modal-content-title {
      padding-left: 22px;
      justify-content: flex-start;
    }
    .el-input {
      width: 270px;
      background: transparent;
      border-radius: 5px;
      border: 1px solid @global-border-color;
      // height: 35px;
      color: @main-font-color;
    }
    :deep(.el-input) {
      height: 40px;
      box-sizing: border-box;
    }
    :deep(.el-textarea__inner) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-date-editor) {
      width: 270px;
      height: 40px;
    }
    .el-textarea {
      width: 270px;
    }
    :deep(.el-input__wrapper) {
      flex-grow: 0;
      width: 270px;
    }
  }
  .main-content {
    // display: flex;
    // flex-direction: column;
    // justify-content: flex-start;
    // align-items: center;
    width: 86%;
    .add-content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .unusual-style {
      max-height: 280px;
      overflow-y: auto;
      // padding-right: 10px;
      // padding-left: 26px;
      // box-sizing: border-box;
    }
    // .unusual-style::-webkit-scrollbar {
    //   // display: none;
    // }
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: transparent;
    }

    .modal-content {
      justify-content: flex-end;
    }
    .modal-label-names {
      color: @main-font-color;
      font-size: @main-font-size;
      margin: 20px 0 10px 0;
      padding-right: @title-padding;
      .iconfont {
        cursor: pointer;
      }
      .title-info {
        padding-right: @title-padding;
      }
    }
    .item-class {
      padding: 20px 10px 0 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      border: 1px solid rgba(28, 80, 174, 0.9);
      .modal-content {
        width: 50%;
        margin-bottom: 20px;
      }
    }
    // .modal-label-font {
    //   width: 400px;
    //   color: red;
    //   font-size: @main-font-size;
    //   margin-bottom: 20px;
    //   // padding-left: 10px;
    // }
    // .el-select {
    //   width: 300px;
    // }
  }
  .pie-tb-iscontent {
    margin-top: 10px;
  }

  //日报弹框
  .modal-wrapper {
    padding: 20px;
    width: 100%;
    height: 100%;
    .daily-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: @main-font-color;
      font-size: @main-font-size;
      padding-right: 10px;
    }
    .modal-label-title {
      padding-right: 10px;
      color: @main-font-color;
      font-size: @main-font-size;
      margin: 10px 0;
    }
    .solved_info {
      height: 200px;
      width: 100%;
      overflow-y: auto;
    }
    .un_resolveInfo {
      height: 200px;
      width: 100%;
      overflow-y: auto;
    }
    .item-content {
      width: 100%;
      margin-bottom: 10px;
      .item-info {
        width: 100%;
        display: flex;
        .title {
          text-indent: 2em;
          width: 100px;
        }
        .info {
          width: 100%;
          width: calc(100% - 70px);
        }
      }
    }
    .exceptionInfo {
      width: 100%;
    }
  }
  .update-time {
    :deep(.el-input__inner) {
      background: #fff;
    }
  }
  //下拉框禁止选项样式
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background: transparent !important;
    box-shadow: none;
    border: 1px solid #00aadd;
    flex-grow: 0;
  }
  //公共标题样式
  .left-name {
    display: inline-block;
    width: 76px;
    text-align: end;
    font-size: @main-font-size;
    color: @main-font-color;
    padding-right: @title-padding;
  }
  .left-name-long {
    width: 108px;
  }
  .delBtn-table {
    margin-right: 15px;
    color: #ff0000;
    cursor: pointer;
  }
  .no-access-editBtn {
    margin-right: 15px;
    color: #868181;
    cursor: not-allowed;
    cursor: no-drop;
  }
  .editBtn-table {
    margin-right: 15px;
    color: #00aeff;
    cursor: pointer;
  }
}
</style>
