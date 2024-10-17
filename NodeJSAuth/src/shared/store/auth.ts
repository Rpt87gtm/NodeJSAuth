import Cookies from 'js-cookie';
import axios from 'axios';

const state = {
    token: Cookies.get('token') || '',
    status: '',
};

const mutations = {
    auth_request(state){
        state.status = 'loading';
    },
    auth_success(state, token){
        state.status = 'success';
        state.token = token;
    },
    auth_error(state){
        state.status = 'error';
    },
    logout(state){
        state.status = '';
        state.token = '';
    }
}

const  actions = {
    async login({ commit }, user) {
        await handleAuthRequest(commit, '/api/login', user);
    },
        async register({ commit }, user) {
        await handleAuthRequest(commit, '/api/register', user);
    },
    async logout({commit}){
        commit('logout');
        Cookies.remove('token');
        delete axios.defaults.headers.common['Authorization'];
    }
}

async function handleAuthRequest(commit, url, user) {
    commit('auth_request');
    try {
      const response = await axios.post(url, user);
      const token = response.data.token;
      Cookies.set('token', token, { httpOnly: true, secure: true });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      commit('auth_success', token);
    } catch (error) {
      commit('auth_error');
      Cookies.remove('token');
      throw error;
    }
  }

const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};