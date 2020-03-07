<template>
  <div class="sk-view">
    <el-row class="editor-wrap">
          <el-col  class="asaid-row" :span="span.tut">
            <div :class="asaidWrap">
                <div :class="tutorialHeader">
                  <div :class="instructionWrap"><img src='../../../static/img/Instruction.png' /></div>
                  <el-button :class="array" @click="fold"></el-button>
                </div>
                <div class="asaid">
                  <PythonTutorial
                    v-bind:folded="folded"
                    v-bind:dark="dark"
                  />
                </div>
            </div>
            
          </el-col>
          <el-col :span="span.edi" class="editor-col">
            <form class="editor-form">
              <div class="theme-bt-wrap">
                  <el-button :class="theme"  
                  @click='changeTheme'></el-button>
                </div>
              <el-tabs type="border-card" :class="dark? 'tab-wrap inner-dark':'tab-wrap'">
                
                <el-tab-pane
                  label="main.py"
                  class="tab-pane"
                >
                  <codemirror 
                  @ready="onCmReady"
                    class="code-editor"
                    ref="myCm"
                    id="yourCode"
                    v-model="codes"
                    :options="cmOption"
                    @input="onCmCodeChange"
                ></codemirror>
                </el-tab-pane>
              </el-tabs>

            </form>
            <!-- ===================== dialog ===================== -->
            <div>
              <el-dialog class="dialog-wrap" title="Input your project name" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item class='dialog-body'>
                    <!-- label="project name" :label-width="formLabelWidth" -->
                     <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
                    <el-input placeholder="Project name" class='project-input' v-if="operate === 'save'" v-model="form.name" autocomplete="off"></el-input>
                    <el-input placeholder="Project name" class='project-input' v-if="operate === 'updata'" :disabled="true" v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button class="cancel-bt" @click="dialogFormVisible = false">Cancel</el-button>
                  <el-button class='confirm-bt' @click="save">Save</el-button>
                </div>
              </el-dialog>
            </div>
          </el-col>
          <!-- ===================== /dialog ===================== -->
          <el-col :span="7" class="result-col">
            <el-row class="button-row-wrap" height="100%">
                <el-col height="100%">
                    <el-row class="button-row" height="100%">
                        <div class="row-wrap">
                          <el-button class="refresh-bt" ></el-button>
                          <el-button class="run-code-bt" @click="runIt" >Run Code</el-button>
                          <el-button class="submit-answer-bt" @click="dialogFormVisible = true" >Submit Answer</el-button>
                        </div>
                  </el-row>
                </el-col>
            </el-row>
            <el-row class="output-row">
                <div class="output-wrap">
                  <div :class="dark? 'output-head head-dark':'output-head'">
                    <img class="output" src="../../../static/img/Output@2x.png">
                  </div>
                  <div class="output-result">
                  </div>
                </div>
            </el-row>
            <el-row class="panel-row">
              <el-tabs id="result-panel-tabs" type="card" @tab-click="change" :class="dark? 'result-el-tabs inner-dark':'result-el-tabs'">
                  <el-tab-pane id="Panel" :class="dark? 'console-el-tab-pane inner-dark':'console-el-tab-pane'" label="Panel">
                    <div class="result-wrap">
                      <el-input
                      :class="dark? 'panel-input inner-dark':'panel-input'"
                      type="textarea"
                      placeholder="result"
                      v-model="outPrint">
                    </el-input></div>
                  </el-tab-pane>
                  <el-tab-pane id="Shell" class="console-el-tab-pane" label="Shell">
                    <div class="result-wrap" style="overflow: auto" >
                      <div class='canvas' id="myCanvas"></div>
                      </div>
                  </el-tab-pane>
              </el-tabs>
            </el-row>
            </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import Sk from '@hwc/skulpt'

import PythonTutorial from './PythonTutorial'

import 'codemirror/mode/python/python.js'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/neo.css'
import 'codemirror/keymap/emacs.js'

