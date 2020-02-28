import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import ElementUI from 'element-ui' // element-ui的全部组件
// import 'element-ui/lib/theme-chalk/index.css'// element-ui的css
import '../static/css/element-#1EAFF7/index.css'

import axios from 'axios'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

Vue.use(VueCodemirror)
//   ,{events:[
//   this.codemirror.on("gutterClick", hanger)
// ]})
// let base = process.env.NODE_ENV === 'production' ?'http://192.168.1.252:8080':'http://localhost:8080';
// Vue.prototype.baseURL = base;

Vue.use(ElementUI) // 使用elementUI

Vue.prototype.$axios = axios
Vue.use(axios)

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
