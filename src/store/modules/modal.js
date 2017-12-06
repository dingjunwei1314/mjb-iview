import Vue from 'vue'
// 这里定义初始值
let _this = Vue.prototype;
let state = {
    modal:false,
};

const mutations = {
    changeModal:function(state,swi){
        state.modal = swi
    },
};

//事件触发后的逻辑操作
const actions = {
    modalAction:function({state,commit,rootState},swi){
        commit('changeModal',swi)
    },
};

const getters = {
    GetModal:function(state,getters,rootState){
        return state.modal
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}