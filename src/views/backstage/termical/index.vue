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
        >添加机器</el-button>
      </div>
      <el-row :gutter="10">
        <el-col
          :lg="4"
          :xs="24"
        >
          <!-- 机器状态 -->

          <el-select
            v-model="termical.searchData.state"
            placeholder="请选择机器状态"
          >
            <template v-for="(v,k)  in termical.searchOption.state.option">
              <el-option
                :key="k"
                :label="v.label"
                :value="v.value"
              ></el-option>
            </template>
          </el-select>

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
        :dataModal="termical"
        :handleColumnWidth="400"
      >
      </c-table>
    </el-card>

    <el-dialog
      :title="termical.formState=='add'?$t('backstage.termical.add.title'):$t('backstage.termical.update.title')"
      :visible.sync="termical.formDialog"
      width="40%"
    >
      <c-form :dataModal="termical"></c-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CTable from "@/components/Table/index";
import CForm from "@/components/CForm/index";
export default {
  components: { CTable, CForm },
  computed: mapGetters(["termical"]),
  methods: {
    search() {
      let params = this.termical.searchData;
      params.pageNum = 1;
      this.$store.dispatch("GET_TERMICAL_LIST", params);
    },
    add() {
      this.termical.formDialog = true;
      this.termical.formState = "add";
    }
  }
};
</script>
