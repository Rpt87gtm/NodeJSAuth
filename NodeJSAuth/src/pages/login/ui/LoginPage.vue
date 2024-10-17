<template>
    <div class="login-page">
      <h1>Вход</h1>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Пароль" required />
        <button type="submit">Войти</button>
      </form>
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
      async login() {
        const user = {
          email: this.email,
          password: this.password,
        };
        await this.login(user);
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    text-align: center;
    margin-top: 50px;
  }
  </style>