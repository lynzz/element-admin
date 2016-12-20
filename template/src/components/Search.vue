<template>
  <div class="p-search">
    <el-form :inline="true" :rules="searchRules" ref="searchForm" :model="searchForm">
      <slot name="form"></slot>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <slot name="table"></slot>
    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :total="totalCount"
      :layout="pageLayout"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'p-search',
    props: {
      searchRules: Object,
      searchForm: Object,
      params: {
        type: Object,
        default () {
          return {
            pageNo: 1,
            pageSize: 10
          }
        }
      },
      pageSizes: {
        type: Array,
        default () {
          return [10, 20, 30, 40]
        }
      },
      pageLayout: {
        type: String,
        default: 'total, prev, pager, next'
      },
      fetchList: {
        type: Function,
        required: true
      }
    },
    data () {
      return {
        tableData: [],
        totalCount: 0,
        pageSize: null,
        currentPage: 1
      }
    },
    beforeCreated () {
      this.pageSize = this.params.pageSize
    },
    mounted () {
      this.fetch()
    },
    methods: {
      fetch (data = {}) {
        const params = Object.assign(this.params, this.userForm, data)

        this.fetchList(params).then(data => {
          this.tableData = data.listData
          this.totalCount = data.totalCount
        })
      },
      refresh () {
        const pageNo = this.currentPage = 1
        this.fetch({pageNo})
      },
      handleSizeChange (pageSize) {
        this.fetch({pageSize})
      },

      handleCurrentChange (pageNo) {
        this.currentPage = pageNo
        this.fetch({pageNo})
      },

      handleSelectionChange (val) {
        this.$emit('selection-change', val)
      },

      handleSubmit () {
        this.$refs.searchForm.validate(valid => {
          if (valid) {
            this.currentPage = 1
            this.fetch()
          } else {
            return false
          }
        })
      }
    }
  }
</script>
<style>
  .p-search .el-pagination {
    margin-top: 10px;
  }
</style>
