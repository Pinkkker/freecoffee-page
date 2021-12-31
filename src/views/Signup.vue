<template>
  <div class="signup">
    <div class="txth1">
      <h1>Sign up to FreeCode</h1>
    </div>
    
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="signup-ruleForm">
      <el-form-item label="输入用户名" prop="username">
        <el-input v-model.number="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="创建账号" prop="account">
        <el-input v-model.number="ruleForm.account"></el-input>
      </el-form-item>

      <el-form-item label="创建密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          account: '',
          pass: '',
          checkPass: ''
        },
        rules: {
           username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
           account: [
            { validator: checkAccount, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.txth1{
  font-family: sans-serif;
  font-size: 15px;
  margin-top: 150px;
  margin-bottom: 30px;
  text-align: center;
}
.signup-ruleForm{
  background-color:#f6f8fa;
  width: 308px;
  margin: auto;
  border: 1px solid hsl(210deg 18% 87%);
  border-radius: 5px;
  padding: 20px;
}
</style>