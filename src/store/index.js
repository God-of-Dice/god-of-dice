import Vue from 'vue'
import Vuex from 'vuex'
import db from '../../config/firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    healthplayer1: 100,
    healthplayer2: 100,
    isPlay: false,
    name: '',
    players: [
      {},
      {},
    ],
    myRoom: '',
    turn: '',
  },
  mutations: {
    SET_ISPLAY(state, payload) {
      state.isPlay = payload;
    },
    SET_NAME(state, payload) {
      state.name = payload
    },
    SET_PLAYERS(state, payload) {
      state.players = payload;
    },
    SET_MYROOM(state, payload) {
      state.myRoom = payload
    },
    SET_DECREASE1 (state, payload) {
      state.healthplayer1 = state.healthplayer1 - payload
    },
    SET_DECREASE2 (state, payload) {
      state.healthplayer2 = state.healthplayer2 - payload
    }
  },
  actions: {
    DECREASE1 (action, payload) {
      action.commit('SET_DECREASE1', payload)
    },
    DECREASE2 (action, payload) {
      action.commit('SET_DECREASE2', payload)
    },
    fetchData({ commit, getters }) {
      const roomId = getters.getRoomId
      if (!roomId) {
        console.log('not joined any rooms');
      } else {
        db.collection('rooms').onSnapshot((gameRooms) => {
          gameRooms.forEach((room) => {
            const data = room.data();
            const id = room.id;
            if (id === roomId) {
              commit('SET_PLAYERS', data.players);
              commit('SET_ISPLAY', data.isPlay);
              commit('SET_NAME', data.name);
            }
          })
        })
      }
    },
    async joinroom({ commit, dispatch }, payload) {
      const { roomName, player } = payload;
      let roomPlayers = null;
      let isExist = false;
      let roomId = null;
      try {
        const rooms = await db.collection('rooms').where('name', '==', roomName).get()
        rooms.forEach(room => {
          const data = room.data();
          const { name } = data
          if (name === roomName) {
            isExist = true;
            roomId = room.id;
            roomPlayers = data.players;
          }
        });
        if (!isExist) {
          alert('gaada')
        } else {
          // check room full ato engga
          const newPlayer = {
            name: `player`,
            hp: 1000,
            turn: false,
          };
          roomPlayers.push(newPlayer);
          db.collection('rooms').doc(roomId).update({
            isPlay: true,
            players: roomPlayers,
          })
          .then(() => {
            commit('SET_MYROOM', roomId);
            dispatch('fetchData');
            alert('joined');
          })
          .catch()
        }
      } catch (err) {
        console.log(err);
      }
    },
    async createRoom({ commit, dispatch }, payload) {
      const { roomName, player } = payload
      const docData = {
        name: roomName,
        isPlay: false,
        players: [{
          name: player,
          hp: 100,
          turn: true,
        }],
      };
      try {
        const rooms = await db.collection('rooms').add(docData)
        commit('SET_MYROOM', rooms.id);
        dispatch('fetchData');
        alert(rooms.id);
        
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {
  },
  getters: {
    getRoomId(state) {
      return state.myRoom;
    },
  },
})
