import Vue from 'vue'
import Router from 'vue-router'
import ChatHome from '@/components/chatHome'
import RegisterOption from '@/components/login/registerOption'
import PersonRegist from '@/components/login/personRegist'
import Login from '@/components/login/login'
import Regist2 from '@/components/login/regist2'
import CompanyRegister from '@/components/login/companyRegister'
import ForgetPswd from '@/components/login/forgetPswd'
import UserAgreement from '@/components/login/userAgreement'
import Hobbit from '@/components/login/hobbit'
import Intrest from '@/components/login/intrest'
import CompanyTarget from '@/components/login/companyTarget'
import LoginInfo from '@/components/login/loginInfo'
import LoginInfo2 from '@/components/login/loginInfo2'

import LinkMan from '@/components/chat/linkman'
import Message from '@/components/chat/message'
import Animated from '@/components/chat/animated'
import Center from '@/components/chat/center'

import Recommend from '@/components/chat/recommend'
import Pending from '@/components/chat/pending'
import AddFriend from '@/components/chat/addFriend'
import Linkman2 from '@/components/chat/linkman2'
import Chat from '@/components/chat/chat'

import Alter from '@/components/chat/alter'



Vue.use(Router)

export default new Router({
    // mode:"history",
    routes: [
        {
            path: '/',
            component: ChatHome,
            children:[
                {path:'/', redirect:{name:'message'},},
                {path:'/message', name:'message', component:Message},
                {path:'/linkman', name:'linkman', component:LinkMan},
                {path:'/animated', name:'animated', component:Animated},
                {path:'/center', name:'center', component:Center},
            ]
        },
        {path:'/registerOption', name:'registerOption', component:RegisterOption},
        {path:'/personRegist', name:'personRegist', component:PersonRegist},

        {path:'/register2',name:'register2',component:Regist2},
        {path:'/login',name:'login',component:Login},
        {path:'/companyRegister',name:'companyRegister',component:CompanyRegister},
        {path:'/forgetPswd', name:'forgetPswd', component:ForgetPswd},
        {path:'/userAgreement', name:'userAgreement', component:UserAgreement},
        {path:'/hobbit', name:'hobbit', component:Hobbit},
        {path:'/intrest', name:'intrest', component:Intrest},
        {path:'/companyTarget', name:'companyTarget', component:CompanyTarget},
        {path:'/loginInfo', name:'loginInfo', component:LoginInfo},
        {path:'/loginInfo2', name:'loginInfo2', component:LoginInfo2},

        {path:'/recommend', name:'recommend', component:Recommend},
        {path:'/pending', name:'pending', component:Pending},
        {path:'/addFriend', name:'addFriend', component:AddFriend},
        {path:'/linkMan2', name:'linkMan2', component:Linkman2},
        {path:'/chat', name:'chat', component:Chat},

        {path:'/alter', name:'alter', component:Alter},
    ]
})
