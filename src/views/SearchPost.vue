<template>
  <el-main>
    <div class="card" v-for="v in dataList" :key="v.id">
      <div class="header">
        <el-avatar :size="60" :src="v.user.avatar"
        ></el-avatar>
        <span style="padding-left: 10px"></span>
        <span v-if="v.user">{{ v.user.nickname }}</span>

        <span
            style="padding-left: 10px"
            v-for="(value, key) in v.techMap"
            :key="key"
        >
          <el-tag :type="items[value%3]" effect="dark">{{ key }}</el-tag>
        </span>
      </div>

      <div class="line"></div>
      <div class="title" @click="toPost(v.id)">
        {{ v.title }}
      </div>

      <div class="content">{{ v.contents }}</div>

      <div class="description">
        <i class="iconfont icon-pinglun1"></i>讨论
        {{ v.commentNumber }}
        <span style="padding-left: 10px"></span>
        <i class="iconfont icon-smiling"></i>like
        {{ v.starred }}
      </div>
    </div>
  </el-main>
</template>

<script>
// const axios = require("axios").default;
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      keyword: "",
      dataList: [],
      totalNum: "",
      toalPage: "",
      items: ["", "success", "warning"],
    };
  },
  mounted() {
    this.keyword = this.$route.params.keyWord;
    axios.get("/api/v1/search/", {
          params: {
            keyWord: this.keyword,
          },
        })
        .then((response) => {
          this.dataList = response.data.data;
        });
  },
  methods: {
    toPost(id) {
      this.$router.push({ name: "Post", params: { id: id } });
    },
  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 35px;
}
.card {
  width: 1000px;
  background-color: #fff;
  padding: 24px;
  margin-bottom: 24px;

  border: 1px solid var(--newCommunityTheme-postLine);
  border-radius: 4px;
  box-sizing: border-box;
}
.card .header {
  display: flex;
  line-height: 50px;
}
.card .title {
  display: flex;
  line-height: 30px;
  padding-left: 50px;
}

.card .content {
  display: flex;
  line-height: 50px;
  padding-left: 50px;
}

.card .description {
  display: flex;
  line-height: 30px;
  padding-left: 50px;
}
</style>