export default {
  name: 'PythonEditor',
  components: {
    PythonTutorial,
  },
  data () {
    return {
      span:{tut:6,edi:11},
      tutorialHeader:'tutorial-header-wrap',
      folded: false,
      dark:false,
      asaidWrap:'asaid-wrap',
      array: 'fold-icon-button',
      asideWidth: '26%',
      instructionWrap:"instruction-wrap",
      theme:'theme-bt-normal',
      codes: '',
      outPrint: '',
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '120px',
      username: '',
      state: '',
      filename: '',
      operate: 'save',//need to change to ""
      date: 0,
      cmOption: {
        tabSize: 4,
        viewportMargin:20,
        styleActiveLine: true,
        lineNumbers: true,
        mode: 'python',
        theme: 'neo',
        keyMap: 'emacs',
        spellcheck: true,
        autocorrect: true
      }
    }
  },
  methods: {
    change(tab){
      // console.log(tab)
      if(this.dark){
        const clickedID = 'tab-'+tab.index
        let tabs = document.getElementById('result-panel-tabs').getElementsByClassName('el-tabs__item is-top')
        tabs.forEach(ts => {
          if (ts.id ===clickedID ){
            ts.style.backgroundColor = '#4b6585';
          }else{
            ts.style.backgroundColor = '#3e5164'}
        });
      }
    },
    changeTheme (){
      let tab3 = document.getElementsByClassName('el-tabs__header is-top')
      let navTab = document.getElementsByClassName('el-tabs__nav')
      let activeTab = document.getElementsByClassName('el-tabs__item is-top')
      let textArea = document.getElementsByClassName('el-textarea__inner')
      let outCardTabHead = document.getElementsByClassName('el-tabs el-tabs--card el-tabs--top result-el-tabs')
      let outTabHead = outCardTabHead[0].getElementsByClassName('el-tabs__header is-top')
      if(this.dark){
        this.theme = "theme-bt-normal";
        this.dark = false;
        this.tutorialHeader="tutorial-header-wrap"
        this.cmOption.theme='neo'
        this.$emit('darkModel',this.dark)
        // let tab3 = document.getElementsByClassName('el-tabs__header is-top')
        tab3.forEach(t => {
          t.style.backgroundColor = "";
        });
        navTab.forEach(n =>{
          n.style.backgroundColor="";
        })
        activeTab.forEach(a =>{
          a.style.backgroundColor="";
          a.style.color="";
        })
        textArea.forEach(t =>{
          t.style.backgroundColor="";
        })
        //#4a6585
      }else{
        this.theme = "theme-bt-dark";
        this.dark = true;
        this.tutorialHeader="tutorial-header-wrap head-dark"
        this.cmOption.theme='monokai'
        this.$emit('darkModel',this.dark)
        tab3.forEach(t => {
          t.style.backgroundColor = '#3e5165'
        });
        outTabHead.forEach(t => {
          t.style.backgroundColor = '#162136'
        });
        navTab.forEach(n =>{
          n.style.backgroundColor="#3e5165";
          n.style.color="white";
        })
        activeTab.forEach(a =>{
          a.style.color="white";
          if (a.classList.length>2){
            a.style.backgroundColor = '#4b6585'
          }
        })
        textArea.forEach(t =>{
          t.style.backgroundColor="#293C53";
        })
      }
    },
    fold () {
      // console.log("clicked")
      if (!this.folded) {
        this.asideWidth = '50px'
        this.span={tut:1,edi:16}
        this.asaid = 'folded'
        this.folded = true
        this.instructionWrap='instruction-wrap folded'
        this.array = 'fold-icon-button-closed'
        this.asaidWrap='asaid-wrap asaid-wrap-width'
      } else {
        this.folded = false
        this.asideWidth = '26%'
        this.asaid = 'tutorial'
        this.span={tut:6,edi:11}
        this.array = 'fold-icon-button'
        this.instructionWrap='instruction-wrap'
        this.asaidWrap='asaid-wrap'
      }
    },
    onCmReady(cm) {
      const height = document.body.clientHeight
      const editorHeight = (height/100)*100-155
      cm.setSize("100%",editorHeight)
    },
    runIt () {
      this.outPrint = ''
      Sk.configure({
        output: (text) => { this.outPrint += text },
        read: (x) => {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined) {
            throw new Error('File not found: \'' + x + '\'')
          }
          return Sk.builtinFiles['files'][x]
        },
        '__future__': Sk.python3
      });

      (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = document.getElementById('myCanvas')

      Sk.misceval.asyncToPromise(() => {
        return Sk.importMainWithBody('<stdin>', false, this.codes, true)
      }).then(() => {
        this.loaded = true
      }, () => {
        this.loaded = true
      })
      console.log(this.codes)
    },

    save () {
      this.date = new Date().getTime()
      let data = {username: this.username, filename: this.form.name, file: this.codes, date: this.date}
      if (this.state === 'Y') {
        axios.put(process.env.API_HOST + `/python/updateFile/:id`, data)
          .then(res => {
            console.log('res=>', res)
            this.dialogFormVisible = false
          }).catch(err => this.$notify({
            type: 'error',
            message: err
          }))
      } else {
        axios.post(process.env.API_HOST + `/python/uploadFile/:id`, data)
          .then(res => {
            console.log('res=>', res)
            this.dialogFormVisible = false
          }).catch(err => this.$notify({
            type: 'error',
            message: err
          }))
      }
      this.dialogFormVisible = false
    },
    onCmCodeChange (newCode) {
      
      this.codes = newCode
    },
    handleMessage (event) {
      const cmd = event.data.cmd
      if (cmd === 'success') {
        this.codes = event.data.file
        this.username = event.data.username
        this.state = event.data.state
        this.filename = event.data.filename
        console.log('filename', this.filename)
        if (this.filename !== undefined) {
          this.operate = 'updata'
          this.form.name = this.filename
        } else {
          this.operate = 'save'
        }
        console.log('data', event.data)
      }
    }
  },
  mounted () {
    window.addEventListener('message', this.handleMessage)
  },
  
}

