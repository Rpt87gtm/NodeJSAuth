<template>
    <div class="login-page">
      <h1>Вход</h1>
      <div>
        <form @submit.prevent="handleLogin">
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Пароль" required />
          <button type="submit">Войти</button>
        </form>
      </div>
      <button @click="openRegisterPage">Зарегистрироваться</button>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      ...mapActions('auth', ['login']),
      async handleLogin() {
        console.log(mapActions('auth', ['login']));
        const user = {
          username: this.email,
          password: this.password,
        };
        await this.login(user);
        this.$router.push('/');
      },
      async openRegisterPage(){
        this.$router.push('/register');
      }
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    text-align: center;
    margin-top: 50px;
  }
  </style>