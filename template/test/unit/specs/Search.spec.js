import Vue from 'vue'
import ElementUI from 'element-ui'
import Search from 'src/components/Search.vue'
import { Promise } from 'es6-promise'

Vue.use(ElementUI)

const getUserList = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        'result': 'success',
        'messages': [],
        'fieldErrors': {},
        'errors': [],
        'data': {
          totalCount: 30,
          pageNo: 1,
          pageSize: 20,
          'listData': [{
            id: 1,
            name: 'lzz'
          }]
        }
      })
    }, 0)
  })
}

describe('Search.vue', () => {
  let vm
  before(() => {
    vm = new Vue({
      el: document.createElement('div'),
      template: `<search
        ref="user"
        :search-rules="userRules"
        :fetch-list="fetchList"
        page-layout="total, sizes, prev, pager, next"
        @selection-change="handleCheck"
        :search-form="userForm">
        <template slot="form">
          <el-form-item prop="name">
            <el-input v-model="userForm.name" placeholder="用户名" :maxlength="10"></el-input>
          </el-form-item>
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
      </search>`,
      components: {
        Search
      },
      data () {
        return {
          fetchList: getUserList,
          userRules: {
            name: [
              {max: 10, messasge: '最大长度是 10 个字符'}
            ]
          },
          userForm: {
            name: '1',
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
          console.log(val)
        },
        refresh () {
          this.$refs.user.refresh()
        }
      }
    })
  })
  it('vm', () => {
    expect(typeof vm !== 'undefined').to.equal(true)
  })

  it('search form', () => {
    expect(vm.$el.querySelectorAll('.el-form-item').length).to.equal(2)
  })

  it('search table', () => {
    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('.el-table__body-wrapper tbody tr').length).to.equal(1)
    })
  })

  it('search checkbox', () => {
    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('.el-checkbox').length).to.equal(2)
    })
  })

  it('search pager total', () => {
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.el-pagination__total').textContent).to.equal('共 30 条')
    })
  })
})
