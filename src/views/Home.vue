<template>
  <div class="component">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="15"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="9"><div class="grid-content bg-purple-light">
            <div class="demo-basic--circle">
              <el-avatar :size="sizeList" :src="circleUrl"></el-avatar>
            </div>
          </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px"></el-aside>
        <el-main>
          <el-row>
            <el-col :span="24"><div class="grid">{{one}}<div class="lli">8888</div></div></el-col>
            <el-col :span="24"><div class="grid">{{two}}</div></el-col>
            <el-col :span="24"><div class="grid">{{three}}</div></el-col>
            <el-col :span="24"><div class="grid">{{four}}</div></el-col>
            <el-col :span="24"><div class="grid">{{five}}</div></el-col>
            <el-col :span="24"><div class="grid">{{six}}</div></el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
    <div class="block">
      <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
//import * as axios from "core-js";

export default {
  name: "Login",
  data () {
    return {
      one: "1",
      two: "2",
      three: "4",
      four: "5",
      five: "6",
      six: "7",
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: "small",
      count: 0
    }
  },
  /*  beforeRouteEnter(to, from, next) {
      axios.get("/api/me").then((response) => {
        if (response.data.status === "OK") {
          next((vm) => {
            vm.username = response.data.data
          })
        } else {
          next("/login")
        }
      }).catch(() => next('/login'))
    },*/
}
</script>

<style>
.el-header{
  background: #F56C6C;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.lli {
  height: 20px;
}
.el-aside {
  background-image: url("../assets/aside.jpg");
  height: 300px;
  background-size: cover;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background: #67C23A;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.component {
  display: block;
  margin: 0;
}
.el-container {
  margin-top: 0;
}
.el-row {
  background: #E6A23C;
  margin-bottom: 20px;
}
.el-col {
  height: auto;
  border-radius: 4px;
}
.bg-purple-dark {
}
.grid {

}
.bg-purple {
}
.bg-purple-light {
}
.grid-content {
  border-radius: 4px;
  min-height: 10px;
}
.el-avatar {
  text-align: right;
}

</style>
