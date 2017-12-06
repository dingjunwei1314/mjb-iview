const getters = {
    GetMainLoading:function(state){
        return state.mainLoading
    },
    GetSecondLevel:function(state){
        return state.secondLevel
    },
    GetThreeLevel:function(state){
        return state.threeLevel
    },
    GetSecondRoute:function(state){
        return state.secondRoute
    },
    GetActiveName:function(state){
        return state.activeName
    },
    GetOpenNames:function(state){
        return state.openNames
    }
}
export default getters