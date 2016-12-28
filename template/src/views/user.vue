<template>
  <p-layout>
    <p-search
      ref="user"
      :search-rules="userRules"
      :fetch-list="fetchList"
      page-layout="total, sizes, prev, pager, next"
      @selection-change="handleCheck"
      :search-form="userForm">
      <template slot="form">
        <el-form-item prop="user">
          <el-input v-model="userForm.user" placeholder="用户名" :maxlength="10"></el-input>
        </el-form-item>
        <el-form-item prop="role">
          <el-select v-model="userForm.role" placeholder="权限">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="用户" value="1"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot="action">
        <el-button>删除</el-button>
        <el-button>添加</el-button>
      </template>
      <template slot="table">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="role"
          label="权限"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          inline-template
          :context="_self"
          fixed="right"
          width="150"
          label="操作">
          <span>
            <el-button type="text" size="small">查看</el-button>
            <el-button @click="handleEdit($index, row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDelete($index, row)" type="text" size="small">删除</el-button>
          </span>
        </el-table-column>
      </template>
    </p-search>

    <el-dialog title="编辑用户" v-model="editFormVisible">
      <el-form :model="editForm">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="editForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="100px">
          <el-select v-model="editForm.address" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </p-layout>
</template>

<script>
  import {getUserList} from '../api/user'

  export default {
    data () {
      return {
        fetchList: getUserList,
        userRules: {
          user: [
            {max: 10, messasge: '最大长度是 10 个字符'}
          ]
        },
        userForm: {
          user: '1',
          role: ''
        },
        editFormVisible: false,
        editForm: {
          username: '',
          address: ''
        }
      }
    },
    methods: {
      handleEdit (index, row) {
        this.editFormVisible = true
        this.refresh()
      },
      handleDelete (index, row) {
        this.refresh()
      },
      handleCheck (val) {
      },
      refresh () {
        this.$refs.user.refresh()
      }
    }
  }
</script>
