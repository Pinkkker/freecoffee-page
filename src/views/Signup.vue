<template>
  <div class="signup_box">
    <div>
      <div class="txth1">
        <h1>Sign up to FreeCode</h1>
      </div>

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="signup-ruleForm"
      >
        <el-form-item label="输入用户名" prop="username">
          <el-input v-model.number="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="创建账号" prop="account">
          <el-input v-model.number="ruleForm.account"></el-input>
        </el-form-item>

        <el-form-item label="创建密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item class="button_box">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >注册</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

        <a href="#/"><p>注册成功，去登录</p></a>
      </el-form>
    </div>
  </div>
</template>
<script>
const axios = require("axios").default;
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
    };
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        account: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        account: [{ validator: checkAccount, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      const article = {
        nickName: this.ruleForm.username,
        username: this.ruleForm.account,
        password: this.ruleForm.pass,
      };

      axios.post("/api/v1/me", article).then((response) => {
        if (response.data.code === "200") {
          this.$message({
            message: "恭喜你，注册成功",
            type: "success",
          });
          this.$router.push("/signin");
        } else {
          this.$message.error("注册失败");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.signup_box {
  display: flex;
  justify-content: center;
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

.button_box {
  text-align: center;
}

.txth1 {
  margin-top: 8rem;
  color: #f6f8fa;
  font-family: sans-serif;
  font-size: 15px;
}
.signup-ruleForm {
  background-color: #f6f8fa;
  width: 308px;
  border: 1px solid hsl(210deg 18% 87%);
  border-radius: 5px;
  padding: 20px;
}
</style>