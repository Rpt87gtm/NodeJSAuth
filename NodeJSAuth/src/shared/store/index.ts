import { createStore } from 'vuex';
import auth from './auth';
import user from './user';

interface RootState {
  auth: typeof auth.state;
}

export default createStore({
  modules: {
    auth,
    user,
  },
  actions: {
    async initialize({ dispatch }) {
      await dispatch('auth/restoreToken');
    }
  },
});