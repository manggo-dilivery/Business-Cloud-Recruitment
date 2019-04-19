import Vue from 'vue'
import Router from 'vue-router'

const ChatHome = r => require(['../components/chatHome.vue'],r);
const RegisterOption = r => require(['../components/login/registerOption.vue'],r);
const PersonRegist = r => require(['@/components/login/personRegist.vue'],r);
const Login = r => require(['@/components/login/login.vue'],r);
const Regist2 = r => require(['@/components/login/regist2.vue'],r);
const CompanyRegister = r => require(['@/components/login/companyRegister.vue'],r);
const ForgetPswd = r => require(['@/components/login/forgetPswd.vue'],r);
const UserAgreement = r => require(['@/components/login/userAgreement.vue'],r);
const Hobbit = r => require(['@/components/login/hobbit.vue'],r);
const Intrest = r => require(['@/components/login/intrest.vue'],r);
const CompanyTarget = r => require(['@/components/login/companyTarget.vue'],r);
const LoginInfo = r => require(['@/components/login/loginInfo.vue'],r);
const LoginInfo2 = r => require(['@/components/login/loginInfo2.vue'],r);

const LinkMan = r => require(['@/components/chat/linkman.vue'],r) ;
const Message = r => require(['@/components/chat/message.vue'],r) ;
const Center = r => require(['@/components/chat/center.vue'],r);

const Recommend = r => require(['@/components/chat/recommend.vue'],r);
const Pending = r => require(['@/components/chat/pending.vue'],r);
const AddFriend = r => require(['@/components/chat/addFriend.vue'],r);
const Chat = r => require(['@/components/chat/chat.vue'],r);
const PersonPage = r => require(['@/components/chat/personPage.vue'],r);
const CompanyPage = r => require(['@/components/chat/companyPage.vue'],r);
const Group = r => require(['@/components/chat/group.vue'],r);
const GroupList = r => require(['@/components/chat/groupList.vue'],r);
const GroupChat = r => require(['@/components/chat/groupChat.vue'],r);
const GroupInfo = r => require(['@/components/chat/groupInfo.vue'],r);
const BlackList = r => require(['@/components/chat/blackList.vue'],r);
const Suit = r => require(['@/components/chat/suit.vue'],r);

const Alter = r => require(['@/components/chat/alter.vue'],r);
const PersonPage2 = r => require(['@/components/chat/personPage2.vue'],r);
const Setting = r => require(['@/components/chat/Setting.vue'],r);
const Chat2 = r => require(['@/components/chat/Chat2.vue'],r);



const Dynamics = r => require(['@/components/dynamics/dynamics'],r) ;
const DynamicsFrd = r => require(['@/components/dynamics/dynamicsfrd'],r) ;
const DynamicsAll = r => require(['@/components/dynamics/dynamicsall'],r) ;
const DynamicsNew = r => require(['@/components/dynamics/new'],r);
const Industries = r => require(['@/components/dynamics/industries'],r);
const IndustryDetail = r => require(['@/components/dynamics/detail'],r);

const DomesticPay = r => require(['@/components/person/DomesticPay'],r);
const GlobalPay = r => require(['@/components/person/GlobalPay'],r);
const Education = r => require(['@/components/person/Education'],r);
const Work = r => require(['@/components/person/Work'],r);

const MyCollection = r => require(['@/components/company/MyCollection'],r);
const DomesticCPay = r => require(['@/components/company/DomesticCPay'],r);
const GlobalCPay = r => require(['@/components/company/GlobalCPay'],r);
const ChildAccounts = r => require(['@/components/company/ChildAccounts'],r);
const AddChildAccount = r => require(['@/components/company/AddChildAccount'],r);
const RecruitList = r => require(['@/components/company/RecruitList'],r);
const PublishJob = r => require(['@/components/company/PublishJob'],r);
const JobDetail = r => require(['@/components/company/JobDetail'],r);
const Goal = r => require(['@/components/company/Goal'],r);

