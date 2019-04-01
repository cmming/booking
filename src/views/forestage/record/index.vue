<template>
  <div class="user-container">
    <el-card>
      <c-table
        :dataModal="record"
        :handleColumnWidth="400"
      >
      </c-table>
    </el-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CTable from "@/components/Table/index";
export default {
  components: { CTable },
  computed: mapGetters(["record"]),
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    deleteRow() {}
  }
};
</script>
<style>
.user-container {
  margin: 50px;
}
.el-card {
  padding: 30px;
}
</style>
