<template>
  <el-main>
    <div class="card" v-for="v in dataList" :key="v.id">
      <div class="title">标题:{{ v.title }}</div>
      <div class="content">内容:{{ v.contents }}</div>
      <div class="description">评论:{{v.commentNumber}}，like:{{v.starred}}</div>
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
      pageSize: "100",
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

      });
  },
};
</script>

<style scoped>
 .el-main {
    background-color: #E9EEF3;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    line-height: 80px;
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
.card .title {
  background-color: #8EA0FD
;
}

.card .content {
  background-color: #8BADFE;
}

.card .description {
  background-color: #9FB6F7;
}
</style>