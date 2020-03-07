<template>
  <el-container :class="body">
    <el-header :class="header" height="4.375rem"><Header/></el-header>
    <el-container class="main-parts">
      <el-main class="main">
        <PythonEditor :Date='vueDate' @darkModel='getData'/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import PythonEditor from './components/PythonEditor'
import Header from './components/Header'

export default {
  name: 'Python',
  components: {
    // PythonTutorial,
    PythonEditor,
    Header,
    // Footer
  },
  data () {
    return {
      header:'header',
      body:'body',
      username: '',
      python: '',
      vueDate: [],
    }
  },
  methods: {
    getData(dark){
        // console.log()
        if(dark){
          this.header='header header-dark'
          this.body='body background-dark'
          console.log()
        }else{
          console.log()
          this.header='header'
          this.body='body'
        }
      },
    move (e) {
      // console.log("move",event)
      let odiv = e.target // 获取目标元素
      let disX = e.clientX - odiv.offsetLeft
      document.onmousemove = (e) => {
        let left = e.clientX - disX
        var percentage = e.clientX / e.view.innerWidth * 100
        this.asideWidth = percentage.toString() + '%'

        // 移动当前元素
        odiv.style.left = left + 'px'
        // odiv.style.top = top + 'px';
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    }
}
</script>

<style scoped>
@font-face {font-family: "Museo Sans Rounded 100"; 
    src:url("../../static/MuseoSansRounded/MuseoSansRounded-100.otf");}
@font-face {font-family: "Museo Sans Rounded 300"; 
  src:url("../../static/MuseoSansRounded/MuseoSansRounded-300.otf");}
@font-face {font-family: "Museo Sans Rounded 500"; 
  src:url("../../static/MuseoSansRounded/MuseoSansRounded-500.otf");}
@font-face {font-family: "Museo Sans Rounded 700"; 
  src:url("../../static/MuseoSansRounded/MuseoSansRounded-700.otf");}
@font-face {font-family: "Museo Sans Rounded 900"; 
  src:url("../../static/MuseoSansRounded/MuseoSansRounded-900.otf");}
@font-face {font-family: "Museo Sans Rounded 1000"; 
  src:url("../../static/MuseoSansRounded/MuseoSansRounded-1000.otf");}
body{
  margin: 0;
}
.body{
  background: #dcecf5;
  height:100%;
  padding:0;
  font-family: 'Museo Sans Rounded 500';
}
.footer{
  padding: 0;
  background:#1EAFF9;
  display: flex;
  align-content: center;
}
.header{
  background: #1eaff9;
  padding: 0;
  font-family: 'Museo Sans Rounded';
  font-weight: 700;
}
.main{
  /* margin: 30px 25px 0 15px; */
  /* background: white; */
  padding: 0;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: transparent;
  overflow:hidden;
  float: right;
}
.main-parts{
  height: 100%;
  overflow :auto;
}
.background-dark{
  background: #172235;
}
.header-dark{
  background: #0F1827;
}

</style>
