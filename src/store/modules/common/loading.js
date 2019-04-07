import {
    SHOW_LOADING,
    HIDE_LOADING
} from '../mutation-types'

const state = {
    loading: false
}

const getters = {
    loading: (state) => {
        return state.loading
    }
}

const mutations = {
    SHOW_LOADING: (state) => {
        state.loading = true
    },
    HIDE_LOADING: (state) => {
        state.loading = false
    },

}

const actions = {

    SHOW_LOADING({ commit }, language) {
        commit(SHOW_LOADING, language)
    },
    HIDE_LOADING({ commit }, language) {
        commit(HIDE_LOADING, language)
    },

}

export default {
    state,
    getters,
    mutations,
    actions
}