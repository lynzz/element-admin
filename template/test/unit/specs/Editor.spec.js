import Vue from 'vue'
import Editor from 'src/components/Editor.vue'

describe('Editor.vue', () => {
  let vm
  before(() => {
    vm = new Vue({
      el: document.createElement('div'),
      template: `<editor ref="editor" v-model="value"></editor>`,
      components: {Editor},
      data () {
        return {
          value: 'hello'
        }
      }
    })
  })
  it('init currentContent', () => {
    Vue.nextTick(() => {
      expect(vm.$refs.editor.currentContent).to.equal('hello')
    })
  })

  it('set currentContent', () => {
    Vue.nextTick(() => {
      vm.$refs.editor.currentContent = 'hello3'
      expect(vm.value).to.equal('hello3')
    })
  })
})
