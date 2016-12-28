<template>
  <div class="page-login">
    <div class="login-box">
      <div class="login-title">
        <h3>项目名称</h3>
        <p>登录</p>
      </div>
      <div class="login-form">
        <el-form label-position="top" :model="loginForm" :rules="loginRule" ref="loginForm">
          <el-form-item prop="username">
            <el-input placeholder="员工号" type="text" v-model="loginForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input placeholder="密码" type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  name: 'login',
  data () {
    return {
      loginRule: {
        username: [
          {
            require: true,
            message: '请填写员工号'
          }
        ]
      },
      loginForm: {
        username: '',
        pass: ''
      }
    }
  },
  mouted () {
    if (auth.loggedIn()) {
      this.goDashboard()
    }
  },
  methods: {
    goDashboard () {
      this.$router.push('user')
    },
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          auth.login(this.loginForm.username, this.loginForm.pass, (val) => {
            if (val) {
              this.goDashboard()
            }
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
html, body, .page-login {
  min-height: 100vh;
}
.page-login {
  background-color: #f7f7f7;
  padding-top: 50px;
}
.login-title {
  color: #2a323c;
  text-align: center;
  padding: 20px 0 0;
  h3 {
    margin: 0 0 30px 0;
  }
  p {
    font-weight: bold;
    color: #898989;
    margin: 0;
  }
}
.login-box {
  margin: 0 auto;
  max-width: 400px;
  border-radius: 5px;
  background-color: #fff;
}
.login-form {
  padding: 20px 30px;
  border: 0;

  button {
    display: block;
    width: 100%;
  }
}
</style>
