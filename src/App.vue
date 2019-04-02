<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
}

body {
  background-image: url("./assets/images/login-bg.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
.pagination-container {
  margin-top: 30px;
}
.middle {
  vertical-align: middle;
}
.user-container {
  margin: 50px;
}
.el-card {
  padding: 15px;
}
.el-dialog {
  min-width: 500px !important;
}
</style>
