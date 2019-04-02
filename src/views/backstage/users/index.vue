<template>
  <div class="user-container">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>筛选条件</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="add"
        >添加新用户</el-button>
      </div>
      <el-row :gutter="10">
        <el-col
          :lg="4"
          :xs="24"
        >
          <el-input
            v-model="users.searchData.idNumber"
            placeholder="用户证件号"
          ></el-input>

        </el-col>

        <el-col
          :lg="4"
          :xs="24"
        >
          <el-input
            v-model="users.searchData.phone"
            placeholder="手机号"
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
            @click="search"
          >查询</el-button>
        </el-col>
      </el-row>
    </el-card>
    <br>
    <el-card>
      <c-table
        :dataModal="users"
        :handleColumnWidth="400"
      >
      </c-table>
    </el-card>

    <el-dialog
      :title="users.formState=='add'?$t('backstage.users.add.title'):$t('backstage.users.update.title')"
      :visible.sync="users.formDialog"
      width="40%"
    >
      <c-form :dataModal="users"></c-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CTable from "@/components/Table/index";
import CForm from "@/components/CForm/index";
export default {
  components: { CTable, CForm },
  computed: mapGetters(["users"]),
  methods: {
    search() {
      let params = this.users.searchData;
      params.pageNum = 1;
      this.$store.dispatch("GET_USERS_LIST", params);
    },
    add() {
      this.users.formDialog = true;
      this.users.formState = "add";
    }
  }
};
</script>
