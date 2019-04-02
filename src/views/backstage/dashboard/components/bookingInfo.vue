<template>
  <el-dialog
    title="上机用户信息"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <el-form
      label-width="80px"
    >
      <el-form-item label="用户名称">
        {{bookingInfo.userName}}
      </el-form-item>
      <el-form-item label="电脑名称:">
        {{bookingInfo.pcName}}
      </el-form-item>
      <el-form-item label="上机时间:">
        {{bookingInfo.applyTimes}}
      </el-form-item>
      <el-form-item label="申请码:">
        {{bookingInfo.applyCode}}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    bookingInfo: {
      type: Object,
      default: { userName: "", pcName: "", applyTimes: "", applyCode: "" }
    }
  }
};
</script>

