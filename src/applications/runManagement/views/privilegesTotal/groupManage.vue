<template>
  <!-- 3-1 台站管理 -->
  <div class="group-manage-wrapper">
    <div class="safety-domain-header">
      <div class="domain-header-left">
        <div class="header-left-content">
          <span>台站名称</span>
          <el-input
            v-model="state.nameInput"
            clearable
            placeholder="请输入台站名称"
          ></el-input>
        </div>
      </div>
      <div class="domain-header-right">
        <button title="查询" @click="getDataList">查询</button>
        <!-- <button title="批量删除" @click="batchesDelete">批量删除</button> -->
        <button title="新增" @click="openHobby">新增</button>
      </div>
    </div>
    <div class="pie-tb-iscontent">
      <!-- 表格 -->
      <PIETable
        :columns="state.dataColumns"
        :data="state.tableData"
        :isAction="true"
        :deleteBtn="true"
        :showCheckbox="true"
        :editBtn="true"
        :showIndex="true"
        :groupBtn="true"
        @group="groupEvent"
        @edit="update"
        @confirmDelete="confirmDelete"
        @selection-change="onSelectionChange"
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
      </PIETable>
    </div>
    <div class="pie-tb-footer">
      <PIEPage
        :total="state.total"
        :pageSize="state.pageSize"
        :currentPage="state.pageNum"
        @handleSizeChange="sizeChange"
        @handleNumChange="pageChange"
      ></PIEPage>
    </div>
    <!-- 新增弹框 -->
    <PIEModal
      v-model:visible="state.isHobby"
      :title="state.title"
      :resetBtn="false"
      @confirm="createDepart"
      width="40"
      @cancel="cancel"
      iconShow="true"
      :close="true"
    >
      <template v-slot:operateItem>
        <div class="modal-wrapper">
          <div class="modal-content modal-content1">
            <span class="modal-label-name">台站名称:</span>
            <el-input
              v-model="state.aduitId"
              placeholder="请输入台站名称"
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">组织:</span>
            <el-select
              clearable
              v-model="state.mechanism"
              placeholder="请选择组织"
              class="modal-select"
            >
              <el-option
                v-for="item in state.mechanismArry"
                :key="item.deptId"
                :label="item.fullName"
                :value="item.deptId"
                class="select-item"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content modal-content1">
            <span class="modal-label-name">真实名称:</span>
            <el-input
              v-model="state.shortName"
              placeholder="请输入真实名称"
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">备注:</span>
            <el-input
              type="textarea"
              v-model="state.remark"
              placeholder="请输入备注"
            ></el-input>
          </div>
          <!-- <div class="modal-content transfer-content">
            <span class="modal-label-name">管理成员:</span>
            <div @click="openTransfer" class="style-transfer">+</div>
          </div>
          <div class="modal-content" v-show="state.isShowTransfer === true">
            <el-transfer
              class="transfer-class"
              v-model="state.transferValue"
              :titles="['所有成员', '本台站成员']"
              :button-texts="['移除', '添加']"
              @change="handleChange1"
              filterable
              :data="state.transferAlldata"
            >
              <template v-slot:{ option }>{{ option.label }}</template>
            </el-transfer>
          </div> -->
        </div>
      </template>
    </PIEModal>
    <!-- 修改对话框 -->
    <PIEModal
      v-model:visible="state.isHobby1"
      :title="state.title"
      :resetBtn="false"
      @confirm="departUpdate"
      width="40"
      height="35"
      @cancel="cancel"
      iconShow="true"
      :close="true"
    >
      <template v-slot:operateItem>
        <div class="modal-wrapper">
          <div class="modal-content modal-content1">
            <span class="modal-label-name">台站名称:</span>
            <el-input
              v-model="state.departAllPath"
              placeholder="请输入台站名称"
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">组织:</span>
            <el-select
              clearable
              v-model="state.departmechanism"
              placeholder="请选择组织"
              class="modal-select"
            >
              <el-option
                v-for="item in state.mechanismArry"
                :key="item.deptId"
                :label="item.fullName"
                :value="item.deptId"
                class="select-item"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content modal-content1">
            <span class="modal-label-name">真实名称:</span>
            <el-input
              v-model="state.departName"
              placeholder="请输入真实名称"
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">备注:</span>
            <el-input
              type="textarea"
              v-model="state.departType"
              placeholder="请输入"
            ></el-input>
          </div>
          <!-- <div class="modal-content transfer-content">
            <span class="modal-label-name">管理成员:</span>
            <div @click="openTransfer" class="style-transfer">+</div>
          </div>
          <div class="modal-content"></div>
          <div class="modal-content" v-show="state.isShowTransfer === true">
            <el-transfer
              class="transfer-class"
              v-model="state.transferUpdate"
              filterable
              :titles="['所有成员', '本台站成员']"
              :button-texts="['移除', '添加']"
              @change="handleChange"
              :data="state.transferAlldata"
            >
              <template v-slot:{ option }>
                {{ option.label }}
              </template>
            </el-transfer>
          </div> -->
        </div>
      </template>
    </PIEModal>
    <!-- 用户弹框 -->
    <PIEModal
      width="40"
      height="40"
      :title="'用户'"
      v-model:visible="state.groupModal"
      :resetBtn="false"
      :confirmBtn="false"
      :cancelBtn="false"
      @cancel="usercancel"
      class="group-role"
    >
      <template v-slot:operateItem>
        <div class="modal-box">
          <div class="header-line">
            <div class="text">用户</div>
            <el-select
              :popper-append-to-body="false"
              v-model="state.groupName"
              class="input-style"
              clearable
            >
              <el-option
                v-for="item in state.groupNameList"
                :key="item.userId"
                :label="item.account"
                :value="item.userId"
              ></el-option>
            </el-select>
            <button @click="insertRoleGroup">添加</button>
          </div>
          <!-- 表格 -->
          <PIETable
            :maxHeight="300"
            :data="state.groupTableData"
            :columns="state.groupColumns"
            :isAction="true"
            :showIndex="true"
            :deleteBtn="true"
            @confirmDelete="deleteRoleGroup"
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
              color: '#D7D7D9',
              letterSpacing: '2px',
            }"
            :row-style="{
              borderBottom: '1px solid #13598C',
              background: 'transparent',
            }"
          >
          </PIETable>
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import http from "@/api/index";
import utils from "../../../../utils/utils";
import { AnyARecord, AnyNaptrRecord } from "dns";
const router = useRouter();
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance() as any;
const state = reactive({
  groupColumns: [
    {
      prop: "account",
      label: "用户名称",
    },
  ], //用户名称
  groupTableData: [], //用户名称数据
  roleCode: "",
  groupName: "", //用户名称
  groupNameList: [], //群组列表
  groupModal: false,
  mechanism: "", //组织
  mechanismArry: [], //组织数据
  option: [
    {
      value: -1,
      label: "-1",
    },
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
      label: "1",
    },
  ], // 本台站的成员列表
  transferAlldata: [], // 所有成员的值
  transferValue: [], // 新增成员右侧数据的值
  transferUpdate: [], // 修改右侧数据的值
  isShowTransfer: false, //管理成员是否显示

  //modal绑定的值
  title: "新增", //title绑定的值
  isHobby: false, //新增
  isHobby1: false, //修改

  nameInput: "", //台站名称
  dataColumns: [
    {
      prop: "fullName",
      label: "台站名称",
    },
    {
      prop: "gmtCreate",
      label: "创建时间",
    },
    {
      prop: "description",
      label: "备注",
    },
  ], //表单头部的数据
  tableData: [], //表单数据中的内容

  deptId: "", //成员id
  teamId: "", //组id
  userId: "", //用户id
  parentId: "", //父id
  thirdDeptId: "", //row中数据
  //分页的数据
  total: 10,
  pageSize: 10,
  pageNum: 1,

  //新增弹出的框绑定的值
  aduitId: "", //台站名称
  remark: "", //备注
  departAllPath: "", //台站全路径名称
  departmechanism: "", //组织
  departType: "", //备注
  departNum: "", //code码
  deptAllId: [], //删除id
  shortName: "", //简称-添加
  departName: "", //简称-编辑
});
onMounted(() => {
  getDataList();
  getAllUser();
  // 查询组织
  getOrganization();
});
//用户
const groupEvent = (row: any) => {
  state.groupModal = true;
  state.roleCode = row.deptId;
  state.groupName = "";
  getRoleGroup(); //查询台站下用户
  getGroupList(); //查询用户列表
};
//新增台站下用户
const insertRoleGroup = () => {
  if (!state.groupName) {
    ElMessage.error("请选择用户");
  } else {
    let params = {
      emplDept: {
        deptId: state.roleCode,
        teamId: localStorage.getItem("engine-teamid"),
        userId: state.groupName,
      },
    };
    http.departManagement.addDeptUser(params).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("操作成功");
        getRoleGroup();
        getGroupList(); //查询用户列表
        state.groupName = "";
      } else {
        ElMessage.error(res.message);
      }
    });
  }
};
//获取台站下用户
const getRoleGroup = () => {
  let param = {
    deptId: state.roleCode,
    teamId: localStorage.getItem("engine-teamid"),
  };
  http.departManagement.getDeptUser(param).then((res: any) => {
    if (res.code == 0) {
      state.groupTableData = res.data.result;
    } else {
      ElMessage.error(res.message);
    }
  });
};
//删除台站下的用户
const deleteRoleGroup = (row: any) => {
  let param = {
    deptId: state.roleCode,
    teamId: localStorage.getItem("engine-teamid"),
    userId: row.userId,
  };
  http.departManagement.deleteDeptUser(param).then((res: any) => {
    if (res.code == 0) {
      ElMessage.success("操作成功");
      getRoleGroup();
      getGroupList(); //查询用户列表
    } else {
      ElMessage.error(res.message);
    }
  });
};
//查询用户列表
const getGroupList = () => {
  http.departManagement.getNoneUser().then((res: any) => {
    if (res.code == 0) {
      state.groupNameList = res.data;
    } else {
      ElMessage.error(res.message);
    }
  });
};
// 取消弹出框
const usercancel = () => {
  state.groupModal = false;
};
//增加弹框事件
const handleChange1 = () => {};
//修改弹框事件
const handleChange = () => {};
//添加成员
const addUser = (data: any, val: any) => {
  if (state.isShowTransfer != false) {
    let params: any = [];
    state.transferUpdate.map((item: any) => {
      params.push({
        deptId: data,
        // deptType: 0, //台站类型
        emplSortNum: -1, //排序
        teamId: val,
        userId: item,
      });
    });
    http.departManagement.queryAddCurrent(params).then((res: any) => {
      if (res.code != 0) {
        ElMessage.error(res.message);
      }
    });
  }
};

