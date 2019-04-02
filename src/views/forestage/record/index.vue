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
};
</script>
