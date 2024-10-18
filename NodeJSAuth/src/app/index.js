import { createApp } from 'vue';
import App from '../App.vue';
import router from '../app/router';
import store from '../shared/store';

const app = createApp(App);
app.use(router);
app.use(store);
store.dispatch('initialize').then(() => {
    const isLoggedIn = store.getters['auth/isLoggedIn'];
    if (!isLoggedIn) {
      router.push('/login');
    }
    app.mount('#app');
  });