//获取台站列表
const getDataList = () => {
  let params = {
    fullName: state.nameInput,
    pageNum: state.pageNum,
    pageSize: state.pageSize,
    // parentId: "2FYuPSjItlYw45UPUMpe6",
    // teamId: localStorage.getItem("engine-teamid"),
  };
  http.departManagement.getDepartList(params).then((res: any) => {
    if (res.code === 0) {
      state.tableData = res.data.deptInfoList;
      state.total = res.data.total;
      state.tableData.map((item: any) => {
        if (item.status === 1) {
          item.status = "正常";
        } else {
          item.status = "删除";
        }
        item.gmtCreate = utils.formatDate(item.gmtCreate, 0);
      });
    } else {
      ElMessage.error(res.message);
    }
  });
};
//创建台站
const createDepart = () => {
  if (state.aduitId === "") {
    ElMessage.warning("请输入台站名称");
  } else {
    let params = {
      description: state.remark,
      fullName: state.aduitId,
      teamId: localStorage.getItem("engine-teamid"),
      parentId: state.mechanism,
      // realFullName: this.groupPathName,
      realFullName: state.shortName,
      // userIds: state.transferValue.toString(),
      // }
    };
    http.departManagement.createDeaprtMan(params).then((res: any) => {
      if (res.code === 0) {
        getDataList();
        ElMessage.success("新增成功");
        // addUser(res.data);
      } else {
        ElMessage.error(res.message);
      }
    });
    state.isHobby = false;
    state.isHobby1 = false;
  }
};
//获取所有成员的数据
const getAllUser = () => {
  let param = {
    pageSize: 10000,
    pageNum: state.pageNum,
  };
  http.departManagement.getList(param).then((res: any) => {
    res.data.data.map((item: any) => {
      state.transferAlldata.push({
        key: item.userId,
        label: item.account,
      });
    });
  });
};
//切换页
const pageChange = (pageNum: any) => {
  state.pageNum = pageNum;
  getDataList();
};
//分页大小
const sizeChange = (pageSize: any) => {
  state.pageSize = pageSize;
  getDataList();
};
//打开transfer
const openTransfer = () => {
  state.isShowTransfer = !state.isShowTransfer;
};
//打开弹窗
const openHobby = () => {
  state.title = "新增";
  state.isHobby = true;
  state.isShowTransfer = false;
  state.aduitId = "";
  state.transferValue = []; //新增成员右侧数据的值
  state.remark = "";
  // state.groupPathName = "";
  state.shortName = "";
  state.mechanism = "";
};
//取消弹窗
const cancel = () => {
  state.isHobby = false;
  state.isHobby1 = false;
};
//修改弹框数值
const update = (row: any) => {
  state.isHobby1 = true;
  state.isShowTransfer = false;
  state.title = "修改";
  state.departAllPath = row.fullName; //台站全路径名称
  state.departmechanism = row.parentId; //台站全路径名称
  state.departType = row.description; //备注
  state.departName = row.realFullName; //真实名称
  state.departNum = row.code; //台站编码
  state.parentId = row.parentId; //父台站id
  state.deptId = row.deptId; // 台站id  更新id
  state.teamId = row.teamId; //团队id
  // state.departLevel = row.level;//台站级别
  // state.groupPathName = row.realFullName; //真实全路径名称
  // state.departSort = row.sortNum; //台站简称
  // state.departFullPathName = row.fullPath; //台站全路径
  // state.departALLPath1 = row.realFullPath;
  // state.thirdDeptId = row.thirdDeptId; //第三方台站id
  // getCurrentPeople(row);
};
//获取当前台站下的成员
const getCurrentPeople = (row: any) => {
  let param = {
    deptId: row.deptId,
    teamId: row.teamId,
  };
  let userIds: any = [];
  http.departManagement.getCurrentDept(param).then((res: any) => {
    if (res.data.result) {
      res.data.result.map((item: any) => {
        userIds.push(item.userId);
      });
      state.transferUpdate = userIds;
    }
  });
};
//修改台站接口
const departUpdate = () => {
  if (state.departAllPath === "") {
    ElMessage.warning("名称不能为空");
  } else {
    let params = {
      // shortName: state.departName,
      // level: 0,
      fullName: state.departAllPath,
      // code: state.departNum,
      description: state.departType,
      teamId: localStorage.getItem("engine-teamid"),
      parentId: state.departmechanism,
      deptId: state.deptId,
      // thirdDeptId: state.thirdDeptId,
      // fullPath: state.departFullPathName,
      // sortNum: state.departSort,
      realFullName: state.departName,
      // realFullPath: state.departALLPath1,
    };
    http.departManagement.updateDeaprt(params).then((res: any) => {
      if (res.code === 0) {
        getDataList();
        ElMessage.success("修改成功");
        addUser(state.deptId, state.teamId);
      } else {
        ElMessage.error(res.message);
      }
    });
    state.isHobby1 = false;
  }
};
//复选框选中
const onSelectionChange = (selection: any) => {
  state.deptAllId = selection;
};

