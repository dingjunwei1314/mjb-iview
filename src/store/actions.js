const actions = {
    mainLoadingAction:function({commit},n){
        commit('changeMainLoading',n)
    },
    secondLevelAction:function({commit},n){
        commit('changeSecondLevel',n)
    },
    threeLevelAction:function({commit},n){
        commit('changeThreeLevel',n)
    },
    secondRouteAction:function({commit},n){
        commit('changeSecondRoute',n)
    },   
    activeNameAction:function({commit},n){
        commit('changeActiveName',n)
    },
    openNamesAction:function({commit},n){
        commit('changeOpenNames',n)
    },
};

export default actions;