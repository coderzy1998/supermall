<template>
  <div id="login">
      <input type="text" placeholder="用户名" name="username" v-model="uid">
      <input type="password" placeholder="密码" name="password" v-model="pwd">
      <input type="submit" value="登录" @click="login">
    <h1>{{uid}}</h1>
    <h1>{{pwd}}</h1>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "Login",
    data(){
      return {
        uid:null,
        pwd:null
      }
    },
    methods:{
      login(){

      }
    }
  }
</script>

<style scoped>

</style>