//确认删除
const confirmDelete = (row: any) => {
  let param = {
    deptId: row.deptId,
    teamId: row.teamId,
  };
  deleteForRole(param);
};
//删除按钮
const deleteForRole = (param: any) => {
  http.departManagement.removeDept(param).then((res: any) => {
    if (res.code === 0) {
      getDataList();
      ElMessage.success("删除成功");
    } else {
      ElMessage.error(res.message);
    }
  });
};
//批量删除
const batchesDelete = () => {
  if (state.deptAllId.length === 0) {
    ElMessage.error("请选择需要批量删除的台站");
  } else {
    let newArr: any = [];
    state.deptAllId.map((item: any) => {
      newArr.push(item.deptId);
    });
    let param = {
      deptIds: newArr.toString(),
    };
    http.departManagement.queryDeleteForRole(param).then((res: any) => {
      if (res.code === 0) {
        getDataList();
        ElMessage.success("删除成功");
      } else {
        ElMessage.error(res.message);
      }
    });
  }
};
// 查询组织
const getOrganization = () => {
  let params = {
    pageNum: 1,
    pageSize: 100000000,
  };
  http.organizationalManagement.getTeamInfoList(params).then((res: any) => {
    if (res.code == 0) {
      state.mechanismArry = res.data.teamInfoList;
    } else {
      ElMessage.error(res.message);
    }
  });
};
</script>

