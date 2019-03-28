<template>
  <div>
    <el-table
      border
      fit
      :data="dataModal.list.list"
      style="width: 100%"
      highlight-current-row
      tooltip-effect="dark"
    >
      <!-- :default-sort="{prop: 'date', sort: 'descending'}" -->
      <!-- <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column> -->

      <template v-for="(item,index)  in dataModal.columns">
        <el-table-column
          :key="dataModal.index+index"
          :prop="item.prop"
          :label="$t('backstage.'+dataModal.index+'.columns.'+item.prop)"
          show-overflow-tooltip
        >
        </el-table-column>
      </template>
      <!-- 含有 filter 的 列 -->
      <!-- <slot name="filterColumns"></slot> -->

      <!-- <template
        slot="filterColumns"
        v-for="(item,index)  in dataModal.filterColumns"
      > -->

      <el-table-column
        v-for="(item,index)  in dataModal.filterColumns"
        :key="index+'filterColumns'"
        :prop="item.prop"
        :label="$t('backstage.'+dataModal.index+'.columns.'+item.prop)"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row[item.prop]|changeTableColumns(dataModal.index,item.prop,'tagType')">
            {{scope.row[item.prop]|changeTableColumns(dataModal.index,item.prop,"lable")}}
          </el-tag>
        </template>
      </el-table-column>

      <template v-for="(item,index)  in dataModal.imgColumns">
        <el-table-column
          :key="index+'imgColumns'"
          :prop="item.prop"
          :label="$t('backstage.'+dataModal.index+'.columns.'+item.prop)"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- <div v-viewer> -->
            <img
              width="51px"
              height="50px"
              :src="scope.row[item.prop]"
              alt=""
              :key="index"
              v-viewer
              style="cursor:pointer"
            >
            <!-- </div> -->
          </template>
        </el-table-column>
      </template>

      <!-- </template> -->

      <!-- <slot name="handleColumns"></slot> -->

      <el-table-column
        v-if="!dataModal.commonAction.hide"
        align="center"
        :label="$t('backstage.table.handleColumn')"
        :width="handleColumnWidth"
      >
        <template slot-scope="scope">
          <el-button
            v-if="dataModal.commonAction.delete"
            size="small"
            type="danger"
            @click="deleteItem(scope.row)"
          >
            <i class="el-icon-delete"></i>
            {{$t('backstage.table.delete')}}
          </el-button>
          <el-button
            v-if="dataModal.commonAction.detail"
            size="small"
            type="success"
            @click="detailItem(scope.row)"
          >
            <svg-icon icon-class="icon_details"></svg-icon>
            {{$t('backstage.table.detail')}}
          </el-button>
          <el-button
            v-if="dataModal.commonAction.edit"
            size="small"
            type="primary"
            @click="editItem(scope.row)"
          >
            <i class="el-icon-edit"></i>
            {{$t('backstage.table.edit')}}
          </el-button>

          <slot
            name="handleColumns"
            :dataScope="scope"
          ></slot>
        </template>

      </el-table-column>

    </el-table>
    <el-row
      class="m-top-sm"
      :gutter="0"
    >
      <!-- pc 端 -->
      <el-col
        :offset="5"
        :lg="14"
        :xs="0"
        class="over-flow-auto"
        style="text-align: center;"
      >
        <div class="pagination-container">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="dataModal.list.pageNum"
            :page-sizes="[10,15,30, 50]"
            :page-size="dataModal.list.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataModal.list.total"
          >
          </el-pagination>
        </div>
      </el-col>
      <!-- 移动端 -->
      <el-col
        :lg="0"
        :xs="24"
        class="over-flow-auto"
      >
        <div class="pagination-container">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="dataModal.list.pageNum"
            :page-sizes="[10,15,30, 50]"
            :page-size="dataModal.list.pageSize"
            layout="prev, pager, next"
            :total="dataModal.list.total"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
});
export default {
  props: {
    dataModal: {
      type: Object,
      default: {}
    },
    //控制操作列的宽度
    handleColumnWidth: {
      type: Number,
      default: 300
    }
  },
  created() {
    this.list();
  },
  methods: {
    list() {
      // var resData = this.getDataFormat(this.projectReport.searchData);
      var paramObj = this.dataModal.searchData;
      this.$store.dispatch(this.dataModal.listAction, paramObj);
    },

    handleSizeChange(data) {
      this.dataModal.searchData.pageSize = data;
      this.list();
    },
    // 页码发生改变
    handleCurrentChange(data) {
      this.dataModal.searchData.pageNum = data;
      this.list();
    },
    deleteItem(data) {
      this.$confirm(
        this.$t("backstage.common.delete.confirm.message"),
        this.$t("backstage.common.delete.confirm.title"),
        {
          confirmButtonText: this.$t(
            "backstage.common.delete.confirm.confirmButtonText"
          ),
          cancelButtonText: this.$t(
            "backstage.common.delete.confirm.cancelButtonText"
          ),
          type: "warning"
        }
      )
        .then(() => {
          let resq = {};
          if (this.dataModal.deleteParamsKey === undefined) {
            resq[this.dataModal.deleteKey] = data[this.dataModal.deleteKey];
          } else {
            resq[this.dataModal.deleteParamsKey] =
              data[this.dataModal.deleteKey];
          }
          this.$store.dispatch(this.dataModal.deleteAction, resq).then(res => {
            if (res.state >= 0) {
              this.$notify({
                title: this.$t("backstage.common.delete.notify.success.title"),
                message: this.$t(
                  "backstage.common.delete.notify.success.message"
                ),
                type: "success"
              });
              //更新列表数据
              this.list();
            } else {
              this.$notify.error({
                title: this.$t("backstage.common.delete.notify.error.title"),
                message: this.$t("backstage.common.delete.notify.error.message")
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("backstage.common.delete.confirm.cancelInfo")
          });
        });
    },
    editItem(data) {
      this.dataModal.formDialog = true;
      this.dataModal.formState = "update";

      setTimeout(() => {
        // this.dataModal.formModel = data;
        // 仅仅将数据模型中的数据输入
        for(var i in data){
          // this.dataModal.formModel[i] = data[i]
          // 去掉类型为数组的
          console.log(Object.prototype.toString.call(data[i]))
          if(Object.prototype.toString.call(data[i])!='[object Object]'){
            this.dataModal.formModel[i] = data[i]
          }
        }
        for (var i in this.dataModal.submitForms) {
          if (this.dataModal.submitForms[i].type == "transfer") {
            this.dataModal.formModel[this.dataModal.submitForms[i].prop] = this.dataModal.formModel[this.dataModal.submitForms[i].prop]?this.dataModal.formModel[this.dataModal.submitForms[i].prop].split(','):[];
          }
        }
        this.$emit('tableEdit');
      }, 10);

      // console.log(this.dataModal.formModel);
    },
    add() {
      // for (var i in this.dataModal.formModel) {
      //   // console.log(this.dataModal.formModel[i]);
      //   this.dataModal.formModel[i] = "";
      // }
      this.dataModal.formDialog = true;
      this.dataModal.formState = "add";
    }
  },
  // formDialog
  watch: {
    "dataModal.formDialog": {
      handler(newName, oldName) {
        if (newName === false) {
          this.list();
        }
      },
      deep: true
    }
  }
};
</script>
<style scoped>
image {
  cursor: pointer;
  display: inline-block;
}
</style>
<style>
.viewer-close:before,
.viewer-flip-horizontal:before,
.viewer-flip-vertical:before,
.viewer-fullscreen-exit:before,
.viewer-fullscreen:before,
.viewer-next:before,
.viewer-one-to-one:before,
.viewer-play:before,
.viewer-prev:before,
.viewer-reset:before,
.viewer-rotate-left:before,
.viewer-rotate-right:before,
.viewer-zoom-in:before,
.viewer-zoom-out:before {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAAUCAYAAABWOyJDAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAQPSURBVHic7Zs/iFxVFMa/0U2UaJGksUgnIVhYxVhpjDbZCBmLdAYECxsRFBTUamcXUiSNncgKQbSxsxH8gzAP3FU2jY0kKKJNiiiIghFlccnP4p3nPCdv3p9778vsLOcHB2bfveeb7955c3jvvNkBIMdxnD64a94GHMfZu3iBcRynN7zAOI7TG15gHCeeNUkr8zaxG2lbYDYsdgMbktBsP03jdQwljSXdtBhLOmtjowC9Mg9L+knSlcD8TNKpSA9lBpK2JF2VdDSR5n5J64m0qli399hNFMUlpshQii5jbXTbHGviB0nLNeNDSd9VO4A2UdB2fp+x0eCnaXxWXGA2X0au/3HgN9P4LFCjIANOJdrLr0zzZ+BEpNYDwKbpnQMeAw4m8HjQtM6Z9qa917zPQwFr3M5KgA6J5rTJCdFZJj9/lyvGhsDvwFNVuV2MhhjrK6b9bFiE+j1r87eBl4HDwCF7/U/k+ofAX5b/EXBv5JoLMuILzf3Ap6Z3EzgdqHMCuF7hcQf4HDgeoHnccncqdK/TvSDWffFXI/exICY/xZyqc6XLWF1UFZna4gJ7q8BsRvgd2/xXpo6P+D9dfT7PpECtA3cnWPM0GXGFZh/wgWltA+cDNC7X+AP4GzjZQe+k5dRxuYPeiuXU7e1qwLpDz7dFjXKRaSwuMLvAlG8zZlG+YmiK1HoFqT7wP2z+4Q45TfEGcMt01xLoNZEBTwRqD4BLpnMLeC1A41UmVxsXgXeBayV/Wx20rpTyrpnWRft7p6O/FdqzGrDukPNtkaMoMo3FBdBSQMOnYBCReyf05s126fU9ytfX98+mY54Kxnp7S9K3kj6U9KYdG0h6UdLbkh7poFXMfUnSOyVvL0h6VtIXHbS6nOP+s/Zm9mvyXW1uuC9ohZ72E9uDmXWLJOB1GxsH+DxPftsB8B6wlGDN02TAkxG6+4D3TWsbeC5CS8CDFce+AW500LhhOW2020TRjK3b21HEmgti9m0RonxbdMZeVzV+/4tF3cBpP7E9mKHNL5q8h5g0eYsCMQz0epq8gQrwMXAgcs0FGXGFRcB9wCemF9PkbYqM/Bas7fxLwNeJPdTdpo4itQti8lPMqTpXuozVRVXPpbHI3KkNTB1NfkL81j2mvhDp91HgV9MKuRIqrykj3WPq4rHyL+axj8/qGPmTqi6F9YDlHOvJU6oYcTsh/TYSzWmTE6JT19CtLTJt32D6CmHe0eQn1O8z5AXgT4sx4Vcu0/EQecMydB8z0hUWkTd2t4CrwNEePqMBcAR4mrBbwyXLPWJa8zrXmmLEhNBmfpkuY2102xxrih+pb+ieAb6vGhuA97UcJ5KR8gZ77K+99xxeYBzH6Q3/Z0fHcXrDC4zjOL3hBcZxnN74F+zlvXFWXF9PAAAAAElFTkSuQmCC");
  background-repeat: no-repeat;
  color: transparent;
  display: block;
  font-size: 0;
  height: 20px;
  line-height: 0;
  width: 20px;
}
.viewer-zoom-in:before {
  background-position: 0 0;
  content: "Zoom In";
}
.viewer-zoom-out:before {
  background-position: -20px 0;
  content: "Zoom Out";
}
.viewer-one-to-one:before {
  background-position: -40px 0;
  content: "One to One";
}
.viewer-reset:before {
  background-position: -60px 0;
  content: "Reset";
}
.viewer-prev:before {
  background-position: -80px 0;
  content: "Previous";
}
.viewer-play:before {
  background-position: -100px 0;
  content: "Play";
}
.viewer-next:before {
  background-position: -120px 0;
  content: "Next";
}
.viewer-rotate-left:before {
  background-position: -140px 0;
  content: "Rotate Left";
}
.viewer-rotate-right:before {
  background-position: -160px 0;
  content: "Rotate Right";
}
.viewer-flip-horizontal:before {
  background-position: -180px 0;
  content: "Flip Horizontal";
}
.viewer-flip-vertical:before {
  background-position: -200px 0;
  content: "Flip Vertical";
}
.viewer-fullscreen:before {
  background-position: -220px 0;
  content: "Enter Full Screen";
}
.viewer-fullscreen-exit:before {
  background-position: -240px 0;
  content: "Exit Full Screen";
}
.viewer-close:before {
  background-position: -260px 0;
  content: "Close";
}
.viewer-container {
  bottom: 0;
  direction: ltr;
  font-size: 0;
  left: 0;
  line-height: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  -webkit-tap-highlight-color: transparent;
  top: 0;
  -ms-touch-action: none;
  touch-action: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.viewer-container::selection,
.viewer-container ::selection {
  background-color: transparent;
}
.viewer-container img {
  display: block;
  height: auto;
  max-height: none !important;
  max-width: none !important;
  min-height: 0 !important;
  min-width: 0 !important;
  width: 100%;
}
.viewer-canvas {
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
}
.viewer-canvas > img {
  height: auto;
  margin: 15px auto;
  max-width: 90% !important;
  width: auto;
}
.viewer-footer {
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  text-align: center;
}
.viewer-navbar {
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
.viewer-list {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  height: 50px;
  margin: 0;
  overflow: hidden;
  padding: 1px 0;
}
.viewer-list > li {
  color: transparent;
  cursor: pointer;
  float: left;
  font-size: 0;
  height: 50px;
  line-height: 0;
  opacity: 0.5;
  overflow: hidden;
  -webkit-transition: opacity 0.15s;
  transition: opacity 0.15s;
  width: 30px;
}
.viewer-list > li:hover {
  opacity: 0.75;
}
.viewer-list > li + li {
  margin-left: 1px;
}
.viewer-list > .viewer-loading {
  position: relative;
}
.viewer-list > .viewer-loading:after {
  border-width: 2px;
  height: 20px;
  margin-left: -10px;
  margin-top: -10px;
  width: 20px;
}
.viewer-list > .viewer-active,
.viewer-list > .viewer-active:hover {
  opacity: 1;
}
.viewer-player {
  background-color: #000;
  bottom: 0;
  cursor: none;
  display: none;
  right: 0;
}
.viewer-player,
.viewer-player > img {
  left: 0;
  position: absolute;
  top: 0;
}
.viewer-toolbar > ul {
  display: inline-block;
  margin: 0 auto 5px;
  overflow: hidden;
  padding: 3px 0;
}
.viewer-toolbar > ul > li {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: pointer;
  float: left;
  height: 24px;
  overflow: hidden;
  -webkit-transition: background-color 0.15s;
  transition: background-color 0.15s;
  width: 24px;
}
.viewer-toolbar > ul > li:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.viewer-toolbar > ul > li:before {
  margin: 2px;
}
.viewer-toolbar > ul > li + li {
  margin-left: 1px;
}
.viewer-toolbar > ul > .viewer-small {
  height: 18px;
  margin-bottom: 3px;
  margin-top: 3px;
  width: 18px;
}
.viewer-toolbar > ul > .viewer-small:before {
  margin: -1px;
}
.viewer-toolbar > ul > .viewer-large {
  height: 30px;
  margin-bottom: -3px;
  margin-top: -3px;
  width: 30px;
}
.viewer-toolbar > ul > .viewer-large:before {
  margin: 5px;
}
.viewer-tooltip {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  color: #fff;
  display: none;
  font-size: 12px;
  height: 20px;
  left: 50%;
  line-height: 20px;
  margin-left: -25px;
  margin-top: -10px;
  position: absolute;
  text-align: center;
  top: 50%;
  width: 50px;
}
.viewer-title {
  color: #ccc;
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  margin: 0 5% 5px;
  max-width: 90%;
  opacity: 0.8;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-transition: opacity 0.15s;
  transition: opacity 0.15s;
  white-space: nowrap;
}
.viewer-title:hover {
  opacity: 1;
}
.viewer-button {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: pointer;
  height: 80px;
  overflow: hidden;
  position: absolute;
  right: -40px;
  top: -40px;
  -webkit-transition: background-color 0.15s;
  transition: background-color 0.15s;
  width: 80px;
}
.viewer-button:focus,
.viewer-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.viewer-button:before {
  bottom: 15px;
  left: 15px;
  position: absolute;
}
.viewer-fixed {
  position: fixed;
}
.viewer-open {
  overflow: hidden;
}
.viewer-show {
  display: block;
}
.viewer-hide {
  display: none;
}
.viewer-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
.viewer-invisible {
  visibility: hidden;
}
.viewer-move {
  cursor: move;
  cursor: -webkit-grab;
  cursor: grab;
}
.viewer-fade {
  opacity: 0;
}
.viewer-in {
  opacity: 1;
}
.viewer-transition {
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
@-webkit-keyframes viewer-spinner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
@keyframes viewer-spinner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
.viewer-loading:after {
  -webkit-animation: viewer-spinner 1s linear infinite;
  animation: viewer-spinner 1s linear infinite;
  border: 4px solid hsla(0, 0%, 100%, 0.1);
  border-left-color: hsla(0, 0%, 100%, 0.5);
  border-radius: 50%;
  content: "";
  display: inline-block;
  height: 40px;
  left: 50%;
  margin-left: -20px;
  margin-top: -20px;
  position: absolute;
  top: 50%;
  width: 40px;
  z-index: 1;
}
@media (max-width: 767px) {
  .viewer-hide-xs-down {
    display: none;
  }
}
@media (max-width: 991px) {
  .viewer-hide-sm-down {
    display: none;
  }
}
@media (max-width: 1199px) {
  .viewer-hide-md-down {
    display: none;
  }
}
</style>


