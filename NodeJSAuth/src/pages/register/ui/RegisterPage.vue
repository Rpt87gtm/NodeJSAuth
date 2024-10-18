<template>
  <div class="register-page d-flex flex-column align-items-center justify-content-center vh-100">
    <h1 class="mb-4">Регистрация</h1>
    <div class="w-50">
      <form @submit.prevent="handleRegister" class="mb-3">
        <div class="mb-3">
          <input type="email" v-model="email" placeholder="Email" required class="form-control" />
        </div>
        <div class="mb-3">
          <input type="password" v-model="password" placeholder="Пароль" required class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary w-100">Зарегистрироваться</button>
      </form>
      <button @click="openLoginPage" class="btn btn-secondary w-100">Уже есть аккаунт</button>
    </div>
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