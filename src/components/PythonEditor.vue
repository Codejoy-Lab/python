<template>
  <div class="sk-view">
    <el-row class="editor-wrap">
          <el-col :span="24">
            <form>
              <el-row>
                <el-col>
                  <el-tabs type="card" >
                    <el-tab-pane
                      label="main.py"
                    >
                    <!-- {{item.content}} -->
                      <codemirror ref="myCm" 
                        id="yourCode" 
                        v-model="codes"
                        :options="cmOption" 
                        cols="80" 
                        rows="5"
                        @input="onCmCodeChange"
                    ></codemirror>
                    </el-tab-pane>
                  </el-tabs>
                </el-col>
              </el-row>
              
              <!-- <textarea id="yourCode" v-model="codes" placeholder="input your py code here" cols="80" rows="10" >
              </textarea> -->
              <!-- <br/> -->
              <!-- <input type="button" onClick="runIt" value="Add to favorites"/> -->
              <el-row>
                <el-col>
                    <el-row>
                      <el-col :span="3" :offset="17">
                        <el-button type="success" @click="runIt" icon="el-icon-caret-right">Run</el-button>
                      </el-col>
                      <el-col :span="3" :offset="0">
                        <el-button type="success" @click="dialogFormVisible = true" icon="el-icon-folder">save</el-button>
                      </el-col>
                    </el-row>
                </el-col>
              </el-row>
              
            </form>
            <div>
              <el-dialog title="输入文件名" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="文件名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="save">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </el-col>
    </el-row>
    <el-row class="result-row">
      <el-col :span="24">
        <el-tabs class="result-el-tabs">
          <!-- <el-tab-pane
            :key="item.name"
            v-for="(item) in editableTabs"
            :label="item.title"
            :name="item.name"
          > -->
            <el-tab-pane class="console-el-tab-pane" label="Console">
              <div class="result-wrap"><pre class='output' id="output">result</pre></div>
              
            </el-tab-pane>
            <el-tab-pane label="Canvas">
              <div class="result-wrap"><div class='canvas' id="myCanvas"></div></div>
            </el-tab-pane>
          <!-- </el-tab-pane> -->
        </el-tabs>
        
        
      </el-col>
      
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import Sk from '@hwc/skulpt'
// import someResource from 'codemirror/some-resource'
import 'codemirror/mode/python/python.js'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/neo.css'
import 'codemirror/keymap/emacs.js'

// const Sk = window.Sk
export default {
  name: 'PythonEditor',
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
        mode: 'python',
        theme: "neo",
        keyMap: "emacs",
        spellcheck:true,
        autocorrect:true
      },

      // editableTabsValue: '2',
      //   editableTabs: [{
      //     title: 'Tab 1',
      //     name: '1',
      //     content: "aaa"
      //   }, {
      //     title: 'Tab 2',
      //     name: '2',
      //     content: "aaa"
      //   }],
      //   tabIndex: 2
      
    }
  },
  methods: {
    runIt () {
      Sk.configure({
        output: (text) => {
          this.error = text
        },
        read: (x) => {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined) {
            throw new Error('File not found: \'' + x + '\'')
          }
          return Sk.builtinFiles['files'][x]
        },
        python3: true
      });
      (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = document.getElementById('myCanvas')
      Sk.misceval.asyncToPromise(() => {
        return Sk.importMainWithBody('<stdin>', false, this.codes, true)
      }).then(() => {
        console.log('success');
        this.loaded = true
      }, () => {
        this.loaded = true
      })
      console.log(this.codes)
    },
    // test () {
    //   // 向父vue页面发送信息
    //   window.parent.postMessage({
    //     data: {
    //       code: 'success',
    //       test: '我是子页面的test！'
    //     }
    //   }, '*')
    // },
    save () {
      this.date = new Date().getTime()
      let data = {username: this.username, filename: this.form.name, file: this.codes, date: this.date}
      axios.post(process.env.API_HOST+`/file/uploadfile/:id`, data)
        .then(res => {
          console.log('res=>', res)
          this.dialogFormVisible = false
        }).catch(err => this.$notify({
          type: 'error',
          message: err
        }))
    },
    handleMessage (event) {
      this.username = event.data.username
      const cmd = event.data.cmd
      this.file = event.data.file
      if (cmd === 'success') {
        console.log(this.file)
        this.codes = this.file
      }
    },
    onCmCodeChange(newCode) {
      // console.log('this is new code', newCode)
      this.codes = newCode
    }
    // gutter(cm, n){
    //   var info = cm.lineInfo(n);
    //   cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
    // }
  },
  mounted () {
    window.addEventListener('message', this.handleMessage)
    // this.iframeWin = this.$refs.iframe.contentWindow
  },
  handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: "aaa"
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
}

</script>

<style scoped>
.editor-wrap{
  background: white;
}
.sk-view{
  height: 100%;
  overflow:hidden;
}

  .result-row{
    height: 50%;
    padding: 10px;
    background: white;
    margin-top: 5px;
    /* height: 50; */
    overflow :auto;
  } 
  .result-el-tabs{
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #17355F;
  }
</style>
