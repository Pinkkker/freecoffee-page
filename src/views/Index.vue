<template>
  <el-container>
    <!-- 导航栏 -->
    <el-header>
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#C72E2E"
        text-color="#F7E2E2"
        active-text-color="#FFFFFF"
        router
        style="width: 100%; display: flex; justify-content: center"
      >
        <el-menu-item v-for="(item, i) in items" :key="i" :index="item.path">
          <template>
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
        </el-menu-item>

        <el-menu-item>
          <el-input
            v-model="keyword"
            placeholder="请输入"
            suffix-icon="el-icon-search"
          ></el-input>
        </el-menu-item>

        <el-menu-item>
          <el-button type="primary" @click="searchPost(keyword)" >出发</el-button>
        </el-menu-item>

        <el-submenu index="4">\
          <template slot="title">
            <el-avatar
              shape="square"
              size="large"
              src="https://imgsa.baidu.com/forum/w%3D580/sign=19e794822834349b74066e8df9eb1521/80f2481ed21b0ef4271fedc6ddc451da80cb3e66.jpg"
            ></el-avatar>
            <span style="padding-left: 10px">{{ username }}</span>
          </template>

          <el-menu-item :index="'/user/' + id">
            <i class="el-icon-s-custom"></i>我的主页
          </el-menu-item>

          <el-menu-item index="1-2">
            <i class="el-icon-switch-button"></i>退出
          </el-menu-item>

        </el-submenu>
      </el-menu>
    </el-header>

    <!-- 显示主体 -->
    <el-main>
      <transition name="fade">
        <router-view />
      </transition>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Index",
  beforeRouteEnter(to, from, next) {
    axios
      .get("/api/v1/me")
      .then((response) => {
        if (response.data.code === "200") {
          next((vm) => {
            vm.username = response.data.data.nickname;
            vm.id = response.data.data.id;
          });
        } else {
          next("/login");
        }
      })
      .catch(() => next("/login"));
  },
  data() {
    return {
      keyword: "",
      id: "",
      username: "",
      activeIndex: "1",
      activeIndex2: "1",
      items: [
        {
          path: "/home",
          title: "主页",
          icon: "iconfont icon-31shouyexuanzhong",
        },
        { path: "/hot", title: "热榜", icon: "iconfont icon-remen" },
        { path: "/posting", title: "发帖", icon: "iconfont icon-icon_fabu" },
      ],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    searchPost(keyword) {
      this.$router.push({ name: "SearchPost", params: {keyWord: keyword}});
    },
  },

};
</script>

<style scoped>
.el-container {
  /* display: flex;
  justify-content: center; */
}
.el-header {
  /* background-color: #b3c0d1; */
  background-color: #C72E2E;
  color: #333;
}

.el-button--primary:hover,
.el-button--primary:focus {
  background-color: #a92727;
  border-color: #a92727;
  color: #fff;
}

.el-button--primary {
  background-color: #a92727;
  border-color: #a92727;
  color: #fff;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
  /* height: 100%; */
  /* text-align: center; */
  /* line-height: 160px; */
}
</style>