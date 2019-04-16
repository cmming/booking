<template>
  <el-form
    :model="dataModal.formModel"
    :rules="dataModal.submitFormsRoles"
    :ref="dataModal.index"
    label-width="100px"
  >
    <!-- enctype="multipart/form-data"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"-->
    <template v-for="(item,index)  in dataModal.submitForms">
      <!-- 三次封装 删除重复代码 -->

      <el-form-item
        :key="index"
        :label="$t('backstage.'+dataModal.index+'.submitForms.'+item.prop+'.label')"
        :prop="item.prop"
        v-if="((dataModal.formState=='update'&&(!item.notEdit))||(dataModal.formState=='add'))"
      >
        <template v-if="item.type=='input'">
          <el-input
            v-if="item.inputType&&item.inputType=='number'"
            :id="item.id?item.id:item.prop+dataModal.index"
            :type="item.inputType?item.inputType:'text'"
            v-model.number="dataModal.formModel[item.prop]"
            :placeholder="$t('backstage.'+dataModal.index+'.submitForms.'+item.prop+'.placeholder')"
            onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))"
          ></el-input>

          <el-input
            v-if="!item.inputType||item.inputType&&item.inputType!=='number'"
            :id="item.id?item.id:item.prop+dataModal.index"
            :type="item.inputType?item.inputType:'text'"
            v-model="dataModal.formModel[item.prop]"
            :placeholder="$t('backstage.'+dataModal.index+'.submitForms.'+item.prop+'.placeholder')"
          ></el-input>
        </template>

        <template v-if="item.type=='select'">
          <el-select
            v-model="dataModal.formModel[item.prop]"
            :placeholder="$t('backstage.'+dataModal.index+'.submitForms.'+item.prop+'.placeholder')"
            @change="selectChange(dataModal.formModel[item.prop])"
          >
            <template v-for="(v,k)  in item.option">
              <el-option :key="k" :label="v.label" :value="v.value"></el-option>
            </template>
          </el-select>
        </template>

        <template v-if="item.type=='date'">
          <el-date-picker
            type="date"
            :placeholder="$t('backstage.'+dataModal.index+'.submitForms.'+item.prop+'.placeholder')"
            v-model="dataModal.formModel[item.prop]"
            style="width: 220px;"
          ></el-date-picker>
        </template>

        <template v-if="item.type=='time'">
          <el-time-picker
            type="fixed-time"
            :placeholder="$t('backstage.'+dataModal.index+'.submitForms.'+item.prop+'.placeholder')"
            v-model="dataModal.formModel[item.prop]"
            style="width: 220px;"
            :value-format="item.format?item.format:''"
          ></el-time-picker>
        </template>

        <template v-if="item.type=='switch'">
          <el-switch v-model="dataModal.formModel[item.prop]"></el-switch>
        </template>

        <template v-if="item.type=='checkbox'">
          <el-checkbox-group v-model="dataModal.formModel[item.prop]">
            <template v-for="(v,k)  in item.option">
              <el-checkbox :key="k" :label="v.label" :name="item.prop"></el-checkbox>
            </template>
          </el-checkbox-group>
        </template>

        <template v-if="item.type=='radio'">
          <el-radio-group v-model="dataModal.formModel[item.prop]">
            <template v-for="(v,k)  in item.option">
              <el-radio :key="k" :label="v.value">{{v.label}}</el-radio>
            </template>
          </el-radio-group>
        </template>

        <template v-if="item.type=='textarea'">
          <el-input
            type="textarea"
            v-model="dataModal.formModel[item.prop]"
            :placeholder="$t('backstage.'+dataModal.index+'.submitForms.'+item.prop+'.placeholder')"
          ></el-input>
        </template>

        <template v-if="item.type=='transfer'">
          <el-transfer
            filterable
            :titles="['所有的数据', '选中的数据']"
            v-model="dataModal.formModel[item.prop]"
            :data="item.option"
          ></el-transfer>
        </template>

        <!-- <template v-if="item.type=='file'">
          <el-upload
            class="upload-demo"
            action=""
            :name="item.prop"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >文件大小必须小于200MB</div>
          </el-upload>
        </template>-->
      </el-form-item>
    </template>

    <el-form-item>
      <el-button
        type="primary"
        @click.native="submitForm"
      >{{$t('backstage.common.'+dataModal.formState+".submitButtonLabel")}}</el-button>
      <el-button
        @click.native="resetForm"
        :ref="dataModal.index+'_reset'"
      >{{$t("backstage.form.resetForm")}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    dataModal: {
      type: Object,
      default: {}
    }
  },
  // computed: mapGetters(["loading"]),

  created() {
    for (var i in this.dataModal.submitFormsRoles) {
      //设置多语言的错误信息
      this.dataModal.submitFormsRoles[i].map((val, index) => {
        //   console.log(this.$t('backstage.'+this.dataModal.index+'.submitForms.'+i+'.message.'+val['roleKey']))
        this.dataModal.submitFormsRoles[i][index]["message"] = this.$t(
          "backstage." +
            this.dataModal.index +
            ".submitForms." +
            i +
            ".message." +
            val["roleKey"]
        );
      });
      // 如果是修改
      this.$emit("formCreate");
    }
  },

  methods: {
    selectChange(data) {
      this.$emit("selectChange", data);
    },
    list() {
      // var resData = this.getDataFormat(this.projectReport.searchData);
      var paramObj = this.dataModal.searchData;
      this.$store.dispatch(this.dataModal.listAction, paramObj);
    },
    delTransferData() {
      for (var i in this.dataModal.submitForms) {
        if (this.dataModal.submitForms[i].type == "transfer") {
          this.dataModal.formModel[this.dataModal.submitForms[i].prop] = this
            .dataModal.formModel[this.dataModal.submitForms[i].prop]
            ? this.dataModal.formModel[this.dataModal.submitForms[i].prop].join(
                ","
              )
            : "";
        }
      }
    },
    submitForm() {
      this.$refs[this.dataModal.index].validate(valid => {
        if (valid) {
          //获取当前表单状态
          if (this.dataModal.submitFormsType == "formdata") {
            if (this.dataModal.formState == "add") {
              var formdata = new FormData();
              console.log(this.dataModal.submitForms);
              this.dataModal.submitForms.map(val => {
                // if (val.notEdit && !val.notEdit) {
                if (val.inputType == "file") {
                  formdata.append(
                    val.prop,
                    document.getElementById(val.id).files[0]
                  );
                  formdata.append(
                    "fileName",
                    document
                      .getElementById(val.id)
                      .value.substr(
                        document
                          .getElementById(val.id)
                          .value.lastIndexOf("\\") + 1
                      )
                  );
                  // console.log(document.getElementById(val.id).files[0]);
                } else {
                  formdata.append(val.prop, this.dataModal.formModel[val.prop]);
                }
                // }
              });
              // this.dataModal.formModel = formdata;
              this.$store
                .dispatch(this.dataModal.addAction, formdata)
                // .dispatch(this.dataModal.addAction, this.dataModal.formModel)
                .then(res => {
                  // console.log(res);
                  if (res.state >= 0) {
                    this.$notify({
                      title: this.$t(
                        "backstage.common.add.notify.success.title"
                      ),
                      message: this.$t(
                        "backstage.common.add.notify.success.message"
                      ),
                      type: "success"
                    });
                    this.dataModal.formDialog = false;
                    let restBtn = this.dataModal.index + "_reset";
                    this.$refs[restBtn].$el.click();
                    //更新列表数据
                    this.list();
                  } else {
                    // this.$notify.error({
                    //   title: this.$t("backstage.common.add.notify.error.title"),
                    //   message: res.message
                    //     ? res.message
                    //     : this.$t("backstage.common.add.notify.error.message")
                    // });
                  }
                });
            } else if (this.dataModal.formState == "update") {
              this.$store
                .dispatch(this.dataModal.updateAction, this.dataModal.formModel)
                .then(res => {
                  this.list();
                });
            }
          } else {
            if (this.dataModal.formState == "add") {
              // addAction
              this.$store
                .dispatch(this.dataModal.addAction, this.dataModal.formModel)
                .then(res => {
                  this.dataModal.formDialog = false;
                  let restBtn = this.dataModal.index + "_reset";
                  this.$refs[restBtn].$el.click();
                  //更新列表数据
                  this.list();
                  if (this.dataModal.formModelCopy) {
                    this.dataModal.formModel = this.dataModal.formModelCopy;
                  }
                });
            } else if (this.dataModal.formState == "update") {
              // updateAction
              this.dataModal.formModel[
                this.dataModal.updateParamsKey
              ] = this.dataModal.formModel[this.dataModal.updateKey];
              this.$store
                .dispatch(this.dataModal.updateAction, this.dataModal.formModel)
                .then(res => {
                  this.dataModal.formDialog = false;
                  //更新列表数据
                  this.list();
                  //   if (res.state >= 0) {
                  //     this.$notify({
                  //       title: this.$t(
                  //         "backstage.common.update.notify.success.title"
                  //       ),
                  //       message: this.$t(
                  //         "backstage.common.update.notify.success.message"
                  //       ),
                  //       type: "success"
                  //     });
                  //     this.dataModal.formDialog = false;
                  //     //更新列表数据
                  //     this.list();
                  //   } else {
                  // this.$notify.error({
                  //   title: this.$t(
                  //     "backstage.common.update.notify.error.title"
                  //   ),
                  //   message: res.message
                  //     ? res.message
                  //     : this.$t(
                  //         "backstage.common.update.notify.error.message"
                  //       )
                  // });
                  // }
                });
            }
          }

          for (var i in this.dataModal.submitForms) {
            if (this.dataModal.submitForms[i].type == "transfer") {
              console.log(
                this.dataModal.formModel[this.dataModal.submitForms[i].prop]
              );
              this.dataModal.formModel[
                this.dataModal.submitForms[i].prop
              ] = this.dataModal.formModel[this.dataModal.submitForms[i].prop]
                ? this.dataModal.formModel[
                    this.dataModal.submitForms[i].prop
                  ].join(",")
                : "";
            }
          }

          // if (this.dataModal.formModelCopy) {
          //   this.dataModal.formModel = this.dataModal.formModelCopy;
          // }
          // console.log(this.dataModal.formModel)
        } else {
          console.log("error submit!!", this.dataModal.formModel);
          return false;
        }
      });
    },
    resetForm() {
      this.$refs[this.dataModal.index].resetFields();
    }
  },
  watch: {
    "dataModal.formState": {
      handler(newName, oldName) {
        // console.log("obj.a changed", newName, oldName);
        if (newName === "add") {
          let restBtn = this.dataModal.index + "_reset";
          // console.log(this.$refs[restBtn].$el);
          this.$refs[restBtn].$el.click();
        }
      },
      deep: true
    }
  }
};
</script>

