import Vue from 'vue'
import Vuex from 'vuex'
import db from '../../config/firebase';
import swal from 'sweetalert2';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPlay: false,
    name: '',
    players: [
      {},
      {},
    ],
    myRoom: '',
    turn: '',
    myIndex: null,
    myName: '',
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
    SET_MYINDEX(state, payload) {
      state.myIndex = payload
    },
  },
  actions: {
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
      let countPlayer = 0;
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
            countPlayer = data.players.length;
          }
        });
        if (!isExist) {
          swal.fire({
            title: "Room doesn't exist",
            text: 'You want to create this room?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, create it!'
          }).then((result) => {
            if (result.value) {
              const docData = {
                name: roomName,
                isPlay: false,
                players: [{
                  name: player,
                  hp: 100,
                }],
                turn: 0,
              }
              db.collection('rooms')
                .add(docData)
                .then((rooms) => {
                  commit('SET_MYROOM', rooms.id);
                  dispatch('fetchData');
                  alert(rooms.id);
                  swal.fire(
                    'Created!',
                    'Your file has been created, invite your friend!',
                    'success'
                    )
                })
                .catch(() =>{
                  swal.fire('Oppss...')
                })
            }
          })
        } else {
          // check room full ato engga,
          // if (countPlayer > 2) {
          //   swal.fire('Room is full, sorry');
          // }
          const newPlayer = {
            name: player,
            hp: 100,
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
            swal.fire('Joined!')
            // push ke halaman room
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