</script>

<style scoped>
.editor-wrap{
  background: transparent;
  height: 100%;
  overflow :hidden;
}
.code-editor{
  overflow: hidden;
  width: 100%;
}
.tab-pane,.el-tabs__content{
  width: 100%;
}
.editor-form{
  height: 100%;
  position: relative;
}
.editor-col{
  height: 100%;
}
.sk-view{
  height: 100%;
  overflow:hidden;
}

  .result-row{
    height: 50%;
    background: white;
    margin-top: 5px;
    /* height: 50; */
    overflow :auto;
  }
  .button-row{
    margin: 30px 25px 15px 0;
    width: 100%;
  }
 
  .refresh-bt{
    background:url("../../../static/img/refresh.png");
    height: 36px;
    width: 36px;
    border: none;
    background-size:contain;
    background-repeat:no-repeat;
    margin: 0 30px 0 0;
  }
  .el-button+.el-button{
    margin-left: 0;
  }
  .run-code-bt{
    background-color: #7ac701;
    color:white;
    height: 36px;
    margin-right: 30px;
    border:none;
    border-radius: 5px;
  }
  .run-code-bt:hover{
    background-color: #86db01;
    color:white;
  }
  .submit-answer-bt{
    color:#1facef;
    height: 36px;
    margin: 0;
    border-radius: 5px;
  }
  .result-el-tabs{
    border-radius:5px;
    margin: 30px 0 0 0;
    height: 85%;
    background: white;
  }
  .tab-wrap{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    height: 100%;
    margin: 30px 15px 0 15px;
  }
  .output-row{
    height: 40%;
    margin:0 25px 0 15px;
  }
  .button-row-wrap{
    margin:0 25px 0 15px;
  }
  .output-wrap{
    height: 100%;
    background:white;
    border-radius: 5px;
    margin: 15px 0 15px 0;
  }
  .output{
    margin-left: 25px;
    height: 67.5%;
  }
  .output-head{
    background:#80d2f9;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .output-result{
    background:white;
    max-height: 420px;
    border-radius: 5px;
  }
  .result-col{
    height: calc(100% - 25px);
    float: right;
  }
  .panel-row {
    margin:15px 25px 0 15px;
    height: 40%;
    border-radius:5px;
  }
