<
<template>
  <div>
    <mt-header fixed title="登录"></mt-header>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-button type="default" @click.native="login" style="width:100%;" :disabled="phone===''||password===''">登录
    </mt-button>
  </div>
</template>
<
<script>
  import qs from 'qs'
  import HttpUtils from '../util/HttpUtils'
  import LogUtils from '../util/LogUtils'

  export default {
    name: 'Login',
    data () {
      return {
        phone: '',
        password: ''
      }
    },
    methods: {
      login () {
        LogUtils.d('login click')
        this.$http.post('/user/login', qs.stringify({
          account: this.phone,
          password: this.password,
          versionType: 'web,1.0.0'
        }))
          .then(HttpUtils.handleResponse)
          .then((response) => {
            console.log(response)
            this.$router.replace('/home')
          })
          .catch(e => {
            LogUtils.e(e)
          })
      }
    }
  }
</script>

