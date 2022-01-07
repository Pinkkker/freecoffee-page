<template>
  <div class="main">
    <div class="">
      <div class="card" v-for="v in dataList" :key="v.id">
        <div class="header">
          <el-avatar :size="60" :src="v.user.avatar"></el-avatar>
          <span class="spanbox10"></span>
          <span v-if="v.user">{{ v.user.nickname }}</span>

          <span class="spanbox10" v-for="(value, key) in v.techMap" :key="key">
            <el-tag :type="items[value % 3]" effect="dark">{{ key }}</el-tag>
          </span>
        </div>

        <div class="line"></div>
        <div class="title" @click="toPost(v.id)">
          {{ v.title }}
        </div>

        <div class="content">{{ v.contents }}</div>

        <div class="description">
          <i class="iconfont icon-talk"></i>
          <span class="spanbox5">talk</span>
          <span class="spanbox5">{{ v.commentNumber }}</span>

          <span class="spanbox10"></span>
          <div class="icon-box" :class="isUp ? 'icon-box' : ''" @click="onlike">
            <i v-if="isUp" class="iconfont icon-red-like"></i>
            <i v-else class="iconfont icon-like"></i>
          </div>
          <span class="spanbox5">like</span>
          <span class="spanbox5">{{ v.starred }}</span>
        </div>
      </div>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="parseInt(pageNum)"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="parseInt(totalNum)"
        >
        </el-pagination>
      </div>
    </div>

    <div class="topCard"></div>
  </div>
</template>

<script>
// const axios = require("axios").default;
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      dataList: [],
      totalNum: "",
      toalPage: "",
      pageNum: "1",
      pageSize: "5",
      isUp: false,
      items: ["", "success", "warning"],
    };
  },
  created() {
    this.getDateList();
  },
  methods: {
    getDateList() {
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
          this.totalPage = response.data.totalPage;
        });
    },
    toPost(id) {
      this.$router.push({ name: "Post", params: { id: id } });
    },
    onlike() {
      this.isUp = !this.isUp;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      (this.pageSize = val), this.getDateList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      (this.pageNum = val), this.getDateList();
    },
  },
};
</script>

<style scoped>
.main {
  color: #333;
  /* background-color: #e9eef3; */
  padding-top: 3rem;
  /* width: 61rem; */
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.card {
  width: 40rem;
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 2rem;
  border: 1px solid var(--newCommunityTheme-postLine);
  border-radius: 4px;
  box-sizing: border-box;
}
.card .header {
  /* display: flex; */
  line-height: 4rem;
}
.card .title {
  /* display: flex; */
  line-height: 3rem;
  padding-left: 4rem;
}

.card .content {
  /* display: flex; */
  line-height: 4rem;
  padding-left: 4rem;
}

.card .description {
  /* display: flex; */
  line-height: 2rem;
  padding-left: 4rem;
  font-size: px;
}

.header,
.title,
.content,
.description {
  cursor: pointer;
}

.spanbox10 {
  margin-left: 1rem;
}

.spanbox5 {
  margin-left: 0.313rem;
}
.block {
  height: 3rem;
}


.topCard{
  width: 19.5rem;
  background-color: aquamarine;
}
</style>