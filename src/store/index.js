import Vue from 'vue';
import Vuex from 'vuex';

import qualityControlMoudle from './qualityControlMoudle';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    qualityControl: qualityControlMoudle
  }
});
