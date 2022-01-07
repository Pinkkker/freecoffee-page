import Vue from 'vue'
import VueRouter from 'vue-router'
import Signin from '../views/Signin'
import Signup from '../views/Signup'

import Index from '../views/Index'
import Home from '../views/Home'
import Hot from '../views/Hot'
import Posting from '../views/Posting'



Vue.use(VueRouter)

const routes = [
  {
    //登录页面
    path: '/signin',
    name: 'Signin',
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
    path: '/index',
    name: 'Index',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/hot',
        name: 'Hot',
        component: Hot
      },
      {
        path: '/posting',
        name: 'Posting',
        component: Posting
      },
      {
        path: '/post/:id',
        name: 'Post',
        component: () => import("../views/Post")
      },
      {
        //个人资料页
        path: '/user/:userId',
        name: 'User',
        component: () => import("../views/User")
      },
      {
        path: '/searchPost/',
        name: 'SearchPost',
        component: () => import("../views/SearchPost")
      },
      {
        path: '/searchPost1/',
        name: 'SearchPost1',
        component: () => import("../views/SearchPost1")
      },
    ]
  },
  {
    path: '*',
    redirect: '/signin'  // 所有路径都重定向到`/signin`
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import("../views/Test")
  }
]

const router = new VueRouter({
  routes
})

export default router
