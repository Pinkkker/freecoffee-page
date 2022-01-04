<template>
  <el-container>
    <el-main>
      <div class="all">
        <div class="temp">
          biapto
          <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <el-divider></el-divider>
          asdasd
        </div>
        <div class="writer">
          <div class="writer-body">
            <el-avatar :size="65" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <el-button type="success">关注作者</el-button>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Post"
}
</script>

<style scoped>
.el-main {
  background-color: #dee2e6;
  color: #333;
  text-align: center;
  line-height: 160px;
  height: 950px;
  display: flex;
  justify-content: center;
}

.temp {
  width: 800px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.writer {
  display: flex;
  height: 190px;
  width: 300px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.writer-body {
  padding: 20px;
  width: 260px;
  display: flex;
  flex-direction: column;
}

.el-button--success{
  margin-top: 45px;
}

.all {
  display: flex;
  width: 1130px;
  flex-direction: row;
  justify-content: space-between;
}
</style>