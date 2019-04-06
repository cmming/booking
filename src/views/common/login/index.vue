<template>
  <div class="login-container">
    <img
      class="login-bg"
      src="../../../assets/images/login-container.png"
      alt=""
    >
    <div class="login-form">
      <div class="login-form-title">
        资源预约管理平台

        <div class="login-input-container">
          <el-input
            class="login-input"
            v-model="user.form.name"
            placeholder="用户名"
            autocomplete=false
          ></el-input>

          <svg-icon
            class-name='login-icon'
            icon-class="user"
          />

        </div>

        <div class="login-input-container">
          <el-input
            class="login-input"
            v-model="user.form.password"
            placeholder="密码"
            autocomplete=false
            type="password"
          ></el-input>

          <svg-icon
            class-name='login-icon'
            icon-class="password"
          />
        </div>
        <div
          class="login-btn"
          @click="login"
        >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters(["user"]),
  data() {
    return {};
  },
  methods: {
    login() {
      console.log(this.user.form);
      this.$store.dispatch("USER_lOGIN", this.user.form).then(res => {

        this.$router.push({ path: "/booking" });
        // if (res.state > 0) {
        //   //权限，1管理员，2用户
        //   if (res.data.jurisdiction == 1) {
        //     //管理员
        //     this.$router.push({ path: "/booking" });
        //   } else if (res.data.jurisdiction == 2) {
        //     // 客户端
        //     this.$router.push({ path: "/booking" });
        //   }
        // }
      });
    }
  }
};
</script>

<style>
.login-container {
  position: relative;
  width: 70vw;
  height: 60vh;
  top: 16vh;
  margin: 0 auto;
  max-width: 1333px;
  min-width: 1164px;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: auto;
}
.login-bg {
  max-width: 100%;
  position: absolute;
}
.login-form {
  position: absolute;
  left: 50%;
  width: 50%;
  height: 100%;
  top: 3%;
}
.login-form-title {
  text-align: center;
  font-size: 36px;
  color: #3d9aff;
  font-weight: 700;
  margin-top: 70px;
}
.login-form .el-input__inner {
  margin-top: 45px;
  height: 60px;
  width: 60%;
}
.login-input-container {
  position: relative;
}
.login-icon {
  position: absolute;
  bottom: 15px;
  right: 22%;
  color: #dfdfdf;
}
.login-btn {
  display: inline-block;
  width: 60%;
  height: 70px;
  margin-top: 50px;
  background-image: url("../../../assets/images/login-btn.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: auto;
}
.login-btn:hover {
  background-image: url("../../../assets/images/login-btn-hover.png");
}
</style>

