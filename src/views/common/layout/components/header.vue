<template>
  <div>
    <ul class="header">
      <li class="brand">资源预约管理平台</li>
      <router-link
        active-class="active"
        class=""
        tag="li"
        to="/booking"
      >首页</router-link>
      <!-- <router-link
        active-class="active"
        class=""
        tag="li"
        to="/record"
      >我的预约</router-link> -->
      <li
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
      </li>
      <!-- 右侧的导航 -->
      <li class="fr">
        <svg-icon
            class-name='login-icon'
            icon-class="logout"
          />
      </li>
      <li class="fr userInfo">
        <img
          src="../../../../assets/images/avatar.png"
          alt=""
        >
        超人
      </li>
    </ul>
  </div>
</template>
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
    img {
      width: 42px;
      height: 42px;
      padding: 19px 8px;
      vertical-align: middle;
    }
  }
}
</style>

