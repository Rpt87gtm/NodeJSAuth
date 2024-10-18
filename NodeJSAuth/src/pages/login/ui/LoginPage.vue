<template>
  <div class="login-page d-flex flex-column align-items-center justify-content-center vh-100">
    <h1 class="mb-4">Вход</h1>
    <div class="w-50">
      <form @submit.prevent="handleLogin" class="mb-3">
        <div class="mb-3">
          <input type="email" v-model="email" placeholder="Email" required class="form-control" />
        </div>
        <div class="mb-3">
          <input type="password" v-model="password" placeholder="Пароль" required class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary w-100">Войти</button>
      </form>
      <button @click="openRegisterPage" class="btn btn-secondary w-100">Зарегистрироваться</button>
    </div>
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