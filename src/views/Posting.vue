<template>
  <div class="warp">
    <el-container>
      <el-header>
        <el-col :span="24"><div class="grid">
        </div></el-col>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="10"><div class="grid-content">
            <div class="b"><video src="../assets/video.mp4" muted loop autoplay></video></div>
          </div></el-col>
          <div class="right">
          <el-col :span="4">
            <div class="gri">
              <div class="moresmall">
            <el-input
                type="textarea"
                autosize
                placeholder="请输入帖子标题"
                v-model="currentPost.title"
                clearable>
            </el-input>
              </div>
            </div>
          </el-col>
            <el-col :span="10">
              <div class="gri">
                <div class="morebig">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入帖子内容"
              v-model="currentPost.po"
              clearable>
            </el-input>
                </div>
                </div>
                </el-col>
              <el-col :span="20"><div class="grid-co bg">
                <el-button type="primary" @click="createPost">提交<i class="el-icon-upload el-icon--right"></i></el-button>
              </div></el-col>
          </div>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "AddPost",
        data() {
          return {
            currentPost: {},
          }
        },
        methods: {
          home: function () {
            this.$router.push("home")
          },
          custom: function () {
            this.$router.push("home")
          },
          createPost() {
            this.currentPost = {
              po: '',
              title: '',
            }
            let url = '/api/v1/posts'
            axios.post(url, this.currentPost).then((response) => {
              if (response.data.code === "200") {
                this.$alert('创建帖子成功', '', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$message({
                      type: 'info',
                      message: `action: ${ action }`
                    });
                  }
                });
              } else {
                console.log(response.data.message)
              }
            })
          },
        }
  }
</script>


<style scoped>
.right {
  background: #8ea6d7;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 650px;
  height: 400px;
}
.morebig {
  display: flex;
  width: 400px;
  height: 240px;
  align-items: flex-end;
  justify-content: center;
}
.moresmall {
  margin-left: -80px;
  display: flex;
  width: 350px;
  height: 60px;
  justify-content: center;
  align-items: flex-end;
}
.grid {
  display: flex;
  justify-content: flex-end;
}
.warp {
  height: 678px;
  background-image: linear-gradient(to right bottom, #9fc0a7, #85beb4, #73bac5, #76b2d3, #8ea6d7, #99a0d6, #a59ad2, #b193cc, #aa94d1, #a294d7, #9896dc, #8c97e1);
}
.b {
  margin-left: 7px;
  display: flex;
  width: 682px;
  height: 400px;
  justify-content: flex-end;
}
.b video {
  width: 80%;
  height: 100%;
}
.bg {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 110px;
  text-align: center;
}
.el-row {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.gri {
  border-radius: 4px;
  min-height: 36px;
}

.el-header {
  text-align: center;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.el-main {
  display: flex;
  color: #333;
  text-align: center;
  line-height: 120px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
