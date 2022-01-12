<template>
  <div class="signup_box">
    <div class="h1_box">
      <h1>Sign in to codeB612</h1>
    </div>

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="signup-ruleForm"
    >
      <el-form-item label="输入账号" prop="account">
        <el-input v-model.number="ruleForm.account"></el-input>
      </el-form-item>

      <el-form-item label="输入密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <a href="#/signup"><p>没有账号？去注册</p></a>

      <el-form-item class="button-box">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
      <el-form-item class="button-box">
        <el-button type="primary" @click="github('ruleForm')"
        >使用github登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const axios = require("axios").default;
export default {
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };
    return {
      ruleForm: {
        account: "",
        pass: "",
      },
      rules: {
        account: [{ validator: checkAccount, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    github() {
      window.location.href = "https://github.com/login/oauth/authorize?client_id=da8c28bcfd991b5b2774&state=STATE";
    },
    submitForm(formName) {
      console.log(formName);
      const article = {
        username: this.ruleForm.account,
        password: this.ruleForm.pass,
      };

      axios.post("/api/v1/login", article).then((response) => {
        if (response.data.code === "200") {
          this.$router.push("/index");
        } else {
          this.$message.error("用户名或密码错误");
        }
      });
    },
  },
};
</script>

<style scoped>
.signup_box {
  width: 100%;
  height: 100%;
  background-image: url(../assets/image/sign_bg.png);
  background-size: 100%;
  position: fixed;
}

a {
  text-align: center;
  text-decoration: none;
}
.h1_box {
  color: #fff;
  font-family: sans-serif;
  font-size: 15px;
  margin-top: 150px;
  margin-bottom: 30px;
  text-align: center;
}

.button-box {
  text-align: center;
}

.el-button {
  background-color: #2da44e;
}
.signup-ruleForm {
  background-color: #f6f8fa;
  width: 308px;
  margin: auto;
  border: 1px solid hsl(210deg 18% 87%);
  border-radius: 5px;
  padding: 20px;
}
</style>