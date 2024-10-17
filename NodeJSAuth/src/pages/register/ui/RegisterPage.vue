<template>
    <div class="register-page">
      <h1>Регистрация</h1>
      <form @submit.prevent="handleRegister">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Пароль" required />
        <button type="submit">Зарегистрироваться</button>
      </form>
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
          email: this.email,
          password: this.password,
        };
        await this.register(user);
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .register-page {
    text-align: center;
    margin-top: 50px;
  }
  </style>