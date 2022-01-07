<template>
  <div class="container">
    <div class="main">
      <div class="">
        <!-- 帖子card -->
        <div class="card" v-for="v in dataList" :key="v.id">
          <!-- 左边用户头像部分 -->
          <div class="user-avatar">
            <el-avatar :size="60" :src="v.user.avatar"></el-avatar>
          </div>

          <!-- 右边主体部分 -->
          <div class="card-body">
            <div class="user-title">
              <span v-if="v.user">{{ v.user.nickname }}</span>
              <span class="spanbox5">发布:</span>
            </div>

            <div class="post-title"  @click="toPost(v.id)">
              {{ v.title }}
            </div>

            <!-- <div class="post-content">{{ v.contents }}</div> -->
            <div class="user-tech">
              <span v-for="(value, key) in v.techMap" :key="key">
                <el-tag :type="items[value % 3]" effect="dark">{{
                  key
                }}</el-tag>
              </span>
            </div>

            <div class="post-description">
              <i class="iconfont icon-talk"></i>
              <span>{{ v.commentNumber }}</span>

              <div
                class="icon-box"
                :class="v.isStar ? 'icon-box' : ''"
                @click="onlike(v)"
              >
                <i v-if="v.isStar" class="iconfont icon-red-like"></i>
                <i v-else class="iconfont icon-like"></i>
                <span>like</span>
                <span>{{ v.starred }}</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="topCard"></div>
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
</template>

<script>
// const axios = require("axios").default;
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      id: "",
      dataList: [],
      totalNum: "",
      toalPage: "",
      pageNum: "1",
      pageSize: "5",
      items: ["", "success", "warning"],
    };
  },
  created() {
    this.getMe();
    this.getDateList();
  },
  methods: {
    getMe() {
      axios.get("/api/v1/me").then((response) => {
        this.id = response.data.data.id;
      });
    },
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
    onlike(post) {
      if (post.isStar) {
        axios
          .delete("/api/v1/star/" + parseInt(post.id), {
            data: parseInt(this.id),
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            if (response.data.code === "200") {
              this.$message({
                message: "取消点赞成功!",
                type: "success",
              });
              post.isStar = !post.isStar;
              post.starred--;
            } else {
              this.$message.error("取消点赞失败!");
            }
          });
      } else {
        axios
          .post("/api/v1/star/" + parseInt(post.id), parseInt(this.id), {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            if (response.data.code === "200") {
              this.$message({
                message: "点赞成功!",
                type: "success",
              });
              post.isStar = !post.isStar;
              post.starred++;
            } else {
              this.$message.error("点赞失败!");
            }
          });
      }
    },
    handleSizeChange(val) {
      (this.pageSize = val), this.getDateList();
    },
    handleCurrentChange(val) {
      (this.pageNum = val), this.getDateList();
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main {
  color: #333;
  width: 61rem;
  display: flex;
  justify-content: center;
}
.card {
  display: flex;
  flex-direction: row;
  width: 40rem;
  background-color: #fff;
  padding: 1.5rem;
  margin-top: 2rem;
  border: 1px solid var(--newCommunityTheme-postLine);
  border-radius: 4px;
  box-sizing: border-box;
}
.card .user-avatar {
  line-height: 4rem;
}
.card .card-body {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
}
.card .user-title {
  display: flex;
  line-height: 3rem;
}

.card .user-tech {
  line-height: 3rem;
}

.card .user-title {
  line-height: 3rem;
}

.card .post-content {
  line-height: 4rem;
}

.card .post-description {
  display: flex;
  line-height: 2rem;
}

.card {
  cursor: pointer;
}

.spanbox10 {
  margin-left: 1rem;
}

.spanbox5 {
  margin-left: 0.313rem;
}
.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 5rem;
}

.topCard {
  margin-left: 1.5rem;
  margin-top: 2rem;
  width: 19.5rem;
  height: 40rem;
  background-color: #fff;
  border: 1px solid var(--newCommunityTheme-postLine);
  border-radius: 4px;
  box-sizing: border-box;
}
</style>