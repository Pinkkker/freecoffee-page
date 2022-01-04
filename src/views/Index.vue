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
        style="width: 100vw; display:flex;justify-content: space-around;"
      >
        <el-menu-item v-for="(item, i) in items" :key="i" :index="item.path">
          <template>
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
        </el-menu-item>

        <el-menu-item>
          <el-input
            v-model="input"
            placeholder="请输入"
            suffix-icon="el-icon-search"
          ></el-input>
        </el-menu-item>

        <el-menu-item>
          <el-button type="primary">出发</el-button>
        </el-menu-item>

        <el-submenu index="4">
          <template slot="title">
            <el-avatar
              size="large"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <span style="padding-left: 10px">{{ username }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
              <i class="el-icon-s-custom"></i>
              <span slot="title"
                ><a href="#/user/123" target="_blank">我的主页</a></span
              >
            </el-menu-item>

            <el-menu-item index="1-2">
              <i class="el-icon-switch-button"></i>
              <span slot="title">退出</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-header>

    <el-main>
      <transition name="fade">
        <router-view @changeName="changeName" />
      </transition>
    </el-main>

  </el-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Index",
  beforeRouteEnter(to, from, next) {
    axios.get("/api/v1/me").then((response) =>
      next((re) => {
        re.username = response.data.data.nickName;
        re.id = response.data.data.id;
      })
    );
  },
  data() {
    return {
      input: "",
      id: "",
      username: "",
      activeIndex: "1",
      activeIndex2: "1",
      items: [
        { path: "/home", title: "主页", icon: "el-icon-s-custom" },
        { path: "/hot", title: "热榜", icon: "el-icon-magic-stick" },
        { path: "/posting", title: "发帖", icon: "el-icon-s-promotion" },
      ],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-container{
  /* display: flex;
  justify-content: center; */
}
.el-header {
  background-color: #b3c0d1;
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
  text-align: center;
  line-height: 160px;
}
</style>