.el-textarea__inner{
  background: rosybrown;
  border: none;
  height: 100%;
  }
  .panel-input,.console-el-tab-pane{
    height:100%;
    background:white;
  }
.result-wrap{
  height:100%;
}
.theme-bt-normal{
    position: absolute;
    z-index: 999;
    right:0;
    top:0;
    margin-right: 15px;
    background:url("../../../static/img/dark-model.png");
    background-size:contain;
    background-position: center;
    background-repeat:no-repeat;
    background-color: transparent;
    border:none;
    height:40px;
}
.theme-bt-normal:hover{
  background-color: transparent;
}
.theme-bt-normal:focus{
  background-color: transparent;
}
.theme-bt-dark:focus{
  background-color: transparent;
}
.theme-bt-dark:hover{
  background-color: transparent;
}
.theme-bt-dark{
  /* height: 100%; */
  height:40px;
  position: absolute;
  z-index: 999;
  right:0;
  top:0;
  margin-right: 15px;
  background:url("../../../static/img/light-model.png");
  background-size:contain;
  background-position: center;
  background-repeat:no-repeat;
  background-color: transparent;
  border:none;
}

.asaid-wrap{
  background: white;
  margin: 30px 15px 0 0;
  /* margin: 5px 0 5px 5px; */
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
.asaid-wrap-width{
  width: 50px;
  margin: 30px 0 0 0;
  border-radius: 5px;
}
.tutorial-header-wrap{
  height: 40px;
  display: flex;
  align-items: center;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  justify-content: space-between;
  background: #81d2f9;
}
.instruction-wrap{
  margin-left: 10%;
  display: flex;
  align-items: center;
}
.fold-icon-button-closed{
  background: url("../../../static/img/open-array.png");
  background-color: transparent;
  background-size:contain;
  background-position: center;
  background-repeat:no-repeat;
  background-color: transparent;
  border:none;
  border-style: none;
  height: 15px;
  margin-right: 20px;
}
.fold-icon-button-closed:hover{
  background-color:transparent;
}
.fold-icon-button-closed:focus{
  background-color:transparent;
}
.fold-icon-button{
  background: url("../../../static/img/array.png");
  background-color: transparent;
  background-size:contain;
  background-position: center;
  background-repeat:no-repeat;
  background-color: transparent;
  border:none;
  border-style: none;
  height: 15px;
  margin-right: 20px;
}
.fold-icon-button:hover{
  background-color:transparent;
}
.fold-icon-button:focus{
  background-color:transparent;
}
.asaid{
  display:flex;
  height: 100%;
}
.folded{
  visibility: hidden;
  width: 0;
}
.inner-dark{
  background:#293C53;
}
.head-dark{
  background: #4A6583;
  height: 40px;
}
.cancel-bt,.confirm-bt{
  margin-right: 20px;
  border-radius: 20px;
  padding: 6px 0 6px 0;
  width: 25%;
  font-size: 1.25rem;
}
.cancel-bt{
  border-width:2px;
  color:#d9d6da;
  border-color:#d9d6da;
  box-shadow: 0 2px 0 0 #D7D4D7
}
.cancel-bt:hover,.cancel-bt:focus{
  border-width:2px;
  color:#9c9c9c;
  border-color:#cfcfcf;
  background: #e5e5e5;
  
}
.confirm-bt{
  color:white;
  border-width:2px;
  background:#79c704;
  border-color:#79c704;
  box-shadow: 0 4px 0 0 #57a600
}
.confirm-bt:hover,.confirm-bt:focus{
  background:#86dc00;
  border-width:2px;
  border-color:#86dc00;
  color:white;
}
.project-input{
  width: 80%;
  /* border-style: solid;
  border-color:#d9d6da;
  border-width: 2px; */
  /* border-radius: 5px; */
}
.dialog-body{
  margin: 0 auto;
  text-align: center;
}

.canvas{
  display: block;
  height: calc(100%+30px);
}
/* .tab-head-dark{
  background: #4A6583;
  padding: 0;
  position: relative;
  margin: 0 0 15px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
} */

</style>
