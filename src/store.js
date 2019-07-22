import Vue from 'vue'
import Vuex from 'vuex'
import { Object } from 'core-js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentColor:'#000000',
    brushSize:20,
    mode:'draw',
    clearAll:false,
    isSaving:false,
    isUndo:false,
    isRedo:false,
    step:-1,
    records:[],
    isUploading:false,
    uploadFile:null
  },
  mutations: {
    CURRENTCOLOR(state, payload){
      state.currentColor = payload
    },
    BRUSHSIZE(state, payload){
      state.brushSize = payload
    },
    MODE(state, payload){
      state.mode = payload
    },
    CLEARALL(state, payload){
      state.clearAll = payload
    },
    SAVE(state, payload){
      state.isSaving = payload
    },
    UNDO(state, payload){
      state.isUndo = payload
    },
    REDO(state,payload){
      state.isRedo  = payload
    },
    RECORDS(state,payload){
      if(payload){
        state.records[payload.step]  = payload.data
      }else{
        state.records = []
      }
      
    },
    STEP(state,payload){
      state.step  = payload
    },
    UPLOAD(state,payload){
      state.isUploading  = payload
    },
    UPLOADFILE(state,payload){
      state.uploadFile  = payload
    }
  },
  actions: {
    changeColor(context,payload){
      context.commit('CURRENTCOLOR', payload)
    },
    changeSize(context,payload){
      context.commit('BRUSHSIZE', payload)
    },
    changeMode(context,payload){
      context.commit('MODE', payload)
    },
    updateRecords(context,payload){
      context.commit('RECORDS', payload)
    }
  },
  getters: {
    currentColor: (state) => { return state.currentColor },
    brushSize: (state) => { return state.brushSize },
    mode:(state) => { return state.mode },
    clearAll:(state) => { return state.clearAll },
    isSaving:(state) => { return state.isSaving },
    isUndo:(state) => { return state.isUndo },
    isRedo:(state) => { return state.isRedo },
    step:(state) => { return state.step },
    records:(state) => { return state.records },
    isUploading:(state) =>{return state.isUploading},
    uploadFile:(state)=>{return state.uploadFile}
  }
})
