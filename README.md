# vue-element-admin-boilerplate

> 用 vue-cli 生成的 vue2 与 element-ui 的后台开发脚手架

**已长期不维护，请移至** [waye-pro](https://github.com/wayejs/waye-pro.git)

## 介绍

公司的 java 开发人员已会用 vue2 和 element-ui 开发后台系统，但每个人的开发风格都不一致，所以整一套标准的基于 [vue-cli](https://github.com/vuejs/vue-cli) 的 [webpack](https://github.com/vuejs-templates/webpack) 的模板供开发人员使用。

## 用法

``` bash
$ npm install -g vue-cli
$ vue init lynzz/element-admin my-project
$ cd my-project
$ npm install
$ npm run dev
```

## 特性

- 支持 [mock](http://mockjs.com/) 数据, `mock` 路由按文件路径，单个文件就是一个接口

- `ESLint` 采用 `standard` 方式

- 编辑器用 [tinymce](https://www.tinymce.com/), 见 [Editor.vue](https://github.com/lynzz/element-admin/blob/master/template/src/components/Editor.vue)

## 演示

[element-admin-demo](https://element-admin-demo-pvcijgwhsa.now.sh/)

用户名密码都是 `admin`

## 界面预览

### 搜索页

![搜索页](https://raw.githubusercontent.com/lynzz/element-admin/master/screenshot/search.jpg)

### 编辑器页

![带有编辑器的表单页](https://raw.githubusercontent.com/lynzz/element-admin/master/screenshot/form.jpg)

## TODO

- [ ] add Vuex
