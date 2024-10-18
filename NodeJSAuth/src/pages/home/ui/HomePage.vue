<template>
    <div class="home-page">
      <h1>Добро пожаловать на главную страницу!</h1>
      <p>Это главная страница вашего приложения.</p>

      <button @click="fetchProtectedData">Fetch Protected Data</button>
      <p>{{ protectedData }}</p>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';

  export default {
    name: 'HomePage',
    data() {
    return {
      protectedData: ''
    };
  },
  methods: {
    ...mapActions('auth', ['protectedRoute']),
    async fetchProtectedData() {
      try {
        const data = await this.protectedRoute();
        this.protectedData = data.message;
      } catch (error) {
        console.error('Failed to fetch protected data:', error);
        this.protectedData = 'Failed to fetch protected data';
        this.$router.push('/login');
      }
    }
  }
  };
  </script>
  
  <style scoped>
  .home-page {
    text-align: center;
    margin-top: 50px;
  }
  </style>