import axiosInstance from '../../app/router/axios';


interface AuthState {
    token: string | null;
    status: string;
}

const state: AuthState = {
    token: localStorage.getItem('token') || null,
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
        state.token = null;
    }
}

const actions = {
    async login({ commit }: { commit: any }, user: any) {
        await handleAuthRequest(commit, 'http://localhost:3000/login', user);
    },
    async register({ commit }: { commit: any }, user: any) {
        await axiosInstance.post('http://localhost:3000/register', user);
    },
    async logout({commit}: { commit: any }){
        commit('logout');
        localStorage.removeItem('token');
        delete axiosInstance.defaults.headers.common['Authorization'];
    },
    async restoreToken({ commit }: { commit: any }) {
        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            commit('auth_success', token);
        }
    },
    async protectedRoute({ commit }: { commit: any }) {
        const token = state.token;
        if (token) {
            try {
                const response = await axiosInstance.post('http://localhost:3000/protected', null, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return response.data; 
            } catch (error) {
                commit('auth_error');
                localStorage.removeItem('token');
                throw error;
            }
        } else {
            throw new Error('Token not found');
        }
    },
    async refreshToken({ commit }: { commit: any }) {
        const token = localStorage.getItem('token');
        if (token) {
            await handleAuthRequest(commit,'http://localhost:3000/refresh-token', null);
        } else {
            throw new Error('Token not found');
        }
    }
}


async function handleAuthRequest(commit, url, user) {
    commit('auth_request');
    try {
      const response = await axiosInstance.post(url, user);
      const token = response.data.token;
      localStorage.setItem('token', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      commit('auth_success', token);
    } catch (error) {
      commit('auth_error');
      localStorage.removeItem('token');
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