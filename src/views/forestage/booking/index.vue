<template>
  <div class="booking-container">
    <el-card>

      <div class="block">
        <span class="demonstration">预约时间</span>
        <el-date-picker
          v-model="booking.queryFormData.dayMark"
          type="date"
          :picker-options="booking.pickerOptions"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>

        <el-time-select
          placeholder="起始时间"
          v-model="booking.queryFormData.startTime"
          :picker-options="booking.queryTime"
        >
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="booking.queryFormData.endTime"
          :picker-options="booking.queryTime"
        >
        </el-time-select>

        <el-button
          type="primary"
          @click="getComputerList"
        >查询</el-button>
      </div>
    </el-card>
    <el-card>
      <el-row :gutter="10">
        <el-col
          :xs="8"
          :sm="6"
          :md="4"
          :lg="3"
          :xl="2"
          v-for="(item,key) in computerList"
          :key="key"
        >
          <div
            class="computer-item"
            @click="showBookingDialog(item)"
          >
            <img
              src="../../../assets/images/computer-normal.png"
              alt=""
              style="max-width:80%;padding: 0 10%;"
            >
            <span class="computer-item-title">{{item.pcName}}</span>
          </div>
        </el-col>

        <!-- <el-col
          :xs="8"
          :sm="6"
          :md="4"
          :lg="3"
          :xl="2"
        >
          <div class="computer-item">
            <img
              src="../../../assets/images/computer-error.png"
              alt=""
              style="max-width:80%;padding: 0 10%;"
            >
            <span class="computer-item-title">1号电脑</span>
          </div>
        </el-col> -->

      </el-row>
      <el-dialog
        :title="choseComputer.pcName"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="(item,key) in timeList"
            :key="key"
            :label="item.value"
            :disabled="!item.state"
          >{{item.time}}</el-checkbox>
        </el-checkbox-group>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="storeBooking"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters(["booking"]),
  data() {
    return {
      dialogVisible: false,
      checkList: [],
      timeList: [],
      // [
      //   { time: "9:00", value: 1, state: 1 },
      //   { time: "10:00", value: 2, state: 1 },
      //   { time: "11:00", value: 3, state: 0 },
      //   { time: "12:00", value: 4, state: 1 }
      // ],
      computerList: [
        {
          pcName: "测试机器1",
          pcId: 1,
          resourceList: [
            { time: "9:00", value: 1, state: 1 },
            { time: "10:00", value: 2, state: 1 },
            { time: "11:00", value: 3, state: 0 },
            { time: "12:00", value: 4, state: 1 }
          ]
        },
        {
          pcName: "测试机器2",
          pcId: 2,
          resourceList: [
            { time: "9:00", value: 1, state: 1 },
            { time: "10:00", value: 2, state: 1 },
            { time: "11:00", value: 3, state: 0 },
            { time: "12:00", value: 4, state: 1 }
          ]
        }
      ],
      choseComputer: ""
    };
  },
  created() {
    //获取系统时间
    this.$store.dispatch("GET_BOOKING_TIME").then(res => {});
  },
  methods: {
    getComputerList() {
      this.$store.dispatch("GET_COMPUTER_LIST", this.booking.queryFormData);
    },

    showBookingDialog(data) {
      this.dialogVisible = true;
      this.choseComputer = data
      // this.bookingId = data.pcId;
      this.timeList = data.resourceList;
    },
    storeBooking() {
      // 将选中的信息显示出来，使用确认框的方式提示是否提交
      this.$store
        .dispatch("STORE_COMPUTER_BOOKING", {
          id: this.choseComputer.pcId,
          applyarr: this.checkList.join(","),
          dayMark: this.booking.queryFormData.dayMark
        })
        .then(res => {
          this.dialogVisible = false;
        });
    }
  }
};
</script>

<style lang="scss">
.booking-container {
  margin: 50px;
  .el-dialog__header {
    background: #323756;
    .el-dialog__title {
      color: #ffffff;
    }
  }
}
.booking-container img {
  max-width: 80%;
  padding: 0 10%;
}
.computer-item {
  padding: 20px;
  text-align: center;
}
.computer-item-title {
  color: #333333;
  font-size: 20px;
  display: inline-block;
}
.computer-item:hover {
  background: #eff7ff;
}
</style>

