import Vue from 'vue'
import App from './App.vue'
import router from './routes/route'
import VueRouter from 'vue-router'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)

Vue.use(VueRouter)
Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
