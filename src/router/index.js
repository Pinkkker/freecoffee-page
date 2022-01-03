import Vue from 'vue'
import VueRouter from 'vue-router'
import Signin from '../views/Signin'
import Signup from '../views/Signup'
import Home from '../views/Home'
import AddPost from '../views/AddPost'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AddPost',
    component: AddPost
  },
  {
    //登录页面
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    //注册页面
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    //主页
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
