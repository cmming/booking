<template>
  <div class="booking-container">
    <el-card>

      <div class="block">
        <span class="demonstration">预约时间</span>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>

        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
      start: '08:00',
      step: '01:00',
      end: '18:30'
    }"
        >
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
      start: '08:00',
      step: '01:00',
      end: '18:00',
      minTime: startTime
    }"
        >
        </el-time-select>

        <el-button type="primary">确定</el-button>
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
        >
          <div class="computer-item">
            <img
              src="../../../assets/images/computer-normal.png"
              alt=""
              style="max-width:80%;padding: 0 10%;"
            >
            <span class="computer-item-title">1号电脑</span>
          </div>
        </el-col>

        <el-col
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
        </el-col>


      </el-row>

    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      startTime: "",
      endTime: ""
    };
  }
};
</script>

<style>
.booking-container {
  margin: 50px;
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

