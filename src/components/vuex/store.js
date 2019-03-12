import Vue from 'vue'
import Vuex from 'vuex'
// import  getters from './getters'
// import  mutations from './mutations'
// import  actions from './action'
Vue.use(Vuex);
// let state = {}
const store = new Vuex.Store({
  // state,
  // getters,
  // mutations,
  // actions
    state:{
        count:0,
        todos:[
            { id: 1, text: '...', done: true },
            { id: 2, text: 'qwe', done: false },
            { id: 2, text: '123', done: false },
            { id: 2, text: '432', done: false }
        ]
    },
    mutations:{
        increment(state,n){
            // console.log('state',state);
            // console.log('n',n);
            state.count++;
            // Vue.set(state,'age',123);
            state.todos = { newProp:123 };
            console.log(state)
        }
    },
    getters:{
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        }
    },
    actions:{
        // increment(content){
        //     context.commit('increment')
        // }
        increment({commit}){
            commit('increment')
        }
    }
    // getters: {
    //     // ...
    //     getTodoById: (state) => (id) => {
    //         return state.todos.find(todo => todo.id == id)
    //     },
    //     getId:function (state) {
    //          return function (id) {
    //              console.log('id',id)
    //             return state.todos.find(todo => todo.id === id)
    //         }
    //     }
    // }
})

// store.commit('increment')
// console.log('store',store.state.count) // -> 1
// let a = store.getters.getId(2);
// console.log(a);
// let b = store.getters.getId(2);
// console.log(b);

export default store
