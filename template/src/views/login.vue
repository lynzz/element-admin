<template>
  <div class="page-login">
    <div class="login-title">
      <h3>项目名称</h3>
    </div>
    <div class="login-box">
      <div class="login-form">
        <el-form label-position="top" :model="loginForm" :rules="loginRule" ref="loginForm" class="login-form">
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
      this.$router.push('dashboard')
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
  color: #1D8CE0;
  text-align: center;
  padding: 20px 0 40px;
}
.login-box {
  margin: 0 auto;
  max-width: 400px;
  border-radius: 5px;
  background-color: #fff;
}
.login-form {
  padding: 20px;
  border: 0;
  box-shadow: 1px 1px 1px #cccccc;
  form {
    background-color: #f7f7f7;
  }
  button {
    display: block;
    width: 100%;
  }
}
</style>
