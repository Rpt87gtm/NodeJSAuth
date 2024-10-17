import axios from 'axios';

const state = {
  user: {},
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

const actions = {
  async fetchUser({ commit }) {
    try {
      const response = await axios.get('/api/user');
      commit('setUser', response.data);
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  },
  async updateUser({ commit }, user) {
    try {
      const response = await axios.put('/api/user', user);
      commit('setUser', response.data);
    } catch (error) {
      console.error('Failed to update user', error);
    }
  },
};

const getters = {
  user: state => state.user,
};

export default {
  state,
  mutations,
  actions,
  getters,
};