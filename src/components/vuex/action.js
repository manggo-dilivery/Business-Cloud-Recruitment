import Vue from 'vue'
//vuex中，对一个空数组使用arr[index]=xxx时页面不会立即更新
//只能使用push或者arr[index]是已存在的数组时，才可以进行赋值，更改数组使用splice方法
const actions = {
    setFriendinfo(context,friendInfo){
        context.state.friendInfo = friendInfo
        // console.log('context.state.friendInfo',context.state.friendInfo)
    },
    getUserInfo(context,userInfo){
        context.state.userInfo = userInfo;
    },

    setGroupList(context,data){
        context.state.groupList = data;
    },
    setPersonPageData(context,data){
        context.state.personPageData = data;
    },
    deleteMessageData(context,item){
        context.state.messageData = item;
    },
    removeDot(context,item){
        let arr = context.state.messageData;

        for(let i in arr){
            console.log(arr[i][0].from)

            if(arr[i][0].from === item.from){
                let data = arr[i][0];
                data.isChecked = true;
                console.log(context.state.messageData)
                context.state.messageData[i].splice(i,1,data);
            }
        }
        console.log(context.state.messageData)
    },

    setGroupData(context,data){
        context.commit('setGroupData',data)
    },

    setMsgOnChat(context,data){
        context.state.messageData = data;
    },
    setAdminData(context,receiveMessage){
        context.state.adminData.push(receiveMessage)
        console.log('receiveMessage',context.state.adminData)
    },
    setMsgToLocal(context,receiveMessage){
        context.commit('setMsgToLocal',receiveMessage)
    },
    setMsgOnMount(context,data){
        context.state.messageData = data;
    },
    setAdminOnMount(context,adminData){
        context.state.adminData = adminData;
    },
    setGroupOnMount(context,groupData){
        context.state.groupData = groupData;
    },
}
export default actions
