import Vue from 'vue';
import Vuex from 'vuex';
import { auth1, auth2, db1, db2 } from '../firebase/init'; // Import both auths and databases

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user1: null,  // User authenticated with auth1 (First Firebase app)
    user2: null,  // User authenticated with auth2 (Second Firebase app)
    dataFromDb1: null, // To store data from the first database
    dataFromDb2: null, // To store data from the second database
  },
  mutations: {
    setUser1(state, payload) {
      state.user1 = payload;
    },
    setUser2(state, payload) {
      state.user2 = payload;
    },
    setDataFromDb1(state, payload) {
      state.dataFromDb1 = payload;
    },
    setDataFromDb2(state, payload) {
      state.dataFromDb2 = payload;
    },
  },
  actions: {
    // Fetch user for the first Firebase app (auth1)
    fetchUser1({ commit }) {
      auth1.onAuthStateChanged(user => {
        commit('setUser1', user ? { email: user.email, uid: user.uid } : null);
      });
    },
    // Fetch user for the second Firebase app (auth2)
    fetchUser2({ commit }) {
      auth2.onAuthStateChanged(user => {
        commit('setUser2', user ? { email: user.email, uid: user.uid } : null);
      });
    },
    // Fetch data from the first Firebase Realtime Database (db1)
    fetchDataFromDb1({ commit }) {
      db1.ref('/path/to/data').once('value') // Adjust the path as needed
        .then(snapshot => {
          commit('setDataFromDb1', snapshot.val());
        })
        .catch(error => {
          console.error('Error fetching data from db1:', error);
        });
    },
    // Fetch data from the second Firebase Realtime Database (db2)
    fetchDataFromDb2({ commit }) {
      db2.ref('/path/to/data').once('value') // Adjust the path as needed
        .then(snapshot => {
          commit('setDataFromDb2', snapshot.val());
        })
        .catch(error => {
          console.error('Error fetching data from db2:', error);
        });
    },
  },
  getters: {
    isAuthenticated1: state => !!state.user1,  // Check if user is authenticated with auth1
    isAuthenticated2: state => !!state.user2,  // Check if user is authenticated with auth2
    getDataFromDb1: state => state.dataFromDb1,
    getDataFromDb2: state => state.dataFromDb2,
  },
});