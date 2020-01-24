import Vue from 'vue'
import Vuex from 'vuex'
import db from '../../config/firebase';
import swal from 'sweetalert2';
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPlay: false,
    name: '',
    players: [],
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
    SET_UNSUBSCRIBE(state, payload) {
      state.unsubscribe = payload;
    },
    SET_HEAL(state){
      state.players[state.myIndex].hp += 25
    },
    SET_SUICIDE(state){
      state.players[state.myIndex].hp = 0
    }
  },
  actions: {
    fetchData({ commit, getters }) {
      const roomId = getters.getRoomId
      if (!roomId) {
        swal.fire("JOIN A ROOM")
      } else {
        const unsubscribe = db.collection('rooms').doc(roomId).onSnapshot((room) => {
            const data = room.data();
              commit('SET_PLAYERS', data.players);
              commit('SET_ISPLAY', data.isPlay);
              commit('SET_NAME', data.name);
              commit('SET_MYNAME', data.players[getters.getMyIndex].name)
              commit('SET_TURN', data.turn);

              data.players.forEach(player => {
                if(player.hp <= 0 ){
                  swal.fire({
                    title: `${player.name} LOSE!`,
                    width: 600,
                    padding: '3em',
                    background: '#fff url(/images/trees.png)',
                    backdrop: `
                      rgba(0,0,123,0.4)
                      url("/images/nyan-cat.gif")
                      left top
                      no-repeat
                    `
                  })
                  let sound = new Audio(require('@/assets/soundgroup/wow.mp3'))
                  sound.play()
                  unsubscribe()
                }
              });
            // this block is to check game is finish or not...
            // data.players.forEach(player => {
            //   if (player.hp <= 0) {
            //   }
            // });
          })
          return unsubscribe
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
      // let self = this
      const { roomName, player } = payload;
      let roomPlayers = null;
      let isExist = false;
      let udahPlay;
      let roomId = null;
      try {
        const rooms = await db.collection('rooms').where('name', '==', roomName).get()
        rooms.forEach(function(room){
          const data = room.data();
          const { name } = data
          if (name === roomName) {
            isExist = true;
            roomId = room.id;
            udahPlay = room.isPlay;
            roomPlayers = data.players;
            udahPlay = data.isPlay;
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
          }).then(function(result) {
            if (result.value) {
              const docData = {
                name: roomName,
                isPlay: false,
                players: [{
                  name: player,
                  hp: 100,
                }],
                turn: 0,
                isWin: false,
                winner: '',
              }
              db.collection('rooms')
              .add(docData)
                .then(function(rooms) {
                  commit('SET_MYROOM', rooms.id);
                  commit('SET_MYINDEX', 0);
                  commit('SET_ENEMY', 1);
                  dispatch('fetchData');
                  swal.fire(
                    'Created!',
                    'Your file has been created, invite your friend!',
                    'success'
                    )
                  router.push('/about');
                })
                .catch(() =>{
                  swal.fire('Oppss... Internal Server Error')
                })
            }
          })
        } else {
          if (udahPlay) {
            swal.fire('Opps... the room is full')
          } else {
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
              router.push('/about');
            })
            .catch()
          }
        }
      } catch (err) {
        swal.fire("Internal server error")
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
        isWin: false,
        winner: '',
      };
      try {
        const rooms = await db.collection('rooms').add(docData)
        commit('SET_MYROOM', rooms.id);
        dispatch('fetchData');
        this.$router.push({path : '/about'})

      } catch (err) {
        swal.fire("Internal server error")
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
    getMyHp(state){
      return state.players[0].hp
    }
  },
})
