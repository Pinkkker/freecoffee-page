<template>
  <el-container>
    <el-main>
      <div class="all">
        <div class="" v-for="v in postcontent" :key="v.id">
        <el-row>
          <el-col :span="24"><div class="postcontent">
            <div class="temp">
              {{v.contents}}
            </div>
          </div></el-col>
        </el-row>
        <el-col :span="5"><div class="postdata">
          发布于{{v.time}}
        </div></el-col>
      </div>
        <el-row>
        <div class="cocommen">
          <el-col :span="10"><div class="createcommen">
            <el-input
                type="textarea"
                autosize
                placeholder="撰写评论"
                v-model="createComment">
            </el-input>
            <div class="commit">
              <el-button size="small" type="primary" @click="posthuifu">提交</el-button>
            </div>
          </div>
          </el-col>
        </div>
        </el-row>
          <el-row>
            <el-col :span="20"><div class="comment" v-for="v in dataList" :key="v.id">
              <div class="auther">{{v.userName}}:</div>
              <div class="content">内容{{v.contents}}</div>
              <div class="commentdata">{{v.time}}</div>
              <div class="response"><div class="responsecomment" @click="isresponsecomment">回复</div>
                <h1 class="huifu" v-if="ishuifu">
                  <div class="createcommen">
                    <el-input
                        type="textarea"
                        autosize
                        placeholder="撰写评论"
                        v-model="responsecomment">
                    </el-input>
                    <div class="commit">
                      <el-button size="small" type="primary" @click="commenthuifu">提交</el-button>
                    </div>
                  </div>
                </h1>
              </div>
            </div>
            </el-col>
          </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Post",
  data() {
    return {
      ishuifu: false,
      dataList: [],
      postcontent: '',
      postId: "2",
      createComment: '',
      responsecomment: '',
      postdata: "",
      pageNum: '1',
      pageSize: '4',
    }
  },
  methods: {
    posthuifu: function () {
    },
    isresponsecomment: function () {
      this.ishuifu = !this.ishuifu;
    },
    commenthuifu: function () {
    },
  },
  mounted() {
    axios.get("/api/v1/comments/", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            postId: this.postId,
          },
        }).then((response) => {
          this.dataList = response.data.data;
          this.totalNum = response.data.totalNum;
          this.toalPage = response.data.totalPage;
          console.log(this.dataList.length);
        });
    axios.get("/api/v1/posts/" + "shopId", {
      params: {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        postId: this.postId,
      },
    }).then((response) => {
      this.postcontent = response.data.data;
      this.totalNum = response.data.totalNum;
      this.toalPage = response.data.totalPage;
      console.log(this.postcontent)
    });
  },
}
</script>

<style scoped>
.el-container {
  display: flex;
}
.el-main {
  background: #b3c0d1;
  color: #333;
  line-height: 200px;
  justify-content: center;
  display: flex;
}
.all {
  display: flex;
  flex-direction: column;
  width: 900px;
  height: 600px;
}
.temp {
  width: 800px;
  height: 150px;
  margin-bottom: -80px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.postdata {
  display: flex;
  justify-content: center;
  margin-right: 140px;
  background: #b3c0d1;
  height: 0;
  font-size: 15px;
}
.postcontent {
  display: flex;
}
.createcommen {
  margin-top: 120px;
  margin-left: 60px;
  width: 500px;
  height: 20px;
  display: flex;
}
.cocommen {
display: flex;
}
.commit {
  margin-left: 30px;
  display: flex;
  margin-top: 12px;
  align-items: center;
}
.comment{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

}
.content {
  background-color: white;
  display: flex;
  line-height: 60px;
  width: 800px;
  margin-top: 30px;
  margin-bottom: -80px;
}
.commentdata {
  display: flex;
  width: 50px;
  height: 50px;
  margin-bottom: -20px;
}
.response {
  display: grid;
  width: 50px;
  height: 100px;
}
.huifu {
  margin-top: -200px;
  height: 50px;
}
.responsecomment {
}
.auther {
  display: flex;
  height: 90px;
  width: 50px;
  margin-top: -40px;
}
</style>