<style lang="less" scoped>
.group-manage-wrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: @global-padding;
  box-sizing: border-box;
  .safety-domain-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    .domain-header-left {
      display: flex;
      justify-content: left;
      .header-left-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 20px;
        border-radius: 5px;
        :deep(.el-input) {
          width: 300px;
          background: transparent;
          border-radius: 5px;
          border: 1px solid @global-border-color;
          height: 40px;
          color: @main-font-color;
        }
        span {
          flex-shrink: 0;
          // margin-right: 20px;
          padding-right: @title-padding;
          font-size: @main-font-size;
          color: @main-font-color;
          text-align: center;
        }
      }
    }
  }
  .pie-tb-iscontent {
    margin-top: 20px;
  }
  .modal-box {
    .header-line {
      display: flex;
      align-items: center;
      color: @main-font-color;
      margin-bottom: 20px;
      .text {
        padding-right: @title-padding;
      }
      .el-input {
        height: 40px;
      }
      :deep(.el-input__wrapper) {
        width: 300px;
        flex-grow: 0;
        height: 40px;
      }
      :deep(.el-select) {
        width: 300px;
      }
    }
  }
  //新增
  .modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    :deep(.el-transfer-panel),
    :deep(.el-transfer-panel .el-transfer-panel__header) {
      background: transparent;
      color: @main-font-color;
    }
    ::v-deep .el-input__inner,
    :deep(.el-checkbox__inner) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-checkbox__label) {
      color: @main-font-color;
    }
    .el-input {
      height: 40px;
      border: 1px solid @global-border-color;
    }
    :deep(.el-input__wrapper) {
      width: 300px;
      flex-grow: 0;
      height: 40px;
    }
    .style-transfer {
      width: 300px;
      color: @main-font-color;
      font-size: @main-font-size;
    }
    .modal-label-name {
      display: inline-block;
      width: 100px;
      text-align: right;
      padding-right: @title-padding;
      color: @main-font-color;
      font-size: @main-font-size;
    }
    .el-input,
    .el-textarea {
      width: 300px;
      background: transparent;
      border-radius: 5px;
      border: 1px solid @global-border-color;
      // height: 35px;
      color: @main-font-color;
    }
    :deep(.el-textarea__inner) {
      background: transparent;
      color: red;
    }
    :deep(.el-cascader) {
      width: 300px;
    }
    :deep(.el-select) {
      width: 300px;
    }
  }
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
  .el-textarea {
    --el-input-placeholder-color: @special-font-color;
  }
}
</style>
