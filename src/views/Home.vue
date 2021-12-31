<template>
  <div class="component">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="15"><div class="grid-content bg-purple">
            <el-button type="primary" @click="queryPost">确 定</el-button>
          </div></el-col>
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
            <el-col :span="24"><div class="grid">1</div></el-col>
            <el-col :span="24"><div class="grid">2</div></el-col>
            <el-col :span="24"><div class="grid">3</div></el-col>
            <el-col :span="24"><div class="grid">4</div></el-col>
            <el-col :span="24"><div class="grid">5</div></el-col>
            <el-col :span="24"><div class="grid">6</div></el-col>
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

import axios from "axios";

export default {
  name: "Login",
  data () {
    return {
      pageNum: "1",
      pageSize: "6",
      one: "1",
      two: "2",
      three: "4",
      four: "5",
      five: "6",
      six: "7",
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: "small",
      count: 0,
      allPost:[],
    }
  },
  methods: {
    queryPost: function (){
      axios.get("/api/v1/posts",{
        params: {
          "pageNum":this.pageNum,
          "pageSize":this.pageSize
        }
      })
      .then(response => {
        console.log(response);
        if (response.data.code === "200") {
          // eslint-disable-next-line no-undef
          this.allPost = response.data.data;
        } else {
          console.log(response.data.msg);
        }
        // eslint-disable-next-line no-undef
      }).catch()
    }
  }
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
.component{
  background: #D9E0E6;
}


.el-header{
  background: #FFFFFF;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.lli {
  height: 20px;
}
.el-aside {
  /* background-image: url("../assets/aside.jpg"); */
  /* height: 300px;
  background-size: cover;
  color: #333;
  text-align: center;
  line-height: 200px; */
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
  background: #ECEDEE;
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
