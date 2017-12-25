import Vue  from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import modal from './modules/modal';

Vue.use(Vuex);

let state = {
    mainLoading:false,
    defaultIndex:'',
    secondLevel:'',
    threeLevel:'',
    secondRoute:'',
    activeName:'',
    openNames:[]
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        modal
    }
})
