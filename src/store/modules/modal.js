import Vue from 'vue'
// 这里定义初始值
let _this = Vue.prototype;
let state = {
    modal:false,
    modalImgSrc:''
};

const mutations = {
    changeModal(state,swi){
        state.modal = swi
    },
    changeModalImgSrc(state,src){
        state.modalImgSrc = src
    },
};

//事件触发后的逻辑操作
const actions = {
    modalAction({state,commit,rootState},swi){
        commit('changeModal',swi)
    },
    modalImgSrcAction({state,commit,rootState},src){
        commit('changeModalImgSrc',src)
    }
};

const getters = {
    GetModal(state,getters,rootState){
        return state.modal
    },
    GetModalImgSrc(state,getters,rootState){
        return state.modalImgSrc
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}