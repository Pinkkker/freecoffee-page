<template>

  <body id="signin" class="img js-fullheight">
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center mb-5">
            <h2 class="heading-section">freeCoffee</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-4">
            <div class="login-wrap p-0">
              <h3 class="mb-4 text-center a_signup">
                <a href="#/signup">没有账号?去注册</a>
              </h3>
              <form action="#" class="signin-form">
                <div class="form-group">
                  <input v-model.number="form.account" type="text" class="form-control" placeholder="账号" required />
                </div>
                <div class="form-group">
                  <input v-model.number="form.pass" id="password-field" type="password" class="form-control" placeholder="密码" required />
                  <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                </div>
                <div class="form-group">
                  <button type="submit" class="form-control btn btn-primary submit px-3" @click="submitForm(form)">
                    登陆
                  </button>
                </div>
                <div class="form-group d-md-flex">
                  <div class="w-50">
                    <label class="checkbox-wrap checkbox-primary">记住我
                      <input type="checkbox" checked />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="w-50 text-md-right a_forget">
                    <a href="#">忘记密码</a>
                  </div>
                </div>
              </form>
              <p class="w-100 text-center">&mdash; Or Sign In With &mdash;</p>
              <div class="social d-flex text-center">
                <a href="#" class="px-2 py-2 mr-md-1 rounded" @click="github(form)"><span class="ion-logo-facebook mr-2"></span> Github</a>
                <a href="#" class="px-2 py-2 ml-md-1 rounded" @click="github(form)"><span class="ion-logo-twitter mr-2"></span> Github</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>
<script>
const axios = require("axios").default;
export default {
  data() {
    return {
      form: {
        account: "",
        pass: "",
      }
    };
  },
  methods: {
    github() {
      window.location.href =
        "https://github.com/login/oauth/authorize?client_id=da8c28bcfd991b5b2774&state=STATE";
    },
    submitForm(formName) {
      console.log(formName)
      console.log(this.form.account);
      console.log(this.form.pass);
      const article = {
        username: this.form.account,
        password: this.form.pass,
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

  mounted() {
    function changeSignin() {
      const signin = document.getElementById("signin");
      const windowHeight = document.documentElement.clientHeight;
      signin.style.height = windowHeight + "px";
    }

    changeSignin();

    window.onresize = function () {
      changeSignin();
    };
  },
};
</script>

<style src="../assets/css/style.css" scoped>
</style>
<style scoped>
/* @import "../assets/css/style.css"; */
@import url(https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap);
@import url(https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);

body {
  background-image: url(../assets/image/coffee_java.jpg);
}

.a_signup {
  font-size: 20px;
}

.a_signup,
.a_forget,
a {
  color: #fff;
}

.a_signup,
.a_forget,
a:hover {
  color: #fbceb5;
}
</style>