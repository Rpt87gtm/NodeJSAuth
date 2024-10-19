<template>
  <div
    class="home-page d-flex flex-column align-items-center justify-content-center vh-100"
  >
    <h1 class="mb-4">Добро пожаловать на главную страницу!</h1>
    <p class="mb-4">
      Эта кнопка запрашивает с backend информацию и обновляет токен, если он еще
      актуален
    </p>

    <button @click="fetchProtectedData" class="btn btn-primary mb-4">
      Fetch Protected Data
    </button>
    <p>{{ protectedData }}</p>
    <button @click="handleLogout" class="btn btn-primary mb-4">Logout</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'HomePage',
  data() {
    return {
      protectedData: '',
    };
  },
  methods: {
    ...mapActions('auth', ['protectedRoute', 'logout']),
    async fetchProtectedData() {
      try {
        const data = await this.protectedRoute();
        this.protectedData = data.message;
      } catch (error) {
        console.error('Failed to fetch protected data:', error);
        this.protectedData = 'Failed to fetch protected data';
        this.$router.push('/login');
      }
    },
    async handleLogout() {
      await this.logout();
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.home-page {
  text-align: center;
  margin-top: 50px;
}
</style>
