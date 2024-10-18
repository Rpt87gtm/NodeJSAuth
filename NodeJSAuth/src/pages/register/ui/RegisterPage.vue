<template>
    <div class="register-page">
      <h1>Регистрация</h1>
      <div>
        <form @submit.prevent="handleRegister">
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Пароль" required />
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
      <button @click="openLoginPage">Уже есть аккаунт</button>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'RegisterPage',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      ...mapActions('auth', ['register']),
      async handleRegister() {
        const user = {
          username: this.email,
          password: this.password,
        };
        await this.register(user);
        this.$router.push('/');
      },
      async openLoginPage(){
        this.$router.push('/login');
      }
    },
  };
  </script>
  
  <style scoped>
  .register-page {
    text-align: center;
    margin-top: 50px;
  }
  </style>