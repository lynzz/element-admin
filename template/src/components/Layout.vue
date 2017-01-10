<template>
  <div class="p-layout">
    <div class="p-layout-topbar clearfix">
      <div class="p-layout-name" :class="{'sider-mini': isCollapse}">
        <router-link class="full" to="/" v-if="!isCollapse">pAdmin</router-link>
        <span class="mini" v-else>P</span>
      </div>
      <div class="p-layout-collapse" @click="toggleSider"><i class="fa fa-bars"></i></div>
      <div class="p-layout-nav">
        <el-dropdown class="is-user" @command="handleDropdown">
          <img src="../assets/avatar.jpg" class="p-layout-avatar" alt="">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div
      class="p-layout-body"
      :class="{
        'sider-full': !isCollapse,
        'sider-mini': isCollapse
      }">
      <aside class="p-layout-sider">
        <div class="p-layout-user">
          <img alt="" src="../assets/avatar.jpg" class="p-layout-avatar">
          <div>userName</div>
        </div>
        <el-menu
          theme="dark"
          :unique-opened="true"
          :default-active="currentRoute"
          :router="true">
          <el-submenu
            :index="menu.name"
            v-for="(menu, index) in menus">
            <template slot="title">
              <i v-if="menu.icon" class="fa" :class="'fa-' + menu.icon"></i>
              <span class="nav-next">\{{menu.text}}</span>
            </template>
            <el-menu-item
              :index="subMenu.path"
              v-for="(subMenu, subIndex) in menu.children">
                <i v-if="subMenu.icon" class="fa" :class="'fa-' + subMenu.icon"></i>
                <span class="nav-next">\{{subMenu.text}}</span>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </aside>
      <div class="p-layout-panel">
        <div class="p-layout-content">
          <div class="p-layout-container">
            <div class="p-layout-breadcrumb">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="p-layout-inner">
              <slot></slot>
            </div>
          </div>
        </div>
        <div class="p-layout-footer"> 版权所有 © 2016</div>
      </div>
    </div>
  </div>
</template>
<script>
import auth from '../auth'
import menus from '../nav-config'

export default {
  name: 'p-layout',

  data () {
    return {
      loggedIn: auth.loggedIn(),
      menus,
      currentRoute: this.$router.history.current.fullPath,
      isCollapse: false
    }
  },
  created () {
    auth.onChange = (loggedIn) => {
      this.loggedIn = loggedIn
    }
  },

  methods: {
    toggleSider () {
      this.isCollapse = !this.isCollapse
    },
    handleDropdown (cmd) {
      if (cmd === 'logout') {
        auth.logout()
        this.$router.replace({ name: 'login' })
      }
    }
  }
}
</script>

<style lang="less">
@black: #2a323c;
@light-black: #324057;
@extra-light-black: #475669;
@blue: #03a9f4;
@gray: #d3dce6;
@light-gray: #e5e9f2;
@sider-width: 224px;
@top-height: 70px;
@sider-collapse-width: 64px;
@transition: all 0.3s ease;
@cont-padding: 15px;

html, body, #app {
  margin: 0;
  height: 100%;
}
.p-layout {
  &-topbar {
    position: fixed;
    width: 100%;
    height: @top-height;
    line-height: @top-height;
    background-color: @blue;
    z-index: 101;
    color: #fff;

    a {
      color: @gray;
    }
    .el-dropdown-link {
      color: #fff;
    }
  }
  &-name {
    width: @sider-width;
    text-align: center;
    float: left;
    background-color: @black;
    font-family: Helvetica;
    font-size: 30px;
    &.sider-mini {
      width: @sider-collapse-width;
    }
    .full {
      text-decoration: none;
    }
    .mini {
    }
  }
  &-nav {
    float: right;
    padding-right: 10px;
    .nav-item {
      margin-right: 10px;
      .fa {
        font-size: 20px;
      }
      .el-badge__content.is-fixed {
        top: 20px;
      }
    }
    .p-layout-avatar {
      width: 36px;
      height: 36px;
      border: 2px solid @gray;
    }
  }
  &-avatar {
    border-radius: 50%;
    vertical-align: middle;
    cursor: pointer;
  }
  &-user {
    padding: 20px;
    text-align: center;
    color: #fff;
    .p-layout-avatar {
      width: 64px;
      height: 64px;
      margin-bottom: 10px;
    }
  }
  &-sider {
    width: @sider-width;
    background-color: @black;
    position: fixed;
    top: @top-height;
    left: 0;
    height: 100%;
    transition: @transition;
    z-index: 102;
    overflow-x: hidden;
  }
  &-panel,
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    background: #f5f5f5;
    transition: @transition;
    width: auto;
  }

  &-collapse {
    float: left;
    width: @top-height;
    cursor: pointer;
    background-color: rgba(255, 255, 255, .1);
    text-align: center;
    color: #fff;
  }
  &-body {
    position: absolute;
    width: 100%;
    top: @top-height;
    bottom: 0;
    z-index: 100;
    &.sider-full {
      .p-layout-panel {
        left: @sider-width;
      }
    }
    &.sider-mini {
      .p-layout-panel {
        left: @sider-collapse-width;
      }
      .p-layout-sider {
        width: @sider-collapse-width;
      }
      .p-layout-user {
        display: none;
      }
      .el-menu {
        .el-submenu__icon-arrow,
        .nav-next {
          display: none;
        }
        &-item {
          padding: 0 !important;
        }
        .el-submenu {
          text-align: center;
        }
      }
    }
  }
  &-content {
    overflow-y: auto;
  }
  &-container {
    padding: 15px;
  }
  &-inner {
    padding: 10px;
    background: #fff;
    border-radius: 3px;
    margin-top: 10px;
  }
  &-breadcrumb {
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    padding: 25px 15px;
    background-color: #fff;
    margin: -15px -15px 0 -15px;
  }
  &-footer {
    height: 64px;
    line-height: 64px;
    text-align: center;
    font-size: 12px;
    color: #999;
    background: #fff;
    border-top: 1px solid #e9e9e9;
    width: 100%;
    display: none;
  }

  &-header {
    padding: 20px 10px;
    border-bottom: 1px solid #e9e9e9;
    background-color: @light-black;
    &:before,
    &:after {
      content: '';
      display: table;
    }
    &:after {
      clear: both;
    }
    .is-user {
      float: right;
    }
  }
}
</style>
