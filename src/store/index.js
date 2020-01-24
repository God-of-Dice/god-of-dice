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
    turn: 1,
    myIndex: 0,
    myName: '',
    baseDamage: 5,
    enemy: null,
    skill1: {
      isUse: false,
      baseDamage: 10,
    },
    skill2: {
      isUse: false,
      baseDamage: 6,
    },
    skill3: {
      isUse: false,
      baseDamage: 7,
    },
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
    SET_TURN(state, payload) {
      state.turn = payload;
    },
    SET_ENEMY(state, payload) {
      state.enemy = payload;
    },
    SET_BASEDAMAGE(state, payload) {
      state.baseDamage = payload;
    },
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
              commit('SET_MYNAME', data.players[getters.getMyIndex].name)
              commit('SET_TURN', data.turn);
            }
          })
        })
      }
    },
    async hit({ getters, commit }, payload) {
      const damage = payload*getters.getBaseDamage;
      const players = getters.getPlayers;
      players[getters.getEnemy].hp -= damage
      db.collection('rooms').doc(getters.getRoomId).update({
        turn: getters.getEnemy,
        players,
      });
      commit('SET_BASEDAMAGE', 5);
    },
    async joinroom({ commit, dispatch }, payload) {
      const { roomName, player } = payload;
      let roomPlayers = null;
      let isExist = false;
      let udahPlay;
      // let countPlayer = 0;
      let roomId = null;
      try {
        const rooms = await db.collection('rooms').where('name', '==', roomName).get()
        rooms.forEach(room => {
          const data = room.data();
          const { name } = data
          if (name === roomName) {
            isExist = true;
            roomId = room.id;
            udahPlay = room.isPlay;
            roomPlayers = data.players;
            udahPlay = data.isPlay;
            console.log(data.isPlay);
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
                  commit('SET_MYINDEX', 0);
                  commit('SET_ENEMY', 1);
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
          if (udahPlay) {
            swal.fire('GABISA BOS')
          } else {

            // check room full ato engga,
            // if (countPlayer > 2) {
            //   swal.fire('Room is full, sorry');
            // }
            const newPlayer = {
              name: player,
              hp: 100,
            };
            roomPlayers.push(newPlayer);
            db.collection('rooms').doc(roomId).update({
              isPlay: true,
              players: roomPlayers,
            })
            .then(() => {
              commit('SET_MYROOM', roomId);
              dispatch('fetchData');
              commit('SET_MYINDEX', 1);
              commit('SET_ENEMY', 0);
              swal.fire('Joined!')
              // push ke halaman room
            })
            .catch()
          }
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
        }],
        turn: 0,
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
    getMyIndex(state) {
      return state.myIndex;
    },
    getBaseDamage(state) {
      return state.baseDamage;
    },
    getPlayers(state) {
      return state.players;
    },
    getEnemy(state) {
      return state.enemy;
    },
  },
})
