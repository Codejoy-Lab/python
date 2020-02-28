<template>
<div>
    <codemirror ref="myCm" 
        id="yourCode" 
        v-model="codes"
        :options="cmOption" 
        cols="80" 
        rows="5"
        @input="onCmCodeChange"
    ></codemirror>
</div>
</template>

<script>
export default {
  name: 'Editor',
  data () {
    return {
      codes: '',
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '120px',
      username: '',
      date: 0,
      file: '',
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        // gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        mode: 'python',
        theme: "neo",
        keyMap: "emacs",
        spellcheck:true,
        autocorrect:true
      }
    }
}
</script>

<style scoped>

</style>
