const getters = {
    // getFn1:(state) => {
    //     return state.todos[0]
    // },
    getFn1:(state) => {
        return state.todos.filter( todos => todos.text)
    },
    getFn2:(state,getters) => {
        return getters.getFn1.length
    }
}
export default getters
