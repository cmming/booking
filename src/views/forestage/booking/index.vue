<template>
  <div class="booking-container">
    <el-card>
      <div class="block">
        <span class="demonstration">预约时间</span>
        <el-date-picker
          v-model="booking.queryFormData.date"
          type="date"
          :picker-options="booking.pickerOptions"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>

        <el-time-select
          placeholder="起始时间"
          v-model="booking.queryFormData.start_time"
          :picker-options="booking.queryTime"
        ></el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="booking.queryFormData.end_time"
          :picker-options="{...booking.queryTime,minTime:booking.queryFormData.start_time}"
        ></el-time-select>

        <el-button type="primary" @click="getComputerList">查询</el-button>
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
          v-for="(item,key) in booking.list.data"
          :key="key"
        >
          <div class="computer-item" @click="showBookingDialog(item)">
            <img
              src="../../../assets/images/computer-normal.png"
              alt
              style="max-width:80%;padding: 0 10%;"
            >
            <span class="computer-item-title">{{item.name}}</span>
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
        </el-col>-->
      </el-row>
      <el-dialog :title="choseComputer.name" :visible.sync="dialogVisible" width="30%">
        <!-- <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="(item,key) in timeList"
            :key="key"
            :label="item.value"
            :disabled="item.state===-1"
          >{{item.time}}</el-checkbox>
        </el-checkbox-group>-->

        <el-time-select
          placeholder="起始时间"
          v-model="booking.storeOrderFormData.start_time"
          :picker-options="orderTimePicker"
        ></el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="booking.storeOrderFormData.end_time"
          :picker-options="{...orderTimePicker,minTime:booking.storeOrderFormData.start_time}"
        ></el-time-select>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="storeBooking">确 定</el-button>
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
      choseComputer: "",
      orderTimePicker: { start: "08:00", step: "01:00", end: "18:30" }
    };
  },
  created() {
    //获取系统时间
    this.$store.dispatch("GET_BOOKING_TIME").then(res => {
      // this.$store.dispatch("GET_COMPUTER_LIST", this.booking.queryFormData);
    });
  },
  methods: {
    getComputerList() {
      this.$store.dispatch("GET_COMPUTER_LIST", this.booking.queryFormData);
    },

    showBookingDialog(data) {
      this.dialogVisible = true;
      this.choseComputer = data;

      this.orderTimePicker.start = this.booking.queryFormData.start_time;
      this.orderTimePicker.end = this.booking.queryFormData.end_time;
      this.orderTimePicker.step = this.booking.queryTime.step;
      this.booking.storeOrderFormData.start_time = "";
      this.booking.storeOrderFormData.end_time = "";
    },
    storeBooking() {
      // 将选中的信息显示出来，使用确认框的方式提示是否提交
      this.booking.storeOrderFormData.termical_id = this.choseComputer.id;
      this.booking.storeOrderFormData.date = this.booking.queryFormData.date;
      this.$store
        .dispatch("STORE_COMPUTER_BOOKING", this.booking.storeOrderFormData)
        .then(res => {
          this.dialogVisible = false;
          this.getComputerList();
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
  .el-checkbox {
    margin-bottom: 30px;
    margin-top: 30px;
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

