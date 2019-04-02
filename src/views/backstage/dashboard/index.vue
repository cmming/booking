<template>
  <div class="user-container  booking-container">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>登机验证</span>
      </div>

      <el-row :gutter="10">
        <el-col
          :lg="4"
          :xs="24"
        >
          <el-input
            placeholder="请输入申请码"
            v-model="applyCode"
          ></el-input>

        </el-col>

        <el-col
          :lg="2"
          :xs="8"
        >
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="searchUserByCode"
          >查询</el-button>
        </el-col>
      </el-row>

    </el-card>
    <br>
    <!-- 当前在线机器 -->
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>使用情况</span>
      </div>

      <c-table
        :dataModal="dashboard"
        :handleColumnWidth="400"
      ><template
          slot="handleColumns"
          slot-scope="scope"
        >
          <el-button
            size="small"
            type="danger"
            @click="termicalOff(scope.dataScope.row)"
          >
            下线
          </el-button>

        </template>

      </c-table>
    </el-card>

    <booking-info
      :dialogVisible="dialogVisible"
      :bookingInfo="bookingInfo"
    ></booking-info>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CTable from "@/components/Table/index";
import bookingInfo from "./components/bookingInfo";
export default {
  data() {
    return {
      applyCode: "",
      dialogVisible: false,
      bookingInfo: {}
    };
  },
  components: { CTable, bookingInfo },
  computed: mapGetters(["dashboard"]),
  methods: {
    searchUserByCode() {
      this.$store
        .dispatch("GET_USER_BY_CODE", { applyCode: this.applyCode })
        .then(res => {
          if (res.state == 1) {
            // 提示框
            this.dialogVisible = true;
            this.bookingInfo = res.data;
          }
        });
    },
    termicalOff(data) {
      this.$store.dispatch("SET_TERMICAL_OFF", { id: data.id });
    }
  }
};
</script>

<style lang="scss" scoped>
.booking-container {
  margin: 50px;
  /deep/ .el-dialog__header {
    background: #323756;
    .el-dialog__title {
      color: #ffffff;
    }
  }
  /deep/ .el-checkbox {
    margin-bottom: 30px;
    margin-top: 30px;
  }
}
</style>