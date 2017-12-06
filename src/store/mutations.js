const mutations = {
    changeMainLoading:function(state,n){
        state.mainLoading = n
    },
    changeSecondLevel:function(state,n){
		state.secondLevel = n
    },  
    changeThreeLevel:function(state,n){
		state.threeLevel = n
    },
    changeSecondRoute:function(state,n){
		state.secondRoute = n
    },
    changeActiveName:function(state,n){
        state.activeName = n
    },
    changeOpenNames:function(state,n){
        state.openNames = n
    },
};

export default mutations;
