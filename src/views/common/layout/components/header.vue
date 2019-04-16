<template>
  <div>
    <ul class="header">
      <li class="brand">资源预约管理平台</li>
      <!-- <router-link
        active-class="active"
        class=""
        tag="li"
        to="/booking"
      >首页</router-link>
      <router-link
        active-class="active"
        class=""
        tag="li"
        to="/record"
      >我的预约</router-link>-->
      <!-- 将菜单以参数的形式传入 -->
      <router-link
        v-for="(item,key) in user.userMenuList"
        :key="key"
        active-class="active"
        class
        tag="li"
        :to="item.path"
      >{{item.name}}</router-link>
      <!-- <li
        class="relative userCenter"
        tag="li"
        to="/user"
      >个人中心
      <ul class="secondMenu">
          <router-link
            active-class="active"
            tag="li"
            to="/record"
          >我的预约</router-link>
          <li>修改密码</li>
        </ul>
      </li>-->
      <!-- 右侧的导航 -->
      <li class="fr" @click="logout">
        <svg-icon icon-class="logout"/>
      </li>

      <el-dropdown tag="li" class="fr userInfo" trigger="click">
        <span class="el-dropdown-link">
          <img src="../../../../assets/images/avatar.png" alt>
          {{user.userInfo.userName}}
          <!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="changePwd">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </ul>

    <!-- 修改密码的弹框 -->
    <el-dialog title="上机用户信息" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      ruleForm2: {
        password: "",
        pass: "",
        checkPass: ""
      },
      rules2: {
        password: [{ required: true, message: '请输入旧密码', trigger: 'blur' },],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
    };
  },
  computed: mapGetters(["user"]),
  methods: {
    changePwd() {
      this.dialogVisible = true;
      this.ruleForm2.pass = "";
      this.ruleForm2.checkPass = "";
      this.ruleForm2.password = "";
    },
    logout() {
      this.$store.dispatch("LOGOUT").then(res => {
        this.$router.push("/login");
        this.$router.push('/refresh')
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("USER_SET_PWD", {
              password: this.ruleForm2.password,
              newPassword: this.ruleForm2.pass
            })
            .then(res => {
              if (res.status == 204) {
                this.$notify({
                  title: "警告",
                  message: "密码修改成功，3秒后将自动退出系统",
                  type: "warning",
                  duration: "1000"
                });
                setTimeout(() => {
                  this.logout();
                }, 3000);
                this.dialogVisible = false;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.header {
  /* padding: 0 45px; */
  font-size: 0;
  width: 100%;
  background: #ffffff;
  box-shadow: 0 2px 3px -1px #c4d7f3;
  .relative {
    position: relative;
  }
  .fr {
    float: right;
  }
  li {
    display: inline-block;
    height: 80px;
    line-height: 80px;
    font-size: 20px;
    padding: 0 50px;
    list-style: none;
    box-sizing: border-box;
    cursor: pointer;
    &.brand {
      background: #323756;
      color: #ffffff;
    }
    &.active {
      background: #deeaff;
      color: #333333;
      border-bottom: 4px solid #323756;
    }
  }
  .secondMenu {
    display: none;
    position: absolute;
    width: 100%;
    z-index: 1001;
    background: #ffffff;
    left: 0;
    box-shadow: 0px 8px 10px #c4d7f3;
  }
  .userCenter:hover .secondMenu {
    display: block;
  }
  .secondMenu {
    display: none;
    position: absolute;
    width: 100%;
    z-index: 1001;
    background: #ffffff;
    left: 0;
    box-shadow: 0px 8px 10px #c4d7f3;
    li {
      height: 60px;
      line-height: 60px;
      border-bottom: none;
      &:hover {
        background: #deeaff;
      }
    }
  }
  .userInfo {
    cursor: pointer;
    img {
      width: 42px;
      height: 42px;
      padding: 19px 8px;
      vertical-align: middle;
    }
  }
}
</style>

