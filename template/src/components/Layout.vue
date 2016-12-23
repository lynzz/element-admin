<template>
  <div class="p-layout">
    <div class="p-layout-topbar">
      <div class="p-layout-name">
        Project Name
      </div>
      <div class="p-layout-nav">
        <el-dropdown class="is-user" @command="handleDropdown">
          <span class="el-dropdown-link">
            lynzz <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
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
        <div class="p-layout-collapse" @click="toggleSider"><i class="fa fa-bars"></i></div>
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
              <span class="nav-next">{{menu.text}}</span>
            </template>
            <el-menu-item
              :index="subMenu.path"
              v-for="(subMenu, subIndex) in menu.children">
                <i v-if="subMenu.icon" class="fa" :class="'fa-' + subMenu.icon"></i>
                <span class="nav-next">{{subMenu.text}}</span>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </aside>
      <div class="p-layout-panel">
        <div class="p-layout-content">
          <div class="p-layout-container">
            <div class="p-layout-breadcrumb"></div>
            <slot></slot>
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
      currentRoute: '/user',
      isCollapse: false
    }
  },
  created () {
    auth.onChange = (loggedIn) => {
      this.loggedIn = loggedIn
    }
  },
  mounted () {
    console.log(this.$router)
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
@gray: #d3dce6;
@light-gray: #e5e9f2;
@siderWidth: 224px;
@topHeight: 50px;
@collapseHeight: 30px;
@siderCollapseWidth: 64px;
@transition: all 0.3s ease;

html, body, #app {
  margin: 0;
  height: 100%;
}
.p-layout {
  &-topbar {
    position: fixed;
    width: 100%;
    height: @topHeight;
    line-height: @topHeight;
    background-color: #373d41;
    z-index: 101;
    color: @gray;

    a {
      color: @gray;
    }
    .el-dropdown-link {
      color: @gray;
    }
  }
  &-name {
    padding-left: 10px;
    display: inline-block;
  }
  &-nav {
    float: right;
    padding-right: 10px;
  }
  &-sider {
    width: @siderWidth;
    background-color: @black;
    position: fixed;
    top: @topHeight;
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
    background: #fff;
    transition: @transition;
    width: auto;
  }

  &-collapse {
    height: @collapseHeight;
    line-height: @collapseHeight;
    cursor: pointer;
    background-color: @extra-light-black;
    text-align: center;
    color: @gray;
  }
  &-body {
    position: absolute;
    width: 100%;
    top: @topHeight;
    bottom: 0;
    z-index: 100;
    &.sider-full {
      .p-layout-panel {
        left: @siderWidth;
      }
    }
    &.sider-mini {
      .p-layout-panel {
        left: @siderCollapseWidth;
      }
      .p-layout-sider {
        width: @siderCollapseWidth;
      }
      .el-menu {
        .el-submenu__icon-arrow,
        .nav-next {
          display: none;
        }
        &-item {
          padding: 0;
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
