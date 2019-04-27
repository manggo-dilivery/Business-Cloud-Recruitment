import Vue from 'vue'
const mutations = {
    setMsgToLocal:(state,receiveMessage) =>{
        console.log('this',this)
        let messageData = state.messageData;
        console.log('receiveMessage',Boolean(messageData[receiveMessage.from]))
        if(messageData[receiveMessage.from]){
            state.messageData[receiveMessage.from].push(receiveMessage);
        }else{
            Vue.set(state.messageData, receiveMessage.from, [receiveMessage])
            // state.messageData[receiveMessage.from] = [];
            // state.messageData[receiveMessage.from].push(receiveMessage)
        }
    },
    setGroupData:(state,receiveMessage)=>{
        let groupData = state.groupData;
        console.log(receiveMessage)
        console.log(groupData[receiveMessage.id])
        console.log('groupData[receiveMessage.id]',Boolean(groupData[receiveMessage.id]))
        if(groupData[receiveMessage.id]){
            state.groupData[receiveMessage.id].push(receiveMessage);
            console.log('2')
        }else{
            Vue.set(state.groupData, receiveMessage.id, [receiveMessage])
        }
    }
}
export default mutations
