<template>
  <div class="p-layout-aside">
    <div class="p-layout-aside">
      <div class="p-layout-aside" :class="{'is-collapse': isCollapse}">
        <aside class="p-layout-sider">
          <div class="p-layout-logo"></div>
          <el-menu
            theme="dark"
            :unique-opened="true"
            :router="true">
            <el-submenu
              :index="menu.name"
              v-for="(menu, index) in menus">
              <template slot="title">
                <span class="nav-next">{{menu.text}}</span>
              </template>
              <el-menu-item
                :index="subMenu.path"
                v-for="(subMenu, subIndex) in menu.children">{{subMenu.text}}</el-menu-item>
            </el-submenu>
          </el-menu>
          <div class="p-layout-scale" @click="toggleSider">
            <i :class="{'el-icon-arrow-right': isCollapse, 'el-icon-arrow-left': !isCollapse}"></i>
          </div>
        </aside>
        <div class="p-layout-main">
          <div class="p-layout-header">
            <el-dropdown class="is-user" @command="handleDropdown">
              <span class="el-dropdown-link">
                lynzz <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="p-layout-breadcrumb"></div>
          <div class="p-layout-container">
            <slot></slot>
          </div>
          <div class="p-layout-footer"> 版权所有 © 2016</div>
        </div>
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
@black: #1f2d3d;
@light-black: #324057;
@extra-light-black: #475669;
@siderWidth: 224px;
@siderCollapseWidth: 64px;
@transition: all 0.3s ease;

html, body, #app {
  margin: 0;
  height: 100%;
}
.p-layout {
  &-aside {
    position: relative;
    min-height: 100%;
    height: 100%;
    &.is-collapse {
      .p-layout-sider {
        width: @siderCollapseWidth;
      }
      .p-layout-main {
        margin-left: @siderCollapseWidth;
      }
      .p-layout-logo {
        width: 32px;
        margin: 16px;
      }
      .el-submenu__icon-arrow,
      .el-menu .nav-next {
        display: none;
      }
      .p-layout-scale {
        width: @siderCollapseWidth;
      }
    }
  }
  &-sider {
    width: @siderWidth;
    background-color: @black;
    position: absolute;
    overflow: visible;
    padding-bottom: 24px;
    top: 0;
    left: 0;
    bottom: 0;
    transition: @transition;
  }
  &-logo {
    width: 150px;
    height: 32px;
    background: @light-black;
    border-radius: 6px;
    margin: 16px 24px 16px 28px;
    transition: @transition;
  }
  &-scale {
    height: 42px;
    width: @siderWidth;
    position: absolute;
    bottom: 0;
    background-color: @extra-light-black;
    color: #fff;
    text-align: center;
    line-height: 42px;
    cursor: pointer;
    transition: @transition;
  }
  &-main {
    margin-left: @siderWidth;
    transition: @transition;
  }
  &-container {
    margin: 24px 16px;
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
  }
  &-header {
    padding: 20px 10px;
    border-bottom: 1px solid #e9e9e9;
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