const AddCard = r => require(['@/components/base/AddCard'],r);
const AddCardSuccess = r => require(['@/components/base/AddCardSuccess'],r);
const Cards = r => require(['@/components/base/Cards'],r);


Vue.use(Router)

let router = new Router({
    // mode:"history",
    linkActiveClass: 'router-active',
    routes: [
        {
            path: '/',
            component: ChatHome,
            children:[
                {path:'', redirect:{name:'message'},},
                {path:'/message', name:'message', component:Message, children: [
                    { path: '/chat2/:id', component: Chat2}
                ]},
                {path:'/linkman', name:'linkman', component:LinkMan},
                {path:'/dynamics', component:Dynamics, children:[
                    { path: '', name: 'dynamicsfrd', component: DynamicsFrd },
                    { path: '/dynamicsall', name: 'dynamicsall', component: DynamicsAll },
                ]},
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
        {path:'/chat', name:'chat', component:Chat},
        {path:'/personPage', name:'personPage', component:PersonPage},
        {path:'/companyPage', name:'companyPage', component:CompanyPage},
        {path:'/group', name:'group', component:Group},
        {path:'/groupList', name:'groupList', component:GroupList},
        {path:'/groupChat', name:'groupChat', component:GroupChat},
        {path:'/groupInfo', name:'groupInfo', component:GroupInfo},
        {path:'/blackList', name:'blackList', component:BlackList},
        {path:'/suit', name:'suit', component:Suit},

        {path:'/alter', name:'alter', component:Alter},
        {path:'/personpage2', name:'personPage2', component:PersonPage2},
        {path:'/setting', name:'setting', component:Setting},

        {path:'/dynamicsnew',name:'dynamicsNew',component: DynamicsNew},
        {path:'/industries',name:'industries',component: Industries},
        {path:'/industrydetail/:id',name:'industryDetail',component: IndustryDetail},

        {path:'/globalpay',name:'globalPay',component: GlobalPay},
        {path:'/domesticpay',name:'domesticPay',component: DomesticPay},
        {path:'/education',name:'education',component: Education},
        {path:'/work',name:'work',component: Work},

        {path:'/mycollection',name:'myCollection',component: MyCollection},
        {path:'/globalcpay',name:'globalcPay',component: GlobalCPay},
        {path:'/domesticcpay',name:'domesticCpay',component: DomesticCPay},
        {path:'/childaccounts',name:'childAccounts',component: ChildAccounts},
        {path:'/addchildaccount',name:'addChildAccount',component: AddChildAccount},
        {path:'/recruitlist',name:'recruitList',component: RecruitList},
        {path:'/publishJob',name:'publishJob',component: PublishJob},
        {path:'/goal',name:'goal',component: Goal},
        {path:'/publishjob',name:'publishJob',component: PublishJob},
        {path:'/jobdetail',name:'jobDetail',component: JobDetail},
        {path:'/goal',name:'goal',component: Goal},

        {path:'/addcard',name:'addCard',component: AddCard},
        {path:'/addcardsuccess',name:'addCardSuccess',component: AddCardSuccess},
        {path:'/cards',name:'cards',component: Cards},
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

router.beforeEach((to, from, next) => {
    if (to.path == '/registerOption' 
        || to.path === '/personRegist' 
        || to.path === '/register2' 
        || to.path === '/login' 
        || to.path === '/companyRegister' 
        || to.path === '/forgetPswd' 
        || to.path === '/userAgreement' 
        || to.path === '/hobbit' 
        || to.path === '/intrest' 
        || to.path === '/companyTarget' 
        || to.path === '/loginInfo' 
        || to.path === '/loginInfo2') {
        next();
    } else {
        var loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || {};
        if (!loginInfo.uid) {
            next('/registerOption');
            return
        } 

        next();
    }
});

export default router;
