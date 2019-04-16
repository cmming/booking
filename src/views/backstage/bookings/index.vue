<template>
  <div class="user-container">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>筛选条件</span>
      </div>
      <el-row :gutter="10">
        <el-col
          :lg="4"
          :xs="24"
        >
          <el-input
            v-model="bookings.searchData.user_name"
            placeholder="用户名称"
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
        :dataModal="bookings"
        :handleColumnWidth="400"
      >

        <template
          slot="handleColumns"
          slot-scope="scope"
        >
          <el-button
            size="small"
            type="danger"
            @click="refused(scope.dataScope.row)"
          >
            拒绝
          </el-button>

        </template>

      </c-table>
    </el-card>

    <el-dialog
      :title="bookings.formState=='add'?$t('backstage.bookings.add.title'):$t('backstage.bookings.update.title')"
      :visible.sync="bookings.formDialog"
      width="40%"
    >
      <c-form :dataModal="bookings"></c-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CTable from "@/components/Table/index";
import CForm from "@/components/CForm/index";
export default {
  components: { CTable, CForm },
  computed: mapGetters(["bookings"]),
  methods: {
    search() {
      let params = this.bookings.searchData;
      params.pageNum = 1;
      this.$store.dispatch("GET_BOOKINGS_LIST", params);
    },
    add() {
      this.bookings.formDialog = true;
      this.bookings.formState = "add";
    },
    refused(data) {
      this.$store
        .dispatch("CHANGE_BOOKINGS_STATE", { id: data.id })
        .then(res => {
          this.$store.dispatch(
            "GET_BOOKINGS_LIST",
            this.bookings.searchData
          );
        });
    }
  }
};
</script>


