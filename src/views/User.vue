<template>
  <div class="container">
    <div class="left">
      <div id="title">
        <el-upload
          class="upload-demo"
          action="api/v1/upload"
          :on-preview="handlePreview"
          accept=".jpg"
        >
          <el-avatar
            :size="150"
            :src="user.avatar"
          ></el-avatar>
        </el-upload>
        <div id="nickname">
          {{ user.nickname }}
        </div>
      </div>
      <div id="honor">
        <div>
          <div>声望值</div>
          <div style="text-align: center; margin-top: 10px">
            {{ user.reputation }}
          </div>
        </div>
        <div>
          <div>获赞数</div>
          <div style="text-align: center; margin-top: 10px">
            {{ user.likes }}
          </div>
        </div>
        <div>
          <div>关注数</div>
          <div style="text-align: center; margin-top: 10px">
            {{ user.follows }}
          </div>
        </div>
      </div>
      <div id="editB">
        <el-button type="success" plain @click="initForm"
          >编辑个人资料</el-button
        >
        <el-dialog
          title="编辑个人资料"
          :visible.sync="dialogVisible"
          width="25%"
          :before-close="handleClose"
        >
          <el-form
            :model="userForm"
            ref="userForm"
            label-width="100px"
            class="editForm"
          >
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="userForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="name">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item
              label="年龄"
              prop="age"
              :rules="[{ type: 'number', message: '年龄必须为数字值' }]"
            >
              <el-input v-model.number="userForm.age"></el-input>
            </el-form-item>
            <el-form-item
              label="电话号码"
              prop="phoneNumber"
              :rules="[{ type: 'number', message: '电话号码必须为数字值' }]"
            >
              <el-input
                type="age"
                v-model.number="userForm.phoneNumber"
              ></el-input>
            </el-form-item>
            <el-form-item label="原密码" prop="oldP">
              <el-input
                type="password"
                v-model="userForm.oldP"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newP">
              <el-input
                type="password"
                v-model="userForm.newP"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="intro">
              <el-input
                type="textarea"
                autosize
                placeholder="请输入简介"
                v-model="userForm.intro"
              >
              </el-input>
            </el-form-item>
            <el-form-item style="display: flex; justify-content: flex-end">
              <el-button type="primary" @click="submitForm('userForm')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-size: 15px;
          height: 75px;
        "
      >
        <div>
          <div v-if="user.phoneNumber" style="margin-bottom: 5px">
            电话:{{ user.phoneNumber }}
          </div>
        </div>
        <div>
          <div v-if="user.age" style="margin-bottom: 5px">
            年龄:{{ user.age }}
          </div>
        </div>
      </div>
      <div id="joinTime">{{ Rdate }} 加入</div>
    </div>
    <div class="right">
      <div class="basic">
        <div id="intro">
          <div style="margin-bottom: 20px">个人简介</div>
          <div v-if="!user.intro">这个人太懒了，还没有简介</div>
          <div v-if="user.intro">{{ user.intro }}</div>
        </div>
        <div id="tech">
          <div>
            技术栈
            <el-popover
              :disabled="!visible"
              placement="bottom"
              width="200"
              trigger="click"
            >
              <div style="display: flex; justify-content: space-between">
                <span>请选择</span>
                <span
                  >找不到？<span
                    @click="addTec"
                    style="cursor: pointer; color: darkblue"
                    >创建</span
                  ></span
                >
              </div>
              <ul style="display: flex; flex-wrap: wrap; padding-left: 0px">
                <li
                  v-for="item in techList"
                  @click="addMyTec(item)"
                  :key="item.id"
                  style="
                    border: 1px gray solid;
                    list-style: none;
                    margin: 5px;
                    padding: 2px;
                    border-radius: 20%;
                    cursor: pointer;
                    font-size: 16px;
                  "
                >
                  {{ item.name }}
                </li>
              </ul>
              <i
                class="el-icon-circle-plus-outline"
                @click="showWindow"
                slot="reference"
                style="font-size: 20px; color: gray"
              ></i>
            </el-popover>
          </div>
          <ul>
            <li
              v-for="item in user.tech"
              :key="item.id"
              :style="{ 'border-color': colorList[(item.id + user.id) % 5] }"
            >
              {{ item.name }}
              <i class="el-icon-close" @click="subMyTec(item)"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="post">
        <div>{{ this.user.nickname }}的帖子</div>
        <template>
          <el-backtop target=".post" :right="330"></el-backtop>
        </template>
        <ul class="infinite-list" v-infinite-scroll="load">
          <li v-for="item in posts" :key="item.id" class="infinite-list-item">
            <div id="postT">
              {{ item.title }}
            </div>
            <div id="postF">
              <div>
                {{
                  item.time.split("T")[0] +
                  "  " +
                  item.time.split("T")[1].split(".000")[0]
                }}
              </div>
              <div class="el-icon-star-on">{{ item.starred }}</div>
              <div class="el-icon-chat-line-square">
                {{ item.commentNumber }}
              </div>
            </div>
          </li>
        </ul>
        <p id="noPost" v-if="user.posts.length == 0">暂无数据</p>
        <p id="noMore" v-if="noMore && user.posts.length != 0">没有更多了...</p>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;

