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
            <!-- 用户头部分 -->
            <div class="user-title">
              <!-- 左边用户名字 -->
              <span v-if="v.user">{{ v.user.nickname }}</span>
              <span class="spanbox5">发布:</span>
            </div>

            <!-- 帖子标题 -->
            <div class="post-title" @click="toPost(v.id)">
              <h1>{{ v.title }}</h1>
            </div>

            <!--技术栈部分 -->
            <div class="user-tech">
              <span
                class="tech-box5"
                v-for="(value, key) in v.techMap"
                :key="key"
              >
                <el-tag :type="items[value % 3]" effect="dark">{{
                  key
                }}</el-tag>
              </span>
            </div>

            <!-- 描述部分 -->
            <div class="post-description">
              <div>
                <i class="iconfont icon-talk"></i>
                <span class="spanbox5">{{ v.commentNumber }}</span>
              </div>

              <div
                class="icon-box"
                :class="v.isStar ? 'icon-box' : ''"
                @click="onlike(v)"
              >
                <i v-if="v.isStar" class="iconfont icon-red-like"></i>
                <i v-else class="iconfont icon-like"></i>
                <span class="spanbox5">like</span>
                <span class="spanbox5">{{ v.starred }}</span>
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
        if (response.data.code == 200) {
          this.id = response.data.data.id;
        } else {
          this.$message.error(response.data.msg);
          this.$router.push('/signin');
        }
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
          if (response.data.code == 200) {
            this.dataList = response.data.data;
            this.totalNum = response.data.totalNum;
            this.totalPage = response.data.totalPage;
          } else {
            this.$message.error(response.data.msg);
            this.$router.push('/signin');
          }
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
  font-size: 20px;
  line-height: 3rem;
  display: flex;
  flex-direction: row;
}

.card .post-title {
  background-color: #f5f5f5;
  color: #222;
  font-family: SimHei;
}

.card .user-tech {
  display: flex;
  justify-content: flex-start;
  line-height: 3rem;
}

.card .post-content {
  display: flex;

  line-height: 4rem;
}

.card .post-description {
  display: flex;
  justify-content: space-between;
  line-height: 4rem;
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

.tech-box5 {
  margin-right: 1rem;
}
.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 5rem;
}

.topCard {
  background-image: url(../assets/image/topCard.png);
  margin-left: 1.5rem;
  margin-top: 2rem;
  width: 19.5rem;
  height: 65rem;
  background-color: #fff;
  border: 1px solid var(--newCommunityTheme-postLine);
  border-radius: 4px;
  box-sizing: border-box;
}
</style>