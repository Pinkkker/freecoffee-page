<template>
  <el-container>
    <!-- 导航栏 -->
    <el-header>
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-header"
        mode="horizontal"
        @select="handleSelect"
        background-color="#fff"
        active-text-color="#999999"
        text-color="#999999"
        router
        style="width: 100%; display: flex; justify-content: center;"
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
            @keyup.enter.native="searchPost(keyword)"
            placeholder="请输入"
            suffix-icon="el-icon-search"
          ></el-input>
        </el-menu-item>

        <el-menu-item>
          <el-button type="primary" @click="searchPost(keyword)" >出发</el-button>
        </el-menu-item>

        <el-submenu index="4"
          >
          <template slot="title">
            <el-avatar
              shape="square"
              size="large"
              :src="avatar"
              @error="errorHandler"
            >
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
            <span style="padding-left: 10px">{{ username }}</span>
          </template>

          <el-menu-item :index="'/user/' + id">
            <i class="el-icon-s-custom"></i>我的主页
          </el-menu-item>

          <el-menu-item index="1-2" @click="logout">
            <i class="el-icon-switch-button"></i>退出
          </el-menu-item>
        </el-submenu>

      </el-menu>
    </el-header>

    <!-- 显示主体 -->
    <el-main>
      <transition>
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
            vm.avatar = response.data.data.avatar;
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
      avatar: "",
      activeIndex: "1",
      activeIndex2: "1",
      items: [
        {
          path: "/home",
          title: "主页",
          icon: "iconfont icon-31shouyexuanzhong",
        },
        // { path: "/hot", title: "热榜", icon: "iconfont icon-remen" },
        { path: "/posting", title: "发帖", icon: "iconfont icon-icon_fabu" },
      ],
    };
  },
  computed: {},
  methods: {
    errorHandler() {
      return {
        isImageExist: true,
      };
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      axios.post("/api/v1/logout/").then(response => {
        if (response.data.code === "200") {
          this.$router.push("/Signin")
        }else {
          console.log(response.data.msg);
        }
      })
    },
    searchPost(keyword) {
      console.log(this.$route.path);
      if (this.$route.path === "/searchPost") {
        this.$router.push({ name: "SearchPost1", params: {keyWord: keyword}});
      }else {
        this.$router.push({ name: "SearchPost", params: {keyWord: keyword}});
      }
    },
  },

};
</script>

<style scoped>
.el-container {
  display: flex;
  flex-direction: column;
}
.el-header {
  background-color: #fff;
  color: #999;
}
.el-button--primary:hover,
.el-button--primary:focus {
  background-color: #F5F5F5;
  border-color: #F5F5F5;
  color: #333;
}

.el-button--primary {
  background-color: #F5F5F5;
  border-color: #F5F5F5;
  color: #333;
}

.el-main{
  background-color: #F5F5F5;
  color: #333;
  padding: 0;
}
</style>