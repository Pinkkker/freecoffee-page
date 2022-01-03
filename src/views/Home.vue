<template>
  <el-main>
    <div class="card" v-for="v in dataList" :key="v.id">
      <div class="title">{{ v.title }}</div>
      <div class="content">{{ v.contents }}</div>
      <div class="description"></div>
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
      dataList: [],
      pageNum: "1",
      pageSize: "5",
      totalNum: "",
      toalPage: "",
    };
  },
  mounted() {
    axios
      .get("/api/v1/posts/", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
      })
      .then((response) => {
        this.dataList = response.data.data;
        this.totalNum = response.data.totalNum;
        this.toalPage = response.data.totalPage;
        console.log(this.dataList);
        console.log(this.totalNum);
        console.log(this.toalPage);
      });
  },
};
</script>

<style scoped>
.card {
  width: 1000px;
  background-color: #fff;
  padding: 24px;
  margin-bottom: 24px;

  border: 1px solid var(--newCommunityTheme-postLine);
  border-radius: 4px;
  box-sizing: border-box;
}
.card .title {
  background-color: pink;
}

.card .content {
  background-color: yellowgreen;
}

.card .description {
  background-color: blueviolet;
}
</style>