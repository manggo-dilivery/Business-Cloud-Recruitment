import Vue from 'vue'
import Vuex from 'vuex'
import  getters from './getters'
import  mutations from './mutations'
import  actions from './action'
import ee_1 from '@/static/emoji/ee_1.png'
import ee_2 from '@/static/emoji/ee_2.png'
import ee_3 from '@/static/emoji/ee_3.png'
import ee_4 from '@/static/emoji/ee_4.png'
import ee_5 from '@/static/emoji/ee_5.png'
import ee_6 from '@/static/emoji/ee_6.png'
import ee_7 from '@/static/emoji/ee_7.png'
import ee_8 from '@/static/emoji/ee_8.png'
import ee_9 from '@/static/emoji/ee_9.png'
import ee_10 from '@/static/emoji/ee_10.png'
import ee_11 from '@/static/emoji/ee_11.png'
import ee_12 from '@/static/emoji/ee_12.png'
import ee_13 from '@/static/emoji/ee_13.png'
import ee_14 from '@/static/emoji/ee_14.png'
import ee_15 from '@/static/emoji/ee_15.png'
import ee_16 from '@/static/emoji/ee_16.png'
import ee_17 from '@/static/emoji/ee_17.png'
import ee_18 from '@/static/emoji/ee_18.png'
import ee_19 from '@/static/emoji/ee_19.png'
import ee_20 from '@/static/emoji/ee_20.png'
import ee_21 from '@/static/emoji/ee_21.png'
import ee_22 from '@/static/emoji/ee_22.png'
import ee_23 from '@/static/emoji/ee_23.png'
import ee_24 from '@/static/emoji/ee_24.png'
import ee_25 from '@/static/emoji/ee_25.png'
import ee_26 from '@/static/emoji/ee_26.png'
import ee_27 from '@/static/emoji/ee_27.png'
import ee_28 from '@/static/emoji/ee_28.png'
import ee_29 from '@/static/emoji/ee_29.png'
import ee_30 from '@/static/emoji/ee_30.png'
import ee_31 from '@/static/emoji/ee_31.png'
import ee_32 from '@/static/emoji/ee_32.png'
import ee_33 from '@/static/emoji/ee_33.png'
import ee_34 from '@/static/emoji/ee_34.png'
import ee_35 from '@/static/emoji/ee_35.png'
Vue.use(Vuex);
let state = {
    userInfo:[],
    chatList:[],
    adminData:[],
    toUsername:[],
    messageData:{},
    friendInfo:{},
    personPageData:{},
    chooseGroupFriend:{},
    pending:[],
    allMessageData:[],
    groupList:[],
    singleChatList:[],
    groupData:{},
    emoji:{
        '[):]': ee_1,
        '[:D]': ee_2,
        '[;)]': ee_3,
        '[:-o]': ee_4,
        '[:p]': ee_5,
        '[(H)]': ee_6,
        '[:@]': ee_7,
        '[:s]': ee_8,
        '[:$]': ee_9,
        '[:(]': ee_10,
        '[:\'(]': ee_11,
        '[:|]': ee_12,
        '[(a)]': ee_13,
        '[8o|]': ee_14,
        '[8-|]': ee_15,
        '[+o(]': ee_16,
        '[<o)]': ee_17,
        '[|-)]': ee_18,
        '[*-)]': ee_19,
        '[:-#]': ee_20,
        '[:-*]': ee_21,
        '[^o)]': ee_22,
        '[8-)]': ee_23,
        '[(|)]': ee_24,
        '[(u)]': ee_25,
        '[(S)]': ee_26,
        '[(*)]': ee_27,
        '[(#)]': ee_28,
        '[(R)]': ee_29,
        '[({)]': ee_30,
        '[(})]': ee_31,
        '[(k)]': ee_32,
        '[(F)]': ee_33,
        '[(W)]': ee_34,
        '[(D)]': ee_35
    },
    emojiArr:[
        {key:'[):]', url:ee_1},{key:'[:D]', url:ee_2},{key:'[;)]', url:ee_3},{key:'[:-o]', url:ee_4},{key:'[:p]', url:ee_5},
        {key:'[(H)]', url:ee_6},{key:'[:@]', url:ee_7},{key:'[:s]', url:ee_8},{key:'[:$]', url:ee_9},{key:'[:(]', url:ee_10},
        {key:'[:\'(]', url:ee_11},{key:'[:|]', url:ee_12},{key:'[(a)]', url:ee_13},{key:'[8o|]', url:ee_14},{key:'[8-|]', url:ee_15},
        {key:'[+o(]', url:ee_16},{key:'[<o)]', url:ee_17},{key:'[|-)]', url:ee_18},{key:'[*-)]', url:ee_19},{key:'[:-#]', url:ee_20},
        {key:'[:-*]', url:ee_21},{key:'[^o)]', url:ee_22},{key:'[8-)]', url:ee_23},{key:'[(|)]', url:ee_24},{key:'[(u)]', url:ee_25},
        {key:'[(S)]', url:ee_26},{key:'[(*)]', url:ee_27},{key:'[(#)]', url:ee_28},{key:'[(R)]', url:ee_29},{key:'[({)]', url:ee_30},
        {key:'[(})]', url:ee_31},{key:'[(k)]', url:ee_32},{key:'[(F)]', url:ee_33},{key:'[(W)]', url:ee_34},{key:'[(D)]', url:ee_35}
    ],
    viewMode: 'max'
};
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