export default {
  name: "User",
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.getData());
  },
  data() {
    return {
      user: {
        id: "",
        posts: [],
        tech: [],
        registrationTime: "",
      },
      userForm: {
        age: undefined,
        phoneNumber: undefined,
        intro: undefined,
        nickname: undefined,
        name: undefined,
      },
      techList: [],
      colorList: ["pink", "orange", "skyblue", "gray", "lightgreen"],
      count: 0,
      visible: false,
      dialogVisible: false,
    };
  },
  computed: {
    noMore() {
      return this.count >= this.user.posts.length;
    },
    posts() {
      return this.user.posts.slice(0, this.count);
    },
    Rdate() {
      return this.user.registrationTime.split("T")[0];
    },
  },
  methods: {
    async getData() {
      let user = (await axios.get("/api/v1/me")).data.data;
      user.tech = (await axios.get("/api/v1/techs/" + user.id)).data.data;
      user.posts = (
        await axios.get("/api/v1/posts", {
          params: {
            userId: user.id,
          },
        })
      ).data.data;
      this.techList = (await axios.get("/api/v1/techs")).data.data;
      this.user = user;
    },
    load() {
      if (this.count < this.user.posts.length) {
        this.count++;
      }
    },
    initForm() {
      this.dialogVisible = true;
      for (let i in this.userForm) {
        this.userForm[i] = this.user[i];
      }
    },
    showWindow() {
      this.visible = true;
    },
    addTec() {
      this.$message({
        showClose: true,
        message: "暂不支持此功能哦",
        type: "error",
      });
    },
    addMyTec(tech) {
      for (const t of this.user.tech) {
        if (t.id == tech.id) {
          this.$message({
            showClose: true,
            message: "你已添加此技术栈",
            type: "error",
          });
          return;
        }
      }
      axios
        .post("/api/v1/techs/" + this.user.id, tech.id, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          if (response.data.code === "200") {
            this.$message({
              showClose: true,
              message: "添加成功",
              type: "success",
            });
            this.user.tech.push(tech);
          } else {
            this.$message({
              showClose: true,
              message: response.data.msg,
              type: "error",
            });
          }
        });
      this.visible = false;
    },
    subMyTec(tech) {
      axios
        .delete("/api/v1/techs/" + this.user.id, {
          headers: { "Content-Type": "application/json" },
          data: tech.id,
        })
        .then((response) => {
          if (response.data.code === "200") {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
            this.user.tech.splice(this.user.tech.indexOf(tech), 1);
          } else {
            this.$message({
              showClose: true,
              message: response.data.msg,
              type: "error",
            });
          }
        });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editInfo();
        } else {
          this.$message({
            showClose: true,
            message: "不符合规则",
            type: "error",
          });
        }
      });
    },
    editInfo() {
      if (
        this.userForm.newP != undefined &&
        this.userForm.oldP != this.user.password
      ) {
        this.$message({
          showClose: true,
          message: "密码错误",
          type: "error",
        });
      } else {
        this.userForm.password = this.userForm.newP;
        this.userForm.id = this.user.id;
        axios.put("/api/v1/me", this.userForm).then((response) => {
          if (response.data.code === "200") {
            let newUser = response.data.data;
            for (let i in newUser) {
              this.user[i] = newUser[i];
            }
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: response.data.msg,
              type: "success",
            });
          }
        });
        for (let i in this.userForm) {
          this.userForm[i] = undefined;
        }
        this.dialogVisible = false;
      }
    },
    handlePreview(file) {
      window.open(file.response.url);
    },
  },
};
</script>

<style scoped>
.container {
  height: 900px;
  display: flex;
  justify-content: center;
  background-color:#F5F5F5;
}

.left,
.basic,
.post {
  box-shadow: 0 5px 20px 2px rgb(14 0 47 / 21%);
  border-radius: 10px;
  margin-top: 50px;
  background-color:#fff;
  padding: 15px;
}

.left {
  height: 580px;
  width: 280px;
}

.right {
  width: 800px;
  margin-left: 30px;
}

.basic {
  display: flex;
  align-items: flex-start;
  height: 160px;
}

#intro {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#intro > div {
  width: 400px;
}

#tech > ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}

#tech > ul > li {
  font-size: 18px;
  margin: 5px 10px;
  text-align: center;
  border-radius: 20%;
  padding: 5px;
  border: 2px solid;
  color: gray;
}

#tech > ul > li:hover,
.el-popover li:hover {
  color: black;
}

#tech i {
  cursor: pointer;
}

.left > div {
  display: flex;
  justify-content: center;
  align-items: center;
}

#title {
  height: 280px;
  flex-direction: column;
}

#title > i {
  border: 5px black solid;
  border-radius: 50%;
  font-size: 120px;
}

#nickname {
  font-size: 32px;
  font-weight: bold;
  margin-top: 20px;
}

#honor {
  display: flex;
  justify-content: space-around;
  height: 130px;
  font-size: 18px;
}

#editB {
  margin: 20px;
}

#editB > .el-button {
  font-size: 18px;
  width: 200px;
}

#joinTime {
  color: gray;
  justify-content: start;
  align-items: flex-end;
}

.post {
  margin-top: 20px;
  height: 650px;
  overflow: auto;
}

.post > div:first-child {
  display: flex;
  justify-content: center;
  font-size: 20px;
}

.post ul {
  padding-left: 0px;
}

.post li {
  border-top: 1px gray solid;
  list-style: none;
  padding: 20px 5px;
}

#postT {
  font-size: 20px;
}

#postF {
  margin: 10px 0px;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
}

#postF > div + div {
  margin-left: 10px;
}

#noMore,
#noPost {
  display: flex;
  justify-content: center;
  color: rgba(0, 0, 0, 0.6);
}
</style>