import Vue from 'vue'
import VueRouter from 'vue-router'
import Signin from '../views/Signin'
import Signup from '../views/Signup'
import Home from '../views/Home'
Vue.use(VueRouter)

const routes = [
  {
    //登录页面
    path: '/signin',
    name: 'Signin',
    component: Signin
  }, {
    //注册页面
    path: '/signup',
    name: 'Signup',
    component: Signup
  }, {
    //主页
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    //个人资料页
    path: '/user/:userId',
    name: 'User',
    component: () => import("../views/User")
  }, {
    path: '*',
    redirect: '/signin'  // 所有路径都重定向到`/signin`
}
]

const router = new VueRouter({
  routes
})

export default router
