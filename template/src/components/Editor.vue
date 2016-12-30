<template>
  <textarea :id="id" ref="editor"></textarea>
</template>

<script>
  export default {
    name: 'p-editor',
    props: {
      value: String,
      options: Object,
      id: {
        type: String,
        default: 'editor'
      }
    },

    mounted () {
      if (!window.tinymce) {
        return
      }

      let options = Object.assign({}, {
        selector: `#${this.id}`,
        height: 500,
        language: 'zh_CN',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table contextmenu paste code'
        ],
        toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
      }, this.options)

      const editor = this.editor = tinymce.EditorManager.createEditor(this.id, options)

      editor.on('change keyup nodechange', (e) => {
        const val = editor.getContent()
        this.$emit('change', val)
        this.$emit('input', val)
        this.$parent.$emit('el.form.change', val)
      })
      editor.on('blur', (e) => {
        this.$emit('blur', e)
        this.$parent.$emit('el.form.blur', editor.getContent())
      })
      editor.on('init', (e) => {
        editor.setContent(this.value)
      })

      editor.render()
    },

    methods: {
      setContent (val) {
        this.editor.setContent(val)
      },

      getContent () {
        this.editor.getContent()
      }
    },

    beforeDestory () {
      tinymce && tinymce.execCommand('mceRemoveEditor', false, this.id)
    }
  }
</script>
