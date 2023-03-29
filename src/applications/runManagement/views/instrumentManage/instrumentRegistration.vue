<template>
  <div class="instrument">
    <!-- 1-3-1 设备管理 登记 -->
    <!-- 表格页面 -->
    <!-- <div id="mapContainer"></div> -->
    <div class="instrument-admin" v-if="!state.showMap">
      <div class="header-left-content">
        <div class="header-left-contents">
          <div class="left-content-item">
            <span class="left-name">设备名称</span>
            <el-input
              v-model="state.deviceNameSearch"
              placeholder="请输入设备名称"
              clearable
            ></el-input>
          </div>
          <div class="left-content-item">
            <span class="left-name">台网</span>
            <el-select
              v-model="state.NetIdSearch"
              class="m-2"
              placeholder="请选择"
              :popper-append-to-body="false"
              clearable
              filterable
              @change="networkChange"
            >
              <el-option
                v-for="item in state.NetIdSearchList"
                :key="item.networkId"
                :label="item.cname"
                :value="item.networkId"
              />
            </el-select>
          </div>
          <div class="left-content-item">
            <span class="left-name">台站</span>
            <el-select
              v-model="state.stationIdSearch"
              class="m-2"
              placeholder="请选择"
              filterable
              clearable
              @change="sysopChange"
            >
              <el-option
                v-for="item in state.stationIdSearchList"
                :key="item.stationId"
                :label="item.name"
                :value="item.stationId"
              />
            </el-select>
          </div>
          <div class="left-content-item">
            <span class="left-name">测点</span>
            <el-select
              v-model="state.pointIdSeatch"
              class="m-2"
              placeholder="请选择"
              clearable
              filterable
              @change="pointIdChange"
            >
              <el-option
                v-for="item in state.pointIdSeatchList"
                :key="item.ponitid"
                :label="item.name"
                :value="item.ponitid"
              />
            </el-select>
          </div>
          <div class="left-content-item">
            <span class="left-name">设备类型</span>
            <el-select
              v-model="state.deveceType"
              class="m-2"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in state.deveceTypeList"
                :key="item.cate_id"
                :label="item.name"
                :value="item.cate_id"
              />
            </el-select>
          </div>
        </div>

        <div class="left-content-item">
          <button @click="searchList">查询</button>
          <button @click="addInstrument">添加仪器</button>
        </div>
      </div>
      <!--  -->
      <div class="pie-tb-iscontent">
        <PIETable
          :data="state.linkageData"
          :columns="state.linkageColumns"
          :isAction="true"
          :deleteBtn="true"
          :showCheckbox="true"
          :editBtn="true"
          :showIndex="true"
          :detailBtn="true"
          :operationWidth="200"
          @edit="edit"
          @confirmDelete="confirmDelete"
          @detail="detail"
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
        <!-- :titleClick="true"
          titleWrap="挂接设备"
          @titleClicks="titleClicks" -->
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
      <!-- 新建弹窗 -->
      <PIEModal
        :title="state.title"
        v-model:visible="state.showAdd"
        width="50"
        :confirmBtn="false"
        :cancelBtn="false"
        class="add-modal"
      >
        <template #operateItem>
          <div class="form-box">
            <div class="nav">
              <!-- 数据采集是1  观测设备是2 -->
              <!-- <div
                v-for="(item, index) in state.equipmentModelList"
                :key="index"
                class="nav-item"
                :class="
                  state.addRow.equipmentType == item.cateId ? 'active' : ''
                "
                @click="toPage(item)"
              >
                {{ item.name }}
              </div> -->
              <el-radio-group
                v-model="state.addRow.equipmentType"
                class="ml-4"
                @change="radioChange"
              >
                <div
                  v-for="(item, index) in state.equipmentModelList"
                  :key="index"
                >
                  <el-radio
                    :label="item.cateId"
                    size="large"
                    class="radio-style"
                    >{{ item.name }}</el-radio
                  >
                </div>
              </el-radio-group>
            </div>
            <!-- <div class="modal-content">
              <span class="modal-label-names start-label">设备类型:</span>
              <el-select
                v-model="state.addRow.equipmentType"
                placeholder="请选择设备类型"
                clearable
              >
                <el-option
                  v-for="item in state.equipmentModelList"
                  :key="item.cate_id"
                  :label="item.name"
                  :value="item.cate_id"
                />
              </el-select>
            </div> -->
            <div class="step-style">
              <el-steps :active="state.elStepActive">
                <el-step
                  v-for="(item, index) in state.addSteps"
                  :key="index"
                  :title="item"
                />
              </el-steps>
            </div>
            <div v-if="state.elStepActive == 0" class="form-content">
              <div class="form-selete">
                <!-- 设备信息 -->
                <div class="basic-content">
                  <div class="information-title">设备信息</div>
                  <div class="modal-content">
                    <span class="modal-label-name start-label">设备名称:</span>
                    <el-input
                      v-model="state.addRow.deviceName"
                      placeholder="请输入设备名称"
                      clearable
                    ></el-input>
                  </div>
                  <div class="modal-content">
                    <span class="modal-label-name start-label">设备编号:</span>
                    <el-input
                      v-model="state.addRow.deviceNum"
                      placeholder="请输入设备编号"
                      clearable
                    ></el-input>
                  </div>
                  <div class="modal-content">
                    <span class="modal-label-name">描述:</span>
                    <el-input
                      type="textarea"
                      :rows="2"
                      v-model="state.addRow.describe"
                      placeholder="请输入描述"
                    ></el-input>
                  </div>
                  <div class="modal-content">
                    <span class="modal-label-name start-label">设备厂家:</span>
                    <el-select
                      v-model="state.addRow.equipmentFactory"
                      placeholder="请选择设备厂家"
                      clearable
                      @change="equipmentFactoryChange"
                    >
                      <el-option
                        v-for="item in state.equipmentFactoryList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="modal-content">
                    <span class="modal-label-name">生产日期:</span>
                    <el-date-picker
                      class="update-time"
                      v-model="state.addRow.createDate"
                      type="datetime"
                      placeholder="请选择时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                    >
                    </el-date-picker>
                  </div>
                  <div class="modal-content">
                    <span class="modal-label-name start-label">设备型号:</span>
                    <el-select
                      v-model="state.addRow.equipmentModel"
                      placeholder="请选择设备型号"
                      clearable
                    >
                      <el-option
                        v-for="item in state.equipmentTypeList"
                        :key="item.productor_id"
                        :label="item.inst_model"
                        :value="item.productor_id"
                      />
                    </el-select>
                  </div>
                  <div class="modal-content">
                    <span class="modal-label-name">出厂日期:</span>
                    <el-date-picker
                      class="update-time"
                      v-model="state.addRow.leaveFactoryTime"
                      type="datetime"
                      placeholder="请选择时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                    >
                    </el-date-picker>
                  </div>
                  <div class="modal-content">
                    <span class="modal-label-name start-label">序列号:</span>
                    <el-input
                      v-model="state.addRow.serialNumber"
                      placeholder="请输入序列号"
                      clearable
                    ></el-input>
                  </div>
                </div>

                <!-- 设备信息 -->
                <!-- <div class="basic-content">
                  <div class="information-title">设备信息</div>
                </div> -->

                <!-- 其他日期 -->
                <div class="basic-content">
                  <div class="information-title">其他信息</div>
                  <div class="modal-content">
                    <span class="modal-label-name start-label">台网:</span>
                    <el-select
                      v-model="state.addRow.netstation"
                      placeholder="请选择台网"
                      filterable
                      @change="netstationChange"
                      clearable
                    >
                      <el-option
                        v-for="item in state.netstationList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </div>

                  <div class="modal-content">
                    <span class="modal-label-name start-label">台站:</span>
                    <el-select
                      v-model="state.addRow.station"
                      placeholder="请选择台站"
                      filterable
                      clearable
                      @change="stationChange"
                    >
                      <el-option
                        v-for="item in state.stationList"
                        :key="item.station_id"
                        :label="item.name"
                        :value="item.station_id"
                      />
                    </el-select>
                  </div>

                  <div class="modal-content">
                    <span class="modal-label-name start-label">测点:</span>
                    <el-select
                      v-model="state.addRow.detection_point"
                      class="m-2"
                      placeholder="请选择测点"
                      clearable
                    >
                      <el-option
                        v-for="item in state.measurementPointList"
                        :key="item.point_id"
                        :label="item.name"
                        :value="item.point_id"
                      />
                    </el-select>
                  </div>
                  <div class="modal-content">
                    <span class="modal-label-name start-label">学科类型:</span>
                    <el-select
                      v-model="state.addRow.subjectionSubkect"
                      class="m-2"
                      placeholder="请选择测点"
                      clearable
                    >
                      <el-option
                        v-for="item in state.subjectionSubkectList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="form-btn">
                <div class="btn" @click="resentData">重置</div>
                <div class="btn" @click="nextSelete">下一步</div>
              </div>
            </div>
            <div v-if="state.addRow.equipmentType == 1">
              <div v-if="state.elStepActive == 1" class="form-content">
                <div class="form-selete">
                  <div class="basic-content">
                    <div class="information-title">设备信息</div>
                    <div class="modal-content">
                      <span class="modal-label-name">设备编号:</span>
                      <el-input
                        v-model="state.addRow.deviceNum"
                        placeholder="请输入设备编号"
                        clearable
                      ></el-input>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">安装日期:</span>
                      <el-date-picker
                        class="update-time"
                        v-model="state.addRow.installDate"
                        type="datetime"
                        placeholder="请选择时间"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"
                      >
                      </el-date-picker>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">安装人:</span>
                      <el-select
                        v-model="state.addRow.installPer"
                        placeholder="请选择安装人"
                        clearable
                      >
                        <el-option
                          v-for="item in state.installPerList"
                          :key="item.userId"
                          :label="item.account"
                          :value="item.userId"
                        />
                      </el-select>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">安装流水:</span>
                      <el-input
                        v-model="state.addRow.instSn"
                        placeholder="请输入安装流水"
                        clearable
                      ></el-input>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">描述:</span>
                      <el-input
                        type="textarea"
                        :rows="2"
                        v-model="state.addRow.desCon"
                        placeholder="请输入描述"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="form-btn">
                  <div class="btn" @click="upcollection">上一步</div>
                  <div class="btn" @click="nextcollection">下一步</div>
                </div>
              </div>
              <div v-if="state.elStepActive == 2" class="form-content">
                <div class="form-selete">
                  <div class="basic-content">
                    <div class="information-title">设备信息</div>
                    <div class="modal-content">
                      <span class="modal-label-name">设备编号:</span>
                      <el-input
                        v-model="state.addRow.deviceNum"
                        placeholder="请输入设备编号"
                        clearable
                      ></el-input>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">ip访问地址:</span>
                      <el-input
                        v-model="state.addRow.ipAdress"
                        placeholder="请输入ip访问地址"
                        clearable
                      ></el-input>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">传输协议:</span>
                      <el-select
                        v-model="state.addRow.transferAggrement"
                        class="m-2"
                        placeholder="请选择传输协议"
                        clearable
                      >
                        <el-option
                          v-for="item in state.transferAggrementList"
                          :key="item.protocolId"
                          :label="item.description"
                          :value="item.protocolId"
                        />
                      </el-select>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">子网掩码:</span>
                      <el-input
                        v-model="state.addRow.subnetMask"
                        placeholder="请输入子网掩码"
                      ></el-input>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">端口号:</span>
                      <el-input
                        v-model="state.addRow.ports"
                        placeholder="请输入端口号"
                      ></el-input>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">网关:</span>
                      <el-input
                        v-model="state.addRow.gateway"
                        placeholder="请输入网关"
                      ></el-input>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">用户名:</span>
                      <el-input
                        v-model="state.addRow.userName"
                        placeholder="请输入用户名"
                      ></el-input>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">密码:</span>
                      <el-input
                        type="password"
                        v-model="state.addRow.pwd"
                        placeholder="请输入密码"
                      ></el-input>
                    </div>
                  </div>
                  <!-- <div class="basic-content">
                    <div class="information-title">设备信息</div>
                   
                  </div> -->
                </div>
                <div class="form-btn">
                  <div class="btn" @click="upThreeWith">上一步</div>
                  <div class="btn" @click="nextThreeWith">下一步</div>
                </div>
              </div>
              <div v-if="state.elStepActive == 3" class="form-content">
                <div class="form-selete">
                  <div class="basics-content">
                    <div class="information-title">设备信息</div>
                    <div class="facility-num">
                      <div class="modal-content">
                        <span class="modal-label-name">设备编号:</span>
                        <el-input
                          v-model="state.addRow.deviceNum"
                          placeholder="请输入设备编号"
                          clearable
                        ></el-input>
                      </div>
                      <div class="btn btn-basic" @click="addAisle">
                        添加通道:
                      </div>
                    </div>
                    <div class="add-content">
                      <div
                        class="add-item"
                        v-for="(item, index) in state.addRow.addContent"
                        :key="index"
                      >
                        <div
                          class="btn btn-basic-del"
                          @click="delAisle(item, index)"
                        >
                          删除通道:
                        </div>
                        <div class="addCon">
                          <div class="modal-content">
                            <span class="modal-label-name start-label"
                              >测项分量代码:</span
                            >
                            <el-input
                              v-model="item.itemCode"
                              placeholder="请输入测项分量代码"
                              clearable
                            ></el-input>
                          </div>
                          <div class="modal-content">
                            <span class="modal-label-name start-label"
                              >通道属性:</span
                            >
                            <el-input
                              v-model="item.attribute"
                              placeholder="请输入通道属性"
                            ></el-input>
                          </div>
                          <div class="modal-content">
                            <span class="modal-label-name start-label"
                              >通道描述信息:</span
                            >
                            <el-input
                              v-model="item.description"
                              placeholder="请输入通道描述信息"
                            ></el-input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-btn">
                  <div class="btn" @click="upSure">上一步</div>
                  <div class="btn" @click="nextSure">确定</div>
                </div>
              </div>
            </div>
            <div v-if="state.addRow.equipmentType == 2">
              <div v-if="state.elStepActive == 1" class="form-content">
                <div class="form-selete">
                  <div class="basic-content">
                    <div class="information-title">设备信息</div>
                    <div class="modal-content">
                      <span class="modal-label-name">设备编号:</span>
                      <el-input
                        v-model="state.addRow.deviceNum"
                        placeholder="请输入设备编号"
                        clearable
                      ></el-input>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">安装日期:</span>
                      <el-date-picker
                        class="update-time"
                        v-model="state.addRow.installDate"
                        type="datetime"
                        placeholder="请选择时间"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"
                      >
                      </el-date-picker>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">安装人:</span>
                      <el-select
                        v-model="state.addRow.installPer"
                        placeholder="请选择安装人"
                        clearable
                      >
                        <el-option
                          v-for="item in state.installPerList"
                          :key="item.userId"
                          :label="item.account"
                          :value="item.userId"
                        />
                      </el-select>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">安装流水:</span>
                      <el-input
                        v-model="state.addRow.instSn"
                        placeholder="请输入安装流水"
                        clearable
                      ></el-input>
                    </div>
                    <div class="modal-content">
                      <span class="modal-label-name">描述:</span>
                      <el-input
                        type="textarea"
                        :rows="2"
                        v-model="state.addRow.desCon"
                        placeholder="请输入描述"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="form-btn">
                  <div class="btn" @click="upcollection">上一步</div>
                  <div class="btn" @click="nextcollection">下一步</div>
                </div>
              </div>
              <div v-if="state.elStepActive == 2" class="form-content">
                <div class="form-selete">
                  <div class="basics-content">
                    <div class="information-title">设备信息</div>
                    <div class="facility-num">
                      <div class="modal-content">
                        <span class="modal-label-name">设备编号:</span>
                        <el-input
                          v-model="state.addRow.deviceNum"
                          placeholder="请输入设备编号"
                          clearable
                        ></el-input>
                      </div>
                      <div class="btn btn-basic" @click="addAisle">
                        添加通道
                      </div>
                    </div>
                    <div class="add-content">
                      <div
                        class="add-item"
                        v-for="(item, index) in state.addRow.addContent"
                        :key="index"
                      >
                        <div
                          class="btn btn-basic-del"
                          @click="delAisle(item, index)"
                        >
                          删除通道:
                        </div>
                        <div class="addCon">
                          <div class="modal-content">
                            <span class="modal-label-names start-label"
                              >测项分量代码:</span
                            >
                            <el-input
                              v-model="item.itemCode"
                              placeholder="请输入测项分量代码"
                              clearable
                            ></el-input>
                          </div>
                          <div class="modal-content">
                            <span class="modal-label-names start-label"
                              >通道属性:</span
                            >
                            <el-input
                              v-model="item.attribute"
                              placeholder="请输入通道属性"
                            ></el-input>
                          </div>
                          <div class="modal-content">
                            <span class="modal-label-names start-label"
                              >通道描述信息:</span
                            >
                            <el-input
                              v-model="item.description"
                              placeholder="请输入通道描述信息"
                            ></el-input>
                          </div>
                          <div
                            class="modal-content"
                            v-if="state.addRow.equipmentType == 2"
                          >
                            <span class="modal-label-names start-label"
                              >数据采集设备名称:</span
                            >
                            <el-select
                              v-model="item.inst2Id"
                              placeholder="请选择设备名称"
                              clearable
                              @change="facilityChange"
                            >
                              <el-option
                                v-for="item in state.facilityNameList"
                                :key="item.inst_id"
                                :label="item.name"
                                :value="item.inst_id"
                              />
                            </el-select>
                          </div>
                          <div
                            class="modal-content"
                            v-if="state.addRow.equipmentType == 2"
                          >
                            <span class="modal-label-names start-label"
                              >数据采集设备通道:</span
                            >
                            <el-select
                              v-model="item.chanId"
                              placeholder="请选择设备通道"
                              clearable
                              @change="chanIdChange"
                            >
                              <el-option
                                v-for="item in state.portholeList"
                                :disabled="item.disabled"
                                :key="item.id"
                                :label="item.item_code"
                                :value="item.id"
                              />
                            </el-select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-btn">
                  <div class="btn" @click="upThreeWith">上一步</div>
                  <div class="btn" @click="nextSure">确定</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </PIEModal>
      <!-- 编辑弹窗 -->
      <PIEModal
        :title="state.title"
        v-model:visible="state.editShow"
        width="50"
        height="35"
        @cancel="cancel"
        @confirm="editConfirm"
        class="add-modal"
      >
        <template #operateItem>
          <div class="modal-wrapper">
            <div class="basic-content">
              <div class="information-title">设备信息</div>
              <!-- 设备信息 -->
              <div class="modal-content">
                <span class="modal-label-name">设备名称:</span>
                <el-input
                  v-model="state.editRow.device_name"
                  placeholder="请输入设备名称"
                  clearable
                ></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">设备编码:</span>
                <el-input
                  v-model="state.editRow.device_code"
                  placeholder="请输入设备编码"
                  clearable
                ></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name start-label">设备厂家:</span>
                <el-select
                  v-model="state.editRow.equipmentFactory"
                  placeholder="请选择设备厂家"
                  clearable
                  @change="equipmentFactoryChange"
                >
                  <el-option
                    v-for="item in state.equipmentFactoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </div>
              <div class="modal-content">
                <span class="modal-label-name start-label">设备型号:</span>
                <el-select
                  v-model="state.editRow.device_type"
                  class="m-2"
                  placeholder="请选择设备型号"
                  clearable
                >
                  <el-option
                    v-for="item in state.equipmentTypeList"
                    :key="item.productor_id"
                    :label="item.inst_model"
                    :value="item.productor_id"
                  />
                </el-select>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">设备描述:</span>
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="state.editRow.desCon"
                  placeholder="请输入描述"
                ></el-input>
              </div>
            </div>

            <div class="basic-content">
              <div class="information-title">安装信息</div>
              <!-- 其他信息 -->
              <div class="modal-content">
                <span class="modal-label-name start-label">台网:</span>
                <el-select
                  v-model="state.editRow.netstation"
                  placeholder="请选择台网"
                  filterable
                  @change="networkChange"
                  clearable
                >
                  <el-option
                    v-for="item in state.NetIdSearchList"
                    :key="item.networkId"
                    :label="item.cname"
                    :value="item.networkId"
                  />
                </el-select>
              </div>

              <div class="modal-content">
                <span class="modal-label-name start-label">台站:</span>
                <el-select
                  v-model="state.editRow.station"
                  placeholder="请选择台站"
                  filterable
                  clearable
                  @change="sysopChange"
                >
                  <el-option
                    v-for="item in state.stationIdSearchList"
                    :key="item.stationId"
                    :label="item.name"
                    :value="item.stationId"
                  />
                </el-select>
              </div>

              <div class="modal-content">
                <span class="modal-label-name start-label">测点:</span>
                <el-select
                  v-model="state.editRow.detection_point"
                  class="m-2"
                  placeholder="请选择测点"
                  clearable
                >
                  <el-option
                    v-for="item in state.pointIdSeatchList"
                    :key="item.ponitid"
                    :label="item.name"
                    :value="item.ponitid"
                  />
                </el-select>
              </div>
              <div class="modal-content">
                <span class="modal-label-name start-label">学科类型:</span>
                <el-select
                  v-model="state.editRow.subjectionSubkect"
                  class="m-2"
                  placeholder="请选择测点"
                  clearable
                >
                  <el-option
                    v-for="item in state.subjectionSubkectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">安装流水:</span>
                <el-input
                  v-model="state.editRow.instSn"
                  placeholder="请输入安装流水"
                  clearable
                ></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">安装描述:</span>
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="state.editRow.desInstall"
                  placeholder="请输入描述"
                ></el-input>
              </div>
            </div>
            <div class="basic-content">
              <div class="information-title">访问参数信息</div>
              <!-- 其他信息 -->
              <div class="modal-content">
                <span class="modal-label-name">传输协议:</span>
                <el-select
                  v-model="state.editRow.transferAggrement"
                  class="m-2"
                  placeholder="请选择传输协议"
                  clearable
                >
                  <el-option
                    v-for="item in state.transferAggrementList"
                    :key="item.protocolId"
                    :label="item.description"
                    :value="item.protocolId"
                  />
                </el-select>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">子网掩码:</span>
                <el-input
                  v-model="state.editRow.subnetMask"
                  placeholder="请输入子网掩码"
                ></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">端口号:</span>
                <el-input
                  v-model="state.editRow.ports"
                  placeholder="请输入端口号"
                ></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">网关:</span>
                <el-input
                  v-model="state.editRow.gateway"
                  placeholder="请输入网关"
                ></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">用户名:</span>
                <el-input
                  v-model="state.editRow.userName"
                  placeholder="请输入用户名"
                ></el-input>
              </div>
              <div class="modal-content">
                <span class="modal-label-name">密码:</span>
                <el-input
                  type="password"
                  v-model="state.editRow.pwd"
                  placeholder="请输入密码"
                ></el-input>
              </div>
            </div>
          </div>
        </template>
      </PIEModal>
      <!-- 详情 -->
      <PIEModal
        v-model:visible="state.detailModal"
        :title="state.title"
        :resetBtn="false"
        :confirmBtn="false"
        :close="true"
        width="60"
        @cancel="cancel"
      >
        <template #operateItem>
          <!-- 安装信息 -->
          <div class="detail-item">
            <div class="item-title">安装信息</div>
            <div class="item-card">
              <div
                v-for="(item, index) in state.installList"
                :key="index"
                class="card-border-bounds"
              >
                <div class="card-nape">
                  <span>仪器名称:</span>{{ item.inst_name }}
                </div>
                <div class="card-nape">
                  <span>台站名称:</span>{{ item.station_name }}
                </div>
                <div class="card-nape">
                  <span>测点名称:</span>{{ item.point_name }}
                </div>
                <div class="card-nape">
                  <span>安装人:</span>{{ item.account }}
                </div>
                <div class="card-nape">
                  <span>安装流水:</span>{{ item.inst_sn }}
                </div>
                <div class="card-nape">
                  <span>安装日期:</span>{{ item.install_date }}
                </div>
                <div class="card-nape">
                  <span>生效日期:</span>{{ item.on_time }}
                </div>
                <div class="card-nape">
                  <span>失效日期:</span>{{ item.off_time }}
                </div>
                <div class="card-nape"><span>状态:</span>{{ item.state }}</div>
                <div class="card-nape">
                  <span>描述:</span>{{ item.description }}
                </div>
              </div>
            </div>
          </div>
          <!-- 维护信息 -->
          <div class="detail-item">
            <div class="item-title">
              维护信息
              <span class="iconfont icon-jiahao" @click="addCard"></span>
            </div>
            <div class="item-card">
              <div
                v-for="(item, index) in state.keepList"
                :key="index"
                class="card-border-bounds"
              >
                <div class="card-nape">
                  <span>仪器编号:</span>{{ item.instId }}
                </div>
                <div class="card-nape">
                  <span>维修内容:</span>{{ item.mainContent }}
                </div>
                <div class="card-nape">
                  <span>维修机构:</span>{{ item.mainOgr }}
                </div>
                <div class="card-nape">
                  <span>维修人:</span>{{ item.mainPerson }}
                </div>
                <div class="card-nape">
                  <span>送修人:</span>{{ item.dutyPerson }}
                </div>
                <div class="card-nape">
                  <span>维修结果:</span>{{ item.mainResult }}
                </div>
                <div class="card-nape">
                  <span>维护序列号:</span>{{ item.mainSn }}
                </div>
                <div class="card-nape">
                  <span>维护时间:</span>{{ item.mainTime }}
                </div>
                <div class="card-nape">
                  <span>维护类型:</span>{{ item.type }}
                </div>
                <div class="card-nape">
                  <span>开始时间:</span>{{ item.startTime }}
                </div>
                <div class="card-nape">
                  <span>结束时间:</span>{{ item.endTime }}
                </div>
                <div class="card-nape"><span>描述:</span>{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </template>
      </PIEModal>
      <!-- 新增 -->
      <PIEModal
        v-model:visible="state.addRecord"
        :title="state.title"
        :resetBtn="false"
        :close="true"
        width="45"
        height="45"
        @cancel="recordCancel"
        @confirm="recordConfirm"
      >
        <template #operateItem>
          <div class="add-record">
            <!-- 仪器名称 -->
            <!-- <div class="record-item">
              <span class="item-title">仪器名称:</span>
              <el-input
                v-model="state.apparatuName"
                placeholder="请输入仪器名称"
                class="input-style"
              ></el-input>
            </div> -->
            <!-- 维护内容 -->
            <div class="record-item">
              <span class="item-title">维护内容:</span>
              <el-input
                v-model="state.apparatuContent"
                placeholder="请输入维护内容"
                class="input-style"
                :rows="2"
                type="textarea"
              ></el-input>
            </div>
            <div class="record-item">
              <span class="item-title">维修机构:</span>
              <el-input
                v-model="state.apparatuOrg"
                placeholder="请输入维修机构"
                class="input-style"
              ></el-input>
            </div>
            <!-- 维修人 -->
            <div class="record-item">
              <span class="item-title">维修人:</span>
              <el-input
                v-model="state.apparatuStaff"
                placeholder="请输入维修人"
                class="input-style"
              ></el-input>
            </div>
            <!-- 送修人 -->
            <div class="record-item">
              <span class="item-title">送修人:</span>
              <el-input
                v-model="state.bearerPer"
                placeholder="请输入送修人"
                class="input-style"
              ></el-input>
            </div>
            <!-- 送修人 -->
            <div class="record-item">
              <span class="item-title">送修结果:</span>
              <el-input
                v-model="state.bearerResult"
                placeholder="请输入送修结果"
                class="input-style"
              ></el-input>
            </div>
            <!-- 维护时间 -->
            <div class="record-item">
              <span class="item-title">维护时间:</span>
              <el-date-picker
                v-model="state.apparatuTime"
                type="datetime"
                class="input-style"
                placeholder="请选择维护时间"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </div>
            <!-- 维护类型 -->
            <div class="record-item">
              <span class="item-title">维护类型:</span>
              <el-select
                v-model="state.apparatuType"
                class="input-style"
                placeholder="请选择维护类型"
                clearable
              >
                <el-option
                  v-for="item in state.typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <!-- 开始时间 -->
            <div class="record-item">
              <span class="item-title">开始时间:</span>
              <el-date-picker
                v-model="state.startMaintainTime"
                type="datetime"
                class="input-style"
                placeholder="请选择开始时间"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </div>
            <!-- 结束时间 -->
            <div class="record-item">
              <span class="item-title">结束时间:</span>
              <el-date-picker
                v-model="state.endMaintainTime"
                type="datetime"
                class="input-style"
                placeholder="请选择结束时间"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </div>
            <!-- 描述 -->
            <div class="record-item">
              <span class="item-title">描述:</span>
              <el-input
                v-model="state.maintainDes"
                placeholder="请输入描述"
                class="input-style"
                :rows="2"
                type="textarea"
              ></el-input>
            </div>
          </div>
        </template>
      </PIEModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { values } from "lodash";
import { useHandler } from "./instrumentRegistration";
const {
  state,
  resentData,
  getProvince,
  networkChange,
  getStations,
  sysopChange,
  getPoint,
  radioChange,
  addAisle,
  nextSelete,
  upcollection,
  nextcollection,
  upThreeWith,
  nextThreeWith,
  upSure,
  nextSure,
  addInstrument,
  deviceTypeFun,
  getEquipmentFactory,
  equipmentFactoryChange,
  devicModelFun,
  getNetListFun,
  netstationChange,
  stationChange,
  getStationList,
  getPointList,
  queryProtocol,
  getJulist,
  deviceList,
  facilityChange,
  chanIdChange,
  edit,
  detail,
  editConfirm,
  confirmDelete,
  searchList,
  pageChange,
  sizeChange,
  cancel,
  changeSelect,
  delAisle,
  pointIdChange,
  addCard,
  recordCancel,
  recordConfirm,
} = useHandler();
</script>

<style lang="less" scoped>
.instrument-admin {
  display: flex;
  flex-direction: column;
  padding: @global-padding;
  box-sizing: border-box;
  box-sizing: border-box;
  .header-left-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .header-left-contents {
      display: flex;
    }
    .left-content-item {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: @global-small-padding;
      // width: 24%;
      justify-content: flex-end;
      margin-right: @input-margin;
      .left-name {
        display: inline-block;
        // width: 90px;
        font-size: @main-font-size;
        color: @main-font-color;
        padding-right: @title-padding;
        box-sizing: border-box;
      }
      :deep(.el-input) {
        width: @input-width;
        background: transparent;
        border-radius: 5px;
        border: 1px solid @global-border-color;
        height: @input-height;
        color: @main-font-color;
      }
      :deep(.el-input__wrapper) {
        width: @input-width;
        height: @input-height;
      }
      :deep(.el-date-editor) {
        width: @input-width;
        height: @input-height;
      }
    }
    //按钮
    // .left-content-items {
    //   width: 16%;
    //   display: flex;
    //   justify-content: flex-end;
    //   margin-right: 0px;
    // }
    button {
      padding: @global-small-padding @global-padding;
      box-sizing: border-box;
      background: transparent;
      margin-left: @global-small-padding;
      color: @main-font-color;
      border: 1px solid @global-header-bbg;
      cursor: pointer;
      border-radius: 5px;
      box-sizing: border-box;
    }
  }
  .modal-wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
    .information-title {
      background: linear-gradient(rgba(0, 38, 73) 0%, rgba(0, 47, 91) 100%)
        transparent;
      width: 100px;
      height: 30px;
      position: absolute;
      left: 40px;
      top: -15px;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: @main-font-size;
    }
    .basic-content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
      padding: 15px 20px 0 0;
      box-sizing: border-box;
      border: 1px solid #2181f0;
      margin-top: 25px;
    }
    .basics-content {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 15px 20px 0 0;
      box-sizing: border-box;
      border: 1px solid #2181f0;
      margin-top: 25px;
      .btn-basic {
        margin-left: 60px;
      }
    }
  }
  //新增
  .modal-content {
    display: flex;
    // justify-content: center;
    align-items: center;
    margin-bottom: @global-padding;
    .modal-label-name {
      display: inline-block;
      width: 130px;
      color: @main-font-color;
      font-size: @main-font-size;
      margin-right: @title-padding;
      text-align: right;
    }
    .modal-label-names {
      display: inline-block;
      width: 152px;
      color: @main-font-color;
      font-size: @main-font-size;
      margin-right: @title-padding;
      text-align: right;
    }
    .start-label::before {
      content: "*";
      color: red;
      display: inline-block;
      margin-right: @title-padding;
    }
    .label-facility {
      margin-right: @title-padding;
    }
    .el-input {
      width: @input-width;
      background: transparent;
      border-radius: 5px;
      border: 1px solid @global-border-color;
      color: @main-font-color;
    }
    .el-textarea {
      width: 745px;
      background: transparent;
      border-radius: 5px;
      border: 1px solid @global-border-color;
      color: @main-font-color;
    }
    .el-input {
      height: @input-height;
    }
    :deep(.el-input__wrapper) {
      width: @input-width;
      height: @input-height;
      flex-grow: 0;
    }
    :deep(.el-textarea__inner) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-radio-group) {
      width: @input-width;
    }
    :deep(.el-radio) {
      margin-right: 50px;
    }
    :deep(.el-select) {
      width: @input-width;
    }
    :deep(.el-date-editor) {
      width: @input-width;
      height: @input-height;
    }
  }
  .modal-content-facility {
    display: flex;
    // justify-content: center;
    // box-sizing: border-box;
    width: 80%;
    margin: @global-margin auto;
    border: @device-border;
    border-radius: @globel-radius;
    padding: @device-padding;
    box-sizing: border-box;
  }
  .modal-content-facilitys {
    display: flex;
    width: 100%;
  }
  //表格
  .pie-tb-iscontent {
    margin-top: @global-small-padding;
  }
}
.modal-facility {
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  width: 100%;

  .select-content {
    // width: 80%;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    // background: pink;
    max-height: 350px;
    overflow-y: auto;
    // margin: 0 auto;
  }
  .select-add {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .add-style {
    .iconfont {
      font-size: 30px;
      cursor: pointer;
    }
  }
  .select-desc {
    display: flex;
    justify-content: flex-start;
    // width: 80%;
    // margin: 0 auto;
    .label-facility {
      width: 46%;
      font-size: 18px;
    }
  }
  .content {
    border: @device-border;
    border-radius: @globel-radius;
    padding: @device-padding;
    width: 80%;
    margin: 0 auto;
    box-sizing: border-box;
  }
}
.instrument {
  width: 100%;
  height: 100%;
}
.map-box {
  width: 100%;
  height: 100%;
  .inner-map {
    width: 100%;
    height: 100%;
  }
}
//新增
.form-box {
  width: 100%;
  box-sizing: border-box;
  padding-top: @global-padding;
  .nav {
    display: flex;
    margin-bottom: @global-small-padding;
    .nav-item {
      width: 80px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border: 1px solid #2181f0;
    }
    .active {
      background: #2181f0;
      color: #fff;
    }
    .radio-style {
      color: @main-font-color;
      font-size: @main-font-size;
      margin-right: @global-padding;
    }
  }
  .step-style {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px 0;
    box-sizing: border-box;
    border: 1px solid #2181f0;
    margin-bottom: 15px;
  }
  :deep(.el-steps) {
    width: 90%;
  }
  :deep(.el-step__title.is-process) {
    color: @template-color;
  }
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: transparent;
  }
  .form-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    // padding: 0px 20px 0 0px;
    box-sizing: border-box;
    .form-selete {
      width: 100%;
      display: flex;
      // flex-wrap: wrap;
      flex-direction: column;
      // align-items: center;
      // justify-content: space-between;
      .information-title {
        background: linear-gradient(rgba(0, 38, 73) 0%, rgba(0, 47, 91) 100%)
          transparent;
        width: 100px;
        height: 30px;
        position: absolute;
        left: 40px;
        top: -15px;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: @main-font-size;
      }
      .basic-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
        padding: 15px 20px 0 0;
        box-sizing: border-box;
        border: 1px solid #2181f0;
        margin-top: 25px;
      }
      .basics-content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 15px 20px 0 0;
        box-sizing: border-box;
        border: 1px solid #2181f0;
        margin-top: 25px;
        .btn-basic {
          margin-left: 60px;
        }
      }
      .add-content {
        display: flex;
        flex-direction: column;
        // flex-wrap: wrap;
        width: 100%;
        // justify-content: space-between;
        // background: pink;
        height: 210px;
        overflow-y: auto;
        margin-bottom: 20px;
        .add-item {
          // display: flex;
          // flex-wrap: wrap;
          // justify-content: space-between;
          // width: 100%;
          padding: 5px;
          border: 1px solid rgba(15, 49, 112, 0.9);
          box-sizing: border-box;
          margin: 10px 0 10px 20px;
          .addCon {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .btn-basic-del {
            margin-left: 34px;
          }
        }
      }
      ::-webkit-scrollbar {
        width: 6px;
      }
    }
    .form-btn {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      box-sizing: border-box;
      margin-top: @global-padding;
    }
  }
  //公共样式
  .btn {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-left: @global-padding;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 400;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid rgba(15, 49, 112, 0.9);
    color: #fff;
    background-color: transparent;
  }
}
.detail-item {
  .item-title {
    color: @main-font-color;
    font-size: @main-font-size;
    margin-bottom: @global-small-padding;
    .icon-jiahao {
      font-size: @main-font-size;
      color: @main-font-color;
      margin-left: 30px;
    }
  }

  .item-card {
    width: 100%;
    max-height: 250px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .card-border-bounds {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      background: @content-bg;
      margin-bottom: 10px;
      border-radius: 8px;
      padding: @global-small-padding;
      box-sizing: border-box;
    }
    .card-nape {
      width: 33%;
      font-size: @main-font-size;
      line-height: 30px;
      span {
        display: inline-block;
        width: 100px;
      }
    }
  }
}
.add-record {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  //新增维修记录
  .record-item {
    display: flex;
    align-items: center;
    margin: 10px 5px;
    .item-title {
      color: @main-font-color;
      font-size: @main-font-size;
      width: 90px;
      text-align: end;
      padding-right: @title-padding;
    }
    .input-style {
      display: flex;
      width: @input-width;
      :deep(.el-input) {
        height: @input-height;
        width: @input-width;
      }
    }
    :deep(.el-date-editor) {
      height: @input-height;
      width: @input-width;
      .el-input__prefix-inner {
        color: @main-font-color;
      }
    }
    :deep(.el-textarea__inner) {
      background: transparent;
    }
  }
}

// :deep .el-table{
//   max-height: 170px !important;
// }
// :deep(.pie-table){
//   max-height: 170px;
// }
</style>
