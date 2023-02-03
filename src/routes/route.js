// Routes imports and initialization

import VueRouter from 'vue-router'

import Home from '../components/home'
import ChatView from '../components/chatView'


const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "ChatView",
    path: "/chatView",
    component: ChatView,
  },
]

//  Routes initialization
const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router